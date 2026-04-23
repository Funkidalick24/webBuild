import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

const buttonVariants = cva(
  'relative inline-flex items-center justify-center font-black uppercase tracking-wide transition-transform duration-200 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-yellow-300',
  {
    variants: {
      tone: {
        pink: 'bg-pink-500 text-black border-[4px] border-cyan-300 shadow-[0_0_0_2px_#000,4px_4px_0_#00F5D4,8px_8px_0_#FFE600]',
        electric:
          'bg-cyan-300 text-black border-[4px] border-orange-500 shadow-[0_0_0_2px_#000,4px_4px_0_#FF1178,8px_8px_0_#7B61FF]',
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
      className={`${buttonVariants({ tone, size })} hover:scale-105 hover:-rotate-1 hover:shadow-[0_0_0_2px_#000,6px_6px_0_#00F5D4,12px_12px_0_#FF1178] ${className}`}
      {...props}
    />
  );
}
