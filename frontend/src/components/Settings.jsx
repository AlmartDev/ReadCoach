// frontend/src/components/Settings.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { X, Type, Zap, EyeOff, FocusIcon, Check } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

export const Settings = ({ isOpen, onClose, fontSize, setFontSize }) => {
  const { activeThemeId, setActiveThemeId, palettes } = useTheme();

  const sidebarVariants = {
    initial: { x: "100%", opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: "100%", opacity: 0 }
  };

  const overlayVariants = {
    initial: { opacity: 0, backdropFilter: "blur(0px)" },
    animate: { opacity: 1, backdropFilter: "blur(4px)" },
    exit: { opacity: 0, backdropFilter: "blur(0px)" }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end p-6 pointer-events-none">
      <motion.div 
        variants={overlayVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="absolute inset-0 bg-black/40 pointer-events-auto"
        onClick={onClose}
      />
      
      <motion.div 
        variants={sidebarVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ type: "tween", ease: "circOut", duration: 0.3 }}
        className="relative w-full max-w-md h-full bg-c-primary pointer-events-auto rounded-[2.5rem] border border-white/10 shadow-2xl p-8 flex flex-col"
      >
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-c-distinct/10 rounded-xl text-c-distinct">
              <Type size={20} />
            </div>
            <h2 className="text-sm font-black uppercase tracking-[3px] text-c-light">Settings</h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full text-c-light transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="flex-grow overflow-y-auto pr-2 space-y-10 custom-scrollbar">
          <section>
            <div className="flex items-center justify-between mb-4 text-c-light">
              <span className="text-[10px] font-black uppercase tracking-[2px]">Font Size</span>
              <span className="text-c-distinct font-black text-xs">{fontSize}rem</span>
            </div>
            <input 
              type="range"
              min="8"
              max="30"
              step="1"
              value={fontSize}
              onChange={(e) => setFontSize(e.target.value)}
              className="w-full h-1.5 bg-c-light/20 rounded-lg appearance-none cursor-pointer accent-c-distinct"
            />
          </section>

          <section>
            <h3 className="text-[10px] font-black uppercase tracking-[2px] text-c-light mb-6">Theme Palette</h3>
            <div className="grid grid-cols-4 gap-4">
              {palettes.map((palette) => (
                <button
                  key={palette.id}
                  onClick={() => setActiveThemeId(palette.id)}
                  className="relative group flex flex-col items-center gap-2"
                >
                  <div 
                    className={`w-full aspect-square rounded-2xl border-2 transition-all duration-300 ${
                      activeThemeId === palette.id ? 'border-c-distinct scale-105' : 'border-white/5'
                    }`}
                    style={{ backgroundColor: palette.colors.primary }}
                  >
                    {activeThemeId === palette.id && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Check size={16} className="text-c-distinct" strokeWidth={4} />
                      </div>
                    )}
                  </div>
                  <span className="text-[8px] font-bold uppercase tracking-widest text-c-light/50 group-hover:text-c-light">
                    {palette.name}
                  </span>
                </button>
              ))}
            </div>
          </section>

          <section className="space-y-3">
             <Toggle label="Zen Mode" icon={<EyeOff size={14}/>} />
             <Toggle label="Show Background" icon={<FocusIcon size={14}/>} />
          </section>
        </div>

        <div className="pt-8">
          <button 
            onClick={onClose}
            className="w-full py-4 bg-c-distinct text-white font-black rounded-2xl hover:brightness-110 active:scale-[0.98] transition-all text-xs tracking-widest"
          >
            DONE
          </button>
        </div>
      </motion.div>
    </div>
  );
};

const Toggle = ({ label, icon }) => (
    <label className="flex items-center justify-between w-full p-4 bg-c-secondary/50 rounded-2xl border border-white/5 cursor-pointer hover:border-white/10 transition-all">
        <div className="flex items-center gap-3 text-c-light">
            {icon}
            <span className="text-[10px] font-bold uppercase tracking-widest">{label}</span>
        </div>
        <input type="checkbox" className="w-4 h-4 accent-c-distinct rounded border-white/10 bg-transparent" />
    </label>
);