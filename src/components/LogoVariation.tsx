import React from 'react';

interface LogoVariationProps {
  title: string;
  children: React.ReactNode;
  background?: string;
}

export function LogoVariation({ title, children, background = 'bg-white' }: LogoVariationProps) {
  return (
    <div className="border border-border rounded-lg overflow-hidden">
      <div className="p-3 bg-muted border-b border-border">
        <p className="text-sm text-muted-foreground">{title}</p>
      </div>
      <div className={`p-8 flex items-center justify-center min-h-[200px] ${background}`}>
        {children}
      </div>
    </div>
  );
}
