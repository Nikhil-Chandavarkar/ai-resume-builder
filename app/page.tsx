'use client';

import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#F7F6F3] flex flex-col">
      {/* Top Navigation */}
      <nav className="border-b border-[#999999] bg-white">
        <div className="max-w-7xl mx-auto px-16 py-4 flex items-center justify-between">
          <h1 className="text-xl font-semibold text-[#2C2C2C]" style={{ fontFamily: 'Georgia, Times New Roman, serif' }}>
            AI Resume Builder
          </h1>
          <div className="flex gap-8">
            <Link href="/builder" className="text-[#2C2C2C] hover:text-[#8B0000] transition-colors font-medium">
              Builder
            </Link>
            <Link href="/preview" className="text-[#2C2C2C] hover:text-[#8B0000] transition-colors font-medium">
              Preview
            </Link>
            <Link href="/proof" className="text-[#2C2C2C] hover:text-[#8B0000] transition-colors font-medium">
              Proof
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="flex-1 flex items-center justify-center px-6">
        <div className="max-w-2xl text-center">
          <h2 className="text-6xl font-bold text-[#2C2C2C] mb-6" style={{ fontFamily: 'Georgia, Times New Roman, serif', lineHeight: '1.2' }}>
            Build a Resume That Gets Read.
          </h2>
          <p className="text-lg text-[#999999] mb-12 font-light">
            Create a professional, ATS-optimized resume with live preview. Premium design meets functionality.
          </p>
          
          <Link
            href="/builder"
            className="inline-block bg-[#8B0000] text-white px-12 py-4 text-lg font-medium hover:bg-[#6B0000] transition-colors"
            style={{ letterSpacing: '0.5px' }}
          >
            Start Building
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-[#999999] bg-white py-8 px-16">
        <p className="text-center text-[#999999] text-sm">
          AI Resume Builder — KodNest Premium Design System
        </p>
      </footer>
    </div>
  );
}
