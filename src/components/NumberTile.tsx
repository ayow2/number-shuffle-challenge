
import { motion } from "framer-motion";

interface NumberTileProps {
  value: number | null;
  index: number;
  isMovable: boolean;
  onClick: () => void;
}

const NumberTile: React.FC<NumberTileProps> = ({ value, index, isMovable, onClick }) => {
  const isEmpty = value === null;
  
  const tileClass = `number-tile ${isEmpty ? 'empty' : ''} ${isMovable ? 'movable' : ''}`;
  
  return (
    <motion.div 
      className={tileClass}
      onClick={isMovable ? onClick : undefined}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ 
        scale: 1,
        opacity: isEmpty ? 0.5 : 1,
      }}
      transition={{ 
        type: "spring",
        stiffness: 300,
        damping: 20,
        delay: index * 0.05 
      }}
      whileTap={isMovable ? { scale: 0.95 } : undefined}
      layout
    >
      {value}
    </motion.div>
  );
};

export default NumberTile;
