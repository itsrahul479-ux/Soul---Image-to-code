import React, { useState, useRef, useEffect, useCallback } from 'react';
import { 
  Smartphone, 
  Tablet, 
  Monitor, 
  RotateCw, 
  ZoomIn, 
  ZoomOut, 
  Maximize2, 
  ExternalLink,
  Sparkles,
  Layers,
  ChevronDown,
  Compass,
  ArrowDown,
  Check
} from 'lucide-react';
import { ScreenSpec } from '../types';

interface LivePreviewProps {
  screen: ScreenSpec;
  onCodeChange?: (html: string, css: string, js: string) => void;
  onOpenRefine: () => void;
}

type DevicePresetId = 
  | 'iphone15pro' 
  | 'iphone15promax' 
  | 'pixel8' 
  | 'iphonese' 
  | 'tablet' 
  | 'desktop_1280' 
  | 'desktop_1440' 
  | 'responsive';

interface DevicePreset {
  id: DevicePresetId;
  name: string;
  category: 'mobile' | 'tablet' | 'desktop';
  width: number | string;
  height: number | string;
  radius: number;
  hasNotch?: boolean;
}

const DEVICE_PRESETS: DevicePreset[] = [
  { id: 'iphone15pro', name: 'iPhone 15 Pro', category: 'mobile', width: 390, height: 844, radius: 46, hasNotch: true },
  { id: 'iphone15promax', name: 'iPhone 15 Pro Max', category: 'mobile', width: 430, height: 932, radius: 48, hasNotch: true },
  { id: 'pixel8', name: 'Pixel 8', category: 'mobile', width: 412, height: 915, radius: 36, hasNotch: false },
  { id: 'iphonese', name: 'iPhone SE (Compact)', category: 'mobile', width: 375, height: 667, radius: 32, hasNotch: false },
  { id: 'tablet', name: 'iPad Air (Tablet)', category: 'tablet', width: 768, height: 1024, radius: 28, hasNotch: false },
  { id: 'desktop_1280', name: 'MacBook 13" (1280px)', category: 'desktop', width: 1280, height: 800, radius: 16, hasNotch: false },
  { id: 'desktop_1440', name: 'Desktop (1440px)', category: 'desktop', width: 1440, height: 900, radius: 16, hasNotch: false },
  { id: 'responsive', name: 'Full Responsive', category: 'desktop', width: '100%', height: '100%', radius: 16, hasNotch: false }
];

export const LivePreview: React.FC<LivePreviewProps> = ({
  screen,
  onCodeChange,
  onOpenRefine
}) => {
  const isScreenMobile = screen.type === 'mobile' || (screen.frame && screen.frame.width < 600);
  const isScreenTablet = screen.type === 'tablet' || (screen.frame && screen.frame.width >= 600 && screen.frame.width < 1000);
  const isScreenDesktop = screen.type === 'desktop' || (screen.frame && screen.frame.width >= 1000);

  const [selectedPresetId, setSelectedPresetId] = useState<DevicePresetId>(() => {
    if (isScreenMobile) return 'iphone15pro';
    if (isScreenTablet) return 'tablet';
    if (isScreenDesktop) return 'desktop_1280';
    return 'iphone15pro';
  });

  const [zoomMode, setZoomMode] = useState<'fit' | 'custom'>('fit');
  const [zoomPercent, setZoomPercent] = useState<number>(100);
  const [calculatedFitScale, setCalculatedFitScale] = useState<number>(1);
  const [key, setKey] = useState<number>(0);
  const [showPresetDropdown, setShowPresetDropdown] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Automatically update default preset when selected screen changes
  useEffect(() => {
    if (screen.type === 'tablet') {
      setSelectedPresetId('tablet');
    } else if (screen.type === 'desktop') {
      setSelectedPresetId('desktop_1280');
    } else {
      setSelectedPresetId('iphone15pro');
    }
    setZoomMode('fit');
  }, [screen.id, screen.type]);

  const currentPreset = DEVICE_PRESETS.find((p) => p.id === selectedPresetId) || DEVICE_PRESETS[0];

  // Dynamic Auto-Fit Calculation based on stage container dimensions
  const updateFitScale = useCallback(() => {
    if (!containerRef.current) return;
    const { clientWidth, clientHeight } = containerRef.current;
    
    // Total physical device dimensions including bezel padding
    const isMobile = currentPreset.category === 'mobile';
    const isTablet = currentPreset.category === 'tablet';
    const isDesktop = currentPreset.category === 'desktop';

    const bezelW = isMobile ? 24 : isTablet ? 28 : 0;
    const bezelH = isMobile ? 24 : isTablet ? 28 : (isDesktop ? 40 : 0);

    const baseW = typeof currentPreset.width === 'number' ? currentPreset.width : clientWidth - 64;
    const baseH = typeof currentPreset.height === 'number' ? currentPreset.height : clientHeight - 64;

    const totalW = baseW + bezelW;
    const totalH = baseH + bezelH;

    // Available padded space in canvas stage
    const availW = Math.max(260, clientWidth - 48);
    const availH = Math.max(260, clientHeight - 48);

    const scaleW = availW / totalW;
    const scaleH = availH / totalH;
    const fit = Math.min(scaleW, scaleH);

    setCalculatedFitScale(Math.max(0.25, fit));
  }, [currentPreset]);

  useEffect(() => {
    updateFitScale();
    const handleResize = () => updateFitScale();
    window.addEventListener('resize', handleResize);

    const observer = new ResizeObserver(() => updateFitScale());
    if (containerRef.current) observer.observe(containerRef.current);

    return () => {
      window.removeEventListener('resize', handleResize);
      observer.disconnect();
    };
  }, [updateFitScale]);

  const effectiveScale = zoomMode === 'fit' ? calculatedFitScale : zoomPercent / 100;

  // Physical outer bounds of current device frame
  const isMobileView = currentPreset.category === 'mobile';
  const isTabletView = currentPreset.category === 'tablet';
  const isDesktopView = currentPreset.category === 'desktop';

  const screenWidth = typeof currentPreset.width === 'number' ? currentPreset.width : 1000;
  const screenHeight = typeof currentPreset.height === 'number' ? currentPreset.height : 700;

  const bezelWidth = isMobileView ? 24 : isTabletView ? 28 : 0;
  const bezelHeight = isMobileView ? 24 : isTabletView ? 28 : (isDesktopView ? 40 : 0);

  const deviceTotalWidth = typeof currentPreset.width === 'number' ? screenWidth + bezelWidth : '100%';
  const deviceTotalHeight = typeof currentPreset.height === 'number' ? screenHeight + bezelHeight : '100%';

  // Combine HTML + CSS + JS into complete standalone HTML doc for sandboxed iframe
  const bundleSrcDoc = () => {
    let html = screen.generatedCode?.html || '';
    const css = screen.generatedCode?.css || '';
    const js = screen.generatedCode?.js || '';

    // Remove any relative stylesheet / script links that fail in iframe srcdoc
    html = html
      .replace(/<link[^>]*href=["'][^"']*styles\.css["'][^>]*>/gi, '')
      .replace(/<script[^>]*src=["'][^"']*script\.js["'][^>]*><\/script>/gi, '');

    const styleBlock = `
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Outfit:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
    <style>
      /* Seamless Iframe Edge-to-Edge Container Reset */
      html, body {
        margin: 0 !important;
        padding: 0 !important;
        width: 100% !important;
        height: 100% !important;
        min-height: 100% !important;
        background: transparent !important;
        overflow-x: hidden !important;
        overflow-y: auto !important;
        -webkit-overflow-scrolling: touch !important;
        scrollbar-width: none !important;
      }
      body::-webkit-scrollbar {
        display: none !important;
      }
      /* Remove forced centering and black borders so UI fills the frame seamlessly */
      .reel-canvas, .screen-canvas, #app, .app-root, .root-frame {
        width: 100% !important;
        max-width: 100% !important;
        height: 100% !important;
        min-height: 100% !important;
        border-radius: 0 !important;
        border: none !important;
        box-shadow: none !important;
        margin: 0 !important;
      }
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

    // If html already has <head> and <body>, inject CSS and JS
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
  <title>${screen.title || 'Live Preview'}</title>
  ${styleBlock}
</head>
<body>
  ${html}
  ${scriptBlock}
</body>
</html>`;
  };

  const handleRefresh = () => {
    setKey((prev) => prev + 1);
  };

  const handleOpenInNewWindow = () => {
    const newWindow = window.open();
    if (newWindow) {
      newWindow.document.write(bundleSrcDoc());
      newWindow.document.close();
    }
  };

  // Preset switching helper
  const handleSelectPreset = (presetId: DevicePresetId) => {
    setSelectedPresetId(presetId);
    setShowPresetDropdown(false);
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-[#080c14] overflow-hidden select-none">
      {/* Top Toolbar */}
      <div className="h-13 bg-[#0d1420] border-b border-[#1b2636] px-4 flex items-center justify-between z-20 shrink-0 gap-3 shadow-md">
        
        {/* Left: UI Type Detection Badge & Quick Device Buttons */}
        <div className="flex items-center gap-2">
          {/* Detected Interface Type Badge */}
          <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#141d2b] border border-[#223146] text-xs font-semibold text-slate-300">
            {isScreenMobile ? (
              <>
                <Smartphone className="w-3.5 h-3.5 text-sky-400" />
                <span className="text-sky-300">Mobile UI</span>
              </>
            ) : isScreenTablet ? (
              <>
                <Tablet className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-300">Tablet UI</span>
              </>
            ) : (
              <>
                <Monitor className="w-3.5 h-3.5 text-amber-400" />
                <span className="text-amber-300">Desktop Web UI</span>
              </>
            )}
          </div>

          {/* Primary Device Mode Toggles */}
          <div className="flex items-center gap-1 bg-[#131d2b] p-1 rounded-xl border border-[#202f44]">
            <button
              id="device-mobile-btn"
              onClick={() => handleSelectPreset('iphone15pro')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                isMobileView
                  ? 'bg-sky-500 text-white shadow-sm shadow-sky-500/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Mobile View (390 × 844)"
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Mobile</span>
            </button>

            <button
              id="device-tablet-btn"
              onClick={() => handleSelectPreset('tablet')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                isTabletView
                  ? 'bg-sky-500 text-white shadow-sm shadow-sky-500/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Tablet View (768 × 1024)"
            >
              <Tablet className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Tablet</span>
            </button>

            <button
              id="device-desktop-btn"
              onClick={() => handleSelectPreset(isScreenDesktop ? 'desktop_1280' : 'responsive')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                isDesktopView
                  ? 'bg-sky-500 text-white shadow-sm shadow-sky-500/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Desktop & Full Responsive"
            >
              <Monitor className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{isScreenDesktop ? 'Desktop' : 'Responsive'}</span>
            </button>
          </div>

          {/* Device Model Selector Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowPresetDropdown(!showPresetDropdown)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-[#131d2b] border border-[#202f44] text-xs font-medium text-slate-300 hover:text-white transition-all"
            >
              <span>{currentPreset.name}</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {showPresetDropdown && (
              <div className="absolute top-full left-0 mt-1.5 w-56 bg-[#131d2b] border border-[#25364e] rounded-xl shadow-2xl p-1.5 z-50 flex flex-col gap-0.5">
                <span className="text-[10px] uppercase tracking-wider text-slate-500 font-bold px-2 py-1">Mobile Devices</span>
                {DEVICE_PRESETS.filter(p => p.category === 'mobile').map(preset => (
                  <button
                    key={preset.id}
                    onClick={() => handleSelectPreset(preset.id)}
                    className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all text-left ${
                      selectedPresetId === preset.id
                        ? 'bg-sky-500/20 text-sky-400 border border-sky-500/30'
                        : 'text-slate-300 hover:bg-[#1a283b]'
                    }`}
                  >
                    <span>{preset.name}</span>
                    <span className="text-[11px] text-slate-500 font-mono">{typeof preset.width === 'number' ? `${preset.width}×${preset.height}` : 'Fluid'}</span>
                  </button>
                ))}

                <span className="text-[10px] uppercase tracking-wider text-slate-500 font-bold px-2 py-1 mt-1">Tablet & Desktop</span>
                {DEVICE_PRESETS.filter(p => p.category !== 'mobile').map(preset => (
                  <button
                    key={preset.id}
                    onClick={() => handleSelectPreset(preset.id)}
                    className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all text-left ${
                      selectedPresetId === preset.id
                        ? 'bg-sky-500/20 text-sky-400 border border-sky-500/30'
                        : 'text-slate-300 hover:bg-[#1a283b]'
                    }`}
                  >
                    <span>{preset.name}</span>
                    <span className="text-[11px] text-slate-500 font-mono">{typeof preset.width === 'number' ? `${preset.width}×${preset.height}` : 'Fluid'}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right: Auto-Fit & 100% Zoom Controls + Actions */}
        <div className="flex items-center gap-2">
          {/* Fit vs 100% Toggle Group */}
          <div className="flex items-center bg-[#131d2b] border border-[#202f44] rounded-xl p-0.5 gap-0.5 text-xs font-semibold">
            <button
              onClick={() => {
                setZoomMode('fit');
                updateFitScale();
              }}
              className={`px-2.5 py-1 rounded-lg transition-all ${
                zoomMode === 'fit'
                  ? 'bg-sky-500 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Automatically fit device to window height"
            >
              Fit
            </button>
            <button
              onClick={() => {
                setZoomMode('custom');
                setZoomPercent(100);
              }}
              className={`px-2.5 py-1 rounded-lg transition-all ${
                zoomMode === 'custom' && zoomPercent === 100
                  ? 'bg-sky-500 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Display at 100% native pixel scale"
            >
              100%
            </button>
          </div>

          {/* Stepper Zoom Controls */}
          <div className="hidden sm:flex items-center bg-[#131d2b] border border-[#202f44] rounded-xl px-1.5 py-1 gap-1 text-xs">
            <button
              onClick={() => {
                setZoomMode('custom');
                setZoomPercent((prev) => Math.max(40, prev - 15));
              }}
              className="text-slate-400 hover:text-slate-200 p-1"
              title="Zoom Out"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="text-slate-300 font-mono font-medium px-1 w-11 text-center">
              {Math.round(effectiveScale * 100)}%
            </span>
            <button
              onClick={() => {
                setZoomMode('custom');
                setZoomPercent((prev) => Math.min(150, prev + 15));
              }}
              className="text-slate-400 hover:text-slate-200 p-1"
              title="Zoom In"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Refresh iframe */}
          <button
            id="preview-refresh-btn"
            onClick={handleRefresh}
            className="p-2 text-slate-400 hover:text-slate-200 bg-[#131d2b] border border-[#202f44] rounded-xl transition-all hover:bg-[#1a283b]"
            title="Reload Preview"
          >
            <RotateCw className="w-3.5 h-3.5" />
          </button>

          {/* Popout */}
          <button
            onClick={handleOpenInNewWindow}
            className="p-2 text-slate-400 hover:text-slate-200 bg-[#131d2b] border border-[#202f44] rounded-xl transition-all hover:bg-[#1a283b]"
            title="Open in new window"
          >
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Canvas Stage */}
      <div
        ref={containerRef}
        onClick={() => setShowPresetDropdown(false)}
        className="flex-1 overflow-auto p-4 md:p-8 flex items-center justify-center relative bg-[#06090e] bg-[radial-gradient(#1a2638_1px,transparent_1px)] [background-size:24px_24px]"
      >
        {/* Floating Screen Info Badge */}
        <div className="absolute top-4 left-6 z-10 flex items-center gap-2 bg-[#0e1622]/90 backdrop-blur-md border border-[#1f2d40] px-3.5 py-1.5 rounded-full text-xs text-slate-300 shadow-xl pointer-events-none">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span className="font-semibold text-slate-200">{screen.title}</span>
          <span className="text-slate-600">•</span>
          <span className="text-slate-400 font-mono text-[11px]">
            {typeof currentPreset.width === 'number' ? `${currentPreset.width} × ${currentPreset.height} px` : 'Fluid Width'}
          </span>
          <span className="text-slate-600">•</span>
          <span className="text-sky-400 font-mono text-[11px]">
            {Math.round(effectiveScale * 100)}% Scale
          </span>
        </div>

        {/* Floating Slide/Scroll Indicator */}
        {isMobileView && (
          <div className="absolute bottom-5 left-6 z-10 hidden sm:flex items-center gap-2 bg-[#0e1622]/85 backdrop-blur-md border border-[#1f2d40] px-3 py-1.5 rounded-full text-[11px] text-slate-400 shadow-lg pointer-events-none">
            <ArrowDown className="w-3.5 h-3.5 text-sky-400 animate-bounce" />
            <span>Scroll or drag down to slide feeds</span>
          </div>
        )}

        {/* Floating Refine Pill */}
        <button
          onClick={onOpenRefine}
          className="absolute bottom-5 right-6 z-10 flex items-center gap-2 bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-500 hover:to-indigo-500 text-white text-xs font-bold px-4 py-2.5 rounded-full shadow-xl shadow-sky-500/25 transition-all hover:scale-105 active:scale-95"
        >
          <Sparkles className="w-4 h-4 text-sky-200" />
          <span>Refine Screen with AI</span>
        </button>

        {/* Scaled Layout Placeholder Box: occupies the exact visual scaled width & height in the parent flexbox */}
        <div
          style={{
            width: typeof deviceTotalWidth === 'number' ? `${deviceTotalWidth * effectiveScale}px` : '100%',
            height: typeof deviceTotalHeight === 'number' ? `${deviceTotalHeight * effectiveScale}px` : '100%',
          }}
          className="relative flex items-center justify-center shrink-0 transition-all duration-200"
        >
          {/* Hardware Device Chassis Frame */}
          <div
            style={{
              width: typeof deviceTotalWidth === 'number' ? `${deviceTotalWidth}px` : '100%',
              height: typeof deviceTotalHeight === 'number' ? `${deviceTotalHeight}px` : '100%',
              transform: `scale(${effectiveScale})`,
              transformOrigin: 'center center',
            }}
            className="relative shrink-0 flex flex-col items-center justify-center select-none transition-transform duration-200"
          >
            {/* ==================== MOBILE SMARTPHONE FRAME ==================== */}
            {isMobileView && (
              <div className="w-full h-full relative p-[12px] bg-[#111827] rounded-[52px] shadow-[0_30px_90px_rgba(0,0,0,0.9),0_0_0_1px_rgba(255,255,255,0.16),inset_0_1px_2px_rgba(255,255,255,0.25)] border border-[#223145] flex flex-col">
                {/* Physical Hardware Buttons on outer rim */}
                {/* Action button */}
                <div className="w-1 h-8 bg-[#2d3d52] rounded-l-md absolute -left-[4px] top-24 border-r border-[#1a2533]"></div>
                {/* Volume Up */}
                <div className="w-1 h-12 bg-[#2d3d52] rounded-l-md absolute -left-[4px] top-36 border-r border-[#1a2533]"></div>
                {/* Volume Down */}
                <div className="w-1 h-12 bg-[#2d3d52] rounded-l-md absolute -left-[4px] top-52 border-r border-[#1a2533]"></div>
                {/* Power / Side Button */}
                <div className="w-1 h-16 bg-[#2d3d52] rounded-r-md absolute -right-[4px] top-40 border-l border-[#1a2533]"></div>

                {/* Inner Bezel Screen Display */}
                <div className="w-full h-full rounded-[40px] overflow-hidden relative bg-black shadow-inner">
                  {/* Bottom Home Indicator Bar */}
                  <div className="w-32 h-1 bg-white/40 rounded-full absolute bottom-2 left-1/2 -translate-x-1/2 z-40 pointer-events-none shadow-sm"></div>

                  {/* Sandboxed Iframe */}
                  <iframe
                    key={key}
                    ref={iframeRef}
                    srcDoc={bundleSrcDoc()}
                    title={screen.title}
                    className="w-full h-full border-0 bg-black block"
                    sandbox="allow-scripts allow-modals allow-same-origin"
                  />
                </div>
              </div>
            )}

            {/* ==================== TABLET FRAME ==================== */}
            {isTabletView && (
              <div className="w-full h-full relative p-[14px] bg-[#111827] rounded-[38px] shadow-[0_30px_90px_rgba(0,0,0,0.9),0_0_0_1px_rgba(255,255,255,0.15)] border border-[#223145] flex flex-col">
                {/* Inner Screen Display */}
                <div className="w-full h-full rounded-[24px] overflow-hidden relative bg-black shadow-inner">
                  {/* Sandboxed Iframe */}
                  <iframe
                    key={key}
                    ref={iframeRef}
                    srcDoc={bundleSrcDoc()}
                    title={screen.title}
                    className="w-full h-full border-0 bg-black block"
                    sandbox="allow-scripts allow-modals allow-same-origin"
                  />
                </div>
              </div>
            )}

            {/* ==================== DESKTOP / RESPONSIVE FRAME ==================== */}
            {isDesktopView && (
              <div className="w-full h-full relative flex flex-col rounded-2xl overflow-hidden shadow-[0_30px_90px_rgba(0,0,0,0.9)] border border-[#25364e]">
                {/* Desktop Window Titlebar */}
                <div className="h-10 bg-[#16202e] border-b border-[#25364d] px-4 flex items-center justify-between shrink-0 select-none">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-[#ff5f56] border border-[#e0443e]"></div>
                    <div className="w-3 h-3 rounded-full bg-[#ffbd2e] border border-[#dea123]"></div>
                    <div className="w-3 h-3 rounded-full bg-[#27c93f] border border-[#1aab29]"></div>
                  </div>
                  <div className="bg-[#0f1622] border border-[#243346] px-8 py-1 rounded-lg text-[11px] font-mono text-slate-400 flex items-center gap-2">
                    <span className="text-emerald-400">🔒</span>
                    <span>https://preview.local/app</span>
                  </div>
                  <div className="w-12"></div>
                </div>

                {/* Inner Screen Display */}
                <div className="w-full flex-1 overflow-hidden relative bg-black">
                  <iframe
                    key={key}
                    ref={iframeRef}
                    srcDoc={bundleSrcDoc()}
                    title={screen.title}
                    className="w-full h-full border-0 bg-black block"
                    sandbox="allow-scripts allow-modals allow-same-origin"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

