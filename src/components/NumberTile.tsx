
import { motion } from "framer-motion";

interface NumberTileProps {
  value: number | null;
  index: number;
  isMovable: boolean;
  onClick: () => void;
}

const NumberTile: React.FC<NumberTileProps> = ({ value, index, isMovable, onClick }) => {
  const isEmpty = value === null;
  
  const tileClasses = `flex items-center justify-center aspect-square rounded-xl text-xl font-bold cursor-pointer transition-colors 
    ${isEmpty ? 'bg-transparent' : 'bg-white/80 shadow-sm border border-white/40'} 
    ${isMovable ? 'hover:bg-blue-50' : 'cursor-not-allowed'} 
    ${isEmpty ? 'pointer-events-none' : ''}`;
  
  return (
    <motion.div 
      className={tileClasses}
      onClick={isMovable ? onClick : undefined}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ 
        scale: 1,
        opacity: isEmpty ? 0 : 1,
      }}
      transition={{ 
        type: "spring",
        stiffness: 300,
        damping: 20,
        delay: index * 0.05 
      }}
      whileHover={isMovable ? { scale: 1.05 } : undefined}
      whileTap={isMovable ? { scale: 0.95 } : undefined}
      layout
    >
      {value}
    </motion.div>
  );
};

export default NumberTile;
