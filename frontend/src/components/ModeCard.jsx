import { motion } from 'framer-motion';

export const ModeCard = ({ layoutId, title, subtext, description, onClick, variant }) => {
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