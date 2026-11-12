import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'red' | 'white' | 'outline';
  className?: string;
}

export function Badge({ children, variant = 'white', className = '' }: BadgeProps) {
  const baseStyles = 'inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wide transition-all';
  
  const variants = {
    red: 'bg-brand-red text-brand-white',
    white: 'bg-brand-white text-brand-blue',
    outline: 'bg-brand-white/10 text-brand-white border border-brand-white/20 backdrop-blur-md',
  };

  return (
    <span className={`${baseStyles} ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
}