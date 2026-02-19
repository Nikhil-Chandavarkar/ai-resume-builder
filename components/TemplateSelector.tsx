'use client';

import { TemplateType, TEMPLATES } from '@/hooks/useTemplate';

interface TemplateSelectorProps {
  currentTemplate: TemplateType;
  onSelectTemplate: (template: TemplateType) => void;
}

export function TemplateSelector({
  currentTemplate,
  onSelectTemplate,
}: TemplateSelectorProps) {
  return (
    <div className="flex gap-3 mb-6">
      {(Object.keys(TEMPLATES) as TemplateType[]).map((templateKey) => {
        const template = TEMPLATES[templateKey];
        const isSelected = currentTemplate === templateKey;

        return (
          <button
            key={templateKey}
            onClick={() => onSelectTemplate(templateKey)}
            className={`flex-1 px-4 py-3 rounded-lg font-medium text-sm transition-all ${
              isSelected
                ? 'bg-[#8B0000] text-white border-2 border-[#8B0000]'
                : 'bg-white text-[#2C2C2C] border-2 border-[#ECE8E0] hover:border-[#8B0000]'
            }`}
          >
            <div className="font-semibold">{template.name}</div>
            <div className={`text-xs mt-1 ${isSelected ? 'text-gray-100' : 'text-[#999999]'}`}>
              {template.description}
            </div>
          </button>
        );
      })}
    </div>
  );
}
