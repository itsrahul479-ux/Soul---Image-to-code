import React from 'react';
import {
  Layers,
  Palette,
  Sparkles,
  Image as ImageIcon,
  History,
  FileCode2,
  FolderOpen,
  Sliders,
  Check,
  Smartphone,
  Eye,
  Info,
  Trash2,
  Plus,
  Upload,
} from 'lucide-react';
import { ProjectSpec, ScreenSpec } from '../types';
import { AssetManager } from './AssetManager';

interface SidebarProps {
  project?: ProjectSpec | null;
  currentScreen?: ScreenSpec | null;
  onSelectScreen: (screenId: string) => void;
  activePanel: 'design' | 'components' | 'assets' | 'history' | 'projects';
  setActivePanel: (panel: 'design' | 'components' | 'assets' | 'history' | 'projects') => void;
  onSelectSampleProject: (projectId: string) => void;
  sampleProjects: ProjectSpec[];
  onDeleteProject?: (projectId: string) => void;
  onOpenUpload?: () => void;
  onUpdateCode?: (html: string, css: string, js: string) => void;
  onQuickRefine?: (prompt: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  project,
  currentScreen,
  onSelectScreen,
  activePanel,
  setActivePanel,
  onSelectSampleProject,
  sampleProjects,
  onDeleteProject,
  onOpenUpload,
  onUpdateCode,
  onQuickRefine,
}) => {
  const handleBlurChange = (val: string) => {
    if (!currentScreen?.generatedCode || !onUpdateCode) return;
    let css = currentScreen.generatedCode.css || '';
    if (css.includes('--blur-amount:')) {
      css = css.replace(/--blur-amount:\s*[^;]+;/, `--blur-amount: ${val};`);
    } else {
      css = `:root { --blur-amount: ${val}; }\n` + css;
    }
    onUpdateCode(currentScreen.generatedCode.html, css, currentScreen.generatedCode.js);
  };

  const handleFontFamilyChange = (font: string) => {
    if (!currentScreen?.generatedCode || !onUpdateCode) return;
    let css = currentScreen.generatedCode.css || '';
    if (css.includes('--font-family:')) {
      css = css.replace(/--font-family:\s*[^;]+;/, `--font-family: '${font}', sans-serif;`);
    } else {
      css = `:root { --font-family: '${font}', sans-serif; }\n` + css;
    }
    onUpdateCode(currentScreen.generatedCode.html, css, currentScreen.generatedCode.js);
  };
  return (
    <aside className="w-16 md:w-64 bg-[#0d121a] border-r border-[#1e2a3a] flex flex-col shrink-0 select-none z-20">
      {/* Navigation item icons */}
      <div className="p-2 border-b border-[#1b2636] grid grid-cols-5 md:flex md:flex-col gap-1">
        <button
          id="panel-btn-projects"
          onClick={() => setActivePanel('projects')}
          className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
            activePanel === 'projects'
              ? 'bg-sky-500/15 text-sky-400 border border-sky-500/30'
              : 'text-slate-400 hover:text-slate-200 hover:bg-[#162130]'
          }`}
          title="Projects"
        >
          <div className="flex items-center gap-2.5">
            <FolderOpen className="w-4 h-4 shrink-0 text-amber-400" />
            <span className="hidden md:inline">Projects</span>
          </div>
          <span className="hidden md:inline text-[10px] font-mono font-bold bg-[#1a2536] px-1.5 py-0.5 rounded text-slate-400">
            {sampleProjects.length}
          </span>
        </button>

        <button
          id="panel-btn-design"
          onClick={() => setActivePanel('design')}
          className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
            activePanel === 'design'
              ? 'bg-sky-500/15 text-sky-400 border border-sky-500/30'
              : 'text-slate-400 hover:text-slate-200 hover:bg-[#162130]'
          }`}
          title="Design System Tokens"
        >
          <Palette className="w-4 h-4 shrink-0 text-sky-400" />
          <span className="hidden md:inline">Design System</span>
        </button>

        <button
          id="panel-btn-components"
          onClick={() => setActivePanel('components')}
          className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
            activePanel === 'components'
              ? 'bg-sky-500/15 text-sky-400 border border-sky-500/30'
              : 'text-slate-400 hover:text-slate-200 hover:bg-[#162130]'
          }`}
          title="Components & Layers"
        >
          <Layers className="w-4 h-4 shrink-0 text-emerald-400" />
          <span className="hidden md:inline">Components</span>
        </button>

        <button
          id="panel-btn-assets"
          onClick={() => setActivePanel('assets')}
          className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
            activePanel === 'assets'
              ? 'bg-sky-500/15 text-sky-400 border border-sky-500/30'
              : 'text-slate-400 hover:text-slate-200 hover:bg-[#162130]'
          }`}
          title="Assets & Icon Matcher"
        >
          <ImageIcon className="w-4 h-4 shrink-0 text-purple-400" />
          <span className="hidden md:inline">Assets & Icons</span>
        </button>

        <button
          id="panel-btn-history"
          onClick={() => setActivePanel('history')}
          className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
            activePanel === 'history'
              ? 'bg-sky-500/15 text-sky-400 border border-sky-500/30'
              : 'text-slate-400 hover:text-slate-200 hover:bg-[#162130]'
          }`}
          title="Prompt & Version History"
        >
          <History className="w-4 h-4 shrink-0 text-indigo-400" />
          <span className="hidden md:inline">AI History</span>
        </button>
      </div>

      {/* Main Panel Content Container (Desktop view) */}
      <div className="flex-1 overflow-y-auto p-3.5 space-y-4 custom-scrollbar hidden md:block">
        {activePanel === 'projects' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                Projects ({sampleProjects.length})
              </span>
              {onOpenUpload && (
                <button
                  id="sidebar-new-project-btn"
                  onClick={onOpenUpload}
                  className="text-[10px] font-bold text-sky-400 hover:text-sky-300 flex items-center gap-1 bg-sky-500/10 px-2 py-0.5 rounded-lg border border-sky-500/20"
                >
                  <Plus className="w-3 h-3" /> New
                </button>
              )}
            </div>

            {sampleProjects.length === 0 ? (
              <div className="bg-[#141b26] border border-[#202d3e] rounded-2xl p-5 text-center space-y-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 mx-auto flex items-center justify-center">
                  <FolderOpen className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-200 mb-1">No Projects Yet</h4>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    Upload your first UI screenshot to reverse-engineer code and extract design tokens.
                  </p>
                </div>
                {onOpenUpload && (
                  <button
                    onClick={onOpenUpload}
                    className="w-full py-2 bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-all shadow-md shadow-sky-500/20"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload Screenshot</span>
                  </button>
                )}
              </div>
            ) : (
              <div className="space-y-2">
                {sampleProjects.map((p) => {
                  const isCurrent = project && p.id === project.id;
                  return (
                    <div
                      key={p.id}
                      className={`group relative rounded-xl border transition-all ${
                        isCurrent
                          ? 'bg-sky-500/10 border-sky-500/40 shadow-sm'
                          : 'bg-[#141b26] border-[#202d3e] hover:border-slate-600'
                      }`}
                    >
                      <button
                        id={`load-preset-${p.id}`}
                        onClick={() => onSelectSampleProject(p.id)}
                        className="w-full text-left p-3 pr-8"
                      >
                        <h4 className="text-xs font-bold text-slate-100 mb-1 truncate">{p.name}</h4>
                        <p className="text-[11px] text-slate-400 line-clamp-1">
                          {p.screens.length} Screen(s) &bull; {p.originalImageBase64 ? 'Reconstructed' : 'Spec'}
                        </p>
                      </button>

                      {onDeleteProject && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onDeleteProject(p.id);
                          }}
                          className="absolute top-3 right-2 text-slate-500 hover:text-rose-400 p-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                          title="Delete Project"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {activePanel === 'design' && (
          <div className="space-y-4">
            {!project || !currentScreen ? (
              <div className="text-center py-8 text-xs text-slate-400">
                Upload a UI screenshot to view extracted design tokens.
              </div>
            ) : (
              <>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                      Glassmorphism Optics
                    </span>
                    <span className="text-[10px] font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                      Live Calibrated
                    </span>
                  </div>
                  <div className="bg-[#141b26] border border-[#233144] rounded-xl p-3 space-y-3 text-xs">
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-slate-400">Backdrop Blur:</span>
                        <span className="font-mono text-sky-400 font-bold">{currentScreen.effects?.blur || '24px'}</span>
                      </div>
                      <div className="flex gap-1.5 pt-1">
                        {['16px', '24px', '32px', '40px'].map((b) => (
                          <button
                            key={b}
                            onClick={() => handleBlurChange(b)}
                            className="flex-1 py-1 bg-[#101724] hover:bg-sky-500/20 hover:border-sky-500/40 border border-[#202d3e] text-[10px] font-mono text-slate-300 rounded-lg transition-all"
                          >
                            {b}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="flex justify-between items-center pt-2 border-t border-[#1e2a3a]">
                      <span className="text-slate-400">Inner Specular Highlight:</span>
                      <span className="text-emerald-400 font-semibold text-[11px]">1px 35%</span>
                    </div>
                  </div>
                </div>

                {/* Typography Engine */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                      Typography & Font Family
                    </span>
                    <span className="text-[10px] font-mono text-sky-400">Google Fonts</span>
                  </div>
                  <div className="bg-[#141b26] border border-[#233144] rounded-xl p-2.5 space-y-1.5">
                    {[
                      { name: 'Outfit', category: 'Geometric Modern (iOS/Fintech)' },
                      { name: 'Plus Jakarta Sans', category: 'Clean Tech & SaaS' },
                      { name: 'Inter', category: 'Neutral System Standard' },
                      { name: 'Poppins', category: 'Friendly & Bold' },
                      { name: 'Space Grotesk', category: 'Brutalist & Futuristic' },
                      { name: 'Playfair Display', category: 'Editorial & Luxury' },
                    ].map((f) => (
                      <button
                        key={f.name}
                        onClick={() => handleFontFamilyChange(f.name)}
                        className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-sky-500/10 hover:border-sky-500/30 border border-transparent flex items-center justify-between text-xs transition-all group"
                      >
                        <span className="font-semibold text-slate-200 group-hover:text-sky-300">{f.name}</span>
                        <span className="text-[10px] text-slate-500">{f.category}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                    Extracted Palette
                  </span>
                  <div className="space-y-1.5">
                    {currentScreen.designTokens?.colors?.map((col, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between p-2 rounded-lg bg-[#141b26] border border-[#202d3e] text-xs hover:border-slate-600 transition-colors"
                      >
                        <div className="flex items-center gap-2">
                          <div
                            className="w-4 h-4 rounded-md shadow-sm border border-white/20"
                            style={{ backgroundColor: col.value }}
                          />
                          <span className="text-slate-300 font-medium">{col.name}</span>
                        </div>
                        <span className="font-mono text-[11px] text-slate-400">{col.value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                    Border Radii
                  </span>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="bg-[#141b26] p-2.5 rounded-lg border border-[#202d3e]">
                      <span className="text-slate-400 block text-[10px]">Medium Card</span>
                      <span className="font-mono text-sky-400 font-bold">{currentScreen.designTokens?.radius?.medium || 20}px</span>
                    </div>
                    <div className="bg-[#141b26] p-2.5 rounded-lg border border-[#202d3e]">
                      <span className="text-slate-400 block text-[10px]">Large Frame</span>
                      <span className="font-mono text-emerald-400 font-bold">{currentScreen.frame?.radius || 44}px</span>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        )}

        {activePanel === 'components' && (
          <div className="space-y-3">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
              Detected Hierarchy
            </span>
            {!currentScreen?.components || currentScreen.components.length === 0 ? (
              <div className="text-center py-8 text-xs text-slate-400">
                Upload a screenshot to detect UI component hierarchy.
              </div>
            ) : (
              <div className="space-y-1.5 text-xs">
                {currentScreen.components.map((comp, idx) => (
                  <div
                    key={comp.id || idx}
                    className="p-2.5 bg-[#141b26] border border-[#202d3e] rounded-xl hover:border-sky-500/50 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold text-slate-200">{comp.name}</span>
                      <span className="text-[10px] uppercase font-bold text-sky-400 bg-sky-500/10 px-1.5 py-0.5 rounded">
                        {comp.type}
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-400 font-mono flex items-center gap-2">
                      <span>W: {comp.bounds.width}px</span>
                      <span>H: {comp.bounds.height}px</span>
                      {comp.visualDetails?.glassEffect && (
                        <span className="text-emerald-400">✨ Glass</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activePanel === 'assets' && (
          currentScreen ? (
            <AssetManager currentScreen={currentScreen} />
          ) : (
            <div className="text-center py-8 text-xs text-slate-400">
              Upload a UI screenshot to manage assets and icons.
            </div>
          )
        )}

        {activePanel === 'history' && (
          <div className="space-y-3">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
              AI Prompt & Refinement Log
            </span>
            {!project?.promptLogs || project.promptLogs.length === 0 ? (
              <div className="text-center py-8 text-xs text-slate-400">
                No prompt history yet.
              </div>
            ) : (
              <div className="space-y-2">
                {project.promptLogs.map((log, idx) => (
                  <div
                    key={log.id || idx}
                    className="p-2.5 bg-[#141b26] border border-[#202d3e] rounded-xl text-xs space-y-1"
                  >
                    <div className="text-[10px] text-sky-400 font-semibold font-mono">
                      {new Date(log.timestamp).toLocaleTimeString()}
                    </div>
                    <p className="text-slate-200 font-medium">"{log.prompt}"</p>
                    <p className="text-[11px] text-slate-400">{log.aiResponse}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Screen selector on sidebar bottom */}
      {project && project.screens && project.screens.length > 0 && currentScreen && (
        <div className="p-3 border-t border-[#1b2636] hidden md:block">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-2">
            Active Screen
          </span>
          <div className="space-y-1">
            {project.screens.map((screen, idx) => (
              <button
                key={screen.id}
                onClick={() => onSelectScreen(screen.id)}
                className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs flex items-center justify-between transition-all ${
                  screen.id === currentScreen.id
                    ? 'bg-sky-500 text-white font-semibold shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-[#162130]'
                }`}
              >
                <span className="truncate">{screen.title}</span>
                <Smartphone className="w-3.5 h-3.5 shrink-0 opacity-70" />
              </button>
            ))}
          </div>
        </div>
      )}
    </aside>
  );
};
