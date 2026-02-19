"use client";

import React from 'react';
import { ResumeData } from './BuilderForm';
import { TemplateType } from '@/hooks/useTemplate';

interface ResumePreviewProps {
  data: ResumeData;
  template?: TemplateType;
  accentColor?: string;
}

export function ResumePreview({ data, template = 'classic', accentColor = 'hsl(168, 60%, 40%)' }: ResumePreviewProps) {
  // Check if a section has content
  const hasPersonalInfo = data.personalInfo.name || data.personalInfo.email || data.personalInfo.phone || data.personalInfo.location;
  const hasSummary = data.summary.trim().length > 0;
  const hasExperience = data.experience.length > 0 && data.experience.some(exp => exp.company || exp.position);
  const hasEducation = data.education.length > 0 && data.education.some(edu => edu.school || edu.degree);
  const hasProjects = data.projects.length > 0 && data.projects.some(proj => proj.title);
  const hasSkills = (
    (data.skills && data.skills.length > 0 && data.skills.some(skill => skill.trim().length > 0)) ||
    (data.skillsByCategory && (
      (data.skillsByCategory.technical && data.skillsByCategory.technical.length > 0) ||
      (data.skillsByCategory.soft && data.skillsByCategory.soft.length > 0) ||
      (data.skillsByCategory.tools && data.skillsByCategory.tools.length > 0)
    ))
  );
  const hasLinks = data.links.github || data.links.linkedin;

  // Template-specific styling
  const getHeaderStyle = (): React.CSSProperties => {
    if (template === 'modern') return { borderBottom: `4px solid ${accentColor}` };
    if (template === 'minimal') return { borderBottom: `1px solid #ECE8E0` };
    return { borderBottom: `2px solid #2C2C2C` };
  };

  const getSectionHeaderClass = () => {
    if (template === 'minimal') return 'text-base font-bold text-[#2C2C2C] mb-2';
    return 'text-lg font-bold text-[#2C2C2C] mb-3 uppercase tracking-wide';
  };

  return (
    <div className="h-full overflow-y-auto bg-white print-safe-wrapper">
      <div
        className={`p-12 max-w-4xl mx-auto print-safe-resume ${
          template === 'modern' ? 'bg-gradient-to-b from-white to-gray-50' : 'bg-white'
        }`}
        style={{ fontFamily: '"Times New Roman", serif' }}
      >
        {/* Header - only show if has name or contact info */}
        {hasPersonalInfo && (
          <div className="pb-6 mb-6" style={getHeaderStyle()}>
            {data.personalInfo.name && (
              <h1 className="text-4xl font-bold text-[#2C2C2C] mb-2">{data.personalInfo.name}</h1>
            )}
            <div className="flex gap-4 text-sm text-[#2C2C2C] flex-wrap">
              {data.personalInfo.email && <span>{data.personalInfo.email}</span>}
              {data.personalInfo.email && data.personalInfo.phone && <span>•</span>}
              {data.personalInfo.phone && <span>{data.personalInfo.phone}</span>}
              {(data.personalInfo.email || data.personalInfo.phone) && data.personalInfo.location && <span>•</span>}
              {data.personalInfo.location && <span>{data.personalInfo.location}</span>}
            </div>
            {hasLinks && (
              <div className="flex gap-4 text-sm text-[#2C2C2C] mt-2 flex-wrap">
                {data.links.github && <span style={{ color: accentColor }}>{data.links.github}</span>}
                {data.links.github && data.links.linkedin && <span>•</span>}
                {data.links.linkedin && <span style={{ color: accentColor }}>{data.links.linkedin}</span>}
              </div>
            )}
          </div>
        )}

        {/* Summary */}
        {hasSummary && (
          <div className={`mb-6 ${template === 'modern' ? 'bg-white p-4 rounded-lg' : ''}`} style={template === 'modern' ? { borderLeft: `4px solid ${accentColor}` } : undefined}>
            <h2 className={getSectionHeaderClass()}>Professional Summary</h2>
            <p className="text-[#2C2C2C] leading-relaxed">{data.summary}</p>
          </div>
        )}

        {/* Experience */}
        {hasExperience && (
          <div className="mb-6">
            <h2 className={getSectionHeaderClass()}>Experience</h2>
            <div className="space-y-4">
              {data.experience.map((exp) => (
                (exp.company || exp.position) && (
                  <div key={exp.id} className="avoid-break">
                    <div className="flex justify-between items-start mb-1">
                      {exp.position && <h3 className="font-bold text-[#2C2C2C]">{exp.position}</h3>}
                      {(exp.startDate || exp.endDate) && (
                        <span className="text-sm text-[#2C2C2C]">{exp.startDate} – {exp.endDate}</span>
                      )}
                    </div>
                    {exp.company && <p className="text-[#999999] text-sm mb-2">{exp.company}</p>}
                    {exp.description && <p className="text-[#2C2C2C] text-sm leading-relaxed">{exp.description}</p>}
                  </div>
                )
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {hasEducation && (
          <div className="mb-6">
            <h2 className={getSectionHeaderClass()}>Education</h2>
            <div className="space-y-3">
              {data.education.map((edu) => (
                (edu.school || edu.degree) && (
                  <div key={edu.id}>
                    <div className="flex justify-between items-start mb-1">
                      {edu.school && <h3 className="font-bold text-[#2C2C2C]">{edu.school}</h3>}
                      {(edu.startDate || edu.endDate) && (
                        <span className="text-sm text-[#2C2C2C]">{edu.startDate} – {edu.endDate}</span>
                      )}
                    </div>
                    {(edu.degree || edu.field) && (
                      <p className="text-[#2C2C2C] text-sm">
                        {edu.degree} {edu.degree && edu.field ? 'in' : ''} {edu.field}
                      </p>
                    )}
                  </div>
                )
              ))}
            </div>
          </div>
        )}

        {/* Projects */}
        {hasProjects && (
          <div className="mb-6">
            <h2 className={getSectionHeaderClass()}>Projects</h2>
            <div className="space-y-4">
              {data.projects.map((project) => {
                // Normalize technologies to an array for backward compatibility
                const techList = Array.isArray(project.technologies)
                  ? project.technologies
                  : project.technologies
                  ? String(project.technologies).split(',').map(s => s.trim()).filter(Boolean)
                  : [];

                return (
                  project.title && (
                    <div key={project.id} className="avoid-break border border-[#ECE8E0] p-4 rounded bg-white">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-bold text-[#2C2C2C] mb-1">{project.title}</h3>
                          {project.description && <p className="text-[#2C2C2C] text-sm mb-2">{project.description}</p>}
                          {techList.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                              {techList.map((t) => (
                                <span key={t} className="text-sm text-[#2C2C2C] px-3 py-1 rounded border border-[#ECE8E0]">{t}</span>
                              ))}
                            </div>
                          )}
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          {project.liveUrl && (
                            <a href={project.liveUrl} target="_blank" rel="noreferrer" className="text-sm underline" style={{ color: accentColor }}>Live</a>
                          )}
                          {project.githubUrl && (
                            <a href={project.githubUrl} target="_blank" rel="noreferrer" className="text-sm underline" style={{ color: accentColor }}>GitHub</a>
                          )}
                        </div>
                      </div>
                    </div>
                  )
                );
              })}
            </div>
          </div>
        )}

        {/* Skills */}
        {hasSkills && (
          <div>
            <h2 className={getSectionHeaderClass()}>Skills</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <h4 className="text-sm font-semibold mb-2">Technical Skills ({data.skillsByCategory?.technical?.length || 0})</h4>
                <div className="flex flex-wrap gap-2">
                  {(data.skillsByCategory?.technical || data.skills || []).map((skill) => (
                    skill && <span key={skill} className="text-sm text-[#2C2C2C] px-3 py-1 rounded border border-[#ECE8E0]">{skill}</span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-semibold mb-2">Soft Skills ({data.skillsByCategory?.soft?.length || 0})</h4>
                <div className="flex flex-wrap gap-2">
                  {(data.skillsByCategory?.soft || []).map((skill) => (
                    skill && <span key={skill} className="text-sm text-[#2C2C2C] px-3 py-1 rounded border border-[#ECE8E0]">{skill}</span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-semibold mb-2">Tools & Technologies ({data.skillsByCategory?.tools?.length || 0})</h4>
                <div className="flex flex-wrap gap-2">
                  {(data.skillsByCategory?.tools || []).map((skill) => (
                    skill && <span key={skill} className="text-sm text-[#2C2C2C] px-3 py-1 rounded border border-[#ECE8E0]">{skill}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Empty state */}
        {!hasPersonalInfo && !hasSummary && !hasExperience && !hasEducation && !hasProjects && !hasSkills && (
          <div className="text-center py-12">
            <p className="text-[#999999]">Start filling out the form to see your resume preview here.</p>
          </div>
        )}
      </div>
    </div>
  );
}
