import React from 'react';
import { 
  Trophy, 
  Crown, 
  Medal, 
  Target, 
  Star,
  Zap,
  BarChart3,
  TrendingUp,
  Clock,
  User,
  Settings
} from 'lucide-react';

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  progress: number;
  maxProgress: number;
  unlocked: boolean;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  unlockedDate?: Date;
}

export interface GameStatistic {
  label: string;
  value: string | number;
  change?: number;
  icon: React.ReactNode;
  color: string;
}

export interface UserProfile {
  name: string;
  username: string;
  level: number;
  xp: number;
  xpToNext: number;
  country: string;
  joinDate: Date;
  avatar: string;
  title: string;
  rank: string;
  coins: number;
  gems: number;
}

export const userProfile: UserProfile = {
  name: 'Youcef Amrani',
  username: 'DominoMaster2024',
  level: 28,
  xp: 14750,
  xpToNext: 18000,
  country: 'Algeria',
  joinDate: new Date('2023-03-15'),
  avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face',
  title: 'Grandmaster',
  rank: 'Diamond',
  coins: 45230,
  gems: 189
};

export const achievements: Achievement[] = [
  {
    id: '1',
    name: 'First Victory',
    description: 'Win your first game',
    icon: <Trophy size={20} />,
    progress: 1,
    maxProgress: 1,
    unlocked: true,
    rarity: 'common',
    unlockedDate: new Date('2023-03-16')
  },
  {
    id: '2',
    name: 'Century Club',
    description: 'Win 100 games',
    icon: <Crown size={20} />,
    progress: 156,
    maxProgress: 100,
    unlocked: true,
    rarity: 'epic',
    unlockedDate: new Date('2023-08-22')
  },
  {
    id: '3',
    name: 'Speed Demon',
    description: 'Win a game in under 2 minutes',
    icon: <Zap size={20} />,
    progress: 1,
    maxProgress: 1,
    unlocked: true,
    rarity: 'rare',
    unlockedDate: new Date('2023-05-10')
  },
  {
    id: '4',
    name: 'Tournament Champion',
    description: 'Win a tournament',
    icon: <Medal size={20} />,
    progress: 3,
    maxProgress: 1,
    unlocked: true,
    rarity: 'legendary',
    unlockedDate: new Date('2023-09-15')
  },
  {
    id: '5',
    name: 'Perfect Score',
    description: 'Score 500+ points in a single game',
    icon: <Target size={20} />,
    progress: 487,
    maxProgress: 500,
    unlocked: false,
    rarity: 'epic'
  },
  {
    id: '6',
    name: 'Social Butterfly',
    description: 'Play 50 multiplayer games',
    icon: <Star size={20} />,
    progress: 42,
    maxProgress: 50,
    unlocked: false,
    rarity: 'rare'
  }
];

export const gameStatistics: GameStatistic[] = [
  {
    label: 'Games Played',
    value: 342,
    change: 12,
    icon: <BarChart3 size={20} />,
    color: 'text-deep-navy'
  },
  {
    label: 'Win Rate',
    value: '68%',
    change: 5,
    icon: <TrendingUp size={20} />,
    color: 'text-emerald-accent'
  },
  {
    label: 'Best Streak',
    value: 18,
    change: 2,
    icon: <Zap size={20} />,
    color: 'text-champagne-gold'
  },
  {
    label: 'Avg Score',
    value: 287,
    change: -3,
    icon: <Target size={20} />,
    color: 'text-rich-burgundy'
  },
  {
    label: 'Time Played',
    value: '127h',
    icon: <Clock size={20} />,
    color: 'text-elegant-gray'
  },
  {
    label: 'Tournaments Won',
    value: 3,
    change: 1,
    icon: <Trophy size={20} />,
    color: 'text-champagne-gold'
  }
];

export const recentActivities = [
  { text: "Won tournament 'Golden Cup Championship'", time: "2 hours ago", icon: <Trophy size={16} /> },
  { text: "Achieved level 28", time: "1 day ago", icon: <Crown size={16} /> },
  { text: "Completed 'Speed Demon' achievement", time: "3 days ago", icon: <Zap size={16} /> },
  { text: "Won 5 games in a row", time: "1 week ago", icon: <Star size={16} /> }
];

export const settingsOptions = [
  { title: 'Account Settings', description: 'Manage your account and privacy', icon: <User size={20} /> },
  { title: 'Game Preferences', description: 'Customize your gaming experience', icon: <Settings size={20} /> },
  { title: 'Notifications', description: 'Manage your notification preferences', icon: <Star size={20} /> },
  { title: 'Sound & Effects', description: 'Audio and visual settings', icon: <Zap size={20} /> }
];