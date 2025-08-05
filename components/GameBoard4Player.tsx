import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Clock, User, Pause, Volume2, Crown, Star } from 'lucide-react';
import { Button } from './ui/button';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import DominoTile from './DominoTile';

interface Player {
  id: string;
  name: string;
  avatar: string;
  score: number;
  tilesCount: number;
  isActive: boolean;
  country: string;
  level: number;
  isBot?: boolean;
}

interface GameBoard4PlayerProps {
  onBackToHome: () => void;
  onGameEnd: (winner: Player) => void;
}

const GameBoard4Player: React.FC<GameBoard4PlayerProps> = ({ onBackToHome, onGameEnd }) => {
  const [gameTime, setGameTime] = useState(480); // 8 minutes
  const [isPaused, setIsPaused] = useState(false);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [selectedTile, setSelectedTile] = useState<number | null>(null);
  const [gamePhase, setGamePhase] = useState<'playing' | 'ended'>('playing');

  const [players, setPlayers] = useState<Player[]>([
    {
      id: 'player1',
      name: 'You',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
      score: 0,
      tilesCount: 7,
      isActive: true,
      country: 'Morocco',
      level: 12,
      isBot: false
    },
    {
      id: 'player2',
      name: 'Ahmad K.',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
      score: 0,
      tilesCount: 7,
      isActive: false,
      country: 'Algeria',
      level: 18,
      isBot: false
    },
    {
      id: 'player3',
      name: 'Fatima L.',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b372?w=100&h=100&fit=crop&crop=face',
      score: 0,
      tilesCount: 7,
      isActive: false,
      country: 'Tunisia',
      level: 22,
      isBot: false
    },
    {
      id: 'player4',
      name: 'Omar S.',
      avatar: 'https://images.unsplash.com/photo-1566492031773-4f4e44671d66?w=100&h=100&fit=crop&crop=face',
      score: 0,
      tilesCount: 7,
      isActive: false,
      country: 'Egypt',
      level: 15,
      isBot: false
    }
  ]);

  // Mock player tiles (only for current player)
  const playerTiles = [
    { id: 1, left: 6, right: 4 },
    { id: 2, left: 2, right: 3 },
    { id: 3, left: 5, right: 1 },
    { id: 4, left: 4, right: 4 },
    { id: 5, left: 1, right: 6 },
    { id: 6, left: 3, right: 2 },
    { id: 7, left: 5, right: 5 }
  ];

  // Mock board tiles (center of table)
  const boardTiles = [
    { id: 101, left: 3, right: 6, position: { x: 45, y: 45 } },
    { id: 102, left: 6, right: 2, position: { x: 55, y: 45 } },
    { id: 103, left: 2, right: 4, position: { x: 65, y: 45 } },
    { id: 104, left: 4, right: 1, position: { x: 40, y: 55 }, rotation: 90 }
  ];

  useEffect(() => {
    if (!isPaused && gameTime > 0 && gamePhase === 'playing') {
      const timer = setInterval(() => {
        setGameTime(prev => {
          if (prev <= 1) {
            const winner = players.reduce((prev, current) => 
              prev.score > current.score ? prev : current
            );
            onGameEnd(winner);
            setGamePhase('ended');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [isPaused, gameTime, gamePhase, players, onGameEnd]);

  useEffect(() => {
    // Simulate AI turns
    if (currentPlayerIndex !== 0 && gamePhase === 'playing') {
      const timer = setTimeout(() => {
        // Simulate AI move
        const currentPlayer = players[currentPlayerIndex];
        const newScore = currentPlayer.score + Math.floor(Math.random() * 20) + 10;
        const newTilesCount = Math.max(0, currentPlayer.tilesCount - 1);
        
        setPlayers(prev => prev.map((player, index) => 
          index === currentPlayerIndex 
            ? { ...player, score: newScore, tilesCount: newTilesCount }
            : player
        ));

        // Check if player won
        if (newTilesCount === 0) {
          onGameEnd(currentPlayer);
          setGamePhase('ended');
          return;
        }

        // Next player's turn
        const nextIndex = (currentPlayerIndex + 1) % 4;
        setPlayers(prev => prev.map((player, index) => ({
          ...player,
          isActive: index === nextIndex
        })));
        setCurrentPlayerIndex(nextIndex);
      }, 2000 + Math.random() * 2000); // 2-4 seconds

      return () => clearTimeout(timer);
    }
  }, [currentPlayerIndex, gamePhase, players, onGameEnd]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleTileClick = (tileId: number) => {
    if (currentPlayerIndex === 0 && gamePhase === 'playing') {
      setSelectedTile(selectedTile === tileId ? null : tileId);
    }
  };

  const handleTilePlay = (tileId: number) => {
    if (currentPlayerIndex === 0 && selectedTile === tileId && gamePhase === 'playing') {
      // Simulate player move
      const newScore = players[0].score + Math.floor(Math.random() * 25) + 15;
      const newTilesCount = Math.max(0, players[0].tilesCount - 1);
      
      setPlayers(prev => prev.map((player, index) => 
        index === 0 
          ? { ...player, score: newScore, tilesCount: newTilesCount }
          : player
      ));

      setSelectedTile(null);

      // Check if player won
      if (newTilesCount === 0) {
        onGameEnd(players[0]);
        setGamePhase('ended');
        return;
      }

      // Next player's turn
      const nextIndex = 1;
      setPlayers(prev => prev.map((player, index) => ({
        ...player,
        isActive: index === nextIndex
      })));
      setCurrentPlayerIndex(nextIndex);
    }
  };

  const getPlayerPosition = (index: number) => {
    switch (index) {
      case 0: return 'bottom'; // Current player
      case 1: return 'left';
      case 2: return 'top';
      case 3: return 'right';
      default: return 'bottom';
    }
  };

  const getPositionClasses = (position: string) => {
    switch (position) {
      case 'bottom': return 'bottom-4 left-1/2 -translate-x-1/2';
      case 'left': return 'left-4 top-1/2 -translate-y-1/2';
      case 'top': return 'top-4 left-1/2 -translate-x-1/2';
      case 'right': return 'right-4 top-1/2 -translate-y-1/2';
      default: return 'bottom-4 left-1/2 -translate-x-1/2';
    }
  };

  return (
    <div className="flex flex-col h-screen relative overflow-hidden transform-3d-deep">
      {/* Enhanced 3D Neon Background Environment */}
      <div className="absolute inset-0 felt-pattern" />
      
      {/* Multi-layer ambient lighting for 4-player table */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div 
          className="absolute top-0 left-0 w-96 h-96 bg-hot-pink/6 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.4, 0.7, 0.4]
          }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        <motion.div 
          className="absolute top-0 right-0 w-80 h-80 bg-mint-green/5 rounded-full blur-2xl translate-x-1/2 -translate-y-1/2"
          animate={{
            scale: [1.1, 0.9, 1.1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{ duration: 3, repeat: Infinity }}
        />
        <motion.div 
          className="absolute bottom-0 left-0 w-72 h-72 bg-coral-pink/4 rounded-full blur-xl -translate-x-1/2 translate-y-1/2"
          animate={{
            scale: [0.9, 1.3, 0.9],
            opacity: [0.2, 0.5, 0.2]
          }}
          transition={{ duration: 5, repeat: Infinity }}
        />
        <motion.div 
          className="absolute bottom-0 right-0 w-88 h-88 bg-teal-blue/4 rounded-full blur-2xl translate-x-1/2 translate-y-1/2"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{ duration: 6, repeat: Infinity }}
        />
      </div>

      {/* Enhanced Header */}
      <motion.div 
        className="glass-neon p-3 m-4 rounded-2xl depth-3 relative z-20 neon-shadow"
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
                scale: gameTime < 60 ? [1, 1.08, 1] : 1,
                boxShadow: gameTime < 60 ? [
                  '0 0 20px rgba(238, 34, 125, 0.4)',
                  '0 0 30px rgba(238, 34, 125, 0.8)',
                  '0 0 20px rgba(238, 34, 125, 0.4)'
                ] : ['0 0 10px rgba(73, 128, 153, 0.3)']
              }}
              transition={{ duration: 0.5, repeat: gameTime < 60 ? Infinity : 0 }}
            >
              <Clock size={16} className={gameTime < 60 ? "text-hot-pink" : "text-teal-blue"} />
              <span className={`font-mono font-bold ${gameTime < 60 ? "text-hot-pink" : "text-deep-purple"}`}>
                {formatTime(gameTime)}
              </span>
            </motion.div>

            <Badge className="bg-gradient-to-r from-purple-magenta to-deep-purple text-neon-white neon-glow">
              4 Players
            </Badge>

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

      {/* 4-Player Game Table */}
      <div className="flex-1 relative">
        {/* Enhanced Table Surface with 4-player neon effects */}
        <motion.div 
          className="absolute inset-4 felt-pattern depth-6 rounded-3xl neon-shadow-floating"
          initial={{ rotateX: 30, scale: 0.7, opacity: 0 }}
          animate={{ rotateX: 0, scale: 1, opacity: 1 }}
          transition={{ delay: 0.4, duration: 1.2, type: "spring" }}
          style={{
            background: `
              radial-gradient(ellipse at center, var(--felt-texture) 0%, var(--deep-purple) 100%),
              linear-gradient(45deg, rgba(238, 34, 125, 0.04) 25%, transparent 25%, transparent 75%, rgba(238, 34, 125, 0.04) 75%),
              linear-gradient(-45deg, rgba(253, 128, 131, 0.02) 25%, transparent 25%, transparent 75%, rgba(253, 128, 131, 0.02) 75%)
            `,
            backgroundSize: '100% 100%, 40px 40px, 40px 40px',
            boxShadow: `
              inset 0 0 200px rgba(59, 8, 85, 0.5),
              inset 0 20px 40px rgba(238, 34, 125, 0.15),
              0 30px 80px rgba(59, 8, 85, 0.4),
              0 0 50px rgba(238, 34, 125, 0.3)
            `
          }}
        >
          {/* 4-player table edge highlighting */}
          <div className="absolute inset-0 rounded-3xl border-2 border-hot-pink/25" />
          
          {/* Center playing area glow */}
          <motion.div 
            className="absolute top-1/2 left-1/2 w-64 h-32 bg-hot-pink/6 rounded-full blur-2xl -translate-x-1/2 -translate-y-1/2"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.4, 0.8, 0.4]
            }}
            transition={{ duration: 4, repeat: Infinity }}
          />
        </motion.div>

        {/* Board Tiles - Center Layout */}
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="relative w-96 h-64">
            {boardTiles.map((tile, index) => (
              <motion.div
                key={tile.id}
                className="absolute"
                style={{
                  left: `${tile.position.x}%`,
                  top: `${tile.position.y}%`,
                  transform: `translate(-50%, -50%) ${tile.rotation ? `rotate(${tile.rotation}deg)` : ''}`
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
                  delay: 0.8 + index * 0.2, 
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
                  skinId="neon-glow"
                />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Player Panels */}
        {players.map((player, index) => {
          const position = getPlayerPosition(index);
          const isCurrentPlayer = index === 0;
          
          return (
            <motion.div
              key={player.id}
              className={`absolute ${getPositionClasses(position)} z-20`}
              initial={{ 
                opacity: 0, 
                scale: 0.8,
                [position === 'bottom' || position === 'top' ? 'y' : 'x']: position === 'bottom' || position === 'right' ? 50 : -50
              }}
              animate={{ 
                opacity: 1, 
                scale: 1,
                [position === 'bottom' || position === 'top' ? 'y' : 'x']: 0
              }}
              transition={{ delay: 1 + index * 0.1, duration: 0.6 }}
            >
              <motion.div 
                className={`glass-neon p-3 rounded-2xl depth-3 ${
                  player.isActive ? 'ring-2 ring-mint-green neon-glow-mint' : ''
                } ${position === 'left' || position === 'right' ? 'w-64' : 'w-80'}`}
                animate={player.isActive ? {
                  boxShadow: [
                    '0 0 20px rgba(48, 192, 135, 0.4)',
                    '0 0 40px rgba(48, 192, 135, 0.7)',
                    '0 0 20px rgba(48, 192, 135, 0.4)'
                  ]
                } : {}}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <div className={`flex items-center gap-3 ${
                  position === 'top' ? 'flex-row-reverse' : 
                  position === 'left' ? 'flex-col' :
                  position === 'right' ? 'flex-col-reverse' : ''
                }`}>
                  <div className="relative">
                    <Avatar className={`${position === 'left' || position === 'right' ? 'w-12 h-12' : 'w-14 h-14'} depth-2`}>
                      <AvatarImage src={player.avatar} />
                      <AvatarFallback className="bg-gradient-to-br from-coral-pink to-hot-pink text-neon-white">
                        {player.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    {player.isActive && (
                      <motion.div 
                        className="absolute -top-1 -right-1 w-4 h-4 bg-mint-green rounded-full border-2 border-neon-white"
                        animate={{ 
                          scale: [1, 1.4, 1],
                          boxShadow: [
                            '0 0 10px rgba(48, 192, 135, 0.6)',
                            '0 0 20px rgba(48, 192, 135, 0.8)',
                            '0 0 10px rgba(48, 192, 135, 0.6)'
                          ]
                        }}
                        transition={{ duration: 1, repeat: Infinity }}
                      />
                    )}
                    {index === 2 && ( // Leader crown for top scorer
                      <motion.div
                        className="absolute -top-2 -right-2"
                        animate={{ rotate: [0, 10, -10, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <Crown size={16} className="text-hot-pink" />
                      </motion.div>
                    )}
                  </div>
                  
                  <div className={`flex-1 ${position === 'left' || position === 'right' ? 'text-center' : ''}`}>
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className={`font-semibold text-deep-purple ${
                        position === 'left' || position === 'right' ? 'text-sm' : ''
                      }`}>
                        {player.name}
                      </h4>
                      {player.level >= 20 && (
                        <Star size={12} className="text-coral-pink" />
                      )}
                    </div>
                    <div className={`grid grid-cols-3 gap-2 text-xs text-purple-magenta ${
                      position === 'left' || position === 'right' ? 'grid-cols-1 gap-1' : ''
                    }`}>
                      <span>Score: <span className="font-bold text-mint-green">{player.score}</span></span>
                      <span>Tiles: <span className="font-bold text-coral-pink">{player.tilesCount}</span></span>
                      <span>Lv.{player.level}</span>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Player's tile indicator (for non-current players) */}
              {!isCurrentPlayer && (
                <motion.div 
                  className={`flex gap-1 mt-2 ${
                    position === 'top' ? 'justify-center' :
                    position === 'left' ? 'flex-col items-center' :
                    position === 'right' ? 'flex-col items-center' :
                    'justify-center'
                  }`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.5 + index * 0.1 }}
                >
                  {[...Array(Math.min(player.tilesCount, 7))].map((_, tileIndex) => (
                    <motion.div
                      key={tileIndex}
                      className={`rounded-sm depth-1 ${
                        position === 'left' || position === 'right' ? 'w-3 h-5 mb-1' : 'w-3 h-5'
                      }`}
                      initial={{ rotateY: 180, opacity: 0 }}
                      animate={{ rotateY: 0, opacity: 1 }}
                      transition={{ 
                        delay: 1.7 + index * 0.1 + tileIndex * 0.05,
                        duration: 0.4
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
                </motion.div>
              )}
            </motion.div>
          );
        })}

        {/* Current Player's Hand */}
        {currentPlayerIndex === 0 && (
          <motion.div 
            className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30"
            initial={{ y: 150, opacity: 0, rotateX: 15 }}
            animate={{ y: 0, opacity: 1, rotateX: 0 }}
            transition={{ delay: 1.5, duration: 0.8, type: "spring" }}
          >
            <div className="glass-neon p-4 rounded-2xl depth-4 neon-shadow-floating">
              <div className="flex justify-center gap-2 overflow-x-auto pb-2">
                {playerTiles.map((tile, index) => (
                  <motion.div
                    key={tile.id}
                    initial={{ 
                      y: 60, 
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
                      delay: 1.7 + index * 0.1,
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
                      isPlayable={currentPlayerIndex === 0 && gamePhase === 'playing'}
                      onClick={() => handleTileClick(tile.id)}
                      onDoubleClick={() => handleTilePlay(tile.id)}
                      is3D={true}
                      skinId="neon-glow"
                      className="cursor-pointer"
                    />
                  </motion.div>
                ))}
              </div>
              
              {selectedTile && currentPlayerIndex === 0 && (
                <motion.p 
                  className="text-center text-sm text-neon-white/90 mt-2 glass-strong px-3 py-1 rounded-full mx-auto w-fit neon-glow"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                >
                  Double-tap to play selected tile
                </motion.p>
              )}
            </div>
          </motion.div>
        )}

        {/* Turn Indicator */}
        <AnimatePresence>
          {gamePhase === 'playing' && (
            <motion.div
              className="absolute top-8 left-1/2 transform -translate-x-1/2 glass-neon px-6 py-3 rounded-full depth-3 neon-glow-mint z-30"
              initial={{ y: -50, opacity: 0, scale: 0.8, rotateX: -20 }}
              animate={{ y: 0, opacity: 1, scale: 1, rotateX: 0 }}
              exit={{ y: -50, opacity: 0, scale: 0.8, rotateX: -20 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center gap-2">
                <Avatar className="w-6 h-6">
                  <AvatarImage src={players[currentPlayerIndex].avatar} />
                  <AvatarFallback className="bg-gradient-to-br from-mint-green to-teal-blue text-neon-white text-xs">
                    {players[currentPlayerIndex].name.slice(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <span className="font-semibold text-mint-green">
                  {players[currentPlayerIndex].name}'s Turn
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

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
                <p className="text-purple-magenta mb-6">4-Player Neon Domino Arena</p>
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
    </div>
  );
};

export default GameBoard4Player;