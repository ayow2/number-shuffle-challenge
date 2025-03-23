
import { motion, AnimatePresence } from "framer-motion";
import { Trophy, Timer, RefreshCw } from "lucide-react";

interface WinModalProps {
  isOpen: boolean;
  moves: number;
  time: number;
  onReset: () => void;
}

const WinModal: React.FC<WinModalProps> = ({ isOpen, moves, time, onReset }) => {
  // Format the time as mm:ss
  const formatTime = () => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };
  
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm z-50 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div 
            className="bg-white rounded-2xl p-6 shadow-xl max-w-md w-full border border-white/40"
            initial={{ scale: 0.8, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.8, y: 20, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            <div className="flex flex-col items-center text-center">
              <motion.div 
                className="w-20 h-20 rounded-full bg-apple-blue/10 flex items-center justify-center mb-6"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
              >
                <Trophy size={40} className="text-apple-blue" />
              </motion.div>
              
              <motion.h2 
                className="text-2xl font-bold mb-2"
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                Congratulations!
              </motion.h2>
              
              <motion.p 
                className="text-apple-gray mb-6"
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                You've successfully completed the challenge.
              </motion.p>
              
              <motion.div 
                className="grid grid-cols-2 gap-4 w-full mb-6"
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <div className="bg-apple-lightgray/30 p-3 rounded-xl">
                  <div className="flex items-center justify-center gap-2 mb-1">
                    <Timer size={16} className="text-apple-gray" />
                    <span className="text-sm text-apple-gray">Time</span>
                  </div>
                  <p className="text-xl font-semibold">{formatTime()}</p>
                </div>
                
                <div className="bg-apple-lightgray/30 p-3 rounded-xl">
                  <div className="flex items-center justify-center gap-2 mb-1">
                    <Zap size={16} className="text-apple-gray" />
                    <span className="text-sm text-apple-gray">Moves</span>
                  </div>
                  <p className="text-xl font-semibold">{moves}</p>
                </div>
              </motion.div>
              
              <motion.button 
                className="button-primary w-full flex items-center justify-center gap-2"
                onClick={onReset}
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
                whileTap={{ scale: 0.97 }}
              >
                <RefreshCw size={16} />
                <span>Play Again</span>
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WinModal;
