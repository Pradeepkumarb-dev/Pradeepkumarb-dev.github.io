import { jsPDF } from 'jspdf';
import { ResumeData } from './latexGenerator';

/**
 * Generates a clean, ATS-friendly, 1-Page LaTeX-styled PDF resume.
 * Uses exact letter dimensions (612 x 792 pt), Computer Modern / Times Roman typography,
 * properly spaced section dividers, center-aligned contact information, and clickable links.
 * Fits 100% cleanly on ONE single page with zero awkward mid-line page breaks.
 */
export function generateLatexStylePdf(data: ResumeData): jsPDF {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'pt',
    format: 'letter'
  });

  const pageWidth = doc.internal.pageSize.getWidth(); // 612 pt
  const pageHeight = doc.internal.pageSize.getHeight(); // 792 pt
  const margin = 32; // ~0.44 in margins
  const contentWidth = pageWidth - margin * 2; // 548 pt
  let y = 34;

  // Helper to render an inline list of items centered on the page with exact widths and active clickable links
  const renderLinkedRow = (
    items: Array<{ text: string; url?: string; bold?: boolean; color?: [number, number, number] }>,
    yPos: number,
    fontSize = 9
  ) => {
    doc.setFontSize(fontSize);

    let totalWidth = 0;
    const metrics = items.map((item) => {
      doc.setFont('times', item.bold ? 'bold' : 'normal');
      const width = doc.getTextWidth(item.text);
      totalWidth += width;
      return { ...item, width };
    });

    let currentX = (pageWidth - totalWidth) / 2;

    metrics.forEach((item) => {
      doc.setFont('times', item.bold ? 'bold' : 'normal');
      if (item.color) {
        doc.setTextColor(item.color[0], item.color[1], item.color[2]);
      } else {
        doc.setTextColor(31, 41, 55);
      }

      if (item.url) {
        doc.textWithLink(item.text, currentX, yPos, { url: item.url });
      } else {
        doc.text(item.text, currentX, yPos);
      }
      currentX += item.width;
    });
  };

  // Helper to draw clean LaTeX section rule with optical spacing
  const drawSectionHeader = (title: string) => {
    y += 9;
    doc.setFont('times', 'bold');
    doc.setFontSize(10.5);
    doc.setTextColor(0, 0, 0);
    doc.text(title.toUpperCase(), margin, y);
    
    // Line placed cleanly below baseline without clipping
    y += 4;
    doc.setDrawColor(31, 41, 55); // #1F2937
    doc.setLineWidth(0.8);
    doc.line(margin, y, pageWidth - margin, y);
    y += 9.5;
  };

  // ==========================================
  // HEADER (Center aligned)
  // ==========================================
  doc.setFont('times', 'bold');
  doc.setFontSize(19);
  doc.setTextColor(0, 0, 0);
  doc.text(data.fullName.toUpperCase(), pageWidth / 2, y, { align: 'center' });
  y += 14;

  // Subtitle: Role & Specialization
  doc.setFont('times', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(55, 65, 81);
  doc.text(`${data.title}  —  ${data.specialization}`, pageWidth / 2, y, { align: 'center' });
  y += 12;

  // Contact line 1: Location | Email | Phone
  renderLinkedRow([
    { text: data.location, color: [31, 41, 55] },
    { text: '   •   ', color: [156, 163, 175] },
    { text: data.email, url: `mailto:${data.email}`, color: [29, 78, 216] },
    { text: '   •   ', color: [156, 163, 175] },
    { text: data.phone, color: [31, 41, 55] }
  ], y, 9);
  y += 11;

  // Contact line 2: Portfolio | LinkedIn | GitHub
  const cleanWebsite = data.website.replace(/^https?:\/\//, '').replace(/\/$/, '');
  const portfolioLabel = `Portfolio: ${cleanWebsite}`;

  renderLinkedRow([
    { text: portfolioLabel, url: data.website, color: [30, 64, 175], bold: true },
    { text: '   •   ', color: [156, 163, 175] },
    { text: 'LinkedIn', url: data.linkedin, color: [29, 78, 216], bold: false },
    { text: '   •   ', color: [156, 163, 175] },
    { text: 'GitHub', url: data.github, color: [29, 78, 216], bold: false }
  ], y, 9);
  y += 7;

  // Thin separator under header
  doc.setDrawColor(229, 231, 235);
  doc.setLineWidth(0.5);
  doc.line(margin, y, pageWidth - margin, y);
  y += 3;

  // ==========================================
  // 1. PROFESSIONAL SUMMARY
  // ==========================================
  drawSectionHeader('Professional Summary');
  doc.setFont('times', 'normal');
  doc.setFontSize(8.8);
  doc.setTextColor(31, 41, 55);
  const summaryLines = doc.splitTextToSize(data.summary, contentWidth);
  doc.text(summaryLines, margin, y, { align: 'justify', maxWidth: contentWidth });
  y += summaryLines.length * 10.5 + 2;

  // ==========================================
  // 2. TECHNICAL SKILLS
  // ==========================================
  drawSectionHeader('Technical Skills');
  data.registerMap.forEach((reg) => {
    const categoryName = reg.name.replace(/_REG$/, '').replace(/_/g, ' ') + ': ';
    const bitValues = reg.bits.join(', ');

    doc.setFont('times', 'bold');
    doc.setFontSize(8.8);
    doc.setTextColor(0, 0, 0);
    doc.text(categoryName, margin, y);

    const catWidth = doc.getTextWidth(categoryName);
    doc.setFont('times', 'normal');
    doc.setTextColor(55, 65, 81);
    const bitsLines = doc.splitTextToSize(bitValues, contentWidth - catWidth);
    doc.text(bitsLines, margin + catWidth, y);
    y += Math.max(1, bitsLines.length) * 10.2 + 0.5;
  });

  // ==========================================
  // 3. WORK EXPERIENCE
  // ==========================================
  drawSectionHeader('Work Experience');
  data.workExperiences.forEach((exp, expIdx) => {
    // Line 1: Role (Bold) & Period (Right aligned)
    doc.setFont('times', 'bold');
    doc.setFontSize(9.5);
    doc.setTextColor(0, 0, 0);
    doc.text(exp.role, margin, y);

    doc.setFont('times', 'bold');
    doc.setTextColor(0, 0, 0);
    doc.text(exp.period, pageWidth - margin, y, { align: 'right' });
    y += 10.5;

    // Line 2: Company (Italic) & Location (Right aligned italic)
    doc.setFont('times', 'italic');
    doc.setFontSize(9);
    doc.setTextColor(55, 65, 81);
    doc.text(exp.company, margin, y);
    doc.text(exp.location, pageWidth - margin, y, { align: 'right' });
    y += 9.5;

    // Target Hardware (if present)
    if (exp.mcu) {
      doc.setFont('times', 'italic');
      doc.setFontSize(8.5);
      doc.setTextColor(75, 85, 99);
      doc.text(`Target Hardware / MCU Platform: ${exp.mcu}`, margin, y);
      y += 9;
    }

    // Bullets
    doc.setFont('times', 'normal');
    doc.setFontSize(8.6);
    doc.setTextColor(31, 41, 55);
    const bulletIndent = 10;

    exp.bullets.forEach((bullet) => {
      const wrapped = doc.splitTextToSize(bullet, contentWidth - bulletIndent);
      doc.text('•', margin + 1, y);
      doc.text(wrapped, margin + bulletIndent, y, { align: 'justify', maxWidth: contentWidth - bulletIndent });
      y += wrapped.length * 9.8 + 1.2;
    });

    if (expIdx < data.workExperiences.length - 1) {
      y += 4;
    }
  });

  // ==========================================
  // 4. EDUCATION & PUBLICATIONS
  // ==========================================
  drawSectionHeader('Education & Research Publication');
  data.education.forEach((edu) => {
    doc.setFont('times', 'bold');
    doc.setFontSize(9.5);
    doc.setTextColor(0, 0, 0);
    doc.text(edu.institution, margin, y);

    doc.setFont('times', 'bold');
    doc.setTextColor(31, 41, 55);
    doc.text(edu.period, pageWidth - margin, y, { align: 'right' });
    y += 10;

    doc.setFont('times', 'italic');
    doc.setFontSize(9);
    doc.setTextColor(75, 85, 99);
    doc.text(edu.degree, margin, y);
    doc.text(edu.location, pageWidth - margin, y, { align: 'right' });
    y += 10.5;
  });

  if (data.publication) {
    doc.setFont('times', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(0, 0, 0);
    doc.text(`Peer-Reviewed Publication: "${data.publication.title}" (${data.publication.year})`, margin, y);
    y += 9.5;

    doc.setFont('times', 'italic');
    doc.setFontSize(8.5);
    doc.setTextColor(75, 85, 99);
    doc.text(`${data.publication.journal}, ${data.publication.conference}, ${data.publication.volume}.`, margin, y);
  }

  return doc;
}
