import { ProjectSpec } from '../types';

export const REELS_SIENNA_PROJECT: ProjectSpec = {
  id: 'sample-reels-sienna',
  name: 'Reels Scenic UI — Sienna',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  imageDimensions: { width: 1200, height: 1200 },
  originalImageBase64: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1200&auto=format&fit=crop',
  selectedScreenId: 'screen-reels-sienna',
  screens: [
    {
      id: 'screen-reels-sienna',
      title: 'Reels Feed Interface',
      type: 'mobile',
      frame: { x: 0, y: 0, width: 390, height: 844, radius: 46, deviceType: 'mobile' },
      background: {
        baseColor: '#090e17',
        gradient: 'linear-gradient(180deg, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.55) 100%)'
      },
      effects: {
        detected: true,
        blur: '24px',
        glassOpacity: 0.22,
        borderOpacity: 0.28,
        innerGlow: 'inset 0 1px 1px 0 rgba(255, 255, 255, 0.4)',
        boxShadow: '0 35px 90px rgba(0, 0, 0, 0.8)'
      },
      designTokens: {
        colors: [
          { name: 'Neon Lime Follow', value: '#a3e635', role: 'accent' },
          { name: 'Frosted Glass Surface', value: 'rgba(255, 255, 255, 0.22)', role: 'surface' },
          { name: 'Pure White Text', value: '#ffffff', role: 'text' },
          { name: 'Like Red', value: '#ef4444', role: 'accent' },
          { name: 'Dock Capsule Glass', value: 'rgba(20, 30, 24, 0.45)', role: 'surface' },
          { name: 'Glass Specular Border', value: 'rgba(255, 255, 255, 0.28)', role: 'border' }
        ],
        typography: [
          { role: 'Reels Header', fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: '26px', fontWeight: 800, lineHeight: '1.2', color: '#ffffff' },
          { role: 'Creator Name', fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: '16px', fontWeight: 800, lineHeight: '1.2', color: '#ffffff' },
          { role: 'Creator Caption', fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: '12.5px', fontWeight: 500, lineHeight: '1.4', color: 'rgba(255,255,255,0.92)' },
          { role: 'Metric Label', fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: '11.5px', fontWeight: 700, lineHeight: '1', color: '#ffffff' }
        ],
        radius: { small: 12, medium: 20, large: 46, pill: 9999 },
        spacing: [6, 12, 16, 20, 24]
      },
      components: [
        {
          id: 'c1',
          name: 'Dynamic Island & Status Bar',
          type: 'header',
          bounds: { x: 0, y: 0, width: 390, height: 48 },
          visualDetails: { glassEffect: false }
        },
        {
          id: 'c2',
          name: 'Reels Title & Frosted Camera Button',
          type: 'header',
          bounds: { x: 20, y: 54, width: 350, height: 44 },
          visualDetails: { glassEffect: true }
        },
        {
          id: 'c3',
          name: 'Creator Row (Sienna & Follow Button)',
          type: 'card',
          bounds: { x: 20, y: 115, width: 350, height: 50 },
          visualDetails: { glassEffect: false }
        },
        {
          id: 'c4',
          name: 'Center Play/Pause Frosted Button',
          type: 'button',
          bounds: { x: 168, y: 395, width: 54, height: 54 },
          visualDetails: { glassEffect: true }
        },
        {
          id: 'c5',
          name: 'Right Action Stack (Heart, Comments, Share, More, Music Disc)',
          type: 'navigation',
          bounds: { x: 326, y: 480, width: 48, height: 260 },
          visualDetails: { glassEffect: true }
        },
        {
          id: 'c6',
          name: 'Bottom Glass Dock Capsule & Round Search',
          type: 'navigation',
          bounds: { x: 20, y: 768, width: 350, height: 54 },
          visualDetails: { glassEffect: true }
        }
      ],
      icons: [
        { id: 'i1', name: 'Camera', matchedLibrary: 'Lucide', iconKey: 'camera', confidence: 0.99, category: 'Header', status: 'matched', matchType: 'exact', downloaded: true, svgMarkup: '<svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/></svg>' },
        { id: 'i2', name: 'Heart', matchedLibrary: 'Lucide', iconKey: 'heart', confidence: 0.99, category: 'Actions', status: 'matched', matchType: 'exact', downloaded: true, svgMarkup: '<svg width="22" height="22" viewBox="0 0 24 24" fill="#ef4444" stroke="#ef4444" stroke-width="1"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>' },
        { id: 'i3', name: 'Message Square', matchedLibrary: 'Lucide', iconKey: 'message-square', confidence: 0.99, category: 'Actions', status: 'matched', matchType: 'exact', downloaded: true, svgMarkup: '<svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM7 11c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm5 0c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm5 0c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z"/></svg>' },
        { id: 'i4', name: 'Send / Share', matchedLibrary: 'Lucide', iconKey: 'send', confidence: 0.98, category: 'Actions', status: 'matched', matchType: 'exact', downloaded: true, svgMarkup: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>' },
        { id: 'i5', name: 'More Vertical', matchedLibrary: 'Lucide', iconKey: 'more-vertical', confidence: 0.99, category: 'Actions', status: 'matched', matchType: 'exact', downloaded: true, svgMarkup: '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="5" r="2.2"/><circle cx="12" cy="12" r="2.2"/><circle cx="12" cy="19" r="2.2"/></svg>' },
        { id: 'i6', name: 'Reels Clapperboard', matchedLibrary: 'Lucide', iconKey: 'clapperboard', confidence: 0.99, category: 'Dock', status: 'matched', matchType: 'exact', downloaded: true, svgMarkup: '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M19.82 2H4.18C2.97 2 2 2.97 2 4.18v15.64C2 21.03 2.97 22 4.18 22h15.64c1.21 0 2.18-.97 2.18-2.18V4.18C22 2.97 21.03 2 19.82 2zM4 4h2.5l2 4H6L4 4zm4.5 4-2-4h3l2 4h-3zm5 0-2-4h3l2 4h-3zm5 0-2-4H20l-2 4h-1.5z"/></svg>' },
        { id: 'i7', name: 'Search', matchedLibrary: 'Lucide', iconKey: 'search', confidence: 0.99, category: 'Dock', status: 'matched', matchType: 'exact', downloaded: true, svgMarkup: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>' },
        { id: 'i8', name: 'Volume 2', matchedLibrary: 'Lucide', iconKey: 'volume-2', confidence: 0.98, category: 'Media', status: 'matched', matchType: 'exact', downloaded: true, svgMarkup: '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07" fill="none" stroke="currentColor" stroke-width="2"/></svg>' }
      ],
      assets: [
        {
          id: 'a1',
          name: 'Mountain Ridge Highway Drone Shot',
          role: 'hero',
          aspectRatio: '9:16',
          detectedDescription: 'Aerial drone perspective of scenic mountain road passing through lush green hills under blue sky',
          searchKeywords: 'mountain ridge highway lush green drone aerial forest',
          matchedUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1200&auto=format&fit=crop',
          thumbnailUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=200&auto=format&fit=crop',
          source: 'Unsplash',
          license: 'Free Commercial',
          author: 'Bailey Zindel',
          downloaded: true
        },
        {
          id: 'a2',
          name: 'Sienna Portrait Avatar',
          role: 'avatar',
          aspectRatio: '1:1',
          detectedDescription: 'Young brunette woman with long hair in white dress',
          searchKeywords: 'brunette woman portrait serene smile outdoor',
          matchedUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop',
          thumbnailUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&auto=format&fit=crop',
          source: 'Unsplash',
          license: 'Free Commercial',
          author: 'Aiony Haust',
          downloaded: true
        }
      ],
      matchScore: { overall: 99, layout: 99, typography: 99, colors: 99, spacing: 99, components: 99, images: 98, effects: 99 },
      differences: [
        { id: 'd1', type: 'color', description: 'Reconstructed exact #a3e635 neon lime Follow pill and Reels active dock icon', severity: 'low', fixSuggestion: 'Apply #a3e635 neon accent', applied: true },
        { id: 'd2', type: 'component', description: 'Placed Dynamic Island, frosted camera circle, audio toggle, and right action column with exact counts', severity: 'low', fixSuggestion: 'Exact inline SVGs and layout structure applied', applied: true }
      ],
      generatedCode: {
        html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reels — Sienna</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Outfit:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <!-- Main Vertical Snap-Scrollable Reels Container -->
  <div class="reels-feed-container" id="reels-feed">
    
    <!-- Top Sticky Overlay: Status Bar + App Title + Camera Button -->
    <div class="top-overlay-layer">
      <!-- Status Bar with iPhone Dynamic Island -->
      <div class="status-bar-row">
        <span class="status-clock">9:41</span>
        <div class="dynamic-island-notch"></div>
        <div class="status-right-icons">
          <svg width="15" height="11" viewBox="0 0 18 12" fill="currentColor"><path d="M1 9h2v3H1zm4-3h2v6H5zm4-3h2v9H9zm4-3h2v12h-2z"/></svg>
          <svg width="15" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12.55a11 11 0 0 1 14.08 0M1.42 9a16 16 0 0 1 21.16 0M8.53 16.11a6 6 0 0 1 6.95 0M12 20h.01"/></svg>
          <div class="battery-badge">
            <span class="battery-num">70</span>
            <div class="battery-body"><div class="battery-fill"></div></div>
          </div>
        </div>
      </div>

      <!-- Top App Bar: "Reels" + Frosted Camera Icon -->
      <header class="reels-header">
        <h1 class="reels-title">Reels</h1>
        <button class="frosted-icon-circle camera-btn" id="camera-btn" aria-label="Open Camera">
          <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/>
            <circle cx="12" cy="13" r="3"/>
          </svg>
        </button>
      </header>
    </div>

    <!-- ==================== REEL SLIDE 1: SIENNA (Mountain Ridge) ==================== -->
    <article class="reel-slide" data-slide="1">
      <div class="reel-media-bg">
        <img
          src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1200&auto=format&fit=crop"
          alt="Mountain Ridge Scenic Road"
          class="bg-image"
        />
        <div class="scenic-overlay-gradient"></div>
      </div>

      <!-- Creator Header -->
      <div class="creator-card-row">
        <div class="avatar-ring-wrap">
          <img
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop"
            alt="Sienna"
            class="creator-avatar-img"
          />
        </div>
        <div class="creator-text-col">
          <div class="creator-title-line">
            <span class="creator-name">Sienna</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="#38bdf8" class="verified-badge"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
          </div>
          <div class="creator-caption">
            <span class="emoji-flame">🔥</span>
            <span class="caption-text">Bangladesh's First Love")</span>
          </div>
        </div>
        <button class="follow-lime-btn follow-toggle" data-following="false">Follow</button>
      </div>

      <!-- Center Play/Pause Frosted Glass Button -->
      <div class="center-play-container">
        <button class="center-play-circle play-pause-trigger" aria-label="Play / Pause">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
            <polygon points="6 3 20 12 6 21 6 3"/>
          </svg>
        </button>
      </div>

      <!-- Bottom Left Audio/Mute Frosted Circle -->
      <div class="bottom-left-speaker">
        <button class="frosted-icon-circle speaker-trigger" aria-label="Toggle Audio">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
            <path d="M15.54 8.46a5 5 0 0 1 0 7.07" fill="none" stroke="currentColor" stroke-width="2"/>
          </svg>
        </button>
      </div>

      <!-- Right Side Vertical Action Stack -->
      <aside class="right-actions-stack">
        <div class="action-slot">
          <button class="action-circle-btn like-trigger" aria-label="Like Reel" data-liked="true">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="#ef4444" stroke="#ef4444" stroke-width="1">
              <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
            </svg>
          </button>
          <span class="action-label like-count">2,6000</span>
        </div>

        <div class="action-slot">
          <button class="action-circle-btn comment-trigger" aria-label="View Comments">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" stroke="none">
              <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM7 11c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm5 0c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm5 0c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z"/>
            </svg>
          </button>
          <span class="action-label">1,000</span>
        </div>

        <div class="action-slot">
          <button class="action-circle-btn share-trigger" aria-label="Share Reel">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <path d="m22 2-7 20-4-9-9-4Z"/>
              <path d="M22 2 11 13"/>
            </svg>
          </button>
        </div>

        <div class="action-slot">
          <button class="action-circle-btn more-trigger" aria-label="Options">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <circle cx="12" cy="5" r="2.2"/>
              <circle cx="12" cy="12" r="2.2"/>
              <circle cx="12" cy="19" r="2.2"/>
            </svg>
          </button>
        </div>

        <div class="action-slot music-slot">
          <div class="vinyl-disc-wrapper spin-animation">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=120&auto=format&fit=crop"
              alt="Track Artwork"
              class="vinyl-artwork"
            />
            <div class="lime-note-pill">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor" stroke="none">
                <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
              </svg>
            </div>
          </div>
        </div>
      </aside>
    </article>

    <!-- ==================== REEL SLIDE 2: KAI (Bali Coast Surf) ==================== -->
    <article class="reel-slide" data-slide="2">
      <div class="reel-media-bg">
        <img
          src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop"
          alt="Bali Coast Surf at Dawn"
          class="bg-image"
        />
        <div class="scenic-overlay-gradient"></div>
      </div>

      <!-- Creator Header -->
      <div class="creator-card-row">
        <div class="avatar-ring-wrap">
          <img
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop"
            alt="Kai"
            class="creator-avatar-img"
          />
        </div>
        <div class="creator-text-col">
          <div class="creator-title-line">
            <span class="creator-name">Kai Rivera</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="#38bdf8" class="verified-badge"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
          </div>
          <div class="creator-caption">
            <span class="emoji-flame">🌊</span>
            <span class="caption-text">Chasing golden hour barrels in Uluwatu</span>
          </div>
        </div>
        <button class="follow-lime-btn follow-toggle" data-following="false">Follow</button>
      </div>

      <!-- Center Play/Pause Button -->
      <div class="center-play-container">
        <button class="center-play-circle play-pause-trigger" aria-label="Play / Pause">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
            <polygon points="6 3 20 12 6 21 6 3"/>
          </svg>
        </button>
      </div>

      <!-- Bottom Left Audio Toggle -->
      <div class="bottom-left-speaker">
        <button class="frosted-icon-circle speaker-trigger" aria-label="Toggle Audio">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
            <path d="M15.54 8.46a5 5 0 0 1 0 7.07" fill="none" stroke="currentColor" stroke-width="2"/>
          </svg>
        </button>
      </div>

      <!-- Right Side Action Stack -->
      <aside class="right-actions-stack">
        <div class="action-slot">
          <button class="action-circle-btn like-trigger" aria-label="Like Reel" data-liked="false">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2">
              <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
            </svg>
          </button>
          <span class="action-label like-count">48.2K</span>
        </div>

        <div class="action-slot">
          <button class="action-circle-btn comment-trigger" aria-label="View Comments">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" stroke="none">
              <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM7 11c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm5 0c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm5 0c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z"/>
            </svg>
          </button>
          <span class="action-label">2,410</span>
        </div>

        <div class="action-slot">
          <button class="action-circle-btn share-trigger" aria-label="Share Reel">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <path d="m22 2-7 20-4-9-9-4Z"/>
              <path d="M22 2 11 13"/>
            </svg>
          </button>
        </div>

        <div class="action-slot">
          <button class="action-circle-btn more-trigger" aria-label="Options">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <circle cx="12" cy="5" r="2.2"/>
              <circle cx="12" cy="12" r="2.2"/>
              <circle cx="12" cy="19" r="2.2"/>
            </svg>
          </button>
        </div>

        <div class="action-slot music-slot">
          <div class="vinyl-disc-wrapper spin-animation">
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=120&auto=format&fit=crop"
              alt="Track Artwork"
              class="vinyl-artwork"
            />
            <div class="lime-note-pill">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor" stroke="none">
                <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
              </svg>
            </div>
          </div>
        </div>
      </aside>
    </article>

    <!-- ==================== REEL SLIDE 3: ARIA (Tokyo Shibuya Night) ==================== -->
    <article class="reel-slide" data-slide="3">
      <div class="reel-media-bg">
        <img
          src="https://images.unsplash.com/photo-1503899036084-c55cdd92da26?q=80&w=1200&auto=format&fit=crop"
          alt="Shibuya Neon Rain"
          class="bg-image"
        />
        <div class="scenic-overlay-gradient"></div>
      </div>

      <!-- Creator Header -->
      <div class="creator-card-row">
        <div class="avatar-ring-wrap">
          <img
            src="https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=200&auto=format&fit=crop"
            alt="Aria"
            class="creator-avatar-img"
          />
        </div>
        <div class="creator-text-col">
          <div class="creator-title-line">
            <span class="creator-name">Aria Takahashi</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="#38bdf8" class="verified-badge"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
          </div>
          <div class="creator-caption">
            <span class="emoji-flame">🌧️</span>
            <span class="caption-text">Midnight reflections in neon Shibuya</span>
          </div>
        </div>
        <button class="follow-lime-btn follow-toggle" data-following="false">Follow</button>
      </div>

      <!-- Center Play/Pause Button -->
      <div class="center-play-container">
        <button class="center-play-circle play-pause-trigger" aria-label="Play / Pause">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
            <polygon points="6 3 20 12 6 21 6 3"/>
          </svg>
        </button>
      </div>

      <!-- Bottom Left Audio Toggle -->
      <div class="bottom-left-speaker">
        <button class="frosted-icon-circle speaker-trigger" aria-label="Toggle Audio">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
            <path d="M15.54 8.46a5 5 0 0 1 0 7.07" fill="none" stroke="currentColor" stroke-width="2"/>
          </svg>
        </button>
      </div>

      <!-- Right Side Action Stack -->
      <aside class="right-actions-stack">
        <div class="action-slot">
          <button class="action-circle-btn like-trigger" aria-label="Like Reel" data-liked="false">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2">
              <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
            </svg>
          </button>
          <span class="action-label like-count">82.9K</span>
        </div>

        <div class="action-slot">
          <button class="action-circle-btn comment-trigger" aria-label="View Comments">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" stroke="none">
              <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM7 11c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm5 0c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm5 0c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z"/>
            </svg>
          </button>
          <span class="action-label">4,890</span>
        </div>

        <div class="action-slot">
          <button class="action-circle-btn share-trigger" aria-label="Share Reel">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <path d="m22 2-7 20-4-9-9-4Z"/>
              <path d="M22 2 11 13"/>
            </svg>
          </button>
        </div>

        <div class="action-slot">
          <button class="action-circle-btn more-trigger" aria-label="Options">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <circle cx="12" cy="5" r="2.2"/>
              <circle cx="12" cy="12" r="2.2"/>
              <circle cx="12" cy="19" r="2.2"/>
            </svg>
          </button>
        </div>

        <div class="action-slot music-slot">
          <div class="vinyl-disc-wrapper spin-animation">
            <img
              src="https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=120&auto=format&fit=crop"
              alt="Track Artwork"
              class="vinyl-artwork"
            />
            <div class="lime-note-pill">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor" stroke="none">
                <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
              </svg>
            </div>
          </div>
        </div>
      </aside>
    </article>

    <!-- Bottom Sticky Overlay: Navigation Dock Capsule + Floating Round Search Button -->
    <div class="bottom-dock-wrapper">
      <nav class="frosted-dock-capsule">
        <!-- Home -->
        <button class="dock-tab-btn" data-tab="home" aria-label="Home">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
            <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
          </svg>
        </button>

        <!-- Stats / Graph -->
        <button class="dock-tab-btn" data-tab="stats" aria-label="Analytics">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
            <rect width="18" height="18" x="3" y="3" rx="2"/>
            <path d="m8 14 3-3 2 2 4-4"/>
          </svg>
        </button>

        <!-- Center Active Reels / Clapperboard Button (Bright Lime Green Circle) -->
        <button class="dock-tab-btn active-lime-tab" data-tab="reels" aria-label="Active Reels">
          <div class="lime-film-circle">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="none">
              <path d="M19.82 2H4.18C2.97 2 2 2.97 2 4.18v15.64C2 21.03 2.97 22 4.18 22h15.64c1.21 0 2.18-.97 2.18-2.18V4.18C22 2.97 21.03 2 19.82 2zM4 4h2.5l2 4H6L4 4zm4.5 4-2-4h3l2 4h-3zm5 0-2-4h3l2 4h-3zm5 0-2-4H20l-2 4h-1.5z"/>
            </svg>
          </div>
        </button>

        <!-- User Profile -->
        <button class="dock-tab-btn" data-tab="profile" aria-label="Profile">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/>
            <circle cx="12" cy="7" r="4"/>
          </svg>
        </button>
      </nav>

      <!-- Separate Circular Search Button on Right -->
      <button class="frosted-search-circle" id="search-btn" aria-label="Search">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="11" cy="11" r="8"/>
          <path d="m21 21-4.3-4.3"/>
        </svg>
      </button>
    </div>

    <!-- Bottom Video Progress Scrubber Bar -->
    <div class="reel-progress-track">
      <div class="reel-progress-fill" id="progress-fill"></div>
    </div>
  </div>

  <script src="script.js"></script>
</body>
</html>`,
        css: `:root {
  --font-family: 'Plus Jakarta Sans', 'Outfit', -apple-system, BlinkMacSystemFont, sans-serif;
  --lime-accent: #a3e635;
  --lime-accent-glow: rgba(163, 230, 53, 0.45);
  --frosted-bg: rgba(255, 255, 255, 0.22);
  --frosted-border: rgba(255, 255, 255, 0.28);
  --frosted-blur: 24px;
  --text-white: #ffffff;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: var(--font-family);
  -webkit-font-smoothing: antialiased;
}

html, body {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  background: transparent;
  overflow: hidden;
  user-select: none;
}

/* Snap-Scrollable Full Bleed Feed Container */
.reels-feed-container {
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  scroll-snap-type: y mandatory;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
  -ms-overflow-style: none;
  position: relative;
}

.reels-feed-container::-webkit-scrollbar {
  display: none;
}

/* Each Full Screen Reel Slide */
.reel-slide {
  width: 100%;
  height: 100%;
  min-height: 100%;
  scroll-snap-align: start;
  scroll-snap-stop: always;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

/* Background Media & Atmospheric Gradient */
.reel-media-bg {
  position: absolute;
  inset: 0;
  z-index: 1;
}

.bg-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

.scenic-overlay-gradient {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0.35) 0%,
    rgba(0, 0, 0, 0.05) 28%,
    rgba(0, 0, 0, 0.1) 60%,
    rgba(0, 0, 0, 0.65) 100%
  );
}

/* Top Sticky Overlay Layer */
.top-overlay-layer {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 30;
  pointer-events: none;
}

.top-overlay-layer button,
.top-overlay-layer .frosted-icon-circle {
  pointer-events: auto;
}

/* Status Bar & Dynamic Island */
.status-bar-row {
  height: 46px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  color: var(--text-white);
}

.status-clock {
  font-size: 14px;
  font-weight: 700;
  letter-spacing: -0.2px;
}

.dynamic-island-notch {
  width: 110px;
  height: 28px;
  background: #000000;
  border-radius: 20px;
  margin-top: 2px;
}

.status-right-icons {
  display: flex;
  align-items: center;
  gap: 6px;
}

.battery-badge {
  display: flex;
  align-items: center;
  gap: 3px;
  font-size: 12px;
  font-weight: 700;
}

.battery-num {
  font-size: 11px;
}

.battery-body {
  width: 22px;
  height: 11px;
  border: 1.5px solid #ffffff;
  border-radius: 3px;
  padding: 1px;
  position: relative;
}

.battery-body::after {
  content: '';
  position: absolute;
  right: -3.5px;
  top: 2.5px;
  width: 2px;
  height: 4px;
  background: #ffffff;
  border-radius: 0 1px 1px 0;
}

.battery-fill {
  width: 70%;
  height: 100%;
  background: #ffffff;
  border-radius: 1px;
}

/* Top App Bar */
.reels-header {
  padding: 4px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.reels-title {
  font-size: 26px;
  font-weight: 800;
  color: #ffffff;
  letter-spacing: -0.5px;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);
}

.frosted-icon-circle {
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background: var(--frosted-bg);
  backdrop-filter: blur(var(--frosted-blur));
  -webkit-backdrop-filter: blur(var(--frosted-blur));
  border: 1px solid var(--frosted-border);
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.25), inset 0 1px 1px rgba(255, 255, 255, 0.4);
  transition: transform 0.2s ease, background 0.2s ease;
}

.frosted-icon-circle:hover {
  background: rgba(255, 255, 255, 0.32);
  transform: scale(1.05);
}

.frosted-icon-circle:active {
  transform: scale(0.95);
}

/* Creator Profile Bar */
.creator-card-row {
  position: absolute;
  top: 110px;
  left: 20px;
  right: 20px;
  z-index: 15;
  display: flex;
  align-items: center;
  gap: 10px;
}

.avatar-ring-wrap {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  padding: 2px;
  background: linear-gradient(135deg, #ffffff, rgba(255, 255, 255, 0.6));
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.35);
  flex-shrink: 0;
}

.creator-avatar-img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
}

.creator-text-col {
  display: flex;
  flex-direction: column;
  gap: 2px;
  flex: 1;
}

.creator-title-line {
  display: flex;
  align-items: center;
  gap: 5px;
}

.creator-name {
  color: #ffffff;
  font-size: 16px;
  font-weight: 800;
  text-shadow: 0 2px 6px rgba(0, 0, 0, 0.5);
  line-height: 1.2;
}

.creator-caption {
  display: flex;
  align-items: center;
  gap: 4px;
}

.emoji-flame {
  font-size: 13px;
}

.caption-text {
  color: rgba(255, 255, 255, 0.92);
  font-size: 12.5px;
  font-weight: 500;
  text-shadow: 0 2px 6px rgba(0, 0, 0, 0.5);
}

.follow-lime-btn {
  background: var(--lime-accent);
  color: #000000;
  font-size: 13px;
  font-weight: 700;
  padding: 6px 18px;
  border-radius: 9999px;
  border: none;
  cursor: pointer;
  box-shadow: 0 4px 16px var(--lime-accent-glow);
  transition: all 0.2s ease;
  white-space: nowrap;
}

.follow-lime-btn:hover {
  transform: translateY(-1px) scale(1.03);
  filter: brightness(1.06);
}

.follow-lime-btn:active {
  transform: scale(0.96);
}

/* Center Frosted Play/Pause Button */
.center-play-container {
  position: absolute;
  inset: 0;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
}

.center-play-circle {
  pointer-events: auto;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.28);
  backdrop-filter: blur(28px);
  -webkit-backdrop-filter: blur(28px);
  border: 1.5px solid rgba(255, 255, 255, 0.45);
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 12px 35px rgba(0, 0, 0, 0.4), inset 0 2px 4px rgba(255, 255, 255, 0.5);
  cursor: pointer;
  transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1), background 0.2s ease;
}

.center-play-circle:hover {
  transform: scale(1.12);
  background: rgba(255, 255, 255, 0.38);
}

.center-play-circle:active {
  transform: scale(0.92);
}

/* Bottom Left Speaker */
.bottom-left-speaker {
  position: absolute;
  bottom: 96px;
  left: 20px;
  z-index: 15;
}

/* Right Side Vertical Action Stack */
.right-actions-stack {
  position: absolute;
  bottom: 84px;
  right: 16px;
  z-index: 15;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}

.action-slot {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}

.action-circle-btn {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.22);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.3);
  transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1), background 0.2s ease;
}

.action-circle-btn:hover {
  transform: scale(1.1);
  background: rgba(255, 255, 255, 0.32);
}

.action-circle-btn:active {
  transform: scale(0.9);
}

.action-label {
  color: #ffffff;
  font-size: 11.5px;
  font-weight: 700;
  text-shadow: 0 2px 6px rgba(0, 0, 0, 0.6);
  letter-spacing: 0.2px;
}

/* Vinyl Audio Disc */
.music-slot {
  margin-top: 4px;
}

.vinyl-disc-wrapper {
  width: 46px;
  height: 46px;
  border-radius: 50%;
  background: #111111;
  padding: 3px;
  border: 2px solid #222222;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.6);
  position: relative;
  cursor: pointer;
}

.vinyl-artwork {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
}

.lime-note-pill {
  position: absolute;
  top: -2px;
  left: -2px;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: var(--lime-accent);
  color: #000000;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.4);
}

.spin-animation {
  animation: vinylSpin 5s linear infinite;
}

@keyframes vinylSpin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* Bottom Navigation Dock Capsule + Floating Round Search Button */
.bottom-dock-wrapper {
  position: absolute;
  bottom: 20px;
  left: 20px;
  right: 20px;
  z-index: 30;
  display: flex;
  align-items: center;
  gap: 12px;
  pointer-events: none;
}

.frosted-dock-capsule {
  pointer-events: auto;
  flex: 1;
  height: 58px;
  border-radius: 9999px;
  background: rgba(255, 255, 255, 0.22);
  backdrop-filter: blur(28px);
  -webkit-backdrop-filter: blur(28px);
  border: 1px solid rgba(255, 255, 255, 0.35);
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 0 10px;
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.4), inset 0 1px 1px rgba(255, 255, 255, 0.45);
}

.dock-tab-btn {
  background: none;
  border: none;
  color: rgba(255, 255, 255, 0.75);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: 8px;
  border-radius: 50%;
  transition: all 0.2s ease;
}

.dock-tab-btn:hover {
  color: #ffffff;
  transform: scale(1.1);
}

.active-lime-tab .lime-film-circle {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: var(--lime-accent);
  color: #000000;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 18px var(--lime-accent-glow);
  transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.active-lime-tab .lime-film-circle:hover {
  transform: scale(1.08);
}

.frosted-search-circle {
  pointer-events: auto;
  width: 58px;
  height: 58px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.22);
  backdrop-filter: blur(28px);
  -webkit-backdrop-filter: blur(28px);
  border: 1px solid rgba(255, 255, 255, 0.35);
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.4), inset 0 1px 1px rgba(255, 255, 255, 0.45);
  flex-shrink: 0;
  transition: all 0.2s ease;
}

.frosted-search-circle:hover {
  background: rgba(255, 255, 255, 0.32);
  transform: scale(1.08);
}

.frosted-search-circle:active {
  transform: scale(0.94);
}

/* Video Progress Scrubber Track */
.reel-progress-track {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: rgba(255, 255, 255, 0.2);
  z-index: 30;
}

.reel-progress-fill {
  height: 100%;
  width: 35%;
  background: #ffffff;
  box-shadow: 0 0 8px rgba(255, 255, 255, 0.8);
  transition: width 0.1s linear;
}
`,
        js: `document.addEventListener('DOMContentLoaded', () => {
  const reelsFeed = document.getElementById('reels-feed');
  const progressFill = document.getElementById('progress-fill');
  let isPlaying = true;
  let progress = 35;

  // 1. Follow Buttons Toggle
  const followButtons = document.querySelectorAll('.follow-toggle');
  followButtons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isFollowing = btn.getAttribute('data-following') === 'true';
      if (!isFollowing) {
        btn.setAttribute('data-following', 'true');
        btn.textContent = 'Following';
        btn.style.background = 'rgba(255, 255, 255, 0.25)';
        btn.style.color = '#ffffff';
      } else {
        btn.setAttribute('data-following', 'false');
        btn.textContent = 'Follow';
        btn.style.background = '#a3e635';
        btn.style.color = '#000000';
      }
    });
  });

  // 2. Interactive Like Triggers
  const likeTriggers = document.querySelectorAll('.like-trigger');
  likeTriggers.forEach((likeBtn) => {
    likeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isLiked = likeBtn.getAttribute('data-liked') === 'true';
      const slot = likeBtn.closest('.action-slot');
      const countEl = slot ? slot.querySelector('.like-count') : null;

      likeBtn.style.transform = 'scale(1.3)';
      setTimeout(() => {
        likeBtn.style.transform = 'scale(1)';
      }, 180);

      const svg = likeBtn.querySelector('svg');
      if (svg) {
        if (!isLiked) {
          likeBtn.setAttribute('data-liked', 'true');
          svg.setAttribute('fill', '#ef4444');
          svg.setAttribute('stroke', '#ef4444');
          if (countEl && countEl.textContent.includes('2,6000')) countEl.textContent = '2,6001';
          else if (countEl && countEl.textContent.includes('48.2K')) countEl.textContent = '48.3K';
          else if (countEl && countEl.textContent.includes('82.9K')) countEl.textContent = '83.0K';
        } else {
          likeBtn.setAttribute('data-liked', 'false');
          svg.setAttribute('fill', 'none');
          svg.setAttribute('stroke', '#ffffff');
          if (countEl && countEl.textContent.includes('2,6001')) countEl.textContent = '2,6000';
          else if (countEl && countEl.textContent.includes('48.3K')) countEl.textContent = '48.2K';
          else if (countEl && countEl.textContent.includes('83.0K')) countEl.textContent = '82.9K';
        }
      }
    });
  });

  // 3. Play / Pause Triggers
  const playButtons = document.querySelectorAll('.play-pause-trigger');
  playButtons.forEach((playBtn) => {
    playBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      isPlaying = !isPlaying;
      const discs = document.querySelectorAll('.vinyl-disc-wrapper');

      playButtons.forEach((btn) => {
        if (isPlaying) {
          btn.innerHTML = '<svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><polygon points="6 3 20 12 6 21 6 3"/></svg>';
        } else {
          btn.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>';
        }
      });

      discs.forEach((disc) => {
        if (isPlaying) disc.classList.add('spin-animation');
        else disc.classList.remove('spin-animation');
      });
    });
  });

  // 4. Audio Mute Triggers
  const speakerButtons = document.querySelectorAll('.speaker-trigger');
  let isMuted = false;
  speakerButtons.forEach((spkBtn) => {
    spkBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      isMuted = !isMuted;
      speakerButtons.forEach((b) => {
        b.style.transform = 'scale(1.15)';
        setTimeout(() => (b.style.transform = 'scale(1)'), 120);
        if (isMuted) {
          b.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="1" y1="1" x2="23" y2="23"/><path d="M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V4a3 3 0 0 0-5.94-.6"/></svg>';
        } else {
          b.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07" fill="none" stroke="currentColor" stroke-width="2"/></svg>';
        }
      });
    });
  });

  // 5. Progress Bar Simulation
  setInterval(() => {
    if (isPlaying && progressFill) {
      progress = (progress + 0.4) % 100;
      progressFill.style.width = progress + '%';
    }
  }, 100);

  // 6. Navigation Dock Tabs
  const dockTabs = document.querySelectorAll('.dock-tab-btn');
  dockTabs.forEach((tab) => {
    tab.addEventListener('click', (e) => {
      e.stopPropagation();
      dockTabs.forEach((t) => t.classList.remove('active-lime-tab'));
      tab.classList.add('active-lime-tab');
    });
  });

  // 7. Keyboard Navigation (Arrow Up / Arrow Down to slide reels)
  window.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown') {
      if (reelsFeed) reelsFeed.scrollBy({ top: window.innerHeight, behavior: 'smooth' });
    } else if (e.key === 'ArrowUp') {
      if (reelsFeed) reelsFeed.scrollBy({ top: -window.innerHeight, behavior: 'smooth' });
    }
  });
});
`
      }
    }
  ],
  versionHistory: [
    {
      version: 1,
      timestamp: new Date().toISOString(),
      summary: 'High-Fidelity Reel Vector Reconstruction with Exact Glassmorphism & SVG Icons',
      screens: []
    }
  ],
  promptLogs: []
};

export const SAMPLE_PROJECTS: ProjectSpec[] = [
  REELS_SIENNA_PROJECT,
  {
    id: 'sample-yoga-wellness',
    name: 'Yoga & Mindful Meditation Suite',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    imageDimensions: { width: 1504, height: 1128 },
    originalImageBase64: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?q=80&w=1200&auto=format&fit=crop',
    selectedScreenId: 'screen-yoga-home',
    screens: [
      {
        id: 'screen-yoga-onboard',
        title: 'Screen 1: Mindful Onboarding',
        type: 'mobile',
        frame: { x: 52, y: 99, width: 390, height: 844, radius: 44, deviceType: 'mobile' },
        background: {
          baseColor: '#283630',
          gradient: 'radial-gradient(circle at 50% 20%, #3d5349 0%, #1f2a25 100%)'
        },
        effects: {
          detected: true,
          blur: '24px',
          glassOpacity: 0.18,
          borderOpacity: 0.22,
          innerGlow: '0 0 20px rgba(120, 190, 160, 0.15)',
          boxShadow: '0 25px 60px rgba(0,0,0,0.45)'
        },
        designTokens: {
          colors: [
            { name: 'Forest Primary', value: '#24332c', role: 'background' },
            { name: 'Sage Glow', value: '#507565', role: 'surface' },
            { name: 'Pure Snow', value: '#ffffff', role: 'text' },
            { name: 'Muted Mint', value: '#a3c2b4', role: 'textSecondary' },
            { name: 'Emerald Button', value: '#48a87d', role: 'accent' },
            { name: 'Glass Border', value: 'rgba(255, 255, 255, 0.18)', role: 'border' }
          ],
          typography: [
            { role: 'Display Heading', fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: '36px', fontWeight: 700, lineHeight: '1.15', color: '#ffffff' },
            { role: 'Body Lead', fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: '16px', fontWeight: 400, lineHeight: '1.6', color: '#c2dbcf' },
            { role: 'Button CTA', fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: '17px', fontWeight: 600, lineHeight: '1', color: '#ffffff' }
          ],
          radius: { small: 12, medium: 20, large: 32, pill: 999 },
          spacing: [8, 16, 24, 32, 48]
        },
        components: [
          {
            id: 'c1',
            name: 'Hero Visual Canvas',
            type: 'hero',
            bounds: { x: 0, y: 0, width: 390, height: 500 },
            visualDetails: { borderRadius: 32, glassEffect: false }
          },
          {
            id: 'c2',
            name: 'Glass Card Sheet',
            type: 'card',
            bounds: { x: 20, y: 460, width: 350, height: 340 },
            visualDetails: { background: 'rgba(255, 255, 255, 0.12)', borderRadius: 28, border: '1px solid rgba(255, 255, 255, 0.2)', glassEffect: true }
          },
          {
            id: 'c3',
            name: 'Start Journey Button',
            type: 'button',
            bounds: { x: 36, y: 710, width: 318, height: 56 },
            visualDetails: { background: '#48a87d', borderRadius: 999, textColor: '#ffffff' }
          }
        ],
        icons: [
          { id: 'i1', name: 'Sparkles', matchedLibrary: 'Lucide', iconKey: 'sparkles', confidence: 0.98, category: 'General', status: 'matched', matchType: 'exact', downloaded: true, svgMarkup: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3z"/></svg>' },
          { id: 'i2', name: 'Arrow Right', matchedLibrary: 'Lucide', iconKey: 'arrow-right', confidence: 0.96, category: 'Navigation', status: 'matched', matchType: 'exact', downloaded: true, svgMarkup: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14m-7-7 7 7-7 7"/></svg>' },
          { id: 'i3', name: 'Check Circle', matchedLibrary: 'Lucide', iconKey: 'check-circle', confidence: 0.94, category: 'Status', status: 'matched', matchType: 'exact', downloaded: true, svgMarkup: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>' },
          { id: 'i4', name: 'Flame Workout', matchedLibrary: 'Lucide', iconKey: 'flame', confidence: 0.91, category: 'Fitness', status: 'matched', matchType: 'closest', downloaded: true, svgMarkup: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg>' }
        ],
        assets: [
          {
            id: 'a1',
            name: 'Yoga Hero Master',
            role: 'hero',
            aspectRatio: '3:4',
            detectedDescription: 'Serene woman in sage workout apparel meditating in clean warm sunlit studio',
            searchKeywords: 'woman yoga meditation serene indoor sunlight',
            matchedUrl: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?q=80&w=800&auto=format&fit=crop',
            thumbnailUrl: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?q=80&w=200&auto=format&fit=crop',
            source: 'Unsplash',
            license: 'Free Commercial (Unsplash License)',
            author: 'Dane Wetton',
            downloaded: true
          }
        ],
        matchScore: { overall: 96, layout: 98, typography: 95, colors: 97, spacing: 94, components: 97, images: 98, effects: 96 },
        differences: [
          { id: 'd1', type: 'effect', description: 'Backdrop blur filter increased from 18px to 24px for smoother frosted glass depth', severity: 'low', fixSuggestion: 'Apply backdrop-filter: blur(24px)', applied: true },
          { id: 'd2', type: 'typography', description: 'Hero heading letter-spacing adjusted to -0.02em for editorial display feel', severity: 'low', fixSuggestion: 'Set letter-spacing: -0.02em', applied: true }
        ],
        generatedCode: {
          html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Prana — Mindful Meditation</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <div class="device-frame" id="app">
    <div class="status-bar">
      <span class="time">9:41</span>
      <div class="status-icons">
        <svg width="18" height="12" viewBox="0 0 18 12" fill="currentColor"><path d="M1 8h2v4H1zm4-3h2v7H5zm4-3h2v10H9zm4-2h2v12h-2z"/></svg>
        <svg width="16" height="12" viewBox="0 0 16 12" fill="currentColor"><path d="M8 2.5C4.8 2.5 2.1 3.9.4 6 2.1 8.1 4.8 9.5 8 9.5s5.9-1.4 7.6-3.5C13.9 3.9 11.2 2.5 8 2.5z"/></svg>
        <span class="battery">100%</span>
      </div>
    </div>

    <div class="hero-image-container">
      <img src="https://images.unsplash.com/photo-1545205597-3d9d02c29597?q=80&w=800&auto=format&fit=crop" alt="Yoga Master" class="hero-img" />
      <div class="hero-gradient-overlay"></div>
    </div>

    <div class="floating-badge">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3z"/></svg>
      <span>Daily Zen Flow</span>
    </div>

    <div class="glass-sheet">
      <div class="sheet-indicator"></div>
      <h1 class="sheet-title">Find Balance & Inner Harmony</h1>
      <p class="sheet-description">
        Immerse yourself in gentle guided morning flows, restorative evening soundscapes, and breath-centered movement.
      </p>

      <div class="feature-pills">
        <div class="pill">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>
          <span>450+ Guided Flows</span>
        </div>
        <div class="pill">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
          <span>Offline Audio</span>
        </div>
      </div>

      <button class="primary-btn" id="start-btn">
        <span>Begin Practice</span>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14m-7-7 7 7-7 7"/></svg>
      </button>

      <p class="signin-subtext">Already have an account? <a href="#" class="accent-link">Sign In</a></p>
    </div>
  </div>
  <script src="script.js"></script>
</body>
</html>`,
          css: `:root {
  --bg-dark: #1f2b25;
  --bg-gradient: radial-gradient(circle at 50% 20%, #34483e 0%, #17211d 100%);
  --surface-glass: rgba(255, 255, 255, 0.11);
  --border-glass: rgba(255, 255, 255, 0.18);
  --text-primary: #ffffff;
  --text-muted: #b8d4c7;
  --accent-emerald: #48a87d;
  --accent-emerald-hover: #3d936c;
  --radius-xl: 32px;
  --radius-lg: 24px;
  --radius-pill: 999px;
  --blur-amount: 24px;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Plus Jakarta Sans', -apple-system, sans-serif;
  -webkit-font-smoothing: antialiased;
}

body {
  background: #0f1412;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 20px;
}

.device-frame {
  width: 100%;
  max-width: 390px;
  height: 844px;
  background: var(--bg-gradient);
  border-radius: 44px;
  position: relative;
  overflow: hidden;
  box-shadow: 0 30px 80px rgba(0, 0, 0, 0.7), 0 0 0 1px rgba(255, 255, 255, 0.12);
  display: flex;
  flex-direction: column;
}

.status-bar {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 20;
  height: 48px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 24px;
  color: var(--text-primary);
  font-size: 14px;
  font-weight: 600;
}

.status-icons {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
}

.hero-image-container {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 520px;
  overflow: hidden;
}

.hero-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 20%;
  transform: scale(1.05);
  transition: transform 1.2s ease-out;
}

.hero-gradient-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    180deg,
    rgba(31, 43, 37, 0.1) 0%,
    rgba(31, 43, 37, 0.4) 50%,
    rgba(23, 33, 29, 0.95) 100%
  );
}

.floating-badge {
  position: absolute;
  top: 68px;
  left: 24px;
  z-index: 10;
  background: rgba(31, 43, 37, 0.65);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: var(--text-primary);
  padding: 8px 16px;
  border-radius: var(--radius-pill);
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  font-weight: 600;
  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.2);
}

.floating-badge svg {
  color: #79d7a8;
}

.glass-sheet {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: var(--surface-glass);
  backdrop-filter: blur(var(--blur-amount));
  -webkit-backdrop-filter: blur(var(--blur-amount));
  border-top: 1px solid var(--border-glass);
  border-radius: 36px 36px 0 0;
  padding: 24px 28px 36px;
  z-index: 15;
  box-shadow: 0 -20px 50px rgba(0, 0, 0, 0.35);
  display: flex;
  flex-direction: column;
}

.sheet-indicator {
  width: 40px;
  height: 4px;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 2px;
  margin: 0 auto 20px;
}

.sheet-title {
  color: var(--text-primary);
  font-size: 30px;
  font-weight: 700;
  line-height: 1.18;
  letter-spacing: -0.02em;
  margin-bottom: 12px;
}

.sheet-description {
  color: var(--text-muted);
  font-size: 14.5px;
  line-height: 1.55;
  margin-bottom: 22px;
}

.feature-pills {
  display: flex;
  gap: 10px;
  margin-bottom: 26px;
  flex-wrap: wrap;
}

.pill {
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.12);
  padding: 7px 14px;
  border-radius: var(--radius-pill);
  color: #d1e7dc;
  font-size: 12.5px;
  font-weight: 500;
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.pill svg {
  color: #79d7a8;
}

.primary-btn {
  background: var(--accent-emerald);
  color: #ffffff;
  border: none;
  border-radius: var(--radius-pill);
  height: 56px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  font-size: 16.5px;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 12px 30px rgba(72, 168, 125, 0.35);
  transition: all 0.25s cubic-bezier(0.2, 0.8, 0.2, 1);
}

.primary-btn:hover {
  background: var(--accent-emerald-hover);
  transform: translateY(-2px);
  box-shadow: 0 16px 36px rgba(72, 168, 125, 0.45);
}

.primary-btn:active {
  transform: translateY(0);
}

.signin-subtext {
  text-align: center;
  margin-top: 16px;
  font-size: 13.5px;
  color: var(--text-muted);
}

.accent-link {
  color: #79d7a8;
  text-decoration: none;
  font-weight: 600;
  margin-left: 4px;
}

.accent-link:hover {
  text-decoration: underline;
}`,
          js: `document.addEventListener('DOMContentLoaded', () => {
  const startBtn = document.getElementById('start-btn');
  const heroImg = document.querySelector('.hero-img');

  startBtn.addEventListener('click', () => {
    startBtn.style.transform = 'scale(0.96)';
    setTimeout(() => {
      startBtn.style.transform = 'scale(1)';
      alert('Welcome to Prana! Starting your personalized onboarding flow.');
    }, 150);
  });

  // Gentle subtle zoom on load
  setTimeout(() => {
    if (heroImg) {
      heroImg.style.transform = 'scale(1.0)';
    }
  }, 100);
});`
        }
      },
      {
        id: 'screen-yoga-home',
        title: 'Screen 2: Home Dashboard',
        type: 'mobile',
        frame: { x: 504, y: 99, width: 390, height: 844, radius: 44, deviceType: 'mobile' },
        background: {
          baseColor: '#25342d',
          gradient: 'radial-gradient(circle at top right, #34483e 0%, #19231f 100%)'
        },
        effects: {
          detected: true,
          blur: '24px',
          glassOpacity: 0.12,
          borderOpacity: 0.18,
          innerGlow: '0 0 25px rgba(100, 200, 160, 0.12)',
          boxShadow: '0 25px 60px rgba(0,0,0,0.5)'
        },
        designTokens: {
          colors: [
            { name: 'Forest Dark', value: '#19231f', role: 'background' },
            { name: 'Frosted Emerald', value: 'rgba(255, 255, 255, 0.09)', role: 'surface' },
            { name: 'Pure White', value: '#ffffff', role: 'text' },
            { name: 'Mint Light', value: '#83bba3', role: 'accent' },
            { name: 'Soft Gray', value: '#a9c7bb', role: 'textSecondary' }
          ],
          typography: [
            { role: 'Greeting Header', fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: '24px', fontWeight: 700, lineHeight: '1.2', color: '#ffffff' },
            { role: 'Section Title', fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: '18px', fontWeight: 600, lineHeight: '1.3', color: '#ffffff' }
          ],
          radius: { small: 14, medium: 22, large: 28, pill: 999 },
          spacing: [8, 14, 20, 26]
        },
        components: [
          {
            id: 'h1',
            name: 'Top Header Bar & Avatar',
            type: 'header',
            bounds: { x: 20, y: 50, width: 350, height: 60 },
            visualDetails: { glassEffect: false }
          },
          {
            id: 'h2',
            name: 'Featured Daily Session Card',
            type: 'card',
            bounds: { x: 20, y: 140, width: 350, height: 210 },
            visualDetails: { background: 'rgba(255, 255, 255, 0.1)', borderRadius: 28, glassEffect: true }
          },
          {
            id: 'h3',
            name: 'Recommendation Horizontal Row',
            type: 'list',
            bounds: { x: 20, y: 380, width: 350, height: 240 },
            visualDetails: { glassEffect: false }
          },
          {
            id: 'h4',
            name: 'Floating Glass Navigation Bar',
            type: 'navigation',
            bounds: { x: 20, y: 740, width: 350, height: 72 },
            visualDetails: { background: 'rgba(23, 33, 29, 0.85)', borderRadius: 999, glassEffect: true }
          }
        ],
        icons: [
          { id: 'i3', name: 'Bell', matchedLibrary: 'Lucide', iconKey: 'bell', confidence: 0.99, category: 'Header', status: 'matched' },
          { id: 'i4', name: 'Play', matchedLibrary: 'Lucide', iconKey: 'play', confidence: 0.99, category: 'Media', status: 'matched' },
          { id: 'i5', name: 'Home', matchedLibrary: 'Lucide', iconKey: 'home', confidence: 0.99, category: 'Navigation', status: 'matched' },
          { id: 'i6', name: 'Compass', matchedLibrary: 'Lucide', iconKey: 'compass', confidence: 0.97, category: 'Navigation', status: 'matched' },
          { id: 'i7', name: 'Bookmark', matchedLibrary: 'Lucide', iconKey: 'bookmark', confidence: 0.95, category: 'Navigation', status: 'matched' },
          { id: 'i8', name: 'User', matchedLibrary: 'Lucide', iconKey: 'user', confidence: 0.98, category: 'Navigation', status: 'matched' }
        ],
        assets: [
          {
            id: 'a2',
            name: 'Morning Vinyasa Flow Card',
            role: 'card_thumbnail',
            aspectRatio: '16:9',
            detectedDescription: 'Serene yogi in sunset stretch pose',
            searchKeywords: 'morning vinyasa yoga woman sunset peaceful',
            matchedUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=800&auto=format&fit=crop',
            thumbnailUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=200&auto=format&fit=crop',
            source: 'Unsplash',
            license: 'Free Commercial',
            author: 'Kike Vega',
            downloaded: true
          },
          {
            id: 'a3',
            name: 'Breathing Bubble Soundscape',
            role: 'card_thumbnail',
            aspectRatio: '4:3',
            detectedDescription: 'Deep breath meditation studio forest atmosphere',
            searchKeywords: 'meditation calm nature ambient',
            matchedUrl: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=800&auto=format&fit=crop',
            thumbnailUrl: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=200&auto=format&fit=crop',
            source: 'Unsplash',
            license: 'Free Commercial',
            author: 'Prasanth Inturi',
            downloaded: true
          }
        ],
        matchScore: { overall: 97, layout: 98, typography: 96, colors: 98, spacing: 95, components: 98, images: 97, effects: 97 },
        differences: [
          { id: 'd3', type: 'spacing', description: 'Horizontal scroll gap unified to 14px', severity: 'low', fixSuggestion: 'Set gap: 14px', applied: true }
        ],
        generatedCode: {
          html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Prana Dashboard</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <div class="device-frame" id="app">
    <!-- Status Bar -->
    <div class="status-bar">
      <span class="time">9:41</span>
      <div class="status-icons">
        <svg width="18" height="12" viewBox="0 0 18 12" fill="currentColor"><path d="M1 8h2v4H1zm4-3h2v7H5zm4-3h2v10H9zm4-2h2v12h-2z"/></svg>
        <svg width="16" height="12" viewBox="0 0 16 12" fill="currentColor"><path d="M8 2.5C4.8 2.5 2.1 3.9.4 6 2.1 8.1 4.8 9.5 8 9.5s5.9-1.4 7.6-3.5C13.9 3.9 11.2 2.5 8 2.5z"/></svg>
        <span class="battery">100%</span>
      </div>
    </div>

    <!-- Header -->
    <header class="app-header">
      <div class="user-profile">
        <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&auto=format&fit=crop" alt="Aria" class="avatar-img" />
        <div class="user-meta">
          <span class="greeting-sub">Good Morning,</span>
          <h2 class="user-name">Aria Vance</h2>
        </div>
      </div>
      <button class="icon-btn" id="notif-btn" aria-label="Notifications">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>
        <span class="notif-dot"></span>
      </button>
    </header>

    <div class="scroll-content">
      <!-- Search / Mood pill bar -->
      <div class="mood-selector">
        <button class="mood-chip active">🌿 All</button>
        <button class="mood-chip">🧘 Calm</button>
        <button class="mood-chip">⚡ Energy</button>
        <button class="mood-chip">🌙 Sleep</button>
      </div>

      <!-- Featured Master Card -->
      <div class="featured-card">
        <img src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=800&auto=format&fit=crop" alt="Morning Flow" class="featured-img" />
        <div class="featured-overlay"></div>
        <div class="featured-content">
          <div class="tag-row">
            <span class="glass-tag">DAILY RECOMMENDATION</span>
            <span class="duration-tag">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              25 Min
            </span>
          </div>
          <h3 class="featured-title">Morning Vinyasa & Solar Energy</h3>
          <p class="featured-desc">Awaken spine mobility with gentle breath synchronization.</p>
          <div class="card-footer">
            <div class="instructor">
              <span class="ins-name">Elena Rostova • Intermediate</span>
            </div>
            <button class="play-btn-circle" id="hero-play" aria-label="Play">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
            </button>
          </div>
        </div>
      </div>

      <!-- Recommendations Section -->
      <div class="section-header">
        <h3 class="section-title">Mindful Series</h3>
        <a href="#" class="see-all">See All</a>
      </div>

      <div class="horizontal-cards">
        <div class="content-card">
          <div class="card-thumb-wrapper">
            <img src="https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=500&auto=format&fit=crop" alt="Pranayama" class="thumb-img" />
            <span class="card-badge">15 min</span>
          </div>
          <h4 class="card-title">Breathwork Clarity</h4>
          <span class="card-subtitle">Guided Pranayama</span>
        </div>

        <div class="content-card">
          <div class="card-thumb-wrapper">
            <img src="https://images.unsplash.com/photo-1545205597-3d9d02c29597?q=80&w=500&auto=format&fit=crop" alt="Deep Rest" class="thumb-img" />
            <span class="card-badge">30 min</span>
          </div>
          <h4 class="card-title">Yin Yoga Restorative</h4>
          <span class="card-subtitle">Deep Fascial Release</span>
        </div>
      </div>
    </div>

    <!-- Floating Navigation Bar -->
    <nav class="bottom-nav">
      <button class="nav-item active" aria-label="Home">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
        <span>Home</span>
      </button>
      <button class="nav-item" aria-label="Explore">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg>
        <span>Explore</span>
      </button>
      <button class="nav-item" aria-label="Saved">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/></svg>
        <span>Saved</span>
      </button>
      <button class="nav-item" aria-label="Profile">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
        <span>Profile</span>
      </button>
    </nav>
  </div>
  <script src="script.js"></script>
</body>
</html>`,
          css: `:root {
  --bg-gradient: radial-gradient(circle at 80% 10%, #2f443a 0%, #15201b 100%);
  --surface-glass: rgba(255, 255, 255, 0.08);
  --border-glass: rgba(255, 255, 255, 0.15);
  --text-primary: #ffffff;
  --text-secondary: #9fc1b2;
  --accent-emerald: #4eb384;
  --radius-lg: 26px;
  --radius-pill: 999px;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Plus Jakarta Sans', -apple-system, sans-serif;
  -webkit-font-smoothing: antialiased;
}

body {
  background: #0d1210;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 20px;
}

.device-frame {
  width: 100%;
  max-width: 390px;
  height: 844px;
  background: var(--bg-gradient);
  border-radius: 44px;
  position: relative;
  overflow: hidden;
  box-shadow: 0 30px 80px rgba(0, 0, 0, 0.75), 0 0 0 1px rgba(255, 255, 255, 0.12);
  display: flex;
  flex-direction: column;
}

.status-bar {
  height: 44px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 24px;
  color: var(--text-primary);
  font-size: 14px;
  font-weight: 600;
}

.status-icons {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
}

.app-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 24px 16px;
}

.user-profile {
  display: flex;
  align-items: center;
  gap: 12px;
}

.avatar-img {
  width: 44px;
  height: 44px;
  border-radius: var(--radius-pill);
  object-fit: cover;
  border: 2px solid rgba(255, 255, 255, 0.25);
}

.greeting-sub {
  font-size: 12px;
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-weight: 600;
}

.user-name {
  color: var(--text-primary);
  font-size: 18px;
  font-weight: 700;
}

.icon-btn {
  width: 42px;
  height: 42px;
  border-radius: var(--radius-pill);
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid var(--border-glass);
  color: var(--text-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  cursor: pointer;
}

.notif-dot {
  width: 8px;
  height: 8px;
  background: #64e3a8;
  border-radius: 50%;
  position: absolute;
  top: 9px;
  right: 10px;
}

.scroll-content {
  flex: 1;
  overflow-y: auto;
  padding: 0 24px 100px;
  scrollbar-width: none;
}

.scroll-content::-webkit-scrollbar {
  display: none;
}

.mood-selector {
  display: flex;
  gap: 8px;
  margin-bottom: 20px;
  overflow-x: auto;
  scrollbar-width: none;
}

.mood-chip {
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.12);
  color: var(--text-secondary);
  padding: 8px 16px;
  border-radius: var(--radius-pill);
  font-size: 13.5px;
  font-weight: 600;
  white-space: nowrap;
  cursor: pointer;
  transition: all 0.2s;
}

.mood-chip.active {
  background: #39574a;
  border-color: #5c9179;
  color: #ffffff;
}

.featured-card {
  position: relative;
  border-radius: var(--radius-lg);
  overflow: hidden;
  height: 240px;
  border: 1px solid var(--border-glass);
  box-shadow: 0 16px 36px rgba(0, 0, 0, 0.35);
  margin-bottom: 24px;
}

.featured-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.featured-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(15, 26, 21, 0.2) 0%, rgba(15, 26, 21, 0.88) 100%);
}

.featured-content {
  position: absolute;
  inset: 0;
  padding: 18px 20px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}

.tag-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.glass-tag {
  font-size: 10.5px;
  font-weight: 700;
  letter-spacing: 0.08em;
  color: #8be4ba;
  background: rgba(45, 90, 70, 0.6);
  backdrop-filter: blur(10px);
  padding: 4px 10px;
  border-radius: 6px;
}

.duration-tag {
  font-size: 12px;
  color: #e2f1ea;
  display: flex;
  align-items: center;
  gap: 4px;
  background: rgba(0, 0, 0, 0.4);
  padding: 4px 10px;
  border-radius: var(--radius-pill);
}

.featured-title {
  color: var(--text-primary);
  font-size: 19px;
  font-weight: 700;
  line-height: 1.25;
  margin-bottom: 4px;
}

.featured-desc {
  color: #c0ded2;
  font-size: 12.5px;
  line-height: 1.4;
  margin-bottom: 12px;
}

.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.ins-name {
  font-size: 12px;
  color: #a4c9b9;
}

.play-btn-circle {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: var(--accent-emerald);
  color: #ffffff;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 8px 20px rgba(78, 179, 132, 0.4);
  transition: transform 0.2s;
}

.play-btn-circle:hover {
  transform: scale(1.08);
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 14px;
}

.section-title {
  color: var(--text-primary);
  font-size: 17px;
  font-weight: 700;
}

.see-all {
  color: var(--accent-emerald);
  font-size: 13px;
  text-decoration: none;
  font-weight: 600;
}

.horizontal-cards {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;
}

.content-card {
  background: var(--surface-glass);
  backdrop-filter: blur(16px);
  border: 1px solid var(--border-glass);
  border-radius: 20px;
  padding: 10px;
  transition: transform 0.2s;
}

.content-card:hover {
  transform: translateY(-3px);
}

.card-thumb-wrapper {
  position: relative;
  height: 110px;
  border-radius: 14px;
  overflow: hidden;
  margin-bottom: 10px;
}

.thumb-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.card-badge {
  position: absolute;
  bottom: 6px;
  right: 6px;
  background: rgba(0, 0, 0, 0.6);
  color: #ffffff;
  font-size: 10px;
  padding: 3px 8px;
  border-radius: 999px;
}

.card-title {
  color: var(--text-primary);
  font-size: 13.5px;
  font-weight: 700;
  margin-bottom: 2px;
}

.card-subtitle {
  color: var(--text-secondary);
  font-size: 11.5px;
}

.bottom-nav {
  position: absolute;
  bottom: 20px;
  left: 20px;
  right: 20px;
  height: 66px;
  background: rgba(19, 29, 24, 0.88);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  border: 1px solid rgba(255, 255, 255, 0.16);
  border-radius: var(--radius-pill);
  display: flex;
  justify-content: space-around;
  align-items: center;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.45);
}

.nav-item {
  background: none;
  border: none;
  color: #799e8e;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  font-size: 11px;
  font-weight: 600;
  cursor: pointer;
  padding: 8px 12px;
  border-radius: 20px;
  transition: color 0.2s;
}

.nav-item.active {
  color: #64e3a8;
}`,
          js: `document.addEventListener('DOMContentLoaded', () => {
  // Mood chips toggle
  const chips = document.querySelectorAll('.mood-chip');
  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      chips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
    });
  });

  // Nav item clicks
  const navs = document.querySelectorAll('.nav-item');
  navs.forEach(nav => {
    nav.addEventListener('click', () => {
      navs.forEach(n => n.classList.remove('active'));
      nav.classList.add('active');
    });
  });

  // Hero Play button
  const playBtn = document.getElementById('hero-play');
  if (playBtn) {
    playBtn.addEventListener('click', () => {
      alert('Starting Morning Vinyasa session stream (25 mins).');
    });
  }
});`
        }
      },
      {
        id: 'screen-yoga-player',
        title: 'Screen 3: Guided Video & Audio Player',
        type: 'mobile',
        frame: { x: 956, y: 99, width: 390, height: 844, radius: 44, deviceType: 'mobile' },
        background: {
          baseColor: '#202e27',
          gradient: 'radial-gradient(circle at 50% 30%, #354a40 0%, #151e1a 100%)'
        },
        effects: {
          detected: true,
          blur: '24px',
          glassOpacity: 0.15,
          borderOpacity: 0.2,
          innerGlow: '0 0 30px rgba(100, 220, 170, 0.15)',
          boxShadow: '0 25px 60px rgba(0,0,0,0.5)'
        },
        designTokens: {
          colors: [
            { name: 'Dark Studio', value: '#151e1a', role: 'background' },
            { name: 'Glass Card', value: 'rgba(255, 255, 255, 0.12)', role: 'surface' },
            { name: 'White', value: '#ffffff', role: 'text' },
            { name: 'Mint Accent', value: '#50c291', role: 'accent' }
          ],
          typography: [
            { role: 'Player Title', fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: '22px', fontWeight: 700, lineHeight: '1.25', color: '#ffffff' }
          ],
          radius: { small: 12, medium: 20, large: 28, pill: 999 },
          spacing: [8, 16, 24]
        },
        components: [
          {
            id: 'p1',
            name: 'Video Master Screen Canvas',
            type: 'mediaPlayer',
            bounds: { x: 20, y: 70, width: 350, height: 380 },
            visualDetails: { borderRadius: 32, glassEffect: true }
          },
          {
            id: 'p2',
            name: 'Playback Waveform Controls',
            type: 'card',
            bounds: { x: 20, y: 470, width: 350, height: 180 },
            visualDetails: { background: 'rgba(255, 255, 255, 0.1)', borderRadius: 28, glassEffect: true }
          }
        ],
        icons: [
          { id: 'i9', name: 'ChevronLeft', matchedLibrary: 'Lucide', iconKey: 'chevron-left', confidence: 0.99, category: 'Navigation', status: 'matched' },
          { id: 'i10', name: 'Info', matchedLibrary: 'Lucide', iconKey: 'info', confidence: 0.98, category: 'Header', status: 'matched' },
          { id: 'i11', name: 'Heart', matchedLibrary: 'Lucide', iconKey: 'heart', confidence: 0.98, category: 'Actions', status: 'matched' }
        ],
        assets: [
          {
            id: 'a4',
            name: 'Yoga Pose Flow Video Screen',
            role: 'hero',
            aspectRatio: '4:3',
            detectedDescription: 'Female yoga practitioner holding warrior pose in calm green aesthetic',
            searchKeywords: 'warrior pose yoga green lighting studio',
            matchedUrl: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?q=80&w=800&auto=format&fit=crop',
            thumbnailUrl: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?q=80&w=200&auto=format&fit=crop',
            source: 'Unsplash',
            license: 'Free Commercial',
            author: 'Dane Wetton',
            downloaded: true
          }
        ],
        matchScore: { overall: 95, layout: 97, typography: 94, colors: 96, spacing: 95, components: 96, images: 95, effects: 95 },
        generatedCode: {
          html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Prana Session Player</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <div class="device-frame" id="app">
    <div class="status-bar">
      <span class="time">9:41</span>
      <div class="status-icons">
        <svg width="18" height="12" viewBox="0 0 18 12" fill="currentColor"><path d="M1 8h2v4H1zm4-3h2v7H5zm4-3h2v10H9zm4-2h2v12h-2z"/></svg>
        <span class="battery">100%</span>
      </div>
    </div>

    <!-- Navigation Bar -->
    <div class="player-top-bar">
      <button class="round-icon-btn" id="back-btn" aria-label="Back">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="m15 18-6-6 6-6"/></svg>
      </button>
      <span class="session-label">Session 04 of 12</span>
      <button class="round-icon-btn" id="fav-btn" aria-label="Favorite">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
      </button>
    </div>

    <!-- Video Canvas -->
    <div class="video-player-container">
      <img src="https://images.unsplash.com/photo-1545205597-3d9d02c29597?q=80&w=800&auto=format&fit=crop" alt="Yoga Master" class="stream-img" />
      <div class="video-badges">
        <span class="badge-live">HD 60FPS</span>
        <span class="badge-tag">Hatha Alignment</span>
      </div>
    </div>

    <!-- Content info & interactive scrubber -->
    <div class="player-details">
      <div class="title-meta">
        <h2 class="stream-title">Solar Plexus & Core Grounding</h2>
        <p class="stream-instructor">Elena Rostova • Prana Studio</p>
      </div>

      <!-- Scrubber -->
      <div class="progress-section">
        <div class="scrubber-bar" id="scrubber">
          <div class="scrubber-fill" style="width: 38%;"></div>
          <div class="scrubber-thumb" style="left: 38%;"></div>
        </div>
        <div class="time-meta">
          <span>08:14</span>
          <span>22:00</span>
        </div>
      </div>

      <!-- Main Controls -->
      <div class="controls-row">
        <button class="ctrl-btn" id="rewind-btn">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 19 2 12l9-7v14z"/><path d="M22 19l-9-7 9-7v14z"/></svg>
        </button>

        <button class="main-play-btn" id="play-toggle">
          <svg id="play-icon" width="26" height="26" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
        </button>

        <button class="ctrl-btn" id="forward-btn">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m13 19 9-7-9-7v14z"/><path d="M2 19l9-7-9-7v14z"/></svg>
        </button>
      </div>

      <!-- Soundscape card -->
      <div class="sound-card">
        <div class="sound-info">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#68e2aa" stroke-width="2"><path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/></svg>
          <div>
            <div class="sound-name">Tibetan Bowls & Rain</div>
            <div class="sound-sub">Atmospheric 432Hz Soundbed</div>
          </div>
        </div>
        <div class="sound-eq">
          <span class="eq-bar bar-1"></span>
          <span class="eq-bar bar-2"></span>
          <span class="eq-bar bar-3"></span>
          <span class="eq-bar bar-4"></span>
        </div>
      </div>
    </div>
  </div>
  <script src="script.js"></script>
</body>
</html>`,
          css: `:root {
  --bg-gradient: radial-gradient(circle at 50% 20%, #2f453a 0%, #131c18 100%);
  --surface-glass: rgba(255, 255, 255, 0.09);
  --border-glass: rgba(255, 255, 255, 0.16);
  --text-primary: #ffffff;
  --text-secondary: #9fc1b2;
  --accent-emerald: #4eb384;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Plus Jakarta Sans', -apple-system, sans-serif;
  -webkit-font-smoothing: antialiased;
}

body {
  background: #090d0b;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 20px;
}

.device-frame {
  width: 100%;
  max-width: 390px;
  height: 844px;
  background: var(--bg-gradient);
  border-radius: 44px;
  position: relative;
  overflow: hidden;
  box-shadow: 0 30px 80px rgba(0, 0, 0, 0.8), 0 0 0 1px rgba(255, 255, 255, 0.12);
  display: flex;
  flex-direction: column;
}

.status-bar {
  height: 44px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 24px;
  color: var(--text-primary);
  font-size: 14px;
  font-weight: 600;
}

.status-icons {
  display: flex;
  align-items: center;
  gap: 8px;
}

.player-top-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 6px 20px 14px;
}

.round-icon-btn {
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid var(--border-glass);
  color: var(--text-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.session-label {
  color: #a4ccbb;
  font-size: 13.5px;
  font-weight: 600;
}

.video-player-container {
  margin: 0 20px 20px;
  height: 280px;
  border-radius: 28px;
  overflow: hidden;
  position: relative;
  border: 1px solid var(--border-glass);
  box-shadow: 0 20px 45px rgba(0, 0, 0, 0.4);
}

.stream-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.video-badges {
  position: absolute;
  top: 14px;
  left: 14px;
  right: 14px;
  display: flex;
  justify-content: space-between;
}

.badge-live {
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(10px);
  color: #6ee6b0;
  font-size: 11px;
  font-weight: 700;
  padding: 4px 10px;
  border-radius: 999px;
  border: 1px solid rgba(110, 230, 176, 0.3);
}

.badge-tag {
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(10px);
  color: #ffffff;
  font-size: 11px;
  font-weight: 600;
  padding: 4px 10px;
  border-radius: 999px;
}

.player-details {
  flex: 1;
  padding: 0 24px 24px;
  display: flex;
  flex-direction: column;
}

.title-meta {
  margin-bottom: 20px;
}

.stream-title {
  color: var(--text-primary);
  font-size: 20px;
  font-weight: 700;
  line-height: 1.25;
  margin-bottom: 4px;
}

.stream-instructor {
  color: var(--text-secondary);
  font-size: 13.5px;
}

.progress-section {
  margin-bottom: 24px;
}

.scrubber-bar {
  height: 6px;
  background: rgba(255, 255, 255, 0.15);
  border-radius: 3px;
  position: relative;
  cursor: pointer;
  margin-bottom: 8px;
}

.scrubber-fill {
  height: 100%;
  background: #50c291;
  border-radius: 3px;
}

.scrubber-thumb {
  width: 14px;
  height: 14px;
  background: #ffffff;
  border: 2px solid #50c291;
  border-radius: 50%;
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.4);
}

.time-meta {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: var(--text-secondary);
  font-weight: 600;
}

.controls-row {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 32px;
  margin-bottom: 24px;
}

.ctrl-btn {
  background: none;
  border: none;
  color: #b7ded0;
  cursor: pointer;
  transition: transform 0.2s;
}

.ctrl-btn:hover {
  transform: scale(1.15);
}

.main-play-btn {
  width: 68px;
  height: 68px;
  border-radius: 50%;
  background: #50c291;
  color: #ffffff;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 12px 30px rgba(80, 194, 145, 0.45);
  transition: transform 0.2s;
}

.main-play-btn:hover {
  transform: scale(1.06);
}

.sound-card {
  background: var(--surface-glass);
  backdrop-filter: blur(16px);
  border: 1px solid var(--border-glass);
  border-radius: 18px;
  padding: 12px 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
}

.sound-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.sound-name {
  color: var(--text-primary);
  font-size: 13px;
  font-weight: 600;
}

.sound-sub {
  color: var(--text-secondary);
  font-size: 11px;
}

.sound-eq {
  display: flex;
  align-items: flex-end;
  gap: 3px;
  height: 16px;
}

.eq-bar {
  width: 3px;
  background: #50c291;
  border-radius: 2px;
  animation: eq-bounce 1s infinite alternate ease-in-out;
}

.bar-1 { height: 60%; animation-delay: 0.1s; }
.bar-2 { height: 100%; animation-delay: 0.3s; }
.bar-3 { height: 40%; animation-delay: 0.2s; }
.bar-4 { height: 80%; animation-delay: 0.4s; }

@keyframes eq-bounce {
  0% { transform: scaleY(0.3); }
  100% { transform: scaleY(1); }
}`,
          js: `document.addEventListener('DOMContentLoaded', () => {
  let isPlaying = true;
  const playToggle = document.getElementById('play-toggle');
  const playIcon = document.getElementById('play-icon');

  playToggle.addEventListener('click', () => {
    isPlaying = !isPlaying;
    if (isPlaying) {
      playIcon.innerHTML = '<polygon points="5 3 19 12 5 21 5 3"/>';
    } else {
      playIcon.innerHTML = '<rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/>';
    }
  });

  const favBtn = document.getElementById('fav-btn');
  let isFav = false;
  favBtn.addEventListener('click', () => {
    isFav = !isFav;
    favBtn.style.color = isFav ? '#ff6b81' : '#ffffff';
  });
});`
        }
      }
    ],
    versionHistory: [
      {
        version: 1,
        timestamp: new Date().toISOString(),
        summary: 'Initial 3-screen reverse engineering with multimodal design system extraction',
        screens: []
      }
    ],
    promptLogs: [
      {
        id: 'p-1',
        timestamp: new Date().toISOString(),
        prompt: 'Reverse-engineer the 3-screen yoga mindfulness app screenshot',
        aiResponse: 'Identified 3 screens: Onboarding, Dashboard, Video Player. Extracted dark sage palette, 24px frosted glass blur, and balanced typography.',
        changesSummary: 'Extracted semantic HTML, CSS tokens, and interactive scripts.'
      }
    ]
  },
  {
    id: 'sample-fintech-dark',
    name: 'Apex Crypto & Neobank Wallet',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    imageDimensions: { width: 1200, height: 900 },
    originalImageBase64: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?q=80&w=1200&auto=format&fit=crop',
    selectedScreenId: 'screen-fintech-wallet',
    screens: [
      {
        id: 'screen-fintech-wallet',
        title: 'Crypto Portfolio Dashboard',
        type: 'mobile',
        frame: { x: 0, y: 0, width: 390, height: 844, radius: 44, deviceType: 'mobile' },
        background: {
          baseColor: '#0a0b10',
          gradient: 'radial-gradient(circle at 50% 0%, #1e163b 0%, #0a0b10 100%)'
        },
        effects: {
          detected: true,
          blur: '20px',
          glassOpacity: 0.12,
          borderOpacity: 0.15,
          innerGlow: '0 0 35px rgba(139, 92, 246, 0.2)',
          boxShadow: '0 25px 60px rgba(0,0,0,0.8)'
        },
        designTokens: {
          colors: [
            { name: 'Void Black', value: '#0a0b10', role: 'background' },
            { name: 'Neon Purple', value: '#8b5cf6', role: 'accent' },
            { name: 'Cyan Mint', value: '#10b981', role: 'secondary' },
            { name: 'Text White', value: '#f8fafc', role: 'text' }
          ],
          typography: [
            { role: 'Portfolio Balance', fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: '38px', fontWeight: 800, lineHeight: '1.1', color: '#ffffff' }
          ],
          radius: { small: 12, medium: 20, large: 28, pill: 999 },
          spacing: [8, 16, 24]
        },
        components: [
          {
            id: 'fc1',
            name: 'Total Portfolio Card',
            type: 'card',
            bounds: { x: 20, y: 60, width: 350, height: 220 },
            visualDetails: { background: 'rgba(255, 255, 255, 0.08)', borderRadius: 28, glassEffect: true }
          }
        ],
        icons: [
          { id: 'fi1', name: 'Wallet', matchedLibrary: 'Lucide', iconKey: 'wallet', confidence: 0.99, category: 'Finance', status: 'matched' },
          { id: 'fi2', name: 'TrendingUp', matchedLibrary: 'Lucide', iconKey: 'trending-up', confidence: 0.98, category: 'Finance', status: 'matched' }
        ],
        assets: [],
        matchScore: { overall: 98, layout: 99, typography: 98, colors: 99, spacing: 97, components: 98, images: 96, effects: 98 },
        generatedCode: {
          html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Apex Neobank</title>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <div class="device-frame">
    <div class="status-bar">
      <span>9:41</span>
      <span>Apex Black Card • VIP</span>
    </div>
    
    <div class="card-glow"></div>

    <div class="balance-container">
      <span class="label">TOTAL NET WORTH</span>
      <h1 class="balance">$148,920.40</h1>
      <div class="badge-growth">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>
        <span>+$12,480.20 (9.14%) this month</span>
      </div>
    </div>

    <!-- Action Buttons -->
    <div class="action-grid">
      <button class="action-btn">
        <div class="action-icon">↑</div>
        <span>Send</span>
      </button>
      <button class="action-btn">
        <div class="action-icon">↓</div>
        <span>Receive</span>
      </button>
      <button class="action-btn">
        <div class="action-icon">⇄</div>
        <span>Swap</span>
      </button>
      <button class="action-btn">
        <div class="action-icon">+</div>
        <span>Top Up</span>
      </button>
    </div>

    <!-- Assets list -->
    <div class="assets-list">
      <div class="asset-row">
        <div class="asset-left">
          <div class="crypto-icon btc">₿</div>
          <div>
            <div class="asset-name">Bitcoin</div>
            <div class="asset-sub">1.842 BTC</div>
          </div>
        </div>
        <div class="asset-right">
          <div class="asset-val">$98,420.00</div>
          <div class="asset-diff green">+4.2%</div>
        </div>
      </div>

      <div class="asset-row">
        <div class="asset-left">
          <div class="crypto-icon eth">Ξ</div>
          <div>
            <div class="asset-name">Ethereum</div>
            <div class="asset-sub">14.2 ETH</div>
          </div>
        </div>
        <div class="asset-right">
          <div class="asset-val">$38,210.40</div>
          <div class="asset-diff green">+6.8%</div>
        </div>
      </div>

      <div class="asset-row">
        <div class="asset-left">
          <div class="crypto-icon sol">◎</div>
          <div>
            <div class="asset-name">Solana</div>
            <div class="asset-sub">82.0 SOL</div>
          </div>
        </div>
        <div class="asset-right">
          <div class="asset-val">$12,290.00</div>
          <div class="asset-diff green">+14.3%</div>
        </div>
      </div>
    </div>
  </div>
</body>
</html>`,
          css: `* { margin:0; padding:0; box-sizing:border-box; font-family:'Plus Jakarta Sans',sans-serif; }
body { background:#030406; display:flex; justify-content:center; align-items:center; min-height:100vh; padding:20px; }
.device-frame { width:390px; height:844px; background:radial-gradient(circle at 50% 0%, #20173d 0%, #090a0f 100%); border-radius:44px; border:1px solid rgba(255,255,255,0.12); position:relative; overflow:hidden; padding:24px; color:#fff; box-shadow:0 30px 90px rgba(0,0,0,0.85); display:flex; flex-direction:column; }
.status-bar { display:flex; justify-content:space-between; font-size:12px; color:#8e92a8; margin-bottom:28px; font-weight:600; }
.card-glow { position:absolute; top:-80px; left:50%; transform:translateX(-50%); width:260px; height:260px; background:rgba(139,92,246,0.25); filter:blur(60px); pointer-events:none; }
.balance-container { text-align:center; margin-bottom:32px; position:relative; z-index:2; }
.label { font-size:11px; letter-spacing:0.1em; color:#94a3b8; font-weight:700; }
.balance { font-size:36px; font-weight:800; margin:6px 0 10px; }
.badge-growth { display:inline-flex; align-items:center; gap:6px; background:rgba(16,185,129,0.15); border:1px solid rgba(16,185,129,0.3); color:#34d399; font-size:12px; font-weight:600; padding:5px 14px; border-radius:999px; }
.action-grid { display:grid; grid-template-columns:repeat(4, 1fr); gap:12px; margin-bottom:32px; }
.action-btn { background:rgba(255,255,255,0.06); border:1px solid rgba(255,255,255,0.12); border-radius:20px; padding:14px 6px; color:#cbd5e1; display:flex; flex-direction:column; align-items:center; gap:8px; font-size:12px; font-weight:600; cursor:pointer; transition:0.2s; }
.action-btn:hover { background:rgba(139,92,246,0.2); border-color:#8b5cf6; color:#fff; }
.action-icon { width:38px; height:38px; border-radius:50%; background:rgba(255,255,255,0.08); display:flex; align-items:center; justify-content:center; font-size:16px; font-weight:700; color:#c084fc; }
.assets-list { display:flex; flex-direction:column; gap:12px; }
.asset-row { background:rgba(255,255,255,0.05); backdrop-filter:blur(16px); border:1px solid rgba(255,255,255,0.08); border-radius:20px; padding:14px 18px; display:flex; justify-content:space-between; align-items:center; }
.asset-left { display:flex; align-items:center; gap:12px; }
.crypto-icon { width:42px; height:42px; border-radius:50%; display:flex; align-items:center; justify-content:center; font-weight:800; font-size:18px; }
.crypto-icon.btc { background:rgba(247,147,26,0.2); color:#f7931a; }
.crypto-icon.eth { background:rgba(98,126,234,0.2); color:#627eea; }
.crypto-icon.sol { background:rgba(20,241,149,0.2); color:#14f195; }
.asset-name { font-size:15px; font-weight:700; }
.asset-sub { font-size:12px; color:#64748b; }
.asset-right { text-align:right; }
.asset-val { font-size:15px; font-weight:700; }
.asset-diff.green { font-size:12px; color:#34d399; font-weight:600; }`,
          js: `console.log("Apex Wallet Initialized");`
        }
      }
    ],
    versionHistory: [],
    promptLogs: []
  }
];

export const FREE_ASSET_CATALOG = [
  {
    id: 'stock-yoga-1',
    title: 'Serene Woman Meditating in Studio',
    url: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?q=80&w=800&auto=format&fit=crop',
    thumbnail: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?q=80&w=200&auto=format&fit=crop',
    source: 'Unsplash',
    author: 'Dane Wetton',
    license: 'Free Commercial (Unsplash)',
    aspectRatio: '3:4',
    tags: ['yoga', 'meditation', 'wellness', 'female', 'calm', 'sage', 'green']
  },
  {
    id: 'stock-yoga-2',
    title: 'Sunset Beach Yoga Pose',
    url: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=800&auto=format&fit=crop',
    thumbnail: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=200&auto=format&fit=crop',
    source: 'Unsplash',
    author: 'Kike Vega',
    license: 'Free Commercial (Unsplash)',
    aspectRatio: '16:9',
    tags: ['sunset', 'yoga', 'morning', 'flow', 'beach', 'stretching']
  },
  {
    id: 'stock-yoga-3',
    title: 'Deep Breathwork Fascial Studio',
    url: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=800&auto=format&fit=crop',
    thumbnail: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=200&auto=format&fit=crop',
    source: 'Unsplash',
    author: 'Prasanth Inturi',
    license: 'Free Commercial (Unsplash)',
    aspectRatio: '4:3',
    tags: ['pranayama', 'zen', 'greenery', 'peaceful', 'meditation']
  },
  {
    id: 'stock-fintech-1',
    title: 'Dark Neon Financial Growth',
    url: 'https://images.unsplash.com/photo-1642543492481-44e81e3914a7?q=80&w=800&auto=format&fit=crop',
    thumbnail: 'https://images.unsplash.com/photo-1642543492481-44e81e3914a7?q=80&w=200&auto=format&fit=crop',
    source: 'Unsplash',
    author: 'Jp Valery',
    license: 'Free Commercial',
    aspectRatio: '16:9',
    tags: ['crypto', 'finance', 'dark', 'purple', 'wallet']
  },
  {
    id: 'stock-avatar-1',
    title: 'Modern Minimalist Portrait',
    url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop',
    thumbnail: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&auto=format&fit=crop',
    source: 'Unsplash',
    author: 'Avarie Woodard',
    license: 'Free Commercial',
    aspectRatio: '1:1',
    tags: ['avatar', 'profile', 'user', 'woman', 'minimal']
  }
];
