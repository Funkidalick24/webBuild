import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

const buttonVariants = cva(
  'relative inline-flex items-center justify-center font-black uppercase tracking-wide transition-transform duration-200 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[var(--mx-color-accent-2)]',
  {
    variants: {
      tone: {
        pink: 'bg-[var(--mx-color-accent-0)] text-black border-[4px] border-[var(--mx-color-accent-1)] shadow-[var(--mx-shadow-button)]',
        electric:
          'bg-[var(--mx-color-accent-1)] text-black border-[4px] border-[var(--mx-color-accent-4)] shadow-[0_0_0_2px_#000,4px_4px_0_var(--mx-color-accent-0),8px_8px_0_var(--mx-color-accent-3)]',
      },
      size: {
        md: 'text-base px-6 py-3',
        lg: 'text-xl px-8 py-4',
      },
    },
    defaultVariants: {
      tone: 'pink',
      size: 'md',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export function Button({ className = '', tone, size, ...props }: ButtonProps) {
  return (
    <button
      className={`${buttonVariants({ tone, size })} hover:scale-105 hover:-rotate-1 hover:shadow-[0_0_0_2px_#000,6px_6px_0_var(--mx-color-accent-1),12px_12px_0_var(--mx-color-accent-0)] ${className}`}
      {...props}
    />
  );
}
