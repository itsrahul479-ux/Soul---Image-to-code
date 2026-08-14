import React, { useState, useRef } from 'react';
import { 
  Upload, 
  X, 
  Sparkles, 
  Image as ImageIcon, 
  Layers, 
  CheckCircle2, 
  AlertCircle,
  FileImage,
  ArrowRight,
  Zap
} from 'lucide-react';
import { ProjectSpec } from '../types';

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAnalyzeScreenshot: (imageBase64: string) => Promise<void>;
  onSelectSampleProject?: (projectId: string) => void;
  sampleProjects?: ProjectSpec[];
  isAnalyzing: boolean;
}

export const UploadModal: React.FC<UploadModalProps> = ({
  isOpen,
  onClose,
  onAnalyzeScreenshot,
  onSelectSampleProject,
  sampleProjects = [],
  isAnalyzing,
}) => {
  const [dragOver, setDragOver] = useState<boolean>(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [analysisStage, setAnalysisStage] = useState<string>('Analyzing visual structure...');
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

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

    // Multi-stage progress indication
    setAnalysisStage('Detecting device frames & screen boundaries...');
    const t1 = setTimeout(() => {
      setAnalysisStage('Extracting frosted glass tokens & color palette...');
    }, 800);
    const t2 = setTimeout(() => {
      setAnalysisStage('Matching icons & discovering free stock assets...');
    }, 1600);
    const t3 = setTimeout(() => {
      setAnalysisStage('Generating semantic HTML, CSS & interactions...');
    }, 2400);

    try {
      await onAnalyzeScreenshot(previewImage);
      onClose();
      setPreviewImage(null);
    } finally {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 select-none">
      <div className="bg-[#0e141e] border border-[#202e40] rounded-3xl w-full max-w-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="h-16 bg-[#121926] border-b border-[#1f2c3e] px-6 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center">
              <Upload className="w-4 h-4 text-sky-400" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-100">Upload UI Screenshot</h3>
              <p className="text-xs text-slate-400">Reverse-engineer any mobile, web, or tablet interface</p>
            </div>
          </div>

          <button
            onClick={onClose}
            disabled={isAnalyzing}
            className="p-1.5 text-slate-400 hover:text-slate-200 hover:bg-[#1e2a3c] rounded-xl transition-all disabled:opacity-50"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 custom-scrollbar">
          {/* Drag & Drop Area */}
          {!previewImage ? (
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setDragOver(true);
              }}
              onDragLeave={() => setDragOver(false)}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-3xl p-8 flex flex-col items-center justify-center text-center cursor-pointer transition-all ${
                dragOver
                  ? 'border-sky-400 bg-sky-500/10'
                  : 'border-[#26374d] hover:border-sky-500/50 bg-[#121a26]/50'
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

              <div className="w-14 h-14 rounded-2xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400 mb-4 shadow-lg shadow-sky-500/10">
                <FileImage className="w-7 h-7" />
              </div>

              <h4 className="text-sm font-bold text-slate-100 mb-1">
                Drop your UI screenshot here, or <span className="text-sky-400 underline">browse</span>
              </h4>
              <p className="text-xs text-slate-400 max-w-sm mb-4">
                Supports single or multi-screen screenshots. Supports PNG, JPG, WEBP up to 20MB. You can also paste (<kbd className="bg-slate-800 px-1.5 py-0.5 rounded text-slate-300 font-mono text-[10px]">Ctrl+V</kbd>).
              </p>

              <div className="flex flex-wrap items-center justify-center gap-2.5 text-[11px] text-slate-500">
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Multi-screen detection
                </span>
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Glassmorphism extraction
                </span>
                <span className="flex items-center gap-1 text-sky-400 bg-sky-950/40 border border-sky-800/40 px-2 py-0.5 rounded-full">
                  <Sparkles className="w-3 h-3 text-sky-400" /> User Asset Vault matching active
                </span>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="relative rounded-2xl overflow-hidden border border-slate-700 max-h-[300px] flex items-center justify-center bg-black/40">
                <img
                  src={previewImage}
                  alt="Upload Preview"
                  className="max-h-[300px] object-contain rounded-xl"
                />
                {!isAnalyzing && (
                  <button
                    onClick={() => setPreviewImage(null)}
                    className="absolute top-3 right-3 bg-black/70 hover:bg-black text-white p-1.5 rounded-full backdrop-blur-md"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              {isAnalyzing ? (
                <div className="bg-[#141d2a] border border-sky-500/30 rounded-2xl p-4 text-center space-y-3">
                  <div className="flex items-center justify-center gap-2 text-sky-400 font-semibold text-sm">
                    <Sparkles className="w-4 h-4 animate-spin" />
                    <span>{analysisStage}</span>
                  </div>
                  <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-sky-500 to-emerald-400 rounded-full animate-pulse w-3/4" />
                  </div>
                </div>
              ) : (
                <button
                  id="start-analysis-btn"
                  onClick={handleStartAnalysis}
                  className="w-full py-3.5 bg-gradient-to-r from-sky-500 to-emerald-400 hover:from-sky-400 hover:to-emerald-300 text-slate-950 font-bold rounded-2xl text-sm flex items-center justify-center gap-2 shadow-xl shadow-sky-500/25 transition-all active:scale-98"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Run Multimodal Reverse Engineering</span>
                </button>
              )}
            </div>
          )}

          {/* Preset Samples (if available) */}
          {sampleProjects && sampleProjects.length > 0 && onSelectSampleProject && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Zap className="w-3.5 h-3.5 text-amber-400" />
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  Or load existing project
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {sampleProjects.map((sample) => (
                  <button
                    key={sample.id}
                    onClick={() => {
                      onSelectSampleProject(sample.id);
                      onClose();
                    }}
                    className="p-3.5 bg-[#131a26] hover:bg-[#1b2536] border border-[#223044] hover:border-sky-500/50 rounded-2xl text-left transition-all flex items-center justify-between group"
                  >
                    <div>
                      <h5 className="text-xs font-bold text-slate-100 group-hover:text-sky-400 transition-colors">
                        {sample.name}
                      </h5>
                      <span className="text-[11px] text-slate-400">
                        {sample.screens.length} Reconstructed Screens
                      </span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-sky-400 transition-colors" />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
