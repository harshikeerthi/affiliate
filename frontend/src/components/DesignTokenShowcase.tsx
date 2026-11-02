import React, { useState } from 'react';
import { Palette, Type, Check, Copy, Languages } from 'lucide-react';

interface ColorToken {
  name: string;
  role: string;
  hex: string;
  textColor: string;
  borderColor?: string;
}

const COLOR_TOKENS: ColorToken[] = [
  { name: 'Canvas', role: 'Main background', hex: '#FAF7F2', textColor: '#12101F', borderColor: '#E8E2D8' },
  { name: 'Secondary Surface', role: 'Cards & containers', hex: '#F3ECE1', textColor: '#12101F', borderColor: '#E8E2D8' },
  { name: 'Main Text', role: 'Headings & primary copy', hex: '#12101F', textColor: '#FAF7F2' },
  { name: 'Secondary Text', role: 'Muted captions & metadata', hex: '#575266', textColor: '#FAF7F2' },
  { name: 'Border', role: 'Dividers & container strokes', hex: '#E8E2D8', textColor: '#12101F' },
  { name: 'Violet', role: 'Primary brand accent & actions', hex: '#6B3CFF', textColor: '#FFFFFF' },
  { name: 'Magenta', role: 'Secondary brand highlight', hex: '#FF4FA3', textColor: '#FFFFFF' },
  { name: 'Lime', role: 'Success, active state & energy', hex: '#D6F36B', textColor: '#12101F' },
  { name: 'Admin Dark', role: 'Dashboard headers & codeblocks', hex: '#0E0B1E', textColor: '#FFFFFF' },
];

export const DesignTokenShowcase: React.FC = () => {
  const [copiedHex, setCopiedHex] = useState<string | null>(null);

  const handleCopy = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex(null), 1800);
  };

  return (
    <div className="space-y-8">
      
      {/* Color Palette Section */}
      <div className="rounded-3xl bg-white border border-sbloom-border p-6 sm:p-8 shadow-sbloom">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 rounded-2xl bg-sbloom-violet/15 flex items-center justify-center text-sbloom-violet">
            <Palette className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-fraunces text-xl font-bold text-sbloom-text-main">
              sBLOOM Design Palette Tokens
            </h3>
            <p className="text-xs text-sbloom-text-secondary">
              Official color tokens configured in Tailwind CSS theme extension. Click any card to copy hex code.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-3.5">
          {COLOR_TOKENS.map((token) => {
            const isCopied = copiedHex === token.hex;
            return (
              <div
                key={token.name}
                onClick={() => handleCopy(token.hex)}
                className="group relative p-4 rounded-2xl border transition-all duration-200 cursor-pointer hover:shadow-md hover:-translate-y-0.5 active:scale-[0.98]"
                style={{
                  backgroundColor: token.hex,
                  borderColor: token.borderColor || 'rgba(0,0,0,0.08)',
                }}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h4
                      className="font-fraunces font-bold text-sm tracking-wide"
                      style={{ color: token.textColor }}
                    >
                      {token.name}
                    </h4>
                    <p
                      className="text-xs mt-0.5 opacity-85"
                      style={{ color: token.textColor }}
                    >
                      {token.role}
                    </p>
                  </div>
                  <button
                    className="p-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity bg-black/15 text-current"
                    title="Copy HEX"
                  >
                    {isCopied ? (
                      <Check className="w-3.5 h-3.5" style={{ color: token.textColor }} />
                    ) : (
                      <Copy className="w-3.5 h-3.5" style={{ color: token.textColor }} />
                    )}
                  </button>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <code
                    className="text-xs font-mono font-bold px-2 py-0.5 rounded"
                    style={{
                      backgroundColor: 'rgba(0,0,0,0.12)',
                      color: token.textColor,
                    }}
                  >
                    {token.hex}
                  </code>
                  {isCopied && (
                    <span
                      className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-black/20"
                      style={{ color: token.textColor }}
                    >
                      Copied!
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Typography Showcase */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Headings & Body */}
        <div className="rounded-3xl bg-white border border-sbloom-border p-6 sm:p-8 shadow-sbloom flex flex-col justify-between">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 rounded-2xl bg-sbloom-magenta/15 flex items-center justify-center text-sbloom-magenta">
                <Type className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-fraunces text-lg font-bold text-sbloom-text-main">
                  English Typography
                </h3>
                <p className="text-xs text-sbloom-text-secondary">
                  Fraunces (Headings) + Plus Jakarta Sans (Body)
                </p>
              </div>
            </div>

            <div className="space-y-4 pt-2">
              <div>
                <span className="text-[11px] font-semibold text-sbloom-violet uppercase tracking-wider">
                  Heading Specimen (Fraunces Display Serif)
                </span>
                <h4 className="font-fraunces text-2xl font-bold text-sbloom-text-main leading-snug mt-1">
                  Empowering Creators with Seamless Affiliate Intelligence.
                </h4>
              </div>

              <div>
                <span className="text-[11px] font-semibold text-sbloom-text-secondary uppercase tracking-wider">
                  Body Specimen (Plus Jakarta Sans)
                </span>
                <p className="font-sans text-sm text-sbloom-text-secondary leading-relaxed mt-1">
                  sBLOOM provides next-generation transparent commission tracking, real-time telemetry, and modular partner onboarding built on FastAPI and React.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-sbloom-border/70 flex items-center justify-between text-xs text-sbloom-text-secondary font-mono">
            <span>Font Weights: 400, 600, 700, 800</span>
            <span className="text-sbloom-violet font-semibold">Google Fonts Loaded</span>
          </div>
        </div>

        {/* Telugu Typography */}
        <div className="rounded-3xl bg-white border border-sbloom-border p-6 sm:p-8 shadow-sbloom flex flex-col justify-between">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 rounded-2xl bg-sbloom-lime/30 flex items-center justify-center text-sbloom-text-main">
                <Languages className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-fraunces text-lg font-bold text-sbloom-text-main">
                  తెలుగు ఫాంట్ (Telugu Typography)
                </h3>
                <p className="text-xs text-sbloom-text-secondary">
                  Noto Sans Telugu Support for Multilingual Interface
                </p>
              </div>
            </div>

            <div className="space-y-4 pt-2">
              <div>
                <span className="text-[11px] font-semibold text-sbloom-magenta uppercase tracking-wider">
                  తెలుగు శీర్షిక (Telugu Heading)
                </span>
                <h4 className="font-telugu text-xl font-bold text-sbloom-text-main leading-snug mt-1">
                  sBLOOM అఫిలియేట్ పోర్టల్‌కు స్వాగతం
                </h4>
              </div>

              <div>
                <span className="text-[11px] font-semibold text-sbloom-text-secondary uppercase tracking-wider">
                  తెలుగు వివరణ (Telugu Body Text)
                </span>
                <p className="font-telugu text-sm text-sbloom-text-secondary leading-relaxed mt-1">
                  మీ అఫిలియేట్ లింక్‌లు, కమీషన్లు మరియు తాజా పురోగతిని ఒకే వేదికపై సులభంగా ట్రాక్ చేయండి.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-sbloom-border/70 flex items-center justify-between text-xs text-sbloom-text-secondary font-mono">
            <span>Noto Sans Telugu</span>
            <span className="text-[#6fa014] font-semibold">UTF-8 & Unicode Ready</span>
          </div>
        </div>

      </div>

    </div>
  );
};
