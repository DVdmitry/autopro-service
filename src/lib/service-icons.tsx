import type { ReactNode } from 'react';

const S = { width: 24, height: 24, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.5, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };

const ICON_MAP: Record<string, ReactNode> = {
  '🛢️': (
    <svg {...S}><path d="M12 2.69l5.66 5.66a8 8 0 11-11.31 0z"/></svg>
  ),
  '🔧': (
    <svg {...S}><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="3"/><path d="M12 3v3M12 18v3M3 12h3M18 12h3"/></svg>
  ),
  '🔘': (
    <svg {...S}><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="1.5"/><path d="M12 3v4M12 17v4M3 12h4M17 12h4"/></svg>
  ),
  '🔍': (
    <svg {...S}><path d="M2 12h4l3-9 6 18 3-9h4"/></svg>
  ),
  '⚙️': (
    <svg {...S}>
      <circle cx="12" cy="12" r="3"/>
      <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 01-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/>
    </svg>
  ),
  '❄️': (
    <svg {...S}><path d="M12 2v20M2 12h20M5.64 5.64l12.73 12.73M18.36 5.64L5.64 18.36"/><path d="M12 5l-2 2M12 5l2 2M12 19l-2-2M12 19l2-2M5 12l2-2M5 12l2 2M19 12l-2-2M19 12l-2 2"/></svg>
  ),
  '⚡': (
    <svg {...S}><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
  ),
  '🔩': (
    <svg {...S}><path d="M12 22V8M5 12l7-4 7 4"/><circle cx="12" cy="5" r="3"/></svg>
  ),
  '🔄': (
    <svg {...S}><path d="M21 12a9 9 0 11-6.22-8.56"/><polyline points="21 3 21 9 15 9"/></svg>
  ),
  '✨': (
    <svg {...S}><path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5z"/><path d="M19 15l.5 1.5L21 17l-1.5.5L19 19l-.5-1.5L17 17l1.5-.5z"/></svg>
  ),
  '🔨': (
    <svg {...S}><path d="M15 12l-8.5 8.5c-.83.83-2.17.83-3 0s-.83-2.17 0-3L12 9"/><path d="M17.64 15L22 10.64l-4.05-4.05a2 2 0 00-2.83 0l-1.68 1.68"/><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18z"/></svg>
  ),
  '📋': (
    <svg {...S}><path d="M16 4h2a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h2"/><rect x="8" y="2" width="8" height="4" rx="1"/><path d="M9 12h6M9 16h6"/></svg>
  ),
};

export function ServiceIcon({ emoji, size = 24 }: { emoji: string; size?: number }) {
  const svg = ICON_MAP[emoji];
  if (!svg) {
    return <span style={{ fontSize: size, lineHeight: 1 }}>{emoji}</span>;
  }
  return <span style={{ display: 'inline-flex', width: size, height: size, color: 'currentColor' }}>{svg}</span>;
}
