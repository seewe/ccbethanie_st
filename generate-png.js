import { Resvg } from '@resvg/resvg-js';
import fs from 'fs';
import path from 'path';

const svgString = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 850" width="1200" height="850">
  <defs>
    <!-- Rich Golden Gradients matching the official brand -->
    <linearGradient id="doveGold" x1="15%" y1="15%" x2="85%" y2="85%">
      <stop offset="0%" stop-color="#F3BD5B"/>
      <stop offset="25%" stop-color="#DE9934"/>
      <stop offset="60%" stop-color="#B86616"/>
      <stop offset="100%" stop-color="#783405"/>
    </linearGradient>

    <linearGradient id="handGold" x1="10%" y1="20%" x2="90%" y2="80%">
      <stop offset="0%" stop-color="#783405"/>
      <stop offset="40%" stop-color="#B86616"/>
      <stop offset="75%" stop-color="#DE9934"/>
      <stop offset="100%" stop-color="#F5C369"/>
    </linearGradient>

    <linearGradient id="textGold" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#D9943B"/>
      <stop offset="50%" stop-color="#B86616"/>
      <stop offset="100%" stop-color="#D9943B"/>
    </linearGradient>

    <!-- Path for the top arched text -->
    <path id="archCanada" d="M 240 310 A 390 390 0 0 1 960 310" fill="none"/>
  </defs>

  <!-- 1. Arched Text: ÉGLISE PRESBYTÉRIENNE AU CANADA -->
  <text font-family="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif" 
        font-size="37" 
        font-weight="800" 
        fill="url(#textGold)" 
        letter-spacing="9">
    <textPath href="#archCanada" startOffset="50%" text-anchor="middle">
      ÉGLISE PRESBYTÉRIENNE AU CANADA
    </textPath>
  </text>

  <!-- 2. Central Symbol (Dove + Cross + Hand) -->
  <g transform="translate(0, 30)">
    
    <!-- Open Cupping Hand beneath the dove -->
    <!-- Hand base & palm -->
    <path d="M 375 510 
             C 410 455, 495 440, 550 458 
             C 605 472, 665 498, 720 482 
             C 745 475, 758 465, 764 472 
             C 764 490, 720 528, 672 542 
             C 610 562, 515 562, 452 542 
             C 428 532, 410 518, 415 504 Z" 
          fill="url(#handGold)"/>
    
    <!-- Hand Palm shadow & finger lines for depth -->
    <path d="M 538 490 
             C 588 490, 650 515, 700 498 
             C 712 494, 720 502, 708 510 
             C 662 532, 600 534, 538 520 Z" 
          fill="#451A03" 
          opacity="0.35"/>

    <path d="M 590 515 
             C 630 520, 675 528, 715 512 
             C 722 510, 726 515, 718 520 
             C 685 538, 640 540, 590 532 Z" 
          fill="#451A03" 
          opacity="0.2"/>

    <!-- Dove Wings (Fanned out to top-right) -->
    <path d="M 565 370 
             C 578 320, 602 245, 652 208 
             C 657 203, 665 210, 660 220 
             C 645 252, 650 278, 685 238 
             C 690 233, 695 240, 690 250 
             C 672 288, 685 308, 728 262 
             C 733 257, 738 265, 733 278 
             C 710 328, 705 370, 665 432 
             C 645 465, 615 488, 578 495 
             C 560 500, 552 482, 552 462 
             C 552 432, 560 402, 565 370 Z" 
          fill="url(#doveGold)"/>

    <!-- Dove Head, Beak, and Chest -->
    <path d="M 485 345 
             C 478 312, 502 288, 535 295 
             C 552 300, 570 320, 580 345 
             C 595 382, 590 420, 555 452 
             C 520 462, 478 445, 460 408 
             C 445 378, 455 348, 485 345 Z" 
          fill="url(#doveGold)"/>

    <!-- Beak & Olive Branch -->
    <path d="M 465 322 L 428 328 C 420 328, 415 322, 422 318 L 460 310 Z" fill="#783405"/>
    
    <!-- Olive Branch Stem & Leaves -->
    <path d="M 428 322 Q 390 315 375 302" stroke="#783405" stroke-width="4.5" fill="none" stroke-linecap="round"/>
    
    <!-- Olive Leaves -->
    <path d="M 410 318 C 405 302, 415 292, 422 298 C 425 302, 420 312, 410 318 Z" fill="#783405"/>
    <path d="M 395 312 C 385 298, 390 288, 400 292 C 402 300, 398 308, 395 312 Z" fill="#783405"/>
    <path d="M 380 308 C 370 298, 372 285, 382 290 C 385 298, 382 305, 380 308 Z" fill="#783405"/>
    <path d="M 365 302 C 352 292, 355 280, 368 285 C 370 292, 368 298, 365 302 Z" fill="#783405"/>

    <!-- Dove Eye -->
    <circle cx="502" cy="316" r="3.5" fill="#291202"/>

    <!-- Inscribed Pure White Cross in Center -->
    <path d="M 560 290 L 585 290 L 585 330 L 620 330 L 620 355 L 585 355 L 585 480 L 560 480 L 560 355 L 525 355 L 525 330 L 560 330 Z" 
          fill="#FFFFFF"
          filter="drop-shadow(0px 2px 4px rgba(0,0,0,0.12))"/>
  </g>

  <!-- 3. Bottom Brand Typography -->
  <!-- "Communauté Chrétienne" -->
  <text x="600" y="690" 
        text-anchor="middle" 
        font-family="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif" 
        font-size="52" 
        font-weight="400" 
        fill="#1E232A" 
        letter-spacing="1">
    Communauté Chrétienne
  </text>

  <!-- Underline with BÉTHANIE in Center -->
  <g transform="translate(0, 750)">
    <!-- Left horizontal bar -->
    <line x1="280" y1="0" x2="450" y2="0" stroke="#1E232A" stroke-width="6" stroke-linecap="square"/>
    
    <!-- Central bold BÉTHANIE text -->
    <text x="600" y="14" 
          text-anchor="middle" 
          font-family="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif" 
          font-size="56" 
          font-weight="900" 
          fill="#1E232A" 
          letter-spacing="6">
      BÉTHANIE
    </text>
    
    <!-- Right horizontal bar -->
    <line x1="750" y1="0" x2="920" y2="0" stroke="#1E232A" stroke-width="6" stroke-linecap="square"/>
  </g>
</svg>`;

// Save SVG
fs.writeFileSync('public/ccb-logo.svg', svgString);

// Render high-resolution transparent PNGs with Resvg
const resvgMain = new Resvg(svgString, {
  fitTo: {
    mode: 'width',
    value: 1200
  },
  background: 'rgba(0,0,0,0)' // Transparent background
});

const pngData = resvgMain.render();
const pngBuffer = pngData.asPng();

fs.writeFileSync('public/ccb-logo.png', pngBuffer);
fs.writeFileSync('public/logo.png', pngBuffer);
fs.writeFileSync('public/CCB logo transparent.png', pngBuffer);
fs.writeFileSync('public/ccb-logo-transparent.png', pngBuffer);

// Also copy to src/assets for direct bundler imports if needed
if (!fs.existsSync('src/assets')) {
  fs.mkdirSync('src/assets', { recursive: true });
}
fs.writeFileSync('src/assets/ccb-logo.png', pngBuffer);
fs.writeFileSync('src/assets/logo.png', pngBuffer);

console.log('Successfully generated public/ccb-logo.png, public/logo.png, and src/assets/ccb-logo.png');
