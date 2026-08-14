import { UserCustomAsset, UserProfileSettings } from '../types';

export const DEFAULT_USER_ASSETS: UserCustomAsset[] = [
  {
    id: 'asset-custom-crown',
    name: 'Golden Premium Crown',
    type: 'icon',
    format: 'svg',
    category: 'Badges & Rewards',
    tags: ['crown', 'premium', 'gold', 'vip', 'subscription', 'luli', 'king'],
    content: `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="m2 4 3 12h14l3-12-6 7-4-7-4 7-6-7zm3 16h14" />
</svg>`,
    thumbnail: '',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'asset-custom-moon-sleep',
    name: 'Crescent Sleep Moon',
    type: 'icon',
    format: 'svg',
    category: 'Health & Lifestyle',
    tags: ['moon', 'sleep', 'night', 'bedtime', 'predictions', 'schedule', 'dreams'],
    content: `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
</svg>`,
    thumbnail: '',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'asset-custom-baby-care',
    name: 'Baby Care & Diapers',
    type: 'icon',
    format: 'svg',
    category: 'Health & Lifestyle',
    tags: ['baby', 'feeds', 'diaper', 'bottle', 'child', 'pacifier', 'nursing'],
    content: `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M9 12h.01M15 12h.01M10 16c.5.5 1.2.8 2 .8s1.5-.3 2-.8M19 6.3a9 9 0 0 1 1.8 3.9 2 2 0 0 1 0 3.6 9 9 0 0 1-17.6 0 2 2 0 0 1 0-3.6A9 9 0 0 1 5 6.3M12 2v4" />
</svg>`,
    thumbnail: '',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'asset-custom-flame-bolt',
    name: 'Energy Bolt & Spark',
    type: 'icon',
    format: 'svg',
    category: 'Actions & Utilities',
    tags: ['lightning', 'bolt', 'flash', 'energy', 'zap', 'fast', 'quick'],
    content: `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
</svg>`,
    thumbnail: '',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'asset-custom-shield-lock',
    name: 'Privacy Shield & Lock',
    type: 'icon',
    format: 'svg',
    category: 'Security & Auth',
    tags: ['shield', 'lock', 'secure', 'privacy', 'safe', 'protection', 'ssl'],
    content: `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
</svg>`,
    thumbnail: '',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'asset-custom-heart-glow',
    name: 'Social Heart Like',
    type: 'icon',
    format: 'svg',
    category: 'Social & Feed',
    tags: ['heart', 'like', 'love', 'favorite', 'reels', 'rating'],
    content: `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
</svg>`,
    thumbnail: '',
    createdAt: new Date().toISOString(),
  },
];

export const DEFAULT_PROFILE_SETTINGS: UserProfileSettings = {
  name: 'Rahul Designer',
  email: 'itsrahul479@gmail.com',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
  customAssets: DEFAULT_USER_ASSETS,
  assetMatchPriority: 'user-first',
  autoDownloadMissingIcons: true,
  preferredIconLibrary: 'lucide',
};

const STORAGE_KEY = 'soul_ui_user_profile_settings_v1';

export function loadUserProfileSettings(): UserProfileSettings {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      return {
        ...DEFAULT_PROFILE_SETTINGS,
        ...parsed,
        customAssets: Array.isArray(parsed.customAssets) && parsed.customAssets.length > 0
          ? parsed.customAssets
          : DEFAULT_USER_ASSETS,
      };
    }
  } catch (err) {
    console.error('Failed to load user profile settings:', err);
  }
  return DEFAULT_PROFILE_SETTINGS;
}

export function saveUserProfileSettings(settings: UserProfileSettings): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  } catch (err) {
    console.error('Failed to save user profile settings:', err);
  }
}
