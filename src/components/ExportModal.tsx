import React, { useState } from 'react';
import { 
  Download, 
  X, 
  Copy, 
  Check, 
  FileCode2, 
  FolderArchive, 
  Sparkles,
  Layers,
  Code
} from 'lucide-react';
import JSZip from 'jszip';
import { ProjectSpec, ScreenSpec } from '../types';
import { findClosestIcon } from '../data/vectorIcons';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  project?: ProjectSpec | null;
  currentScreen?: ScreenSpec | null;
}

export const ExportModal: React.FC<ExportModalProps> = ({
  isOpen,
  onClose,
  project,
  currentScreen,
}) => {
  const [copiedType, setCopiedType] = useState<string | null>(null);
  const [isZipping, setIsZipping] = useState<boolean>(false);

  if (!isOpen || !project || !currentScreen) return null;

  const html = currentScreen.generatedCode?.html || '';
  const css = currentScreen.generatedCode?.css || '';
  const js = currentScreen.generatedCode?.js || '';

  const handleCopy = (content: string, type: string) => {
    navigator.clipboard.writeText(content);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2000);
  };

  // Download Standalone HTML file with inlined styles and scripts
  const handleDownloadStandaloneHtml = () => {
    let doc = html;
    if (doc.includes('</head>')) {
      doc = doc.replace('</head>', `<style>${css}</style></head>`);
    } else {
      doc = `<style>${css}</style>` + doc;
    }

    if (doc.includes('</body>')) {
      doc = doc.replace('</body>', `<script>${js}</script></body>`);
    } else {
      doc += `<script>${js}</script>`;
    }

    const blob = new Blob([doc], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${project.name.toLowerCase().replace(/\s+/g, '-')}-standalone.html`;
    link.click();
    URL.revokeObjectURL(url);
  };

  // Download Complete ZIP package via JSZip
  const handleDownloadZip = async () => {
    try {
      setIsZipping(true);
      const zip = new JSZip();

      // README
      zip.file(
        'README.md',
        `# ${project.name}
Reconstructed with Soul — Screenshot-to-HTML AI Builder.

## Contents:
- \`index.html\`: Semantic HTML5 markup
- \`styles.css\`: Frosted glass styles, responsive rules & CSS variables
- \`script.js\`: Interactive UI controls
- \`icons/\`: Vector SVGs (exact & closest matches downloaded and included)
- \`screens/\`: Reconstructed multi-screens in separate folders

## Running:
Double-click \`index.html\` to open in any web browser.
`
      );

      // Root primary screen
      zip.file('index.html', html);
      zip.file('styles.css', css);
      zip.file('script.js', js);

      // Icons directory with all downloaded vector SVGs
      const iconsFolder = zip.folder('icons');
      const iconsList = currentScreen.icons || [];
      iconsList.forEach((ic) => {
        const match = findClosestIcon(ic.iconKey || ic.name);
        const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="${match.icon.viewBox}" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">\n  <!-- ${match.icon.name} (${match.matchType}) -->\n  ${match.icon.svgPath}\n</svg>`;
        iconsFolder?.file(`${match.icon.key}.svg`, svgContent);
      });

      // Screens directory
      const screensFolder = zip.folder('screens');
      project.screens.forEach((sc, idx) => {
        const folder = screensFolder?.folder(`screen-${idx + 1}-${sc.id}`);
        folder?.file('index.html', sc.generatedCode?.html || '');
        folder?.file('styles.css', sc.generatedCode?.css || '');
        folder?.file('script.js', sc.generatedCode?.js || '');
        
        // Add screen-specific icons
        const screenIconsFolder = folder?.folder('icons');
        (sc.icons || []).forEach((ic) => {
          const match = findClosestIcon(ic.iconKey || ic.name);
          const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="${match.icon.viewBox}" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">\n  <!-- ${match.icon.name} (${match.matchType}) -->\n  ${match.icon.svgPath}\n</svg>`;
          screenIconsFolder?.file(`${match.icon.key}.svg`, svgContent);
        });
      });

      const blob = await zip.generateAsync({ type: 'blob' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${project.name.toLowerCase().replace(/\s+/g, '-')}-project.zip`;
      link.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Error generating ZIP:', err);
    } finally {
      setIsZipping(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 select-none">
      <div className="bg-[#0e141e] border border-[#202e40] rounded-3xl w-full max-w-xl shadow-2xl overflow-hidden flex flex-col">
        {/* Modal Header */}
        <div className="h-16 bg-[#121926] border-b border-[#1f2c3e] px-6 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center">
              <Download className="w-4 h-4 text-sky-400" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-100">Export Production Code</h3>
              <p className="text-xs text-slate-400">Download clean, standalone HTML, CSS & JS</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-200 hover:bg-[#1e2a3c] rounded-xl transition-all"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6">
          {/* Main Download Options */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Full ZIP */}
            <button
              id="export-zip-btn"
              onClick={handleDownloadZip}
              disabled={isZipping}
              className="p-5 bg-gradient-to-br from-[#162234] to-[#111926] border border-sky-500/40 hover:border-sky-400 rounded-2xl text-left flex flex-col justify-between shadow-xl shadow-sky-500/10 transition-all hover:scale-[1.02] active:scale-98 group"
            >
              <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400 mb-3 group-hover:bg-sky-500 group-hover:text-slate-950 transition-colors">
                <FolderArchive className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-100 mb-1">Download ZIP Package</h4>
                <p className="text-xs text-slate-400">
                  Includes index.html, styles.css, script.js and all multi-screens.
                </p>
              </div>
            </button>

            {/* Standalone Single File */}
            <button
              id="export-standalone-btn"
              onClick={handleDownloadStandaloneHtml}
              className="p-5 bg-[#131b27] hover:bg-[#182333] border border-[#223144] hover:border-slate-500 rounded-2xl text-left flex flex-col justify-between transition-all hover:scale-[1.02] active:scale-98 group"
            >
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-3 group-hover:bg-emerald-500 group-hover:text-slate-950 transition-colors">
                <FileCode2 className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-100 mb-1">Single Standalone HTML</h4>
                <p className="text-xs text-slate-400">
                  Zero dependencies. Inlines styles and scripts for instant running.
                </p>
              </div>
            </button>
          </div>

          {/* Quick Copy Snippets */}
          <div>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-3">
              Quick Copy to Clipboard
            </span>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => handleCopy(html, 'html')}
                className="py-2.5 px-3 bg-[#131b26] hover:bg-[#1c2738] border border-[#202e40] rounded-xl text-xs font-semibold text-slate-200 flex items-center justify-center gap-1.5 transition-all"
              >
                {copiedType === 'html' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>HTML Code</span>
              </button>

              <button
                onClick={() => handleCopy(css, 'css')}
                className="py-2.5 px-3 bg-[#131b26] hover:bg-[#1c2738] border border-[#202e40] rounded-xl text-xs font-semibold text-slate-200 flex items-center justify-center gap-1.5 transition-all"
              >
                {copiedType === 'css' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>CSS Styles</span>
              </button>

              <button
                onClick={() => handleCopy(js, 'js')}
                className="py-2.5 px-3 bg-[#131b26] hover:bg-[#1c2738] border border-[#202e40] rounded-xl text-xs font-semibold text-slate-200 flex items-center justify-center gap-1.5 transition-all"
              >
                {copiedType === 'js' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>JS Logic</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
