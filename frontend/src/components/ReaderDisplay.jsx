import { motion } from 'framer-motion';

export const ReaderDisplay = ({ layoutId, currentWord, wpm, fontFamily, fontSize, textMetadata }) => {
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
        <pre className="font-sans">{textMetadata.wordCount} WORDS · {wpm} WPM · SIZE: {fontSize}rem</pre>
        <pre className="font-sans">ID: {textMetadata.id}</pre>
      </motion.div>

      <div className="w-full flex justify-center items-center px-12">
        <motion.div 
          key={currentWord}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.05 }}
          className="tracking-[-0.1rem] select-none text-c-text-main text-center whitespace-nowrap"
          style={{ 
            fontFamily: centerFont,
            fontSize: `${fontSize}rem`,
            lineHeight: 1,
            minWidth: "200px"
          }}
        >
          {currentWord}
        </motion.div>
      </div>
    </motion.section>
  );
};