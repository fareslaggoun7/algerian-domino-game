export type Screen = 'home' | 'game' | 'game4player' | 'result' | 'cafe' | 'tournaments' | 'shop' | 'profile';

export interface GameState {
  playerScore: number;
  opponentScore: number;
  gameTime: number;
  coinsEarned: number;
  xpEarned: number;
  won: boolean;
  gameMode: '1v1' | '4player';
}

export interface Player {
  id: string;
  name: string;
  avatar: string;
  score: number;
  tilesCount: number;
  isActive: boolean;
  country: string;
  level: number;
  isBot?: boolean;
}