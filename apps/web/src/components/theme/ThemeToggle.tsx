'use client';

import { useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

function getTheme(): Theme {
  const t = document.documentElement.dataset.theme;
  return t === 'dark' ? 'dark' : 'light';
}

function setTheme(next: Theme) {
  document.documentElement.dataset.theme = next;
  try {
    localStorage.setItem('wb-theme', next);
  } catch {}
}

export function ThemeToggle() {
  const [theme, setThemeState] = useState<Theme>('light');

  useEffect(() => {
    setThemeState(getTheme());
  }, []);

  return (
    <button
      type="button"
      onClick={() => {
        const next = theme === 'dark' ? 'light' : 'dark';
        setTheme(next);
        setThemeState(next);
      }}
      className="inline-flex h-10 items-center justify-center rounded-full bg-[var(--md-surface-container)] px-4 text-sm font-medium text-[var(--md-on-surface)] shadow-[var(--md-shadow-sm)] transition-all duration-300 ease-[var(--md-ease)] hover:shadow-[var(--md-shadow-md)] active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--md-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--md-surface)]"
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? 'Dark' : 'Light'}
    </button>
  );
}

