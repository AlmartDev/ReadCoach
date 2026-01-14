import React, { useState, useEffect, useCallback } from 'react';
import { Analytics } from '@vercel/analytics/react';
import { Header } from './components/Header';
import { ReaderDisplay } from './components/ReaderDisplay';
import { Footer } from './components/Footer';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings as SettingsPopup } from './components/Settings'; 
import { ThemeProvider } from './contexts/ThemeContext';
import { InputModal } from './components/InputModal'; 
import { TextInputModal } from './components/TextInputModal'; 
import { TEXT_LIBRARY } from './data/texts';

function AppContent() {
  const [selectedMode, setSelectedMode] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [wpm, setWpm] = useState(250);
  const [fontFamily, setFontFamily] = useState('serif');
  const [fontSize, setFontSize] = useState(18);
  const [isWpmModalOpen, setIsWpmModalOpen] = useState(false);
  const [isFontModalOpen, setIsFontModalOpen] = useState(false);
  const [isTextModalOpen, setIsTextModalOpen] = useState(false); // FIXED: Added missing state

  const [currentText, setCurrentText] = useState(() => {
    const welcomeOptions = TEXT_LIBRARY.filter(t => t.isWelcome);
    if (welcomeOptions.length > 0) {
      const randomIndex = Math.floor(Math.random() * welcomeOptions.length);
      return welcomeOptions[randomIndex];
    }
    return TEXT_LIBRARY[0];
  });
  const [wordIndex, setWordIndex] = useState(0);
  const [history, setHistory] = useState([]);

  const words = currentText.content.split(/\s+/);

  const handleNextText = useCallback(() => {
    setHistory(prev => [...prev, currentText]);
    const remaining = TEXT_LIBRARY.filter(t => t.id !== currentText.id);
    const randomText = remaining[Math.floor(Math.random() * remaining.length)];
    setCurrentText(randomText);
    setWordIndex(0);
    setIsPlaying(false);
  }, [currentText]);

  const handleCustomTextSubmit = (newContent) => {
    if (!newContent.trim()) return;
    setCurrentText({
      id: `custom-${Date.now()}`,
      title: "Custom Text",
      content: newContent,
      wordCount: newContent.split(/\s+/).length
    });
    setWordIndex(0);
    setIsPlaying(false);
  };

  const handlePrevText = useCallback(() => {
    if (history.length === 0) return;
    const lastText = history[history.length - 1];
    setHistory(prev => prev.slice(0, -1));
    setCurrentText(lastText);
    setWordIndex(0);
    setIsPlaying(false);
  }, [history]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      const isTyping = e.target.tagName === 'INPUT' || 
                       e.target.tagName === 'TEXTAREA' || 
                       e.target.isContentEditable;

      if (selectedMode !== 'reader' || isTyping) return;

      if (e.code === 'Space') {
        e.preventDefault();
        setIsPlaying(prev => !prev);
      }
      
      if (e.code === 'Tab') {
        e.preventDefault();
        handleNextText();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedMode, handleNextText]);

  useEffect(() => {
    let interval = null;
    if (isPlaying && wordIndex < words.length) {
      interval = setInterval(() => {
        setWordIndex((prev) => {
          if (prev >= words.length - 1) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, 60000 / wpm);
    }
    return () => clearInterval(interval);
  }, [isPlaying, wpm, wordIndex, words.length]);

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
        onBack={() => { setSelectedMode(null); setIsPlaying(false); setWordIndex(0); }} 
        onOpenSettings={() => setIsSettingsOpen(true)}
        onNext={handleNextText}
        onPrev={handlePrevText}
      />
      
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
              <ModeCard title="TUTORIAL" onClick={() => setSelectedMode('tutorial')} />
              <ModeCard layoutId="shared-reader-frame" title="READ" onClick={() => setSelectedMode('reader')} />
            </motion.div>
          ) : selectedMode === 'reader' ? (
            <ReaderDisplay 
              key="reader-view"
              layoutId="shared-reader-frame"
              currentWord={words[wordIndex]}
              wpm={wpm}
              fontFamily={fontFamily}
              fontSize={fontSize}
              isPlaying={isPlaying}
              textMetadata={{
                title: currentText.title,
                wordCount: words.length,
                id: currentText.id
              }}
              onCustomTextClick={() => setIsTextModalOpen(true)} 
            />
          ) : (
            <motion.div key="tutorial" className="text-c-light">Tutorial Mode Active</motion.div>
          )}
        </AnimatePresence>
      </main>

      <Footer 
        showControls={selectedMode === 'reader'} 
        wpm={wpm}
        setWpm={setWpm}
        fontFamily={fontFamily}
        fontSize={fontSize}
        setFontSize={setFontSize}
        setFontFamily={setFontFamily}
        onOpenCustomWpm={() => setIsWpmModalOpen(true)}
        onOpenCustomFont={() => setIsFontModalOpen(true)}
      />

      <TextInputModal 
        isOpen={isTextModalOpen} 
        onClose={() => setIsTextModalOpen(false)} 
        onSubmit={handleCustomTextSubmit} 
      />
      <InputModal 
        isOpen={isWpmModalOpen} 
        onClose={() => setIsWpmModalOpen(false)} 
        title="Custom WPM" 
        onSubmit={(v) => setWpm(parseInt(v))} 
      />
      <InputModal 
        isOpen={isFontModalOpen} 
        onClose={() => setIsFontModalOpen(false)} 
        title="Google Font Name" 
        type="text" 
        onSubmit={handleCustomFontSubmit} 
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
      
      <Analytics />
    </div>
  );
}

const ModeCard = ({ layoutId, title, onClick }) => (
  <motion.div 
    layoutId={layoutId}
    onClick={onClick}
    className="flex-1 h-[50%] bg-c-secondary rounded-[2.5rem] flex items-center justify-center cursor-pointer hover:bg-c-secondary/80 transition-colors duration-500"
  >
    <motion.h3 layoutId={layoutId === "shared-reader-frame" ? "shared-reader-text" : undefined} className="text-2xl font-black tracking-[4px] text-c-distinct">
      {title}
    </motion.h3>
  </motion.div>
);

export default function App() { return (<ThemeProvider><AppContent /></ThemeProvider>); }