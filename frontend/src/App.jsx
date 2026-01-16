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
import { GuideView } from './Guide';

function AppContent() {
  const [selectedMode, setSelectedMode] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  
  const [isZenMode, setIsZenMode] = useState(false); 
  const [showBackground, setShowBackground] = useState(true);
  const [colorCenterWord, setColorCenterWord] = useState(false);
  const [highlightColor, setHighlightColor] = useState('#ff0000');

  const [wpm, setWpm] = useState(250);
  const [fontFamily, setFontFamily] = useState('serif');
  const [fontSize, setFontSize] = useState(18);
  const [isWpmModalOpen, setIsWpmModalOpen] = useState(false);
  const [isFontModalOpen, setIsFontModalOpen] = useState(false);
  const [isTextModalOpen, setIsTextModalOpen] = useState(false); 

  const isZenActive = isZenMode && isPlaying;

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
  }, [selectedMode, handleNextText, isZenMode]);

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
    <div className={`flex flex-col h-screen w-full font-sans overflow-hidden transition-colors duration-500 
      ${selectedMode === 'tutorial' ? 'bg-c-secondary' : 'bg-c-primary'}`}>
      
      <AnimatePresence>
        {selectedMode !== 'tutorial' && (
          <motion.div 
            initial={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="z-10"
          >
            <Header 
              selectedMode={selectedMode} 
              isPlaying={isPlaying} 
              setIsPlaying={setIsPlaying} 
              onBack={() => { setSelectedMode(null); setIsPlaying(false); setWordIndex(0); }} 
              onOpenSettings={() => setIsSettingsOpen(true)}
              onNext={handleNextText}
              onPrev={handlePrevText}
              isZenMode={isZenActive}
            />
          </motion.div>
        )}
      </AnimatePresence>
      
      <main className="flex-grow flex items-center justify-center relative px-4 transition-all duration-500 ${!isZenActive ? 'mb-0' : 'mb-12'}">
        <AnimatePresence mode="wait">
          {!selectedMode ? (
            <motion.div 
              key="selection-grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full h-full absolute inset-0 flex justify-center py-12"
            >
              <div className="w-[75%] min-w-[400px] h-full flex gap-8">
                <div className="flex-[4] h-full">
                    <ModeCard 
                      title="TUTORIAL" 
                      variant="outline"
                      description="Learn how to master focus and speed reading."
                      onClick={() => setSelectedMode('tutorial')} 
                    />
                </div>
                <div className="flex-[8] h-full">
                    <ModeCard 
                      layoutId="shared-reader-frame" 
                      title="READ" 
                      variant="solid"
                      subtext="Speed Reading Sandbox"
                      onClick={() => setSelectedMode('reader')} 
                    />
                </div>
              </div>
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
              isZenMode={isZenActive} // Use isZenActive for layout changes
              showBackground={showBackground}
              colorCenterWord={colorCenterWord}
              highlightColor={highlightColor}
            />
          ) : selectedMode === 'tutorial' ? (
            <GuideView 
              key="tutorial-view"
              onBack={() => setSelectedMode(null)} 
            />
          ) : null}
        </AnimatePresence>
      </main>

      <AnimatePresence>
        {selectedMode !== 'tutorial' && !isZenActive && (
          <motion.div
            initial={{ opacity: 0, height: 0, overflow: 'hidden' }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
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
          </motion.div>
        )}
      </AnimatePresence>

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
            isZenMode={isZenMode} 
            setIsZenMode={setIsZenMode}
            showBackground={showBackground}
            setShowBackground={setShowBackground}
            colorCenterWord={colorCenterWord}
            setColorCenterWord={setColorCenterWord}
            highlightColor={highlightColor}
            setHighlightColor={setHighlightColor}
          />
        )}
      </AnimatePresence>
      
      <Analytics />
    </div>
  );
}

const ModeCard = ({ layoutId, title, subtext, description, onClick, variant }) => {
  const isSolid = variant === "solid";
  
  return (
    <motion.div 
      layoutId={layoutId}
      onClick={onClick}
      whileHover="hover"
      initial="initial"
      className={`relative w-full h-full flex flex-col cursor-pointer transition-all duration-500 rounded-[3rem] p-12
        ${isSolid 
          ? 'bg-c-distinct text-white justify-end shadow-xl' 
          : 'bg-transparent border-2 border-c-secondary text-c-light justify-start hover:bg-c-secondary/20'}`}
    >
      {isSolid ? (
        <>
          <div className="absolute top-12 left-12 w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
          </div>
          <div className="z-10">
            <motion.h3 
              layoutId={layoutId === "shared-reader-frame" ? "shared-reader-text" : undefined}
              className="text-9xl font-black tracking-tighter leading-none"
            >
              {title}
            </motion.h3>
            <p className="mt-4 text-xs font-black uppercase tracking-[0.4em] opacity-60">
              {subtext}
            </p>
          </div>
        </>
      ) : (
        <>
          <div className="z-10">
            <h3 className="text-6xl font-black tracking-tighter leading-none text-c-text-main">
              {title}
            </h3>
            <div className="w-12 h-1 bg-c-distinct mt-6 mb-8 rounded-full" />
            <p className="text-sm font-medium leading-relaxed opacity-40 max-w-[180px]">
              {description}
            </p>
          </div>
        </>
      )}

      <motion.div 
        variants={{ hover: { opacity: 1 } }}
        initial={{ opacity: 0 }}
        className="absolute inset-0 bg-white/5 rounded-[3rem] pointer-events-none"
      />
    </motion.div>
  );
};

export default function App() { return (<ThemeProvider><AppContent /></ThemeProvider>); }