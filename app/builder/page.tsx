'use client';

import { useState, useEffect } from 'react';
import { Navigation } from '@/components/Navigation';
import { BuilderForm, ResumeData } from '@/components/BuilderForm';
import { ResumePreview } from '@/components/ResumePreview';
import { TemplateSelector } from '@/components/TemplateSelector';
import { TemplatePicker } from '@/components/TemplatePicker';
import { ColorPicker } from '@/components/ColorPicker';
import { useAccentColor } from '@/hooks/useAccentColor';
import { useResumeData } from '@/hooks/useResumeData';
import { useTemplate, TemplateType } from '@/hooks/useTemplate';

export default function BuilderPage() {
  const { data: storedData, isHydrated } = useResumeData();
  const { template, selectTemplate } = useTemplate();
  const { color, setColor } = useAccentColor();
  const [resumeData, setResumeData] = useState<ResumeData>({
    personalInfo: {
      name: '',
      email: '',
      phone: '',
      location: '',
    },
    summary: '',
    education: [],
    experience: [],
    projects: [],
    skills: [],
    links: {
      github: '',
      linkedin: '',
    },
  });

  // Initialize with stored data when hydrated
  useEffect(() => {
    if (isHydrated && storedData && Object.keys(storedData.personalInfo).some(key => (storedData.personalInfo as any)[key])) {
      setResumeData(storedData);
    }
  }, [isHydrated, storedData]);

  return (
    <div className="min-h-screen bg-[#F7F6F3] flex flex-col">
      {/* Navigation */}
      <Navigation />

      {/* Main Content - Two Column Layout */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Column: Form */}
        <div className="w-1/2 bg-[#F7F6F3] border-r border-[#999999] overflow-hidden">
          <div className="border-b border-[#999999] px-6 py-4 bg-white">
            <h4 className="text-sm font-semibold text-[#2C2C2C] mb-3">Resume Template</h4>
            <TemplateSelector currentTemplate={template} onSelectTemplate={selectTemplate} />
          </div>
          <BuilderForm onDataChange={setResumeData} />
        </div>

        {/* Right Column: Live Preview */}
        <div className="w-1/2 bg-white overflow-hidden">
          <div className="h-full flex flex-col">
            <div className="bg-white border-b border-[#999999] px-6 py-4">
              <h3 className="text-lg font-semibold text-[#2C2C2C]" style={{ fontFamily: 'Georgia, Times New Roman, serif' }}>
                Live Preview
              </h3>
              <p className="text-sm text-[#999999]">Premium resume layout</p>
            </div>

            <div className="px-6 py-4 border-b border-[#EEEEEE] bg-white">
              <TemplatePicker current={template} onSelect={selectTemplate} />
              <div className="mt-2">
                <ColorPicker value={color} onChange={setColor} />
              </div>
            </div>

            <ResumePreview data={resumeData} template={template} accentColor={color} />
          </div>
        </div>
      </div>
    </div>
  );
}
