"use client";

import React, { useEffect } from 'react';

interface Props {
  message: string;
  show: boolean;
  onClose?: () => void;
}

export function Toast({ message, show, onClose }: Props) {
  useEffect(() => {
    if (!show) return;
    const t = setTimeout(() => onClose && onClose(), 3500);
    return () => clearTimeout(t);
  }, [show, onClose]);

  if (!show) return null;

  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-[#111827] text-white px-4 py-2 rounded shadow-lg z-50">
      {message}
    </div>
  );
}
