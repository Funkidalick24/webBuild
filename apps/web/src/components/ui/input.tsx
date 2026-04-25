import * as React from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export function Input({ className = '', ...props }: InputProps) {
  return (
    <input
      className={`w-full border-[4px] border-double border-cyan-300 bg-black/60 px-4 py-3 text-lg font-bold text-white placeholder:text-pink-200 shadow-[0_0_0_2px_#000,4px_4px_0_#FFE600,8px_8px_0_#7B61FF] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-pink-400 ${className}`}
      {...props}
    />
  );
}
