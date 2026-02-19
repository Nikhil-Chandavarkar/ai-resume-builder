'use client';

import { getBulletSuggestions } from './bulletDisciplineUtils';

interface BulletGuidanceProps {
  text: string;
  onChange?: (text: string) => void;
}

/**
 * Inline bullet guidance component
 */
export function BulletGuidance({ text }: BulletGuidanceProps) {
  const suggestions = getBulletSuggestions(text);

  if (suggestions.length === 0) {
    return null;
  }

  return (
    <div className="mt-2 text-xs space-y-1">
      {suggestions.map((suggestion, idx) => (
        <div key={idx} className="flex items-start gap-2 text-[#999999]">
          <span className="text-[#8B0000] font-bold mt-0.5">→</span>
          <span>{suggestion}</span>
        </div>
      ))}
    </div>
  );
}
