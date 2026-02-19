// Validation utilities for resume builder checklist and submission
import { ResumeData } from '@/components/BuilderForm';

export interface ValidationResult {
  passed: boolean;
  checklist: {
    name: boolean;
    email: boolean;
    phone: boolean;
    summary: boolean;
    education: boolean;
    experience: boolean;
    skills: boolean;
    links: boolean;
    projects: boolean;
    wordCount: boolean;
  };
  passedCount: number;
  totalTests: number;
}

/**
 * Validate resume data against 10 essential criteria
 */
export function validateResumeData(data: ResumeData): ValidationResult {
  const checklist = {
    // 1. Name provided
    name: !!(data.personalInfo?.name && data.personalInfo.name.trim().length > 0),
    
    // 2. Email provided
    email: !!(data.personalInfo?.email && data.personalInfo.email.trim().length > 0),
    
    // 3. Phone provided
    phone: !!(data.personalInfo?.phone && data.personalInfo.phone.trim().length > 0),
    
    // 4. Summary provided (at least 20 characters)
    summary: !!(data.summary && data.summary.trim().length >= 20),
    
    // 5. Education entry exists
    education: !!(Array.isArray(data.education) && data.education.length > 0 && 
      data.education.some(e => e.school || e.degree)),
    
    // 6. Experience entry exists
    experience: !!(Array.isArray(data.experience) && data.experience.length > 0 && 
      data.experience.some(e => e.company || e.position)),
    
    // 7. At least 3 skills
    skills: (() => {
      const skillCount = data.skills ? data.skills.filter(s => s && s.trim().length > 0).length : 0;
      return skillCount >= 3;
    })(),
    
    // 8. GitHub or LinkedIn link provided
    links: !!(
      (data.links?.github && data.links.github.trim().length > 0) ||
      (data.links?.linkedin && data.links.linkedin.trim().length > 0)
    ),
    
    // 9. At least 1 project
    projects: !!(Array.isArray(data.projects) && data.projects.length > 0 && 
      data.projects.some(p => p.title && p.title.trim().length > 0)),
    
    // 10. Resume has minimum 100 words of content
    wordCount: (() => {
      const contentParts = [
        data.summary,
        ...data.experience.map(e => e.description).filter(Boolean),
        ...data.projects.map(p => p.description).filter(Boolean),
      ];
      const totalText = contentParts.join(' ');
      const wordCount = totalText.trim().split(/\s+/).length;
      return wordCount >= 100;
    })(),
  };

  const passedCount = Object.values(checklist).filter(Boolean).length;
  const totalTests = Object.values(checklist).length;

  return {
    passed: passedCount === totalTests,
    checklist,
    passedCount,
    totalTests,
  };
}

/**
 * Validate URL format
 */
export function isValidUrl(url: string): boolean {
  if (!url || url.trim().length === 0) return false;
  
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validate specific URL patterns
 */
export function validateLovableLink(url: string): boolean {
  if (!isValidUrl(url)) return false;
  return url.includes('lovable.dev') || url.includes('lovable');
}

export function validateGitHubLink(url: string): boolean {
  if (!isValidUrl(url)) return false;
  return url.includes('github.com');
}

export function validateDeployedUrl(url: string): boolean {
  if (!isValidUrl(url)) return false;
  // Very permissive - any valid URL works for deployed app
  return true;
}

/**
 * Get validation error message
 */
export function getValidationError(field: 'lovable' | 'github' | 'deploy', url: string): string | null {
  if (!url || url.trim().length === 0) {
    const fieldNames = { lovable: 'Lovable', github: 'GitHub', deploy: 'Deployed' };
    return `${fieldNames[field]} link is required`;
  }

  if (!isValidUrl(url)) {
    return 'Invalid URL format';
  }

  if (field === 'lovable' && !validateLovableLink(url)) {
    return 'Must be a Lovable.dev project link';
  }

  if (field === 'github' && !validateGitHubLink(url)) {
    return 'Must be a GitHub repository link';
  }

  return null;
}

/**
 * Get user-friendly checklist item label
 */
export function getChecklistLabel(key: keyof ValidationResult['checklist']): string {
  const labels: Record<keyof ValidationResult['checklist'], string> = {
    name: '✓ Full name provided',
    email: '✓ Email address provided',
    phone: '✓ Phone number provided',
    summary: '✓ Professional summary (20+ characters)',
    education: '✓ Education section completed',
    experience: '✓ Work experience added',
    skills: '✓ At least 3 skills listed',
    links: '✓ GitHub or LinkedIn profile',
    projects: '✓ At least 1 project included',
    wordCount: '✓ Minimum 100 words of content',
  };
  return labels[key];
}
