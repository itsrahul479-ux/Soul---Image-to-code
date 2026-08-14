import React, { useState } from 'react';
import { 
  Sparkles, 
  X, 
  Send, 
  RotateCcw, 
  Check, 
  Clock, 
  Sliders, 
  Wand2,
  ChevronRight
} from 'lucide-react';
import { ProjectSpec, ScreenSpec } from '../types';

interface AIRefinementDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  project?: ProjectSpec | null;
  currentScreen?: ScreenSpec | null;
  onSubmitRefine: (promptText: string) => void;
  isLoading: boolean;
}

export const AIRefinementDrawer: React.FC<AIRefinementDrawerProps> = ({
  isOpen,
  onClose,
  project,
  currentScreen,
  onSubmitRefine,
  isLoading,
}) => {
  const [prompt, setPrompt] = useState<string>('');

  if (!isOpen || !project || !currentScreen) return null;

  const quickPrompts = [
    'Apply authentic Glassmorphism (28px blur, specular highlight borders, ambient glow orbs)',
    'Match typography font family, weights, and letter-spacing to screenshot',
    'Reconstruct all icons as exact matching inline SVGs',
    'Add underlying ambient glowing mesh orbs for rich glass refraction',
    'Increase card border radii to 32px with inner specular reflection',
    'Make frosted glass surfaces more translucent with 24px backdrop blur',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim() || isLoading) return;
    onSubmitRefine(prompt);
    setPrompt('');
  };

  const handleChipClick = (chipText: string) => {
    setPrompt(chipText);
  };

  return (
    <div className="fixed inset-y-0 right-0 w-full sm:w-[480px] bg-[#0c121b] border-l border-[#1f2d3e] shadow-2xl z-50 flex flex-col select-none animate-in slide-in-from-right duration-300">
      {/* Drawer Header */}
      <div className="h-16 bg-[#101724] border-b border-[#1e2c3e] px-5 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-sky-400" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-100">AI Visual Refinement</h3>
            <p className="text-xs text-slate-400">Natural language UI calibration</p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="p-1.5 text-slate-400 hover:text-slate-200 hover:bg-[#1c2838] rounded-xl transition-all"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Drawer Body */}
      <div className="flex-1 overflow-y-auto p-5 space-y-6 custom-scrollbar">
        {/* Quick Suggestion Chips */}
        <div>
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2.5">
            Suggested Calibrations
          </span>
          <div className="flex flex-wrap gap-1.5">
            {quickPrompts.map((chip, idx) => (
              <button
                key={idx}
                onClick={() => handleChipClick(chip)}
                className="text-xs text-left bg-[#141d2a] hover:bg-[#1e2a3c] border border-[#243346] hover:border-sky-500/40 text-slate-300 px-3 py-1.5 rounded-xl transition-all"
              >
                {chip}
              </button>
            ))}
          </div>
        </div>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="space-y-3">
          <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
            Custom Refinement Instruction
          </label>
          <div className="relative">
            <textarea
              id="ai-refine-input"
              rows={3}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g. Make card corners 28px and increase hero button padding..."
              className="w-full bg-[#131b26] border border-[#233144] focus:border-sky-500 rounded-2xl p-3 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none resize-none"
            />
            <button
              id="ai-refine-submit-btn"
              type="submit"
              disabled={!prompt.trim() || isLoading}
              className="absolute bottom-3 right-3 bg-gradient-to-r from-sky-500 to-emerald-400 text-slate-950 font-bold px-3.5 py-1.5 rounded-xl text-xs flex items-center gap-1.5 shadow-lg shadow-sky-500/20 disabled:opacity-40 transition-all active:scale-95"
            >
              {isLoading ? (
                <>
                  <Sparkles className="w-3.5 h-3.5 animate-spin" />
                  <span>Refining...</span>
                </>
              ) : (
                <>
                  <Send className="w-3.5 h-3.5" />
                  <span>Apply</span>
                </>
              )}
            </button>
          </div>
        </form>

        {/* Prompt & Refinement History Log */}
        <div>
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2.5">
            Refinement Trail ({project.promptLogs?.length || 0})
          </span>

          <div className="space-y-3">
            {project.promptLogs?.map((log, idx) => (
              <div
                key={log.id || idx}
                className="bg-[#121924] border border-[#1e2a3a] rounded-2xl p-3.5 text-xs space-y-1.5"
              >
                <div className="flex items-center justify-between text-[10px] text-sky-400 font-mono">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {new Date(log.timestamp).toLocaleTimeString()}
                  </span>
                  <span className="text-emerald-400 font-semibold">Success</span>
                </div>
                <div className="font-semibold text-slate-200">"{log.prompt}"</div>
                <p className="text-[11px] text-slate-400 leading-relaxed">{log.aiResponse}</p>
                {log.changesSummary && (
                  <div className="text-[10px] text-slate-500 font-mono pt-1 border-t border-slate-800">
                    {log.changesSummary}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
