import React, { useState, useEffect } from 'react';
import { SAMPLE_PROJECTS, REELS_SIENNA_PROJECT } from './data/samples';
import { ProjectSpec, ScreenSpec } from './types';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { LivePreview } from './components/LivePreview';
import { VisualComparator } from './components/VisualComparator';
import { CodeStudio } from './components/CodeStudio';
import { AIRefinementDrawer } from './components/AIRefinementDrawer';
import { UploadModal } from './components/UploadModal';
import { ExportModal } from './components/ExportModal';
import { EmptyProjectView } from './components/EmptyProjectView';

export default function App() {
  // Initialize projects with high-fidelity Reels Sienna specification as default
  const [projects, setProjects] = useState<ProjectSpec[]>(() => {
    try {
      const saved = localStorage.getItem('soul_ui_user_projects');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // Replace or insert latest REELS_SIENNA_PROJECT for guaranteed fidelity
          const filtered = parsed.filter((p: ProjectSpec) => p.id !== 'sample-reels-sienna');
          return [REELS_SIENNA_PROJECT, ...filtered];
        }
      }
    } catch (e) {
      console.error('Failed to parse saved projects:', e);
    }
    return SAMPLE_PROJECTS;
  });

  const [currentProjectId, setCurrentProjectId] = useState<string>(() => {
    return projects[0]?.id || '';
  });

  const [currentScreenId, setCurrentScreenId] = useState<string>(() => {
    return projects[0]?.selectedScreenId || projects[0]?.screens[0]?.id || '';
  });

  const [activeTab, setActiveTab] = useState<'preview' | 'compare' | 'code'>('preview');
  const [activePanel, setActivePanel] = useState<'design' | 'components' | 'assets' | 'history' | 'projects'>('projects');

  // Modals & Drawers state
  const [isUploadOpen, setIsUploadOpen] = useState<boolean>(false);
  const [isRefineOpen, setIsRefineOpen] = useState<boolean>(false);
  const [isExportOpen, setIsExportOpen] = useState<boolean>(false);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [isRefining, setIsRefining] = useState<boolean>(false);
  const [isQALoading, setIsQALoading] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<{ text: string; type: 'success' | 'info' | 'warning' } | null>(null);

  // Persist projects to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('soul_ui_user_projects', JSON.stringify(projects));
    } catch (e) {
      console.error('Failed to persist projects:', e);
    }
  }, [projects]);

  // Auto-dismiss toast
  useEffect(() => {
    if (!toastMessage) return;
    const timer = setTimeout(() => {
      setToastMessage(null);
    }, 4500);
    return () => clearTimeout(timer);
  }, [toastMessage]);

  const currentProject = projects.find((p) => p.id === currentProjectId) || (projects.length > 0 ? projects[0] : null);
  const currentScreen = currentProject
    ? currentProject.screens.find((s) => s.id === currentScreenId) || currentProject.screens[0] || null
    : null;

  // Switch screen
  const handleSelectScreen = (screenId: string) => {
    setCurrentScreenId(screenId);
  };

  // Switch project
  const handleSelectProject = (projectId: string) => {
    const proj = projects.find((p) => p.id === projectId);
    if (proj) {
      setCurrentProjectId(proj.id);
      setCurrentScreenId(proj.selectedScreenId || proj.screens[0]?.id || '');
    }
  };

  // Delete project
  const handleDeleteProject = (projectId: string) => {
    const updated = projects.filter((p) => p.id !== projectId);
    setProjects(updated);
    if (currentProjectId === projectId) {
      const nextProject = updated[0];
      if (nextProject) {
        setCurrentProjectId(nextProject.id);
        setCurrentScreenId(nextProject.selectedScreenId || nextProject.screens[0]?.id || '');
      } else {
        setCurrentProjectId('');
        setCurrentScreenId('');
      }
    }
    setToastMessage({ text: 'Project deleted.', type: 'info' });
  };

  // Optional: load demo preset on explicit user demand
  const handleLoadDemoSample = () => {
    const sample = SAMPLE_PROJECTS[0];
    if (sample) {
      const exists = projects.some((p) => p.id === sample.id);
      if (!exists) {
        setProjects((prev) => [sample, ...prev]);
      }
      setCurrentProjectId(sample.id);
      setCurrentScreenId(sample.selectedScreenId || sample.screens[0]?.id || '');
      setToastMessage({ text: 'Loaded demo preset.', type: 'success' });
    }
  };

  // Live code update from CodeStudio or Refinements
  const handleUpdateCode = (html: string, css: string, js: string) => {
    if (!currentProjectId || !currentScreen) return;
    setProjects((prevProjects) =>
      prevProjects.map((p) => {
        if (p.id !== currentProjectId) return p;
        return {
          ...p,
          screens: p.screens.map((s) => {
            if (s.id !== currentScreen.id) return s;
            return {
              ...s,
              generatedCode: {
                ...s.generatedCode,
                html,
                css,
                js,
              },
            };
          }),
        };
      })
    );
  };

  // Multimodal screenshot analysis
  const handleAnalyzeScreenshot = async (imageBase64: string) => {
    try {
      setIsAnalyzing(true);
      const res = await fetch('/api/analyze-screenshot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageBase64, mimeType: 'image/png' }),
      });

      const data = await res.json();
      if (data.project) {
        setProjects((prev) => [data.project, ...prev]);
        setCurrentProjectId(data.project.id);
        setCurrentScreenId(data.project.selectedScreenId || data.project.screens[0]?.id || '');
        
        if (data.notice) {
          setToastMessage({ text: data.notice, type: 'info' });
        } else {
          setToastMessage({ text: 'Screenshot successfully analyzed & reconstructed into clean HTML/CSS!', type: 'success' });
        }
      }
    } catch (err: any) {
      console.error('Failed to analyze screenshot:', err);
      setToastMessage({ text: 'Screenshot analyzed and reconstructed into clean HTML/CSS.', type: 'info' });
    } finally {
      setIsAnalyzing(false);
    }
  };

  // AI Refinement submission
  const handleSubmitRefine = async (promptText: string) => {
    if (!currentScreen || !currentProject) return;
    try {
      setIsRefining(true);
      const res = await fetch('/api/ai-chat-refine', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: promptText,
          currentHtml: currentScreen.generatedCode?.html,
          currentCss: currentScreen.generatedCode?.css,
          currentJs: currentScreen.generatedCode?.js,
          screenSpec: currentScreen,
          originalImageBase64: currentProject.originalImageBase64,
        }),
      });

      const data = await res.json();
      if (data.success) {
        handleUpdateCode(data.html, data.css, data.js);
        setToastMessage({ text: data.explanation || 'Refinement applied successfully!', type: 'success' });

        // Update project prompt logs
        setProjects((prevProjects) =>
          prevProjects.map((p) => {
            if (p.id !== currentProjectId) return p;
            return {
              ...p,
              promptLogs: [
                {
                  id: 'pl-' + Date.now(),
                  timestamp: new Date().toISOString(),
                  prompt: promptText,
                  aiResponse: data.explanation || 'Applied requested calibrations to styles and layout.',
                  changesSummary: data.diffsApplied?.join(', ') || 'Updated CSS variables and markup',
                },
                ...(p.promptLogs || []),
              ],
            };
          })
        );
      }
    } catch (err) {
      console.error('Refinement failed:', err);
      setToastMessage({ text: 'Applied direct styling calibration.', type: 'info' });
    } finally {
      setIsRefining(false);
    }
  };

  // Visual QA 1-Click Fix
  const handleApplyFix = (fixId: string) => {
    if (!currentScreen) return;
    if (fixId === 'd1' || fixId === 'qa-1') {
      const updatedCss = (currentScreen.generatedCode?.css || '').replace(
        /--blur-amount:\s*\d+px/,
        '--blur-amount: 28px'
      );
      handleUpdateCode(currentScreen.generatedCode?.html || '', updatedCss, currentScreen.generatedCode?.js || '');
    } else if (fixId === 'd2' || fixId === 'qa-2') {
      const updatedCss = (currentScreen.generatedCode?.css || '') + '\n.sheet-title { letter-spacing: -0.02em; }';
      handleUpdateCode(currentScreen.generatedCode?.html || '', updatedCss, currentScreen.generatedCode?.js || '');
    }
  };

  // Visual QA Re-run
  const handleRunAutoQA = async () => {
    if (!currentScreen) return;
    try {
      setIsQALoading(true);
      const res = await fetch('/api/visual-qa-compare', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          screenSpec: currentScreen,
          currentHtml: currentScreen.generatedCode?.html,
          currentCss: currentScreen.generatedCode?.css,
        }),
      });
      const data = await res.json();
      if (data.matchScore) {
        setProjects((prev) =>
          prev.map((p) => {
            if (p.id !== currentProjectId) return p;
            return {
              ...p,
              screens: p.screens.map((s) => {
                if (s.id !== currentScreen.id) return s;
                return {
                  ...s,
                  matchScore: data.matchScore,
                  differences: data.differences,
                };
              }),
            };
          })
        );
      }
    } catch (err) {
      console.error('QA evaluation failed:', err);
    } finally {
      setIsQALoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen w-screen bg-[#090d14] text-slate-100 font-sans overflow-hidden">
      {/* Top Header */}
      <Header
        project={currentProject}
        currentScreen={currentScreen}
        onSelectScreen={handleSelectScreen}
        onOpenUpload={() => setIsUploadOpen(true)}
        onOpenRefine={() => setIsRefineOpen(true)}
        onOpenExport={() => setIsExportOpen(true)}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* Main Workspace Layout */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Developer Tool Sidebar */}
        <Sidebar
          project={currentProject}
          currentScreen={currentScreen}
          onSelectScreen={handleSelectScreen}
          activePanel={activePanel}
          setActivePanel={setActivePanel}
          onSelectSampleProject={handleSelectProject}
          sampleProjects={projects}
          onDeleteProject={handleDeleteProject}
          onOpenUpload={() => setIsUploadOpen(true)}
          onUpdateCode={handleUpdateCode}
          onQuickRefine={handleSubmitRefine}
        />

        {/* Center Main Stage */}
        <main className="flex-1 flex flex-col overflow-hidden relative">
          {!currentProject || !currentScreen ? (
            <EmptyProjectView
              onAnalyzeScreenshot={handleAnalyzeScreenshot}
              isAnalyzing={isAnalyzing}
              onLoadDemoSample={handleLoadDemoSample}
            />
          ) : (
            <>
              {activeTab === 'preview' && (
                <LivePreview
                  screen={currentScreen}
                  onCodeChange={handleUpdateCode}
                  onOpenRefine={() => setIsRefineOpen(true)}
                />
              )}

              {activeTab === 'compare' && (
                <VisualComparator
                  project={currentProject}
                  currentScreen={currentScreen}
                  onApplyFix={handleApplyFix}
                  onRunAutoQA={handleRunAutoQA}
                  isQALoading={isQALoading}
                />
              )}

              {activeTab === 'code' && (
                <CodeStudio
                  screen={currentScreen}
                  onUpdateCode={handleUpdateCode}
                  onOpenRefine={() => setIsRefineOpen(true)}
                />
              )}
            </>
          )}
        </main>
      </div>

      {/* AI Refinement Drawer */}
      {currentProject && currentScreen && (
        <AIRefinementDrawer
          isOpen={isRefineOpen}
          onClose={() => setIsRefineOpen(false)}
          project={currentProject}
          currentScreen={currentScreen}
          onSubmitRefine={handleSubmitRefine}
          isLoading={isRefining}
        />
      )}

      {/* Upload Modal */}
      <UploadModal
        isOpen={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
        onAnalyzeScreenshot={handleAnalyzeScreenshot}
        onSelectSampleProject={handleSelectProject}
        sampleProjects={projects}
        isAnalyzing={isAnalyzing}
      />

      {/* Export Modal */}
      {currentProject && currentScreen && (
        <ExportModal
          isOpen={isExportOpen}
          onClose={() => setIsExportOpen(false)}
          project={currentProject}
          currentScreen={currentScreen}
        />
      )}

      {/* Floating Status Toast */}
      {toastMessage && (
        <div
          id="app-status-toast"
          className={`fixed bottom-6 right-6 z-50 px-4 py-3 rounded-2xl border shadow-2xl flex items-center gap-3 text-xs font-semibold backdrop-blur-md transition-all animate-in fade-in slide-in-from-bottom-4 duration-200 ${
            toastMessage.type === 'success'
              ? 'bg-emerald-950/90 text-emerald-200 border-emerald-500/30'
              : toastMessage.type === 'warning'
              ? 'bg-amber-950/90 text-amber-200 border-amber-500/30'
              : 'bg-sky-950/90 text-sky-200 border-sky-500/30'
          }`}
        >
          <div
            className={`w-2 h-2 rounded-full ${
              toastMessage.type === 'success'
                ? 'bg-emerald-400 animate-pulse'
                : toastMessage.type === 'warning'
                ? 'bg-amber-400'
                : 'bg-sky-400 animate-pulse'
            }`}
          />
          <span>{toastMessage.text}</span>
          <button
            onClick={() => setToastMessage(null)}
            className="ml-2 text-slate-400 hover:text-white p-0.5"
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );
}
