import React, { useState, useRef } from 'react';
import { 
  User, 
  Settings, 
  Sparkles, 
  X, 
  Plus, 
  Trash2, 
  Check, 
  Globe, 
  ShieldCheck, 
  Layers, 
  Upload, 
  FileCode, 
  Search, 
  Tag, 
  Download, 
  FolderPlus, 
  ExternalLink,
  Info,
  CheckCircle2,
  RefreshCw,
  Sliders,
  Database,
  ArrowRight
} from 'lucide-react';
import { UserCustomAsset, UserProfileSettings } from '../types';

interface ProfileSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: UserProfileSettings;
  onUpdateSettings: (newSettings: UserProfileSettings) => void;
}

export const ProfileSettingsModal: React.FC<ProfileSettingsModalProps> = ({
  isOpen,
  onClose,
  settings,
  onUpdateSettings,
}) => {
  const [activeTab, setActiveTab] = useState<'assets' | 'settings' | 'test'>('assets');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filterCategory, setFilterCategory] = useState<string>('All');
  
  // New Asset Form State
  const [isAddingAsset, setIsAddingAsset] = useState<boolean>(false);
  const [assetName, setAssetName] = useState<string>('');
  const [assetCategory, setAssetCategory] = useState<string>('Icons');
  const [assetTags, setAssetTags] = useState<string>('');
  const [assetType, setAssetType] = useState<'icon' | 'image' | 'logo'>('icon');
  const [assetFormat, setAssetFormat] = useState<'svg' | 'png' | 'jpg'>('svg');
  const [svgContent, setSvgContent] = useState<string>('');
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [addError, setAddError] = useState<string | null>(null);

  // Match tester state
  const [testKeyword, setTestKeyword] = useState<string>('crown');
  const [testResult, setTestResult] = useState<{
    matched: boolean;
    source: 'user-vault' | 'web-download';
    assetName?: string;
    details: string;
  } | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const categories = ['All', 'Badges & Rewards', 'Health & Lifestyle', 'Actions & Utilities', 'Security & Auth', 'Social & Feed', 'Icons', 'Brand Logos'];

  const filteredAssets = settings.customAssets.filter((asset) => {
    const matchesCategory = filterCategory === 'All' || asset.category === filterCategory;
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch = !q || 
      asset.name.toLowerCase().includes(q) || 
      asset.tags.some(t => t.toLowerCase().includes(q)) ||
      (asset.category && asset.category.toLowerCase().includes(q));
    return matchesCategory && matchesSearch;
  });

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type === 'image/svg+xml' || file.name.endsWith('.svg')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const text = event.target?.result as string;
        setSvgContent(text);
        setAssetFormat('svg');
        setFilePreview(null);
        if (!assetName) {
          setAssetName(file.name.replace(/\.svg$/i, '').replace(/[-_]/g, ' '));
        }
      };
      reader.readAsText(file);
    } else if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const dataUrl = event.target?.result as string;
        setFilePreview(dataUrl);
        setSvgContent(dataUrl);
        setAssetFormat(file.type.includes('png') ? 'png' : 'jpg');
        if (!assetName) {
          setAssetName(file.name.replace(/\.[^.]+$/, '').replace(/[-_]/g, ' '));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveNewAsset = () => {
    if (!assetName.trim()) {
      setAddError('Please enter a descriptive name for your asset.');
      return;
    }

    const content = svgContent.trim();
    if (!content) {
      setAddError('Please upload an asset file or paste SVG markup code.');
      return;
    }

    const tagsArray = assetTags
      .split(',')
      .map(t => t.trim().toLowerCase())
      .filter(Boolean);

    // Auto-add asset name words to tags
    assetName.toLowerCase().split(/\s+/).forEach(w => {
      if (w.length > 2 && !tagsArray.includes(w)) {
        tagsArray.push(w);
      }
    });

    const newAsset: UserCustomAsset = {
      id: 'asset-' + Date.now(),
      name: assetName.trim(),
      type: assetType,
      format: assetFormat,
      category: assetCategory,
      tags: tagsArray,
      content: content,
      createdAt: new Date().toISOString(),
    };

    const updated = {
      ...settings,
      customAssets: [newAsset, ...settings.customAssets],
    };

    onUpdateSettings(updated);
    
    // Reset form
    setIsAddingAsset(false);
    setAssetName('');
    setAssetTags('');
    setSvgContent('');
    setFilePreview(null);
    setAddError(null);
  };

  const handleDeleteAsset = (id: string) => {
    const updated = {
      ...settings,
      customAssets: settings.customAssets.filter(a => a.id !== id),
    };
    onUpdateSettings(updated);
  };

  const handleRunMatchTest = () => {
    const q = testKeyword.toLowerCase().trim();
    if (!q) return;

    // Check user asset vault first
    const matchedAsset = settings.customAssets.find(a => {
      const nameMatch = a.name.toLowerCase().includes(q) || q.includes(a.name.toLowerCase());
      const tagMatch = a.tags.some(t => t.toLowerCase() === q || q.includes(t.toLowerCase()) || t.toLowerCase().includes(q));
      return nameMatch || tagMatch;
    });

    if (matchedAsset) {
      setTestResult({
        matched: true,
        source: 'user-vault',
        assetName: matchedAsset.name,
        details: `Found matching asset in your personal Asset Vault under tags [${matchedAsset.tags.join(', ')}]. Will inject your custom ${matchedAsset.format.toUpperCase()} directly into the reconstructed UI!`,
      });
    } else {
      setTestResult({
        matched: false,
        source: 'web-download',
        details: `Not found in your custom Asset Vault. Automatic internet fallback will download and generate a clean inline SVG icon (${q}) from the Web Icon Repository.`,
      });
    }
  };

  return (
    <div className="fixed inset-0 bg-black/85 backdrop-blur-md z-50 flex items-center justify-center p-4 select-none">
      <div className="bg-[#0e141e] border border-[#202e40] rounded-3xl w-full max-w-4xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh] animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header with Profile Info */}
        <div className="h-20 bg-[#121926] border-b border-[#1f2c3e] px-6 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3.5">
            <div className="relative">
              <img
                src={settings.avatarUrl}
                alt={settings.name}
                className="w-11 h-11 rounded-2xl object-cover border-2 border-sky-500/40 shadow-md shadow-sky-500/20"
              />
              <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-[#121926] rounded-full flex items-center justify-center text-[8px] text-white">
                ✓
              </span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-slate-100">{settings.name}</h3>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-md bg-sky-500/10 text-sky-400 border border-sky-500/20">
                  Asset Vault Active
                </span>
              </div>
              <p className="text-xs text-slate-400">{settings.email} &bull; {settings.customAssets.length} Custom Assets Loaded</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-100 hover:bg-[#1f2c3e] rounded-xl transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-[#0b1017] border-b border-[#1b2736] px-6 py-2 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('assets')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                activeTab === 'assets'
                  ? 'bg-sky-500/15 text-sky-400 border border-sky-500/30 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
              }`}
            >
              <Database className="w-3.5 h-3.5" />
              <span>My Custom Asset Vault ({settings.customAssets.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('settings')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                activeTab === 'settings'
                  ? 'bg-sky-500/15 text-sky-400 border border-sky-500/30 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
              }`}
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>Matching & Generation Rules</span>
            </button>

            <button
              onClick={() => {
                setActiveTab('test');
                handleRunMatchTest();
              }}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                activeTab === 'test'
                  ? 'bg-sky-500/15 text-sky-400 border border-sky-500/30 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Test Icon Resolver</span>
            </button>
          </div>

          {activeTab === 'assets' && !isAddingAsset && (
            <button
              onClick={() => setIsAddingAsset(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-sky-500 to-emerald-400 hover:from-sky-400 hover:to-emerald-300 text-slate-950 text-xs font-bold rounded-xl shadow-md shadow-sky-500/20 transition-all active:scale-95"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Custom Asset</span>
            </button>
          )}
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 custom-scrollbar flex-1 bg-[#0a0e16]">
          
          {/* TAB 1: ASSET VAULT */}
          {activeTab === 'assets' && (
            <>
              {/* Add New Asset Form Card */}
              {isAddingAsset && (
                <div className="bg-[#121926] border border-sky-500/40 rounded-2xl p-5 space-y-4 shadow-xl">
                  <div className="flex items-center justify-between border-b border-[#202e40] pb-3">
                    <div className="flex items-center gap-2">
                      <FolderPlus className="w-4 h-4 text-sky-400" />
                      <h4 className="text-sm font-bold text-slate-100">Add New Asset to Personal Vault</h4>
                    </div>
                    <button
                      onClick={() => setIsAddingAsset(false)}
                      className="text-xs text-slate-400 hover:text-slate-200"
                    >
                      Cancel
                    </button>
                  </div>

                  {addError && (
                    <div className="p-3 bg-rose-500/10 border border-rose-500/30 rounded-xl text-xs text-rose-300 flex items-center gap-2">
                      <Info className="w-4 h-4 text-rose-400 shrink-0" />
                      <span>{addError}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">
                          Asset Name & Description *
                        </label>
                        <input
                          type="text"
                          value={assetName}
                          onChange={(e) => setAssetName(e.target.value)}
                          placeholder="e.g. Sleep Moon, Premium Gold Crown, User Diaper"
                          className="w-full bg-[#0d131d] border border-[#202e40] focus:border-sky-500 rounded-xl px-3.5 py-2 text-xs text-slate-100 outline-none"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block text-xs font-semibold text-slate-300 mb-1">Category</label>
                          <select
                            value={assetCategory}
                            onChange={(e) => setAssetCategory(e.target.value)}
                            className="w-full bg-[#0d131d] border border-[#202e40] focus:border-sky-500 rounded-xl px-3 py-2 text-xs text-slate-100 outline-none"
                          >
                            <option value="Icons">Icons & Glyphs</option>
                            <option value="Badges & Rewards">Badges & Rewards</option>
                            <option value="Health & Lifestyle">Health & Lifestyle</option>
                            <option value="Actions & Utilities">Actions & Utilities</option>
                            <option value="Security & Auth">Security & Auth</option>
                            <option value="Social & Feed">Social & Feed</option>
                            <option value="Brand Logos">Brand Logos</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-slate-300 mb-1">Asset Type</label>
                          <select
                            value={assetType}
                            onChange={(e) => setAssetType(e.target.value as any)}
                            className="w-full bg-[#0d131d] border border-[#202e40] focus:border-sky-500 rounded-xl px-3 py-2 text-xs text-slate-100 outline-none"
                          >
                            <option value="icon">Icon (Vector SVG)</option>
                            <option value="image">Image / Graphic</option>
                            <option value="logo">Brand Logo</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">
                          Keywords & Match Tags (comma separated)
                        </label>
                        <input
                          type="text"
                          value={assetTags}
                          onChange={(e) => setAssetTags(e.target.value)}
                          placeholder="e.g. moon, sleep, night, bedtime, baby, diaper, crown, gold"
                          className="w-full bg-[#0d131d] border border-[#202e40] focus:border-sky-500 rounded-xl px-3.5 py-2 text-xs text-slate-100 outline-none"
                        />
                        <span className="text-[10px] text-slate-500 mt-1 block">
                          When you upload a UI screenshot, Gemini will match these tags with detected icons!
                        </span>
                      </div>
                    </div>

                    <div className="space-y-3 flex flex-col justify-between">
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">
                          Asset Source (Upload File or Paste SVG)
                        </label>
                        
                        <div className="flex items-center gap-2 mb-2">
                          <input
                            ref={fileInputRef}
                            type="file"
                            accept=".svg,image/svg+xml,image/png,image/jpeg,image/webp"
                            onChange={handleFileUpload}
                            className="hidden"
                          />
                          <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            className="flex-1 py-2 bg-[#1b2536] hover:bg-[#25344c] border border-[#2c3d55] rounded-xl text-xs font-semibold text-slate-200 flex items-center justify-center gap-1.5 transition-all"
                          >
                            <Upload className="w-3.5 h-3.5 text-sky-400" />
                            <span>Upload SVG / PNG File</span>
                          </button>
                        </div>

                        <div className="relative">
                          <textarea
                            value={svgContent}
                            onChange={(e) => {
                              setSvgContent(e.target.value);
                              setAssetFormat('svg');
                              setFilePreview(null);
                            }}
                            placeholder='<svg viewBox="0 0 24 24" ...> ... </svg> or Image Data'
                            rows={4}
                            className="w-full bg-[#0d131d] border border-[#202e40] focus:border-sky-500 rounded-xl p-2.5 text-[11px] font-mono text-slate-300 outline-none resize-none"
                          />
                        </div>
                      </div>

                      {/* Live Preview Box */}
                      <div className="bg-[#090d14] border border-[#1b2736] rounded-xl p-3 flex items-center gap-3">
                        <span className="text-xs text-slate-400 font-semibold">Preview:</span>
                        <div className="w-10 h-10 rounded-lg bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400 overflow-hidden">
                          {filePreview ? (
                            <img src={filePreview} alt="Preview" className="w-8 h-8 object-contain" />
                          ) : svgContent ? (
                            <div 
                              className="w-7 h-7 flex items-center justify-center [&>svg]:w-6 [&>svg]:h-6 [&>svg]:stroke-current text-sky-400"
                              dangerouslySetInnerHTML={{ __html: svgContent }}
                            />
                          ) : (
                            <FileCode className="w-5 h-5 text-slate-600" />
                          )}
                        </div>
                        <span className="text-[11px] text-slate-400 truncate">
                          {svgContent ? 'Asset rendered ready to save' : 'No asset content loaded yet'}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#202e40]">
                    <button
                      onClick={() => setIsAddingAsset(false)}
                      className="px-4 py-2 bg-[#17202e] hover:bg-[#202c3e] text-slate-300 text-xs font-semibold rounded-xl"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSaveNewAsset}
                      className="px-5 py-2 bg-gradient-to-r from-sky-500 to-emerald-400 hover:from-sky-400 hover:to-emerald-300 text-slate-950 text-xs font-bold rounded-xl shadow-lg shadow-sky-500/20 transition-all active:scale-95 flex items-center gap-1.5"
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span>Save to Asset Vault</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Asset Search & Filter Bar */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                <div className="relative flex-1">
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search personal assets by name, keyword, or tag..."
                    className="w-full bg-[#111722] border border-[#202e40] focus:border-sky-500 rounded-xl pl-9 pr-3.5 py-2 text-xs text-slate-100 outline-none"
                  />
                </div>

                <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0">
                  {categories.slice(0, 4).map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setFilterCategory(cat)}
                      className={`text-[11px] px-2.5 py-1.5 rounded-lg whitespace-nowrap transition-all font-medium ${
                        filterCategory === cat
                          ? 'bg-sky-500/20 text-sky-300 border border-sky-500/40'
                          : 'bg-[#121924] text-slate-400 hover:text-slate-200 border border-[#1e2a3c]'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Asset Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5">
                {filteredAssets.map((asset) => (
                  <div
                    key={asset.id}
                    className="bg-[#121926] border border-[#1f2d40] hover:border-sky-500/50 rounded-2xl p-3.5 transition-all flex flex-col justify-between group"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-2.5">
                        <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-sky-500/15 to-indigo-500/15 border border-sky-500/30 flex items-center justify-center text-sky-400 shrink-0 shadow-inner">
                          {asset.format === 'svg' ? (
                            <div
                              className="w-6 h-6 flex items-center justify-center [&>svg]:w-6 [&>svg]:h-6 [&>svg]:stroke-current"
                              dangerouslySetInnerHTML={{ __html: asset.content }}
                            />
                          ) : (
                            <img src={asset.content} alt={asset.name} className="w-7 h-7 object-contain" />
                          )}
                        </div>

                        <div className="flex items-center gap-1">
                          <span className="text-[9px] uppercase font-bold px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">
                            {asset.format}
                          </span>
                          <button
                            onClick={() => handleDeleteAsset(asset.id)}
                            title="Remove asset from vault"
                            className="p-1 text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-all opacity-0 group-hover:opacity-100"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      <h5 className="text-xs font-bold text-slate-100 mb-1 truncate">{asset.name}</h5>
                      <span className="text-[10px] text-sky-400 font-medium block mb-2">{asset.category}</span>

                      <div className="flex flex-wrap gap-1 mb-2">
                        {asset.tags.slice(0, 4).map((tag, idx) => (
                          <span
                            key={idx}
                            className="text-[9.5px] px-1.5 py-0.5 rounded bg-[#182332] text-slate-400 border border-[#25364c]"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-2 border-t border-[#1a2636] flex items-center justify-between text-[10px] text-slate-500">
                      <span className="flex items-center gap-1 text-emerald-400 font-medium">
                        <CheckCircle2 className="w-3 h-3" /> Priority Matched
                      </span>
                      <span>{new Date(asset.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                ))}
              </div>

              {filteredAssets.length === 0 && (
                <div className="text-center py-12 bg-[#0e1420] border border-dashed border-[#1f2d40] rounded-2xl p-6">
                  <Database className="w-8 h-8 text-slate-600 mx-auto mb-2" />
                  <h4 className="text-xs font-bold text-slate-300">No assets found in this filter</h4>
                  <p className="text-[11px] text-slate-500 mt-1 mb-3">Add your custom SVG icons, PNG logos, or graphics</p>
                  <button
                    onClick={() => setIsAddingAsset(true)}
                    className="px-3.5 py-1.5 bg-sky-500/20 text-sky-300 border border-sky-500/40 rounded-xl text-xs font-semibold"
                  >
                    Add First Asset
                  </button>
                </div>
              )}
            </>
          )}

          {/* TAB 2: RESOLUTION SETTINGS & PIPELINE RULES */}
          {activeTab === 'settings' && (
            <div className="space-y-6">
              {/* How it works pipeline diagram */}
              <div className="bg-[#121926] border border-[#202e40] rounded-2xl p-5">
                <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider mb-4 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Dual-Engine Asset Resolution Pipeline</span>
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 relative">
                  <div className="bg-[#162132] border border-sky-500/30 rounded-xl p-3.5 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase text-sky-400 bg-sky-500/10 px-2 py-0.5 rounded">
                        Step 1 &bull; Detection
                      </span>
                      <Sparkles className="w-3.5 h-3.5 text-sky-400" />
                    </div>
                    <h5 className="text-xs font-bold text-slate-100">Optical Vision Analysis</h5>
                    <p className="text-[11px] text-slate-400">
                      Gemini Vision scans screenshot and isolates every icon, logo, badge, and illustration.
                    </p>
                  </div>

                  <div className="bg-[#162132] border border-emerald-500/30 rounded-xl p-3.5 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                        Step 2 &bull; Vault Check
                      </span>
                      <Database className="w-3.5 h-3.5 text-emerald-400" />
                    </div>
                    <h5 className="text-xs font-bold text-slate-100">Check Personal Assets</h5>
                    <p className="text-[11px] text-slate-400">
                      Matches detected icons against your custom Asset Vault. If present, it embeds your exact SVG/asset!
                    </p>
                  </div>

                  <div className="bg-[#162132] border border-amber-500/30 rounded-xl p-3.5 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded">
                        Step 3 &bull; Web Sourcing
                      </span>
                      <Globe className="w-3.5 h-3.5 text-amber-400" />
                    </div>
                    <h5 className="text-xs font-bold text-slate-100">Auto Web Download</h5>
                    <p className="text-[11px] text-slate-400">
                      If an icon is missing from your vault, it automatically downloads and generates accurate SVGs from Web Libraries.
                    </p>
                  </div>
                </div>
              </div>

              {/* Toggles & Preferences */}
              <div className="bg-[#121926] border border-[#202e40] rounded-2xl p-5 space-y-4">
                <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider">
                  Generation Configuration
                </h4>

                <div className="flex items-center justify-between p-3.5 bg-[#0d131d] border border-[#1d293b] rounded-xl">
                  <div>
                    <h5 className="text-xs font-bold text-slate-200">Check User Asset Vault First</h5>
                    <p className="text-[11px] text-slate-400">
                      Always prioritize using custom icons and logos stored in your personal vault before fetching web assets.
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.assetMatchPriority === 'user-first'}
                    onChange={(e) => {
                      onUpdateSettings({
                        ...settings,
                        assetMatchPriority: e.target.checked ? 'user-first' : 'web-first',
                      });
                    }}
                    className="w-4 h-4 accent-sky-500 cursor-pointer"
                  />
                </div>

                <div className="flex items-center justify-between p-3.5 bg-[#0d131d] border border-[#1d293b] rounded-xl">
                  <div>
                    <h5 className="text-xs font-bold text-slate-200">Auto-Download Missing Icons from Internet</h5>
                    <p className="text-[11px] text-slate-400">
                      When an icon is not found in your vault, automatically source and embed vector SVGs from web repositories.
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.autoDownloadMissingIcons}
                    onChange={(e) => {
                      onUpdateSettings({
                        ...settings,
                        autoDownloadMissingIcons: e.target.checked,
                      });
                    }}
                    className="w-4 h-4 accent-sky-500 cursor-pointer"
                  />
                </div>

                <div className="flex items-center justify-between p-3.5 bg-[#0d131d] border border-[#1d293b] rounded-xl">
                  <div>
                    <h5 className="text-xs font-bold text-slate-200">Default Web Icon Library</h5>
                    <p className="text-[11px] text-slate-400">Fallback vector icon repository when sourcing from web.</p>
                  </div>
                  <select
                    value={settings.preferredIconLibrary}
                    onChange={(e) => {
                      onUpdateSettings({
                        ...settings,
                        preferredIconLibrary: e.target.value as any,
                      });
                    }}
                    className="bg-[#17202e] border border-[#28384d] rounded-lg px-3 py-1.5 text-xs text-slate-200"
                  >
                    <option value="lucide">Lucide Vector Icons (Default)</option>
                    <option value="feather">Feather Minimal Icons</option>
                    <option value="heroicons">Heroicons Standard</option>
                    <option value="remix">Remix Icon Set</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: RESOLVER TESTER */}
          {activeTab === 'test' && (
            <div className="space-y-5">
              <div className="bg-[#121926] border border-[#202e40] rounded-2xl p-5 space-y-4">
                <div>
                  <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider mb-1">
                    Live Icon Resolver Simulator
                  </h4>
                  <p className="text-xs text-slate-400">
                    Test any icon name or keyword to see how the system resolves it (User Vault vs Internet Web Download).
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={testKeyword}
                    onChange={(e) => setTestKeyword(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleRunMatchTest()}
                    placeholder="Try: crown, sleep, baby, diaper, wifi, search, heart, lock..."
                    className="flex-1 bg-[#0d131d] border border-[#202e40] focus:border-sky-500 rounded-xl px-3.5 py-2.5 text-xs text-slate-100 outline-none"
                  />
                  <button
                    onClick={handleRunMatchTest}
                    className="px-4 py-2.5 bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold rounded-xl text-xs flex items-center gap-1.5 transition-all shadow-md shadow-sky-500/20"
                  >
                    <Search className="w-3.5 h-3.5" />
                    <span>Test Resolve</span>
                  </button>
                </div>

                {/* Test Result Box */}
                {testResult && (
                  <div
                    className={`p-4 rounded-2xl border transition-all ${
                      testResult.matched
                        ? 'bg-emerald-500/10 border-emerald-500/30'
                        : 'bg-amber-500/10 border-amber-500/30'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 mb-2">
                      {testResult.matched ? (
                        <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                          <CheckCircle2 className="w-4 h-4" />
                        </div>
                      ) : (
                        <div className="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center">
                          <Globe className="w-4 h-4" />
                        </div>
                      )}
                      <div>
                        <h5 className="text-xs font-bold text-slate-100">
                          {testResult.matched ? `Matched in User Vault: "${testResult.assetName}"` : 'Internet Download Fallback Engaged'}
                        </h5>
                        <span className="text-[10px] text-slate-400 uppercase font-semibold">
                          Resolution Route: {testResult.source === 'user-vault' ? 'User Asset Library (1st Priority)' : 'Web Icon API (2nd Priority)'}
                        </span>
                      </div>
                    </div>
                    <p className="text-xs text-slate-300 pl-9">{testResult.details}</p>
                  </div>
                )}
              </div>

              <div className="flex flex-wrap gap-2 text-xs text-slate-400">
                <span className="font-semibold text-slate-300">Quick Test Suggestions:</span>
                {['crown', 'moon', 'baby', 'diaper', 'heart', 'lightning', 'battery', 'settings', 'search'].map((kw) => (
                  <button
                    key={kw}
                    onClick={() => {
                      setTestKeyword(kw);
                      const q = kw.toLowerCase().trim();
                      const matchedAsset = settings.customAssets.find(a => 
                        a.name.toLowerCase().includes(q) || 
                        a.tags.some(t => t.toLowerCase() === q || q.includes(t.toLowerCase()))
                      );
                      if (matchedAsset) {
                        setTestResult({
                          matched: true,
                          source: 'user-vault',
                          assetName: matchedAsset.name,
                          details: `Found in your Personal Vault under tags [${matchedAsset.tags.join(', ')}]. Will inject your custom ${matchedAsset.format.toUpperCase()}!`,
                        });
                      } else {
                        setTestResult({
                          matched: false,
                          source: 'web-download',
                          details: `Not found in your custom Asset Vault. Automatic internet fallback will download and generate a clean inline SVG icon (${q}) from the Web Icon Repository.`,
                        });
                      }
                    }}
                    className="px-2.5 py-1 bg-[#121926] hover:bg-[#1c2738] border border-[#202e40] rounded-lg text-[11px] text-slate-300 hover:text-sky-300"
                  >
                    #{kw}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="h-14 bg-[#101622] border-t border-[#1e2a3c] px-6 flex items-center justify-between shrink-0">
          <span className="text-[11px] text-slate-400 flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Changes are automatically saved to your local workspace vault</span>
          </span>

          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-[#1b2536] hover:bg-[#25344a] text-slate-200 text-xs font-semibold rounded-xl transition-all"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
