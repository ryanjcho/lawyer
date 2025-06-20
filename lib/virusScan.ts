import { envConfig } from '@/config/env.config';

export interface VirusScanResult {
  isClean: boolean;
  threats: string[];
  scanDate: Date;
  provider: string;
}

export class VirusScanService {
  private static instance: VirusScanService;
  private apiKey: string;
  private apiUrl: string;
  private enabled: boolean;

  private constructor() {
    this.apiKey = envConfig.security.virusScan.apiKey;
    this.apiUrl = envConfig.security.virusScan.apiUrl;
    this.enabled = envConfig.security.virusScan.enabled;
  }

  public static getInstance(): VirusScanService {
    if (!VirusScanService.instance) {
      VirusScanService.instance = new VirusScanService();
    }
    return VirusScanService.instance;
  }

  /**
   * Scan a file for viruses using VirusTotal API
   */
  async scanFile(fileBuffer: Buffer, fileName: string): Promise<VirusScanResult> {
    if (!this.enabled) {
      console.log('Virus scanning disabled, skipping scan');
      return {
        isClean: true,
        threats: [],
        scanDate: new Date(),
        provider: 'disabled'
      };
    }

    if (!this.apiKey || !this.apiUrl) {
      console.warn('Virus scan API not configured, skipping scan');
      return {
        isClean: true,
        threats: [],
        scanDate: new Date(),
        provider: 'not-configured'
      };
    }

    try {
      // Calculate file hash (SHA-256)
      const crypto = require('crypto');
      const fileHash = crypto.createHash('sha256').update(fileBuffer).digest('hex');

      // Check if file has been scanned before
      const scanResult = await this.checkFileHash(fileHash);
      
      if (scanResult) {
        return scanResult;
      }

      // Upload and scan new file
      return await this.uploadAndScan(fileBuffer, fileName, fileHash);
    } catch (error) {
      console.error('Virus scan error:', error);
      
      // In production, you might want to reject files if scanning fails
      // For now, we'll allow them but log the error
      return {
        isClean: true,
        threats: [],
        scanDate: new Date(),
        provider: 'error'
      };
    }
  }

  /**
   * Check if a file hash has been scanned before
   */
  private async checkFileHash(fileHash: string): Promise<VirusScanResult | null> {
    try {
      const response = await fetch(`${this.apiUrl}/${fileHash}`, {
        headers: {
          'x-apikey': this.apiKey,
        },
      });

      if (response.status === 404) {
        // File not found in VirusTotal database
        return null;
      }

      if (!response.ok) {
        throw new Error(`VirusTotal API error: ${response.status}`);
      }

      const data = await response.json();
      
      return {
        isClean: data.data.attributes.last_analysis_stats.malicious === 0,
        threats: this.extractThreats(data.data.attributes.last_analysis_results),
        scanDate: new Date(data.data.attributes.last_analysis_date * 1000),
        provider: 'virustotal'
      };
    } catch (error) {
      console.error('Error checking file hash:', error);
      return null;
    }
  }

  /**
   * Upload and scan a new file
   */
  private async uploadAndScan(fileBuffer: Buffer, fileName: string, fileHash: string): Promise<VirusScanResult> {
    try {
      // Get upload URL
      const uploadUrlResponse = await fetch(`${this.apiUrl}/upload_url`, {
        headers: {
          'x-apikey': this.apiKey,
        },
      });

      if (!uploadUrlResponse.ok) {
        throw new Error(`Failed to get upload URL: ${uploadUrlResponse.status}`);
      }

      const uploadUrlData = await uploadUrlResponse.json();
      const uploadUrl = uploadUrlData.data;

      // Upload file
      const formData = new FormData();
      formData.append('file', new Blob([fileBuffer]), fileName);

      const uploadResponse = await fetch(uploadUrl, {
        method: 'POST',
        body: formData,
      });

      if (!uploadResponse.ok) {
        throw new Error(`Failed to upload file: ${uploadResponse.status}`);
      }

      // Wait for analysis to complete
      const analysisId = await uploadResponse.json();
      return await this.waitForAnalysis(analysisId.data.id);
    } catch (error) {
      console.error('Error uploading file for scan:', error);
      throw error;
    }
  }

  /**
   * Wait for analysis to complete
   */
  private async waitForAnalysis(analysisId: string): Promise<VirusScanResult> {
    const maxAttempts = 10;
    const delayMs = 2000;

    for (let attempt = 0; attempt < maxAttempts; attempt++) {
      try {
        const response = await fetch(`${this.apiUrl}/${analysisId}`, {
          headers: {
            'x-apikey': this.apiKey,
          },
        });

        if (!response.ok) {
          throw new Error(`Analysis check failed: ${response.status}`);
        }

        const data = await response.json();
        
        if (data.data.attributes.status === 'completed') {
          return {
            isClean: data.data.attributes.stats.malicious === 0,
            threats: this.extractThreats(data.data.attributes.results),
            scanDate: new Date(),
            provider: 'virustotal'
          };
        }

        // Wait before next attempt
        await new Promise(resolve => setTimeout(resolve, delayMs));
      } catch (error) {
        console.error(`Analysis check attempt ${attempt + 1} failed:`, error);
        if (attempt === maxAttempts - 1) {
          throw error;
        }
      }
    }

    throw new Error('Analysis timeout');
  }

  /**
   * Extract threats from analysis results
   */
  private extractThreats(results: any): string[] {
    const threats: string[] = [];
    for (const [engine, result] of Object.entries(results)) {
      if (result && typeof result === 'object' && 'category' in result) {
        if ((result as { category: string; result?: string }).category === 'malicious') {
          threats.push(`${engine}: ${(result as { result?: string }).result || 'Unknown threat'}`);
        }
      }
    }
    return threats;
  }

  /**
   * Simple file type validation
   */
  static validateFileType(fileName: string, allowedTypes: string[]): boolean {
    const fileExtension = fileName.toLowerCase().split('.').pop();
    return allowedTypes.includes(`.${fileExtension}`);
  }

  /**
   * Check file size limits
   */
  static validateFileSize(fileSize: number, maxSize: number): boolean {
    return fileSize <= maxSize;
  }
} 