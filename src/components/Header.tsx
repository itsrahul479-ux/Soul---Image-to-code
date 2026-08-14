import React from 'react';
import { 
  Sparkles, 
  Eye, 
  Download, 
  Upload, 
  Layers, 
  CheckCircle2, 
  Maximize2,
  RefreshCw,
  Code,
  SlidersHorizontal,
  ChevronRight
} from 'lucide-react';
import { ProjectSpec, ScreenSpec } from '../types';

interface HeaderProps {
  project?: ProjectSpec | null;
  currentScreen?: ScreenSpec | null;
  onSelectScreen: (screenId: string) => void;
  onOpenUpload: () => void;
  onOpenRefine: () => void;
  onOpenExport: () => void;
  activeTab: string;
  setActiveTab: (tab: 'preview' | 'compare' | 'code') => void;
}

export const Header: React.FC<HeaderProps> = ({
  project,
  currentScreen,
  onSelectScreen,
  onOpenUpload,
  onOpenRefine,
  onOpenExport,
  activeTab,
  setActiveTab,
}) => {
  const hasActiveProject = Boolean(project && currentScreen);

  return (
    <header className="h-16 bg-[#0f141c] border-b border-[#222f3e] px-4 md:px-6 flex items-center justify-between z-30 shrink-0 select-none">
      {/* Brand & Project Info */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-sky-500 via-indigo-500 to-emerald-400 p-[1px] flex items-center justify-center shadow-lg shadow-sky-500/20">
            <div className="w-full h-full bg-[#0d121a] rounded-[11px] flex items-center justify-center">
              <Code className="w-4 h-4 text-sky-400" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base font-extrabold text-slate-100 tracking-tight flex items-center gap-1.5">
                <span className="bg-gradient-to-r from-sky-400 via-teal-300 to-emerald-400 bg-clip-text text-transparent">Soul</span>
                <span className="text-slate-500 font-normal text-xs">&bull; Screen &rarr; HTML</span>
              </h1>
              <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                AI Vision
              </span>
            </div>
            <p className="text-xs text-slate-400 font-medium truncate max-w-[200px] md:max-w-xs">
              {project ? project.name : 'Awaiting Screenshot Upload'}
            </p>
          </div>
        </div>

        {/* Multi-screen selector tabs */}
        {project && project.screens && project.screens.length > 1 && (
          <div className="hidden lg:flex items-center bg-[#17202e] border border-[#2a3a4e] p-1 rounded-xl gap-1 ml-4">
            <span className="text-[11px] font-medium text-slate-400 px-2 flex items-center gap-1">
              <Layers className="w-3 h-3 text-sky-400" /> Screens:
            </span>
            {project.screens.map((screen, idx) => {
              const isActive = currentScreen && screen.id === currentScreen.id;
              return (
                <button
                  key={screen.id}
                  id={`screen-tab-${screen.id}`}
                  onClick={() => onSelectScreen(screen.id)}
                  className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-all ${
                    isActive
                      ? 'bg-sky-500 text-white shadow-md shadow-sky-500/25 font-semibold'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  {screen.title.split(':')[0] || `Screen ${idx + 1}`}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Center View Mode Switcher (only active when project loaded) */}
      {hasActiveProject ? (
        <div className="flex items-center bg-[#141c28] border border-[#223144] p-1 rounded-xl shadow-inner">
          <button
            id="nav-preview-btn"
            onClick={() => setActiveTab('preview')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'preview'
                ? 'bg-[#223347] text-sky-400 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Live Preview</span>
          </button>

          <button
            id="nav-compare-btn"
            onClick={() => setActiveTab('compare')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'compare'
                ? 'bg-[#223347] text-sky-400 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Visual Compare</span>
            <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-1.5 py-0.2 rounded">
              {currentScreen?.matchScore?.overall || 96}%
            </span>
          </button>

          <button
            id="nav-code-btn"
            onClick={() => setActiveTab('code')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'code'
                ? 'bg-[#223347] text-sky-400 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Code className="w-3.5 h-3.5" />
            <span>Code Studio</span>
          </button>
        </div>
      ) : (
        <div className="hidden md:flex items-center gap-2 text-xs text-slate-500 bg-[#121924] px-4 py-1.5 rounded-xl border border-[#1e2a3c]">
          <span className="w-2 h-2 rounded-full bg-sky-400/80 animate-ping" />
          <span>Upload screenshot to unlock live preview & code studio</span>
        </div>
      )}

      {/* Right Controls */}
      <div className="flex items-center gap-2">
        <button
          id="header-upload-btn"
          onClick={onOpenUpload}
          className={`flex items-center gap-1.5 text-xs font-semibold px-3.5 py-2 rounded-xl transition-all shadow-sm group ${
            hasActiveProject
              ? 'text-slate-100 bg-[#162131] hover:bg-[#202f45] border border-sky-500/30 hover:border-sky-400/60'
              : 'text-slate-950 bg-gradient-to-r from-sky-400 to-emerald-400 hover:from-sky-300 hover:to-emerald-300 font-bold shadow-sky-500/20'
          }`}
        >
          <Upload className={`w-3.5 h-3.5 group-hover:scale-110 transition-transform ${hasActiveProject ? 'text-sky-400' : 'text-slate-950'}`} />
          <span className="hidden sm:inline">Upload Screenshot</span>
          <span className="sm:hidden">Upload</span>
        </button>

        {hasActiveProject && (
          <>
            <button
              id="header-refine-btn"
              onClick={onOpenRefine}
              className="flex items-center gap-1.5 text-xs font-semibold text-sky-200 bg-sky-950/60 hover:bg-sky-900/60 border border-sky-600/40 px-3.5 py-2 rounded-xl transition-all shadow-sm"
            >
              <Sparkles className="w-3.5 h-3.5 text-sky-400 animate-pulse" />
              <span className="hidden md:inline">AI Refine</span>
            </button>

            <button
              id="header-export-btn"
              onClick={onOpenExport}
              className="flex items-center gap-1.5 text-xs font-bold text-slate-900 bg-gradient-to-r from-sky-400 to-emerald-400 hover:from-sky-300 hover:to-emerald-300 px-4 py-2 rounded-xl shadow-lg shadow-sky-500/20 transition-all active:scale-95"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export ZIP</span>
            </button>
          </>
        )}
      </div>
    </header>
  );
};
