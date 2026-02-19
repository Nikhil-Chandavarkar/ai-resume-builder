'use client';

import { useState, useEffect } from 'react';
import { ResumeData } from '@/components/BuilderForm';

const STORAGE_KEY = 'resumeBuilderData';

const defaultData: ResumeData = {
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
  skillsByCategory: {
    technical: [],
    soft: [],
    tools: [],
  },
  links: {
    github: '',
    linkedin: '',
  },
};

/**
 * Custom hook for persisting resume data in localStorage
 */
export function useResumeData() {
  const [data, setData] = useState<ResumeData>(defaultData);
  const [isHydrated, setIsHydrated] = useState(false);
  // Setup a channel to broadcast updates between different hook instances (same tab components or other tabs)
  // This enables live updates of preview when form changes elsewhere in the app.
  let bc: BroadcastChannel | null = null;

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        setData(parsed);
      }
    } catch (error) {
      console.error('Failed to load resume data from localStorage:', error);
    }
    setIsHydrated(true);

    // BroadcastChannel to propagate updates across components/tabs
    try {
      if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        bc = new BroadcastChannel('resume-builder-channel');
        bc.onmessage = (ev: MessageEvent) => {
          if (ev.data && ev.data.type === 'update' && ev.data.payload) {
            try {
              setData(ev.data.payload as ResumeData);
            } catch (e) {
              // ignore
            }
          }
        };
      } else {
        // fallback: listen for storage events (works across tabs)
        const onStorage = (e: StorageEvent) => {
          if (e.key === STORAGE_KEY && e.newValue) {
            try {
              setData(JSON.parse(e.newValue));
            } catch (err) {
              // ignore
            }
          }
        };
        window.addEventListener('storage', onStorage);
      }
    } catch (err) {
      // ignore channel errors
    }
  }, []);

  // Save to localStorage whenever data changes
  const saveData = (newData: ResumeData) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
      setData(newData);
      try {
        // Broadcast to other listeners in same tab or other tabs
        if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          const channel = new BroadcastChannel('resume-builder-channel');
          channel.postMessage({ type: 'update', payload: newData });
          channel.close();
        } else {
          // fallback: write to localStorage (storage event will fire in other tabs)
          localStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
        }
      } catch (err) {
        // ignore
      }
    } catch (error) {
      console.error('Failed to save resume data to localStorage:', error);
    }
  };

  // Clear all data
  const clearData = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
      setData(defaultData);
    } catch (error) {
      console.error('Failed to clear resume data:', error);
    }
  };

  return {
    data,
    saveData,
    clearData,
    isHydrated,
  };
}
