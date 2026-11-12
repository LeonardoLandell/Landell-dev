import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  href?: string;
  download?: string;
  className?: string;
}

export function Button({
  children,
  variant = 'primary',
  href,
  download,
  className = '',
  ...props
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center px-6 py-3.5 rounded-xl font-semibold text-sm transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 shadow-md';
  
  const variants = {
    primary: 'bg-brand-red text-brand-white hover:bg-[#c92428]',
    secondary: 'bg-brand-white text-brand-blue hover:bg-white',
    outline: 'border border-brand-white text-brand-white hover:bg-brand-white hover:text-brand-blue',
  };

  const combinedStyles = `${baseStyles} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <a href={href} download={download} className={combinedStyles}>
        {children}
      </a>
    );
  }

  return (
    <button className={combinedStyles} {...props}>
      {children}
    </button>
  );
}