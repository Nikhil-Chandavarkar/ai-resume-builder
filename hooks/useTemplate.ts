'use client';

import { useState, useEffect } from 'react';

export type TemplateType = 'classic' | 'modern' | 'minimal';

const DEFAULT_TEMPLATE: TemplateType = 'classic';
const TEMPLATE_STORAGE_KEY = 'resumeTemplateChoice';

/**
 * Hook for managing resume template preference
 * Persists choice to localStorage
 */
export function useTemplate() {
  const [template, setTemplate] = useState<TemplateType>(DEFAULT_TEMPLATE);
  const [isHydrated, setIsHydrated] = useState(false);

  // Load template preference from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(TEMPLATE_STORAGE_KEY);
      if (stored && ['classic', 'modern', 'minimal'].includes(stored)) {
        setTemplate(stored as TemplateType);
      }
    } catch (error) {
      console.error('Failed to load template preference:', error);
    }
    setIsHydrated(true);
  }, []);

  // Save template choice to localStorage
  const selectTemplate = (newTemplate: TemplateType) => {
    try {
      localStorage.setItem(TEMPLATE_STORAGE_KEY, newTemplate);
      setTemplate(newTemplate);
    } catch (error) {
      console.error('Failed to save template preference:', error);
    }
  };

  return {
    template,
    selectTemplate,
    isHydrated,
  };
}

/**
 * Template configuration
 */
export const TEMPLATES = {
  classic: {
    name: 'Classic',
    description: 'Traditional, professional resume layout',
  },
  modern: {
    name: 'Modern',
    description: 'Contemporary design with subtle accents',
  },
  minimal: {
    name: 'Minimal',
    description: 'Clean, minimal aesthetic',
  },
} as const;
