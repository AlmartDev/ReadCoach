import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, AlignLeft } from 'lucide-react';

export const TextInputModal = ({ isOpen, onClose, onSubmit }) => {
  const [value, setValue] = useState("");

  useEffect(() => {
    if (isOpen) setValue("");
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (value.trim()) {
      onSubmit(value);
      onClose();
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
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative w-full max-w-[800px] bg-c-secondary border border-white/10 rounded-3xl shadow-2xl p-6 overflow-hidden pointer-events-auto"
          >
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-2">
                <AlignLeft size={14} className="text-c-distinct" />
                <h3 className="text-[10px] font-black uppercase tracking-[2px] text-c-light">
                  Paste Custom Content
                </h3>
              </div>
              <button onClick={onClose} className="text-c-light hover:text-white transition-colors">
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <textarea
                autoFocus
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Paste your article or text here..."
                className="w-full h-64 bg-c-primary border border-white/5 rounded-xl px-4 py-3 text-sm font-medium text-c-text-main focus:outline-none focus:border-c-distinct/50 transition-colors resize-none"
              />
              
              <button
                type="submit"
                disabled={!value.trim()}
                className="w-full py-3 bg-c-distinct text-white font-black rounded-xl flex items-center justify-center gap-2 hover:brightness-110 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Check size={18} />
                <span className="text-[10px] uppercase tracking-widest">Load Text</span>
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};