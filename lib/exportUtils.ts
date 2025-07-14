import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { saveAs } from 'file-saver';
import { Document, Packer, Paragraph, TextRun, AlignmentType, HeadingLevel } from 'docx';

export interface ExportOptions {
  watermark?: string;
  confidentiality?: string;
  includeComments?: boolean;
  includeSummary?: boolean;
  format: 'pdf' | 'docx' | 'txt';
}

export interface ContractData {
  id: string;
  originalText: string;
  modifiedText: string;
  changes: Array<{
    type: 'added' | 'removed' | 'modified';
    line: number;
    originalText?: string;
    newText?: string;
  }>;
  comments: Array<{
    line: number;
    text: string;
    author: string;
    timestamp: Date;
  }>;
  metadata: {
    contractName: string;
    version: string;
    lastModified: Date;
    authors: string[];
  };
}

export class ContractExporter {
  private contractData: ContractData;
  private options: ExportOptions;

  constructor(contractData: ContractData, options: ExportOptions) {
    this.contractData = contractData;
    this.options = options;
  }

  async exportToPDF(): Promise<Blob> {
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const margin = 20;
    const contentWidth = pageWidth - 2 * margin;

    // Add header
    pdf.setFontSize(16);
    pdf.setFont('helvetica', 'bold');
    pdf.text('Contract Comparison Report', margin, 30);
    
    // Add metadata
    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'normal');
    pdf.text(`Contract ID: ${this.contractData.id}`, margin, 45);
    pdf.text(`Version: ${this.contractData.metadata.version}`, margin, 52);
    pdf.text(`Generated: ${new Date().toLocaleDateString()}`, margin, 59);

    // Add watermark if specified
    if (this.options.watermark) {
      pdf.setTextColor(200, 200, 200);
      pdf.setFontSize(60);
      pdf.text(this.options.watermark, pageWidth / 2, pageHeight / 2, { angle: 45, align: 'center' });
      pdf.setTextColor(0, 0, 0);
    }

    let yPosition = 80;
    const lineHeight = 6;

    // Add summary if requested
    if (this.options.includeSummary) {
      pdf.setFontSize(12);
      pdf.setFont('helvetica', 'bold');
      pdf.text('Change Summary', margin, yPosition);
      yPosition += 15;

      const addedCount = this.contractData.changes.filter(c => c.type === 'added').length;
      const removedCount = this.contractData.changes.filter(c => c.type === 'removed').length;
      const modifiedCount = this.contractData.changes.filter(c => c.type === 'modified').length;

      pdf.setFontSize(10);
      pdf.setFont('helvetica', 'normal');
      pdf.text(`• Added lines: ${addedCount}`, margin + 5, yPosition);
      yPosition += lineHeight;
      pdf.text(`• Removed lines: ${removedCount}`, margin + 5, yPosition);
      yPosition += lineHeight;
      pdf.text(`• Modified lines: ${modifiedCount}`, margin + 5, yPosition);
      yPosition += 20;
    }

    // Add changes
    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'bold');
    pdf.text('Detailed Changes', margin, yPosition);
    yPosition += 15;

    pdf.setFontSize(9);
    pdf.setFont('helvetica', 'normal');

    for (const change of this.contractData.changes) {
      if (yPosition > pageHeight - 30) {
        pdf.addPage();
        yPosition = 30;
      }

      // Color coding for changes
      switch (change.type) {
        case 'added':
          pdf.setTextColor(0, 128, 0); // Green
          pdf.text(`+ Line ${change.line + 1}: ${change.newText}`, margin, yPosition);
          break;
        case 'removed':
          pdf.setTextColor(255, 0, 0); // Red
          pdf.text(`- Line ${change.line + 1}: ${change.originalText}`, margin, yPosition);
          break;
        case 'modified':
          pdf.setTextColor(0, 0, 255); // Blue
          pdf.text(`~ Line ${change.line + 1}: ${change.originalText} → ${change.newText}`, margin, yPosition);
          break;
      }
      yPosition += lineHeight;
      pdf.setTextColor(0, 0, 0);
    }

    // Add comments if requested
    if (this.options.includeComments && this.contractData.comments.length > 0) {
      if (yPosition > pageHeight - 50) {
        pdf.addPage();
        yPosition = 30;
      }

      pdf.setFontSize(12);
      pdf.setFont('helvetica', 'bold');
      pdf.text('Comments', margin, yPosition);
      yPosition += 15;

      pdf.setFontSize(9);
      pdf.setFont('helvetica', 'normal');

      for (const comment of this.contractData.comments) {
        if (yPosition > pageHeight - 30) {
          pdf.addPage();
          yPosition = 30;
        }

        pdf.text(`Line ${comment.line + 1} - ${comment.author} (${comment.timestamp.toLocaleDateString()}):`, margin, yPosition);
        yPosition += lineHeight;
        pdf.text(`"${comment.text}"`, margin + 5, yPosition);
        yPosition += lineHeight + 5;
      }
    }

    return pdf.output('blob');
  }

  async exportToWord(): Promise<Blob> {
    const children: Paragraph[] = [];

    // Title
    children.push(
      new Paragraph({
        text: 'Contract Comparison Report',
        heading: HeadingLevel.HEADING_1,
        alignment: AlignmentType.CENTER,
      })
    );

    // Metadata
    children.push(
      new Paragraph({
        children: [
          new TextRun({ text: 'Contract ID: ', bold: true }),
          new TextRun({ text: this.contractData.id }),
        ],
      }),
      new Paragraph({
        children: [
          new TextRun({ text: 'Version: ', bold: true }),
          new TextRun({ text: this.contractData.metadata.version }),
        ],
      }),
      new Paragraph({
        children: [
          new TextRun({ text: 'Generated: ', bold: true }),
          new TextRun({ text: new Date().toLocaleDateString() }),
        ],
      })
    );

    // Summary
    if (this.options.includeSummary) {
      children.push(
        new Paragraph({
          text: 'Change Summary',
          heading: HeadingLevel.HEADING_2,
        })
      );

      const addedCount = this.contractData.changes.filter(c => c.type === 'added').length;
      const removedCount = this.contractData.changes.filter(c => c.type === 'removed').length;
      const modifiedCount = this.contractData.changes.filter(c => c.type === 'modified').length;

      children.push(
        new Paragraph({ text: `• Added lines: ${addedCount}` }),
        new Paragraph({ text: `• Removed lines: ${removedCount}` }),
        new Paragraph({ text: `• Modified lines: ${modifiedCount}` })
      );
    }

    // Changes
    children.push(
      new Paragraph({
        text: 'Detailed Changes',
        heading: HeadingLevel.HEADING_2,
      })
    );

    for (const change of this.contractData.changes) {
      let changeText = '';
      switch (change.type) {
        case 'added':
          changeText = `+ Line ${change.line + 1}: ${change.newText}`;
          break;
        case 'removed':
          changeText = `- Line ${change.line + 1}: ${change.originalText}`;
          break;
        case 'modified':
          changeText = `~ Line ${change.line + 1}: ${change.originalText} → ${change.newText}`;
          break;
      }

      children.push(
        new Paragraph({
          text: changeText,
          style: change.type === 'added' ? 'added' : change.type === 'removed' ? 'removed' : 'modified',
        })
      );
    }

    // Comments
    if (this.options.includeComments && this.contractData.comments.length > 0) {
      children.push(
        new Paragraph({
          text: 'Comments',
          heading: HeadingLevel.HEADING_2,
        })
      );

      for (const comment of this.contractData.comments) {
        children.push(
          new Paragraph({
            text: `Line ${comment.line + 1} - ${comment.author} (${comment.timestamp.toLocaleDateString()}):`,
            style: 'commentHeader',
          }),
          new Paragraph({
            text: `"${comment.text}"`,
            style: 'commentText',
          })
        );
      }
    }

    const doc = new Document({
      sections: [
        {
          properties: {},
          children,
        },
      ],
      styles: {
        paragraphStyles: [
          {
            id: 'added',
            name: 'Added Text',
            run: {
              color: '008000',
            },
          },
          {
            id: 'removed',
            name: 'Removed Text',
            run: {
              color: 'FF0000',
              strike: true,
            },
          },
          {
            id: 'modified',
            name: 'Modified Text',
            run: {
              color: '0000FF',
            },
          },
          {
            id: 'commentHeader',
            name: 'Comment Header',
            run: {
              bold: true,
              size: 20,
            },
          },
          {
            id: 'commentText',
            name: 'Comment Text',
            run: {
              italics: true,
              size: 18,
            },
          },
        ],
      },
    });

    return await Packer.toBlob(doc);
  }

  async exportToText(): Promise<Blob> {
    let content = 'Contract Comparison Report\n';
    content += '========================\n\n';
    content += `Contract ID: ${this.contractData.id}\n`;
    content += `Version: ${this.contractData.metadata.version}\n`;
    content += `Generated: ${new Date().toLocaleDateString()}\n\n`;

    if (this.options.includeSummary) {
      content += 'Change Summary\n';
      content += '==============\n';
      const addedCount = this.contractData.changes.filter(c => c.type === 'added').length;
      const removedCount = this.contractData.changes.filter(c => c.type === 'removed').length;
      const modifiedCount = this.contractData.changes.filter(c => c.type === 'modified').length;
      content += `• Added lines: ${addedCount}\n`;
      content += `• Removed lines: ${removedCount}\n`;
      content += `• Modified lines: ${modifiedCount}\n\n`;
    }

    content += 'Detailed Changes\n';
    content += '================\n';
    for (const change of this.contractData.changes) {
      switch (change.type) {
        case 'added':
          content += `+ Line ${change.line + 1}: ${change.newText}\n`;
          break;
        case 'removed':
          content += `- Line ${change.line + 1}: ${change.originalText}\n`;
          break;
        case 'modified':
          content += `~ Line ${change.line + 1}: ${change.originalText} → ${change.newText}\n`;
          break;
      }
    }

    if (this.options.includeComments && this.contractData.comments.length > 0) {
      content += '\nComments\n';
      content += '========\n';
      for (const comment of this.contractData.comments) {
        content += `Line ${comment.line + 1} - ${comment.author} (${comment.timestamp.toLocaleDateString()}):\n`;
        content += `"${comment.text}"\n\n`;
      }
    }

    return new Blob([content], { type: 'text/plain' });
  }

  async export(): Promise<void> {
    let blob: Blob;
    let filename: string;

    switch (this.options.format) {
      case 'pdf':
        blob = await this.exportToPDF();
        filename = `contract-${this.contractData.id}-comparison.pdf`;
        break;
      case 'docx':
        blob = await this.exportToWord();
        filename = `contract-${this.contractData.id}-comparison.docx`;
        break;
      case 'txt':
        blob = await this.exportToText();
        filename = `contract-${this.contractData.id}-comparison.txt`;
        break;
      default:
        throw new Error('Unsupported export format');
    }

    saveAs(blob, filename);
  }
} 