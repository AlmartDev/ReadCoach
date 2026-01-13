import React from 'react';
import { motion } from 'framer-motion';
import { LogOut, User, BarChart2 } from 'lucide-react';

export const ProfilePopup = ({ onClose }) => {
  return (
    <>
      <div 
        className="fixed inset-0 z-40 cursor-default" 
        onClick={onClose} 
      />

      <motion.div
        initial={{ opacity: 0, y: -10, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -10, scale: 0.95 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="absolute top-12 right-0 w-64 bg-c-secondary border border-white/10 rounded-2xl shadow-2xl z-50 overflow-hidden"
      >
        <div className="p-4 border-b border-white/5 bg-white/5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-c-distinct flex items-center justify-center text-white font-black shadow-lg">
              :)
            </div>
            <div>
              <h3 className="text-sm font-bold text-c-light tracking-wide">Offline User</h3>
              <p className="text-[10px] font-bold text-c-light uppercase tracking-wider">Level 1</p>
            </div>
          </div>
        </div>

        <div className="p-2">
            <div className="flex items-center justify-between p-2 hover:bg-white/5 rounded-lg transition-colors cursor-pointer group">
                <div className="flex items-center gap-3 text-slate-300 group-hover:text-white">
                    <BarChart2 size={16} />
                    <span className="text-xs font-bold uppercase tracking-widest">Stats</span>
                </div>
                <span className="text-xs font-mono text-c-distinct">0.0k</span>
            </div>
        </div>

        <div className="h-px bg-white/5 mx-4" />

        <div className="p-2">
           <button className="w-full flex items-center gap-3 p-2 text-red-400 hover:bg-red-500/10 hover:text-red-300 rounded-lg transition-colors">
              <LogOut size={16} />
              <span className="text-xs font-bold uppercase tracking-widest">Sign Out</span>
           </button>
        </div>
      </motion.div>
    </>
  );
};