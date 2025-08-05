import React from 'react';
import { Coffee, Users, Globe, Star, Crown } from 'lucide-react';
import { Button } from './ui/button';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';
import { Badge } from './ui/badge';

const CafeScreen: React.FC = () => {
  const cafeRooms = [
    { id: 1, name: "Algerian Champions", players: 12, maxPlayers: 16, level: "Expert", flag: "🇩🇿" },
    { id: 2, name: "Neon Beginners", players: 8, maxPlayers: 12, level: "Beginner", flag: "🌟" },
    { id: 3, name: "Desert Masters", players: 15, maxPlayers: 20, level: "Master", flag: "🏜️" },
    { id: 4, name: "Casual Players", players: 6, maxPlayers: 10, level: "Casual", flag: "☕" }
  ];

  return (
    <div className="flex flex-col min-h-screen pb-24 px-4">
      {/* Header */}
      <div className="glass-neon rounded-2xl p-4 mb-6 mt-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-coral-pink to-hot-pink rounded-2xl flex items-center justify-center">
              <Coffee size={24} className="text-neon-white" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-deep-purple">Neon Café</h1>
              <p className="text-sm text-purple-magenta">Join tables and play with friends</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 glass-strong px-3 py-2 rounded-full">
            <Globe size={16} className="text-mint-green" />
            <span className="font-bold text-deep-purple">1,247 online</span>
          </div>
        </div>
      </div>

      {/* Quick Join */}
      <div className="mb-6">
        <Button
          className="w-full h-16 bg-gradient-to-r from-mint-green to-teal-blue text-deep-purple text-lg font-bold"
          size="lg"
        >
          <Users size={24} className="mr-3" />
          Quick Join Random Table
        </Button>
      </div>

      {/* Cafe Rooms */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-deep-purple mb-4">Available Tables</h2>
        
        {cafeRooms.map((room) => (
          <div key={room.id} className="glass-neon p-4 rounded-xl">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{room.flag}</span>
                <div>
                  <h3 className="font-semibold text-deep-purple">{room.name}</h3>
                  <p className="text-sm text-purple-magenta">{room.level} Level</p>
                </div>
              </div>
              
              <Badge 
                variant="outline" 
                className={`${
                  room.level === 'Master' ? 'text-hot-pink border-hot-pink' :
                  room.level === 'Expert' ? 'text-coral-pink border-coral-pink' :
                  room.level === 'Beginner' ? 'text-mint-green border-mint-green' :
                  'text-teal-blue border-teal-blue'
                }`}
              >
                {room.level}
              </Badge>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Users size={16} className="text-purple-magenta" />
                  <span className="text-sm font-medium text-deep-purple">
                    {room.players}/{room.maxPlayers}
                  </span>
                </div>
                
                <div className="flex -space-x-2">
                  {[1, 2, 3].map((i) => (
                    <Avatar key={i} className="w-8 h-8 border-2 border-neon-white">
                      <AvatarImage src={`https://images.unsplash.com/photo-${1500 + i * 100}?w=50&h=50&fit=crop&crop=face`} />
                      <AvatarFallback className="bg-gradient-to-br from-teal-blue to-mint-green text-neon-white text-xs">
                        U{i}
                      </AvatarFallback>
                    </Avatar>
                  ))}
                </div>
              </div>
              
              <Button 
                variant="outline"
                size="sm"
                className="glass-strong border-coral-pink/50 text-coral-pink hover:bg-coral-pink hover:text-neon-white"
              >
                Join Table
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Create Table */}
      <div className="mt-6 glass-strong rounded-xl p-4">
        <h3 className="font-semibold text-deep-purple mb-3">Create Your Own Table</h3>
        <Button 
          variant="outline"
          className="w-full glass-neon border-hot-pink/50 text-hot-pink hover:bg-hot-pink hover:text-neon-white"
        >
          <Crown size={20} className="mr-2" />
          Create Private Table
        </Button>
      </div>
    </div>
  );
};

export default CafeScreen;