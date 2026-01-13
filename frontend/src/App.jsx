import React, { useState } from 'react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { Header } from './components/Header';
import { ReaderDisplay } from './components/ReaderDisplay';
import { Footer } from './components/Footer';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings as SettingsPopup } from './components/Settings'; 
import { ThemeProvider } from './contexts/ThemeContext';
import { InputModal } from './components/InputModal'; 

function AppContent() {
  const [selectedMode, setSelectedMode] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // Global Settings
  const [wpm, setWpm] = useState(250);
  const [fontFamily, setFontFamily] = useState('serif');
  const [fontSize, setFontSize] = useState(18); // Default size in rem
  
  // Modal States
  const [isWpmModalOpen, setIsWpmModalOpen] = useState(false);
  const [isFontModalOpen, setIsFontModalOpen] = useState(false);

  const handleCustomFontSubmit = (input) => {
    let fontName = '';
    let fontUrl = '';

    if (input.includes('fonts.googleapis.com')) {
      fontUrl = input;
      const urlParams = new URLSearchParams(input.split('?')[1]);
      fontName = urlParams.get('family')?.split(':')[0]?.replace(/\+/g, ' ');
    } else {
      fontName = input.trim();
      const formattedName = fontName.replace(/\s+/g, '+');
      fontUrl = `https://fonts.googleapis.com/css2?family=${formattedName}&display=swap`;
    }

    if (fontName) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = fontUrl;
      document.head.appendChild(link);
      setFontFamily(fontName);
    }
  };

  return (
    <div className="flex flex-col h-screen w-full bg-c-primary text-c-text-main font-sans overflow-hidden transition-colors duration-500">
      <Header 
        selectedMode={selectedMode} 
        isPlaying={isPlaying} 
        setIsPlaying={setIsPlaying} 
        onBack={() => setSelectedMode(null)} 
        onOpenSettings={() => setIsSettingsOpen(true)}
      />

      <AnimatePresence>
        {isSettingsOpen && (
          <SettingsPopup 
            isOpen={isSettingsOpen} 
            onClose={() => setIsSettingsOpen(false)}
            fontSize={fontSize}
            setFontSize={setFontSize}
          />
        )}
      </AnimatePresence>
      
      <main className="flex-grow flex items-center justify-center relative px-4">
        <AnimatePresence mode="popLayout">
          {!selectedMode ? (
            <motion.div 
              key="selection-grid"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
              className="flex gap-8 w-full max-w-[60%] h-[80%] absolute items-center justify-center"
            >
              <ModeCard 
                title="TUTORIAL" 
                onClick={() => setSelectedMode('tutorial')} 
              />
              <ModeCard 
                layoutId="shared-reader-frame" 
                title="READ" 
                onClick={() => setSelectedMode('reader')} 
              />
            </motion.div>
          ) : selectedMode === 'reader' ? (
            <ReaderDisplay 
              key="reader-view"
              layoutId="shared-reader-frame"
              isPlaying={isPlaying} 
              text="Hello!"
              wpm={wpm}
              fontFamily={fontFamily}
              fontSize={fontSize}
            />
          ) : (
            <motion.div 
                key="tutorial-view"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="w-[60%] h-[80%] bg-c-secondary rounded-[2.5rem] flex items-center justify-center absolute"
              >
                <h2 className="text-xl font-bold text-c-text-main uppercase tracking-widest">Tutorial</h2>
              </motion.div>
          )}
        </AnimatePresence>
      </main>

      <InputModal 
        isOpen={isWpmModalOpen}
        onClose={() => setIsWpmModalOpen(false)}
        title="Custom WPM"
        defaultValue={wpm}
        type="number"
        onSubmit={(val) => setWpm(parseInt(val) || wpm)}
      />

      <InputModal 
        isOpen={isFontModalOpen}
        onClose={() => setIsFontModalOpen(false)}
        title="Enter Font Name or Link"
        defaultValue=""
        type="text"
        onSubmit={handleCustomFontSubmit}
      />

      <Footer 
        showControls={selectedMode === 'reader'} 
        wpm={wpm}
        setWpm={setWpm}
        fontFamily={fontFamily}
        setFontFamily={setFontFamily}
        onOpenCustomWpm={() => setIsWpmModalOpen(true)}
        onOpenCustomFont={() => setIsFontModalOpen(true)}
      />
    </div>
  );
}

const ModeCard = ({ layoutId, title, onClick }) => (
  <motion.div 
    layoutId={layoutId}
    onClick={onClick}
    className="flex-1 h-[50%] bg-c-secondary rounded-[2.5rem] flex items-center justify-center cursor-pointer hover:bg-c-secondary/80 transition-colors duration-500"
  >
    <motion.h3 
      layoutId={layoutId === "shared-reader-frame" ? "shared-reader-text" : undefined}
      className="text-2xl font-black tracking-[4px] text-c-distinct"
    >
      {title}
    </motion.h3>
  </motion.div>
);

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
      <SpeedInsights />
    </ThemeProvider>
  );
}