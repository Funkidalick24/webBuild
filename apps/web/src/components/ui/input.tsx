import * as React from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export function Input({ className = '', ...props }: InputProps) {
  return (
    <input
      className={`h-14 w-full rounded-t-[var(--md-radius-sm)] rounded-b-none bg-[var(--md-surface-container-low)] px-4 text-[var(--md-on-surface)] shadow-[var(--md-shadow-sm)] ring-0 placeholder:text-[color-mix(in_srgb,var(--md-on-surface)_55%,transparent)] transition-all duration-200 ease-[var(--md-ease)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color-mix(in_srgb,var(--md-primary)_35%,transparent)] focus-visible:ring-offset-0 border-b-2 border-[var(--md-outline)] focus:border-[var(--md-primary)] ${className}`}
      {...props}
    />
  );
}
