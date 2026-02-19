'use client';

import { ReactNode } from 'react';
import { TopBar } from './TopBar';
import { BuildPanel } from './BuildPanel';

interface PremiumLayoutProps {
  projectTitle: string;
  stepNumber: number;
  stepName: string;
  children: ReactNode;
  statusBadge?: string;
  statusColor?: 'accent' | 'neutral';
  buildPanelProps?: {
    defaultContent?: string;
    onArtifactUpload?: (type: string, value: string) => Promise<void>;
    isLoading?: boolean;
  };
  footerContent?: ReactNode;
}

export function PremiumLayout({
  projectTitle,
  stepNumber,
  stepName,
  children,
  statusBadge = 'In Progress',
  statusColor = 'neutral',
  buildPanelProps,
  footerContent,
}: PremiumLayoutProps) {
  const totalSteps = 8;

  return (
    <div className="flex flex-col h-screen bg-[#F7F6F3] overflow-hidden">
      {/* Top Bar */}
      <TopBar
        projectTitle={projectTitle}
        stepTitle={stepName}
        stepNumber={stepNumber}
        totalSteps={totalSteps}
        statusBadge={statusBadge}
        statusColor={statusColor}
      />

      {/* Main Content Container */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left: Main Workspace (70%) */}
        <div className="flex-1 flex flex-col overflow-hidden bg-white">
          {/* Context Header */}
          <div className="bg-[#F7F6F3] border-b border-[#999999] px-16 py-6">
            <h2 className="text-sm font-semibold text-[#2C2C2C]">
              Step {stepNumber}: {stepName}
            </h2>
            <p className="text-xs text-[#666666] mt-3">
              Complete this step and upload artifact to proceed to the next step
            </p>
          </div>

          {/* Main Content */}
          <div className="flex-1 overflow-y-auto px-16 py-8">
            {children}
          </div>
        </div>

        {/* Right: Build Panel (30%) */}
        <div className="w-[30%] bg-[#F7F6F3] border-l border-[#999999] overflow-hidden flex flex-col">
          <BuildPanel
            stepNumber={stepNumber}
            {...buildPanelProps}
          />
        </div>
      </div>

      {/* Footer */}
      {footerContent && (
        <div className="border-t border-[#999999] bg-white px-16 py-4 text-xs text-[#666666]">
          {footerContent}
        </div>
      )}
    </div>
  );
}
