export const maximalTokens = {
  colors: {
    accent: ['#FF1178', '#00F5D4', '#FFE600', '#7B61FF', '#FF7A00'],
    bg: '#120224',
    surface: '#1A0936',
    text: '#F7F2FF',
    borderCycle: ['#00F5D4', '#FF7A00', '#FFE600', '#FF1178', '#7B61FF'],
  },
  shadows: {
    button:
      '0 0 0 2px #000, 4px 4px 0 #00F5D4, 8px 8px 0 #FF1178, 0 0 24px rgba(255,17,120,0.45)',
    card:
      '0 0 0 2px #000, 6px 6px 0 #FFE600, 10px 10px 0 #7B61FF, 0 0 32px rgba(0,245,212,0.35)',
    text:
      '2px 2px 0 #000, 4px 4px 0 #FF1178, 6px 6px 0 #00F5D4',
  },
  typography: {
    hero: 'clamp(3rem, 10vw, 8rem)',
    section: 'clamp(2rem, 7vw, 5rem)',
  },
  motion: {
    fast: '150ms',
    base: '260ms',
    slow: '420ms',
    easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
  },
} as const;

export const getAccentForSection = (index: number) =>
  maximalTokens.colors.accent[index % maximalTokens.colors.accent.length];
