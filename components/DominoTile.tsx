import React from 'react';
import { motion } from 'motion/react';
import { getDominoSkinById, type DominoSkin } from './DominoSkins';

interface DominoTileProps {
  leftDots: number;
  rightDots: number;
  isPlayable?: boolean;
  isSelected?: boolean;
  orientation?: 'horizontal' | 'vertical';
  size?: 'small' | 'medium' | 'large';
  onClick?: () => void;
  onDoubleClick?: () => void;
  className?: string;
  is3D?: boolean;
  skinId?: string;
}

const DominoTile: React.FC<DominoTileProps> = ({
  leftDots,
  rightDots,
  isPlayable = false,
  isSelected = false,
  orientation = 'horizontal',
  size = 'medium',
  onClick,
  onDoubleClick,
  className = '',
  is3D = true,
  skinId = 'classic'
}) => {
  const skin = getDominoSkinById(skinId);

  const sizeClasses = {
    small: 'w-12 h-6',
    medium: 'w-16 h-8',
    large: 'w-20 h-10'
  };

  const dotSizeClasses = {
    small: 'w-1 h-1',
    medium: 'w-1.5 h-1.5',
    large: 'w-2 h-2'
  };

  const renderDots = (count: number, side: 'left' | 'right') => {
    if (count === 0) return null;
    
    const dots = [];
    const positions = {
      1: ['center'],
      2: ['top-left', 'bottom-right'],
      3: ['top-left', 'center', 'bottom-right'],
      4: ['top-left', 'top-right', 'bottom-left', 'bottom-right'],
      5: ['top-left', 'top-right', 'center', 'bottom-left', 'bottom-right'],
      6: ['top-left', 'top-right', 'middle-left', 'middle-right', 'bottom-left', 'bottom-right']
    };

    const dotPositions = positions[count as keyof typeof positions] || [];

    dotPositions.forEach((position, index) => {
      let positionClasses = '';
      
      if (orientation === 'horizontal') {
        switch (position) {
          case 'top-left':
            positionClasses = 'top-1 left-1';
            break;
          case 'top-right':
            positionClasses = 'top-1 right-1';
            break;
          case 'middle-left':
            positionClasses = 'top-1/2 left-1 -translate-y-1/2';
            break;
          case 'middle-right':
            positionClasses = 'top-1/2 right-1 -translate-y-1/2';
            break;
          case 'bottom-left':
            positionClasses = 'bottom-1 left-1';
            break;
          case 'bottom-right':
            positionClasses = 'bottom-1 right-1';
            break;
          case 'center':
            positionClasses = 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2';
            break;
        }
      } else {
        // Vertical orientation - rotate positions
        switch (position) {
          case 'top-left':
            positionClasses = 'top-1 left-1';
            break;
          case 'top-right':
            positionClasses = 'top-1 right-1';
            break;
          case 'middle-left':
            positionClasses = 'top-1/2 left-1 -translate-y-1/2';
            break;
          case 'middle-right':
            positionClasses = 'top-1/2 right-1 -translate-y-1/2';
            break;
          case 'bottom-left':
            positionClasses = 'bottom-1 left-1';
            break;
          case 'bottom-right':
            positionClasses = 'bottom-1 right-1';
            break;
          case 'center':
            positionClasses = 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2';
            break;
        }
      }

      const dotStyle = {
        background: skin.preview.dots,
        boxShadow: is3D ? `inset 0 1px 2px rgba(0,0,0,0.5), 0 1px 0 rgba(255,255,255,0.3)` : undefined
      };

      dots.push(
        <motion.div
          key={`${side}-${index}`}
          className={`absolute ${dotSizeClasses[size]} rounded-full ${positionClasses}`}
          style={dotStyle}
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ 
            delay: index * 0.1, 
            duration: 0.4, 
            type: "spring",
            stiffness: 300
          }}
        />
      );
    });

    return dots;
  };

  const baseClasses = `
    ${sizeClasses[size]}
    ${orientation === 'vertical' ? 'rotate-90' : ''}
    cursor-pointer relative overflow-hidden
    transition-all duration-300 ease-out
    rounded-lg
    ${is3D ? 'domino-shadow-3d transform-3d' : 'domino-shadow'}
    ${isPlayable ? 'ring-2 ring-mint-green ring-opacity-60 neon-glow-mint' : ''}
    ${isSelected ? 'ring-2 ring-hot-pink scale-105 neon-glow-strong' : ''}
    ${is3D ? 'btn-3d' : 'hover:scale-105'}
    ${className}
  `;

  const dominoVariants = {
    initial: { 
      opacity: 0, 
      y: 20, 
      rotateX: is3D ? -15 : 0,
      scale: 0.8
    },
    animate: { 
      opacity: 1, 
      y: 0, 
      rotateX: 0,
      scale: 1
    },
    hover: { 
      scale: 1.05,
      rotateX: is3D ? 5 : 0,
      rotateY: is3D ? 2 : 0,
      y: is3D ? -2 : 0
    },
    tap: { 
      scale: 0.95,
      rotateX: is3D ? -2 : 0,
      y: is3D ? 1 : 0
    }
  };

  return (
    <motion.div
      className={baseClasses}
      onClick={onClick}
      onDoubleClick={onDoubleClick}
      variants={dominoVariants}
      initial="initial"
      animate="animate"
      whileHover="hover"
      whileTap="tap"
      transition={{ duration: 0.3, type: "spring", stiffness: 300 }}
      style={{
        transformStyle: 'preserve-3d',
        background: skin.preview.background,
        border: `1px solid ${skin.preview.border}`
      }}
    >
      {/* 3D Top Face with skin-specific highlights */}
      {is3D && (
        <div 
          className="absolute inset-0 rounded-lg"
          style={{
            background: skin.id === 'holographic' 
              ? 'linear-gradient(135deg, rgba(238, 34, 125, 0.2) 0%, transparent 50%)'
              : 'linear-gradient(135deg, rgba(255,255,255,0.4) 0%, transparent 50%)',
            transform: 'translateZ(1px)'
          }}
        />
      )}

      {/* Center divider with enhanced 3D effect */}
      <motion.div 
        className="absolute inset-y-0 left-1/2 w-0.5 -translate-x-0.5"
        style={{
          background: skin.preview.border,
          opacity: 0.8,
          boxShadow: is3D ? 'inset 0 0 2px rgba(0,0,0,0.5)' : undefined
        }}
        animate={skin.id === 'holographic' ? {
          background: [
            skin.preview.border,
            'rgba(253,128,131,0.8)',
            'rgba(48,192,135,0.8)',
            skin.preview.border
          ]
        } : {}}
        transition={{ duration: 2, repeat: Infinity }}
      />
      
      {/* Left side dots */}
      <div className="absolute inset-0 w-1/2">
        {renderDots(leftDots, 'left')}
      </div>
      
      {/* Right side dots */}
      <div className="absolute inset-0 w-1/2 left-1/2">
        {renderDots(rightDots, 'right')}
      </div>
      
      {/* Playable glow effect */}
      {isPlayable && (
        <motion.div 
          className="absolute inset-0 bg-mint-green opacity-10 rounded-lg"
          animate={{ opacity: [0.1, 0.3, 0.1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      )}

      {/* Selection glow */}
      {isSelected && (
        <motion.div 
          className="absolute inset-0 bg-hot-pink opacity-20 rounded-lg"
          animate={{ opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 1, repeat: Infinity }}
        />
      )}

      {/* Skin-specific effects */}
      {skin.preview.effects.includes('holographic-shift') && (
        <motion.div
          className="absolute inset-0 rounded-lg"
          style={{
            background: 'linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.5) 50%, transparent 70%)',
            transform: 'translateX(-100%)'
          }}
          animate={{
            transform: ['translateX(-100%)', 'translateX(100%)']
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      )}

      {skin.preview.effects.includes('crystal-refraction') && (
        <>
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-mint-green/60 to-transparent" />
          <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-mint-green/40 to-transparent" />
        </>
      )}

      {skin.preview.effects.includes('cosmic-sparkles') && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-coral-pink rounded-full opacity-60"
              style={{
                left: `${20 + i * 30}%`,
                top: `${25 + (i % 2) * 50}%`
              }}
              animate={{
                scale: [0, 1, 0],
                opacity: [0, 0.8, 0],
                y: [0, -10, 0]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.5,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>
      )}

      {skin.preview.effects.includes('fire-animation') && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-2 bg-gradient-to-t from-red-500 via-orange-400 to-yellow-300 rounded-full opacity-70"
              style={{
                left: `${15 + i * 20}%`,
                bottom: '10%'
              }}
              animate={{
                scaleY: [0.5, 1.5, 0.5],
                opacity: [0.3, 0.8, 0.3],
                y: [0, -8, 0]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.2,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>
      )}

      {skin.preview.effects.includes('plasma-animation') && (
        <motion.div
          className="absolute inset-0 rounded-lg opacity-30"
          animate={{
            background: [
              'radial-gradient(circle at 20% 20%, cyan 0%, transparent 50%)',
              'radial-gradient(circle at 80% 80%, magenta 0%, transparent 50%)',
              'radial-gradient(circle at 50% 50%, yellow 0%, transparent 50%)',
              'radial-gradient(circle at 20% 80%, cyan 0%, transparent 50%)',
              'radial-gradient(circle at 80% 20%, magenta 0%, transparent 50%)'
            ]
          }}
          transition={{ duration: 3, repeat: Infinity }}
        />
      )}

      {/* 3D Bottom Shadow */}
      {is3D && (
        <div 
          className="absolute inset-0 rounded-lg"
          style={{
            background: skin.id === 'holographic'
              ? 'linear-gradient(315deg, rgba(59,8,85,0.2) 0%, transparent 50%)'
              : 'linear-gradient(315deg, rgba(59,8,85,0.1) 0%, transparent 50%)',
            transform: 'translateZ(-1px)'
          }}
        />
      )}

      {/* Enhanced edge highlighting */}
      {is3D && (
        <>
          <div className={`absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent ${
            skin.id === 'holographic' ? 'via-hot-pink/60' : 'via-white/50'
          } to-transparent`} />
          <div className={`absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent ${
            skin.id === 'holographic' ? 'via-coral-pink/40' : 'via-white/30'
          } to-transparent`} />
        </>
      )}
    </motion.div>
  );
};

export default DominoTile;