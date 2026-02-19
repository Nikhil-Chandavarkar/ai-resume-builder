"use client";

import React from 'react';

export const COLORS = [
  { key: 'teal', value: 'hsl(168, 60%, 40%)' },
  { key: 'navy', value: 'hsl(220, 60%, 35%)' },
  { key: 'burgundy', value: 'hsl(345, 60%, 35%)' },
  { key: 'forest', value: 'hsl(150, 50%, 30%)' },
  { key: 'charcoal', value: 'hsl(0, 0%, 25%)' },
];

interface Props {
  value: string;
  onChange: (c: string) => void;
}

export function ColorPicker({ value, onChange }: Props) {
  return (
    <div className="flex items-center gap-3">
      {COLORS.map((c) => (
        <button
          key={c.key}
          onClick={() => onChange(c.value)}
          aria-label={c.key}
          className={`w-8 h-8 rounded-full ring-2 ${value === c.value ? 'ring-blue-500' : 'ring-transparent'}`}
          style={{ background: c.value }}
        />
      ))}
    </div>
  );
}
