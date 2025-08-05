import React from 'react';
import { Play, Users, Bot, Coins, Settings, Bell, Crown, Star } from 'lucide-react';
import { Button } from './ui/button';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';

interface HomeScreenProps {
  onStartGame: (mode?: '1v1' | '4player') => void;
  onJoinCafe: () => void;
  onShowProfile: () => void;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ onStartGame, onJoinCafe, onShowProfile }) => {
  const coins = 2450;
  const level = 12;
  const xp = 73;
  const onlinePlayers = 1247;

  return (
    <div className="flex flex-col min-h-screen pb-24 px-4">
      {/* Header */}
      <div className="glass-neon rounded-2xl p-4 mb-6 mt-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="cursor-pointer" onClick={onShowProfile}>
              <Avatar className="w-14 h-14 border-2 border-hot-pink">
                <AvatarImage src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face" />
                <AvatarFallback className="bg-gradient-to-br from-purple-magenta to-deep-purple text-neon-white">YA</AvatarFallback>
              </Avatar>
            </div>
            
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-deep-purple text-lg">Youcef A.</h3>
                <Badge className="bg-gradient-to-r from-hot-pink to-coral-pink text-neon-white px-2 py-1">
                  <Crown size={12} className="mr-1" />
                  {level}
                </Badge>
              </div>
              <div className="space-y-1">
                <Progress value={xp} className="w-28 h-2" />
                <p className="text-xs text-purple-magenta">{xp}% to next level</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 glass-strong px-3 py-2 rounded-full">
              <Coins size={18} className="text-coral-pink" />
              <span className="font-semibold text-deep-purple">{coins.toLocaleString()}</span>
            </div>
            
            <Button variant="ghost" size="sm" className="p-2 glass-strong rounded-full">
              <Settings size={18} className="text-teal-blue" />
            </Button>
            
            <Button variant="ghost" size="sm" className="p-2 glass-strong rounded-full relative">
              <Bell size={18} className="text-purple-magenta" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-hot-pink rounded-full" />
            </Button>
          </div>
        </div>
      </div>

      {/* Online Status */}
      <div className="glass-strong rounded-xl p-4 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-mint-green rounded-full" />
            <div>
              <span className="font-semibold text-deep-purple">{onlinePlayers} players online</span>
              <p className="text-xs text-purple-magenta mt-1">Join the neon domino arena!</p>
            </div>
          </div>
          <div className="flex gap-4 text-center">
            <div>
              <div className="font-bold text-mint-green">78%</div>
              <div className="text-xs text-purple-magenta/80">Win Rate</div>
            </div>
            <div>
              <div className="font-bold text-coral-pink">12</div>
              <div className="text-xs text-purple-magenta/80">Best Streak</div>
            </div>
            <div>
              <div className="font-bold text-teal-blue">234</div>
              <div className="text-xs text-purple-magenta/80">Total Games</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Play Button */}
      <div className="mb-6">
        <Button
          onClick={() => onStartGame('1v1')}
          className="w-full h-20 bg-gradient-to-r from-hot-pink via-coral-pink to-hot-pink text-neon-white text-2xl font-bold"
          size="lg"
        >
          <Play size={32} fill="currentColor" className="mr-4" />
          PLAY NOW
        </Button>
      </div>

      {/* Game Mode Cards */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <Button
          variant="outline"
          className="w-full h-16 glass-strong border-2 border-teal-blue/40 text-teal-blue hover:bg-teal-blue hover:text-neon-white"
          onClick={() => onStartGame('1v1')}
        >
          <div className="flex flex-col items-center gap-1">
            <Users size={20} />
            <span className="font-semibold">Quick Match</span>
          </div>
        </Button>
        
        <Button
          variant="outline"
          className="w-full h-16 glass-strong border-2 border-purple-magenta/40 text-purple-magenta hover:bg-purple-magenta hover:text-neon-white"
        >
          <div className="flex flex-col items-center gap-1">
            <Bot size={20} />
            <span className="font-semibold">vs AI</span>
          </div>
        </Button>
      </div>

      {/* 4-Player Mode and Cafe */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <Button
          variant="outline"
          className="w-full h-12 glass-strong border-hot-pink/50 text-hot-pink hover:bg-hot-pink hover:text-neon-white"
          onClick={() => onStartGame('4player')}
        >
          <div className="flex items-center justify-center gap-2">
            <div className="relative">
              <Users size={16} />
              <span className="absolute -top-1 -right-1 bg-hot-pink text-neon-white text-xs rounded-full w-3 h-3 flex items-center justify-center text-[8px] font-bold">
                4
              </span>
            </div>
            <span className="font-semibold">4 Players</span>
          </div>
        </Button>
        
        <Button
          variant="outline"
          className="w-full h-12 glass-strong border-coral-pink/50 text-coral-pink hover:bg-coral-pink hover:text-deep-purple"
          onClick={onJoinCafe}
        >
          Join Café
        </Button>
      </div>

      {/* Daily Missions */}
      <div className="glass-strong rounded-xl p-5 mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Star size={20} className="text-coral-pink" />
            <h4 className="font-semibold text-deep-purple">Daily Missions</h4>
          </div>
          <Badge variant="outline" className="glass-strong border-mint-green/50 text-mint-green">
            2/3 Complete
          </Badge>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 glass-strong rounded-lg">
            <span className="text-sm font-medium text-deep-purple">Play 3 games</span>
            <Badge className="bg-mint-green text-deep-purple">
              <Star size={12} className="mr-1" />
              Complete
            </Badge>
          </div>
          <div className="flex items-center justify-between p-3 glass-strong rounded-lg">
            <span className="text-sm font-medium text-deep-purple">Win 1 game</span>
            <Badge className="bg-mint-green text-deep-purple">
              <Star size={12} className="mr-1" />
              Complete
            </Badge>
          </div>
          <div className="flex items-center justify-between p-3 glass-strong rounded-lg">
            <span className="text-sm font-medium text-deep-purple">Score 100+ points</span>
            <div className="flex items-center gap-2">
              <Progress value={67} className="w-16 h-2" />
              <span className="text-xs text-purple-magenta">67%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Activity Feed */}
      <div className="glass-strong rounded-xl p-5">
        <h4 className="font-semibold text-deep-purple mb-4">Recent Activity</h4>
        <div className="space-y-3">
          {[
            { text: "Ahmed just won 500 coins!", icon: "🎉", time: "2m ago" },
            { text: "Tournament starting in 5 minutes", icon: "⏰", time: "5m ago" },
            { text: "Sarah reached level 25!", icon: "👑", time: "8m ago" }
          ].map((activity, index) => (
            <div key={index} className="flex items-center gap-3 p-3 glass-strong rounded-lg">
              <span className="text-lg">{activity.icon}</span>
              <div className="flex-1">
                <p className="text-sm font-medium text-deep-purple">{activity.text}</p>
                <p className="text-xs text-purple-magenta/80">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;