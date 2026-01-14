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
  onCustomTextClick
}) => {
  const centerFont = fontFamily === 'serif' ? '"Instrument Serif", serif' : fontFamily;

  return (
    <motion.section 
      layoutId={layoutId}
      transition={{ type: "spring", bounce: 0.15, duration: 0.6 }}
      className="w-[75%] min-w-[400px] h-[100%] bg-c-secondary rounded-[2.5rem] flex items-center justify-center relative transition-colors duration-500 overflow-hidden"
    >
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="absolute top-20 left-20 text-sm text-c-text-main/30 tracking-[0.1em] font-sans pointer-events-none"
      >
        <pre className="font-sans uppercase font-bold">{textMetadata.title}</pre>
        <pre className="font-sans">{textMetadata.wordCount} WORDS · {wpm} WPM · SIZE: {fontSize}</pre>
        <pre className="font-sans">ID: {textMetadata.id}</pre>
      </motion.div>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center w-full">
        {/*<div className="w-[2px] h-6 bg-c-distinct/40 mb-6 rounded-full" />*/}

        <div className="flex justify-center items-center w-full min-h-[1.2em]">
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
                    display: 'inline-block'
                }}
            >
                {currentWord}
            </motion.div>
        </div>

        <AnimatePresence>
          {!isPlaying && (
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              onClick={onCustomTextClick}
              className="mt-8 px-6 py-2 bg-c-primary border border-white/5 rounded-full flex items-center gap-2 text-c-light hover:text-c-distinct transition-all pointer-events-auto"
            >
              <Plus size={14} />
              <span className="text-[10px] font-black uppercase tracking-[2px]">Custom Text</span>
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      <div className="absolute inset-0 rounded-[2.5rem] pointer-events-none" />
      {/*border-[1px] border-c-distinct/5*/}    
      </motion.section>
  );
};