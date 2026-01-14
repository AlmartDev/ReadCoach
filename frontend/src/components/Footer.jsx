import { Github, HeartHandshake, Settings } from 'lucide-react';

export const Footer = ({ 
  showControls, 
  wpm, 
  setWpm, 
  fontFamily, 
  setFontFamily, 
  fontSize,
  setFontSize,
  onOpenCustomWpm, 
  onOpenCustomFont 
}) => {
  const fonts = ['Arial', 'Verdana', 'serif'];
  const wpms = [200, 250, 300, 350, 400, 500];
  const sizes = [12, 16, 18, 22, 26];

  const Key = ({ children }) => (
    <span className="px-1.5 py-0.5 bg-c-light/10 border border-white/10 rounded text-[9px] text-c-light mx-1">
      {children}
    </span>
  );

  return (
    <footer className="h-32 w-full flex justify-center bg-c-primary z-10 transition-colors duration-500">
      <div className="w-[75%] min-w-[700px] flex items-center justify-between">
        
        <div className="flex items-center gap-12 transition-opacity duration-500" style={{ opacity: showControls ? 1 : 0 }}>
          <div className="flex flex-col items-start space-y-1">
            <div className="text-[0.7rem] font-bold text-c-light uppercase tracking-[2px]">
                WPM | {wpms.map(v => (
                  <button 
                    key={v}
                    onClick={() => setWpm(v)}
                    className={`mx-1 transition-colors ${wpm === v ? 'text-c-distinct' : 'hover:text-c-text-main'}`}
                  >
                    {v}
                  </button>
                ))}
                · <button onClick={onOpenCustomWpm} className="hover:text-c-text-main">
                    CUSTOM ({wpm})
                  </button>
            </div>
            
            <div className="text-[0.7rem] font-bold text-c-light tracking-[2px] uppercase">
                FONT | {fonts.map(f => (
                  <button 
                    key={f}
                    onClick={() => setFontFamily(f)}
                    className={`mx-1 transition-colors ${fontFamily === f ? 'text-c-distinct' : 'hover:text-c-text-main'}`}
                  >
                    {f}
                  </button>
                ))}
                · <button onClick={onOpenCustomFont} className="hover:text-c-text-main">
                    CUSTOM
                  </button>
            </div>

            <div className="text-[0.7rem] font-bold text-c-light tracking-[2px] uppercase">
                SIZE | {sizes.map(s => (
                  <button 
                    key={s}
                    onClick={() => setFontSize(s)}
                    className={`mx-1 transition-colors ${fontSize === s ? 'text-c-distinct' : 'hover:text-c-text-main'}`}
                  >
                    {s}
                  </button>
                ))}
            </div>
          </div>

          <div className="flex flex-col border-l border-white/10 pl-8 pointer-events-none opacity-40">
            <div className="flex items-center text-[0.6rem] font-bold text-c-light uppercase tracking-[2px] mb-1">
              <Key>TAB</Key>  — New Text
            </div>
            <div className="flex items-center text-[0.6rem] font-bold text-c-light uppercase tracking-[2px] mb-1">
              <Key>SPACE</Key>  — Play/Stop
            </div>
            <div className="flex items-center text-[0.6rem] font-bold text-c-light uppercase tracking-[2px]">
              <div className="mx-1 p-0.5 bg-c-light/10 rounded border border-white/10">
                <Settings size={10} />
              </div> 
               — More Settings
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <h2 className="text-[0.65rem] font-medium text-c-light tracking-[2px]">Made by @AlmartDev with &lt;3</h2>
          <a href="https://flavortown.hackclub.com/projects/7483" className="p-2 text-c-light hover:text-c-text-main transition-colors">
              <HeartHandshake size={18}/>
          </a>
          <a href="https://github.com/AlmartDev/ReadCoach" className="p-2 text-c-light hover:text-c-text-main transition-colors">
              <Github size={18}/>
          </a>
        </div>
      </div>  
    </footer>
  );
};