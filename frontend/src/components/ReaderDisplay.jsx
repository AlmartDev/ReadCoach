import { motion, AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';

export const ReaderDisplay = ({ 
  layoutId, 
  currentWord, 
  wpm, 
  fontFamily, 
  fontSize, 
  textMetadata, 
  isPlaying, 
  onCustomTextClick,
  isZenMode
}) => {
  const centerFont = fontFamily === 'serif' ? '"Instrument Serif", serif' : fontFamily;

  return (
    <motion.section 
      layoutId={layoutId}
      transition={{ type: "spring", bounce: 0.15, duration: 0.6 }}
      className="w-[75%] min-w-[700px] h-[100%] bg-c-secondary rounded-[2.5rem] flex items-center justify-center relative transition-colors duration-500 overflow-hidden"
    >
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: isZenMode ? 0 : 1 }}
        transition={{ delay: 0.2 }}
        className="absolute top-20 left-20 text-sm text-c-text-main/30 tracking-[0.1em] font-sans pointer-events-none"
      >
        <pre className="font-sans uppercase font-bold">{textMetadata.title}</pre>
        <pre className="font-sans">{textMetadata.wordCount} WORDS · {wpm} WPM · SIZE: {fontSize}</pre>
        <pre className="font-sans">ID: {textMetadata.id}</pre>
      </motion.div>

      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.div 
            layoutId={isPlaying ? undefined : "shared-reader-text"}
            key={isPlaying ? currentWord : "static-entry"}
            initial={isPlaying ? { opacity: 1 } : { opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
            className="tracking-[-0.1rem] select-none text-c-text-main text-center whitespace-nowrap"
            style={{ 
                fontFamily: centerFont,
                fontSize: `${fontSize}rem`,
                lineHeight: 1,
            }}
        >
            {currentWord}
        </motion.div>
      </div>

      <div className="absolute top-[calc(50%+11rem)] left-1/2 -translate-x-1/2 flex justify-center w-full pointer-events-none">
        <AnimatePresence>
          {!isPlaying && !isZenMode && (
            <motion.button
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 5 }}
              onClick={onCustomTextClick}
              className="px-6 py-2 bg-c-primary/15 border border-white/5 rounded-full flex items-center gap-2 text-c-text hover:text-c-distinct transition-all pointer-events-auto"
            >
              <Plus size={14} />
              <span className="text-[10px] font-black uppercase tracking-[2px]">Custom Text</span>
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      <motion.div 
        animate={{ opacity: isZenMode ? 0 : 1 }}
        className="absolute inset-0 border border-c-distinct/5 rounded-[2.5rem] pointer-events-none" 
      />
    </motion.section>
  );
};