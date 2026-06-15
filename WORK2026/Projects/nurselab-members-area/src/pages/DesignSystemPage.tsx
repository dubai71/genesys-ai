import React from 'react';
import { Icon } from '../components/icons';

const iconList = [
  'Home', 'Heart', 'Calendar', 'Clock', 'User', 'Award', 'Compass', 'Settings', 'LogOut',
] as const;

const designTokens = {
  colors: {
    primaryRed: '#D91F27',
    white: '#FFFFFF',
    softGray: '#9C9D9D',
    black950: '#08090B',
    black900: '#0B0C0F',
    black850: '#0F1014',
    black800: '#111315',
    black700: '#17191E',
  },
  typography: {
    fontFamily: '"Muller", "Inter", sans-serif',
    weights: {
      bold: 700,
      medium: 500,
      regular: 400,
      light: 300,
    },
    scales: {
      display: { size: '56px', lineHeight: '0.95', letterSpacing: '-2px' },
      pageTitle: { size: '40px', lineHeight: '1.05', letterSpacing: '-1.4px' },
      sectionTitle: { size: '24px', lineHeight: '1.2', letterSpacing: 'normal' },
      cardTitle: { size: '16px', lineHeight: '1.25', letterSpacing: 'normal' },
      body: { size: '15px', lineHeight: '1.6', letterSpacing: 'normal' },
      caption: { size: '12px', lineHeight: '1.4', letterSpacing: 'normal' },
    },
  },
  borderRadius: {
    sm: '10px',
    md: '14px',
    lg: '20px',
    xl: '28px',
    full: '999px',
  },
  shadows: {
    card: '0 18px 50px rgba(0,0,0,0.45)',
    hero: '0 30px 90px rgba(0,0,0,0.62)',
    glass: '0 20px 60px rgba(0,0,0,0.38)',
  },
  glass: {
    bg: 'rgba(255,255,255,0.08)',
    bgStrong: 'rgba(255,255,255,0.14)',
    border: 'rgba(255,255,255,0.16)',
    blur: 'blur(24px)',
  },
};

export const DesignSystemPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-black-900 p-12 overflow-x-hidden">
      <div className="max-w-6xl mx-auto space-y-16">
        <header>
          <h1 className="text-5xl font-extrabold text-white mb-4 tracking-[-2px]">
            Design System
          </h1>
          <p className="text-lg text-white/60 max-w-2xl">
            Complete visual reference for NurseLab Members Area. Includes tokens, colors, typography, iconography, and component patterns.
          </p>
        </header>

        {/* Colors Section */}
        <section>
          <h2 className="text-3xl font-bold text-white mb-8">Colors</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {Object.entries(designTokens.colors).map(([name, color]) => (
              <div key={name} className="space-y-3">
                <div
                  className="w-full h-24 rounded-xl border border-white/10 shadow-lg"
                  style={{ backgroundColor: color }}
                />
                <div>
                  <p className="text-sm font-semibold text-white capitalize">{name}</p>
                  <p className="text-xs text-white/60 font-mono">{color}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Typography Section */}
        <section>
          <h2 className="text-3xl font-bold text-white mb-8">Typography</h2>
          <div className="bg-black-800 rounded-2xl p-8 space-y-6 border border-white/5">
            <div className="border-b border-white/10 pb-6">
              <p className="text-xs text-white/40 uppercase tracking-widest mb-2">Font Family</p>
              <p className="text-xl font-medium text-white" style={{ fontFamily: designTokens.typography.fontFamily }}>
                Muller / Inter
              </p>
            </div>

            {Object.entries(designTokens.typography.scales).map(([name, scale]) => (
              <div key={name} className="border-b border-white/10 pb-6 last:border-b-0 last:pb-0">
                <div className="flex items-baseline gap-4 mb-2">
                  <p className="text-sm text-white/40 uppercase tracking-wider w-32">{name}</p>
                  <p className="text-xs text-white/60 font-mono">
                    {scale.size} / {scale.lineHeight} / {scale.letterSpacing}
                  </p>
                </div>
                <p
                  className="text-white font-bold"
                  style={{
                    fontSize: scale.size,
                    lineHeight: scale.lineHeight,
                    letterSpacing: scale.letterSpacing,
                    fontFamily: designTokens.typography.fontFamily,
                  }}
                >
                  Sample {name} text
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Icons Section */}
        <section>
          <h2 className="text-3xl font-bold text-white mb-8">Icons</h2>
          <div className="bg-black-800 rounded-2xl p-8 border border-white/5">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
              {iconList.map((iconName) => (
                <div key={iconName} className="space-y-4 flex flex-col items-center">
                  {/* Inactive */}
                  <div className="space-y-2 text-center">
                    <div className="w-14 h-14 rounded-xl bg-white/04 border border-white/10 flex items-center justify-center">
                      <Icon name={iconName as any} size={24} className="text-soft-gray" />
                    </div>
                    <p className="text-xs text-white/50 uppercase">{iconName}</p>
                  </div>

                  {/* Active (filled) */}
                  <div className="space-y-2 text-center">
                    <div className="w-14 h-14 rounded-xl bg-primary-red/10 border border-primary-red/30 flex items-center justify-center">
                      <Icon name={iconName as any} size={24} active filled />
                    </div>
                    <p className="text-xs text-primary-red uppercase">Active</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Radius Section */}
        <section>
          <h2 className="text-3xl font-bold text-white mb-8">Border Radius</h2>
          <div className="flex flex-wrap gap-6">
            {Object.entries(designTokens.borderRadius).map(([name, radius]) => (
              <div key={name} className="flex flex-col items-center space-y-3">
                <div
                  className="w-20 h-20 bg-white/10 border border-white/20"
                  style={{ borderRadius: radius }}
                />
                <div className="text-center">
                  <p className="text-sm font-semibold text-white capitalize">{name}</p>
                  <p className="text-xs text-white/50 font-mono">{radius}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Shadows Section */}
        <section>
          <h2 className="text-3xl font-bold text-white mb-8">Shadows</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Object.entries(designTokens.shadows).map(([name, shadow]) => (
              <div key={name} className="space-y-4">
                <div
                  className="w-full h-32 rounded-2xl bg-black-700 border border-white/5 flex items-center justify-center"
                  style={{ boxShadow: shadow }}
                >
                  <span className="text-sm text-white/40 uppercase">{name}</span>
                </div>
                <code className="block text-xs text-white/60 font-mono p-4 bg-black-800 rounded-lg border border-white/5 break-all">
                  {shadow}
                </code>
              </div>
            ))}
          </div>
        </section>

        {/* Glass Tokens */}
        <section>
          <h2 className="text-3xl font-bold text-white mb-8">Glassmorphism Tokens</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.entries(designTokens.glass).map(([key, value]) => (
              <div key={key} className="space-y-4">
                <div className="flex items-center gap-4">
                  <div
                    className="w-16 h-16 rounded-2xl border border-white/10"
                    style={{
                      backgroundColor: value.includes('rgba') ? value : undefined,
                      backdropFilter: value.includes('blur') ? value : undefined,
                      boxShadow: key === 'blur' ? 'none' : 'var(--glass-shadow)',
                    }}
                  />
                  <div>
                    <p className="text-sm font-semibold text-white uppercase">{key}</p>
                    <code className="text-xs text-white/60 font-mono">{value}</code>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default DesignSystemPage;
