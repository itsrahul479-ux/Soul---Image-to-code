import React, { useState, useRef, useEffect } from 'react';
import {
  Upload,
  Sparkles,
  FileImage,
  Layers,
  Code,
  Palette,
  ShieldCheck,
  Zap,
  ArrowRight,
  Eye,
  SlidersHorizontal,
  CheckCircle2,
} from 'lucide-react';

interface EmptyProjectViewProps {
  onAnalyzeScreenshot: (imageBase64: string) => Promise<void>;
  isAnalyzing: boolean;
  onLoadDemoSample?: () => void;
}

export const EmptyProjectView: React.FC<EmptyProjectViewProps> = ({
  onAnalyzeScreenshot,
  isAnalyzing,
  onLoadDemoSample,
}) => {
  const [dragOver, setDragOver] = useState<boolean>(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [analysisStage, setAnalysisStage] = useState<string>('Analyzing visual structure...');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Clipboard paste support (Ctrl+V / Cmd+V)
  useEffect(() => {
    const handlePaste = (e: ClipboardEvent) => {
      const items = e.clipboardData?.items;
      if (!items) return;
      for (let i = 0; i < items.length; i++) {
        if (items[i].type.startsWith('image/')) {
          const file = items[i].getAsFile();
          if (file) {
            handleFile(file);
            break;
          }
        }
      }
    };

    window.addEventListener('paste', handlePaste);
    return () => window.removeEventListener('paste', handlePaste);
  }, []);

  const handleFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please upload a valid image file (PNG, JPG, WEBP, HEIC).');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const base64 = e.target?.result as string;
      setPreviewImage(base64);
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleStartAnalysis = async () => {
    if (!previewImage) return;

    setAnalysisStage('Detecting device frames & screen boundaries...');
    const t1 = setTimeout(() => {
      setAnalysisStage('Extracting frosted glass tokens & color palette...');
    }, 900);
    const t2 = setTimeout(() => {
      setAnalysisStage('Matching SVG icons & semantic component hierarchy...');
    }, 1800);
    const t3 = setTimeout(() => {
      setAnalysisStage('Synthesizing production HTML5, CSS3 & JavaScript...');
    }, 2700);

    try {
      await onAnalyzeScreenshot(previewImage);
    } finally {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      setPreviewImage(null);
    }
  };

  return (
    <div className="flex-1 overflow-y-auto bg-[#070b12] text-slate-100 p-6 md:p-10 flex flex-col items-center justify-center min-h-full">
      <div className="w-full max-w-4xl space-y-8 my-auto">
        {/* Title and Intro */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Multimodal Reverse-Engineering Engine</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white">
            Upload UI Screenshot to Generate Code
          </h2>
          <p className="text-sm md:text-base text-slate-400 max-w-xl mx-auto">
            Drop any mobile app, web dashboard, or design mockup. Our vision engine detects screen hierarchy, glassmorphism tokens, and generates production-ready HTML, CSS, and JS.
          </p>
        </div>

        {/* Upload Box */}
        <div className="bg-[#0e1522] border border-[#1e2a3c] rounded-3xl p-6 md:p-8 shadow-2xl">
          {!previewImage ? (
            <div
              id="empty-view-dropzone"
              onDragOver={(e) => {
                e.preventDefault();
                setDragOver(true);
              }}
              onDragLeave={() => setDragOver(false)}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-2xl p-10 md:p-14 flex flex-col items-center justify-center text-center cursor-pointer transition-all ${
                dragOver
                  ? 'border-sky-400 bg-sky-500/10 scale-[0.99]'
                  : 'border-[#26374d] hover:border-sky-500/60 bg-[#121c2c]/40 hover:bg-[#121c2c]/70'
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/png,image/jpeg,image/webp,image/heic"
                className="hidden"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    handleFile(e.target.files[0]);
                  }
                }}
              />

              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-sky-500/20 to-emerald-500/20 border border-sky-500/30 flex items-center justify-center text-sky-400 mb-5 shadow-lg shadow-sky-500/10">
                <Upload className="w-8 h-8" />
              </div>

              <h3 className="text-lg font-bold text-white mb-1.5">
                Drag and drop your screenshot here, or <span className="text-sky-400 underline underline-offset-4">browse</span>
              </h3>
              <p className="text-xs text-slate-400 max-w-md mb-6">
                Supports PNG, JPG, WEBP screenshots. You can also paste directly from clipboard with <kbd className="bg-[#1b2636] px-2 py-0.5 rounded text-slate-300 font-mono text-[11px] border border-slate-700">Ctrl+V</kbd> or <kbd className="bg-[#1b2636] px-2 py-0.5 rounded text-slate-300 font-mono text-[11px] border border-slate-700">Cmd+V</kbd>.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-slate-400">
                <span className="flex items-center gap-1.5 bg-[#172233] px-3 py-1.5 rounded-xl border border-[#26374d]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Auto-Device Frame Detection
                </span>
                <span className="flex items-center gap-1.5 bg-[#172233] px-3 py-1.5 rounded-xl border border-[#26374d]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Glassmorphism Tokens & Blur
                </span>
                <span className="flex items-center gap-1.5 bg-[#172233] px-3 py-1.5 rounded-xl border border-[#26374d]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Inline SVG Icons
                </span>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="relative rounded-2xl overflow-hidden border border-slate-700 max-h-[380px] flex items-center justify-center bg-black/60 p-2">
                <img
                  src={previewImage}
                  alt="Uploaded UI Screenshot"
                  className="max-h-[360px] object-contain rounded-xl shadow-lg"
                />
                {!isAnalyzing && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setPreviewImage(null);
                    }}
                    className="absolute top-4 right-4 bg-black/80 hover:bg-black text-white px-3 py-1.5 rounded-xl text-xs font-semibold backdrop-blur-md border border-slate-700 hover:border-slate-500 transition-all"
                  >
                    Change Image
                  </button>
                )}
              </div>

              {isAnalyzing ? (
                <div className="bg-[#131d2b] border border-sky-500/40 rounded-2xl p-6 text-center space-y-4 shadow-xl">
                  <div className="flex items-center justify-center gap-2.5 text-sky-400 font-bold text-sm">
                    <Sparkles className="w-5 h-5 animate-spin" />
                    <span>{analysisStage}</span>
                  </div>
                  <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-sky-500 via-indigo-500 to-emerald-400 rounded-full animate-pulse w-4/5" />
                  </div>
                  <p className="text-xs text-slate-400 font-mono">
                    Extracting layouts, typography, gradients, glass cards, and compiling sandbox bundle...
                  </p>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <button
                    id="empty-start-analysis-btn"
                    onClick={handleStartAnalysis}
                    className="flex-1 py-4 bg-gradient-to-r from-sky-400 via-teal-400 to-emerald-400 hover:from-sky-300 hover:to-emerald-300 text-slate-950 font-bold rounded-2xl text-sm flex items-center justify-center gap-2.5 shadow-xl shadow-sky-500/25 transition-all active:scale-98"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>Reverse-Engineer UI & Generate Code</span>
                  </button>
                  <button
                    onClick={() => setPreviewImage(null)}
                    className="px-5 py-4 bg-[#182333] hover:bg-[#202f45] text-slate-300 hover:text-white font-semibold rounded-2xl text-sm border border-[#27384f] transition-all"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Optional Demo Presets Trigger */}
          {onLoadDemoSample && !previewImage && (
            <div className="mt-6 pt-6 border-t border-[#1a2535] flex items-center justify-between">
              <span className="text-xs text-slate-400 flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-amber-400" /> Don't have a screenshot ready?
              </span>
              <button
                id="load-demo-sample-btn"
                onClick={onLoadDemoSample}
                className="text-xs font-semibold text-sky-400 hover:text-sky-300 hover:underline flex items-center gap-1"
              >
                Load demo preset <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          )}
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-[#0d131f] border border-[#1b2737] rounded-2xl p-4.5 space-y-2">
            <div className="w-8 h-8 rounded-xl bg-sky-500/10 text-sky-400 flex items-center justify-center">
              <Eye className="w-4 h-4" />
            </div>
            <h4 className="text-xs font-bold text-slate-200">Pixel-Accurate Visual Split</h4>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Compare your original screenshot side-by-side or with interactive split-slider against live rendered HTML.
            </p>
          </div>

          <div className="bg-[#0d131f] border border-[#1b2737] rounded-2xl p-4.5 space-y-2">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
              <Palette className="w-4 h-4" />
            </div>
            <h4 className="text-xs font-bold text-slate-200">Design System Tokens</h4>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Auto-extracted CSS custom properties for frosted glass blur, surface opacity, borders, and typography.
            </p>
          </div>

          <div className="bg-[#0d131f] border border-[#1b2737] rounded-2xl p-4.5 space-y-2">
            <div className="w-8 h-8 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center">
              <Code className="w-4 h-4" />
            </div>
            <h4 className="text-xs font-bold text-slate-200">Bespoke HTML/CSS/JS Export</h4>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Clean semantic markup with inline SVGs and standalone CSS that can be downloaded as a complete standalone ZIP.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
