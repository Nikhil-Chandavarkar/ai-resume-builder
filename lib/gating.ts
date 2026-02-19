// Gating system for KodNest Premium Build System
// Prevents users from skipping steps - must upload artifact to proceed

import { hasArtifact } from './artifacts';

export const STEPS = [
  { number: 1, name: 'Problem', path: '/rb/01-problem' },
  { number: 2, name: 'Market', path: '/rb/02-market' },
  { number: 3, name: 'Architecture', path: '/rb/03-architecture' },
  { number: 4, name: 'HLD', path: '/rb/04-hld' },
  { number: 5, name: 'LLD', path: '/rb/05-lld' },
  { number: 6, name: 'Build', path: '/rb/06-build' },
  { number: 7, name: 'Test', path: '/rb/07-test' },
  { number: 8, name: 'Ship', path: '/rb/08-ship' },
] as const;

/**
 * Check if user can access a specific step
 * Rules:
 * - Step 1 is always accessible
 * - All other steps require the previous step to have an artifact
 */
export function canAccessStep(stepNumber: number): boolean {
  // Step 1 is always accessible
  if (stepNumber === 1) return true;
  
  // All other steps require previous step to have artifact
  const previousStep = stepNumber - 1;
  return hasArtifact(previousStep);
}

/**
 * Get the next step number if available
 * Returns null if current step is last or if artifact not uploaded
 */
export function getNextStep(currentStep: number): number | null {
  if (currentStep >= STEPS.length) return null;
  
  // Must have artifact to proceed
  if (!hasArtifact(currentStep)) return null;
  
  return currentStep + 1;
}

/**
 * Get the previous step number
 * Returns null if already at first step
 */
export function getPreviousStep(currentStep: number): number | null {
  if (currentStep <= 1) return null;
  return currentStep - 1;
}

/**
 * Get current step info by path
 */
export function getStepByPath(path: string): typeof STEPS[number] | null {
  return STEPS.find(step => step.path === path) || null;
}

/**
 * Get step info by number
 */
export function getStepByNumber(number: number): typeof STEPS[number] | null {
  return STEPS.find(step => step.number === number) || null;
}

/**
 * Calculate completion status
 */
export function getCompletionStatus(): {
  completed: number[];
  inProgress: number;
  blocked: number[];
} {
  const completed: number[] = [];
  const blocked: number[] = [];
  
  for (let i = 1; i <= STEPS.length; i++) {
    if (hasArtifact(i)) {
      completed.push(i);
    } else if (!canAccessStep(i)) {
      blocked.push(i);
    }
  }
  
  // Find first incomplete step
  const inProgress = completed.length + 1;
  
  return { completed, inProgress: Math.min(inProgress, STEPS.length), blocked };
}
