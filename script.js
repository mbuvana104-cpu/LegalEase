// Wait for DOM to load
document.addEventListener('DOMContentLoaded', () => {
  const generateBtn = document.getElementById('generateBtn');
  const downloadBtn = document.getElementById('downloadBtn');

  if (generateBtn) {
    generateBtn.addEventListener('click', generateDocument);
  }

  if (downloadBtn) {
    downloadBtn.addEventListener('click', downloadDocument);
  }
});

/**
 * Generates the legal document text based on form inputs
 */
function generateDocument() {
  const docType = document.getElementById('docType')?.value;
  const partyA = document.getElementById('partyA')?.value.trim() || '[Party A]';
  const partyB = document.getElementById('partyB')?.value.trim() || '[Party B]';
  const effectiveDate = document.getElementById('effectiveDate')?.value || '[Date]';
  const notes = document.getElementById('additionalNotes')?.value.trim();
  const previewBox = document.getElementById('preview');

  if (!previewBox) return;

  let content = '';

  switch (docType) {
    case 'nda':
      content = `NON-DISCLOSURE AGREEMENT (NDA)\n` +
        `-----------------------------------------\n\n` +
        `This Non-Disclosure Agreement ("Agreement") is entered into on ${effectiveDate}, by and between:\n\n` +
        `1. Disclosing Party: ${partyA}\n` +
        `2. Receiving Party: ${partyB}\n\n` +
        `1. CONFIDENTIAL INFORMATION\n` +
        `The Receiving Party agrees to hold all proprietary and confidential information disclosed by ${partyA} in strict confidence.\n\n` +
        `2. OBLIGATIONS\n` +
        `${partyB} shall not disclose, publish, or otherwise reveal any Confidential Information to any third party without prior written consent from ${partyA}.\n\n` +
        (notes ? `3. ADDITIONAL CLAUSES\n${notes}\n\n` : '') +
        `IN WITNESS WHEREOF, the parties hereto have executed this Agreement as of ${effectiveDate}.\n\n` +
        `Signature (${partyA}): _____________________\n` +
        `Signature (${partyB}): _____________________`;
      break;

    case 'service':
      content = `MASTER SERVICE AGREEMENT\n` +
        `-----------------------------------------\n\n` +
        `Effective Date: ${effectiveDate}\n\n` +
        `PARTIES:\n` +
        `- Provider: ${partyA}\n` +
        `- Client: ${partyB}\n\n` +
        `1. SERVICES PROVIDED\n` +
        `${partyA} agrees to perform professional services for ${partyB} in accordance with agreed specifications.\n\n` +
        `2. PAYMENT TERMS\n` +
        `${partyB} agrees to compensate ${partyA} according to the schedule set forth in individual project statements of work.\n\n` +
        (notes ? `3. SPECIAL PROVISIONS\n${notes}\n\n` : '') +
        `Agreed and accepted by:\n\n` +
        `For ${partyA}: _____________________\n` +
        `For ${partyB}: _____________________`;
      break;

    case 'privacy':
      content = `PRIVACY POLICY\n` +
        `-----------------------------------------\n\n` +
        `Effective Date: ${effectiveDate}\n\n` +
        `This Privacy Policy describes how ${partyA} collects, uses, and protects data provided by ${partyB}.\n\n` +
        `1. DATA COLLECTION\n` +
        `We collect personal information necessary to deliver and improve our services efficiently.\n\n` +
        `2. DATA USAGE & PROTECTION\n` +
        `Information gathered will only be processed for legitimate business purposes and in compliance with applicable law.\n\n` +
        (notes ? `3. CUSTOM CLAUSES\n${notes}\n\n` : '') +
        `Contact Support: info@${partyA.toLowerCase().replace(/\s+/g, '')}.com`;
      break;

    default:
      content = 'Please select a valid document type.';
  }

  previewBox.textContent = content;
}

/**
 * Triggers a text file download of the current preview content
 */
function downloadDocument() {
  const previewBox = document.getElementById('preview');
  if (!previewBox) return;

  const text = previewBox.textContent;

  if (!text || text.startsWith('Fill in') || text.startsWith('Please select')) {
    alert('Please generate a document first before downloading.');
    return;
  }

  const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
  const anchor = document.createElement('a');
  anchor.download = 'LegalEase_Document.txt';
  anchor.href = window.URL.createObjectURL(blob);
  anchor.click();
  window.URL.revokeObjectURL(anchor.href);
}
