import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Trophy, 
  Home, 
  RotateCcw, 
  Star, 
  Coins, 
  TrendingUp, 
  Clock,
  Target,
  Zap,
  Crown,
  Sparkles
} from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';

interface GameResultScreenProps {
  won: boolean;
  onPlayAgain: () => void;
  onBackToHome: () => void;
  finalScore: number;
  opponentScore: number;
  coinsEarned: number;
  xpEarned: number;
  gameTime: number;
}

const GameResultScreen: React.FC<GameResultScreenProps> = ({
  won,
  onPlayAgain,
  onBackToHome,
  finalScore,
  opponentScore,
  coinsEarned,
  xpEarned,
  gameTime
}) => {
  const [showConfetti, setShowConfetti] = useState(false);
  const [animateStats, setAnimateStats] = useState(false);

  useEffect(() => {
    if (won) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    }
    setTimeout(() => setAnimateStats(true), 500);
  }, [won]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const achievements = [
    { 
      icon: <Target size={16} />, 
      text: "High Score Bonus", 
      points: finalScore > 100 ? 50 : 0,
      unlocked: finalScore > 100
    },
    { 
      icon: <Zap size={16} />, 
      text: "Speed Bonus", 
      points: gameTime < 180 ? 25 : 0,
      unlocked: gameTime < 180
    },
    { 
      icon: <Crown size={16} />, 
      text: "Perfect Victory", 
      points: won && finalScore > opponentScore * 1.5 ? 100 : 0,
      unlocked: won && finalScore > opponentScore * 1.5
    }
  ];

  const totalBonus = achievements.reduce((sum, achievement) => sum + achievement.points, 0);

  return (
    <div className="flex flex-col h-screen relative overflow-hidden transform-3d-deep">
      {/* Neon Result Background */}
      <div className="absolute inset-0" style={{
        background: won 
          ? `
            radial-gradient(circle at 30% 20%, rgba(48, 192, 135, 0.15) 0%, transparent 50%),
            radial-gradient(circle at 70% 80%, rgba(253, 128, 131, 0.12) 0%, transparent 50%),
            linear-gradient(135deg, var(--neon-day-start) 0%, var(--neon-day-end) 100%)
          `
          : `
            radial-gradient(circle at 30% 20%, rgba(238, 34, 125, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 70% 80%, rgba(133, 36, 103, 0.08) 0%, transparent 50%),
            linear-gradient(135deg, var(--neon-day-start) 0%, var(--neon-day-end) 100%)
          `
      }} />

      {/* Victory Confetti Effect */}
      <AnimatePresence>
        {showConfetti && won && (
          <div className="absolute inset-0 pointer-events-none z-30">
            {[...Array(50)].map((_, i) => (
              <motion.div
                key={i}
                className={`absolute w-2 h-2 ${
                  i % 5 === 0 ? 'bg-hot-pink' :
                  i % 5 === 1 ? 'bg-coral-pink' :
                  i % 5 === 2 ? 'bg-mint-green' :
                  i % 5 === 3 ? 'bg-teal-blue' : 'bg-purple-magenta'
                } rounded-full`}
                style={{
                  left: `${Math.random() * 100}%`,
                  top: '-10px'
                }}
                animate={{
                  y: window.innerHeight + 100,
                  x: Math.random() * 200 - 100,
                  rotate: 360,
                  scale: [1, 0.5, 1]
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  ease: "easeOut",
                  delay: Math.random() * 0.5
                }}
              />
            ))}
          </div>
        )}
      </AnimatePresence>

      {/* Floating Neon Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-3 h-3 ${won ? 'bg-mint-green' : 'bg-coral-pink'}/20 rounded-full blur-sm`}
            style={{
              left: `${20 + i * 10}%`,
              top: `${30 + (i % 3) * 20}%`
            }}
            animate={{
              y: [-20, 20, -20],
              opacity: [0.3, 0.8, 0.3],
              scale: [0.8, 1.2, 0.8]
            }}
            transition={{
              duration: 4 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Main Result Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 relative z-10">
        
        {/* Result Header */}
        <motion.div
          className="text-center mb-8"
          initial={{ scale: 0, rotateY: -180, opacity: 0 }}
          animate={{ scale: 1, rotateY: 0, opacity: 1 }}
          transition={{ duration: 0.8, type: "spring", stiffness: 150 }}
        >
          <motion.div
            className={`w-24 h-24 rounded-full mx-auto mb-4 flex items-center justify-center ${
              won ? 'bg-gradient-to-br from-mint-green to-teal-blue neon-glow-mint' 
                  : 'bg-gradient-to-br from-coral-pink to-hot-pink neon-glow-coral'
            } depth-5`}
            animate={won ? {
              rotate: [0, 360],
              scale: [1, 1.1, 1]
            } : {
              rotate: [0, -10, 10, 0],
              scale: [1, 0.95, 1]
            }}
            transition={{ 
              duration: won ? 2 : 1, 
              repeat: won ? Infinity : 3,
              ease: "easeInOut"
            }}
          >
            {won ? (
              <Trophy size={40} className="text-neon-white" />
            ) : (
              <Star size={40} className="text-neon-white" />
            )}
          </motion.div>

          <motion.h1
            className={`text-4xl font-bold mb-2 ${
              won ? 'text-mint-green' : 'text-coral-pink'
            }`}
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            style={{
              textShadow: won 
                ? '0 0 20px rgba(48, 192, 135, 0.5)' 
                : '0 0 20px rgba(253, 128, 131, 0.5)'
            }}
          >
            {won ? 'VICTORY!' : 'DEFEAT'}
          </motion.h1>

          <motion.p
            className="text-purple-magenta text-lg"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            {won 
              ? 'Outstanding performance in the neon arena!' 
              : 'Better luck next time, champion!'
            }
          </motion.p>
        </motion.div>

        {/* Score Display */}
        <motion.div
          className="glass-neon rounded-2xl p-6 mb-6 w-full max-w-sm depth-4 neon-shadow"
          initial={{ y: 100, opacity: 0, rotateX: -20 }}
          animate={{ y: 0, opacity: 1, rotateX: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          <div className="flex justify-between items-center mb-4">
            <div className="text-center">
              <p className="text-sm text-purple-magenta mb-1">Your Score</p>
              <motion.p 
                className="text-3xl font-bold text-teal-blue"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.8, duration: 0.5, type: "spring" }}
              >
                {finalScore}
              </motion.p>
            </div>
            
            <div className={`text-2xl ${won ? 'text-mint-green' : 'text-coral-pink'}`}>
              {won ? '>' : '<'}
            </div>
            
            <div className="text-center">
              <p className="text-sm text-purple-magenta mb-1">Opponent</p>
              <motion.p 
                className="text-3xl font-bold text-coral-pink"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1, duration: 0.5, type: "spring" }}
              >
                {opponentScore}
              </motion.p>
            </div>
          </div>

          <div className="text-center">
            <Badge 
              className={`${
                won ? 'bg-mint-green text-deep-purple neon-glow-mint' 
                    : 'bg-coral-pink text-deep-purple neon-glow-coral'
              } px-4 py-1`}
            >
              Difference: {Math.abs(finalScore - opponentScore)} points
            </Badge>
          </div>
        </motion.div>

        {/* Game Stats */}
        <motion.div
          className="grid grid-cols-2 gap-4 w-full max-w-sm mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <motion.div
            className="glass-strong rounded-xl p-4 text-center depth-2 card-3d"
            initial={{ x: -50, rotateY: -15 }}
            animate={{ x: 0, rotateY: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            <Clock size={20} className="text-teal-blue mx-auto mb-2" />
            <p className="text-sm text-purple-magenta">Game Time</p>
            <p className="text-lg font-bold text-deep-purple">{formatTime(gameTime)}</p>
          </motion.div>

          <motion.div
            className="glass-strong rounded-xl p-4 text-center depth-2 card-3d"
            initial={{ x: 50, rotateY: 15 }}
            animate={{ x: 0, rotateY: 0 }}
            transition={{ delay: 0.9, duration: 0.5 }}
          >
            <TrendingUp size={20} className="text-coral-pink mx-auto mb-2" />
            <p className="text-sm text-purple-magenta">Performance</p>
            <p className="text-lg font-bold text-deep-purple">
              {Math.round((finalScore / (finalScore + opponentScore)) * 100)}%
            </p>
          </motion.div>
        </motion.div>

        {/* Rewards Section */}
        <motion.div
          className="glass-neon rounded-2xl p-6 w-full max-w-sm mb-6 depth-4 neon-shadow"
          initial={{ y: 50, opacity: 0, scale: 0.9 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          transition={{ delay: 0.7, duration: 0.8 }}
        >
          <h3 className="text-lg font-bold text-deep-purple mb-4 text-center">Rewards Earned</h3>
          
          <div className="space-y-3">
            <motion.div
              className="flex items-center justify-between p-3 glass-strong rounded-lg"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: animateStats ? 1 : 0, x: animateStats ? 0 : -20 }}
              transition={{ delay: 1, duration: 0.5 }}
            >
              <div className="flex items-center gap-2">
                <Coins size={18} className="text-coral-pink" />
                <span className="text-sm font-medium text-deep-purple">Coins</span>
              </div>
              <motion.span 
                className="font-bold text-coral-pink"
                initial={{ scale: 0 }}
                animate={{ scale: animateStats ? 1 : 0 }}
                transition={{ delay: 1.2, duration: 0.3, type: "spring" }}
              >
                +{coinsEarned}
              </motion.span>
            </motion.div>

            <motion.div
              className="flex items-center justify-between p-3 glass-strong rounded-lg"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: animateStats ? 1 : 0, x: animateStats ? 0 : -20 }}
              transition={{ delay: 1.1, duration: 0.5 }}
            >
              <div className="flex items-center gap-2">
                <Star size={18} className="text-mint-green" />
                <span className="text-sm font-medium text-deep-purple">Experience</span>
              </div>
              <motion.span 
                className="font-bold text-mint-green"
                initial={{ scale: 0 }}
                animate={{ scale: animateStats ? 1 : 0 }}
                transition={{ delay: 1.3, duration: 0.3, type: "spring" }}
              >
                +{xpEarned} XP
              </motion.span>
            </motion.div>

            {totalBonus > 0 && (
              <motion.div
                className="flex items-center justify-between p-3 glass-strong rounded-lg border border-hot-pink/30"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: animateStats ? 1 : 0, x: animateStats ? 0 : -20 }}
                transition={{ delay: 1.2, duration: 0.5 }}
              >
                <div className="flex items-center gap-2">
                  <Sparkles size={18} className="text-hot-pink" />
                  <span className="text-sm font-medium text-deep-purple">Bonus</span>
                </div>
                <motion.span 
                  className="font-bold text-hot-pink"
                  initial={{ scale: 0 }}
                  animate={{ scale: animateStats ? 1 : 0 }}
                  transition={{ delay: 1.4, duration: 0.3, type: "spring" }}
                >
                  +{totalBonus}
                </motion.span>
              </motion.div>
            )}
          </div>

          {/* Achievement Badges */}
          {achievements.some(a => a.unlocked) && (
            <div className="mt-4 pt-4 border-t border-purple-magenta/20">
              <p className="text-xs text-purple-magenta mb-2 text-center">Achievement Unlocked!</p>
              <div className="flex flex-wrap gap-2 justify-center">
                {achievements.filter(a => a.unlocked).map((achievement, index) => (
                  <motion.div
                    key={achievement.text}
                    className="flex items-center gap-1 bg-gradient-to-r from-hot-pink to-coral-pink text-neon-white px-2 py-1 rounded-full text-xs neon-glow"
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 1.5 + index * 0.2, duration: 0.5, type: "spring" }}
                  >
                    {achievement.icon}
                    <span>{achievement.text}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          className="flex gap-4 w-full max-w-sm"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <motion.div 
            className="flex-1"
            whileHover={{ scale: 1.02 }} 
            whileTap={{ scale: 0.98 }}
          >
            <Button
              onClick={onBackToHome}
              variant="outline"
              className="w-full h-12 glass-strong border-teal-blue/50 text-teal-blue hover:bg-teal-blue hover:text-neon-white btn-3d neon-glow-mint"
            >
              <Home size={18} className="mr-2" />
              Home
            </Button>
          </motion.div>

          <motion.div 
            className="flex-1"
            whileHover={{ scale: 1.02 }} 
            whileTap={{ scale: 0.98 }}
          >
            <Button
              onClick={onPlayAgain}
              className="w-full h-12 bg-gradient-to-r from-hot-pink to-coral-pink hover:from-coral-pink hover:to-hot-pink text-neon-white btn-3d neon-glow-strong ripple-neon"
            >
              <RotateCcw size={18} className="mr-2" />
              Play Again
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default GameResultScreen;