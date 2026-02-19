// Artifact storage and retrieval utilities for KodNest Premium Build System
// Artifacts are stored in localStorage with the pattern: rb_step_X_artifact

export interface Artifact {
  stepNumber: number;
  content: string;
  timestamp: number;
  type?: string; // 'lovable' | 'github' | 'deploy' | 'screenshot'
}

/**
 * Save artifact for a specific step
 */
export function saveArtifact(stepNumber: number, content: string, type?: string): void {
  if (typeof window === 'undefined') return; // Server-side safety check
  
  const artifact: Artifact = {
    stepNumber,
    content,
    timestamp: Date.now(),
    type,
  };
  
  const key = `rb_step_${stepNumber}_artifact`;
  localStorage.setItem(key, JSON.stringify(artifact));
}

/**
 * Get artifact for a specific step
 */
export function getArtifact(stepNumber: number): Artifact | null {
  if (typeof window === 'undefined') return null; // Server-side safety check
  
  const key = `rb_step_${stepNumber}_artifact`;
  const stored = localStorage.getItem(key);
  
  if (!stored) return null;
  
  try {
    return JSON.parse(stored) as Artifact;
  } catch {
    return null;
  }
}

/**
 * Check if a step has an artifact (artifact uploaded)
 */
export function hasArtifact(stepNumber: number): boolean {
  return getArtifact(stepNumber) !== null;
}

/**
 * Delete artifact for a specific step
 */
export function deleteArtifact(stepNumber: number): void {
  if (typeof window === 'undefined') return;
  
  const key = `rb_step_${stepNumber}_artifact`;
  localStorage.removeItem(key);
}

/**
 * Get all artifacts
 */
export function getAllArtifacts(): Artifact[] {
  if (typeof window === 'undefined') return [];
  
  const artifacts: Artifact[] = [];
  
  for (let i = 1; i <= 8; i++) {
    const artifact = getArtifact(i);
    if (artifact) {
      artifacts.push(artifact);
    }
  }
  
  return artifacts;
}
