/**
 * Bullet discipline helpers
 */

const ACTION_VERBS = [
  'built',
  'developed',
  'designed',
  'implemented',
  'led',
  'improved',
  'created',
  'optimized',
  'automated',
  'managed',
  'directed',
  'established',
  'designed',
  'enhanced',
  'engineered',
  'expanded',
  'spearheaded',
  'accelerated',
  'achieved',
  'reduced',
  'increased',
  'decreased',
  'streamlined',
  'resolved',
  'deployed',
  'integrated',
  'launched',
];

const NUMBER_REGEX = /\d+%|\d+[kK]|\d+\s*(x|X)|\d+\s*(second|minute|hour|day|week|month|year|user|customer|team|project|item|page|request|transaction|query|document|file|line|point|percent|dollar|rate|time|speed|load|latency|throughput|retention|roi|conversion|engagement|satisfaction|uptime|availability|efficiency|productivity)s?\b|\d+\s*\+/i;

/**
 * Check if bullet starts with action verb
 */
export function startsWithActionVerb(text: string): boolean {
  if (!text || text.trim().length === 0) return false;
  const firstWord = text.trim().split(/\s+/)[0].toLowerCase();
  return ACTION_VERBS.includes(firstWord);
}

/**
 * Check if bullet contains numeric indicator
 */
export function hasNumericIndicator(text: string): boolean {
  if (!text || text.trim().length === 0) return false;
  return NUMBER_REGEX.test(text);
}

/**
 * Get suggestions for a bullet
 */
export function getBulletSuggestions(text: string): string[] {
  const suggestions: string[] = [];

  if (!startsWithActionVerb(text)) {
    suggestions.push('Start with a strong action verb.');
  }

  if (!hasNumericIndicator(text)) {
    suggestions.push('Add measurable impact (numbers).');
  }

  return suggestions;
}
