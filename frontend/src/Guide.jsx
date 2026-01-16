import React from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, Zap, Keyboard, Eye, MousePointer2, FileWarning } from 'lucide-react';

export const GuideView = ({ onBack, onStart }) => {  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-[75%] min-w-[700px] max-w-4xl h-full flex flex-col justify-center py-12 text-c-light"
    >
      <motion.div variants={itemVariants} className="mb-12">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-c-light/50 hover:text-c-distinct transition-colors mb-4 group"
        >
          <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-xs font-black uppercase tracking-widest">Return to Menu</span>
        </button>
        <h2 className="text-7xl font-black tracking-tighter leading-none text-white">
          HOW TO READ <span className="text-c-distinct text-outline">FAST</span>.
        </h2>
      </motion.div>

      <div className="grid grid-cols-2 gap-12">
        
        <motion.div variants={itemVariants} className="space-y-6">
          <div className="flex items-center gap-3 text-c-distinct">
            <h3 className="text-sm font-black uppercase tracking-[0.3em]">How to achieve this?</h3>
          </div>
          <p className="text-lg font-medium leading-relaxed opacity-60">
            ReadCoach uses RSVP (Rapid Serial Visual Presentation). 
            By flashing words one by one in the center of your vision, you eliminate "subvocalization" and eye-movement time, 
            allowing your brain to process information up to <span className="text-white font-bold">3x faster</span> than traditional reading.
          </p>
        </motion.div>

        <motion.div variants={itemVariants} className="space-y-6">
          <div className="flex items-center gap-3 text-c-distinct">
            <Keyboard size={20} strokeWidth={3} />
            <h3 className="text-sm font-black uppercase tracking-[0.3em]">Keyboard Controls</h3>
          </div>
          
          <div className="space-y-4">
            <Shortcut keyLabel="SPACE" action="Toggle Play / Pause" />
            <Shortcut keyLabel="TAB" action="Skip to Next Library Text" />
            <Shortcut keyLabel="ESC" action="Exit Zen Mode Instantly" />
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="space-y-4 p-8 bg-c-secondary/30 rounded-[2rem] border border-white/5">
          <div className="flex items-center gap-3 text-white">
            <h3 className="text-xs font-black uppercase tracking-widest">Progression</h3>
          </div>
          <p className="text-xs font-medium opacity-50 leading-relaxed tracking-wider">
            Reading fast is a long process, try increasing WPM as you feel more comfortable. Enable color guidelines and Zen mode on settings if it does help.  
          </p>
        </motion.div>

        <motion.div variants={itemVariants} className="space-y-4 p-8 bg-c-secondary/30 rounded-[2rem] border border-white/5">
          <div className="flex items-center gap-3 text-white">
            <h3 className="text-xs font-black uppercase tracking-widest">Get Yourself Comfortable</h3>
          </div>
          <p className="text-xs font-medium opacity-50 leading-relaxed tracking-wider">
            Check the settings out. Add your custom texts and find the perfect font and palette combination. Increase font size as needed.
          </p>
        </motion.div>

        <motion.div variants={itemVariants} className="space-y-4 p-8 bg-c-distinct/10 rounded-[2rem] border border-c-distinct/20 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 text-c-distinct">
                <MousePointer2 size={18} />
                <h3 className="text-xs font-black uppercase tracking-widest">Ready to start?</h3>
            </div>
          </div>
          
          <button 
            onClick={onStart}
            className="w-full py-4 bg-c-distinct text-white font-black rounded-xl hover:scale-[1.02] active:scale-95 transition-all text-xs tracking-[0.3em] uppercase"
          >
            Start Training
          </button>
        </motion.div>
      </div>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 opacity-[0.02] pointer-events-none">
        <h1 className="text-[30rem] font-black tracking-tighter">RSVP</h1>
      </div>
    </motion.div>
  );
};

const Shortcut = ({ keyLabel, action }) => (
  <div className="flex items-center justify-between group">
    <span className="text-[10px] font-black tracking-[0.2em] uppercase opacity-40 group-hover:opacity-100 transition-opacity">
        {action}
    </span>
    <div className="px-3 py-1 bg-c-secondary border border-white/10 rounded-lg text-[10px] font-black font-mono text-c-distinct shadow-lg">
      {keyLabel}
    </div>
  </div>
);