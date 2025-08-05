export const getRarityColor = (rarity: string) => {
  switch (rarity) {
    case 'legendary': return 'from-hot-pink via-coral-pink to-mint-green';
    case 'epic': return 'from-purple-magenta via-hot-pink to-coral-pink';
    case 'rare': return 'from-teal-blue via-mint-green to-coral-pink';
    case 'common': return 'from-deep-purple via-purple-magenta to-teal-blue';
    default: return 'from-deep-purple to-purple-magenta';
  }
};

export const getRarityGlow = (rarity: string) => {
  switch (rarity) {
    case 'legendary': return 'neon-glow-strong';
    case 'epic': return 'neon-glow';
    case 'rare': return 'neon-glow-coral';
    case 'common': return 'neon-glow-mint';
    default: return '';
  }
};

export const getRankColor = (rank: string) => {
  switch (rank) {
    case 'Diamond': return 'from-coral-pink via-neon-white to-mint-green';
    case 'Gold': return 'from-hot-pink via-coral-pink to-hot-pink';
    case 'Silver': return 'from-teal-blue via-glass-white to-teal-blue';
    case 'Bronze': return 'from-purple-magenta via-coral-pink to-purple-magenta';
    default: return 'from-deep-purple to-purple-magenta';
  }
};