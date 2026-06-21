const fs = require('fs');
const path = require('path');

/* ═══════════════════════════════════════════════════════════════════════
   Premium Animated Header Generator
   ───────────────────────────────────────────────────────────────────────
   Layers (bottom → top):
     1. Diagonal gradient background
     2. Subtle dot grid pattern
     3. Two ambient blue glow orbs (breathing animation)
     4. 14 floating particles (drift + pulse)
     5. Name — char-by-char slide-up + fade
     6. Subtitle — char-by-char fade
     7. Blinking cursor
     8. Blue accent line (fades in last)
     9. Radial vignette
    10. Thin border with rounded corners
   ═══════════════════════════════════════════════════════════════════════ */

// ── Character width table (em-fraction, proportional sans-serif) ─────
const CW = {
  A:.70,B:.67,C:.67,D:.73,E:.60,F:.57,G:.73,H:.73,I:.32,J:.48,K:.67,L:.57,
  M:.87,N:.73,O:.77,P:.64,Q:.77,R:.67,S:.60,T:.60,U:.73,V:.67,W:.90,X:.64,
  Y:.60,Z:.62,
  a:.56,b:.59,c:.52,d:.59,e:.56,f:.34,g:.59,h:.59,i:.27,j:.27,k:.54,l:.27,
  m:.88,n:.59,o:.59,p:.59,q:.59,r:.39,s:.51,t:.39,u:.59,v:.54,w:.78,x:.54,
  y:.54,z:.51,
  ' ':.30,'&':.73,'-':.40,'+':.60,'.': .28,',':.28,"'":.18,
};

const charW = (ch, sz, ls = 0) => ((CW[ch] ?? 0.56) + 0.015) * sz + ls;
const textW = (s, sz, ls = 0) => [...s].reduce((t, c) => t + charW(c, sz, ls), 0);
const esc   = c => c === '&' ? '&amp;' : c === '<' ? '&lt;' : c;

// ── Canvas ───────────────────────────────────────────────────────────
const W = 842, H = 196;
const { getFontStyles, FONT_FAMILY: FN } = require('./font-loader');

// ── Text config ──────────────────────────────────────────────────────
const NAME = "Hi, I'm Prajyot Porje";
const N_SZ = 38, N_Y = 88, N_LS = 1.5;   // font-size, baseline-y, letter-spacing
const N_DLY = 0.4, N_STG = 0.055, N_DUR = 0.28, N_SLIDE = 13;

const SUB = 'Crafting elegant digital experiences through code and curiosity.';
const S_SZ = 15, S_Y = 126;
const S_DLY = 1.35, S_STG = 0.022, S_DUR = 0.30;

// ── Output buffer ────────────────────────────────────────────────────
const o = [];
const p = (...a) => o.push(...a);

// ══════════════════ SVG START ══════════════════════════════════════════
p(`<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">`);

// ── DEFS ──────────────────────────────────────────────────────────────
p(`  <defs>`,
  getFontStyles(),
  `    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">`,
  `      <stop offset="0%"   stop-color="#0d1117"/>`,
  `      <stop offset="45%"  stop-color="#151b23"/>`,
  `      <stop offset="100%" stop-color="#0d1117"/>`,
  `    </linearGradient>`,
  `    <radialGradient id="g1" cx="28%" cy="36%" r="30%">`,
  `      <stop offset="0%"   stop-color="#1a3a5c"/>`,
  `      <stop offset="100%" stop-color="#1a3a5c" stop-opacity="0"/>`,
  `    </radialGradient>`,
  `    <radialGradient id="g2" cx="75%" cy="68%" r="24%">`,
  `      <stop offset="0%"   stop-color="#1a3a5c"/>`,
  `      <stop offset="100%" stop-color="#1a3a5c" stop-opacity="0"/>`,
  `    </radialGradient>`,
  `    <pattern id="grid" width="24" height="24" patternUnits="userSpaceOnUse">`,
  `      <circle cx="12" cy="12" r="0.5" fill="#30363d"/>`,
  `    </pattern>`,
  `    <linearGradient id="acc">`,
  `      <stop offset="0%"   stop-color="#58a6ff" stop-opacity="0"/>`,
  `      <stop offset="20%"  stop-color="#58a6ff" stop-opacity="0.5"/>`,
  `      <stop offset="50%"  stop-color="#58a6ff" stop-opacity="1"/>`,
  `      <stop offset="80%"  stop-color="#58a6ff" stop-opacity="0.5"/>`,
  `      <stop offset="100%" stop-color="#58a6ff" stop-opacity="0"/>`,
  `    </linearGradient>`,
  `    <radialGradient id="vig" cx="50%" cy="50%" r="62%">`,
  `      <stop offset="0%"   stop-color="#0d1117" stop-opacity="0"/>`,
  `      <stop offset="100%" stop-color="#0d1117" stop-opacity="0.55"/>`,
  `    </radialGradient>`,
  `    <clipPath id="c"><rect width="${W}" height="${H}" rx="28"/></clipPath>`,
  `  </defs>`, ``);

// ── BACKGROUND LAYERS ─────────────────────────────────────────────────
const imageBase64 = fs.readFileSync(path.join(__dirname, 'image.jpg')).toString('base64');
p(`  <g clip-path="url(#c)">`,
  `    <image href="data:image/jpeg;base64,${imageBase64}" width="${W}" height="${H}" preserveAspectRatio="xMidYMid slice" />`,
  `    <rect width="${W}" height="${H}" fill="#000000" opacity="0.45"/>`, // dark overlay to ensure text is readable
  // Breathing ambient glows
  `    <rect width="${W}" height="${H}" fill="url(#g1)" opacity="0.22">`,
  `      <animate attributeName="opacity" values="0.14;0.28;0.14" dur="5s" repeatCount="indefinite"/>`,
  `    </rect>`,
  `    <rect width="${W}" height="${H}" fill="url(#g2)" opacity="0.16">`,
  `      <animate attributeName="opacity" values="0.08;0.22;0.08" dur="7s" repeatCount="indefinite"/>`,
  `    </rect>`, ``);

// ── FLOATING PARTICLES ────────────────────────────────────────────────
// Particles removed per user request
p(``);

// ── ANIMATED NAME (char-by-char slide-up + fade) ──────────────────────
{
  const tw = textW(NAME, N_SZ, N_LS);
  let x = (W - tw) / 2, idx = 0;

  for (const ch of NAME) {
    const w = charW(ch, N_SZ, N_LS);
    const t = (N_DLY + idx * N_STG).toFixed(3);
    idx++;
    if (ch === ' ') { x += w; continue; }
    const yF = N_Y + N_SLIDE;
    p(`    <text x="${x.toFixed(1)}" y="${yF.toFixed(1)}" opacity="0"`,
      `          fill="#f0f6fc" font-family="${FN}" font-size="${N_SZ}" font-weight="500">${esc(ch)}`,
      `      <animate attributeName="opacity" from="0" to="1" begin="${t}s" dur="${N_DUR}s" fill="freeze"/>`,
      `      <animate attributeName="y" from="${yF.toFixed(1)}" to="${N_Y.toFixed(1)}" begin="${t}s" dur="${N_DUR}s" fill="freeze"/>`,
      `    </text>`);
    x += w;
  }
}
p(``);

// ── ANIMATED SUBTITLE (char-by-char fade) ─────────────────────────────
let cursorX;
{
  const tw = textW(SUB, S_SZ);
  let x = (W - tw) / 2, idx = 0;

  for (const ch of SUB) {
    const w = charW(ch, S_SZ);
    const t = (S_DLY + idx * S_STG).toFixed(3);
    idx++;
    if (ch === ' ') { x += w; continue; }
    p(`    <text x="${x.toFixed(1)}" y="${S_Y}" opacity="0"`,
      `          fill="#8b949e" font-family="${FN}" font-size="${S_SZ}" font-weight="400">${esc(ch)}`,
      `      <animate attributeName="opacity" from="0" to="1" begin="${t}s" dur="${S_DUR}s" fill="freeze"/>`,
      `    </text>`);
    x += w;
  }
  cursorX = x;
}
p(``);

// ── TYPING CURSOR (blinks after text completes) ──────────────────────
const cursorAt = (S_DLY + SUB.length * S_STG + 0.45).toFixed(2);
p(`    <rect x="${(cursorX + 5).toFixed(1)}" y="${S_Y - 12}" width="2" height="16" rx="1" fill="#58a6ff" opacity="0">`,
  `      <animate attributeName="opacity" values="1;0" dur="1s" calcMode="discrete" begin="${cursorAt}s" repeatCount="indefinite"/>`,
  `    </rect>`, ``);

// ── ACCENT LINE ──────────────────────────────────────────────────────
p(`    <line x1="321" y1="154" x2="521" y2="154" stroke="url(#acc)" stroke-width="0.8" opacity="0">`,
  `      <animate attributeName="opacity" from="0" to="1" begin="2.8s" dur="0.6s" fill="freeze"/>`,
  `    </line>`, ``);

// ── VIGNETTE + CLOSE ─────────────────────────────────────────────────
p(`    <rect width="${W}" height="${H}" fill="url(#vig)"/>`,
  `  </g>`,
  `  <rect width="${W}" height="${H}" fill="none" stroke="#21262d" stroke-width="1" rx="28"/>`,
  `</svg>`);

// ── WRITE ────────────────────────────────────────────────────────────
const svg = o.join('\n');
const out = path.join(path.dirname(process.argv[1]), 'header.svg');
fs.writeFileSync(out, svg);
console.log(`\n  ✓ ${out}`);
console.log(`    ${(svg.length / 1024).toFixed(1)}KB · ${NAME.replace(/ /g,'').length + SUB.replace(/ /g,'').length} animated chars`);
console.log(`    cursor blink at ${cursorAt}s\n`);
