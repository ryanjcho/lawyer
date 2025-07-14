// Wrapper for pdf-parse to prevent test code from running during build
let pdfParse: any = null;

// Only import pdf-parse when actually needed (runtime)
export async function parsePDF(buffer: Buffer) {
  if (!pdfParse) {
    // Dynamic import to prevent test code from running during build
    const pdfParseModule = await import('pdf-parse');
    pdfParse = pdfParseModule.default;
  }
  
  return pdfParse(buffer);
} 