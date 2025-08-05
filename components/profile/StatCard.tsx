import React from 'react';
import { motion } from 'motion/react';
import { GameStatistic } from './ProfileData';

interface StatCardProps {
  stat: GameStatistic;
  index: number;
}

export const StatCard: React.FC<StatCardProps> = ({ stat, index }) => {
  return (
    <motion.div
      className="glass-strong p-4 rounded-xl depth-3 card-3d"
      initial={{ y: 50, opacity: 0, rotateX: -10 }}
      animate={{ y: 0, opacity: 1, rotateX: 0 }}
      transition={{ delay: 0.5 + index * 0.1, duration: 0.6 }}
      whileHover={{ scale: 1.02, rotateY: 2 }}
    >
      <div className="flex items-center justify-between mb-2">
        <div className={`${stat.color}`}>
          {stat.icon}
        </div>
        {stat.change && (
          <span className={`text-xs font-medium ${
            stat.change > 0 ? 'text-emerald-accent' : 'text-rich-burgundy'
          }`}>
            {stat.change > 0 ? '+' : ''}{stat.change}%
          </span>
        )}
      </div>
      <p className="text-2xl font-bold text-midnight-navy mb-1">{stat.value}</p>
      <p className="text-sm text-elegant-gray">{stat.label}</p>
    </motion.div>
  );
};