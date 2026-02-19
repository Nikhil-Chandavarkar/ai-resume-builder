import { ResumeData } from '@/components/BuilderForm';

export interface ImprovementItem {
  title: string;
  description: string;
  priority: number;
}

/**
 * Generate top 3 improvement suggestions based on resume content
 */
export function getTopImprovements(data: ResumeData): ImprovementItem[] {
  const improvements: ImprovementItem[] = [];

  // Check for projects
  const activeProjects = data.projects.filter(p => p.title && p.title.trim());
  if (activeProjects.length < 2) {
    improvements.push({
      title: 'Add More Projects',
      description: 'You have ' + activeProjects.length + ' project(s). Adding 2+ projects strengthens your portfolio and ATS score.',
      priority: 1,
    });
  }

  // Check for numbers in bullets
  const hasNumbers = checkForNumbersInContent(data);
  if (!hasNumbers) {
    improvements.push({
      title: 'Add Measurable Impact',
      description: 'Include numbers, percentages, or metrics in your experience and project descriptions (e.g., "improved by 40%").',
      priority: 2,
    });
  }

  // Check summary length
  const summaryWords = data.summary.trim().split(/\s+/).length;
  if (summaryWords < 40) {
    improvements.push({
      title: 'Expand Your Summary',
      description: 'Your summary is ' + summaryWords + ' words. Aim for 40–120 words to optimize ATS matching.',
      priority: 3,
    });
  }

  // Check skills count
  const activeSkills = data.skills.filter(s => s.trim());
  if (activeSkills.length < 8) {
    improvements.push({
      title: 'Expand Your Skills',
      description: 'You have ' + activeSkills.length + ' skill(s). Adding 8+ skills improves ATS compatibility.',
      priority: 4,
    });
  }

  // Check for experience
  const activeExperience = data.experience.filter(e => e.company || e.position);
  if (activeExperience.length === 0) {
    improvements.push({
      title: 'Add Work Experience',
      description: 'Include internships, freelance work, or volunteer experience to strengthen your resume.',
      priority: 5,
    });
  }

  // Return top 3 sorted by priority
  return improvements.sort((a, b) => a.priority - b.priority).slice(0, 3);
}

/**
 * Check if content contains numbers
 */
function checkForNumbersInContent(data: ResumeData): boolean {
  const numberRegex = /\d+%|\d+[kK]|improved|increased|decreased|grew|scaled|reduced|by \d+|x\d+|\d+\s*(seconds|minutes|hours|days|weeks|months|years|users|customers|times)/i;

  // Check experience
  for (const exp of data.experience) {
    if (numberRegex.test(exp.description)) return true;
  }

  // Check projects
  for (const proj of data.projects) {
    if (numberRegex.test(proj.description)) return true;
  }

  return false;
}
