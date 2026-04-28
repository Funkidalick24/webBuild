import * as React from 'react';

type CardProps = React.HTMLAttributes<HTMLDivElement> & {
  interactive?: boolean;
};

export function Card({ interactive = false, className = '', ...props }: CardProps) {
  return (
    <div
      className={`rounded-[var(--md-radius-lg)] bg-[var(--md-surface-container)] p-6 text-[var(--md-on-surface)] shadow-[var(--md-shadow-sm)] transition-all duration-300 ease-[var(--md-ease)] ${
        interactive ? 'hover:shadow-[var(--md-shadow-md)] hover:scale-[1.01]' : ''
      } ${className}`}
      {...props}
    />
  );
}
