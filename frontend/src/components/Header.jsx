import { Settings, User, Play, Square, SkipForward, ChevronLeft, Shrink, Expand, Shuffle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { ProfilePopup } from './ProfilePopup'; 

export const Header = ({ 
  selectedMode, 
  isPlaying, 
  setIsPlaying, 
  onBack, 
  onOpenSettings, 
  onNext, 
  onPrev,
  isZenMode
}) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false); 
  const [isFullscreen, setIsFullscreen] = useState(false); 

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((err) => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
  };

  const fadeVariant = {
    visible: { opacity: 1, pointerEvents: 'auto' },
    hidden: { opacity: 0, pointerEvents: 'none' }
  };

  return (
    <header className="h-24 w-full flex justify-center bg-c-primary z-20 relative transition-colors duration-500">
      <div className="w-[75%] min-w-[700px] grid grid-cols-3 items-center h-full">
        
        <motion.div 
          variants={fadeVariant}
          animate={isZenMode ? "hidden" : "visible"}
          className="flex items-center gap-4"
        >
          <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-c-distinct rounded-lg flex items-center justify-center font-black text-white">R</div>
              <h1 className="text-xl font-bold tracking-tighter text-c-light">READCOACH</h1>
          </div>
          {selectedMode && (
            <button onClick={onBack} className="flex items-center gap-2 text-c-light hover:text-c-text-main transition-colors">
              <ChevronLeft size={20} /> <span className="text-xs font-bold uppercase tracking-widest">Back</span>
            </button>
          )}
        </motion.div>

        <div className="flex justify-center">
          <AnimatePresence>
            {selectedMode === 'reader' && (
              <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="flex items-center gap-6"
              >
                <button onClick={onPrev} className="text-c-light hover:text-c-text-main transition-colors">
                  <SkipForward size={18} className="rotate-180"/>
                </button>
                
                <button 
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="w-12 h-12 bg-c-distinct rounded-full flex items-center justify-center text-white hover:shadow-[0_0_20px_rgba(var(--c-distinct),0.4)] transition-all"
                >
                  {isPlaying ? <Square size={20} fill="white"/> : <Play size={20} fill="white" className="ml-1"/>}
                </button>

                <button onClick={onNext} className="text-c-light hover:text-c-text-main transition-colors">
                  <Shuffle size={18} />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <motion.div 
          variants={fadeVariant}
          animate={isZenMode ? "hidden" : "visible"}
          className="flex justify-end items-center gap-3"
        >
          <button className="p-2 text-c-light hover:text-c-text-main">EN</button>
          <button 
            onClick={toggleFullscreen}
            className="p-2 text-c-light hover:text-c-text-main transition-colors"
            title="Toggle Fullscreen"
          >
            {isFullscreen ? <Shrink size={20} /> : <Expand size={20} />}
          </button>

          <button className="p-2 text-c-light hover:text-c-text-main" onClick={onOpenSettings}>
            <Settings size={20} />
          </button>
          
          <div className="relative">
            <button 
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className={`p-2 transition-colors ${isProfileOpen ? 'text-white bg-white/10 rounded-lg' : 'text-c-light hover:text-c-text-main'}`}
            >
                <User size={20} />
            </button>

            <AnimatePresence>
                {isProfileOpen && (
                    <ProfilePopup onClose={() => setIsProfileOpen(false)} />
                )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>  
    </header>
  );
};