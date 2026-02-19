'use client';

import { ReactNode, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { PremiumLayout } from './PremiumLayout';
import { canAccessStep, getNextStep, getPreviousStep, STEPS, getStepByNumber } from '@/lib/gating';
import { hasArtifact, saveArtifact } from '@/lib/artifacts';

interface StepLayoutProps {
  stepNumber: number;
  children: ReactNode;
}

export function StepLayout({ stepNumber, children }: StepLayoutProps) {
  const router = useRouter();
  const [isAccessible, setIsAccessible] = useState(false);
  const [hasArtifactUpload, setHasArtifactUpload] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const stepInfo = getStepByNumber(stepNumber);
  const nextStep = getNextStep(stepNumber);
  const previousStep = getPreviousStep(stepNumber);

  useEffect(() => {
    // Check if user can access this step
    if (!canAccessStep(stepNumber)) {
      // Redirect to first accessible step
      router.push('/rb/01-problem');
      return;
    }

    setIsAccessible(true);
    setHasArtifactUpload(hasArtifact(stepNumber));
    setIsLoading(false);
  }, [stepNumber, router]);

  const handleArtifactUpload = async (type: string, value: string) => {
    saveArtifact(stepNumber, value, type);
    setHasArtifactUpload(true);
  };

  const handleNext = () => {
    if (!hasArtifactUpload) {
      alert('Please upload an artifact first');
      return;
    }
    if (nextStep) {
      router.push(`/rb/${String(nextStep).padStart(2, '0')}-${stepInfo ? STEPS[nextStep - 1].name.toLowerCase() : 'step'}`);
    }
  };

  const handlePrevious = () => {
    if (previousStep) {
      const prevStepInfo = getStepByNumber(previousStep);
      router.push(prevStepInfo?.path || '/rb/01-problem');
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-[#F7F6F3]">
        <p className="text-[#666666]">Loading...</p>
      </div>
    );
  }

  if (!isAccessible) {
    return (
      <div className="flex items-center justify-center h-screen bg-[#F7F6F3]">
        <p className="text-[#666666]">Access denied. Please complete previous steps.</p>
      </div>
    );
  }

  return (
    <PremiumLayout
      projectTitle="AI Resume Builder"
      stepNumber={stepNumber}
      stepName={stepInfo?.name || `Step ${stepNumber}`}
      statusBadge={hasArtifactUpload ? 'Complete' : 'In Progress'}
      statusColor={hasArtifactUpload ? 'accent' : 'neutral'}
      buildPanelProps={{
        onArtifactUpload: handleArtifactUpload,
      }}
      footerContent={
        <div className="flex items-center justify-between w-full">
          <button
            onClick={handlePrevious}
            disabled={!previousStep}
            className={`px-6 py-3 text-xs font-medium rounded transition ${
              previousStep
                ? 'bg-[#E8E8E8] text-[#2C2C2C] hover:bg-[#D0D0D0]'
                : 'bg-[#F0F0F0] text-[#999999] cursor-not-allowed'
            }`}
          >
            ← Previous
          </button>

          <div className="text-xs font-medium text-[#666666]">
            Step {stepNumber} of {STEPS.length}
          </div>

          <button
            onClick={handleNext}
            disabled={!nextStep || !hasArtifactUpload}
            className={`px-6 py-3 text-xs font-medium rounded transition ${
              nextStep && hasArtifactUpload
                ? 'bg-[#8B0000] text-white hover:bg-[#6B0000]'
                : 'bg-[#F0F0F0] text-[#999999] cursor-not-allowed'
            }`}
          >
            Next →
          </button>
        </div>
      }
    >
      {children}
    </PremiumLayout>
  );
}
