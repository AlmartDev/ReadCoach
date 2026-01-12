// frontend/src/contexts/ThemeContext.jsx
import React, { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

export const PALETTES = [
  { id: 'default', name: 'Midnight', colors: { primary: '#040D12', secondary: '#183D3D', light: '#93B1A6', distinct: '#4FB286', text: '#FFFFFF' } },
  { id: 'ocean', name: 'Deep Ocean', colors: { primary: '#0f172a', secondary: '#1e293b', light: '#94a3b8', distinct: '#38bdf8', text: '#FFFFFF' } },
  { id: 'sunset', name: 'Sunset', colors: { primary: '#4a0404', secondary: '#7f1d1d', light: '#fca5a5', distinct: '#fb2424', text: '#FFFFFF' } },
  { id: 'forest', name: 'Deep Forest', colors: { primary: '#052e16', secondary: '#14532d', light: '#86efac', distinct: '#22c55e', text: '#FFFFFF' } },
  { id: 'darkmode', name: 'Dark', colors: { primary: '#000000', secondary: '#000000', light: '#a4a4a4', distinct: '#5578f7', text: '#FFFFFF' } },
  { id: 'lightmode', name: 'Light', colors: { primary: '#ffffff', secondary: '#ffffff', light: '#131313', distinct: '#be8f8f', text: '#000000' } },
  { id: 'coffee', name: 'Espresso', colors: { primary: '#271c19', secondary: '#443632', light: '#d7ccc8', distinct: '#a1887f', text: '#FFFFFF' } },
  { id: 'rose', name: 'Rose Gold', colors: { primary: '#4c0519', secondary: '#881337', light: '#fecdd3', distinct: '#fb7185', text: '#FFFFFF' } }
];

const hexToRgb = (hex) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? `${parseInt(result[1], 16)} ${parseInt(result[2], 16)} ${parseInt(result[3], 16)}` : null;
};

export const ThemeProvider = ({ children }) => {
  const [activeThemeId, setActiveThemeId] = useState('default');

  useEffect(() => {
    const currentPalette = PALETTES.find(p => p.id === activeThemeId) || PALETTES[0];
    const root = document.documentElement;

    Object.entries(currentPalette.colors).forEach(([key, value]) => {
      // FIX: Map 'text' to '--c-text-main' to match Tailwind config
      const varName = key === 'text' ? '--c-text-main' : `--c-${key}`;
      root.style.setProperty(varName, hexToRgb(value));
    });
  }, [activeThemeId]);

  return (
    <ThemeContext.Provider value={{ activeThemeId, setActiveThemeId, palettes: PALETTES }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);