import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X } from 'lucide-react';

export const InputModal = ({ isOpen, onClose, onSubmit, title, defaultValue, type = "number" }) => {
  const [value, setValue] = useState(defaultValue);

  useEffect(() => {
    if (isOpen) setValue(defaultValue);
  }, [isOpen, defaultValue]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(value);
    onClose();
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
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative w-full max-w-[280px] bg-c-secondary border border-white/10 rounded-3xl shadow-2xl p-6 overflow-hidden pointer-events-auto"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-[10px] font-black uppercase tracking-[2px] text-c-light">
                {title}
              </h3>
              <button onClick={onClose} className="text-c-light hover:text-white transition-colors">
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                autoFocus
                type={type}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className="w-full bg-c-primary border border-white/5 rounded-xl px-4 py-3 text-xl font-bold text-c-distinct focus:outline-none focus:border-c-distinct/50 transition-colors"
              />
              
              <button
                type="submit"
                className="w-full py-3 bg-c-distinct text-white font-black rounded-xl flex items-center justify-center gap-2 hover:brightness-110 active:scale-[0.98] transition-all"
              >
                <Check size={18} />
                <span className="text-[10px] uppercase tracking-widest">Confirm</span>
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};