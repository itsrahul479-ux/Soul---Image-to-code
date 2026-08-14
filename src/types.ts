export interface CanvasSpec {
  width: number;
  height: number;
}

export interface FrameSpec {
  x: number;
  y: number;
  width: number;
  height: number;
  radius: number;
  deviceType?: 'mobile' | 'tablet' | 'desktop';
}

export interface ColorToken {
  name: string;
  value: string;
  role: 'background' | 'surface' | 'primary' | 'secondary' | 'accent' | 'text' | 'textSecondary' | 'border';
}

export interface TypographyToken {
  role: string;
  fontFamily: string;
  fontSize: string;
  fontWeight: number | string;
  lineHeight: string;
  letterSpacing?: string;
  color: string;
}

export interface GlassEffects {
  detected: boolean;
  blur: string;
  glassOpacity: number;
  borderOpacity: number;
  innerGlow?: string;
  boxShadow?: string;
  gradientBackground?: string;
}

export interface RadiusTokens {
  small: number;
  medium: number;
  large: number;
  pill: number;
}

export interface UIComponentSpec {
  id: string;
  name: string;
  type: 'statusBar' | 'header' | 'hero' | 'card' | 'button' | 'navigation' | 'mediaPlayer' | 'tag' | 'input' | 'list' | 'avatar' | 'badge';
  bounds: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  content?: string;
  visualDetails: {
    background?: string;
    borderRadius?: number;
    border?: string;
    shadow?: string;
    textColor?: string;
    fontSize?: string;
    fontWeight?: string | number;
    glassEffect?: boolean;
    opacity?: number;
  };
  children?: UIComponentSpec[];
}

export interface DetectedIcon {
  id: string;
  name: string;
  matchedLibrary: 'Lucide' | 'Iconly' | 'Material' | 'SVG Custom' | 'User Vault' | 'Web Sourced';
  iconKey: string;
  confidence: number;
  category: string;
  svgPreview?: string;
  status: 'matched' | 'unmatched';
  matchType?: 'exact' | 'closest' | 'downloaded' | 'user-asset';
  svgMarkup?: string;
  downloaded?: boolean;
  sourceOrigin?: 'user-vault' | 'web-internet' | 'system-catalog';
}

export interface UserCustomAsset {
  id: string;
  name: string;
  type: 'icon' | 'image' | 'logo' | 'illustration';
  format: 'svg' | 'png' | 'jpg' | 'webp';
  content: string; // SVG code or image URL / base64
  thumbnail?: string;
  tags: string[];
  category?: string;
  dimensions?: { width: number; height: number };
  createdAt: string;
}

export interface UserProfileSettings {
  name: string;
  email: string;
  avatarUrl: string;
  customAssets: UserCustomAsset[];
  assetMatchPriority: 'user-first' | 'web-first';
  autoDownloadMissingIcons: boolean;
  preferredIconLibrary: 'lucide' | 'feather' | 'heroicons' | 'remix';
}

export interface DetectedAsset {
  id: string;
  name: string;
  role: 'hero' | 'card_thumbnail' | 'avatar' | 'background' | 'illustration';
  aspectRatio: string;
  detectedDescription: string;
  searchKeywords: string;
  matchedUrl: string;
  thumbnailUrl: string;
  source: 'Unsplash' | 'Pexels' | 'Pixabay' | 'Generated / Curated';
  license: string;
  author: string;
  downloaded: boolean;
}

export interface ScreenSpec {
  id: string;
  title: string;
  type: 'mobile' | 'tablet' | 'desktop';
  frame: FrameSpec;
  background: {
    baseColor: string;
    gradient?: string;
  };
  effects: GlassEffects;
  designTokens: {
    colors: ColorToken[];
    typography: TypographyToken[];
    radius: RadiusTokens;
    spacing: number[];
  };
  components: UIComponentSpec[];
  icons: DetectedIcon[];
  assets: DetectedAsset[];
  generatedCode: {
    html: string;
    css: string;
    js: string;
    reactJsx?: string;
  };
  matchScore: {
    overall: number;
    layout: number;
    typography: number;
    colors: number;
    spacing: number;
    components: number;
    images: number;
    effects: number;
  };
  differences?: {
    id: string;
    type: 'layout' | 'typography' | 'color' | 'spacing' | 'image' | 'effect' | 'component';
    description: string;
    severity: 'low' | 'medium' | 'high';
    fixSuggestion: string;
    applied?: boolean;
  }[];
}

export interface ProjectSpec {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  originalImageBase64: string;
  imageDimensions: CanvasSpec;
  selectedScreenId: string;
  screens: ScreenSpec[];
  versionHistory: {
    version: number;
    timestamp: string;
    summary: string;
    screens: ScreenSpec[];
  }[];
  promptLogs: {
    id: string;
    timestamp: string;
    prompt: string;
    aiResponse: string;
    changesSummary: string;
  }[];
}

export interface AssetSearchResult {
  id: string;
  title: string;
  url: string;
  thumbnail: string;
  source: string;
  author: string;
  license: string;
  aspectRatio: string;
  tags: string[];
}
