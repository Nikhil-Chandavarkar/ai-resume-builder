'use client';

import { ReactNode } from 'react';

interface TopBarProps {
  projectTitle: string;
  stepTitle: string;
  stepNumber: number;
  totalSteps: number;
  statusBadge?: string;
  statusColor?: 'accent' | 'neutral';
}

export function TopBar({
  projectTitle,
  stepTitle,
  stepNumber,
  totalSteps,
  statusBadge = 'In Progress',
  statusColor = 'neutral',
}: TopBarProps) {
  const colorClasses = {
    accent: 'bg-[#8B0000] text-white border-[#8B0000]',
    neutral: 'bg-[#ECE8E0] text-[#2C2C2C] border-[#999999]',
  };

  return (
    <div className="bg-white border-b border-[#999999]">
      <div className="px-16 py-6 flex items-center justify-between">
        {/* Left: Project Title */}
        <div className="flex-1">
          <h2 className="text-lg font-semibold text-[#2C2C2C]" style={{ fontFamily: 'Georgia, Times New Roman, serif' }}>
            {projectTitle}
          </h2>
        </div>

        {/* Center: Step Progress */}
        <div className="flex-1 flex justify-center">
          <div className="text-center">
            <p className="text-sm font-medium text-[#2C2C2C]">
              {stepTitle}
            </p>
            <p className="text-xs text-[#999999] mt-2">
              Step {stepNumber} of {totalSteps}
            </p>
          </div>
        </div>

        {/* Right: Status Badge */}
        <div className="flex-1 flex justify-end">
          <div className={`inline-flex items-center px-4 py-2 rounded-md border text-xs font-medium ${colorClasses[statusColor]}`}>
            <span className="w-2 h-2 mr-2 rounded-full"
              style={{
                backgroundColor: statusColor === 'accent' ? '#fff' : '#8B0000'
              }} />
            {statusBadge}
          </div>
        </div>
      </div>
    </div>
  );
}
