import React, { useState } from 'react';
import { 
  FileCode2, 
  Copy, 
  Check, 
  Download, 
  RotateCcw, 
  Sparkles, 
  Eye, 
  Columns,
  Maximize2,
  Code2
} from 'lucide-react';
import { ScreenSpec } from '../types';

interface CodeStudioProps {
  screen: ScreenSpec;
  onUpdateCode: (html: string, css: string, js: string) => void;
  onOpenRefine: () => void;
}

export const CodeStudio: React.FC<CodeStudioProps> = ({
  screen,
  onUpdateCode,
  onOpenRefine,
}) => {
  const [activeFile, setActiveFile] = useState<'html' | 'css' | 'js' | 'react'>('html');
  const [showSplitPreview, setShowSplitPreview] = useState<boolean>(true);
  const [copied, setCopied] = useState<boolean>(false);

  const html = screen.generatedCode?.html || '';
  const css = screen.generatedCode?.css || '';
  const js = screen.generatedCode?.js || '';

  const handleTextChange = (val: string) => {
    if (activeFile === 'html') onUpdateCode(val, css, js);
    if (activeFile === 'css') onUpdateCode(html, val, js);
    if (activeFile === 'js') onUpdateCode(html, css, val);
  };

  const getActiveCode = () => {
    if (activeFile === 'html') return html;
    if (activeFile === 'css') return css;
    if (activeFile === 'js') return js;
    if (activeFile === 'react') {
      return `import React, { useState } from 'react';
import './styles.css';

export default function ReconstructedScreen() {
  const [activeTab, setActiveTab] = useState('home');

  return (
    <div className="device-frame">
      <div className="status-bar">
        <span>9:41</span>
        <span>100%</span>
      </div>
      {/* Converted Component Tree */}
      <div className="content-container">
        <h1 className="sheet-title">${screen.title}</h1>
        <div className="glass-sheet">
          <p>Glassmorphic surface with dynamic React state.</p>
        </div>
      </div>
    </div>
  );
}`;
    }
    return '';
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(getActiveCode());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadFile = () => {
    const filename =
      activeFile === 'html'
        ? 'index.html'
        : activeFile === 'css'
        ? 'styles.css'
        : activeFile === 'js'
        ? 'script.js'
        : 'Component.tsx';
    const blob = new Blob([getActiveCode()], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
  };

  // Bundle iframe srcDoc
  const bundleDoc = () => {
    let rawHtml = html
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

    if (rawHtml.includes('</head>')) {
      let doc = rawHtml.replace('</head>', `${styleBlock}</head>`);
      if (doc.includes('</body>')) {
        doc = doc.replace('</body>', `${scriptBlock}</body>`);
      } else {
        doc += scriptBlock;
      }
      return doc;
    }

    if (rawHtml.includes('<html')) {
      return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  ${styleBlock}
</head>
<body>
  ${rawHtml}
  ${scriptBlock}
</body>
</html>`;
    }

    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${screen.title || 'Code Preview'}</title>
  ${styleBlock}
</head>
<body>
  ${rawHtml}
  ${scriptBlock}
</body>
</html>`;
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-[#080c12] overflow-hidden select-none">
      {/* Top Code Studio Tabs */}
      <div className="h-12 bg-[#101722] border-b border-[#1f2d3e] px-4 flex items-center justify-between z-10 shrink-0">
        <div className="flex items-center gap-1">
          <button
            id="tab-html"
            onClick={() => setActiveFile('html')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all ${
              activeFile === 'html'
                ? 'bg-sky-500/20 text-sky-400 border border-sky-500/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <span className="text-orange-400 font-bold">&lt;&gt;</span>
            <span>index.html</span>
          </button>

          <button
            id="tab-css"
            onClick={() => setActiveFile('css')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all ${
              activeFile === 'css'
                ? 'bg-sky-500/20 text-sky-400 border border-sky-500/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <span className="text-sky-400 font-bold">#</span>
            <span>styles.css</span>
          </button>

          <button
            id="tab-js"
            onClick={() => setActiveFile('js')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all ${
              activeFile === 'js'
                ? 'bg-sky-500/20 text-sky-400 border border-sky-500/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <span className="text-amber-400 font-bold">JS</span>
            <span>script.js</span>
          </button>

          <button
            id="tab-react"
            onClick={() => setActiveFile('react')}
            className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all ${
              activeFile === 'react'
                ? 'bg-sky-500/20 text-sky-400 border border-sky-500/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <span className="text-cyan-400 font-bold">⚛</span>
            <span>React.tsx</span>
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowSplitPreview(!showSplitPreview)}
            className={`flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1.5 rounded-lg border transition-all ${
              showSplitPreview
                ? 'bg-[#182333] text-sky-400 border-sky-500/30'
                : 'text-slate-400 border-[#223144] hover:text-slate-200'
            }`}
          >
            <Columns className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Split Preview</span>
          </button>

          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 text-xs font-semibold text-slate-300 bg-[#16202e] hover:bg-[#202e42] border border-[#233346] px-3 py-1.5 rounded-lg transition-all"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied' : 'Copy'}</span>
          </button>

          <button
            onClick={handleDownloadFile}
            className="flex items-center gap-1.5 text-xs font-semibold text-slate-300 bg-[#16202e] hover:bg-[#202e42] border border-[#233346] px-3 py-1.5 rounded-lg transition-all"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Download</span>
          </button>
        </div>
      </div>

      {/* Editor & Split Live Preview Body */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        {/* Code Editor Column */}
        <div className="flex-1 flex flex-col bg-[#0b0f17] overflow-hidden">
          <div className="h-7 bg-[#0e131d] border-b border-[#1b2636] px-4 flex items-center justify-between text-[11px] text-slate-400 font-mono">
            <span>
              {activeFile === 'html'
                ? 'Semantic HTML5 Structure'
                : activeFile === 'css'
                ? 'CSS Variables & Frosted Glass Properties'
                : activeFile === 'js'
                ? 'DOM Events & Animation Controls'
                : 'React JSX Component Model'}
            </span>
            <span className="text-emerald-400 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> Live Sync
            </span>
          </div>

          <textarea
            id="code-editor-textarea"
            value={getActiveCode()}
            onChange={(e) => handleTextChange(e.target.value)}
            disabled={activeFile === 'react'}
            spellCheck="false"
            className="flex-1 w-full bg-[#090d14] text-slate-200 font-mono text-xs leading-relaxed p-4 resize-none focus:outline-none border-0 overflow-auto custom-scrollbar selection:bg-sky-500/30 selection:text-white"
          />
        </div>

        {/* Optional Mini Split Live Preview Column */}
        {showSplitPreview && (
          <div className="w-full md:w-[380px] lg:w-[440px] bg-[#070a0f] border-t md:border-t-0 md:border-l border-[#1b2636] flex flex-col items-center justify-center p-4 relative overflow-hidden shrink-0">
            <div className="absolute top-3 left-4 text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5 z-10">
              <Eye className="w-3 h-3 text-sky-400" />
              <span>Instant Output</span>
            </div>

            <div className="w-[320px] h-[640px] rounded-[36px] bg-slate-950 border border-slate-700/60 shadow-2xl overflow-hidden mt-4">
              <iframe
                srcDoc={bundleDoc()}
                title="Code Studio Live Preview"
                className="w-full h-full border-0"
                sandbox="allow-scripts allow-modals allow-same-origin"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
