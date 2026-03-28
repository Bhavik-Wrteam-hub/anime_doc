import React, {useEffect, useRef, useCallback} from 'react';

// Anime-themed SVG icons as inline strings
const ANIME_ICONS = [
  // Katana sword
  `<svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 27L25 7" stroke="#4a90e2" stroke-width="2" stroke-linecap="round"/><path d="M23 5L27 9" stroke="#0088ff" stroke-width="2" stroke-linecap="round"/><path d="M7 25L9 27" stroke="#6aa4e8" stroke-width="2.5" stroke-linecap="round"/></svg>`,
  // Star
  `<svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16 4L19.5 12.5L28 13.5L22 19.5L23.5 28L16 23.5L8.5 28L10 19.5L4 13.5L12.5 12.5L16 4Z" fill="#FB5414" opacity="0.85"/></svg>`,
  // Crescent moon
  `<svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M22 16C22 22 17.5 27 12 27C8.5 27 5.5 25 4 22C6 23 8.5 23.5 11 23C16 22 20 17 20 12C20 9.5 19.5 7.5 18.5 6C21 8 22 11.5 22 16Z" fill="#4a90e2" opacity="0.8"/></svg>`,
  // Lightning bolt
  `<svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M18 4L8 18H15L14 28L24 14H17L18 4Z" fill="#eab308" opacity="0.85"/></svg>`,
  // Heart
  `<svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16 28C16 28 4 20 4 12C4 8 7 5 11 5C13.5 5 15.5 6.5 16 7.5C16.5 6.5 18.5 5 21 5C25 5 28 8 28 12C28 20 16 28 16 28Z" fill="#FB5414" opacity="0.75"/></svg>`,
  // Diamond gem
  `<svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16 4L26 14L16 28L6 14L16 4Z" fill="#0088ff" opacity="0.7"/><path d="M6 14H26" stroke="#4a90e2" stroke-width="1.5"/><path d="M16 4L12 14L16 28L20 14L16 4Z" fill="#6aa4e8" opacity="0.5"/></svg>`,
  // Cherry blossom petal
  `<svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><ellipse cx="16" cy="12" rx="5" ry="8" fill="#FF9CC2" opacity="0.8" transform="rotate(-30 16 16)"/><ellipse cx="16" cy="12" rx="5" ry="8" fill="#FFB6D1" opacity="0.6" transform="rotate(30 16 16)"/><circle cx="16" cy="16" r="2" fill="#FB5414" opacity="0.6"/></svg>`,
  // Shuriken
  `<svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16 4L18 14L28 16L18 18L16 28L14 18L4 16L14 14L16 4Z" fill="#4a90e2" opacity="0.75"/><circle cx="16" cy="16" r="2.5" fill="#0D1117" stroke="#6aa4e8" stroke-width="1"/></svg>`,
  // Sparkle
  `<svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16 2L18 13L29 16L18 19L16 30L14 19L3 16L14 13L16 2Z" fill="#0088ff" opacity="0.8"/></svg>`,
  // Manga speech bubble
  `<svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 8C6 6 8 4 10 4H22C24 4 26 6 26 8V18C26 20 24 22 22 22H14L8 27V22H6V8Z" fill="#fff" opacity="0.15" stroke="#4a90e2" stroke-width="1.5"/><circle cx="12" cy="13" r="1.5" fill="#4a90e2"/><circle cx="16" cy="13" r="1.5" fill="#4a90e2"/><circle cx="20" cy="13" r="1.5" fill="#4a90e2"/></svg>`,
];

interface FloatingIconsProps {
  containerRef: React.RefObject<HTMLElement | null>;
}

const CONFIG = {
  burstCount: 6,
  maxPerMove: 2,
  speedThreshold: 12,
  iconSizeMin: 18,
  iconSizeMax: 30,
  duration: 900,
  spawnRadius: 30,
};

export default function FloatingIcons({containerRef}: FloatingIconsProps) {
  const lastPos = useRef({x: 0, y: 0});

  const createIcon = useCallback((x: number, y: number, vx = 0, vy = 0) => {
    const el = document.createElement('div');
    const size = Math.random() * (CONFIG.iconSizeMax - CONFIG.iconSizeMin) + CONFIG.iconSizeMin;
    const icon = ANIME_ICONS[Math.floor(Math.random() * ANIME_ICONS.length)];

    el.innerHTML = icon;
    el.style.cssText = `
      position: fixed;
      pointer-events: none;
      width: ${size}px;
      height: ${size}px;
      z-index: 999;
      transform: scale(0) rotate(0deg);
      opacity: 0;
      transition: all ${CONFIG.duration}ms cubic-bezier(0.175, 0.885, 0.32, 1.275);
    `;

    const angle = Math.random() * Math.PI * 2;
    const dist = Math.random() * CONFIG.spawnRadius + 5;
    el.style.left = (x + Math.cos(angle) * dist) + 'px';
    el.style.top = (y + Math.sin(angle) * dist) + 'px';

    document.body.appendChild(el);

    const rotation = (Math.random() - 0.5) * 200;
    const moveX = (Math.random() - 0.5) * 70 + vx * 0.5;
    const moveY = -Math.random() * 70 - 30 + vy * 0.3;

    requestAnimationFrame(() => {
      el.style.transform = `scale(1) rotate(${rotation}deg) translate(${moveX}px, ${moveY}px)`;
      el.style.opacity = '0.9';
    });

    // Fade out
    setTimeout(() => {
      el.style.opacity = '0';
      el.style.transform = `scale(0.3) rotate(${rotation + 60}deg) translate(${moveX * 1.5}px, ${moveY * 1.8}px)`;
    }, CONFIG.duration * 0.6);

    setTimeout(() => el.remove(), CONFIG.duration);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleEnter = (e: MouseEvent) => {
      for (let i = 0; i < CONFIG.burstCount; i++) {
        setTimeout(() => createIcon(e.clientX, e.clientY), i * 50);
      }
    };

    const handleMove = (e: MouseEvent) => {
      const vx = e.clientX - lastPos.current.x;
      const vy = e.clientY - lastPos.current.y;
      lastPos.current = {x: e.clientX, y: e.clientY};

      const speed = Math.sqrt(vx * vx + vy * vy);
      const count = Math.min(
        Math.floor(speed / CONFIG.speedThreshold),
        CONFIG.maxPerMove,
      );

      for (let i = 0; i < count; i++) {
        setTimeout(() => createIcon(e.clientX, e.clientY, vx, vy), i * 50);
      }
    };

    container.addEventListener('mouseenter', handleEnter);
    container.addEventListener('mousemove', handleMove);

    return () => {
      container.removeEventListener('mouseenter', handleEnter);
      container.removeEventListener('mousemove', handleMove);
    };
  }, [containerRef, createIcon]);

  return null;
}
