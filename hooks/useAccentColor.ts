"use client";

import { useState, useEffect } from 'react';

const STORAGE_KEY = 'resumeAccentColor';
const DEFAULT = 'hsl(168, 60%, 40%)';

export function useAccentColor() {
  const [color, setColor] = useState<string>(DEFAULT);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setColor(stored);
    } catch (e) {
      // ignore
    }
  }, []);

  const setAndStore = (c: string) => {
    try {
      localStorage.setItem(STORAGE_KEY, c);
    } catch (e) {
      // ignore
    }
    setColor(c);
  };

  return { color, setColor: setAndStore };
}
