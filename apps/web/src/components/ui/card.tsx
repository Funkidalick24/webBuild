import * as React from 'react';

type CardProps = React.HTMLAttributes<HTMLDivElement> & {
  accent?: string;
};

export function Card({ accent = 'var(--mx-color-accent-2)', className = '', ...props }: CardProps) {
  return (
    <div
      className={`pattern-dot-stripe relative rounded-none border-[4px] border-dashed bg-[var(--mx-color-surface)] p-6 text-[var(--mx-color-text)] shadow-[var(--mx-shadow-card)] ${className}`}
      style={{ borderColor: accent }}
      {...props}
    />
  );
}
