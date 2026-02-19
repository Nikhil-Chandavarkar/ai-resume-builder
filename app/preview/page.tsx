"use client";

import { useState } from 'react';
import { Navigation } from '@/components/Navigation';
import { ResumePreview } from '@/components/ResumePreview';
import { TemplateSelector } from '@/components/TemplateSelector';
import { TemplatePicker } from '@/components/TemplatePicker';
import { ColorPicker } from '@/components/ColorPicker';
import { useAccentColor } from '@/hooks/useAccentColor';
import { Toast } from '@/components/Toast';
import { ResumeData } from '@/components/BuilderForm';
import { useTemplate } from '@/hooks/useTemplate';
import { useResumeData } from '@/hooks/useResumeData';
import { calculateATSScore } from '@/lib/atsScoring';
import { ATSScoreDisplay } from '@/components/ATSScoreDisplay';

export default function PreviewPage() {
  const { template, selectTemplate } = useTemplate();
  const { color, setColor } = useAccentColor();
  // Use persisted resume data so preview shows user's saved data
  const { data: resumeData, isHydrated } = useResumeData();

  // Compute ATS score from stored data
  const atsScore = calculateATSScore(resumeData as ResumeData);

  // Validation: warn if missing name or no projects/experience
  const isMissingName = !resumeData?.personalInfo?.name || resumeData.personalInfo.name.trim().length === 0;
  const hasWorkOrProject = (resumeData.experience && resumeData.experience.length > 0) || (resumeData.projects && resumeData.projects.length > 0);
  const showIncompleteWarning = isMissingName || !hasWorkOrProject;

  const generatePlainText = (data: ResumeData) => {
    const lines: string[] = [];
    const p = data.personalInfo;

    if (p.name) lines.push(p.name);
    const contact: string[] = [];
    if (p.email) contact.push(p.email);
    if (p.phone) contact.push(p.phone);
    if (p.location) contact.push(p.location);
    if (contact.length) lines.push(contact.join(' | '));

    if (data.summary) {
      lines.push('', 'Summary', data.summary);
    }

    if (data.education && data.education.length) {
      lines.push('', 'Education');
      data.education.forEach((edu) => {
        const parts = [edu.school, edu.degree, edu.field].filter(Boolean).join(' — ');
        const dates = [edu.startDate, edu.endDate].filter(Boolean).join(' – ');
        lines.push(parts + (dates ? ` (${dates})` : ''));
      });
    }

    if (data.experience && data.experience.length) {
      lines.push('', 'Experience');
      data.experience.forEach((exp) => {
        const header = [exp.position, exp.company].filter(Boolean).join(' — ');
        const dates = [exp.startDate, exp.endDate].filter(Boolean).join(' – ');
        lines.push(header + (dates ? ` (${dates})` : ''));
        if (exp.description) lines.push(exp.description);
      });
    }

    if (data.projects && data.projects.length) {
      lines.push('', 'Projects');
      data.projects.forEach((proj) => {
        lines.push(proj.title || 'Untitled Project');
        if (proj.description) lines.push(proj.description);
        if (proj.technologies) {
          const techs = Array.isArray(proj.technologies) ? proj.technologies.join(', ') : String(proj.technologies);
          lines.push('Technologies: ' + techs);
        }
        lines.push('');
      });
    }

    if (data.skillsByCategory) {
      const all = [] as string[];
      all.push(...(data.skillsByCategory.technical || []));
      all.push(...(data.skillsByCategory.soft || []));
      all.push(...(data.skillsByCategory.tools || []));
      if (all.length) lines.push('', 'Skills', Array.from(new Set(all)).join(', '));
    } else if (data.skills && data.skills.length) {
      lines.push('', 'Skills', data.skills.join(', '));
    }

    if (data.links) {
      const linkLines: string[] = [];
      if (data.links.github) linkLines.push(`GitHub: ${data.links.github}`);
      if (data.links.linkedin) linkLines.push(`LinkedIn: ${data.links.linkedin}`);
      if (linkLines.length) {
        lines.push('', 'Links', ...linkLines);
      }
    }

    return lines.join('\n');
  };

  const [showToast, setShowToast] = useState(false);

  const handleCopyText = async () => {
    const txt = generatePlainText(resumeData);
    try {
      await navigator.clipboard.writeText(txt);
      // subtle success UI could be added; for now use alert as fallback
      // but keep calm: non-blocking
      // eslint-disable-next-line no-alert
      alert('Resume copied to clipboard as plain text.');
    } catch (e) {
      // fallback: try execCommand
      const ta = document.createElement('textarea');
      ta.value = txt;
      document.body.appendChild(ta);
      ta.select();
      try {
        document.execCommand('copy');
        // eslint-disable-next-line no-alert
        alert('Resume copied to clipboard as plain text.');
      } finally {
        document.body.removeChild(ta);
      }
    }
  };

  const handlePrint = () => {
    // Show toast instead of actual PDF generation
    setShowToast(true);
  };

  return (
    <div className="min-h-screen bg-[#F7F6F3] flex flex-col">
      {/* Navigation */}
      <Navigation />

      {/* Template Selection */}
      <div className="bg-white border-b border-[#999999] px-6 py-4">
        <h4 className="text-sm font-semibold text-[#2C2C2C] mb-3">Resume Template</h4>
        <TemplateSelector currentTemplate={template} onSelectTemplate={selectTemplate} />
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden bg-white">
        {/* Export controls (hidden in print) */}
        <div className="px-6 py-4 border-b border-[#EEEEEE] bg-white no-print flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="px-4 py-2 bg-[#2C2C2C] text-white rounded hover:opacity-90 transition"
            >
              Print / Save as PDF
            </button>
            <button
              onClick={handleCopyText}
              className="px-4 py-2 border border-[#2C2C2C] rounded hover:bg-gray-50 transition"
            >
              Copy Resume as Text
            </button>
          </div>
          <div className="text-sm text-[#666666]">
            {showIncompleteWarning && (
              <div className="rounded px-3 py-2 bg-[#FFF7E6] text-[#7A5A00]">
                Your resume may look incomplete.
              </div>
            )}
          </div>
        </div>
        <div className="px-6 py-4 border-b border-[#EEEEEE] bg-white">
          <TemplatePicker current={template} onSelect={selectTemplate} />
          <div className="mt-2">
            <ColorPicker value={color} onChange={setColor} />
          </div>
        </div>

        {/* ATS Score + Suggestions */}
        <div className="px-6 py-6">
          <ATSScoreDisplay atsScore={atsScore} />
        </div>

        <ResumePreview data={resumeData} template={template} accentColor={color} />
        <Toast message="PDF export ready! Check your downloads." show={showToast} onClose={() => setShowToast(false)} />
      </div>
    </div>
  );
}
