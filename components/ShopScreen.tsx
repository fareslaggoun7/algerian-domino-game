import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShoppingBag, 
  Coins, 
  Gem, 
  Crown, 
  Star, 
  Zap, 
  Gift,
  Sparkles,
  Flame,
  Shield,
  Target,
  Clock,
  Lock,
  Unlock,
  Check,
  Palette,
  Camera,
  Music,
  Heart,
  Infinity,
  Diamond,
  Wand2,
  Shuffle,
  Volume2
} from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { dominoSkins, DominoSkinPreview, getRarityColor, getRarityGlow, type DominoSkin } from './DominoSkins';

interface ShopItem {
  id: string;
  name: string;
  description: string;
  type: 'coins' | 'gems' | 'premium' | 'powerup' | 'bundle' | 'avatar' | 'theme' | 'table' | 'sound' | 'effect';
  price: number;
  currency: 'coins' | 'gems' | 'real';
  originalPrice?: number;
  discount?: number;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  category: 'currency' | 'skins' | 'powerups' | 'bundles' | 'cosmetics' | 'premium';
  icon: React.ReactNode;
  effects?: string[];
  limited?: boolean;
  timeLeft?: number;
  preview?: string;
}

const ShopScreen: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('skins');
  const [playerCoins] = useState(12450);
  const [playerGems] = useState(89);
  const [purchasedItems, setPurchasedItems] = useState<string[]>(['classic']);

  const shopItems: ShopItem[] = [
    // Currency Packs
    {
      id: 'coins-small',
      name: '1,000 Coins',
      description: 'Small coin pack for quick purchases',
      type: 'coins',
      price: 99,
      currency: 'real',
      rarity: 'common',
      category: 'currency',
      icon: <Coins size={24} className="text-coral-pink" />
    },
    {
      id: 'coins-medium',
      name: '5,000 Coins',
      description: 'Popular coin pack with bonus',
      type: 'coins',
      price: 499,
      currency: 'real',
      originalPrice: 599,
      discount: 17,
      rarity: 'rare',
      category: 'currency',
      icon: <Coins size={24} className="text-hot-pink" />
    },
    {
      id: 'coins-large',
      name: '15,000 Coins',
      description: 'Best value coin pack',
      type: 'coins',
      price: 999,
      currency: 'real',
      originalPrice: 1499,
      discount: 33,
      rarity: 'epic',
      category: 'currency',
      icon: <Coins size={24} className="text-mint-green" />
    },
    {
      id: 'gems-small',
      name: '10 Gems',
      description: 'Premium currency for exclusive items',
      type: 'gems',
      price: 199,
      currency: 'real',
      rarity: 'rare',
      category: 'currency',
      icon: <Gem size={24} className="text-purple-magenta" />
    },
    {
      id: 'gems-medium',
      name: '50 Gems',
      description: 'Great gem pack with bonus',
      type: 'gems',
      price: 799,
      currency: 'real',
      originalPrice: 999,
      discount: 20,
      rarity: 'epic',
      category: 'currency',
      icon: <Gem size={24} className="text-coral-pink" />
    },
    
    // Avatar Frames and Decorations
    {
      id: 'neon-frame',
      name: 'Neon Glory Frame',
      description: 'Animated neon border for your avatar',
      type: 'avatar',
      price: 25,
      currency: 'gems',
      rarity: 'epic',
      category: 'cosmetics',
      icon: <Crown size={24} className="text-hot-pink" />,
      effects: ['Animated Border', 'Neon Glow']
    },
    {
      id: 'diamond-frame',
      name: 'Diamond Elite Frame',
      description: 'Sparkling diamond-encrusted frame',
      type: 'avatar',
      price: 50,
      currency: 'gems',
      rarity: 'legendary',
      category: 'cosmetics',
      icon: <Diamond size={24} className="text-purple-magenta" />,
      effects: ['Sparkling Particles', 'Elite Status']
    },
    {
      id: 'fire-frame',
      name: 'Blazing Fire Frame',
      description: 'Dancing flames around your avatar',
      type: 'avatar',
      price: 30,
      currency: 'gems',
      rarity: 'epic',
      category: 'cosmetics',
      icon: <Flame size={24} className="text-coral-pink" />,
      effects: ['Fire Animation', 'Heat Distortion']
    },
    
    // Table Designs
    {
      id: 'cosmic-table',
      name: 'Cosmic Void Table',
      description: 'Play on a starfield table with swirling galaxies',
      type: 'table',
      price: 1500,
      currency: 'coins',
      rarity: 'epic',
      category: 'cosmetics',
      icon: <Sparkles size={24} className="text-purple-magenta" />,
      effects: ['Star Particles', 'Galaxy Swirl', 'Cosmic Sounds']
    },
    {
      id: 'ocean-table',
      name: 'Deep Ocean Table',
      description: 'Underwater table with flowing currents',
      type: 'table',
      price: 2000,
      currency: 'coins',
      rarity: 'epic',
      category: 'cosmetics',
      icon: <Target size={24} className="text-teal-blue" />,
      effects: ['Water Flow', 'Bubble Effects', 'Ocean Sounds']
    },
    {
      id: 'royal-table',
      name: 'Royal Golden Table',
      description: 'Luxurious gold table fit for kings',
      type: 'table',
      price: 75,
      currency: 'gems',
      rarity: 'legendary',
      category: 'cosmetics',
      icon: <Crown size={24} className="text-hot-pink" />,
      effects: ['Gold Shimmer', 'Royal Fanfare', 'Crown Particles']
    },
    
    // Game Themes
    {
      id: 'cyberpunk-theme',
      name: 'Cyberpunk 2077 Theme',
      description: 'Futuristic neon cyberpunk experience',
      type: 'theme',
      price: 40,
      currency: 'gems',
      rarity: 'legendary',
      category: 'cosmetics',
      icon: <Zap size={24} className="text-mint-green" />,
      effects: ['Neon UI', 'Cyber Sounds', 'Holographic Effects', 'Digital Rain']
    },
    {
      id: 'desert-theme',
      name: 'Sahara Desert Theme',
      description: 'Traditional North African desert ambiance',
      type: 'theme',
      price: 1800,
      currency: 'coins',
      rarity: 'rare',
      category: 'cosmetics',
      icon: <Star size={24} className="text-coral-pink" />,
      effects: ['Sand Particles', 'Wind Sounds', 'Warm Colors']
    },
    {
      id: 'space-theme',
      name: 'Galactic Explorer Theme',
      description: 'Space station with planet views',
      type: 'theme',
      price: 35,
      currency: 'gems',
      rarity: 'epic',
      category: 'cosmetics',
      icon: <Sparkles size={24} className="text-purple-magenta" />,
      effects: ['Planet Rotation', 'Space Ambient', 'Asteroid Belt']
    },
    
    // Sound Packs
    {
      id: 'classical-sounds',
      name: 'Classical Morocco Pack',
      description: 'Traditional Algerian café sounds',
      type: 'sound',
      price: 800,
      currency: 'coins',
      rarity: 'rare',
      category: 'cosmetics',
      icon: <Music size={24} className="text-teal-blue" />,
      effects: ['Oud Music', 'Café Chatter', 'Tea Brewing']
    },
    {
      id: 'electronic-sounds',
      name: 'Electronic Vibes Pack',
      description: 'Modern electronic music and effects',
      type: 'sound',
      price: 15,
      currency: 'gems',
      rarity: 'epic',
      category: 'cosmetics',
      icon: <Volume2 size={24} className="text-hot-pink" />,
      effects: ['Synth Music', 'Electronic SFX', 'Beat Drop']
    },
    {
      id: 'nature-sounds',
      name: 'Nature Harmony Pack',
      description: 'Relaxing natural sounds',
      type: 'sound',
      price: 600,
      currency: 'coins',
      rarity: 'common',
      category: 'cosmetics',
      icon: <Heart size={24} className="text-mint-green" />,
      effects: ['Forest Sounds', 'Water Flow', 'Bird Songs']
    },
    
    // Special Effects
    {
      id: 'victory-fireworks',
      name: 'Victory Fireworks',
      description: 'Spectacular fireworks when you win',
      type: 'effect',
      price: 1200,
      currency: 'coins',
      rarity: 'epic',
      category: 'cosmetics',
      icon: <Sparkles size={24} className="text-coral-pink" />,
      effects: ['Firework Burst', 'Color Explosion', 'Victory Fanfare']
    },
    {
      id: 'magic-sparkles',
      name: 'Magic Sparkle Trail',
      description: 'Magical sparkles follow your moves',
      type: 'effect',
      price: 20,
      currency: 'gems',
      rarity: 'rare',
      category: 'cosmetics',
      icon: <Wand2 size={24} className="text-purple-magenta" />,
      effects: ['Sparkle Trail', 'Magic Chimes', 'Stardust']
    },
    {
      id: 'lightning-effect',
      name: 'Lightning Strike Effect',
      description: 'Lightning effects on successful plays',
      type: 'effect',
      price: 25,
      currency: 'gems',
      rarity: 'epic',
      category: 'cosmetics',
      icon: <Zap size={24} className="text-hot-pink" />,
      effects: ['Lightning Bolt', 'Thunder Sound', 'Electric Glow']
    },
    
    // Power-ups
    {
      id: 'double-xp',
      name: 'Double XP Boost',
      description: '2x experience for 2 hours',
      type: 'powerup',
      price: 50,
      currency: 'coins',
      rarity: 'common',
      category: 'powerups',
      icon: <Zap size={24} className="text-mint-green" />
    },
    {
      id: 'lucky-tiles',
      name: 'Lucky Tiles',
      description: 'Higher chance of good draws',
      type: 'powerup',
      price: 100,
      currency: 'coins',
      rarity: 'rare',
      category: 'powerups',
      icon: <Star size={24} className="text-coral-pink" />
    },
    {
      id: 'time-freeze',
      name: 'Time Freeze',
      description: 'Pause the timer for 30 seconds',
      type: 'powerup',
      price: 75,
      currency: 'coins',
      rarity: 'rare',
      category: 'powerups',
      icon: <Clock size={24} className="text-teal-blue" />
    },
    {
      id: 'coin-magnet',
      name: 'Coin Magnet',
      description: '50% more coins for 5 games',
      type: 'powerup',
      price: 150,
      currency: 'coins',
      rarity: 'epic',
      category: 'powerups',
      icon: <Target size={24} className="text-purple-magenta" />
    },
    {
      id: 'perfect-shuffle',
      name: 'Perfect Shuffle',
      description: 'Guarantees optimal starting hand',
      type: 'powerup',
      price: 10,
      currency: 'gems',
      rarity: 'legendary',
      category: 'powerups',
      icon: <Shuffle size={24} className="text-hot-pink" />
    },
    
    // Premium Subscriptions
    {
      id: 'premium-pass',
      name: 'Neon Premium Pass',
      description: '30 days of premium benefits',
      type: 'premium',
      price: 1499,
      currency: 'real',
      rarity: 'legendary',
      category: 'premium',
      icon: <Crown size={24} className="text-hot-pink" />,
      effects: ['2x XP', '2x Coins', 'Exclusive Skins', 'No Ads', 'Priority Matchmaking']
    },
    {
      id: 'vip-membership',
      name: 'VIP Elite Membership',
      description: 'Ultimate VIP experience for 90 days',
      type: 'premium',
      price: 2999,
      currency: 'real',
      originalPrice: 4499,
      discount: 33,
      rarity: 'legendary',
      category: 'premium',
      icon: <Diamond size={24} className="text-purple-magenta" />,
      effects: ['3x XP', '3x Coins', 'All Cosmetics', 'VIP Badge', 'Exclusive Tournaments', 'Personal Concierge']
    },
    
    // Bundles
    {
      id: 'starter-bundle',
      name: 'Neon Starter Bundle',
      description: 'Perfect starter pack for new players',
      type: 'bundle',
      price: 599,
      currency: 'real',
      originalPrice: 899,
      discount: 33,
      rarity: 'epic',
      category: 'bundles',
      icon: <Gift size={24} className="text-mint-green" />,
      effects: ['5,000 Coins', '20 Gems', '3 Powerups', 'Neon Skin', 'Avatar Frame']
    },
    {
      id: 'cosmetic-bundle',
      name: 'Ultimate Cosmetic Bundle',
      description: 'Everything you need to customize your experience',
      type: 'bundle',
      price: 1999,
      currency: 'real',
      originalPrice: 2999,
      discount: 33,
      rarity: 'legendary',
      category: 'bundles',
      icon: <Palette size={24} className="text-hot-pink" />,
      effects: ['10 Domino Skins', '5 Avatar Frames', '3 Table Designs', '2 Themes', 'Sound Packs']
    },
    {
      id: 'power-bundle',
      name: 'Power Player Bundle',
      description: 'Dominate the competition',
      type: 'bundle',
      price: 899,
      currency: 'real',
      originalPrice: 1299,
      discount: 31,
      rarity: 'epic',
      category: 'bundles',
      icon: <Shield size={24} className="text-teal-blue" />,
      effects: ['10,000 Coins', '50 Gems', '10 Power-ups', 'Legendary Skin', 'VIP Status']
    }
  ];

  const handlePurchase = (itemId: string) => {
    if (!purchasedItems.includes(itemId)) {
      setPurchasedItems([...purchasedItems, itemId]);
    }
  };

  const canAfford = (item: ShopItem) => {
    if (item.currency === 'coins') return playerCoins >= item.price;
    if (item.currency === 'gems') return playerGems >= item.price;
    return true; // Real money items
  };

  const isOwned = (itemId: string) => {
    return purchasedItems.includes(itemId);
  };

  const formatPrice = (item: ShopItem) => {
    if (item.currency === 'real') {
      return `$${(item.price / 100).toFixed(2)}`;
    }
    return `${item.price.toLocaleString()} ${item.currency}`;
  };

  const getFilteredItems = (category: string) => {
    if (category === 'skins') {
      return dominoSkins;
    }
    return shopItems.filter(item => item.category === category);
  };

  const getPreviewContent = (item: ShopItem) => {
    switch (item.type) {
      case 'avatar':
        return <Camera size={32} className={getRarityColor(item.rarity).split(' ')[0]} />;
      case 'table':
        return <div className={`w-12 h-8 rounded ${item.rarity === 'legendary' ? 'bg-gradient-to-br from-hot-pink to-coral-pink' : 'bg-gradient-to-br from-teal-blue to-mint-green'}`} />;
      case 'theme':
        return <Palette size={32} className={getRarityColor(item.rarity).split(' ')[0]} />;
      case 'sound':
        return <Volume2 size={32} className={getRarityColor(item.rarity).split(' ')[0]} />;
      case 'effect':
        return <Sparkles size={32} className={getRarityColor(item.rarity).split(' ')[0]} />;
      default:
        return item.icon;
    }
  };

  return (
    <div className="flex flex-col h-screen pb-20 relative overflow-hidden transform-3d-deep">
      {/* Neon Shop Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0" style={{
          background: `
            radial-gradient(circle at 25% 25%, rgba(133, 36, 103, 0.08) 0%, transparent 50%),
            radial-gradient(circle at 75% 75%, rgba(73, 128, 153, 0.06) 0%, transparent 50%),
            radial-gradient(circle at 50% 10%, rgba(238, 34, 125, 0.04) 0%, transparent 40%),
            linear-gradient(135deg, var(--neon-day-start) 0%, var(--neon-day-end) 100%)
          `
        }} />
      </div>

      {/* Floating Shop Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute ${
              i % 4 === 0 ? 'text-hot-pink' : 
              i % 4 === 1 ? 'text-mint-green' : 
              i % 4 === 2 ? 'text-coral-pink' : 'text-teal-blue'
            }`}
            style={{
              left: `${10 + i * 12}%`,
              top: `${15 + (i % 4) * 20}%`
            }}
            animate={{
              y: [-15, 15, -15],
              rotate: [0, 360],
              opacity: [0.3, 0.7, 0.3]
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            {i % 4 === 0 ? <Coins size={16} /> : 
             i % 4 === 1 ? <Gem size={16} /> :
             i % 4 === 2 ? <Star size={16} /> : <Sparkles size={16} />}
          </motion.div>
        ))}
      </div>

      {/* Header */}
      <motion.div 
        className="glass-neon p-4 m-4 rounded-2xl depth-4 neon-shadow-floating"
        initial={{ y: -100, opacity: 0, rotateX: -25 }}
        animate={{ y: 0, opacity: 1, rotateX: 0 }}
        transition={{ duration: 0.8, type: "spring" }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <motion.div
              className="w-12 h-12 bg-gradient-to-br from-purple-magenta via-hot-pink to-coral-pink rounded-2xl flex items-center justify-center depth-3 card-3d-strong"
              whileHover={{ rotateY: 20, scale: 1.1 }}
              animate={{
                background: [
                  'linear-gradient(135deg, var(--purple-magenta), var(--hot-pink))',
                  'linear-gradient(135deg, var(--hot-pink), var(--coral-pink))',
                  'linear-gradient(135deg, var(--coral-pink), var(--mint-green))',
                  'linear-gradient(135deg, var(--mint-green), var(--purple-magenta))'
                ]
              }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <ShoppingBag size={24} className="text-neon-white drop-shadow-lg" />
            </motion.div>
            <div>
              <h1 className="text-xl font-semibold text-deep-purple">Neon Shop</h1>
              <p className="text-sm text-purple-magenta">Customize • Enhance • Dominate</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <motion.div 
              className="flex items-center gap-2 glass-strong px-3 py-2 rounded-full depth-2"
              whileHover={{ scale: 1.05 }}
            >
              <Coins size={16} className="text-coral-pink" />
              <span className="font-bold text-deep-purple">{playerCoins.toLocaleString()}</span>
            </motion.div>
            <motion.div 
              className="flex items-center gap-2 glass-strong px-3 py-2 rounded-full depth-2"
              whileHover={{ scale: 1.05 }}
            >
              <Gem size={16} className="text-purple-magenta" />
              <span className="font-bold text-deep-purple">{playerGems}</span>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="flex-1 mx-4">
        <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="h-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <TabsList className="grid w-full grid-cols-6 glass-neon p-1 rounded-xl depth-2 text-xs">
              <TabsTrigger 
                value="skins" 
                className="rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-hot-pink data-[state=active]:to-coral-pink data-[state=active]:text-neon-white"
              >
                Skins
              </TabsTrigger>
              <TabsTrigger 
                value="cosmetics" 
                className="rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-magenta data-[state=active]:to-deep-purple data-[state=active]:text-neon-white"
              >
                Cosmetics
              </TabsTrigger>
              <TabsTrigger 
                value="powerups" 
                className="rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-teal-blue data-[state=active]:to-mint-green data-[state=active]:text-deep-purple"
              >
                Power-ups
              </TabsTrigger>
              <TabsTrigger 
                value="premium" 
                className="rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-mint-green data-[state=active]:to-teal-blue data-[state=active]:text-deep-purple"
              >
                Premium
              </TabsTrigger>
              <TabsTrigger 
                value="bundles" 
                className="rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-coral-pink data-[state=active]:to-hot-pink data-[state=active]:text-neon-white"
              >
                Bundles
              </TabsTrigger>
              <TabsTrigger 
                value="currency" 
                className="rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-hot-pink data-[state=active]:to-purple-magenta data-[state=active]:text-neon-white"
              >
                Currency
              </TabsTrigger>
            </TabsList>
          </motion.div>

          {/* Domino Skins Tab */}
          <TabsContent value="skins" className="mt-4 space-y-4">
            <motion.div
              className="grid grid-cols-2 gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              {dominoSkins.map((skin, index) => (
                <motion.div
                  key={skin.id}
                  className={`glass-neon p-4 rounded-xl depth-3 card-3d-strong ${getRarityGlow(skin.rarity)} ${
                    skin.rarity === 'legendary' ? 'ring-1 ring-hot-pink/30' : ''
                  }`}
                  initial={{ scale: 0.8, opacity: 0, rotateY: -20 }}
                  animate={{ scale: 1, opacity: 1, rotateY: 0 }}
                  transition={{ delay: 0.5 + index * 0.1, duration: 0.6 }}
                  whileHover={{ scale: 1.02, rotateY: 5 }}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-deep-purple">{skin.name}</h3>
                      {skin.rarity === 'legendary' && (
                        <motion.div
                          animate={{ rotate: [0, 360] }}
                          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                        >
                          <Crown size={14} className="text-hot-pink" />
                        </motion.div>
                      )}
                    </div>
                    <Badge variant="outline" className={`${getRarityColor(skin.rarity)} text-xs`}>
                      {skin.rarity}
                    </Badge>
                  </div>

                  <div className="flex justify-center mb-3">
                    <DominoSkinPreview skin={skin} size="large" animated={true} />
                  </div>

                  <p className="text-sm text-purple-magenta mb-3 text-center">{skin.description}</p>

                  <div className="flex items-center justify-between">
                    <div className="text-center">
                      <div className="flex items-center gap-1 justify-center mb-1">
                        {skin.currency === 'coins' ? (
                          <Coins size={14} className="text-coral-pink" />
                        ) : (
                          <Gem size={14} className="text-purple-magenta" />
                        )}
                        <span className="font-bold text-deep-purple">
                          {skin.price === 0 ? 'FREE' : skin.price.toLocaleString()}
                        </span>
                      </div>
                    </div>

                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      {isOwned(skin.id) ? (
                        <Button 
                          variant="outline" 
                          className="bg-mint-green/20 text-mint-green border-mint-green/50 cursor-default"
                          disabled
                        >
                          <Check size={16} className="mr-1" />
                          Owned
                        </Button>
                      ) : skin.unlocked ? (
                        <Button 
                          onClick={() => handlePurchase(skin.id)}
                          disabled={!canAfford({ ...skin, currency: skin.currency as 'coins' | 'gems' })}
                          className={`${
                            skin.rarity === 'legendary' 
                              ? 'bg-gradient-to-r from-hot-pink to-coral-pink neon-glow-strong'
                              : 'bg-gradient-to-r from-coral-pink to-hot-pink neon-glow-coral'
                          } text-neon-white btn-3d`}
                        >
                          <Unlock size={16} className="mr-1" />
                          Buy
                        </Button>
                      ) : (
                        <Button 
                          variant="outline" 
                          className="text-purple-magenta border-purple-magenta/50 cursor-default"
                          disabled
                        >
                          <Lock size={16} className="mr-1" />
                          Locked
                        </Button>
                      )}
                    </motion.div>
                  </div>

                  {skin.rarity === 'legendary' && (
                    <motion.div 
                      className="mt-3 pt-3 border-t border-hot-pink/20"
                      animate={{ 
                        boxShadow: [
                          '0 0 10px rgba(238, 34, 125, 0.2)',
                          '0 0 20px rgba(238, 34, 125, 0.4)',
                          '0 0 10px rgba(238, 34, 125, 0.2)'
                        ]
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <div className="flex items-center justify-center gap-1 text-xs">
                        <Sparkles size={12} className="text-hot-pink" />
                        <span className="text-hot-pink font-semibold">Legendary Effects</span>
                        <Sparkles size={12} className="text-hot-pink" />
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </motion.div>
          </TabsContent>

          {/* Cosmetics Tab */}
          <TabsContent value="cosmetics" className="mt-4 space-y-4">
            <motion.div
              className="grid grid-cols-2 gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              {getFilteredItems('cosmetics').map((item, index) => (
                <motion.div
                  key={item.id}
                  className="glass-neon p-4 rounded-xl depth-3 card-3d-strong neon-shadow"
                  initial={{ scale: 0.8, opacity: 0, rotateY: -20 }}
                  animate={{ scale: 1, opacity: 1, rotateY: 0 }}
                  transition={{ delay: 0.5 + index * 0.1, duration: 0.6 }}
                  whileHover={{ scale: 1.02, rotateY: 5 }}
                >
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-semibold text-deep-purple text-sm">{item.name}</h3>
                    <Badge variant="outline" className={`${getRarityColor(item.rarity)} text-xs`}>
                      {item.rarity}
                    </Badge>
                  </div>

                  <div className="flex justify-center mb-3">
                    <div className={`w-16 h-16 rounded-xl flex items-center justify-center ${getRarityGlow(item.rarity)} glass-strong depth-2`}>
                      {getPreviewContent(item)}
                    </div>
                  </div>

                  <p className="text-xs text-purple-magenta mb-3 text-center">{item.description}</p>

                  {item.effects && (
                    <div className="flex flex-wrap gap-1 mb-3">
                      {item.effects.slice(0, 2).map((effect, i) => (
                        <Badge key={i} variant="outline" className="text-xs text-mint-green border-mint-green/50">
                          {effect}
                        </Badge>
                      ))}
                      {item.effects.length > 2 && (
                        <Badge variant="outline" className="text-xs text-purple-magenta border-purple-magenta/50">
                          +{item.effects.length - 2}
                        </Badge>
                      )}
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      {item.currency === 'coins' ? (
                        <Coins size={12} className="text-coral-pink" />
                      ) : (
                        <Gem size={12} className="text-purple-magenta" />
                      )}
                      <span className="font-bold text-deep-purple text-sm">
                        {item.price.toLocaleString()}
                      </span>
                    </div>

                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      {isOwned(item.id) ? (
                        <Button 
                          size="sm"
                          variant="outline" 
                          className="bg-mint-green/20 text-mint-green border-mint-green/50 cursor-default text-xs"
                          disabled
                        >
                          <Check size={12} className="mr-1" />
                          Owned
                        </Button>
                      ) : (
                        <Button 
                          size="sm"
                          onClick={() => handlePurchase(item.id)}
                          disabled={!canAfford(item)}
                          className="bg-gradient-to-r from-coral-pink to-hot-pink hover:from-hot-pink hover:to-coral-pink text-neon-white btn-3d neon-glow-coral text-xs"
                        >
                          <Unlock size={12} className="mr-1" />
                          Buy
                        </Button>
                      )}
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </TabsContent>

          {/* Power-ups Tab */}
          <TabsContent value="powerups" className="mt-4 space-y-4">
            <motion.div
              className="grid grid-cols-2 gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              {getFilteredItems('powerups').map((item, index) => (
                <motion.div
                  key={item.id}
                  className="glass-neon p-4 rounded-xl depth-3 card-3d neon-shadow"
                  initial={{ y: 50, opacity: 0, rotateX: -15 }}
                  animate={{ y: 0, opacity: 1, rotateX: 0 }}
                  transition={{ delay: 0.5 + index * 0.1, duration: 0.6 }}
                  whileHover={{ scale: 1.02, rotateX: 5 }}
                >
                  <div className="text-center mb-4">
                    <motion.div 
                      className={`w-12 h-12 rounded-xl mx-auto mb-3 flex items-center justify-center depth-2 ${getRarityGlow(item.rarity)}`}
                      style={{
                        background: `linear-gradient(135deg, ${
                          item.rarity === 'common' ? 'var(--mint-green), var(--teal-blue)' :
                          item.rarity === 'rare' ? 'var(--coral-pink), var(--hot-pink)' :
                          item.rarity === 'epic' ? 'var(--purple-magenta), var(--deep-purple)' :
                          'var(--hot-pink), var(--coral-pink)'
                        })`
                      }}
                      whileHover={{ rotateY: 20, scale: 1.1 }}
                    >
                      {item.icon}
                    </motion.div>
                    <h3 className="font-semibold text-deep-purple mb-1">{item.name}</h3>
                    <p className="text-sm text-purple-magenta">{item.description}</p>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <Coins size={14} className="text-coral-pink" />
                      <span className="font-bold text-deep-purple">{item.price}</span>
                    </div>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button 
                        size="sm"
                        disabled={!canAfford(item)}
                        className="bg-gradient-to-r from-teal-blue to-mint-green hover:from-mint-green hover:to-teal-blue text-deep-purple btn-3d neon-glow-mint"
                      >
                        Buy
                      </Button>
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </TabsContent>

          {/* Premium Tab */}
          <TabsContent value="premium" className="mt-4 space-y-4">
            <motion.div
              className="grid gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              {getFilteredItems('premium').map((item, index) => (
                <motion.div
                  key={item.id}
                  className="glass-neon p-5 rounded-xl depth-4 card-3d-strong neon-shadow ring-2 ring-hot-pink neon-glow-strong"
                  initial={{ scale: 0.9, opacity: 0, rotateX: -20 }}
                  animate={{ scale: 1, opacity: 1, rotateX: 0 }}
                  transition={{ delay: 0.5 + index * 0.2, duration: 0.8 }}
                  whileHover={{ scale: 1.02, rotateY: 5 }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <motion.div 
                        className="w-16 h-16 rounded-2xl flex items-center justify-center depth-3 neon-glow-strong"
                        style={{
                          background: 'linear-gradient(135deg, var(--hot-pink), var(--coral-pink))'
                        }}
                        whileHover={{ rotateY: 20, scale: 1.1 }}
                        animate={{
                          boxShadow: [
                            '0 0 30px rgba(238, 34, 125, 0.6)',
                            '0 0 50px rgba(238, 34, 125, 0.8)',
                            '0 0 30px rgba(238, 34, 125, 0.6)'
                          ]
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        {item.icon}
                      </motion.div>
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold text-deep-purple">{item.name}</h3>
                          {item.discount && (
                            <Badge className="bg-hot-pink text-neon-white neon-glow">
                              -{item.discount}% OFF
                            </Badge>
                          )}
                          <motion.div
                            animate={{ rotate: [0, 360] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                          >
                            <Crown size={16} className="text-hot-pink" />
                          </motion.div>
                        </div>
                        <p className="text-sm text-purple-magenta mb-2">{item.description}</p>
                        {item.effects && (
                          <div className="flex flex-wrap gap-1">
                            {item.effects.map((effect, i) => (
                              <Badge key={i} variant="outline" className="text-xs text-mint-green border-mint-green/50">
                                {effect}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-bold text-2xl text-hot-pink">{formatPrice(item)}</div>
                      {item.originalPrice && (
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-purple-magenta/60 line-through">
                            ${(item.originalPrice / 100).toFixed(2)}
                          </span>
                          <span className="text-sm font-bold text-mint-green">
                            Save ${((item.originalPrice - item.price) / 100).toFixed(2)}
                          </span>
                        </div>
                      )}
                    </div>
                    
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button 
                        className="bg-gradient-to-r from-hot-pink to-coral-pink hover:from-coral-pink hover:to-hot-pink neon-glow-strong text-neon-white btn-3d text-lg px-6 py-3"
                      >
                        Get Premium
                      </Button>
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </TabsContent>

          {/* Bundles Tab */}
          <TabsContent value="bundles" className="mt-4 space-y-4">
            <motion.div
              className="grid gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              {getFilteredItems('bundles').map((item, index) => (
                <motion.div
                  key={item.id}
                  className="glass-neon p-5 rounded-xl depth-4 card-3d-strong neon-shadow"
                  initial={{ scale: 0.9, opacity: 0, rotateX: -20 }}
                  animate={{ scale: 1, opacity: 1, rotateX: 0 }}
                  transition={{ delay: 0.5 + index * 0.2, duration: 0.8 }}
                  whileHover={{ scale: 1.02, rotateY: 5 }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <motion.div 
                        className="w-16 h-16 rounded-2xl flex items-center justify-center depth-3 neon-glow"
                        style={{
                          background: 'linear-gradient(135deg, var(--mint-green), var(--teal-blue))'
                        }}
                        whileHover={{ rotateY: 20, scale: 1.1 }}
                      >
                        {item.icon}
                      </motion.div>
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold text-deep-purple">{item.name}</h3>
                          {item.discount && (
                            <Badge className="bg-hot-pink text-neon-white neon-glow">
                              -{item.discount}% OFF
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-purple-magenta mb-2">{item.description}</p>
                        {item.effects && (
                          <div className="flex flex-wrap gap-1">
                            {item.effects.map((effect, i) => (
                              <Badge key={i} variant="outline" className="text-xs text-mint-green border-mint-green/50">
                                {effect}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-bold text-2xl text-hot-pink">{formatPrice(item)}</div>
                      {item.originalPrice && (
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-purple-magenta/60 line-through">
                            ${(item.originalPrice / 100).toFixed(2)}
                          </span>
                          <span className="text-sm font-bold text-mint-green">
                            Save ${((item.originalPrice - item.price) / 100).toFixed(2)}
                          </span>
                        </div>
                      )}
                    </div>
                    
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button 
                        className="bg-gradient-to-r from-mint-green to-teal-blue hover:from-teal-blue hover:to-mint-green text-deep-purple neon-glow-mint btn-3d text-lg px-6 py-3"
                      >
                        Buy Bundle
                      </Button>
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </TabsContent>

          {/* Currency Tab */}
          <TabsContent value="currency" className="mt-4 space-y-4">
            <motion.div
              className="grid gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              {getFilteredItems('currency').map((item, index) => (
                <motion.div
                  key={item.id}
                  className="glass-neon p-5 rounded-xl depth-3 card-3d-strong neon-shadow"
                  initial={{ x: -50, opacity: 0, rotateY: -15 }}
                  animate={{ x: 0, opacity: 1, rotateY: 0 }}
                  transition={{ delay: 0.5 + index * 0.1, duration: 0.6 }}
                  whileHover={{ scale: 1.02, rotateY: 3 }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <motion.div 
                        className={`w-16 h-16 rounded-2xl flex items-center justify-center depth-2 ${getRarityGlow(item.rarity)}`}
                        style={{
                          background: `linear-gradient(135deg, ${
                            item.rarity === 'common' ? 'var(--teal-blue), var(--mint-green)' :
                            item.rarity === 'rare' ? 'var(--coral-pink), var(--hot-pink)' :
                            'var(--purple-magenta), var(--deep-purple)'
                          })`
                        }}
                        whileHover={{ rotateY: 20, scale: 1.1 }}
                      >
                        {item.icon}
                      </motion.div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-deep-purple">{item.name}</h3>
                          {item.discount && (
                            <Badge className="bg-hot-pink text-neon-white neon-glow">
                              -{item.discount}%
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-purple-magenta">{item.description}</p>
                        {item.originalPrice && (
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-xs text-purple-magenta/60 line-through">
                              ${(item.originalPrice / 100).toFixed(2)}
                            </span>
                            <span className="text-sm font-bold text-mint-green">Save ${((item.originalPrice - item.price) / 100).toFixed(2)}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="font-bold text-xl text-hot-pink mb-2">{formatPrice(item)}</div>
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button className="bg-gradient-to-r from-mint-green to-teal-blue hover:from-teal-blue hover:to-mint-green text-deep-purple btn-3d neon-glow-mint">
                          Purchase
                        </Button>
                      </motion.div>
                    </div>
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

export default ShopScreen;