'use client';

import { ATSScore } from '@/lib/atsScoring';

interface ATSScoreDisplayProps {
  atsScore: ATSScore;
}

export function ATSScoreDisplay({ atsScore }: ATSScoreDisplayProps) {
  const percentage = Math.max(0, Math.min(100, atsScore.score));

  // Determine color based on specified ranges:
  // 0-40: Red, 41-70: Amber, 71-100: Green
  const getScoreColor = (score: number): string => {
    if (score >= 71) return '#2C7F2F'; // Green
    if (score >= 41) return '#FFB020'; // Amber
    return '#D14343'; // Red
  };

  const scoreColor = getScoreColor(percentage);

  return (
    <div className="bg-white border border-[#ECE8E0] rounded-lg p-6 mb-6">
      {/* Score Meter */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-[#2C2C2C] mb-4" style={{ fontFamily: 'Georgia, Times New Roman, serif' }}>
          ATS Readiness Score
        </h3>

        {/* Score Display */}
        <div className="flex items-center gap-6">
          {/* Visual Score Circle */}
          <div className="relative w-24 h-24 flex-shrink-0">
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="48"
                cy="48"
                r="40"
                fill="none"
                stroke="#ECE8E0"
                strokeWidth="4"
              />
              <circle
                cx="48"
                cy="48"
                r="40"
                fill="none"
                stroke={scoreColor}
                strokeWidth="4"
                strokeDasharray={`${(percentage / 100) * 251.2} 251.2`}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-2xl font-bold" style={{ color: scoreColor }}>
                {percentage}
              </span>
            </div>
          </div>

          {/* Score Text */}
          <div className="flex-1">
            <p className="text-sm text-[#999999] mb-2">
              Your resume is optimized for ATS (Applicant Tracking System)
            </p>
            <p className="text-2xl font-bold" style={{ color: scoreColor }}>
              {percentage >= 71 ? 'Strong Resume' : percentage >= 41 ? 'Getting There' : 'Needs Work'}
            </p>
          </div>
        </div>
      </div>

      {/* Breakdown */}
      <div className="mb-6 pb-6 border-t border-[#ECE8E0] pt-6">
        <h4 className="text-sm font-medium text-[#2C2C2C] mb-4">Score Breakdown</h4>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center justify-between">
            <span className="text-[#999999]">Summary</span>
            <span className="font-medium text-[#2C2C2C]">{atsScore.breakdown.summary}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[#999999]">Projects</span>
            <span className="font-medium text-[#2C2C2C]">{atsScore.breakdown.projects}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[#999999]">Experience</span>
            <span className="font-medium text-[#2C2C2C]">{atsScore.breakdown.experience}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[#999999]">Skills</span>
            <span className="font-medium text-[#2C2C2C]">{atsScore.breakdown.skills}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[#999999]">Links</span>
            <span className="font-medium text-[#2C2C2C]">{atsScore.breakdown.links}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[#999999]">Metrics</span>
            <span className="font-medium text-[#2C2C2C]">{atsScore.breakdown.numbers}</span>
          </div>
        </div>
      </div>

      {/* Suggestions */}
      {atsScore.suggestions.length > 0 && (
        <div className="bg-[#FFFEF9] border border-[#ECE8E0] rounded-lg p-4">
          <h4 className="text-sm font-medium text-[#2C2C2C] mb-3">Suggestions to Improve</h4>
          <ul className="space-y-2">
            {atsScore.suggestions.map((suggestion, idx) => (
              <li key={idx} className="flex gap-3 text-sm">
                <span className="text-[#8B0000] font-bold flex-shrink-0">→</span>
                <span className="text-[#2C2C2C]">{suggestion}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
