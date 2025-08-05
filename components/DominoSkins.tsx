import React from 'react';
import { motion } from 'motion/react';

export interface DominoSkin {
  id: string;
  name: string;
  description: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  price: number;
  currency: 'coins' | 'gems';
  unlocked: boolean;
  preview: {
    background: string;
    border: string;
    dots: string;
    effects: string[];
  };
}

export const dominoSkins: DominoSkin[] = [
  {
    id: 'classic',
    name: 'Classic White',
    description: 'Traditional domino appearance',
    rarity: 'common',
    price: 0,
    currency: 'coins',
    unlocked: true,
    preview: {
      background: 'linear-gradient(145deg, #FFFFFF 0%, #F8FAFC 100%)',
      border: 'rgba(59, 8, 85, 0.2)',
      dots: 'var(--deep-purple)',
      effects: []
    }
  },
  {
    id: 'neon-glow',
    name: 'Neon Glow',
    description: 'Glowing neon edges with pulsing effects',
    rarity: 'rare',
    price: 500,
    currency: 'coins',
    unlocked: true,
    preview: {
      background: 'linear-gradient(145deg, rgba(238, 34, 125, 0.1) 0%, rgba(253, 128, 131, 0.05) 100%)',
      border: 'rgba(238, 34, 125, 0.6)',
      dots: 'var(--hot-pink)',
      effects: ['neon-glow', 'pulse']
    }
  },
  {
    id: 'crystal-clear',
    name: 'Crystal Clear',
    description: 'Transparent crystal with rainbow refraction',
    rarity: 'epic',
    price: 1200,
    currency: 'coins',
    unlocked: false,
    preview: {
      background: 'linear-gradient(145deg, rgba(73, 128, 153, 0.3) 0%, rgba(48, 192, 135, 0.2) 100%)',
      border: 'rgba(48, 192, 135, 0.8)',
      dots: 'var(--mint-green)',
      effects: ['crystal-refraction', 'transparency']
    }
  },
  {
    id: 'holographic',
    name: 'Holographic Rainbow',
    description: 'Shifting rainbow colors with holographic shine',
    rarity: 'legendary',
    price: 2500,
    currency: 'coins',
    unlocked: false,
    preview: {
      background: 'linear-gradient(45deg, var(--deep-purple), var(--purple-magenta), var(--hot-pink), var(--coral-pink), var(--teal-blue), var(--mint-green))',
      border: 'rgba(238, 34, 125, 0.8)',
      dots: 'var(--neon-white)',
      effects: ['holographic-shift', 'rainbow-flow', 'shimmer']
    }
  },
  {
    id: 'midnight-purple',
    name: 'Midnight Purple',
    description: 'Deep purple with cosmic sparkles',
    rarity: 'rare',
    price: 800,
    currency: 'coins',
    unlocked: false,
    preview: {
      background: 'linear-gradient(145deg, var(--deep-purple) 0%, var(--purple-magenta) 100%)',
      border: 'rgba(133, 36, 103, 0.6)',
      dots: 'var(--coral-pink)',
      effects: ['cosmic-sparkles', 'depth-shadow']
    }
  },
  {
    id: 'golden-luxury',
    name: 'Golden Luxury',
    description: 'Premium gold finish with elegant glow',
    rarity: 'epic',
    price: 50,
    currency: 'gems',
    unlocked: false,
    preview: {
      background: 'linear-gradient(145deg, #FFD700 0%, #FFA500 50%, #FF8C00 100%)',
      border: 'rgba(255, 215, 0, 0.8)',
      dots: 'var(--deep-purple)',
      effects: ['golden-shimmer', 'luxury-glow']
    }
  },
  {
    id: 'plasma-storm',
    name: 'Plasma Storm',
    description: 'Electric plasma with storm effects',
    rarity: 'legendary',
    price: 100,
    currency: 'gems',
    unlocked: false,
    preview: {
      background: 'linear-gradient(45deg, #00FFFF, #FF00FF, #FFFF00, #00FFFF)',
      border: 'rgba(0, 255, 255, 0.8)',
      dots: 'var(--neon-white)',
      effects: ['plasma-animation', 'electric-storm', 'energy-pulse']
    }
  },
  {
    id: 'shadow-void',
    name: 'Shadow Void',
    description: 'Dark matter with void energy',
    rarity: 'epic',
    price: 1500,
    currency: 'coins',
    unlocked: false,
    preview: {
      background: 'linear-gradient(145deg, var(--dark-void) 0%, var(--shadow-dark) 100%)',
      border: 'rgba(238, 34, 125, 0.4)',
      dots: 'var(--hot-pink)',
      effects: ['void-energy', 'dark-aura']
    }
  },
  {
    id: 'fire-opal',
    name: 'Fire Opal',
    description: 'Fiery opal with flame patterns',
    rarity: 'legendary',
    price: 150,
    currency: 'gems',
    unlocked: false,
    preview: {
      background: 'linear-gradient(45deg, #FF4500, #FF6347, #FF1493, #FF4500)',
      border: 'rgba(255, 69, 0, 0.8)',
      dots: 'var(--neon-white)',
      effects: ['fire-animation', 'opal-shimmer', 'flame-dance']
    }
  }
];

export const getDominoSkinById = (skinId: string): DominoSkin => {
  return dominoSkins.find(skin => skin.id === skinId) || dominoSkins[0];
};

export const getUnlockedSkins = (): DominoSkin[] => {
  return dominoSkins.filter(skin => skin.unlocked);
};

export const getSkinsByRarity = (rarity: DominoSkin['rarity']): DominoSkin[] => {
  return dominoSkins.filter(skin => skin.rarity === rarity);
};

export const getRarityColor = (rarity: DominoSkin['rarity']): string => {
  switch (rarity) {
    case 'common': return 'text-teal-blue border-teal-blue';
    case 'rare': return 'text-coral-pink border-coral-pink';
    case 'epic': return 'text-purple-magenta border-purple-magenta';
    case 'legendary': return 'text-hot-pink border-hot-pink';
    default: return 'text-deep-purple border-deep-purple';
  }
};

export const getRarityGlow = (rarity: DominoSkin['rarity']): string => {
  switch (rarity) {
    case 'common': return 'neon-glow-mint';
    case 'rare': return 'neon-glow-coral';
    case 'epic': return 'neon-glow';
    case 'legendary': return 'neon-glow-strong';
    default: return '';
  }
};

interface DominoSkinPreviewProps {
  skin: DominoSkin;
  size?: 'small' | 'medium' | 'large';
  animated?: boolean;
}

export const DominoSkinPreview: React.FC<DominoSkinPreviewProps> = ({
  skin,
  size = 'medium',
  animated = true
}) => {
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

  return (
    <motion.div
      className={`${sizeClasses[size]} relative rounded-lg overflow-hidden depth-3 card-3d ${getRarityGlow(skin.rarity)}`}
      style={{
        background: skin.preview.background,
        border: `1px solid ${skin.preview.border}`
      }}
      animate={animated && skin.preview.effects.includes('holographic-shift') ? {
        background: [
          'linear-gradient(45deg, var(--deep-purple), var(--purple-magenta), var(--hot-pink))',
          'linear-gradient(45deg, var(--hot-pink), var(--coral-pink), var(--teal-blue))',
          'linear-gradient(45deg, var(--teal-blue), var(--mint-green), var(--deep-purple))',
          'linear-gradient(45deg, var(--deep-purple), var(--purple-magenta), var(--hot-pink))'
        ]
      } : animated && skin.preview.effects.includes('pulse') ? {
        boxShadow: [
          '0 0 20px rgba(238, 34, 125, 0.6)',
          '0 0 40px rgba(238, 34, 125, 0.8)',
          '0 0 20px rgba(238, 34, 125, 0.6)'
        ]
      } : {}}
      transition={animated ? { 
        duration: skin.preview.effects.includes('holographic-shift') ? 3 : 2, 
        repeat: Infinity 
      } : {}}
      whileHover={animated ? { scale: 1.05, rotateY: 5 } : {}}
    >
      {/* Center divider */}
      <div 
        className="absolute inset-y-0 left-1/2 w-0.5 -translate-x-0.5"
        style={{ 
          background: skin.preview.border,
          opacity: 0.6
        }}
      />
      
      {/* Sample dots - left side (3 dots) */}
      <div className="absolute top-1 left-1">
        <div 
          className={`${dotSizeClasses[size]} rounded-full`}
          style={{ background: skin.preview.dots }}
        />
      </div>
      <div className="absolute top-1/2 left-1 -translate-y-1/2">
        <div 
          className={`${dotSizeClasses[size]} rounded-full`}
          style={{ background: skin.preview.dots }}
        />
      </div>
      <div className="absolute bottom-1 right-1">
        <div 
          className={`${dotSizeClasses[size]} rounded-full`}
          style={{ background: skin.preview.dots }}
        />
      </div>
      
      {/* Sample dots - right side (2 dots) */}
      <div className="absolute top-1 right-1">
        <div 
          className={`${dotSizeClasses[size]} rounded-full`}
          style={{ background: skin.preview.dots }}
        />
      </div>
      <div className="absolute bottom-1 left-1">
        <div 
          className={`${dotSizeClasses[size]} rounded-full`}
          style={{ background: skin.preview.dots }}
        />
      </div>

      {/* Special effects overlay */}
      {skin.preview.effects.includes('shimmer') && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
          animate={{ x: ['-100%', '100%'] }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        />
      )}

      {skin.preview.effects.includes('cosmic-sparkles') && (
        <div className="absolute inset-0">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-0.5 h-0.5 bg-coral-pink rounded-full"
              style={{
                left: `${25 + i * 25}%`,
                top: `${20 + i * 30}%`
              }}
              animate={{
                scale: [0, 1.5, 0],
                opacity: [0, 1, 0]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.5
              }}
            />
          ))}
        </div>
      )}

      {skin.preview.effects.includes('crystal-refraction') && (
        <>
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-mint-green/60 to-transparent" />
          <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-mint-green/40 to-transparent" />
        </>
      )}
    </motion.div>
  );
};

export default DominoSkinPreview;