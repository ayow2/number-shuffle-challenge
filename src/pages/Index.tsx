
import { useState, useEffect } from "react";
import GameBoard from "../components/GameBoard";
import GameControls from "../components/GameControls";
import WinModal from "../components/WinModal";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { LightbulbIcon } from "lucide-react";

const TARGET_NUMBER = "800861907";

const Index = () => {
  const [moves, setMoves] = useState(0);
  const [gameWon, setGameWon] = useState(false);
  const [resetFlag, setResetFlag] = useState(0);
  const [time, setTime] = useState(0);
  
  // Timer effect
  useEffect(() => {
    if (gameWon) return;
    
    const timer = setInterval(() => {
      setTime(prev => prev + 1);
    }, 1000);
    
    return () => clearInterval(timer);
  }, [gameWon]);
  
  // Handle winning the game
  const handleWin = () => {
    setGameWon(true);
    toast.success("You've solved the puzzle!", {
      duration: 3000,
    });
  };
  
  // Handle move counter
  const handleMove = () => {
    setMoves(prev => prev + 1);
  };
  
  // Handle game reset
  const handleReset = () => {
    setMoves(0);
    setTime(0);
    setGameWon(false);
    setResetFlag(prev => prev + 1);
    
    toast.info("Game reset. Good luck!", {
      duration: 2000,
    });
  };
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-apple-bg">
      <motion.div 
        className="w-full max-w-md mx-auto mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-center mb-1">Number Puzzle</h1>
        <p className="text-apple-gray text-center">Arrange the numbers in the correct order</p>
      </motion.div>
      
      <div className="flex flex-col gap-8 w-full max-w-md mx-auto mb-8">
        <GameBoard 
          targetNumber={TARGET_NUMBER} 
          onWin={handleWin} 
          onMove={handleMove} 
          resetFlag={resetFlag} 
        />
        <GameControls 
          moves={moves} 
          onReset={handleReset} 
          gameWon={gameWon} 
        />
      </div>
      
      <motion.div 
        className="glass-panel p-4 max-w-md w-full mx-auto flex items-center gap-3"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <LightbulbIcon size={20} className="text-amber-500 shrink-0" />
        <p className="text-sm text-apple-gray">
          Click on any tile adjacent to the empty space to move it. The goal is to arrange the numbers to match the sequence shown above.
        </p>
      </motion.div>
      
      <WinModal 
        isOpen={gameWon} 
        moves={moves} 
        time={time} 
        onReset={handleReset} 
      />
    </div>
  );
};

export default Index;
