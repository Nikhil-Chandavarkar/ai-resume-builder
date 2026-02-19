'use client';

import { useState, useEffect, KeyboardEvent } from 'react';
import { useResumeData } from '@/hooks/useResumeData';
import { calculateATSScore } from '@/lib/atsScoring';
import { getTopImprovements } from '@/lib/improvementsUtils';
import { ImprovementPanel } from '@/lib/ImprovementPanel';
import { BulletGuidance } from '@/lib/BulletGuidance';
import { ATSScoreDisplay } from './ATSScoreDisplay';

export interface ResumeData {
  personalInfo: {
    name: string;
    email: string;
    phone: string;
    location: string;
  };
  summary: string;
  education: Array<{
    id: string;
    school: string;
    degree: string;
    field: string;
    startDate: string;
    endDate: string;
  }>;
  experience: Array<{
    id: string;
    company: string;
    position: string;
    startDate: string;
    endDate: string;
    description: string;
  }>;
  projects: Array<{
    id: string;
    title: string;
    description: string;
    technologies: string[];
    liveUrl?: string;
    githubUrl?: string;
  }>;
  skills: string[]; // flattened compatibility list
  skillsByCategory: {
    technical: string[];
    soft: string[];
    tools: string[];
  };
  links: {
    github: string;
    linkedin: string;
  };
}

interface BuilderFormProps {
  onDataChange: (data: ResumeData) => void;
}

const sampleData: ResumeData = {
  personalInfo: {
    name: 'Alex Johnson',
    email: 'alex.johnson@example.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
  },
  summary: 'Full-stack engineer with 5+ years of experience building scalable web applications. Passionate about clean code and user experience.',
  education: [
    {
      id: '1',
      school: 'University of California',
      degree: 'Bachelor of Science',
      field: 'Computer Science',
      startDate: '2016',
      endDate: '2020',
    },
  ],
  experience: [
    {
      id: '1',
      company: 'Tech Corp',
      position: 'Senior Engineer',
      startDate: 'Jan 2022',
      endDate: 'Present',
      description: 'Led development of microservices architecture. Improved API performance by 40%.',
    },
    {
      id: '2',
      company: 'StartUp Inc',
      position: 'Full Stack Engineer',
      startDate: 'Jun 2020',
      endDate: 'Dec 2021',
      description: 'Built and maintained customer-facing SaaS platform using React and Node.js.',
    },
  ],
  projects: [
    {
      id: '1',
      title: 'AI Assistant',
      description: 'Intelligent chatbot with NLP capabilities',
      technologies: ['Python', 'TensorFlow', 'React'],
      liveUrl: '',
      githubUrl: '',
    },
  ],
  skills: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Docker', 'AWS'],
  skillsByCategory: {
    technical: ['TypeScript', 'React', 'Node.js', 'PostgreSQL', 'GraphQL'],
    soft: ['Team Leadership', 'Problem Solving'],
    tools: ['Git', 'Docker', 'AWS'],
  },
  links: {
    github: 'https://github.com/alexjohnson',
    linkedin: 'https://linkedin.com/in/alexjohnson',
  },
};

export function BuilderForm({ onDataChange }: BuilderFormProps) {
  const { data: storedData, saveData, isHydrated } = useResumeData();
  const [data, setData] = useState<ResumeData>(sampleData);
  const [openProjects, setOpenProjects] = useState<Record<string, boolean>>({});
  const [suggestLoading, setSuggestLoading] = useState(false);

  // Initialize with stored data on hydration
  useEffect(() => {
    if (isHydrated && storedData && Object.keys(storedData.personalInfo).some(key => (storedData.personalInfo as any)[key])) {
      // ensure backward compatibility: convert project technologies string -> array if necessary
      const migrated = { ...storedData } as any;
      if (migrated.projects) {
        migrated.projects = migrated.projects.map((p: any) => ({
          ...p,
          technologies: Array.isArray(p.technologies) ? p.technologies : (p.technologies ? String(p.technologies).split(',').map((s:string)=>s.trim()).filter(Boolean) : []),
        }));
      }
      if (!migrated.skillsByCategory) {
        migrated.skillsByCategory = {
          technical: [],
          soft: [],
          tools: [],
        };
      }
      setData(migrated);
      onDataChange(migrated);
    }
  }, [isHydrated, storedData, onDataChange]);

  // Auto-save to localStorage
  const updateData = (newData: ResumeData) => {
    setData(newData);
    saveData(newData);
    onDataChange(newData);
  };

  const handleLoadSample = () => {
    updateData(sampleData);
  };

  const updatePersonalInfo = (field: keyof ResumeData['personalInfo'], value: string) => {
    const newData = {
      ...data,
      personalInfo: { ...data.personalInfo, [field]: value },
    };
    updateData(newData);
  };

  const updateSummary = (value: string) => {
    const newData = { ...data, summary: value };
    updateData(newData);
  };

  const updateEducation = (id: string, field: string, value: string) => {
    const newData = {
      ...data,
      education: data.education.map((edu) => (edu.id === id ? { ...edu, [field as keyof (typeof data.education)[0]]: value } : edu)),
    };
    updateData(newData);
  };

  const addEducation = () => {
    const newData = {
      ...data,
      education: [
        ...data.education,
        {
          id: Date.now().toString(),
          school: '',
          degree: '',
          field: '',
          startDate: '',
          endDate: '',
        },
      ],
    };
    updateData(newData);
  };

  const removeEducation = (id: string) => {
    const newData = {
      ...data,
      education: data.education.filter((edu) => edu.id !== id),
    };
    updateData(newData);
  };

  const updateExperience = (id: string, field: string, value: string) => {
    const newData = {
      ...data,
      experience: data.experience.map((exp) => (exp.id === id ? { ...exp, [field as keyof (typeof data.experience)[0]]: value } : exp)),
    };
    updateData(newData);
  };

  const addExperience = () => {
    const newData = {
      ...data,
      experience: [
        ...data.experience,
        {
          id: Date.now().toString(),
          company: '',
          position: '',
          startDate: '',
          endDate: '',
          description: '',
        },
      ],
    };
    updateData(newData);
  };

  const removeExperience = (id: string) => {
    const newData = {
      ...data,
      experience: data.experience.filter((exp) => exp.id !== id),
    };
    updateData(newData);
  };

  const updateProjects = (id: string, field: string, value: string) => {
    const newData = {
      ...data,
      projects: data.projects.map((proj) => (proj.id === id ? { ...proj, [field as keyof (typeof data.projects)[0]]: value } : proj)),
    };
    updateData(newData);
  };

  const addProject = () => {
    const newData = {
      ...data,
      projects: [
        ...data.projects,
        {
          id: Date.now().toString(),
          title: '',
          description: '',
          technologies: [],
          liveUrl: '',
          githubUrl: '',
        },
      ],
    };
    updateData(newData);
  };

  const removeProject = (id: string) => {
    const newData = {
      ...data,
      projects: data.projects.filter((proj) => proj.id !== id),
    };
    updateData(newData);
  };

  const flattenSkills = (byCat: ResumeData['skillsByCategory']) => {
    const set = new Set<string>();
    Object.values(byCat).forEach(arr => arr.forEach(s => { if (s && s.trim()) set.add(s.trim()); }));
    return Array.from(set);
  };

  const updateSkillsByCategory = (category: keyof ResumeData['skillsByCategory'], values: string[]) => {
    const newByCat = { ...data.skillsByCategory, [category]: values };
    const newData = { ...data, skillsByCategory: newByCat, skills: flattenSkills(newByCat) };
    updateData(newData);
  };

  const handleSuggestSkills = async () => {
    setSuggestLoading(true);
    setTimeout(() => {
      const suggested = {
        technical: ['TypeScript', 'React', 'Node.js', 'PostgreSQL', 'GraphQL'],
        soft: ['Team Leadership', 'Problem Solving'],
        tools: ['Git', 'Docker', 'AWS'],
      };
      const newByCat = {
        technical: Array.from(new Set([...(data.skillsByCategory.technical || []), ...suggested.technical])),
        soft: Array.from(new Set([...(data.skillsByCategory.soft || []), ...suggested.soft])),
        tools: Array.from(new Set([...(data.skillsByCategory.tools || []), ...suggested.tools])),
      };
      updateData({ ...data, skillsByCategory: newByCat, skills: flattenSkills(newByCat) });
      setSuggestLoading(false);
    }, 1000);
  };

  const updateLinks = (field: keyof ResumeData['links'], value: string) => {
    const newData = {
      ...data,
      links: { ...data.links, [field]: value },
    };
    updateData(newData);
  };

  // Calculate ATS score
  const atsScore = calculateATSScore(data);

  // Get improvement suggestions
  const improvements = getTopImprovements(data);

  return (
    <div className="h-full overflow-y-auto">
      <div className="p-8 space-y-8">
        {/* Action Button */}
        <button
          onClick={handleLoadSample}
          className="w-full bg-[#8B0000] text-white py-3 font-medium hover:bg-[#6B0000] transition-colors"
        >
          Load Sample Data
        </button>

        {/* ATS Score Display */}
        <ATSScoreDisplay atsScore={atsScore} />

        {/* Improvement Panel */}
        <ImprovementPanel improvements={improvements} />

        {/* Personal Info */}
        <section className="border-t border-[#ECE8E0] pt-6">
          <h3 className="text-lg font-semibold text-[#2C2C2C] mb-4" style={{ fontFamily: 'Georgia, Times New Roman, serif' }}>
            Personal Information
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[#2C2C2C] mb-2">Full Name</label>
              <input
                type="text"
                value={data.personalInfo.name}
                onChange={(e) => updatePersonalInfo('name', e.target.value)}
                className="w-full px-4 py-2 border border-[#ECE8E0] rounded bg-white text-[#2C2C2C] focus:outline-none focus:border-[#8B0000]"
                placeholder="Your name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#2C2C2C] mb-2">Email</label>
              <input
                type="email"
                value={data.personalInfo.email}
                onChange={(e) => updatePersonalInfo('email', e.target.value)}
                className="w-full px-4 py-2 border border-[#ECE8E0] rounded bg-white text-[#2C2C2C] focus:outline-none focus:border-[#8B0000]"
                placeholder="your@email.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#2C2C2C] mb-2">Phone</label>
              <input
                type="tel"
                value={data.personalInfo.phone}
                onChange={(e) => updatePersonalInfo('phone', e.target.value)}
                className="w-full px-4 py-2 border border-[#ECE8E0] rounded bg-white text-[#2C2C2C] focus:outline-none focus:border-[#8B0000]"
                placeholder="+1 (555) 000-0000"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#2C2C2C] mb-2">Location</label>
              <input
                type="text"
                value={data.personalInfo.location}
                onChange={(e) => updatePersonalInfo('location', e.target.value)}
                className="w-full px-4 py-2 border border-[#ECE8E0] rounded bg-white text-[#2C2C2C] focus:outline-none focus:border-[#8B0000]"
                placeholder="City, State"
              />
            </div>
          </div>
        </section>

        {/* Summary */}
        <section className="border-t border-[#ECE8E0] pt-6">
          <h3 className="text-lg font-semibold text-[#2C2C2C] mb-4" style={{ fontFamily: 'Georgia, Times New Roman, serif' }}>
            Professional Summary
          </h3>
          <textarea
            value={data.summary}
            onChange={(e) => updateSummary(e.target.value)}
            className="w-full px-4 py-2 border border-[#ECE8E0] rounded bg-white text-[#2C2C2C] focus:outline-none focus:border-[#8B0000] min-h-[120px]"
            placeholder="Write a brief summary of your professional background..."
          />
        </section>

        {/* Education */}
        <section className="border-t border-[#ECE8E0] pt-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-[#2C2C2C]" style={{ fontFamily: 'Georgia, Times New Roman, serif' }}>
              Education
            </h3>
            <button
              onClick={addEducation}
              className="text-[#8B0000] font-medium text-sm hover:underline"
            >
              + Add
            </button>
          </div>
          <div className="space-y-6">
            {data.education.map((edu) => (
              <div key={edu.id} className="border border-[#ECE8E0] p-4 rounded bg-[#F7F6F3]">
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <input
                    type="text"
                    value={edu.school}
                    onChange={(e) => updateEducation(edu.id, 'school', e.target.value)}
                    className="col-span-2 px-4 py-2 border border-[#ECE8E0] rounded bg-white text-[#2C2C2C] focus:outline-none focus:border-[#8B0000]"
                    placeholder="School/University"
                  />
                  <input
                    type="text"
                    value={edu.degree}
                    onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                    className="px-4 py-2 border border-[#ECE8E0] rounded bg-white text-[#2C2C2C] focus:outline-none focus:border-[#8B0000]"
                    placeholder="Degree"
                  />
                  <input
                    type="text"
                    value={edu.field}
                    onChange={(e) => updateEducation(edu.id, 'field', e.target.value)}
                    className="px-4 py-2 border border-[#ECE8E0] rounded bg-white text-[#2C2C2C] focus:outline-none focus:border-[#8B0000]"
                    placeholder="Field of Study"
                  />
                  <input
                    type="text"
                    value={edu.startDate}
                    onChange={(e) => updateEducation(edu.id, 'startDate', e.target.value)}
                    className="px-4 py-2 border border-[#ECE8E0] rounded bg-white text-[#2C2C2C] focus:outline-none focus:border-[#8B0000]"
                    placeholder="Start Date"
                  />
                  <input
                    type="text"
                    value={edu.endDate}
                    onChange={(e) => updateEducation(edu.id, 'endDate', e.target.value)}
                    className="px-4 py-2 border border-[#ECE8E0] rounded bg-white text-[#2C2C2C] focus:outline-none focus:border-[#8B0000]"
                    placeholder="End Date"
                  />
                </div>
                <button
                  onClick={() => removeEducation(edu.id)}
                  className="text-[#999999] font-medium text-sm hover:text-[#8B0000]"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Experience */}
        <section className="border-t border-[#ECE8E0] pt-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-[#2C2C2C]" style={{ fontFamily: 'Georgia, Times New Roman, serif' }}>
              Experience
            </h3>
            <button
              onClick={addExperience}
              className="text-[#8B0000] font-medium text-sm hover:underline"
            >
              + Add
            </button>
          </div>
          <div className="space-y-6">
            {data.experience.map((exp) => (
              <div key={exp.id} className="border border-[#ECE8E0] p-4 rounded bg-[#F7F6F3]">
                <div className="space-y-4">
                  <input
                    type="text"
                    value={exp.company}
                    onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                    className="w-full px-4 py-2 border border-[#ECE8E0] rounded bg-white text-[#2C2C2C] focus:outline-none focus:border-[#8B0000]"
                    placeholder="Company"
                  />
                  <input
                    type="text"
                    value={exp.position}
                    onChange={(e) => updateExperience(exp.id, 'position', e.target.value)}
                    className="w-full px-4 py-2 border border-[#ECE8E0] rounded bg-white text-[#2C2C2C] focus:outline-none focus:border-[#8B0000]"
                    placeholder="Job Title"
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      value={exp.startDate}
                      onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)}
                      className="px-4 py-2 border border-[#ECE8E0] rounded bg-white text-[#2C2C2C] focus:outline-none focus:border-[#8B0000]"
                      placeholder="Start Date"
                    />
                    <input
                      type="text"
                      value={exp.endDate}
                      onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)}
                      className="px-4 py-2 border border-[#ECE8E0] rounded bg-white text-[#2C2C2C] focus:outline-none focus:border-[#8B0000]"
                      placeholder="End Date"
                    />
                  </div>
                  <textarea
                    value={exp.description}
                    onChange={(e) => updateExperience(exp.id, 'description', e.target.value)}
                    className="w-full px-4 py-2 border border-[#ECE8E0] rounded bg-white text-[#2C2C2C] focus:outline-none focus:border-[#8B0000] min-h-[80px]"
                    placeholder="Job responsibilities and achievements"
                  />
                  <BulletGuidance text={exp.description} />
                </div>
                <button
                  onClick={() => removeExperience(exp.id)}
                  className="mt-4 text-[#999999] font-medium text-sm hover:text-[#8B0000]"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Projects */}
        <section className="border-t border-[#ECE8E0] pt-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-[#2C2C2C]" style={{ fontFamily: 'Georgia, Times New Roman, serif' }}>
              Projects
            </h3>
            <button
              onClick={addProject}
              className="text-[#8B0000] font-medium text-sm hover:underline"
            >
              + Add Project
            </button>
          </div>
          <div className="space-y-4">
            {data.projects.map((project) => (
              <div key={project.id} className="border border-[#ECE8E0] rounded bg-[#F7F6F3]">
                <div className="flex items-center justify-between p-3 cursor-pointer" onClick={() => setOpenProjects(prev => ({ ...prev, [project.id]: !prev[project.id] }))}>
                  <div className="flex items-center gap-3">
                    <svg className="w-4 h-4 text-[#8B0000]" viewBox="0 0 24 24" fill="none"><path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    <strong>{project.title || 'Untitled Project'}</strong>
                  </div>
                  <div className="text-sm text-[#666666]">{openProjects[project.id] ? 'Collapse' : 'Edit'}</div>
                </div>
                {openProjects[project.id] && (
                  <div className="p-4 space-y-3">
                    <input
                      type="text"
                      value={project.title}
                      onChange={(e) => updateProjects(project.id, 'title', e.target.value)}
                      className="w-full px-4 py-2 border border-[#ECE8E0] rounded bg-white text-[#2C2C2C] focus:outline-none focus:border-[#8B0000]"
                      placeholder="Project Title"
                    />
                    <div>
                      <label className="block text-sm text-[#2C2C2C] mb-1">Description</label>
                      <textarea
                        value={project.description}
                        maxLength={200}
                        onChange={(e) => updateProjects(project.id, 'description', e.target.value)}
                        className="w-full px-4 py-2 border border-[#ECE8E0] rounded bg-white text-[#2C2C2C] focus:outline-none focus:border-[#8B0000] min-h-[80px]"
                        placeholder="Project description (max 200 chars)"
                      />
                      <div className="text-right text-xs text-[#666666]">{project.description.length}/200</div>
                    </div>
                    <div>
                      <label className="block text-sm text-[#2C2C2C] mb-1">Tech Stack</label>
                      <TagInput
                        values={project.technologies || []}
                        onChange={(vals) => {
                          const newData = { ...data, projects: data.projects.map(p => p.id === project.id ? { ...p, technologies: vals } : p) };
                          updateData(newData);
                        }}
                      />
                    </div>
                    <input
                      type="url"
                      value={project.liveUrl || ''}
                      onChange={(e) => updateProjects(project.id, 'liveUrl', e.target.value)}
                      className="w-full px-4 py-2 border border-[#ECE8E0] rounded bg-white text-[#2C2C2C] focus:outline-none focus:border-[#8B0000]"
                      placeholder="Live URL (optional)"
                    />
                    <input
                      type="url"
                      value={project.githubUrl || ''}
                      onChange={(e) => updateProjects(project.id, 'githubUrl', e.target.value)}
                      className="w-full px-4 py-2 border border-[#ECE8E0] rounded bg-white text-[#2C2C2C] focus:outline-none focus:border-[#8B0000]"
                      placeholder="GitHub URL (optional)"
                    />
                    <div className="flex justify-between">
                      <button
                        onClick={() => removeProject(project.id)}
                        className="text-[#999999] font-medium text-sm hover:text-[#8B0000]"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Skills */}
        <section className="border-t border-[#ECE8E0] pt-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-[#2C2C2C]" style={{ fontFamily: 'Georgia, Times New Roman, serif' }}>
              Skills
            </h3>
            <button
              onClick={handleSuggestSkills}
              className="text-[#8B0000] font-medium text-sm hover:underline"
            >
              {suggestLoading ? 'Suggesting...' : '✨ Suggest Skills'}
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-3 border border-[#ECE8E0] rounded bg-[#F7F6F3]">
              <div className="flex items-center justify-between mb-2">
                <strong>Technical Skills</strong>
                <span className="text-sm text-[#666666]">({data.skillsByCategory.technical.length})</span>
              </div>
              <TagInput values={data.skillsByCategory.technical || []} onChange={(vals) => updateSkillsByCategory('technical', vals)} />
            </div>

            <div className="p-3 border border-[#ECE8E0] rounded bg-[#F7F6F3]">
              <div className="flex items-center justify-between mb-2">
                <strong>Soft Skills</strong>
                <span className="text-sm text-[#666666]">({data.skillsByCategory.soft.length})</span>
              </div>
              <TagInput values={data.skillsByCategory.soft || []} onChange={(vals) => updateSkillsByCategory('soft', vals)} />
            </div>

            <div className="p-3 border border-[#ECE8E0] rounded bg-[#F7F6F3]">
              <div className="flex items-center justify-between mb-2">
                <strong>Tools & Technologies</strong>
                <span className="text-sm text-[#666666]">({data.skillsByCategory.tools.length})</span>
              </div>
              <TagInput values={data.skillsByCategory.tools || []} onChange={(vals) => updateSkillsByCategory('tools', vals)} />
            </div>
          </div>
        </section>

        {/* Links */}
        <section className="border-t border-[#ECE8E0] pt-6 pb-16">
          <h3 className="text-lg font-semibold text-[#2C2C2C] mb-4" style={{ fontFamily: 'Georgia, Times New Roman, serif' }}>
            Links
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[#2C2C2C] mb-2">GitHub</label>
              <input
                type="url"
                value={data.links.github}
                onChange={(e) => updateLinks('github', e.target.value)}
                className="w-full px-4 py-2 border border-[#ECE8E0] rounded bg-white text-[#2C2C2C] focus:outline-none focus:border-[#8B0000]"
                placeholder="https://github.com/..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#2C2C2C] mb-2">LinkedIn</label>
              <input
                type="url"
                value={data.links.linkedin}
                onChange={(e) => updateLinks('linkedin', e.target.value)}
                className="w-full px-4 py-2 border border-[#ECE8E0] rounded bg-white text-[#2C2C2C] focus:outline-none focus:border-[#8B0000]"
                placeholder="https://linkedin.com/in/..."
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

// Small tag input component used for skills and project tech stack
function TagInput({ values, onChange }: { values: string[]; onChange: (vals: string[]) => void }) {
  const [input, setInput] = useState('');

  const addTag = (v: string) => {
    const t = v.trim();
    if (!t) return;
    if (values.includes(t)) return;
    onChange([...values, t]);
    setInput('');
  };

  const removeTag = (idx: number) => {
    const copy = [...values];
    copy.splice(idx, 1);
    onChange(copy);
  };

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTag(input);
    }
  };

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-2">
        {values.map((v, i) => (
          <span key={v + i} className="inline-flex items-center gap-2 bg-white border border-[#ECE8E0] px-3 py-1 rounded">
            <span className="text-sm text-[#2C2C2C]">{v}</span>
            <button type="button" onClick={() => removeTag(i)} className="text-xs text-[#999999]">✕</button>
          </span>
        ))}
      </div>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={onKeyDown}
        placeholder="Type a skill and press Enter"
        className="w-full px-3 py-2 border border-[#ECE8E0] rounded bg-white text-[#2C2C2C] focus:outline-none focus:border-[#8B0000]"
      />
    </div>
  );
}
