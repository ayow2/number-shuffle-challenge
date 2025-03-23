
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { RefreshCw, Clock, Zap } from "lucide-react";

interface GameControlsProps {
  moves: number;
  onReset: () => void;
  gameWon: boolean;
}

const GameControls: React.FC<GameControlsProps> = ({ moves, onReset, gameWon }) => {
  const [seconds, setSeconds] = useState(0);
  
  // Start the timer when the component mounts
  useEffect(() => {
    if (gameWon) return;
    
    const timer = setInterval(() => {
      setSeconds(prev => prev + 1);
    }, 1000);
    
    return () => clearInterval(timer);
  }, [gameWon]);
  
  // Reset the timer when the game is reset
  useEffect(() => {
    if (moves === 0) {
      setSeconds(0);
    }
  }, [moves]);
  
  // Format the time as mm:ss
  const formatTime = () => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };
  
  return (
    <motion.div 
      className="flex flex-col gap-6 w-full max-w-md mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="flex justify-between items-center glass-panel p-4">
        <div className="flex items-center gap-2">
          <Clock size={18} className="text-apple-gray" />
          <span className="text-lg font-medium">{formatTime()}</span>
        </div>
        
        <div className="flex items-center gap-2">
          <Zap size={18} className="text-apple-gray" />
          <span className="text-lg font-medium">{moves} moves</span>
        </div>
        
        <motion.button 
          className="button-secondary flex items-center gap-1"
          onClick={onReset}
          whileTap={{ scale: 0.95 }}
        >
          <RefreshCw size={16} />
          <span>Reset</span>
        </motion.button>
      </div>
      
      <div className="glass-panel p-4">
        <h2 className="text-lg font-medium text-center mb-2">Goal</h2>
        <p className="text-sm text-apple-gray text-center">
          Arrange the numbers to match the sequence: <span className="font-mono font-bold">80086190</span>
        </p>
      </div>
    </motion.div>
  );
};

export default GameControls;
