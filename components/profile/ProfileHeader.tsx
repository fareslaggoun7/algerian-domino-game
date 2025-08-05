import React from 'react';
import { motion } from 'motion/react';
import { Crown, MapPin, Calendar, Share2, Edit3, Coins, Gem } from 'lucide-react';
import { Button } from '../ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { UserProfile } from './ProfileData';
import { getRankColor } from './ProfileUtils';

interface ProfileHeaderProps {
  userProfile: UserProfile;
  isEditing: boolean;
  setIsEditing: (editing: boolean) => void;
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  userProfile,
  isEditing,
  setIsEditing
}) => {
  return (
    <motion.div 
      className="glass-luxury p-6 m-4 rounded-2xl depth-5 luxury-shadow-floating relative overflow-hidden"
      initial={{ y: -100, opacity: 0, rotateX: -25 }}
      animate={{ y: 0, opacity: 1, rotateX: 0 }}
      transition={{ duration: 0.8, type: "spring" }}
    >
      {/* Background gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br ${getRankColor(userProfile.rank)} opacity-10 rounded-2xl`} />
      
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-4">
            <motion.div
              className="relative"
              whileHover={{ scale: 1.05, rotateY: 10 }}
            >
              <Avatar className="w-20 h-20 depth-4 ring-4 ring-champagne-gold gold-glow">
                <AvatarImage src={userProfile.avatar} />
                <AvatarFallback className="bg-gradient-to-br from-champagne-gold to-rose-gold text-midnight-navy text-xl">
                  {userProfile.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <motion.div
                className={`absolute -bottom-2 -right-2 px-2 py-1 bg-gradient-to-r ${getRankColor(userProfile.rank)} rounded-lg depth-2`}
                initial={{ scale: 0, rotate: -15 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.3, type: "spring" }}
              >
                <span className="text-xs font-bold text-midnight-navy">{userProfile.rank}</span>
              </motion.div>
            </motion.div>
            
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h1 className="text-xl font-bold text-midnight-navy">{userProfile.name}</h1>
                <Badge variant="outline" className="bg-gradient-to-r from-champagne-gold to-rose-gold text-midnight-navy border-none">
                  <Crown size={12} className="mr-1" />
                  {userProfile.title}
                </Badge>
              </div>
              <p className="text-sm text-elegant-gray mb-2">@{userProfile.username}</p>
              <div className="flex items-center gap-3 text-sm">
                <span className="flex items-center gap-1 text-elegant-gray">
                  <MapPin size={12} />
                  {userProfile.country}
                </span>
                <span className="flex items-center gap-1 text-elegant-gray">
                  <Calendar size={12} />
                  Joined {userProfile.joinDate.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                </span>
              </div>
            </div>
          </div>
          
          <div className="flex gap-2">
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Button variant="ghost" size="sm" className="glass rounded-xl p-2">
                <Share2 size={16} />
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setIsEditing(!isEditing)}
                className="glass rounded-xl p-2"
              >
                <Edit3 size={16} />
              </Button>
            </motion.div>
          </div>
        </div>

        {/* Level Progress */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-midnight-navy">Level {userProfile.level}</span>
            <span className="text-sm text-elegant-gray">
              {userProfile.xp.toLocaleString()} / {userProfile.xpToNext.toLocaleString()} XP
            </span>
          </div>
          <Progress 
            value={(userProfile.xp / userProfile.xpToNext) * 100} 
            className="h-3 glass depth-1"
            style={{
              background: `linear-gradient(90deg, 
                var(--champagne-gold) 0%, 
                var(--rose-gold) ${(userProfile.xp / userProfile.xpToNext) * 100}%, 
                var(--platinum) ${(userProfile.xp / userProfile.xpToNext) * 100}%
              )`
            }}
          />
        </div>

        {/* Currency */}
        <div className="flex gap-4">
          <motion.div
            className="glass-strong px-4 py-2 rounded-xl depth-2 flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
          >
            <Coins size={16} className="text-champagne-gold" />
            <span className="font-bold text-midnight-navy">{userProfile.coins.toLocaleString()}</span>
          </motion.div>
          
          <motion.div
            className="glass-strong px-4 py-2 rounded-xl depth-2 flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
          >
            <Gem size={16} className="text-rich-burgundy" />
            <span className="font-bold text-midnight-navy">{userProfile.gems}</span>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};