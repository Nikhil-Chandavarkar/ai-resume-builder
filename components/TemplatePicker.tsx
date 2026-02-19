"use client";

import React from 'react';
import { TemplateType, TEMPLATES } from '@/hooks/useTemplate';

interface Props {
  current: TemplateType;
  onSelect: (t: TemplateType) => void;
}

export function TemplatePicker({ current, onSelect }: Props) {
  return (
    <div className="flex items-center gap-3 mb-3">
      {(Object.keys(TEMPLATES) as TemplateType[]).map((key) => {
        const t = TEMPLATES[key];
        const selected = key === current;

        return (
          <button
            key={key}
            onClick={() => onSelect(key)}
            aria-pressed={selected}
            className={`w-[120px] p-2 rounded-lg transition-all flex-shrink-0 relative ${
              selected ? 'ring-2 ring-blue-500' : 'ring-1 ring-[#ECE8E0]'
            }`}
          >
            <div className="flex justify-between items-center mb-1">
              <div className="text-xs font-semibold">{t.name}</div>
              {selected && (
                <div className="text-blue-600 font-bold">✓</div>
              )}
            </div>

            {/* simple layout sketch */}
            <div className="border border-[#EAEAEA] rounded bg-white h-20 p-2">
              {key === 'classic' && (
                <div className="h-full flex flex-col gap-1">
                  <div className="h-3 bg-[#DDD] w-3/4 rounded" />
                  <div className="h-1 bg-[#EEE] w-full rounded" />
                  <div className="h-1 bg-[#EEE] w-full rounded mt-auto" />
                </div>
              )}

              {key === 'modern' && (
                <div className="h-full flex">
                  <div className="w-1/3 bg-[#F3F8F7] mr-2 rounded" />
                  <div className="flex-1 flex flex-col gap-1">
                    <div className="h-3 bg-[#DDD] w-3/4 rounded" />
                    <div className="h-1 bg-[#EEE] w-full rounded mt-auto" />
                  </div>
                </div>
              )}

              {key === 'minimal' && (
                <div className="h-full flex flex-col justify-center">
                  <div className="h-3 bg-[#EEE] w-1/2 rounded mx-auto" />
                </div>
              )}
            </div>
          </button>
        );
      })}
    </div>
  );
}
