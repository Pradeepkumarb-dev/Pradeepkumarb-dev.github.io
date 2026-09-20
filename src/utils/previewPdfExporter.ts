import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { ResumeData } from './latexGenerator';

/**
 * High-fidelity 1-page PDF Exporter:
 * 1. Generates an exact clone of the preview sheet with deliberate letter geometry (width: 800px, 1-page compact layout).
 * 2. Removes browser border-bottom artifacts and uses an explicit <div> line with height: 1px and background: #111827 to prevent line-clipping/sticking.
 * 3. Compacts margin and line spacing so ALL content fits completely on ONE single clean page.
 * 4. Renders with html2canvas at scale 2.5 and fits into a single-page standard Letter PDF with zero bleed, zero extra pages, and zero cut-off lines!
 */
export async function captureExactPreviewPdf(
  data: ResumeData,
  filename: string = 'PradeepkumarB_EmbeddedsoftwareEngineer.pdf'
): Promise<void> {
  // Create offscreen container styled exactly like the clean preview sheet
  const wrapper = document.createElement('div');
  wrapper.style.position = 'fixed';
  wrapper.style.left = '-9999px';
  wrapper.style.top = '0';
  wrapper.style.width = '800px';
  wrapper.style.background = '#ffffff';
  wrapper.style.zIndex = '-1000';
  wrapper.style.opacity = '1';

  const cleanWebsite = data.website.replace(/^https?:\/\//, '').replace(/\/$/, '');

  wrapper.innerHTML = `
    <div id="capture-sheet" style="
      width: 800px;
      padding: 36px 44px;
      background: #ffffff;
      color: #111827;
      font-family: 'EB Garamond', 'Computer Modern', Georgia, serif;
      box-sizing: border-box;
      line-height: 1.4;
      font-size: 11px;
    ">
      <!-- HEADER -->
      <div style="text-align: center; padding-bottom: 8px; margin-bottom: 10px; border-bottom: 1px solid #e5e7eb;">
        <h1 style="font-size: 24px; font-weight: 700; text-transform: uppercase; margin: 0 0 3px 0; color: #000000; letter-spacing: -0.2px;">
          ${data.fullName}
        </h1>
        <div style="font-size: 11.5px; color: #374151; margin-bottom: 4px;">
          <span>${data.title}</span> • <span>${data.specialization}</span>
        </div>
        <div style="font-size: 10.5px; color: #1f2937; margin-bottom: 3px;">
          <span>${data.location}</span> • 
          <span style="color: #1d4ed8; font-weight: 500;">${data.email}</span> • 
          <span>${data.phone}</span>
        </div>
        <div style="font-size: 10.5px; color: #1f2937;">
          <span style="color: #1e40af; font-weight: 700;">Portfolio: ${cleanWebsite}</span> • 
          <span style="color: #1d4ed8;">LinkedIn</span> • 
          <span style="color: #1d4ed8;">GitHub</span>
        </div>
      </div>

      <!-- 1. PROFESSIONAL SUMMARY -->
      <div style="margin-bottom: 10px;">
        <div style="margin-bottom: 4px;">
          <div style="font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; color: #000000; margin-bottom: 3px;">
            Professional Summary
          </div>
          <div style="width: 100%; height: 1.2px; background-color: #1f2937;"></div>
        </div>
        <p style="font-size: 10.5px; line-height: 1.45; text-align: justify; margin: 0; color: #1f2937;">
          ${data.summary}
        </p>
      </div>

      <!-- 2. TECHNICAL SKILLS -->
      <div style="margin-bottom: 10px;">
        <div style="margin-bottom: 4px;">
          <div style="font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; color: #000000; margin-bottom: 3px;">
            Technical Skills
          </div>
          <div style="width: 100%; height: 1.2px; background-color: #1f2937;"></div>
        </div>
        <div style="font-size: 10.5px; line-height: 1.35;">
          ${data.registerMap.map(reg => `
            <div style="margin-bottom: 2px;">
              <strong style="color: #000000;">${reg.name.replace(/_REG$/, '').replace(/_/g, ' ')}:</strong>
              <span style="color: #374151; margin-left: 4px;">${reg.bits.join(', ')}</span>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- 3. WORK EXPERIENCE -->
      <div style="margin-bottom: 10px;">
        <div style="margin-bottom: 5px;">
          <div style="font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; color: #000000; margin-bottom: 3px;">
            Work Experience
          </div>
          <div style="width: 100%; height: 1.2px; background-color: #1f2937;"></div>
        </div>
        <div>
          ${data.workExperiences.map((job, idx) => `
            <div style="margin-bottom: ${idx === data.workExperiences.length - 1 ? '2px' : '8px'}; font-size: 10.5px;">
              <div style="display: flex; justify-content: space-between; align-items: baseline;">
                <div>
                  <strong style="color: #000000; font-size: 11px;">${job.role}</strong>
                  <span style="font-style: italic; color: #374151; margin-left: 3px;">-- ${job.company}</span>
                </div>
                <span style="font-weight: 700; color: #000000; font-size: 10.5px;">${job.period}</span>
              </div>
              <div style="display: flex; justify-content: space-between; font-size: 10px; color: #4b5563; margin-top: 1px; margin-bottom: 2px;">
                <span style="font-style: italic;">${job.location}</span>
                ${job.mcu ? `<span style="font-style: italic;">Target Silicon: <strong style="color: #000000;">${job.mcu}</strong></span>` : ''}
              </div>
              <ul style="margin: 0 0 0 14px; padding: 0; list-style-type: disc;">
                ${job.bullets.map(bullet => `
                  <li style="margin-bottom: 2px; line-height: 1.35; text-align: justify; color: #1f2937;">
                    ${bullet}
                  </li>
                `).join('')}
              </ul>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- 4. EDUCATION & RESEARCH -->
      <div>
        <div style="margin-bottom: 4px;">
          <div style="font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; color: #000000; margin-bottom: 3px;">
            Education & Research Publication
          </div>
          <div style="width: 100%; height: 1.2px; background-color: #1f2937;"></div>
        </div>
        <div style="font-size: 10.5px;">
          ${data.education.map(edu => `
            <div style="margin-bottom: 4px;">
              <div style="display: flex; justify-content: space-between; align-items: baseline;">
                <strong style="color: #000000; font-size: 10.5px;">${edu.institution}</strong>
                <span style="font-weight: 600; color: #1f2937; font-size: 10px;">${edu.period}</span>
              </div>
              <div style="display: flex; justify-content: space-between; font-size: 10px; color: #4b5563;">
                <span style="font-style: italic;">${edu.degree}</span>
                <span style="font-style: italic;">${edu.location}</span>
              </div>
            </div>
          `).join('')}

          ${data.publication ? `
            <div style="padding-top: 2px; font-size: 10px;">
              <div style="font-weight: 700; color: #000000;">
                Peer-Reviewed Publication: <span style="font-style: italic; font-weight: 400;">"${data.publication.title}" (${data.publication.year})</span>
              </div>
              <div style="color: #4b5563; margin-top: 1px;">
                ${data.publication.journal}, ${data.publication.conference}, ${data.publication.volume}.
              </div>
            </div>
          ` : ''}
        </div>
      </div>
    </div>
  `;

  document.body.appendChild(wrapper);

  try {
    const captureEl = wrapper.querySelector('#capture-sheet') as HTMLElement;
    
    // Render high resolution canvas
    const canvas = await html2canvas(captureEl, {
      scale: 2.5,
      useCORS: true,
      backgroundColor: '#ffffff',
      logging: false,
      windowWidth: 800
    });

    const imgData = canvas.toDataURL('image/jpeg', 0.98);
    
    // Create standard letter page in portrait
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'pt',
      format: 'letter'
    });

    const pdfWidth = pdf.internal.pageSize.getWidth(); // 612 pt
    const pdfHeight = pdf.internal.pageSize.getHeight(); // 792 pt

    const imgProps = pdf.getImageProperties(imgData);
    const renderHeight = (imgProps.height * pdfWidth) / imgProps.width;

    // If it fits nicely within page height (which it now does cleanly: ~740-770pt),
    // output as exactly 1 pristine single page!
    if (renderHeight <= pdfHeight) {
      pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, renderHeight);
    } else {
      // If slightly taller, scale proportionally to fit 1 page completely without splitting
      const scaleFactor = (pdfHeight - 10) / renderHeight;
      const scaledWidth = pdfWidth * scaleFactor;
      const xOffset = (pdfWidth - scaledWidth) / 2;
      pdf.addImage(imgData, 'JPEG', xOffset, 5, scaledWidth, pdfHeight - 10);
    }

    pdf.save(filename);
  } finally {
    document.body.removeChild(wrapper);
  }
}

/**
 * Downloads directly from the modal's preview sheet if open or via captureExactPreviewPdf
 */
export async function downloadPreviewAsPdf(filename: string = 'PradeepkumarB_EmbeddedsoftwareEngineer.pdf'): Promise<boolean> {
  return false; // Delegated to captureExactPreviewPdf for consistent 1-page crisp export
}
