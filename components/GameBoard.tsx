import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Clock, User, Bot, Pause, Volume2 } from 'lucide-react';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import DominoTile from './DominoTile';

interface GameBoardProps {
  onBackToHome: () => void;
  onGameEnd: (won: boolean) => void;
}

const GameBoard: React.FC<GameBoardProps> = ({ onBackToHome, onGameEnd }) => {
  const [gameTime, setGameTime] = useState(245);
  const [playerScore, setPlayerScore] = useState(0);
  const [opponentScore, setOpponentScore] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);
  const [selectedTile, setSelectedTile] = useState<number | null>(null);

  // Mock game state
  const playerTiles = [
    { id: 1, left: 6, right: 4 },
    { id: 2, left: 2, right: 3 },
    { id: 3, left: 5, right: 1 },
    { id: 4, left: 4, right: 4 },
    { id: 5, left: 1, right: 6 },
    { id: 6, left: 3, right: 2 },
    { id: 7, left: 5, right: 5 }
  ];

  const boardTiles = [
    { id: 101, left: 3, right: 6, position: { x: 50, y: 45 } },
    { id: 102, left: 6, right: 2, position: { x: 58, y: 45 } },
    { id: 103, left: 2, right: 4, position: { x: 66, y: 45 } }
  ];

  const opponentTileCount = 6;

  useEffect(() => {
    if (!isPaused && gameTime > 0) {
      const timer = setInterval(() => {
        setGameTime(prev => {
          if (prev <= 1) {
            onGameEnd(playerScore > opponentScore);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [isPaused, gameTime, playerScore, opponentScore, onGameEnd]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleTileClick = (tileId: number) => {
    if (isPlayerTurn) {
      setSelectedTile(selectedTile === tileId ? null : tileId);
    }
  };

  const handleTilePlay = (tileId: number) => {
    if (isPlayerTurn && selectedTile === tileId) {
      // Simulate tile play
      setPlayerScore(prev => prev + Math.floor(Math.random() * 20) + 10);
      setSelectedTile(null);
      setIsPlayerTurn(false);
      
      // Simulate opponent turn
      setTimeout(() => {
        setOpponentScore(prev => prev + Math.floor(Math.random() * 15) + 8);
        setIsPlayerTurn(true);
      }, 2000);
    }
  };

  return (
    <div className="flex flex-col h-screen relative overflow-hidden transform-3d-deep">
      {/* 3D Neon Background Environment */}
      <div className="absolute inset-0 felt-pattern" />
      
      {/* Enhanced neon ambient lighting */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div 
          className="absolute top-0 left-1/2 w-96 h-96 bg-hot-pink/8 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.6, 0.9, 0.6]
          }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        <motion.div 
          className="absolute bottom-0 right-0 w-64 h-64 bg-mint-green/6 rounded-full blur-2xl translate-x-1/2 translate-y-1/2"
          animate={{
            scale: [1.1, 0.9, 1.1],
            opacity: [0.5, 0.8, 0.5]
          }}
          transition={{ duration: 3, repeat: Infinity }}
        />
        <motion.div 
          className="absolute top-1/2 left-0 w-48 h-48 bg-coral-pink/5 rounded-full blur-xl -translate-x-1/2 -translate-y-1/2"
          animate={{
            scale: [0.9, 1.3, 0.9],
            opacity: [0.4, 0.7, 0.4]
          }}
          transition={{ duration: 5, repeat: Infinity }}
        />
      </div>

      {/* Enhanced Header with Neon Glass */}
      <motion.div 
        className="glass-neon p-4 depth-3 relative z-10 neon-shadow"
        initial={{ y: -100, opacity: 0, rotateX: -20 }}
        animate={{ y: 0, opacity: 1, rotateX: 0 }}
        transition={{ duration: 0.8, type: "spring" }}
      >
        <div className="flex items-center justify-between">
          <motion.div whileHover={{ scale: 1.1, rotateY: 10 }} whileTap={{ scale: 0.9 }}>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onBackToHome}
              className="glass-strong rounded-full p-2 btn-3d neon-glow-coral"
            >
              <ArrowLeft size={20} className="text-coral-pink" />
            </Button>
          </motion.div>

          <div className="flex items-center gap-4">
            <motion.div 
              className="flex items-center gap-2 glass-strong px-3 py-1 rounded-full"
              animate={{ 
                scale: gameTime < 30 ? [1, 1.08, 1] : 1,
                boxShadow: gameTime < 30 ? [
                  '0 0 20px rgba(238, 34, 125, 0.4)',
                  '0 0 30px rgba(238, 34, 125, 0.8)',
                  '0 0 20px rgba(238, 34, 125, 0.4)'
                ] : ['0 0 10px rgba(73, 128, 153, 0.3)']
              }}
              transition={{ duration: 0.5, repeat: gameTime < 30 ? Infinity : 0 }}
            >
              <Clock size={16} className={gameTime < 30 ? "text-hot-pink" : "text-teal-blue"} />
              <span className={`font-mono font-bold ${gameTime < 30 ? "text-hot-pink" : "text-deep-purple"}`}>
                {formatTime(gameTime)}
              </span>
            </motion.div>

            <motion.div whileHover={{ scale: 1.1, rotateZ: 10 }} whileTap={{ scale: 0.9 }}>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setIsPaused(!isPaused)}
                className="glass-strong rounded-full p-2 btn-3d"
              >
                <Pause size={18} className="text-purple-magenta" />
              </Button>
            </motion.div>

            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Button 
                variant="ghost" 
                size="sm"
                className="glass-strong rounded-full p-2 btn-3d"
              >
                <Volume2 size={18} className="text-teal-blue" />
              </Button>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Enhanced Score Panel with Neon Effects */}
      <motion.div 
        className="flex justify-between items-center px-4 py-3 glass-strong mx-4 my-2 rounded-xl depth-2 neon-shadow"
        initial={{ scale: 0.9, opacity: 0, rotateX: -15 }}
        animate={{ scale: 1, opacity: 1, rotateX: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        <div className="flex items-center gap-3">
          <motion.div 
            className="w-10 h-10 bg-gradient-to-br from-teal-blue to-mint-green rounded-full flex items-center justify-center depth-2 neon-glow-mint"
            whileHover={{ scale: 1.1, rotateY: 15 }}
          >
            <User size={20} className="text-neon-white" />
          </motion.div>
          <div>
            <p className="text-sm text-purple-magenta">You</p>
            <motion.p 
              className="font-bold text-xl text-teal-blue"
              key={playerScore}
              initial={{ scale: 1.3, color: 'rgb(48, 192, 135)' }}
              animate={{ scale: 1, color: 'rgb(73, 128, 153)' }}
              transition={{ duration: 0.4 }}
            >
              {playerScore}
            </motion.p>
          </div>
        </div>

        <div className="text-center">
          <div className="text-xs text-purple-magenta/80 mb-1">Turn</div>
          <motion.div
            className={`w-3 h-3 rounded-full ${isPlayerTurn ? 'bg-mint-green' : 'bg-hot-pink'}`}
            animate={{ 
              scale: [1, 1.4, 1],
              boxShadow: isPlayerTurn ? [
                '0 0 10px rgba(48, 192, 135, 0.6)',
                '0 0 20px rgba(48, 192, 135, 0.8)',
                '0 0 10px rgba(48, 192, 135, 0.6)'
              ] : [
                '0 0 10px rgba(238, 34, 125, 0.6)',
                '0 0 20px rgba(238, 34, 125, 0.8)',
                '0 0 10px rgba(238, 34, 125, 0.6)'
              ]
            }}
            transition={{ duration: 1, repeat: Infinity }}
          />
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-sm text-purple-magenta">Opponent</p>
            <motion.p 
              className="font-bold text-xl text-coral-pink"
              key={opponentScore}
              initial={{ scale: 1.3, color: 'rgb(253, 128, 131)' }}
              animate={{ scale: 1, color: 'rgb(238, 34, 125)' }}
              transition={{ duration: 0.4 }}
            >
              {opponentScore}
            </motion.p>
          </div>
          <motion.div 
            className="w-10 h-10 bg-gradient-to-br from-coral-pink to-hot-pink rounded-full flex items-center justify-center depth-2 neon-glow-coral"
            whileHover={{ scale: 1.1, rotateY: -15 }}
          >
            <Bot size={20} className="text-neon-white" />
          </motion.div>
        </div>
      </motion.div>

      {/* 3D Neon Game Table */}
      <div className="flex-1 relative overflow-hidden">
        {/* Enhanced Table Surface with 3D Neon Effect */}
        <motion.div 
          className="absolute inset-0 felt-pattern depth-5 mx-4 my-4 rounded-2xl neon-shadow-floating"
          initial={{ rotateX: 25, scale: 0.8, opacity: 0 }}
          animate={{ rotateX: 0, scale: 1, opacity: 1 }}
          transition={{ delay: 0.4, duration: 1, type: "spring" }}
          style={{
            background: `
              radial-gradient(ellipse at center, var(--felt-texture) 0%, var(--deep-purple) 100%),
              linear-gradient(45deg, rgba(238, 34, 125, 0.05) 25%, transparent 25%, transparent 75%, rgba(238, 34, 125, 0.05) 75%),
              linear-gradient(-45deg, rgba(253, 128, 131, 0.03) 25%, transparent 25%, transparent 75%, rgba(253, 128, 131, 0.03) 75%)
            `,
            backgroundSize: '100% 100%, 30px 30px, 30px 30px',
            boxShadow: `
              inset 0 0 150px rgba(59, 8, 85, 0.4),
              inset 0 15px 30px rgba(238, 34, 125, 0.2),
              0 25px 50px rgba(59, 8, 85, 0.4),
              0 0 40px rgba(238, 34, 125, 0.3)
            `
          }}
        >
          {/* Enhanced table edge highlighting */}
          <div className="absolute inset-0 rounded-2xl border border-hot-pink/20" />
          
          {/* Center area neon glow */}
          <motion.div 
            className="absolute top-1/2 left-1/2 w-48 h-24 bg-hot-pink/8 rounded-full blur-xl -translate-x-1/2 -translate-y-1/2"
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.6, 0.9, 0.6]
            }}
            transition={{ duration: 3, repeat: Infinity }}
          />
        </motion.div>

        {/* Board Tiles - Enhanced 3D Neon Layout */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-80 h-40">
            {boardTiles.map((tile, index) => (
              <motion.div
                key={tile.id}
                className="absolute"
                style={{
                  left: `${tile.position.x}%`,
                  top: `${tile.position.y}%`,
                  transform: 'translate(-50%, -50%)'
                }}
                initial={{ 
                  scale: 0, 
                  rotateY: 180,
                  opacity: 0 
                }}
                animate={{ 
                  scale: 1, 
                  rotateY: 0,
                  opacity: 1 
                }}
                transition={{ 
                  delay: 0.6 + index * 0.2, 
                  duration: 0.8,
                  type: "spring",
                  stiffness: 200
                }}
              >
                <DominoTile
                  leftDots={tile.left}
                  rightDots={tile.right}
                  size="large"
                  is3D={true}
                  variant="neon"
                />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Enhanced Turn Indicator */}
        <AnimatePresence>
          {isPlayerTurn && (
            <motion.div
              className="absolute top-8 left-1/2 transform -translate-x-1/2 glass-neon px-4 py-2 rounded-full depth-3 neon-glow-mint"
              initial={{ y: -50, opacity: 0, scale: 0.8, rotateX: -20 }}
              animate={{ y: 0, opacity: 1, scale: 1, rotateX: 0 }}
              exit={{ y: -50, opacity: 0, scale: 0.8, rotateX: -20 }}
              transition={{ duration: 0.5 }}
            >
              <span className="text-sm font-semibold text-mint-green">Your Turn</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Enhanced Opponent Hand Indicator */}
      <motion.div 
        className="px-4 py-2"
        initial={{ y: -30, opacity: 0, rotateX: -15 }}
        animate={{ y: 0, opacity: 1, rotateX: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
      >
        <div className="flex justify-center gap-1">
          {[...Array(opponentTileCount)].map((_, index) => (
            <motion.div
              key={index}
              className="w-4 h-6 rounded-sm depth-1"
              initial={{ rotateY: 180, y: -20, opacity: 0 }}
              animate={{ rotateY: 0, y: 0, opacity: 1 }}
              transition={{ 
                delay: 1 + index * 0.1,
                duration: 0.5,
                type: "spring"
              }}
              style={{
                background: 'linear-gradient(145deg, var(--purple-magenta) 0%, var(--deep-purple) 100%)',
                boxShadow: `
                  0 2px 6px rgba(59, 8, 85, 0.4), 
                  inset 0 1px 0 rgba(253, 128, 131, 0.2),
                  0 0 8px rgba(133, 36, 103, 0.3)
                `
              }}
            />
          ))}
        </div>
      </motion.div>

      {/* Enhanced Player Hand with Neon Effects */}
      <motion.div 
        className="p-4 glass-neon depth-4 neon-shadow-floating"
        initial={{ y: 100, opacity: 0, rotateX: 15 }}
        animate={{ y: 0, opacity: 1, rotateX: 0 }}
        transition={{ delay: 1, duration: 0.8, type: "spring" }}
      >
        <div className="flex justify-center gap-2 overflow-x-auto pb-2">
          {playerTiles.map((tile, index) => (
            <motion.div
              key={tile.id}
              initial={{ 
                y: 50, 
                opacity: 0, 
                rotateX: -45,
                scale: 0.8
              }}
              animate={{ 
                y: selectedTile === tile.id ? -10 : 0, 
                opacity: 1, 
                rotateX: 0,
                scale: selectedTile === tile.id ? 1.1 : 1
              }}
              transition={{ 
                delay: 1.2 + index * 0.1,
                duration: 0.6,
                type: "spring",
                stiffness: 200
              }}
              whileHover={{ 
                y: -8, 
                scale: 1.05,
                transition: { duration: 0.2 }
              }}
            >
              <DominoTile
                leftDots={tile.left}
                rightDots={tile.right}
                isSelected={selectedTile === tile.id}
                isPlayable={isPlayerTurn}
                onClick={() => handleTileClick(tile.id)}
                onDoubleClick={() => handleTilePlay(tile.id)}
                is3D={true}
                variant="neon"
                className="cursor-pointer"
              />
            </motion.div>
          ))}
        </div>
        
        {selectedTile && (
          <motion.p 
            className="text-center text-sm text-neon-white/90 mt-2 glass-strong px-3 py-1 rounded-full mx-auto w-fit neon-glow"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
          >
            Double-tap to play selected tile
          </motion.p>
        )}
      </motion.div>

      {/* Enhanced Pause Overlay */}
      <AnimatePresence>
        {isPaused && (
          <motion.div
            className="absolute inset-0 glass-neon flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="text-center glass-neon p-8 rounded-2xl depth-5 neon-shadow-floating"
              initial={{ scale: 0.8, rotateX: -20, opacity: 0 }}
              animate={{ scale: 1, rotateX: 0, opacity: 1 }}
              exit={{ scale: 0.8, rotateX: -20, opacity: 0 }}
            >
              <h2 className="text-2xl font-bold mb-4 text-deep-purple">Game Paused</h2>
              <Button 
                onClick={() => setIsPaused(false)}
                className="bg-gradient-to-r from-mint-green to-teal-blue hover:from-teal-blue hover:to-mint-green text-deep-purple btn-3d neon-glow-mint"
              >
                Resume Game
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GameBoard;