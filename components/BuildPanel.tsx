'use client';

import { useState } from 'react';

interface BuildPanelProps {
  stepNumber: number;
  defaultContent?: string;
  onArtifactUpload?: (type: string, value: string) => Promise<void>;
  isLoading?: boolean;
}

export function BuildPanel({ 
  stepNumber, 
  defaultContent = '',
  onArtifactUpload,
  isLoading = false,
}: BuildPanelProps) {
  const [content, setContent] = useState(defaultContent);
  const [uploadStatus, setUploadStatus] = useState<'none' | 'success' | 'error' | 'waiting'>('none');
  const [copiedMessage, setCopiedMessage] = useState(false);

  const handleCopyToLovable = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setCopiedMessage(true);
      setTimeout(() => setCopiedMessage(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleUploadSuccess = async () => {
    setUploadStatus('success');
    if (onArtifactUpload) {
      await onArtifactUpload('lovable', content);
    }
    setTimeout(() => setUploadStatus('none'), 3000);
  };

  const handleError = () => {
    setUploadStatus('error');
    setTimeout(() => setUploadStatus('none'), 3000);
  };

  return (
    <div className="bg-[#F7F6F3] border-l border-[#999999] p-6 flex flex-col h-full overflow-hidden">
      <h3 className="text-sm font-semibold text-[#2C2C2C] mb-6">Build Panel</h3>

      {/* Textarea: Copy This Into Lovable */}
      <div className="flex-1 flex flex-col mb-6 min-h-0">
        <label className="text-xs font-medium text-[#666666] mb-3 block">
          Copy This Into Lovable
        </label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Prompt will appear here..."
          className="flex-1 w-full p-4 text-xs border border-[#999999] rounded bg-white resize-none font-mono overflow-y-auto text-[#2C2C2C]"
        />
      </div>

      {/* Copy Button */}
      <button
        onClick={handleCopyToLovable}
        className="w-full mb-4 px-4 py-3 text-xs font-medium bg-[#8B0000] text-white rounded hover:bg-[#6B0000] transition"
      >
        {copiedMessage ? '✓ Copied!' : 'Copy Button'}
      </button>

      {/* Build in Lovable Button */}
      <a
        href="https://lovable.dev"
        target="_blank"
        rel="noopener noreferrer"
        className="w-full mb-6 px-4 py-3 text-xs font-medium bg-[#2C2C2C] text-white rounded hover:bg-[#000000] transition text-center"
      >
        Build in Lovable →
      </a>

      {/* Status Section */}
      <div className="border-t border-[#999999] pt-4">
        <p className="text-xs font-medium text-[#666666] mb-3">Artifact Status</p>
        <div className="flex gap-2">
          <button
            onClick={handleUploadSuccess}
            disabled={isLoading}
            className={`flex-1 px-3 py-2 text-xs font-medium rounded transition ${
              uploadStatus === 'success'
                ? 'bg-[#E8F5E9] text-[#2C2C2C] border border-[#999999]'
                : 'bg-white border border-[#999999] text-[#2C2C2C] hover:bg-[#F7F6F3]'
            }`}
          >
            ✓ It Worked
          </button>
          <button
            onClick={handleError}
            disabled={isLoading}
            className={`flex-1 px-3 py-2 text-xs font-medium rounded transition ${
              uploadStatus === 'error'
                ? 'bg-[#FFEBEE] text-[#2C2C2C] border border-[#8B0000]'
                : 'bg-white border border-[#999999] text-[#2C2C2C] hover:bg-[#F7F6F3]'
            }`}
          >
            ✕ Error
          </button>
          <button
            className="flex-1 px-3 py-2 text-xs font-medium rounded bg-white border border-[#999999] text-[#2C2C2C] hover:bg-[#F7F6F3] transition"
          >
            📷 Screenshot
          </button>
        </div>

        {/* Status Message */}
        {uploadStatus === 'success' && (
          <p className="text-xs text-[#2C7F2F] mt-3 font-medium">✓ Step artifact saved</p>
        )}
        {uploadStatus === 'error' && (
          <p className="text-xs text-[#8B0000] mt-3 font-medium">✕ Please try again</p>
        )}
      </div>
    </div>
  );
}
