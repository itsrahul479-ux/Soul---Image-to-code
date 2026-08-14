// SVG Vector Dictionary for Instant Offline & Online Embedding
// Exact and closest matches with full standalone vector paths

export interface SvgIconDefinition {
  key: string;
  name: string;
  category: string;
  viewBox: string;
  svgPath: string;
  tags: string[];
}

export const VECTOR_ICON_CATALOG: Record<string, SvgIconDefinition> = {
  // Navigation & Actions
  'arrow-right': {
    key: 'arrow-right',
    name: 'Arrow Right',
    category: 'Navigation',
    viewBox: '0 0 24 24',
    svgPath: '<path d="M5 12h14m-7-7 7 7-7 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>',
    tags: ['arrow', 'next', 'forward', 'right', 'go', 'continue'],
  },
  'arrow-left': {
    key: 'arrow-left',
    name: 'Arrow Left',
    category: 'Navigation',
    viewBox: '0 0 24 24',
    svgPath: '<path d="m12 19-7-7 7-7m7 7H5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>',
    tags: ['arrow', 'back', 'previous', 'left', 'return'],
  },
  'chevron-right': {
    key: 'chevron-right',
    name: 'Chevron Right',
    category: 'Navigation',
    viewBox: '0 0 24 24',
    svgPath: '<path d="m9 18 6-6-6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>',
    tags: ['chevron', 'caret', 'next', 'disclosure', 'expand'],
  },
  'chevron-left': {
    key: 'chevron-left',
    name: 'Chevron Left',
    category: 'Navigation',
    viewBox: '0 0 24 24',
    svgPath: '<path d="m15 18-6-6 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>',
    tags: ['chevron', 'back', 'collapse'],
  },
  'chevron-down': {
    key: 'chevron-down',
    name: 'Chevron Down',
    category: 'Navigation',
    viewBox: '0 0 24 24',
    svgPath: '<path d="m6 9 6 6 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>',
    tags: ['chevron', 'dropdown', 'expand', 'down'],
  },
  'home': {
    key: 'home',
    name: 'Home',
    category: 'Navigation',
    viewBox: '0 0 24 24',
    svgPath: '<path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><polyline points="9 22 9 12 15 12 15 22" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>',
    tags: ['home', 'main', 'dashboard', 'house'],
  },
  'compass': {
    key: 'compass',
    name: 'Compass / Explore',
    category: 'Navigation',
    viewBox: '0 0 24 24',
    svgPath: '<circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" fill="currentColor"/>',
    tags: ['compass', 'explore', 'discover', 'browse', 'navigate'],
  },
  'search': {
    key: 'search',
    name: 'Search',
    category: 'Navigation',
    viewBox: '0 0 24 24',
    svgPath: '<circle cx="11" cy="11" r="8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="m21 21-4.35-4.35" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>',
    tags: ['search', 'find', 'lookup', 'magnifier', 'query'],
  },
  'user': {
    key: 'user',
    name: 'User Profile',
    category: 'Account',
    viewBox: '0 0 24 24',
    svgPath: '<path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><circle cx="12" cy="7" r="4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>',
    tags: ['user', 'profile', 'account', 'person', 'avatar', 'member'],
  },
  'bell': {
    key: 'bell',
    name: 'Notification Bell',
    category: 'Status',
    viewBox: '0 0 24 24',
    svgPath: '<path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>',
    tags: ['bell', 'notification', 'alert', 'notice', 'ring'],
  },
  'heart': {
    key: 'heart',
    name: 'Heart Favorite',
    category: 'Interaction',
    viewBox: '0 0 24 24',
    svgPath: '<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>',
    tags: ['heart', 'like', 'favorite', 'love', 'bookmark'],
  },
  'sparkles': {
    key: 'sparkles',
    name: 'Sparkles AI / Magic',
    category: 'Effect',
    viewBox: '0 0 24 24',
    svgPath: '<path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>',
    tags: ['sparkles', 'magic', 'ai', 'clean', 'stars', 'zen', 'glow', 'special'],
  },
  'flame': {
    key: 'flame',
    name: 'Flame / Calories / Streak',
    category: 'Fitness',
    viewBox: '0 0 24 24',
    svgPath: '<path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>',
    tags: ['flame', 'fire', 'burn', 'streak', 'calories', 'hot', 'workout'],
  },
  'activity': {
    key: 'activity',
    name: 'Activity Pulse',
    category: 'Fitness',
    viewBox: '0 0 24 24',
    svgPath: '<path d="M22 12h-4l-3 9L9 3l-3 9H2" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>',
    tags: ['activity', 'pulse', 'heartrate', 'ecg', 'health', 'motion', 'vitals'],
  },
  'play': {
    key: 'play',
    name: 'Play Media',
    category: 'Media',
    viewBox: '0 0 24 24',
    svgPath: '<polygon points="6 3 20 12 6 21 6 3" fill="currentColor"/>',
    tags: ['play', 'video', 'music', 'start', 'audio', 'stream'],
  },
  'pause': {
    key: 'pause',
    name: 'Pause Media',
    category: 'Media',
    viewBox: '0 0 24 24',
    svgPath: '<rect x="6" y="4" width="4" height="16" fill="currentColor"/><rect x="14" y="4" width="4" height="16" fill="currentColor"/>',
    tags: ['pause', 'stop', 'hold', 'media'],
  },
  'check-circle': {
    key: 'check-circle',
    name: 'Check Circle',
    category: 'Status',
    viewBox: '0 0 24 24',
    svgPath: '<circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/><path d="m9 12 2 2 4-4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>',
    tags: ['check', 'done', 'complete', 'success', 'verified', 'finish'],
  },
  'clock': {
    key: 'clock',
    name: 'Clock / Duration',
    category: 'Status',
    viewBox: '0 0 24 24',
    svgPath: '<circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/><polyline points="12 6 12 12 16 14" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>',
    tags: ['clock', 'time', 'duration', 'timer', 'history', 'schedule'],
  },
  'volume-2': {
    key: 'volume-2',
    name: 'Volume Sound',
    category: 'Media',
    viewBox: '0 0 24 24',
    svgPath: '<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" stroke="currentColor" stroke-width="2" fill="none"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07" stroke="currentColor" stroke-width="2"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14" stroke="currentColor" stroke-width="2"/>',
    tags: ['volume', 'sound', 'audio', 'speaker', 'music', 'listen'],
  },
  'sliders': {
    key: 'sliders',
    name: 'Sliders / Settings',
    category: 'Settings',
    viewBox: '0 0 24 24',
    svgPath: '<line x1="4" x2="4" y1="21" y2="14" stroke="currentColor" stroke-width="2"/><line x1="4" x2="4" y1="10" y2="3" stroke="currentColor" stroke-width="2"/><line x1="12" x2="12" y1="21" y2="12" stroke="currentColor" stroke-width="2"/><line x1="12" x2="12" y1="8" y2="3" stroke="currentColor" stroke-width="2"/><line x1="20" x2="20" y1="21" y2="16" stroke="currentColor" stroke-width="2"/><line x1="20" x2="20" y1="12" y2="3" stroke="currentColor" stroke-width="2"/><line x1="1" x2="7" y1="14" y2="14" stroke="currentColor" stroke-width="2"/><line x1="9" x2="15" y1="8" y2="8" stroke="currentColor" stroke-width="2"/><line x1="17" x2="23" y1="16" y2="16" stroke="currentColor" stroke-width="2"/>',
    tags: ['sliders', 'settings', 'filter', 'adjust', 'customize', 'preferences'],
  },
  'download': {
    key: 'download',
    name: 'Download / Save',
    category: 'Actions',
    viewBox: '0 0 24 24',
    svgPath: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" stroke="currentColor" stroke-width="2"/><polyline points="7 10 12 15 17 10" stroke="currentColor" stroke-width="2"/><line x1="12" x2="12" y1="15" y2="3" stroke="currentColor" stroke-width="2"/>',
    tags: ['download', 'save', 'export', 'archive', 'offline'],
  },
  'moon': {
    key: 'moon',
    name: 'Moon / Sleep',
    category: 'Wellness',
    viewBox: '0 0 24 24',
    svgPath: '<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>',
    tags: ['moon', 'sleep', 'night', 'dark', 'rest', 'bedtime'],
  },
  'sun': {
    key: 'sun',
    name: 'Sun / Morning',
    category: 'Wellness',
    viewBox: '0 0 24 24',
    svgPath: '<circle cx="12" cy="12" r="4" stroke="currentColor" stroke-width="2"/><path d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32 1.41 1.41M2 12h2m16 0h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" stroke="currentColor" stroke-width="2"/>',
    tags: ['sun', 'morning', 'day', 'light', 'wake', 'energy'],
  },
  'zap': {
    key: 'zap',
    name: 'Zap / Fast',
    category: 'Status',
    viewBox: '0 0 24 24',
    svgPath: '<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" fill="currentColor"/>',
    tags: ['zap', 'bolt', 'lightning', 'energy', 'fast', 'quick', 'power'],
  },
  'share-2': {
    key: 'share-2',
    name: 'Share Link',
    category: 'Actions',
    viewBox: '0 0 24 24',
    svgPath: '<circle cx="18" cy="5" r="3" stroke="currentColor" stroke-width="2"/><circle cx="6" cy="12" r="3" stroke="currentColor" stroke-width="2"/><circle cx="18" cy="19" r="3" stroke="currentColor" stroke-width="2"/><line x1="8.59" x2="15.42" y1="13.51" y2="17.49" stroke="currentColor" stroke-width="2"/><line x1="15.41" x2="8.59" y1="6.51" y2="10.49" stroke="currentColor" stroke-width="2"/>',
    tags: ['share', 'send', 'export', 'social', 'link'],
  },
  'bookmark': {
    key: 'bookmark',
    name: 'Bookmark',
    category: 'Interaction',
    viewBox: '0 0 24 24',
    svgPath: '<path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>',
    tags: ['bookmark', 'save', 'keep', 'favorite', 'flag'],
  }
};

/**
 * Finds exact or semantic closest icon from query / detected icon description
 */
export function findClosestIcon(queryOrKey: string): { icon: SvgIconDefinition; matchType: 'exact' | 'closest' | 'fallback'; confidence: number } {
  const q = (queryOrKey || '').toLowerCase().trim().replace(/[\s_-]+/g, '');

  // 1. Direct exact key match
  for (const [key, def] of Object.entries(VECTOR_ICON_CATALOG)) {
    if (key.replace(/[\s_-]+/g, '') === q || def.name.toLowerCase().replace(/[\s_-]+/g, '') === q) {
      return { icon: def, matchType: 'exact', confidence: 0.99 };
    }
  }

  // 2. Tag / synonym search
  let bestMatch: SvgIconDefinition = VECTOR_ICON_CATALOG['sparkles'];
  let maxScore = 0;

  for (const def of Object.values(VECTOR_ICON_CATALOG)) {
    let score = 0;
    for (const tag of def.tags) {
      if (q.includes(tag) || tag.includes(q)) {
        score += 3;
      }
    }
    if (def.category.toLowerCase().includes(q) || q.includes(def.category.toLowerCase())) {
      score += 1.5;
    }
    if (score > maxScore) {
      maxScore = score;
      bestMatch = def;
    }
  }

  if (maxScore > 0) {
    return {
      icon: bestMatch,
      matchType: 'closest',
      confidence: Math.min(0.95, 0.82 + maxScore * 0.04),
    };
  }

  // 3. Fallback closest based on common UI role
  if (q.includes('nav') || q.includes('menu') || q.includes('tab')) {
    return { icon: VECTOR_ICON_CATALOG['home'], matchType: 'closest', confidence: 0.85 };
  }
  if (q.includes('setting') || q.includes('opt') || q.includes('filter')) {
    return { icon: VECTOR_ICON_CATALOG['sliders'], matchType: 'closest', confidence: 0.88 };
  }
  if (q.includes('media') || q.includes('listen') || q.includes('track')) {
    return { icon: VECTOR_ICON_CATALOG['play'], matchType: 'closest', confidence: 0.90 };
  }

  return { icon: VECTOR_ICON_CATALOG['sparkles'], matchType: 'closest', confidence: 0.80 };
}

/**
 * Returns standalone SVG markup string
 */
export function getStandaloneSvgMarkup(iconKey: string, size = 20, color = 'currentColor'): string {
  const { icon } = findClosestIcon(iconKey);
  return `<svg width="${size}" height="${size}" viewBox="${icon.viewBox}" fill="none" class="ui-icon ui-icon-${icon.key}">${icon.svgPath}</svg>`;
}
