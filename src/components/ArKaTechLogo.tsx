import React from 'react';

interface LogoProps {
  variant: 'green' | 'blue';
  withIcon?: boolean;
  withTagline?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export function ArKaTechLogo({ variant, withIcon = true, withTagline = false, size = 'md' }: LogoProps) {
  const colors = {
    green: {
      primary: '#00A86B',
      secondary: '#008A57',
      accent: '#00C97F'
    },
    blue: {
      primary: '#0066CC',
      secondary: '#0052A3',
      accent: '#0080FF'
    }
  };

  const color = colors[variant];

  const sizes = {
    sm: { logo: 120, icon: 24, text: 'text-xl', tagline: 'text-xs' },
    md: { logo: 180, icon: 36, text: 'text-3xl', tagline: 'text-sm' },
    lg: { logo: 240, icon: 48, text: 'text-5xl', tagline: 'text-base' }
  };

  const s = sizes[size];

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="flex items-center gap-4">
        {withIcon && (
          <svg width={s.icon} height={s.icon} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Hexagonal circuit-inspired icon */}
            <path
              d="M24 4L38.3923 12V28L24 36L9.60769 28V12L24 4Z"
              stroke={color.primary}
              strokeWidth="2.5"
              fill="none"
            />
            <path
              d="M24 12L31.7282 16.5V25.5L24 30L16.2718 25.5V16.5L24 12Z"
              fill={color.primary}
            />
            <circle cx="24" cy="21" r="3" fill="white" />
            {/* Circuit lines */}
            <line x1="24" y1="4" x2="24" y2="12" stroke={color.accent} strokeWidth="2" />
            <line x1="38.3923" y1="12" x2="31.7282" y2="16.5" stroke={color.accent} strokeWidth="2" />
            <line x1="38.3923" y1="28" x2="31.7282" y2="25.5" stroke={color.accent} strokeWidth="2" />
          </svg>
        )}
        <div className="flex flex-col">
          <div className={`${s.text} tracking-tight`} style={{ fontFamily: 'system-ui, -apple-system, sans-serif', fontWeight: 800, letterSpacing: '-0.02em' }}>
            <span style={{ color: color.primary }}>ArKa</span>
            <span style={{ color: color.secondary }}>Tech</span>
          </div>
        </div>
      </div>
      {withTagline && (
        <div className={`${s.tagline} italic text-muted-foreground`} style={{ fontFamily: 'Georgia, serif', letterSpacing: '0.02em' }}>
          Precision in Every Innovation
        </div>
      )}
    </div>
  );
}

// Alternative logo design with geometric A symbol
export function ArKaTechLogoAlt({ variant, withIcon = true, withTagline = false, size = 'md' }: LogoProps) {
  const colors = {
    green: {
      primary: '#00A86B',
      secondary: '#008A57',
      gradient: 'url(#greenGradient)'
    },
    blue: {
      primary: '#0066CC',
      secondary: '#0052A3',
      gradient: 'url(#blueGradient)'
    }
  };

  const color = colors[variant];

  const sizes = {
    sm: { logo: 120, icon: 28, text: 'text-xl', tagline: 'text-xs' },
    md: { logo: 180, icon: 40, text: 'text-3xl', tagline: 'text-sm' },
    lg: { logo: 240, icon: 52, text: 'text-5xl', tagline: 'text-base' }
  };

  const s = sizes[size];

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="flex items-center gap-4">
        {withIcon && (
          <svg width={s.icon} height={s.icon} viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="greenGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#00C97F" />
                <stop offset="100%" stopColor="#008A57" />
              </linearGradient>
              <linearGradient id="blueGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#0080FF" />
                <stop offset="100%" stopColor="#0052A3" />
              </linearGradient>
            </defs>
            {/* Stylized A with digital elements */}
            <path
              d="M26 6L44 46H36L32 36H20L16 46H8L26 6Z"
              fill={color.gradient}
            />
            <rect x="22" y="28" width="8" height="3" fill="white" />
            {/* Digital corners */}
            <path d="M4 4H10V6H6V10H4V4Z" fill={color.primary} />
            <path d="M48 4H42V6H46V10H48V4Z" fill={color.primary} />
            <path d="M4 48H10V46H6V42H4V48Z" fill={color.primary} />
            <path d="M48 48H42V46H46V42H48V48Z" fill={color.primary} />
          </svg>
        )}
        <div className="flex flex-col">
          <div className={`${s.text} tracking-tight`} style={{ fontFamily: 'system-ui, -apple-system, sans-serif', fontWeight: 800, letterSpacing: '-0.03em' }}>
            <span style={{ color: color.primary }}>ArKa</span>
            <span style={{ color: color.secondary }}>Tech</span>
          </div>
        </div>
      </div>
      {withTagline && (
        <div className={`${s.tagline} italic text-muted-foreground`} style={{ fontFamily: 'Georgia, serif', letterSpacing: '0.02em' }}>
          Precision in Every Innovation
        </div>
      )}
    </div>
  );
}
