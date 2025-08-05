import React from 'react';
import { Home, Coffee, Trophy, ShoppingBag, User } from 'lucide-react';
import { Screen } from '../types/AppTypes';

interface BottomNavigationProps {
  activeTab: Screen;
  onTabChange: (tab: Screen) => void;
}

const BottomNavigation: React.FC<BottomNavigationProps> = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'home' as Screen, icon: Home, label: 'Home' },
    { id: 'cafe' as Screen, icon: Coffee, label: 'Café' },
    { id: 'tournaments' as Screen, icon: Trophy, label: 'Tournaments' },
    { id: 'shop' as Screen, icon: ShoppingBag, label: 'Shop' },
    { id: 'profile' as Screen, icon: User, label: 'Profile' }
  ];

  return (
    <div className="glass-neon mx-4 mb-4 rounded-2xl p-2 depth-4">
      <div className="flex items-center justify-around">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          const Icon = tab.icon;
          
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex flex-col items-center gap-1 p-3 rounded-xl transition-all duration-200 ${
                isActive 
                  ? 'glass-strong text-hot-pink' 
                  : 'text-purple-magenta/60 hover:text-purple-magenta'
              }`}
            >
              <div className="p-1">
                <Icon size={20} />
              </div>
              <span className="text-xs font-medium">
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNavigation;