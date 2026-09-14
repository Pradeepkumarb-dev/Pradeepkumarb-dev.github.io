export interface WorkExperience {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  current?: boolean;
  summary?: string;
  bullets: string[];
  techStack: string[];
  mcu?: string;
}

export interface Project {
  id: string;
  title: string;
  category: 'telematics' | 'rtos' | 'robotics' | 'vault';
  description: string;
  details?: string[];
  repoUrl?: string;
  demoUrl?: string;
  tags: string[];
  featured?: boolean;
  architecture?: string;
}

export interface RegisterMapItem {
  address: string;
  name: string;
  description: string;
  bits: string[];
}

export interface EducationItem {
  period: string;
  degree: string;
  institution: string;
  location: string;
  details: string;
  highlights?: string[];
}

export interface CanFrame {
  id: string;
  name: string;
  protocol: string;
  arbitrationId: string;
  dlc: number;
  dataBytes: string[];
  interpretation: string;
  cycleTimeMs: number;
}
