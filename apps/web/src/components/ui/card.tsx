import * as React from 'react';

type CardProps = React.HTMLAttributes<HTMLDivElement> & {
  accent?: string;
};

export function Card({ accent = '#FFE600', className = '', ...props }: CardProps) {
  return (
    <div
      className={`pattern-dot-stripe relative rounded-none border-[4px] border-dashed bg-[#1A0936] p-6 text-[#F7F2FF] shadow-[0_0_0_2px_#000,6px_6px_0_#00F5D4,10px_10px_0_#FF1178,0_0_30px_rgba(255,230,0,0.4)] ${className}`}
      style={{ borderColor: accent }}
      {...props}
    />
  );
}
