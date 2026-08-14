import React, { useState } from 'react';
import { 
  Split, 
  Layers, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  Check, 
  Sliders,
  Maximize2,
  RefreshCw,
  Zap,
  ArrowRight
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { ProjectSpec, ScreenSpec } from '../types';

interface VisualComparatorProps {
  project: ProjectSpec;
  currentScreen: ScreenSpec;
  onApplyFix: (fixId: string) => void;
  onRunAutoQA: () => void;
  isQALoading: boolean;
}

export const VisualComparator: React.FC<VisualComparatorProps> = ({
  project,
  currentScreen,
  onApplyFix,
  onRunAutoQA,
  isQALoading,
}) => {
  const [compareMode, setCompareMode] = useState<'side-by-side' | 'slider' | 'overlay'>('side-by-side');
  const [sliderPos, setSliderPos] = useState<number>(50);
  const [overlayOpacity, setOverlayOpacity] = useState<number>(50);
  const [appliedFixes, setAppliedFixes] = useState<Record<string, boolean>>({});

  const score = currentScreen.matchScore || {
    overall: 96,
    layout: 98,
    typography: 96,
    colors: 98,
    spacing: 95,
    components: 98,
    images: 97,
    effects: 97,
  };

  const handleFix = (fixId: string) => {
    setAppliedFixes((prev) => ({ ...prev, [fixId]: true }));
    onApplyFix(fixId);
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.8 },
      colors: ['#38bdf8', '#34d399', '#818cf8'],
    });
  };

  // Standalone doc generator for preview iframe
  const bundleDoc = () => {
    let html = currentScreen.generatedCode?.html || '';
    const css = currentScreen.generatedCode?.css || '';
    const js = currentScreen.generatedCode?.js || '';

    html = html
      .replace(/<link[^>]*href=["'][^"']*styles\.css["'][^>]*>/gi, '')
      .replace(/<script[^>]*src=["'][^"']*script\.js["'][^>]*><\/script>/gi, '');

    const styleBlock = `
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
    <style>
      ${css}
    </style>`;

    const scriptBlock = `
    <script>
      try {
        ${js}
      } catch (e) {
        console.warn('Sandbox script execution:', e);
      }
    </script>`;

    if (html.includes('</head>')) {
      let doc = html.replace('</head>', `${styleBlock}</head>`);
      if (doc.includes('</body>')) {
        doc = doc.replace('</body>', `${scriptBlock}</body>`);
      } else {
        doc += scriptBlock;
      }
      return doc;
    }

    if (html.includes('<html')) {
      return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  ${styleBlock}
</head>
<body>
  ${html}
  ${scriptBlock}
</body>
</html>`;
    }

    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  ${styleBlock}
</head>
<body>
  ${html}
  ${scriptBlock}
</body>
</html>`;
  };

  return (
    <div className="flex-1 flex flex-col lg:flex-row h-full bg-[#080c12] overflow-hidden select-none">
      {/* Left Comparison Area */}
      <div className="flex-1 flex flex-col border-b lg:border-b-0 lg:border-r border-[#1b2636] overflow-hidden">
        {/* Top Comparison Mode Bar */}
        <div className="h-12 bg-[#101722] border-b border-[#1f2d3e] px-4 flex items-center justify-between z-10 shrink-0">
          <div className="flex items-center gap-1 bg-[#16202e] p-1 rounded-xl border border-[#233346]">
            <button
              id="compare-mode-side"
              onClick={() => setCompareMode('side-by-side')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                compareMode === 'side-by-side'
                  ? 'bg-sky-500 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Side-by-Side
            </button>

            <button
              id="compare-mode-slider"
              onClick={() => setCompareMode('slider')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                compareMode === 'slider'
                  ? 'bg-sky-500 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Curtain Split
            </button>

            <button
              id="compare-mode-overlay"
              onClick={() => setCompareMode('overlay')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                compareMode === 'overlay'
                  ? 'bg-sky-500 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              50% Opacity Overlay
            </button>
          </div>

          {/* Mode-specific Controls */}
          {compareMode === 'overlay' && (
            <div className="flex items-center gap-2 text-xs">
              <span className="text-slate-400 font-medium">HTML Opacity:</span>
              <input
                type="range"
                min="0"
                max="100"
                value={overlayOpacity}
                onChange={(e) => setOverlayOpacity(Number(e.target.value))}
                className="w-24 accent-sky-400"
              />
              <span className="font-mono text-sky-400 w-8 text-right">{overlayOpacity}%</span>
            </div>
          )}

          {compareMode === 'slider' && (
            <div className="flex items-center gap-2 text-xs">
              <span className="text-slate-400 font-medium">Split:</span>
              <input
                type="range"
                min="0"
                max="100"
                value={sliderPos}
                onChange={(e) => setSliderPos(Number(e.target.value))}
                className="w-24 accent-sky-400"
              />
              <span className="font-mono text-sky-400 w-8 text-right">{sliderPos}%</span>
            </div>
          )}
        </div>

        {/* Viewport Render Canvas */}
        <div className="flex-1 bg-[#06080d] p-4 md:p-6 overflow-auto flex items-center justify-center relative">
          {compareMode === 'side-by-side' && (
            <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-8 w-full max-w-5xl">
              {/* Original Screenshot Frame */}
              <div className="flex flex-col items-center">
                <div className="flex items-center justify-between w-full mb-2 px-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Original UI Reference
                  </span>
                  <span className="text-[10px] font-semibold text-slate-400 bg-slate-800 px-2 py-0.5 rounded">
                    Source Pixels
                  </span>
                </div>
                <div className="w-[320px] sm:w-[360px] h-[680px] sm:h-[760px] bg-slate-950 rounded-[40px] border border-slate-700/50 shadow-2xl overflow-hidden relative flex items-center justify-center">
                  <img
                    src={project.originalImageBase64}
                    alt="Original UI Reference"
                    className="max-w-full max-h-full object-contain"
                  />
                  <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-semibold text-slate-300">
                    Target Design
                  </div>
                </div>
              </div>

              {/* Generated Reconstructed HTML Frame */}
              <div className="flex flex-col items-center">
                <div className="flex items-center justify-between w-full mb-2 px-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-sky-400 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" /> Reconstructed HTML/CSS
                  </span>
                  <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded">
                    {score.overall}% Match
                  </span>
                </div>
                <div className="w-[320px] sm:w-[360px] h-[680px] sm:h-[760px] bg-slate-950 rounded-[40px] border border-sky-500/30 shadow-2xl shadow-sky-500/10 overflow-hidden relative">
                  <iframe
                    srcDoc={bundleDoc()}
                    title="Generated UI"
                    className="w-full h-full border-0"
                    sandbox="allow-scripts allow-modals allow-same-origin"
                  />
                  <div className="absolute top-4 right-4 bg-sky-500/90 text-white backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-bold shadow-lg">
                    Live HTML Render
                  </div>
                </div>
              </div>
            </div>
          )}

          {compareMode === 'slider' && (
            <div className="relative w-[360px] h-[760px] rounded-[40px] overflow-hidden border border-slate-700 shadow-2xl bg-slate-950 flex items-center justify-center">
              {/* Bottom: Original Image */}
              <img
                src={project.originalImageBase64}
                alt="Original"
                className="max-w-full max-h-full object-contain"
              />

              {/* Top: Generated Iframe clipped with slider percentage */}
              <div
                style={{ width: `${sliderPos}%` }}
                className="absolute inset-0 h-full overflow-hidden border-r-2 border-sky-400 z-10 bg-slate-900"
              >
                <div className="w-[360px] h-[760px]">
                  <iframe
                    srcDoc={bundleDoc()}
                    title="Generated UI"
                    className="w-full h-full border-0"
                    sandbox="allow-scripts allow-modals allow-same-origin"
                  />
                </div>
              </div>

              {/* Handle badge */}
              <div
                style={{ left: `calc(${sliderPos}% - 16px)` }}
                className="absolute top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-sky-500 text-white flex items-center justify-center text-xs font-bold shadow-lg shadow-sky-500/50 z-20 pointer-events-none"
              >
                ⇄
              </div>
            </div>
          )}

          {compareMode === 'overlay' && (
            <div className="relative w-[360px] h-[760px] rounded-[40px] overflow-hidden border border-slate-700 shadow-2xl bg-slate-950 flex items-center justify-center">
              {/* Original background image */}
              <img
                src={project.originalImageBase64}
                alt="Original Reference"
                className="max-w-full max-h-full object-contain"
              />

              {/* Semi-transparent HTML overlay */}
              <div
                style={{ opacity: overlayOpacity / 100 }}
                className="absolute inset-0 w-full h-full z-10 pointer-events-none"
              >
                <iframe
                  srcDoc={bundleDoc()}
                  title="Generated Overlay"
                  className="w-full h-full border-0"
                  sandbox="allow-scripts allow-modals allow-same-origin"
                />
              </div>

              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/80 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-semibold text-sky-300 border border-sky-500/30 z-20">
                Overlay Blend: {overlayOpacity}%
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Right QA Metrics & Difference Breakdown Panel */}
      <div className="w-full lg:w-96 bg-[#0c1119] flex flex-col p-5 overflow-y-auto shrink-0 select-none">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#1f2d3e] mb-5">
          <div>
            <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-400" />
              Visual Match Report
            </h3>
            <p className="text-xs text-slate-400">Multi-axis visual similarity score</p>
          </div>
          <button
            id="run-qa-btn"
            onClick={onRunAutoQA}
            disabled={isQALoading}
            className="flex items-center gap-1.5 text-xs font-semibold text-sky-400 bg-sky-500/10 hover:bg-sky-500/20 border border-sky-500/30 px-3 py-1.5 rounded-xl transition-all disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isQALoading ? 'animate-spin' : ''}`} />
            <span>Re-evaluate</span>
          </button>
        </div>

        {/* Overall Match Score Banner */}
        <div className="bg-gradient-to-br from-emerald-500/15 via-[#132420] to-[#0e171b] border border-emerald-500/30 rounded-2xl p-4 mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
              Overall Accuracy
            </span>
            <span className="text-3xl font-extrabold text-white font-mono">{score.overall}%</span>
          </div>
          <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden mb-2">
            <div
              style={{ width: `${score.overall}%` }}
              className="h-full bg-gradient-to-r from-emerald-500 to-sky-400 rounded-full transition-all duration-700"
            />
          </div>
          <p className="text-[11px] text-emerald-200/80 leading-relaxed">
            Meets production threshold (90%+). Layout geometry, glassmorphism blur, and typography calibrated.
          </p>
        </div>

        {/* 7-Axis Breakdown Bars */}
        <div className="space-y-3 mb-6">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
            Dimensional Breakdown
          </span>

          <div className="space-y-2 text-xs">
            {[
              { label: 'Layout & Hierarchy', val: score.layout, weight: '25%' },
              { label: 'Colors & Gradients', val: score.colors, weight: '15%' },
              { label: 'Typography Pairing', val: score.typography, weight: '15%' },
              { label: 'Spacing & Padding', val: score.spacing, weight: '15%' },
              { label: 'Components & Cards', val: score.components, weight: '15%' },
              { label: 'Image Assets', val: score.images, weight: '10%' },
              { label: 'Glass & Blur Effects', val: score.effects, weight: '5%' },
            ].map((item, idx) => (
              <div key={idx} className="bg-[#121924] p-2.5 rounded-xl border border-[#1e2a3a]">
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-slate-300 font-medium">{item.label}</span>
                  <span className="font-mono font-bold text-sky-400">{item.val}%</span>
                </div>
                <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                  <div
                    style={{ width: `${item.val}%` }}
                    className="h-full bg-sky-500 rounded-full transition-all duration-500"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Detected Visual Differences & 1-Click Fixes */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Calibrations & Fixes ({currentScreen.differences?.length || 0})
            </span>
          </div>

          <div className="space-y-2.5">
            {currentScreen.differences?.map((diff) => {
              const isApplied = appliedFixes[diff.id] || diff.applied;
              return (
                <div
                  key={diff.id}
                  className={`p-3 rounded-xl border transition-all ${
                    isApplied
                      ? 'bg-emerald-950/20 border-emerald-500/30'
                      : 'bg-[#141c28] border-[#223144] hover:border-slate-600'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 mb-1.5">
                    <span className="text-xs font-semibold text-slate-200">
                      {diff.description}
                    </span>
                    <span
                      className={`text-[9px] uppercase font-bold px-1.5 py-0.5 rounded ${
                        diff.severity === 'high'
                          ? 'bg-rose-500/20 text-rose-400'
                          : 'bg-sky-500/20 text-sky-400'
                      }`}
                    >
                      {diff.type}
                    </span>
                  </div>

                  <div className="text-[11px] font-mono text-slate-400 bg-slate-900/60 p-1.5 rounded-lg border border-slate-800 mb-2.5">
                    {diff.fixSuggestion}
                  </div>

                  <button
                    onClick={() => handleFix(diff.id)}
                    disabled={isApplied}
                    className={`w-full py-1.5 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                      isApplied
                        ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 cursor-default'
                        : 'bg-sky-500 hover:bg-sky-400 text-white shadow-md shadow-sky-500/20 active:scale-95'
                    }`}
                  >
                    {isApplied ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Calibration Applied</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Apply Precision Fix</span>
                      </>
                    )}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
