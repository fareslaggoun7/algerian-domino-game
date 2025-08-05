import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  User, 
  Settings, 
  Trophy, 
  Star, 
  Coins, 
  Crown, 
  Award,
  Target,
  Zap,
  Calendar,
  Globe,
  Edit3,
  Camera,
  Gift,
  TrendingUp
} from 'lucide-react';
import { Button } from './ui/button';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

const ProfileScreen: React.FC = () => {
  const [editMode, setEditMode] = useState(false);

  // Mock user data
  const userData = {
    name: "Youcef A.",
    username: "@youcef_neon",
    level: 12,
    xp: 73,
    xpToNext: 27,
    coins: 12450,
    gems: 89,
    country: "Morocco",
    joinDate: "March 2024",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    rank: "Neon Master",
    tier: "Diamond"
  };

  const stats = [
    { label: "Games Played", value: "234", icon: Target, color: "text-mint-green" },
    { label: "Win Rate", value: "78%", icon: Trophy, color: "text-coral-pink" },
    { label: "Best Streak", value: "12", icon: Zap, color: "text-hot-pink" },
    { label: "Total Wins", value: "182", icon: Star, color: "text-teal-blue" },
    { label: "Coins Earned", value: "45.2K", icon: Coins, color: "text-purple-magenta" },
    { label: "Tournaments", value: "8", icon: Award, color: "text-coral-pink" }
  ];

  const achievements = [
    {
      id: 1,
      name: "First Victory",
      description: "Win your first game",
      icon: Trophy,
      color: "mint-green",
      unlocked: true,
      date: "March 15, 2024"
    },
    {
      id: 2,
      name: "Streak Master",
      description: "Win 10 games in a row",
      icon: Zap,
      color: "hot-pink",
      unlocked: true,
      date: "March 22, 2024"
    },
    {
      id: 3,
      name: "Neon Collector",
      description: "Unlock 5 different domino skins",
      icon: Star,
      color: "coral-pink",
      unlocked: true,
      date: "April 1, 2024"
    },
    {
      id: 4,
      name: "Tournament Champion",
      description: "Win a weekly tournament",
      icon: Crown,
      color: "purple-magenta",
      unlocked: false,
      progress: 75
    },
    {
      id: 5,
      name: "Social Player",
      description: "Play 50 café games",
      icon: Globe,
      color: "teal-blue",
      unlocked: false,
      progress: 42
    }
  ];

  const recentGames = [
    { opponent: "Ahmad K.", result: "win", score: "127-85", mode: "1v1", time: "2h ago" },
    { opponent: "Fatima L.", result: "win", score: "98-92", mode: "4-player", time: "4h ago" },
    { opponent: "Omar S.", result: "loss", score: "89-103", mode: "1v1", time: "6h ago" },
    { opponent: "Sarah M.", result: "win", score: "115-78", mode: "Café", time: "1d ago" }
  ];

  const getAchievementColor = (color: string) => {
    switch (color) {
      case 'mint-green': return 'text-mint-green border-mint-green bg-mint-green/10';
      case 'hot-pink': return 'text-hot-pink border-hot-pink bg-hot-pink/10';
      case 'coral-pink': return 'text-coral-pink border-coral-pink bg-coral-pink/10';
      case 'purple-magenta': return 'text-purple-magenta border-purple-magenta bg-purple-magenta/10';
      case 'teal-blue': return 'text-teal-blue border-teal-blue bg-teal-blue/10';
      default: return 'text-deep-purple border-deep-purple bg-deep-purple/10';
    }
  };

  return (
    <div className="flex flex-col h-screen pb-20 relative overflow-hidden transform-3d-deep">
      {/* Profile Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0" style={{
          background: `
            radial-gradient(circle at 30% 20%, rgba(59, 8, 85, 0.08) 0%, transparent 50%),
            radial-gradient(circle at 70% 80%, rgba(238, 34, 125, 0.06) 0%, transparent 50%),
            radial-gradient(circle at 50% 50%, rgba(253, 128, 131, 0.04) 0%, transparent 40%),
            linear-gradient(135deg, var(--neon-day-start) 0%, var(--neon-day-end) 100%)
          `
        }} />
      </div>

      {/* Floating Profile Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-3 h-3 rounded-full ${
              i % 3 === 0 ? 'bg-hot-pink/20' : 
              i % 3 === 1 ? 'bg-mint-green/20' : 'bg-coral-pink/20'
            } blur-sm`}
            style={{
              left: `${10 + i * 16}%`,
              top: `${15 + (i % 3) * 30}%`
            }}
            animate={{
              y: [-15, 15, -15],
              opacity: [0.3, 0.7, 0.3],
              scale: [0.8, 1.2, 0.8]
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Profile Header */}
      <motion.div 
        className="glass-neon p-6 m-4 rounded-2xl depth-4 neon-shadow-floating"
        initial={{ y: -100, opacity: 0, rotateX: -25 }}
        animate={{ y: 0, opacity: 1, rotateX: 0 }}
        transition={{ duration: 0.8, type: "spring" }}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <div className="relative">
              <motion.div whileHover={{ scale: 1.05, rotateY: 10 }}>
                <Avatar className="w-20 h-20 depth-3 border-2 border-hot-pink neon-glow-strong">
                  <AvatarImage src={userData.avatar} />
                  <AvatarFallback className="bg-gradient-to-br from-purple-magenta to-deep-purple text-neon-white text-xl">
                    YA
                  </AvatarFallback>
                </Avatar>
              </motion.div>
              <motion.button
                className="absolute -bottom-1 -right-1 w-8 h-8 bg-gradient-to-br from-coral-pink to-hot-pink rounded-full flex items-center justify-center depth-2 btn-3d"
                whileHover={{ scale: 1.1, rotateZ: 15 }}
                whileTap={{ scale: 0.9 }}
              >
                <Camera size={14} className="text-neon-white" />
              </motion.button>
            </div>
            
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h2 className="text-2xl font-bold text-deep-purple">{userData.name}</h2>
                <Badge className="bg-gradient-to-r from-hot-pink to-coral-pink text-neon-white neon-glow">
                  <Crown size={12} className="mr-1" />
                  {userData.tier}
                </Badge>
              </div>
              <p className="text-purple-magenta font-medium">{userData.username}</p>
              <div className="flex items-center gap-4 mt-2 text-sm text-purple-magenta">
                <span className="flex items-center gap-1">
                  <Globe size={12} />
                  {userData.country}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar size={12} />
                  Joined {userData.joinDate}
                </span>
              </div>
            </div>
          </div>
          
          <motion.div whileHover={{ scale: 1.1, rotateZ: 10 }} whileTap={{ scale: 0.9 }}>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setEditMode(!editMode)}
              className="glass-strong border-coral-pink/50 text-coral-pink hover:bg-coral-pink hover:text-neon-white btn-3d"
            >
              <Edit3 size={16} className="mr-2" />
              {editMode ? 'Save' : 'Edit'}
            </Button>
          </motion.div>
        </div>

        {/* Level Progress */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-purple-magenta">Level {userData.level}</span>
            <span className="text-sm text-purple-magenta">{userData.xp}% to Level {userData.level + 1}</span>
          </div>
          <Progress 
            value={userData.xp} 
            className="h-3 gradient-rainbow"
          />
        </div>

        {/* Currency Display */}
        <div className="flex gap-4 mt-4">
          <motion.div 
            className="flex items-center gap-2 glass-strong px-4 py-2 rounded-full depth-2"
            whileHover={{ scale: 1.05 }}
          >
            <Coins size={16} className="text-coral-pink" />
            <span className="font-bold text-deep-purple">{userData.coins.toLocaleString()}</span>
          </motion.div>
          <motion.div 
            className="flex items-center gap-2 glass-strong px-4 py-2 rounded-full depth-2"
            whileHover={{ scale: 1.05 }}
          >
            <Star size={16} className="text-purple-magenta" />
            <span className="font-bold text-deep-purple">{userData.gems}</span>
          </motion.div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="flex-1 mx-4">
        <Tabs defaultValue="stats" className="h-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <TabsList className="grid w-full grid-cols-3 glass-neon p-1 rounded-xl depth-2">
              <TabsTrigger 
                value="stats" 
                className="rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-teal-blue data-[state=active]:to-mint-green data-[state=active]:text-neon-white"
              >
                Statistics
              </TabsTrigger>
              <TabsTrigger 
                value="achievements" 
                className="rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-hot-pink data-[state=active]:to-coral-pink data-[state=active]:text-neon-white"
              >
                Achievements
              </TabsTrigger>
              <TabsTrigger 
                value="recent" 
                className="rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-magenta data-[state=active]:to-deep-purple data-[state=active]:text-neon-white"
              >
                Recent Games
              </TabsTrigger>
            </TabsList>
          </motion.div>

          {/* Statistics Tab */}
          <TabsContent value="stats" className="mt-4">
            <motion.div
              className="grid grid-cols-2 gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={stat.label}
                    className="glass-neon p-4 rounded-xl depth-3 card-3d neon-shadow"
                    initial={{ y: 50, opacity: 0, rotateX: -15 }}
                    animate={{ y: 0, opacity: 1, rotateX: 0 }}
                    transition={{ delay: 0.5 + index * 0.1, duration: 0.6 }}
                    whileHover={{ scale: 1.02, rotateY: 5 }}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className={`p-2 rounded-lg glass-strong depth-1 ${stat.color}`}>
                        <Icon size={16} />
                      </div>
                      <span className="text-sm text-purple-magenta font-medium">{stat.label}</span>
                    </div>
                    <p className="text-2xl font-bold text-deep-purple">{stat.value}</p>
                  </motion.div>
                );
              })}
            </motion.div>
          </TabsContent>

          {/* Achievements Tab */}
          <TabsContent value="achievements" className="mt-4">
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              {achievements.map((achievement, index) => {
                const Icon = achievement.icon;
                return (
                  <motion.div
                    key={achievement.id}
                    className={`glass-neon p-4 rounded-xl depth-3 card-3d ${
                      achievement.unlocked ? 'neon-shadow' : 'opacity-60'
                    }`}
                    initial={{ x: -50, opacity: 0, rotateY: -15 }}
                    animate={{ x: 0, opacity: 1, rotateY: 0 }}
                    transition={{ delay: 0.5 + index * 0.1, duration: 0.6 }}
                    whileHover={{ scale: 1.02, rotateY: 3 }}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`p-3 rounded-xl ${getAchievementColor(achievement.color)} depth-2`}>
                          <Icon size={20} />
                        </div>
                        <div>
                          <h4 className="font-semibold text-deep-purple">{achievement.name}</h4>
                          <p className="text-sm text-purple-magenta">{achievement.description}</p>
                          {achievement.unlocked && achievement.date && (
                            <p className="text-xs text-purple-magenta/70 mt-1">Unlocked on {achievement.date}</p>
                          )}
                        </div>
                      </div>
                      
                      {achievement.unlocked ? (
                        <Badge className="bg-mint-green text-deep-purple neon-glow-mint">
                          <Trophy size={12} className="mr-1" />
                          Unlocked
                        </Badge>
                      ) : (
                        <div className="text-right">
                          <div className="text-sm text-purple-magenta mb-1">{achievement.progress}%</div>
                          <Progress value={achievement.progress} className="w-20 h-2" />
                        </div>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </TabsContent>

          {/* Recent Games Tab */}
          <TabsContent value="recent" className="mt-4">
            <motion.div
              className="space-y-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              {recentGames.map((game, index) => (
                <motion.div
                  key={index}
                  className="glass-neon p-4 rounded-xl depth-2 card-3d"
                  initial={{ y: 30, opacity: 0, rotateX: -10 }}
                  animate={{ y: 0, opacity: 1, rotateX: 0 }}
                  transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
                  whileHover={{ scale: 1.01, rotateY: 2 }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar className="w-10 h-10 depth-1">
                        <AvatarImage src={`https://images.unsplash.com/photo-${500 + index * 100}?w=50&h=50&fit=crop&crop=face`} />
                        <AvatarFallback className="bg-gradient-to-br from-teal-blue to-mint-green text-neon-white text-sm">
                          {game.opponent.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-deep-purple">{game.opponent}</span>
                          <Badge 
                            variant="outline" 
                            className={`text-xs ${
                              game.result === 'win' 
                                ? 'text-mint-green border-mint-green' 
                                : 'text-coral-pink border-coral-pink'
                            }`}
                          >
                            {game.result.toUpperCase()}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-3 text-sm text-purple-magenta">
                          <span>{game.score}</span>
                          <span>•</span>
                          <span>{game.mode}</span>
                          <span>•</span>
                          <span>{game.time}</span>
                        </div>
                      </div>
                    </div>
                    
                    <motion.div
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        game.result === 'win' 
                          ? 'bg-mint-green/20 text-mint-green' 
                          : 'bg-coral-pink/20 text-coral-pink'
                      }`}
                      whileHover={{ scale: 1.1, rotateZ: 15 }}
                    >
                      {game.result === 'win' ? (
                        <TrendingUp size={16} />
                      ) : (
                        <Target size={16} />
                      )}
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ProfileScreen;