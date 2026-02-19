'use client';

import { useState, useEffect } from 'react';
import { PremiumLayout } from '@/components/PremiumLayout';
import { getCompletionStatus, STEPS } from '@/lib/gating';
import { useResumeData } from '@/hooks/useResumeData';
import { validateResumeData, getValidationError, getChecklistLabel } from '@/lib/validationUtils';
import { saveFinalSubmission, getFinalSubmission, generateSubmissionText, isSubmissionComplete } from '@/lib/submissionUtils';

export default function ProofPage() {
  const { data: resumeData } = useResumeData();
  const [completionStatus, setCompletionStatus] = useState<ReturnType<typeof getCompletionStatus>>({ completed: [], inProgress: 1, blocked: [] });
  const [validation, setValidation] = useState<ReturnType<typeof validateResumeData> | null>(null);
  const [lovableLink, setLovableLink] = useState('');
  const [githubLink, setGithubLink] = useState('');
  const [deployLink, setDeployLink] = useState('');
  const [copiedMessage, setCopiedMessage] = useState(false);
  const [shippedMessage, setShippedMessage] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [validationErrors, setValidationErrors] = useState<Record<string, string | null>>({
    lovable: null,
    github: null,
    deploy: null,
  });

  useEffect(() => {
    // Load completion status
    setCompletionStatus(getCompletionStatus());
    
    // Load and validate resume data
    if (resumeData) {
      const validationResult = validateResumeData(resumeData);
      setValidation(validationResult);
    }
    
    // Load saved submission if exists
    const savedSubmission = getFinalSubmission();
    if (savedSubmission) {
      setLovableLink(savedSubmission.lovableProject || '');
      setGithubLink(savedSubmission.githubRepository || '');
      setDeployLink(savedSubmission.deployedUrl || '');
    }
    
    setIsLoading(false);
  }, [resumeData]);

  const handleLinkChange = (type: 'lovable' | 'github' | 'deploy', value: string) => {
    if (type === 'lovable') setLovableLink(value);
    else if (type === 'github') setGithubLink(value);
    else setDeployLink(value);

    // Validate on change
    const error = getValidationError(type, value);
    setValidationErrors(prev => ({ ...prev, [type]: error }));
  };

  const handleSaveLinks = () => {
    const lovableError = getValidationError('lovable', lovableLink);
    const githubError = getValidationError('github', githubLink);
    const deployError = getValidationError('deploy', deployLink);

    setValidationErrors({
      lovable: lovableError,
      github: githubError,
      deploy: deployError,
    });

    if (!lovableError && !githubError && !deployError) {
      saveFinalSubmission({
        lovableProject: lovableLink,
        githubRepository: githubLink,
        deployedUrl: deployLink,
        stepsCompleted: completionStatus.completed.length,
        checklistsPassed: validation?.passedCount || 0,
      });
    }
  };

  const handleCopySubmission = async () => {
    const submission = getFinalSubmission();
    if (!submission) {
      handleSaveLinks();
      return;
    }

    const submissionText = generateSubmissionText(submission);

    try {
      await navigator.clipboard.writeText(submissionText);
      setCopiedMessage(true);
      setTimeout(() => setCopiedMessage(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-600">Loading...</p>
      </div>
    );
  }

  const allStepsCompleted = completionStatus.completed.length === 8;
  const allChecklistsPassed = validation?.passed || false;
  const allLinksProvided = !!(
    lovableLink.trim().length > 0 &&
    githubLink.trim().length > 0 &&
    deployLink.trim().length > 0 &&
    !validationErrors.lovable &&
    !validationErrors.github &&
    !validationErrors.deploy
  );

  const isShipped = allStepsCompleted && allChecklistsPassed && allLinksProvided;
  const statusBadge = isShipped ? 'Shipped' : 'In Progress';

  return (
    <PremiumLayout
      projectTitle="AI Resume Builder"
      stepNumber={9}
      stepName="Proof of Completion"
      statusBadge={statusBadge}
      statusColor={isShipped ? 'accent' : 'neutral'}
    >
      <div className="max-w-4xl">
        <h1 className="text-3xl font-bold text-[#2C2C2C] mb-2" style={{ fontFamily: 'Georgia, Times New Roman, serif' }}>
          Project Proof & Shipping
        </h1>
        <p className="text-[#666666] mb-8">
          Complete all requirements to ship your project
        </p>

        {/* Shipped Success Message */}
        {isShipped && (
          <div className="mb-8 p-6 bg-[#E8F5E9] border border-[#2C7F2F] rounded-lg">
            <p className="text-[#2C7F2F] font-medium text-lg">
              ✓ Project 3 Shipped Successfully.
            </p>
            <p className="text-[#2C7F2F] text-sm mt-2">
              All requirements met. Your submission is ready.
            </p>
          </div>
        )}

        {/* Step Progress */}
        <div className="bg-white border border-[#999999] rounded-lg p-8 mb-8">
          <h2 className="text-lg font-semibold text-[#2C2C2C] mb-2" style={{ fontFamily: 'Georgia, Times New Roman, serif' }}>
            Step Completion Overview
          </h2>
          <p className="text-sm text-[#666666] mb-6">
            {completionStatus.completed.length} of 8 steps completed
          </p>
          
          <div className="space-y-3">
            {STEPS.map((step) => {
              const isCompleted = completionStatus.completed.includes(step.number);
              const isBlocked = completionStatus.blocked.includes(step.number);
              
              return (
                <div
                  key={step.number}
                  className={`flex items-center p-3 rounded-lg border ${
                    isCompleted
                      ? 'bg-[#E8F5E9] border-[#2C7F2F]'
                      : isBlocked
                      ? 'bg-[#F7F6F3] border-[#999999]'
                      : 'bg-[#FFFEF9] border-[#999999]'
                  }`}
                >
                  <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold mr-3"
                    style={{
                      backgroundColor: isCompleted ? '#2C7F2F' : isBlocked ? '#999999' : '#8B0000',
                      color: 'white',
                      minWidth: '28px'
                    }}
                  >
                    {isCompleted ? '✓' : step.number}
                  </div>
                  <div className="flex-1">
                    <p className={`text-sm font-medium ${isCompleted ? 'text-[#2C7F2F]' : isBlocked ? 'text-[#999999]' : 'text-[#2C2C2C]'}`}>
                      Step {step.number}: {step.name}
                    </p>
                  </div>
                  <span className="text-xs font-medium"
                    style={{
                      color: isCompleted ? '#2C7F2F' : isBlocked ? '#999999' : '#8B0000'
                    }}
                  >
                    {isCompleted ? 'Complete' : isBlocked ? 'Blocked' : 'In Progress'}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="mt-6 text-xs text-[#666666]">
            {!allStepsCompleted && (
              <p>
                ⏳ Complete Step {completionStatus.inProgress} to unlock Step {completionStatus.inProgress + 1}
              </p>
            )}
            {allStepsCompleted && (
              <p className="text-[#2C7F2F] font-medium">
                ✓ All 8 steps completed
              </p>
            )}
          </div>
        </div>

        {/* Validation Checklist */}
        {validation && (
          <div className="bg-white border border-[#999999] rounded-lg p-8 mb-8">
            <h2 className="text-lg font-semibold text-[#2C2C2C] mb-2" style={{ fontFamily: 'Georgia, Times New Roman, serif' }}>
              Quality Checklist
            </h2>
            <p className="text-sm text-[#666666] mb-6">
              {validation.passedCount} of {validation.totalTests} criteria met
            </p>

            <div className="space-y-3">
              {Object.entries(validation.checklist).map(([key, passed]) => (
                <div
                  key={key}
                  className={`flex items-center p-3 rounded-lg border ${
                    passed
                      ? 'bg-[#E8F5E9] border-[#2C7F2F]'
                      : 'bg-[#FFFEF9] border-[#999999]'
                  }`}
                >
                  <div className="w-5 h-5 flex items-center justify-center mr-3 flex-shrink-0"
                    style={{
                      color: passed ? '#2C7F2F' : '#999999'
                    }}
                  >
                    {passed ? '✓' : '○'}
                  </div>
                  <p className={`text-sm font-medium ${passed ? 'text-[#2C7F2F]' : 'text-[#2C2C2C]'}`}>
                    {getChecklistLabel(key as keyof typeof validation.checklist)}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-6 text-xs text-[#666666]">
              {!allChecklistsPassed && (
                <p>
                  ⏳ Ensure your resume contains all required information
                </p>
              )}
              {allChecklistsPassed && (
                <p className="text-[#2C7F2F] font-medium">
                  ✓ All quality criteria met
                </p>
              )}
            </div>
          </div>
        )}

        {/* Project Links / Artifacts Collection */}
        <div className="bg-white border border-[#999999] rounded-lg p-8 mb-8">
          <h2 className="text-lg font-semibold text-[#2C2C2C] mb-2" style={{ fontFamily: 'Georgia, Times New Roman, serif' }}>
            Artifact Collection
          </h2>
          <p className="text-sm text-[#666666] mb-6">
            Required to mark project as Shipped
          </p>

          <div className="space-y-6">
            {/* Lovable Link */}
            <div>
              <label className="block text-sm font-medium text-[#2C2C2C] mb-2">
                Lovable Project Link
                <span className="text-[#8B0000] ml-1">*</span>
              </label>
              <input
                type="url"
                value={lovableLink}
                onChange={(e) => handleLinkChange('lovable', e.target.value)}
                onBlur={() => {
                  if (lovableLink.trim()) {
                    const error = getValidationError('lovable', lovableLink);
                    setValidationErrors(prev => ({ ...prev, lovable: error }));
                  }
                }}
                placeholder="https://lovable.dev/projects/..."
                className={`w-full px-4 py-3 border rounded-lg text-sm focus:outline-none focus:ring-2 bg-white text-[#2C2C2C] ${
                  validationErrors.lovable
                    ? 'border-[#8B0000] focus:ring-[#8B0000]'
                    : 'border-[#999999] focus:ring-[#8B0000]'
                }`}
              />
              {validationErrors.lovable && (
                <p className="text-xs text-[#8B0000] mt-2">{validationErrors.lovable}</p>
              )}
            </div>

            {/* GitHub Link */}
            <div>
              <label className="block text-sm font-medium text-[#2C2C2C] mb-2">
                GitHub Repository
                <span className="text-[#8B0000] ml-1">*</span>
              </label>
              <input
                type="url"
                value={githubLink}
                onChange={(e) => handleLinkChange('github', e.target.value)}
                onBlur={() => {
                  if (githubLink.trim()) {
                    const error = getValidationError('github', githubLink);
                    setValidationErrors(prev => ({ ...prev, github: error }));
                  }
                }}
                placeholder="https://github.com/username/ai-resume-builder"
                className={`w-full px-4 py-3 border rounded-lg text-sm focus:outline-none focus:ring-2 bg-white text-[#2C2C2C] ${
                  validationErrors.github
                    ? 'border-[#8B0000] focus:ring-[#8B0000]'
                    : 'border-[#999999] focus:ring-[#8B0000]'
                }`}
              />
              {validationErrors.github && (
                <p className="text-xs text-[#8B0000] mt-2">{validationErrors.github}</p>
              )}
            </div>

            {/* Deployed Link */}
            <div>
              <label className="block text-sm font-medium text-[#2C2C2C] mb-2">
                Deployed URL
                <span className="text-[#8B0000] ml-1">*</span>
              </label>
              <input
                type="url"
                value={deployLink}
                onChange={(e) => handleLinkChange('deploy', e.target.value)}
                onBlur={() => {
                  if (deployLink.trim()) {
                    const error = getValidationError('deploy', deployLink);
                    setValidationErrors(prev => ({ ...prev, deploy: error }));
                  }
                }}
                placeholder="https://ai-resume-builder.example.com"
                className={`w-full px-4 py-3 border rounded-lg text-sm focus:outline-none focus:ring-2 bg-white text-[#2C2C2C] ${
                  validationErrors.deploy
                    ? 'border-[#8B0000] focus:ring-[#8B0000]'
                    : 'border-[#999999] focus:ring-[#8B0000]'
                }`}
              />
              {validationErrors.deploy && (
                <p className="text-xs text-[#8B0000] mt-2">{validationErrors.deploy}</p>
              )}
            </div>

            {/* Save Links Button */}
            <button
              onClick={handleSaveLinks}
              disabled={!lovableLink || !githubLink || !deployLink}
              className={`w-full px-4 py-3 text-sm font-medium rounded-lg transition ${
                lovableLink && githubLink && deployLink
                  ? 'bg-[#8B0000] text-white hover:bg-[#6B0000]'
                  : 'bg-[#F0F0F0] text-[#999999] cursor-not-allowed'
              }`}
            >
              Save Links
            </button>
          </div>

          <div className="mt-6 text-xs text-[#666666]">
            {!allLinksProvided && (
              <p>
                ⏳ Provide all 3 links to enable shipping
              </p>
            )}
            {allLinksProvided && (
              <p className="text-[#2C7F2F] font-medium">
                ✓ All links validated
              </p>
            )}
          </div>
        </div>

        {/* Final Submission Export */}
        <div className="bg-white border border-[#999999] rounded-lg p-8">
          <h2 className="text-lg font-semibold text-[#2C2C2C] mb-2" style={{ fontFamily: 'Georgia, Times New Roman, serif' }}>
            Final Submission Export
          </h2>
          
          {isShipped ? (
            <>
              <p className="text-sm text-[#666666] mb-6">
                Your project is ready to ship. Copy the submission below.
              </p>
              <button
                onClick={handleCopySubmission}
                className="w-full px-6 py-4 bg-[#8B0000] text-white font-semibold rounded-lg hover:bg-[#6B0000] transition"
              >
                {copiedMessage ? '✓ Copied to Clipboard!' : 'Copy Final Submission'}
              </button>
              <p className="text-xs text-[#2C7F2F] mt-4 font-medium text-center">
                Project 3 Shipped Successfully.
              </p>
            </>
          ) : (
            <div className="p-4 bg-[#FFFEF9] border border-[#999999] rounded-lg">
              <p className="text-sm text-[#2C2C2C] font-medium mb-3">
                ⏳ Requirements not yet met:
              </p>
              <ul className="text-xs text-[#2C2C2C] space-y-2">
                {!allStepsCompleted && (
                  <li>• Complete all 8 steps ({completionStatus.completed.length}/8)</li>
                )}
                {!allChecklistsPassed && validation && (
                  <li>• Pass all quality criteria ({validation.passedCount}/{validation.totalTests})</li>
                )}
                {!allLinksProvided && (
                  <li>• Provide and validate all 3 project links</li>
                )}
              </ul>
            </div>
          )}
        </div>
      </div>
    </PremiumLayout>
  );
}
