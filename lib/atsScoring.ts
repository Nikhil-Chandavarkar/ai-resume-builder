
import { ResumeData } from '@/components/BuilderForm';

export interface ATSScore {
  score: number;
  suggestions: string[];
  breakdown: {
    summary: number;
    projects: number;
    experience: number;
    skills: number;
    links: number;
    numbers: number;
    education: number;
  };
}

/**
 * Calculate ATS readiness score (0-100) deterministically
 * 
 * Scoring rules:
 * +15 if summary length is 40–120 words
 * +10 if at least 2 projects
 * +10 if at least 1 experience entry
 * +10 if skills list has ≥ 8 items
 * +10 if GitHub or LinkedIn link exists
 * +15 if any experience/project bullet contains a number (%, X, k, etc.)
 * +10 if education section has complete fields
 * Cap at 100.
 */
export function calculateATSScore(data: ResumeData): ATSScore {
  const breakdown = {
    summary: 0,
    projects: 0,
    experience: 0,
    skills: 0,
    links: 0,
    numbers: 0,
    education: 0,
  };

  let score = 0;

  // 1. Summary quality (15 points)
  const summaryWordCount = data.summary.trim().split(/\s+/).length;
  if (summaryWordCount >= 40 && summaryWordCount <= 120) {
    breakdown.summary = 15;
    score += 15;
  }

  // 2. Projects count (10 points)
  if (data.projects.length >= 2) {
    breakdown.projects = 10;
    score += 10;
  }

  // 3. Experience entries (10 points)
  if (data.experience.length >= 1) {
    breakdown.experience = 10;
    score += 10;
  }

  // 4. Skills count (10 points)
  if (data.skills.length >= 8) {
    breakdown.skills = 10;
    score += 10;
  }

  // 5. Links (10 points)
  if (data.links.github || data.links.linkedin) {
    breakdown.links = 10;
    score += 10;
  }

  // 6. Numbers in content (15 points)
  // Check for numbers, percentages, or metrics in experience/projects
  const hasNumbers = checkForNumbers(data);
  if (hasNumbers) {
    breakdown.numbers = 15;
    score += 15;
  }

  // 7. Education completeness (10 points)
  const hasCompleteEducation = data.education.some(
    (edu) =>
      edu.school &&
      edu.degree &&
      edu.field &&
      edu.startDate &&
      edu.endDate
  );
  if (hasCompleteEducation) {
    breakdown.education = 10;
    score += 10;
  }

  // Cap at 100
  score = Math.min(score, 100);

  const suggestions = generateSuggestions(data, breakdown);

  return { score, suggestions, breakdown };
}

/**
 * Check if content contains numbers, percentages, or metrics
 */
function checkForNumbers(data: ResumeData): boolean {
  const numberRegex = /\d+%|\d+[kK]|improved|increased|decreased|grew|scaled|reduced|by \d+|x\d+|\d+\s*(seconds|minutes|hours|days|weeks|months|years)/i;

  // Check experience descriptions
  for (const exp of data.experience) {
    if (numberRegex.test(exp.description)) {
      return true;
    }
  }

  // Check project descriptions
  for (const proj of data.projects) {
    if (numberRegex.test(proj.description)) {
      return true;
    }
  }

  return false;
}

/**
 * Generate up to 3 actionable suggestions based on missing elements
 */
function generateSuggestions(data: ResumeData, breakdown: ATSScore['breakdown']): string[] {
  const suggestions: string[] = [];

  // Check for missing high-impact items
  if (breakdown.summary === 0) {
    suggestions.push('Write a stronger summary (40–120 words) to increase ATS score.');
  }

  if (breakdown.projects === 0) {
    suggestions.push('Add at least 2 projects to boost your ATS readiness.');
  }

  if (breakdown.numbers === 0) {
    suggestions.push('Add measurable impact (numbers, percentages) in your experience and projects.');
  }

  if (breakdown.education === 0 && data.education.length === 0) {
    suggestions.push('Complete your education section with all details.');
  }

  if (breakdown.skills === 0) {
    suggestions.push('Add more skills (target 8+ items) to improve ATS matching.');
  }

  if (breakdown.links === 0) {
    suggestions.push('Add your GitHub or LinkedIn profile to enhance credibility.');
  }

  // Return top 3 suggestions
  return suggestions.slice(0, 3);
}
