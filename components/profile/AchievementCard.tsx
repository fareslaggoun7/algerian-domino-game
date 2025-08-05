import React from 'react';
import { motion } from 'motion/react';
import { Award } from 'lucide-react';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { Achievement } from './ProfileData';
import { getRarityColor, getRarityGlow } from './ProfileUtils';

interface AchievementCardProps {
  achievement: Achievement;
  index: number;
}

export const AchievementCard: React.FC<AchievementCardProps> = ({ achievement, index }) => {
  return (
    <motion.div
      className={`glass-strong p-4 rounded-xl depth-3 card-3d relative overflow-hidden ${
        achievement.unlocked ? getRarityGlow(achievement.rarity) : 'opacity-60'
      }`}
      initial={{ x: -50, opacity: 0, rotateY: -10 }}
      animate={{ x: 0, opacity: 1, rotateY: 0 }}
      transition={{ delay: 0.5 + index * 0.1, duration: 0.6 }}
      whileHover={{ scale: 1.02, rotateY: 2 }}
    >
      {/* Rarity border */}
      <div className={`absolute inset-0 bg-gradient-to-br ${getRarityColor(achievement.rarity)} opacity-20 rounded-xl`} />
      
      <div className="relative z-10 flex items-center gap-4">
        <motion.div
          className={`w-12 h-12 bg-gradient-to-br ${getRarityColor(achievement.rarity)} rounded-xl flex items-center justify-center depth-3 text-pearl-white`}
          whileHover={{ rotateZ: 10, scale: 1.1 }}
          animate={achievement.unlocked ? {} : { filter: 'grayscale(100%)' }}
        >
          {achievement.icon}
        </motion.div>
        
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h4 className="font-bold text-midnight-navy">{achievement.name}</h4>
            <Badge 
              variant="outline" 
              className={`text-xs capitalize bg-gradient-to-r ${getRarityColor(achievement.rarity)} text-pearl-white border-none`}
            >
              {achievement.rarity}
            </Badge>
          </div>
          <p className="text-sm text-elegant-gray mb-2">{achievement.description}</p>
          
          {achievement.unlocked ? (
            <div className="flex items-center gap-2">
              <Badge className="bg-emerald-accent text-pearl-white">
                <Award size={12} className="mr-1" />
                Unlocked
              </Badge>
              {achievement.unlockedDate && (
                <span className="text-xs text-elegant-gray">
                  {achievement.unlockedDate.toLocaleDateString()}
                </span>
              )}
            </div>
          ) : (
            <div className="space-y-2">
              <Progress 
                value={(achievement.progress / achievement.maxProgress) * 100} 
                className="h-2"
              />
              <span className="text-xs text-elegant-gray">
                {achievement.progress} / {achievement.maxProgress}
              </span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};