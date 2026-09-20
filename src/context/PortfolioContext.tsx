import React, { createContext, useContext, useState, useEffect } from 'react';
import { WorkExperience, Project, RegisterMapItem, EducationItem } from '../types';
import {
  PERSONAL_INFO as DEFAULT_PERSONAL_INFO,
  WORK_EXPERIENCES as DEFAULT_WORK_EXPERIENCES,
  PROJECTS as DEFAULT_PROJECTS,
  REGISTER_MAP as DEFAULT_REGISTER_MAP,
  EDUCATION as DEFAULT_EDUCATION,
  PUBLICATION as DEFAULT_PUBLICATION,
  RESUME_FILENAME,
  RESUME_DOWNLOAD_URL
} from '../data/portfolioData';
import { generateLatexStylePdf } from '../utils/pdfResumeGenerator';
import { captureExactPreviewPdf } from '../utils/previewPdfExporter';

export type PersonalInfoType = typeof DEFAULT_PERSONAL_INFO;
export type PublicationType = typeof DEFAULT_PUBLICATION;

interface PortfolioContextType {
  personalInfo: PersonalInfoType;
  workExperiences: WorkExperience[];
  projects: Project[];
  registerMap: RegisterMapItem[];
  education: EducationItem[];
  publication: PublicationType;
  resumeFileName: string;
  resumeDownloadUrl: string;
  downloadResumePdf: () => void;
  
  // Owner Authentication & Modal controls
  isOwner: boolean;
  authenticateOwner: (password: string) => boolean;
  logoutOwner: () => void;
  isEditModalOpen: boolean;
  setIsEditModalOpen: (open: boolean) => void;
  isResumeModalOpen: boolean;
  setIsResumeModalOpen: (open: boolean) => void;
  
  // Modification operations
  updatePersonalInfo: (info: Partial<PersonalInfoType>) => void;
  setWorkExperiences: React.Dispatch<React.SetStateAction<WorkExperience[]>>;
  addWorkExperience: (exp: WorkExperience) => void;
  updateWorkExperience: (id: string, updated: Partial<WorkExperience>) => void;
  deleteWorkExperience: (id: string) => void;
  reorderWorkExperience: (fromIndex: number, toIndex: number) => void;

  // Additional content sections
  setProjects: React.Dispatch<React.SetStateAction<Project[]>>;
  setRegisterMap: React.Dispatch<React.SetStateAction<RegisterMapItem[]>>;
  setEducation: React.Dispatch<React.SetStateAction<EducationItem[]>>;
  updatePublication: (pub: Partial<PublicationType>) => void;

  // Batch / full document update
  saveAllContent: (allData: {
    personalInfo?: PersonalInfoType;
    workExperiences?: WorkExperience[];
    projects?: Project[];
    registerMap?: RegisterMapItem[];
    education?: EducationItem[];
    publication?: PublicationType;
  }) => void;

  resetToDefaults: () => void;
  importState: (jsonString: string) => boolean;
  exportStateJson: () => string;
  generateTypeScriptCode: () => string;
}

const STORAGE_KEY = 'pkb_portfolio_state_v3';
const OWNER_AUTH_KEY = 'pkb_owner_session_v3';
// Required owner password per instructions: vijayboss (plus 1710 backwards-compatibility)
const OWNER_PASSWORD_REQUIRED = 'vijayboss';

const PortfolioContext = createContext<PortfolioContextType | null>(null);

export const PortfolioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [personalInfo, setPersonalInfo] = useState<PersonalInfoType>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.personalInfo) {
          return { ...DEFAULT_PERSONAL_INFO, ...parsed.personalInfo };
        }
      }
    } catch (e) {
      console.error('Error loading personal info', e);
    }
    return DEFAULT_PERSONAL_INFO;
  });

  const [workExperiences, setWorkExperiences] = useState<WorkExperience[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed.workExperiences) && parsed.workExperiences.length > 0) {
          return parsed.workExperiences;
        }
      }
    } catch (e) {
      console.error('Error loading work experiences', e);
    }
    return DEFAULT_WORK_EXPERIENCES;
  });

  const [projects, setProjects] = useState<Project[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed.projects) && parsed.projects.length > 0) {
          return parsed.projects;
        }
      }
    } catch (e) {
      console.error('Error loading projects', e);
    }
    return DEFAULT_PROJECTS;
  });

  const [registerMap, setRegisterMap] = useState<RegisterMapItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed.registerMap) && parsed.registerMap.length > 0) {
          return parsed.registerMap;
        }
      }
    } catch (e) {
      console.error('Error loading register map', e);
    }
    return DEFAULT_REGISTER_MAP;
  });

  const [education, setEducation] = useState<EducationItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed.education) && parsed.education.length > 0) {
          return parsed.education;
        }
      }
    } catch (e) {
      console.error('Error loading education', e);
    }
    return DEFAULT_EDUCATION;
  });

  const [publication, setPublication] = useState<PublicationType>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.publication) {
          return { ...DEFAULT_PUBLICATION, ...parsed.publication };
        }
      }
    } catch (e) {
      console.error('Error loading publication', e);
    }
    return DEFAULT_PUBLICATION;
  });

  const [isOwner, setIsOwner] = useState<boolean>(() => {
    return sessionStorage.getItem(OWNER_AUTH_KEY) === 'true';
  });

  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [isResumeModalOpen, setIsResumeModalOpen] = useState<boolean>(false);

  // Check URL query param ?edit=true to open editor
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (params.get('edit') === 'true' || params.get('admin') === 'true') {
        setIsEditModalOpen(true);
      }
    }
  }, []);

  // Save to localStorage whenever any piece of portfolio data changes
  useEffect(() => {
    try {
      const stateToSave = {
        personalInfo,
        workExperiences,
        projects,
        registerMap,
        education,
        publication
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(stateToSave));
    } catch (e) {
      console.error('Failed to persist portfolio state to localStorage', e);
    }
  }, [personalInfo, workExperiences, projects, registerMap, education, publication]);

  const authenticateOwner = (pwd: string) => {
    const cleanPwd = pwd.trim();
    if (cleanPwd === OWNER_PASSWORD_REQUIRED || cleanPwd === '1710') {
      setIsOwner(true);
      sessionStorage.setItem(OWNER_AUTH_KEY, 'true');
      return true;
    }
    return false;
  };

  const logoutOwner = () => {
    setIsOwner(false);
    sessionStorage.removeItem(OWNER_AUTH_KEY);
  };

  const updatePersonalInfo = (info: Partial<PersonalInfoType>) => {
    setPersonalInfo(prev => ({ ...prev, ...info }));
  };

  const addWorkExperience = (exp: WorkExperience) => {
    setWorkExperiences(prev => [exp, ...prev]);
  };

  const updateWorkExperience = (id: string, updated: Partial<WorkExperience>) => {
    setWorkExperiences(prev => prev.map(item => (item.id === id ? { ...item, ...updated } : item)));
  };

  const deleteWorkExperience = (id: string) => {
    setWorkExperiences(prev => prev.filter(item => item.id !== id));
  };

  const reorderWorkExperience = (fromIndex: number, toIndex: number) => {
    setWorkExperiences(prev => {
      const next = [...prev];
      const [moved] = next.splice(fromIndex, 1);
      next.splice(toIndex, 0, moved);
      return next;
    });
  };

  const updatePublication = (pub: Partial<PublicationType>) => {
    setPublication(prev => ({ ...prev, ...pub }));
  };

  const saveAllContent = (allData: {
    personalInfo?: PersonalInfoType;
    workExperiences?: WorkExperience[];
    projects?: Project[];
    registerMap?: RegisterMapItem[];
    education?: EducationItem[];
    publication?: PublicationType;
  }) => {
    if (allData.personalInfo) setPersonalInfo(allData.personalInfo);
    if (allData.workExperiences) setWorkExperiences(allData.workExperiences);
    if (allData.projects) setProjects(allData.projects);
    if (allData.registerMap) setRegisterMap(allData.registerMap);
    if (allData.education) setEducation(allData.education);
    if (allData.publication) setPublication(allData.publication);
  };

  const resetToDefaults = () => {
    setPersonalInfo(DEFAULT_PERSONAL_INFO);
    setWorkExperiences(DEFAULT_WORK_EXPERIENCES);
    setProjects(DEFAULT_PROJECTS);
    setRegisterMap(DEFAULT_REGISTER_MAP);
    setEducation(DEFAULT_EDUCATION);
    setPublication(DEFAULT_PUBLICATION);
    localStorage.removeItem(STORAGE_KEY);
  };

  const exportStateJson = () => {
    return JSON.stringify({
      personalInfo,
      workExperiences,
      projects,
      registerMap,
      education,
      publication
    }, null, 2);
  };

  const importState = (jsonString: string) => {
    try {
      const parsed = JSON.parse(jsonString);
      if (parsed.personalInfo) setPersonalInfo({ ...DEFAULT_PERSONAL_INFO, ...parsed.personalInfo });
      if (Array.isArray(parsed.workExperiences)) setWorkExperiences(parsed.workExperiences);
      if (Array.isArray(parsed.projects)) setProjects(parsed.projects);
      if (Array.isArray(parsed.registerMap)) setRegisterMap(parsed.registerMap);
      if (Array.isArray(parsed.education)) setEducation(parsed.education);
      if (parsed.publication) setPublication({ ...DEFAULT_PUBLICATION, ...parsed.publication });
      return true;
    } catch (e) {
      console.error('Import failed', e);
      return false;
    }
  };

  const generateTypeScriptCode = () => {
    return `// Exported from Owner Editor for Pradeep Kumar B.
export const PERSONAL_INFO = ${JSON.stringify(personalInfo, null, 2)};

export const WORK_EXPERIENCES = ${JSON.stringify(workExperiences, null, 2)};
`;
  };

  const downloadResumePdf = async () => {
    try {
      const doc = generateLatexStylePdf({
        ...personalInfo,
        workExperiences,
        registerMap,
        education,
        publication
      });
      doc.save(RESUME_FILENAME);
    } catch (e) {
      console.error('Failed to generate vector 1-page PDF, falling back to static asset', e);
      const a = document.createElement('a');
      a.href = RESUME_DOWNLOAD_URL;
      a.download = RESUME_FILENAME;
      a.click();
    }
  };

  return (
    <PortfolioContext.Provider
      value={{
        personalInfo,
        workExperiences,
        projects,
        registerMap,
        education,
        publication,
        resumeFileName: RESUME_FILENAME,
        resumeDownloadUrl: RESUME_DOWNLOAD_URL,
        downloadResumePdf,
        isOwner,
        authenticateOwner,
        logoutOwner,
        isEditModalOpen,
        setIsEditModalOpen,
        isResumeModalOpen,
        setIsResumeModalOpen,
        updatePersonalInfo,
        setWorkExperiences,
        addWorkExperience,
        updateWorkExperience,
        deleteWorkExperience,
        reorderWorkExperience,
        setProjects,
        setRegisterMap,
        setEducation,
        updatePublication,
        saveAllContent,
        resetToDefaults,
        importState,
        exportStateJson,
        generateTypeScriptCode
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};
