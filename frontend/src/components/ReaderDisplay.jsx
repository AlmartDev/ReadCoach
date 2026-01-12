// frontend/src/components/ReaderDisplay.jsx
import { motion } from 'framer-motion';

export const ReaderDisplay = ({ layoutId, text, wpm, fontFamily, fontSize }) => {
  const centerFont = fontFamily === 'serif' ? '"Instrument Serif", serif' : fontFamily;

  return (
    <motion.section 
      layoutId={layoutId}
      transition={{ type: "spring", bounce: 0.15, duration: 0.6 }}
      /* absolute positioning during the transition prevents it from pushing the grid */
      className="w-[60%] min-w-[400px] h-[100%] bg-c-secondary rounded-[2.5rem] flex items-center justify-center relative transition-colors duration-500"
    >
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="absolute top-20 left-20 text-sm text-c-text-main/30 tracking-[0.1em] font-sans"
      >
        <pre><b>Quick Brown Fox</b></pre>
        <pre>541 WORDS · {wpm} WPM · SIZE: {fontSize}rem</pre>
        <pre>ID: 2026</pre>
      </motion.div>

      <div className="text-center">
        <motion.div 
          // Adding a layoutId here tells Framer this is the same text from the ModeCard
          layoutId="shared-reader-text" 
          className="tracking-[-0.1rem] select-none text-c-text-main"
          style={{ 
            fontFamily: centerFont,
            fontSize: `${fontSize}rem`,
            lineHeight: 1
          }}
        >
          {text}
        </motion.div>
      </div>
    </motion.section>
  );
};