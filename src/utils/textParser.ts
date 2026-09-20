import { WorkExperience } from '../types';

/**
 * Smart parser that parses raw pasted text (from LinkedIn, Resume, or text notes)
 * into a structured WorkExperience object.
 */
export function parseExperienceText(rawText: string): Partial<WorkExperience> {
  if (!rawText || !rawText.trim()) {
    return {
      role: '',
      company: '',
      location: '',
      period: '',
      summary: '',
      bullets: [],
      techStack: [],
      mcu: ''
    };
  }

  const lines = rawText
    .split('\n')
    .map(l => l.trim())
    .filter(l => l.length > 0);

  let role = '';
  let company = '';
  let location = '';
  let period = '';
  let mcu = '';
  const bullets: string[] = [];
  const techStack: string[] = [];
  let summary = '';

  // Common keywords for role recognition
  const roleKeywords = [
    'engineer', 'developer', 'architect', 'lead', 'specialist', 'intern',
    'consultant', 'manager', 'researcher', 'programmer', 'technologist'
  ];

  // Regex patterns
  const dateRegex = /\b(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec|January|February|March|April|May|June|July|August|September|October|November|December|\d{4})\s*(\d{4})?\s*[-–—to]+\s*(Present|Current|Now|\d{4}|\w+\s*\d{4})\b/i;
  const locationRegex = /\b([A-Z][a-zA-Z\s]+,\s*(?:India|UK|USA|United Kingdom|United States|Germany|Remote|Singapore|Canada|UAE|Europe|[A-Z]{2}))\b/i;

  const usedLineIndices = new Set<number>();

  // 1. Identify date / period line
  for (let i = 0; i < lines.length; i++) {
    const match = lines[i].match(dateRegex);
    if (match) {
      period = match[0].trim();
      usedLineIndices.add(i);
      // Check if location or company is on the same line
      const rem = lines[i].replace(match[0], '').replace(/[•|·–—\(\)]/g, ' ').trim();
      if (rem) {
        const locMatch = rem.match(locationRegex);
        if (locMatch) {
          location = locMatch[0].trim();
        }
      }
      break;
    }
  }

  // 2. Identify location if not yet found
  if (!location) {
    for (let i = 0; i < lines.length; i++) {
      if (usedLineIndices.has(i)) continue;
      const locMatch = lines[i].match(locationRegex);
      if (locMatch && !lines[i].startsWith('-') && !lines[i].startsWith('•')) {
        location = locMatch[0].trim();
        // If the line only contains location, mark used
        if (lines[i].replace(locMatch[0], '').trim().length < 4) {
          usedLineIndices.add(i);
        }
        break;
      }
    }
  }

  // 3. Identify Role and Company from the top remaining lines
  const topLines: string[] = [];
  for (let i = 0; i < lines.length; i++) {
    if (usedLineIndices.has(i)) continue;
    if (lines[i].startsWith('-') || lines[i].startsWith('•') || lines[i].startsWith('*') || lines[i].startsWith('›')) break;
    topLines.push(lines[i]);
    if (topLines.length >= 3) break;
  }

  // Parse Role & Company
  for (const line of topLines) {
    // Check for "Role at Company" or "Role @ Company"
    const atMatch = line.match(/(.*?)\s+(?:at|@)\s+(.*)/i);
    if (atMatch && !role && !company) {
      role = atMatch[1].replace(/[-–—|]/g, '').trim();
      company = atMatch[2].replace(/[-–—|]/g, '').trim();
      continue;
    }

    // Check for "Company - Role" or "Role - Company"
    if (line.includes(' - ') || line.includes(' | ') || line.includes(' – ')) {
      const parts = line.split(/\s*[-–—|]\s*/);
      if (parts.length >= 2) {
        const part0Lower = parts[0].toLowerCase();
        const part1Lower = parts[1].toLowerCase();
        const isPart0Role = roleKeywords.some(k => part0Lower.includes(k));
        const isPart1Role = roleKeywords.some(k => part1Lower.includes(k));

        if (isPart0Role && !isPart1Role) {
          role = parts[0].trim();
          company = parts[1].trim();
          continue;
        } else if (isPart1Role && !isPart0Role) {
          company = parts[0].trim();
          role = parts[1].trim();
          continue;
        }
      }
    }

    // Check individual line for role keywords
    const lineLower = line.toLowerCase();
    if (!role && roleKeywords.some(k => lineLower.includes(k))) {
      role = line.replace(/[-–—|]/g, '').trim();
      continue;
    }

    // If role is found, next prominent line without bullets could be company
    if (role && !company && !line.includes(':') && line.length < 50) {
      company = line.replace(/[-–—|]/g, '').trim();
      continue;
    }

    if (!role && !company && line.length < 50) {
      // Default first line to role if short
      role = line;
    }
  }

  // 4. Identify Bullets, Tech Stack, and Hardware MCU
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Check for Tech Stack line (e.g. "Tech Stack: C, C++, FreeRTOS" or "Skills: ...")
    const techPrefixMatch = line.match(/^(?:Tech(?:nologies)?(?:\s+Stack)?|Skills|Tools|Environment)\s*:\s*(.*)/i);
    if (techPrefixMatch) {
      const techs = techPrefixMatch[1].split(/[,•|;/]/).map(t => t.trim()).filter(t => t.length > 0);
      techStack.push(...techs);
      continue;
    }

    // Check for MCU / Silicon line (e.g. "Target: STM32" or "MCU: Renesas RA")
    const mcuMatch = line.match(/^(?:MCU|Target(?:\s+(?:Silicon|Platform|Hardware))?|Hardware)\s*:\s*(.*)/i);
    if (mcuMatch) {
      mcu = mcuMatch[1].trim();
      continue;
    }

    // Bullet detection: starts with -, *, •, ›, or "1.", "2."
    const bulletMatch = line.match(/^[-*•›\d\.]+\s*(.*)/);
    if (bulletMatch && bulletMatch[1].trim().length > 10) {
      bullets.push(bulletMatch[1].trim());
      continue;
    }

    // If it's a descriptive sentence (longer than 40 chars, not role/company line)
    if (
      line.length > 35 &&
      line !== role &&
      line !== company &&
      line !== period &&
      !line.toLowerCase().startsWith('tech')
    ) {
      if (!summary && bullets.length === 0) {
        summary = line;
      } else {
        bullets.push(line);
      }
    }
  }

  // 5. Extract Tech Stack keywords from text if none explicitly listed
  if (techStack.length === 0) {
    const commonTechs = [
      'Embedded C', 'C++', 'Python', 'FreeRTOS', 'RTOS', 'CAN', 'CAN FD', 'J1939', 'SAE J1939',
      'UDS', 'ISO 15765', 'XCP', 'K-Line', 'MODBUS', 'RS-485', 'UART', 'SPI', 'I2C',
      'STM32', 'Renesas RA', 'ARM Cortex-M', 'ESP32', 'Quectel', 'Linux', 'MISRA-C',
      'FOTA', 'Bootloader', 'e² studio', 'STM32CubeIDE', 'Keil', 'Git'
    ];

    const fullText = rawText;
    for (const tech of commonTechs) {
      const escaped = tech.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
      const regex = new RegExp(`\\b${escaped}\\b`, 'i');
      if (regex.test(fullText) && !techStack.includes(tech)) {
        techStack.push(tech);
      }
    }
  }

  return {
    id: `exp-${Date.now()}`,
    role: role || 'Embedded Software Engineer',
    company: company || 'Engineering Solutions',
    location: location || 'Pune, India',
    period: period || '2024 – Present',
    current: /present|current|now/i.test(period),
    summary: summary || undefined,
    bullets: bullets.length > 0 ? bullets : ['Developed embedded firmware and drivers for target microcontrollers.'],
    techStack: techStack.length > 0 ? Array.from(new Set(techStack)) : ['Embedded C', 'FreeRTOS', 'CAN Bus'],
    mcu: mcu || undefined
  };
}
