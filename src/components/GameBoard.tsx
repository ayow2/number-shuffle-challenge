
import { useState, useEffect, useCallback } from "react";
import NumberTile from "./NumberTile";
import { motion } from "framer-motion";

interface GameBoardProps {
  targetNumber: string;
  onWin: () => void;
  onMove: () => void;
  resetFlag: number;
}

const GameBoard: React.FC<GameBoardProps> = ({ targetNumber, onWin, onMove, resetFlag }) => {
  // Convert target number to array of numbers
  const targetArray = targetNumber.split("").map(Number);
  const boardSize = targetArray.length;
  
  // Initialize board state
  const [board, setBoard] = useState<(number | null)[]>([]);
  const [emptyIndex, setEmptyIndex] = useState<number>(boardSize - 1);
  
  // Generate initial shuffled board
  const initializeBoard = useCallback(() => {
    const numbers = [...targetArray];
    
    // Set the last position as empty
    numbers[boardSize - 1] = null;
    
    // Shuffle the array, but ensure it's solvable
    let shuffled = [...numbers];
    
    do {
      // Fisher-Yates shuffle algorithm
      for (let i = shuffled.length - 2; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
    } while (!isSolvable(shuffled) || isWinning(shuffled));
    
    setBoard(shuffled);
    setEmptyIndex(shuffled.indexOf(null));
  }, [targetArray, boardSize]);
  
  // Function to check if the current board arrangement is winning
  const isWinning = (currentBoard: (number | null)[]) => {
    for (let i = 0; i < boardSize - 1; i++) {
      if (currentBoard[i] !== targetArray[i]) {
        return false;
      }
    }
    return currentBoard[boardSize - 1] === null;
  };
  
  // Check if the puzzle is solvable
  const isSolvable = (puzzle: (number | null)[]) => {
    // In a 1D sliding puzzle, we can use inversion counting to determine solvability
    const inversionCount = countInversions(puzzle);
    
    // For odd-sized board, the number of inversions must be even for the puzzle to be solvable
    if (boardSize % 2 === 1) {
      return inversionCount % 2 === 0;
    }
    
    // For even-sized board, the parity of the inversions depends on the position of the empty cell
    const emptyPosition = puzzle.indexOf(null);
    const emptyRow = Math.floor(emptyPosition / Math.sqrt(boardSize));
    
    // If the empty cell is on an even row from the bottom, the number of inversions must be odd
    // If the empty cell is on an odd row from the bottom, the number of inversions must be even
    return (emptyRow % 2 === 0) ? (inversionCount % 2 === 1) : (inversionCount % 2 === 0);
  };
  
  // Count inversions in the puzzle
  const countInversions = (puzzle: (number | null)[]) => {
    let inversions = 0;
    
    for (let i = 0; i < puzzle.length; i++) {
      if (puzzle[i] === null) continue;
      
      for (let j = i + 1; j < puzzle.length; j++) {
        if (puzzle[j] === null) continue;
        
        if (puzzle[i]! > puzzle[j]!) {
          inversions++;
        }
      }
    }
    
    return inversions;
  };
  
  // Handle tile click
  const handleTileClick = (index: number) => {
    // Check if the clicked tile is adjacent to the empty space
    const isAdjacent = isAdjacentToEmpty(index);
    
    if (!isAdjacent) return;
    
    // Create a new board with the moved tile
    const newBoard = [...board];
    newBoard[emptyIndex] = board[index];
    newBoard[index] = null;
    
    setBoard(newBoard);
    setEmptyIndex(index);
    onMove();
    
    // Check if the new board is winning
    if (isWinning(newBoard)) {
      onWin();
    }
  };
  
  // Check if the index is adjacent to the empty tile
  const isAdjacentToEmpty = (index: number) => {
    // Calculate the grid size (assuming it's a square)
    const gridSize = Math.sqrt(boardSize);
    
    // Calculate row and column for both tiles
    const emptyRow = Math.floor(emptyIndex / gridSize);
    const emptyCol = emptyIndex % gridSize;
    const tileRow = Math.floor(index / gridSize);
    const tileCol = index % gridSize;
    
    // Check if it's adjacent horizontally or vertically
    return (
      (Math.abs(emptyRow - tileRow) === 1 && emptyCol === tileCol) ||
      (Math.abs(emptyCol - tileCol) === 1 && emptyRow === tileRow)
    );
  };
  
  // Check if a tile can be moved (is adjacent to empty)
  const isMovable = (index: number) => {
    return isAdjacentToEmpty(index);
  };
  
  // Initialize or reset the board when requested
  useEffect(() => {
    initializeBoard();
  }, [initializeBoard, resetFlag]);
  
  // Calculate grid template based on board size
  const gridSizeClass = {
    9: "grid-cols-3", // 3x3 grid
    16: "grid-cols-4" // 4x4 grid
  }[boardSize] || "grid-cols-3";
  
  return (
    <motion.div 
      className={`grid ${gridSizeClass} gap-3 w-full max-w-md mx-auto`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {board.map((value, index) => (
        <NumberTile
          key={index}
          value={value}
          index={index}
          isMovable={isMovable(index)}
          onClick={() => handleTileClick(index)}
        />
      ))}
    </motion.div>
  );
};

export default GameBoard;
