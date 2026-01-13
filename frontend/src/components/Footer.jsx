import { Github, HeartHandshake } from 'lucide-react';

export const Footer = ({ 
  showControls, 
  wpm, 
  setWpm, 
  fontFamily, 
  setFontFamily, 
  onOpenCustomWpm, 
  onOpenCustomFont 
}) => {
  const fonts = ['Arial', 'Verdana', 'serif'];
  const wpms = [200, 250, 300, 350, 400, 500];

  return (
    <footer className="h-32 w-full flex justify-center bg-c-primary z-10 transition-colors duration-500">
      <div className="w-[75%] min-w-[400px] flex items-center justify-between">
        
        <div className="flex flex-col items-start transition-opacity duration-500" style={{ opacity: showControls ? 1 : 0 }}>
          <div className="text-[0.7rem] font-bold text-c-light uppercase tracking-[2px] m-3">
              WPM | {wpms.map(v => (
                <button 
                  key={v}
                  onClick={() => setWpm(v)}
                  className={`mx-1 transition-colors ${wpm === v ? 'text-c-distinct' : 'hover:text-c-text-main'}`}
                >
                  {v}
                </button>
              ))}
              · <button 
                  onClick={onOpenCustomWpm} 
                  className="hover:text-c-text-main"
                >
                  CUSTOM ({wpm})
                </button>
          </div>
          
          <div className="text-[0.7rem] font-bold text-c-light tracking-[2px] mt-1 uppercase m-3">
              FONT | {fonts.map(f => (
                <button 
                  key={f}
                  onClick={() => setFontFamily(f)}
                  className={`mx-1 transition-colors ${fontFamily === f ? 'text-c-distinct' : 'hover:text-c-text-main'}`}
                >
                  {f}
                </button>
              ))}
              · <button 
                  onClick={onOpenCustomFont} 
                  className="hover:text-c-text-main"
                >
                  CUSTOM
                </button>
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