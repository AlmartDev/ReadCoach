import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, Lock } from 'lucide-react';

const SECRET_KEY = "42"; // YOU SHOULDN'T HAVE SEEN THIS!
const IMAGE_URL = "https://i.imgflip.com/6xa5ku.jpg";

export const EasterEgg = ({ isOpen, onClose }) => {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [value, setValue] = useState("");
  const [shake, setShake] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setValue("");
    }
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (value.trim().toUpperCase() === SECRET_KEY.toUpperCase()) {
      setIsUnlocked(true);
    } else {
      setShake(true);
      setTimeout(() => setShake(false), 500);
      setValue("");
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          <motion.div
            key={isUnlocked ? "unlocked" : "locked"}
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ 
              scale: 1, 
              opacity: 1, 
              y: 0,
              x: shake ? [-10, 10, -10, 10, 0] : 0 
            }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className={`
              relative w-full bg-c-secondary border border-white/10 rounded-3xl shadow-2xl p-6 overflow-hidden pointer-events-auto
              ${isUnlocked ? 'max-w-2xl' : 'max-w-[280px]'} 
            `}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-[10px] font-black uppercase tracking-[2px] text-c-light flex items-center gap-2">
                {!isUnlocked ? (
                  <>
                    <Lock size={10} /> Hidden Lock
                  </>
                ) : (
                  <>
                    <Check size={10} /> Unlocked
                  </>
                )}
              </h3>
              <button onClick={onClose} className="text-c-light hover:text-white transition-colors">
                <X size={16} />
              </button>
            </div>

            {!isUnlocked ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  autoFocus
                  placeholder="Secret Key"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  className="w-full bg-c-primary border border-white/5 rounded-xl px-4 py-3 text-xl font-bold text-c-distinct placeholder:text-white/10 focus:outline-none focus:border-c-distinct/50 transition-colors"
                />
                
                <button
                  type="submit"
                  className="w-full py-3 bg-c-distinct text-white font-black rounded-xl flex items-center justify-center gap-2 hover:brightness-110 active:scale-[0.98] transition-all"
                >
                  <Check size={18} />
                  <span className="text-[10px] uppercase tracking-widest">Unlock</span>
                </button>
              </form>
            ) : (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
                className="w-full"
              >
                <div className="rounded-xl overflow-hidden border border-white/5 shadow-inner">
                  <img 
                    src={IMAGE_URL} 
                    alt="Reward" 
                    className="w-full h-auto object-cover max-h-[60vh]"
                  />
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};