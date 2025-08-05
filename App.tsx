import React, { useState } from 'react';
import HomeScreen from './components/HomeScreen';
import GameBoard from './components/GameBoard';
import GameBoard4Player from './components/GameBoard4Player';
import GameResultScreen from './components/GameResultScreen';
import CafeScreen from './components/CafeScreen';
import TournamentsScreen from './components/TournamentsScreen';
import ShopScreen from './components/ShopScreen';
import ProfileScreen from './components/ProfileScreen';
import BottomNavigation from './components/BottomNavigation';
import { Screen } from './types/AppTypes';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');
  const [gameData, setGameData] = useState({
    playerScore: 0,
    opponentScore: 0,
    gameTime: 0,
    coinsEarned: 0,
    xpEarned: 0,
    won: false,
    gameMode: '1v1' as '1v1' | '4player'
  });

  const handleStartGame = (mode: '1v1' | '4player' = '1v1') => {
    setGameData(prev => ({ ...prev, gameMode: mode }));
    setCurrentScreen(mode === '4player' ? 'game4player' : 'game');
  };

  const handleGameEnd = (won: boolean) => {
    // Mock game end data
    const mockData = {
      playerScore: won ? 150 : 85,
      opponentScore: won ? 85 : 150,
      gameTime: Math.floor(Math.random() * 300) + 120,
      coinsEarned: won ? Math.floor(Math.random() * 100) + 50 : Math.floor(Math.random() * 30) + 10,
      xpEarned: won ? Math.floor(Math.random() * 50) + 25 : Math.floor(Math.random() * 20) + 5,
      won,
      gameMode: gameData.gameMode
    };
    
    setGameData(mockData);
    setCurrentScreen('result');
  };

  const handleBackToHome = () => {
    setCurrentScreen('home');
  };

  const handlePlayAgain = () => {
    setCurrentScreen(gameData.gameMode === '4player' ? 'game4player' : 'game');
  };

  const handleNavigate = (screen: Screen) => {
    setCurrentScreen(screen);
  };

  const renderCurrentScreen = () => {
    switch (currentScreen) {
      case 'game':
        return (
          <GameBoard
            onBackToHome={handleBackToHome}
            onGameEnd={(won) => handleGameEnd(won)}
          />
        );
      
      case 'game4player':
        return (
          <GameBoard4Player
            onBackToHome={handleBackToHome}
            onGameEnd={(winner) => handleGameEnd(winner.id === 'player1')}
          />
        );
      
      case 'result':
        return (
          <GameResultScreen
            won={gameData.won}
            onPlayAgain={handlePlayAgain}
            onBackToHome={handleBackToHome}
            finalScore={gameData.playerScore}
            opponentScore={gameData.opponentScore}
            coinsEarned={gameData.coinsEarned}
            xpEarned={gameData.xpEarned}
            gameTime={gameData.gameTime}
          />
        );
      
      case 'cafe':
        return <CafeScreen />;
      
      case 'tournaments':
        return <TournamentsScreen />;
      
      case 'shop':
        return <ShopScreen />;
      
      case 'profile':
        return <ProfileScreen />;
      
      default:
        return (
          <HomeScreen
            onStartGame={handleStartGame}
            onJoinCafe={() => handleNavigate('cafe')}
            onShowProfile={() => handleNavigate('profile')}
          />
        );
    }
  };

  const showBottomNavigation = !['game', 'game4player', 'result'].includes(currentScreen);

  return (
    <div className="min-h-screen bg-background">
      <div className="min-h-screen">
        {renderCurrentScreen()}
      </div>

      {showBottomNavigation && (
        <div className="fixed bottom-0 left-0 right-0 z-50">
          <BottomNavigation
            activeTab={currentScreen}
            onTabChange={handleNavigate}
          />
        </div>
      )}
    </div>
  );
}