'use client';

import { Navigation } from '@/components/Navigation';

export default function ProofPage() {
  return (
    <div className="min-h-screen bg-[#F7F6F3] flex flex-col">
      {/* Navigation */}
      <Navigation />

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-6">
        <div className="max-w-2xl text-center">
          <h2 className="text-4xl font-bold text-[#2C2C2C] mb-6" style={{ fontFamily: 'Georgia, Times New Roman, serif' }}>
            Proof & Artifacts
          </h2>
          <p className="text-lg text-[#999999] mb-8">
            This section contains project artifacts, documentation, and proof of implementation.
          </p>
          
          <div className="bg-white border border-[#ECE8E0] rounded p-12 text-center">
            <p className="text-[#999999] mb-6">
              Artifacts will be displayed here as the project progresses.
            </p>
            <div className="space-y-4 text-sm text-[#2C2C2C]">
              <p>• Design verification documents</p>
              <p>• Implementation screenshots</p>
              <p>• Feature demonstrations</p>
              <p>• Performance metrics</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
