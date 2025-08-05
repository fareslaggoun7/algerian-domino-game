import { GameState } from '../types/AppTypes';

export const calculateGameRewards = (gameMode: '1v1' | '4player', won: boolean) => {
  const baseCoins = gameMode === '4player' ? 500 : 350;
  const baseXP = gameMode === '4player' ? 100 : 75;
  
  return {
    coinsEarned: won ? baseCoins : Math.floor(baseCoins * 0.4),
    xpEarned: won ? baseXP : Math.floor(baseXP * 0.3),
  };
};

export const getMockGameEndState = (gameMode: '1v1' | '4player', won: boolean): Partial<GameState> => {
  const rewards = calculateGameRewards(gameMode, won);
  
  return {
    playerScore: won ? 127 : 85,
    opponentScore: won ? 85 : 127,
    gameTime: gameMode === '4player' ? 380 : 245,
    ...rewards,
    won,
  };
};