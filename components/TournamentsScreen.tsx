import React from 'react';
import { Trophy, Calendar, Users, Coins, Star, Crown } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';

const TournamentsScreen: React.FC = () => {
  const tournaments = [
    {
      id: 1,
      name: "Neon Championship",
      prize: 5000,
      participants: 234,
      maxParticipants: 256,
      timeLeft: "2h 45m",
      entry: 100,
      status: "open"
    },
    {
      id: 2,
      name: "Desert Masters Cup",
      prize: 2500,
      participants: 89,
      maxParticipants: 128,
      timeLeft: "1d 12h",
      entry: 50,
      status: "open"
    },
    {
      id: 3,
      name: "Weekly Showdown",
      prize: 1000,
      participants: 156,
      maxParticipants: 200,
      timeLeft: "4d 8h",
      entry: 25,
      status: "open"
    }
  ];

  return (
    <div className="flex flex-col min-h-screen pb-24 px-4">
      {/* Header */}
      <div className="glass-neon rounded-2xl p-4 mb-6 mt-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-hot-pink to-coral-pink rounded-2xl flex items-center justify-center">
              <Trophy size={24} className="text-neon-white" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-deep-purple">Tournaments</h1>
              <p className="text-sm text-purple-magenta">Compete for glory and prizes</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 glass-strong px-3 py-2 rounded-full">
            <Crown size={16} className="text-hot-pink" />
            <span className="font-bold text-deep-purple">Rank #47</span>
          </div>
        </div>
      </div>

      {/* Current Tournament */}
      <div className="glass-neon p-5 rounded-xl mb-6">
        <div className="flex items-center gap-2 mb-3">
          <Star size={20} className="text-coral-pink" />
          <h2 className="font-semibold text-deep-purple">Featured Tournament</h2>
        </div>
        
        <div className="bg-gradient-to-r from-hot-pink/10 to-coral-pink/10 rounded-xl p-4">
          <h3 className="text-lg font-bold text-deep-purple mb-2">Grand Neon Championship</h3>
          <p className="text-sm text-purple-magenta mb-4">The ultimate domino tournament with massive prizes!</p>
          
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="text-center">
              <div className="font-bold text-2xl text-hot-pink">50,000</div>
              <div className="text-xs text-purple-magenta">Prize Pool</div>
            </div>
            <div className="text-center">
              <div className="font-bold text-2xl text-mint-green">3d 12h</div>
              <div className="text-xs text-purple-magenta">Time Left</div>
            </div>
          </div>
          
          <Button className="w-full bg-gradient-to-r from-hot-pink to-coral-pink text-neon-white">
            <Trophy size={20} className="mr-2" />
            Join Championship (500 coins)
          </Button>
        </div>
      </div>

      {/* Active Tournaments */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-deep-purple">Active Tournaments</h2>
        
        {tournaments.map((tournament) => (
          <div key={tournament.id} className="glass-strong p-4 rounded-xl">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="font-semibold text-deep-purple">{tournament.name}</h3>
                <div className="flex items-center gap-4 mt-1">
                  <div className="flex items-center gap-1 text-sm text-purple-magenta">
                    <Coins size={14} className="text-coral-pink" />
                    <span>{tournament.prize.toLocaleString()} prize</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-purple-magenta">
                    <Calendar size={14} className="text-teal-blue" />
                    <span>{tournament.timeLeft}</span>
                  </div>
                </div>
              </div>
              
              <Badge className="bg-mint-green text-deep-purple">
                {tournament.status.toUpperCase()}
              </Badge>
            </div>
            
            <div className="mb-3">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm text-purple-magenta">
                  {tournament.participants}/{tournament.maxParticipants} players
                </span>
                <span className="text-sm text-purple-magenta">
                  {Math.round((tournament.participants / tournament.maxParticipants) * 100)}%
                </span>
              </div>
              <Progress 
                value={(tournament.participants / tournament.maxParticipants) * 100} 
                className="h-2"
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Users size={16} className="text-purple-magenta" />
                <span className="text-sm font-medium text-deep-purple">
                  Entry: {tournament.entry} coins
                </span>
              </div>
              
              <Button 
                variant="outline"
                size="sm"
                className="glass-strong border-hot-pink/50 text-hot-pink hover:bg-hot-pink hover:text-neon-white"
              >
                Join Tournament
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Tournament History */}
      <div className="mt-6 glass-strong rounded-xl p-4">
        <h3 className="font-semibold text-deep-purple mb-3">Your Tournament History</h3>
        <div className="space-y-2">
          {[
            { name: "Weekly Cup #12", placement: "3rd", prize: 250 },
            { name: "Desert Challenge", placement: "7th", prize: 50 },
            { name: "Neon Showdown", placement: "1st", prize: 1000 }
          ].map((result, index) => (
            <div key={index} className="flex items-center justify-between p-2 glass-strong rounded-lg">
              <div>
                <span className="text-sm font-medium text-deep-purple">{result.name}</span>
                <span className="ml-2 text-xs text-purple-magenta">#{result.placement}</span>
              </div>
              <span className="text-sm font-bold text-coral-pink">+{result.prize}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TournamentsScreen;