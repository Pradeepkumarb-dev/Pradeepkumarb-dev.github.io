import { WorkExperience, EducationItem, RegisterMapItem } from '../types';

export interface ResumeData {
  fullName: string;
  title: string;
  specialization: string;
  location: string;
  relocation?: string;
  email: string;
  phone: string;
  linkedin: string;
  github: string;
  codeVault: string;
  website: string;
  summary: string;
  workExperiences: WorkExperience[];
  education: EducationItem[];
  registerMap: RegisterMapItem[];
  publication: {
    title: string;
    journal: string;
    conference: string;
    volume: string;
    year: string;
    description: string;
  };
}

/**
 * Escapes special LaTeX characters in plain text strings
 */
function escapeLatex(str: string): string {
  if (!str) return '';
  return str
    .replace(/\\/g, '\\textbackslash{}')
    .replace(/&/g, '\\&')
    .replace(/%/g, '\\%')
    .replace(/\$/g, '\\$')
    .replace(/#/g, '\\#')
    .replace(/_/g, '\\_')
    .replace(/{/g, '\\{')
    .replace(/}/g, '\\}')
    .replace(/~/g, '\\textasciitilde{}')
    .replace(/\^/g, '\\textasciicircum{}');
}

/**
 * Generates an academic / professional .tex resume document (standard LaTeX format)
 */
export function generateLatexResume(data: ResumeData): string {
  const experiencesLatex = data.workExperiences.map(exp => `
    \\resumeSubheading
      {${escapeLatex(exp.role)}}{${escapeLatex(exp.period)}}
      {${escapeLatex(exp.company)}}{${escapeLatex(exp.location)}}
      ${exp.mcu ? `\\resumeItem{\\textit{Hardware / MCU Platform:} ${escapeLatex(exp.mcu)}}` : ''}
      \\resumeItemListStart
        ${exp.bullets.map(b => `\\resumeItem{${escapeLatex(b)}}`).join('\n        ')}
      \\resumeItemListEnd
  `).join('\n');

  const educationLatex = data.education.map(edu => `
    \\resumeSubheading
      {${escapeLatex(edu.institution)}}{${escapeLatex(edu.period)}}
      {${escapeLatex(edu.degree)}}{${escapeLatex(edu.location)}}
      \\resumeItemListStart
        \\resumeItem{${escapeLatex(edu.details)}}
        ${edu.highlights ? edu.highlights.map(h => `\\resumeItem{${escapeLatex(h)}}`).join('\n        ') : ''}
      \\resumeItemListEnd
  `).join('\n');

  const skillsLatex = data.registerMap.map(reg => 
    `\\textbf{${escapeLatex(reg.name.replace(/_REG$/, '').replace(/_/g, ' '))}:} {${escapeLatex(reg.bits.join(', '))}} \\\\`
  ).join('\n     ');

  return `%-------------------------
% Professional Resume in LaTeX
% Candidate: ${data.fullName}
% Target: Embedded Software Engineer (Automotive Telematics / RTOS)
%-----------------------------------------

\\documentclass[letterpaper,10.5pt]{article}

\\usepackage{latexsym}
\\usepackage[empty]{fullpage}
\\usepackage{titlesec}
\\usepackage{marvosym}
\\usepackage[usenames,dvipsnames]{color}
\\usepackage{verbatim}
\\usepackage{enumitem}
\\usepackage[hidelinks]{hyperref}
\\usepackage{fancyhdr}
\\usepackage[english]{babel}
\\usepackage{tabularx}
\\input{glyphtounicode}

\\pagestyle{fancy}
\\fancyhf{} 
\\fancyfoot{}
\\renewcommand{\\headrulewidth}{0pt}
\\renewcommand{\\footrulewidth}{0pt}

% Adjust margins
\\addtolength{\\oddsidemargin}{-0.5in}
\\addtolength{\\evensidemargin}{-0.5in}
\\addtolength{\\textwidth}{1in}
\\addtolength{\\topmargin}{-.5in}
\\addtolength{\\textheight}{1.0in}

\\urlstyle{same}

\\raggedbottom
\\raggedright
\\setlength{\\tabcolsep}{0in}

% Sections formatting
\\titleformat{\\section}{
  \\vspace{-4pt}\\scshape\\raggedright\\large
}{}{0em}{}[\\color{black}\\titlerule \\vspace{-5pt}]

% Ensure PDF machine readable
\\pdfgentounicode=1

% Custom commands
\\newcommand{\\resumeItem}[1]{
  \\item\\small{
    {#1 \\vspace{-2pt}}
  }
}

\\newcommand{\\resumeSubheading}[4]{
  \\vspace{-2pt}\\item
    \\begin{tabular*}{0.97\\textwidth}[t]{l@{\\extracolsep{\\fill}}r}
      \\textbf{#1} & #2 \\\\
      \\textit{\\small#3} & \\textit{\\small #4} \\\\
    \\end{tabular*}\\vspace{-7pt}
}

\\newcommand{\\resumeSubItem}[1]{\\resumeItem{#1}\\vspace{-4pt}}

\\renewcommand\\labelitemii{$\\vcenter{\\hbox{\\tiny$\\bullet$}}$}

\\newcommand{\\resumeSubHeadingListStart}{\\begin{itemize}[leftmargin=0.15in, label={}]}
\\newcommand{\\resumeSubHeadingListEnd}{\\end{itemize}}
\\newcommand{\\resumeItemListStart}{\\begin{itemize}}
\\newcommand{\\resumeItemListEnd}{\\end{itemize}\\vspace{-5pt}}

%-------------------------------------------
%%%%%%  RESUME STARTS HERE  %%%%%%%%%%%%%%%%%%%%%%%%%%%%

\\begin{document}

%----------HEADING----------
\\begin{center}
    \\textbf{\\Huge \\scshape ${escapeLatex(data.fullName)}} \\\\ \\vspace{2pt}
    \\small ${escapeLatex(data.title)} -- ${escapeLatex(data.specialization)} \\\\ \\vspace{2pt}
    \\small ${escapeLatex(data.location)} \\textbar{} \\href{mailto:${escapeLatex(data.email)}}{\\underline{${escapeLatex(data.email)}}} \\textbar{} ${escapeLatex(data.phone)} \\\\
    \\vspace{2pt}
    \\small 
    \\href{${escapeLatex(data.website)}}{\\textbf{\\underline{Portfolio: ${escapeLatex(data.website.replace(/^https?:\/\//, ''))}}}} \\textbar{}
    \\href{${escapeLatex(data.linkedin)}}{\\underline{LinkedIn}} \\textbar{}
    \\href{${escapeLatex(data.github)}}{\\underline{GitHub}}
\\end{center}

%-----------SUMMARY-----------
\\section{Professional Summary}
  \\small{${escapeLatex(data.summary)}}

%-----------TECHNICAL SKILLS-----------
\\section{Technical Skills}
 \\begin{itemize}[leftmargin=0.15in, label={}]
    \\small{\\item{
     ${skillsLatex}
    }}
 \\end{itemize}

%-----------EXPERIENCE-----------
\\section{Experience}
  \\resumeSubHeadingListStart
${experiencesLatex}
  \\resumeSubHeadingListEnd

%-----------EDUCATION-----------
\\section{Education}
  \\resumeSubHeadingListStart
${educationLatex}
  \\resumeSubHeadingListEnd

%-----------PUBLICATIONS-----------
\\section{Publications \\& Research}
  \\begin{itemize}[leftmargin=0.15in, label={}]
    \\small{\\item{
     \\textbf{${escapeLatex(data.publication.title)}} (${escapeLatex(data.publication.year)}) \\\\
     \\textit{${escapeLatex(data.publication.journal)}}, ${escapeLatex(data.publication.conference)}, ${escapeLatex(data.publication.volume)}. \\\\
     ${escapeLatex(data.publication.description)}
    }}
  \\end{itemize}

%-------------------------------------------
\\end{document}
`;
}
