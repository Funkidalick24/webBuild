import * as React from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export function Input({ className = '', ...props }: InputProps) {
  return (
    <input
      className={`w-full border-[4px] border-double border-[var(--mx-color-accent-1)] bg-black/60 px-4 py-3 text-lg font-bold text-white placeholder:text-pink-200 shadow-[0_0_0_2px_#000,4px_4px_0_var(--mx-color-accent-2),8px_8px_0_var(--mx-color-accent-3)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[var(--mx-color-accent-0)] ${className}`}
      {...props}
    />
  );
}
