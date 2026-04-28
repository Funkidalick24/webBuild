import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-full font-medium transition-all duration-300 ease-[var(--md-ease)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--md-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--md-surface)] disabled:cursor-not-allowed disabled:opacity-50 active:scale-95',
  {
    variants: {
      variant: {
        filled:
          'bg-[var(--md-primary)] text-[var(--md-on-primary)] shadow-[var(--md-shadow-sm)] hover:bg-[color-mix(in_srgb,var(--md-primary)_90%,transparent)] hover:shadow-[var(--md-shadow-md)] active:bg-[color-mix(in_srgb,var(--md-primary)_80%,transparent)]',
        tonal:
          'bg-[var(--md-secondary-container)] text-[var(--md-on-secondary-container)] shadow-[var(--md-shadow-sm)] hover:bg-[color-mix(in_srgb,var(--md-secondary-container)_92%,transparent)] hover:shadow-[var(--md-shadow-md)] active:bg-[color-mix(in_srgb,var(--md-secondary-container)_84%,transparent)]',
        outlined:
          'border border-[var(--md-outline)] bg-transparent text-[var(--md-primary)] hover:bg-[color-mix(in_srgb,var(--md-primary)_10%,transparent)] active:bg-[color-mix(in_srgb,var(--md-primary)_5%,transparent)]',
        text: 'bg-transparent text-[var(--md-primary)] hover:bg-[color-mix(in_srgb,var(--md-primary)_10%,transparent)] active:bg-[color-mix(in_srgb,var(--md-primary)_5%,transparent)]',
      },
      size: {
        sm: 'h-9 px-4 text-sm',
        md: 'h-10 px-6 text-sm',
        lg: 'h-12 px-8 text-base',
      },
    },
    defaultVariants: {
      variant: 'filled',
      size: 'md',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export function Button({ className = '', variant, size, ...props }: ButtonProps) {
  return (
    <button
      className={`${buttonVariants({ variant, size })} ${className}`}
      {...props}
    />
  );
}
