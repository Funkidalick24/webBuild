import type { ReactNode } from 'react';

import './globals.css';
import Link from 'next/link';

import { ThemeScript } from '../components/theme/ThemeScript';
import { ThemeToggle } from '../components/theme/ThemeToggle';

export const metadata = {
  title: 'WebBuild',
  description: 'AI-accelerated website builder prototype',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ThemeScript />
        <header className="sticky top-0 z-50 border-b border-[color-mix(in_srgb,var(--md-outline)_45%,transparent)] bg-[color-mix(in_srgb,var(--md-surface)_75%,transparent)] backdrop-blur">
          <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4">
            <div className="flex items-center gap-4">
              <Link
                href="/"
                className="text-lg font-medium tracking-tight text-[var(--md-on-surface)] transition-colors hover:text-[var(--md-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--md-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--md-surface)]"
              >
                WebBuild
              </Link>
              <nav className="hidden items-center gap-2 md:flex">
                <Link
                  href="/create"
                  className="rounded-full px-4 py-2 text-sm font-medium text-[var(--md-on-surface-variant)] transition-all duration-300 ease-[var(--md-ease)] hover:bg-[color-mix(in_srgb,var(--md-primary)_10%,transparent)] hover:text-[var(--md-on-surface)] active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--md-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--md-surface)]"
                >
                  Create
                </Link>
              </nav>
            </div>

            <ThemeToggle />
          </div>
        </header>

        {children}
      </body>
    </html>
  );
}
