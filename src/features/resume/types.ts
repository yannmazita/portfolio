// src/features/resume/types.ts
export interface ResumeEntry {
  id: string;
  company: string;
  role: string;
  period: string;
  location: string;
  description: string[];
}

export interface EducationEntry {
  id: string;
  institution: string;
  degree: string;
  period: string;
  location: string;
}

export interface CertificationEntry {
  id: string;
  name: string;
  issuer: string;
  period: string;
  credentialId?: string;
  description: string[];
}
