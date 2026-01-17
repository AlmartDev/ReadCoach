import { motion } from 'framer-motion';
import { X, Type, Zap, EyeOff, FocusIcon, Check, ScanEye } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

export const Settings = ({ 
  isOpen, 
  onClose, 
  fontSize, 
  setFontSize, 
  isZenMode, 
  setIsZenMode,
  showBackground,
  setShowBackground,
  colorCenterWord,
  setColorCenterWord,
  highlightColor,
  setHighlightColor
}) => {
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
        className="relative w-full max-w-sm bg-c-secondary border-l border-white/10 shadow-2xl h-full rounded-3xl p-8 pointer-events-auto flex flex-col justify-between overflow-y-auto"
      >
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-black uppercase tracking-[4px] text-c-light">Settings</h2>
            <button onClick={onClose} className="text-c-light hover:text-white transition-colors">
              <X size={20} />
            </button>
          </div>

          <section className="space-y-4">
            <div className="flex items-center gap-2 text-c-distinct">
              <Type size={16} />
              <h3 className="text-[10px] font-bold uppercase tracking-widest">Font Size</h3>
            </div>
            <div className="bg-c-secondary/50 p-4 rounded-2xl border border-white/5 flex items-center gap-4">
              <span className="text-xs text-c-light font-bold">A</span>
              <input 
                type="range" 
                min="10" 
                max="28" 
                step="0.5" 
                value={fontSize} 
                onChange={(e) => setFontSize(parseFloat(e.target.value))}
                className="w-full h-1 bg-c-light/20 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-c-distinct"
              />
              <span className="text-xl text-c-light font-bold">A</span>
            </div>
          </section>

          <section className="space-y-4">
             <div className="flex items-center gap-2 text-c-distinct">
              <Zap size={16} />
              <h3 className="text-[10px] font-bold uppercase tracking-widest">Themes</h3>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {palettes.map(palette => (
                <button
                  key={palette.id}
                  onClick={() => setActiveThemeId(palette.id)}
                  style={{ backgroundColor: palette.colors.primary }}
                  className={`group relative p-3 rounded-xl border transition-all ${activeThemeId === palette.id ? 'border-c-distinct bg-white/5' : 'border-white/5 hover:border-white/10'}`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    {activeThemeId === palette.id && (
                      <div className="absolute top-2 right-2">
                        <Check size={12} className="text-c-distinct" strokeWidth={4} />
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
             <Toggle 
                label="Zen Mode" 
                icon={<EyeOff size={14}/>} 
                checked={isZenMode}
                onChange={() => setIsZenMode(!isZenMode)}
             />
             <Toggle 
                label="Show Background" 
                icon={<FocusIcon size={14}/>} 
                checked={showBackground} 
                onChange={() => setShowBackground(!showBackground)} 
             />
             <Toggle 
                label="Color Center Word" 
                icon={<ScanEye size={14}/>} 
                checked={colorCenterWord} 
                onChange={() => setColorCenterWord(!colorCenterWord)} 
             />

             {colorCenterWord && (
               <motion.div 
                 initial={{ opacity: 0, height: 0 }}
                 animate={{ opacity: 1, height: 'auto' }}
                 exit={{ opacity: 0, height: 0 }}
                 className="flex items-center justify-between p-4 bg-c-secondary/50 rounded-2xl border border-white/5"
               >
                 <span className="text-[10px] font-bold uppercase tracking-widest text-c-light">Highlight Color</span>
                 <input 
                   type="color" 
                   value={highlightColor}
                   onChange={(e) => setHighlightColor(e.target.value)}
                   className="w-8 h-8 rounded-lg cursor-pointer bg-transparent border-none"
                 />
               </motion.div>
             )}
          </section>
        </div>
        <div className="pt-8">
          <div className="text-c-primary/60 mb-[4px] text-[10px] tracking-[2px] pointer-events-none">
            ReadCoach - v1.0.0
          </div>
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

const Toggle = ({ label, icon, checked, onChange }) => (
    <label className="flex items-center justify-between w-full p-4 bg-c-secondary/50 rounded-2xl border border-white/5 cursor-pointer hover:border-white/10 transition-all select-none">
        <div className="flex items-center gap-3 text-c-light">
            {icon}
            <span className="text-[10px] font-bold uppercase tracking-widest">{label}</span>
        </div>
        <div className="relative">
            <input 
                type="checkbox" 
                className="sr-only peer"
                checked={checked}
                onChange={onChange}
            />
            <div className="w-9 h-5 bg-c-primary rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-c-distinct"></div>
        </div>
    </label>
);