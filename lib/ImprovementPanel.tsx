'use client';

import { ImprovementItem } from './improvementsUtils';

interface ImprovementPanelProps {
  improvements: ImprovementItem[];
}

/**
 * Improvement suggestions panel
 */
export function ImprovementPanel({ improvements }: ImprovementPanelProps) {
  if (improvements.length === 0) {
    return null;
  }

  return (
    <div className="bg-[#FFFEF9] border border-[#ECE8E0] rounded-lg p-6 mt-6">
      <h4 className="text-lg font-semibold text-[#2C2C2C] mb-4" style={{ fontFamily: 'Georgia, Times New Roman, serif' }}>
        Quick Wins
      </h4>
      <div className="space-y-4">
        {improvements.map((improvement, idx) => (
          <div key={idx} className="border-l-4 border-[#8B0000] pl-4">
            <h5 className="font-medium text-[#2C2C2C] text-sm mb-1">{improvement.title}</h5>
            <p className="text-[#999999] text-sm">{improvement.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
