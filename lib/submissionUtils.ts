// Storage and retrieval utilities for final submission
export interface FinalSubmission {
  lovableProject: string;
  githubRepository: string;
  deployedUrl: string;
  stepsCompleted: number;
  checklistsPassed: number;
  timestamp: number;
}

/**
 * Save final submission to localStorage
 */
export function saveFinalSubmission(submission: Partial<FinalSubmission>): void {
  if (typeof window === 'undefined') return;
  
  const existing = getFinalSubmission() || {
    lovableProject: '',
    githubRepository: '',
    deployedUrl: '',
    stepsCompleted: 0,
    checklistsPassed: 0,
    timestamp: 0,
  };

  const updated: FinalSubmission = {
    ...existing,
    ...submission,
    timestamp: Date.now(),
  };

  localStorage.setItem('rb_final_submission', JSON.stringify(updated));
}

/**
 * Get final submission from localStorage
 */
export function getFinalSubmission(): FinalSubmission | null {
  if (typeof window === 'undefined') return null;

  const stored = localStorage.getItem('rb_final_submission');
  if (!stored) return null;

  try {
    return JSON.parse(stored) as FinalSubmission;
  } catch {
    return null;
  }
}

/**
 * Clear final submission from localStorage
 */
export function clearFinalSubmission(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('rb_final_submission');
}

/**
 * Check if submission is complete (has all 3 links)
 */
export function isSubmissionComplete(submission: FinalSubmission | null): boolean {
  if (!submission) return false;
  
  return !!(
    submission.lovableProject &&
    submission.lovableProject.trim().length > 0 &&
    submission.githubRepository &&
    submission.githubRepository.trim().length > 0 &&
    submission.deployedUrl &&
    submission.deployedUrl.trim().length > 0
  );
}

/**
 * Generate formatted submission text for copying
 */
export function generateSubmissionText(submission: FinalSubmission): string {
  const separator = '------------------------------------------';
  
  return `${separator}
AI Resume Builder — Final Submission

Lovable Project: ${submission.lovableProject || 'Not provided'}
GitHub Repository: ${submission.githubRepository || 'Not provided'}
Live Deployment: ${submission.deployedUrl || 'Not provided'}

Core Capabilities:
- Structured resume builder
- Deterministic ATS scoring
- Template switching
- PDF export with clean formatting
- Persistence + validation checklist

Steps Completed: ${submission.stepsCompleted}/8
Checklists Passed: ${submission.checklistsPassed}/10
${separator}`;
}
