import React, { createContext, useContext } from 'react';
import Course from './Course';
import { courses } from '../data/courses';
import Holes from './Holes';
import Player from './Player';
import SaveGameModal from './SaveGameModal';
import ScoreCard from './ScoreCard';
import { useGameState, GameState, Action } from '../state/useGameState'; // Use the custom hook

// Create a Context for the Game State
const GameContext = createContext<{ state: GameState; dispatch: React.Dispatch<Action> } | undefined>(
  undefined
);

export const useGameContext = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGameContext must be used within a GameProvider');
  }
  return context;
};

function Game() {
  const {
    selectedCourse,
    newPlayerName,
    players,
    scores,
    totalHoles,
    coursePar,
    isModalOpen,
    currentGameId,
    setSelectedCourse,
    setNewPlayerName,
    handleAddPlayer,
    handleScoreChange,
    removePlayer,
    setTotalHoles,
    setIsModalOpen,
    startNewGame,
  } = useGameState(courses); // Use all returned state and functions

  return (
    <div>
      <Course courses={courses} selectedCourse={selectedCourse} setSelectedCourse={setSelectedCourse} />

      <Player
        newPlayerName={newPlayerName}
        setNewPlayerName={setNewPlayerName}
        handleAddPlayer={handleAddPlayer}
      />

      <Holes totalHoles={totalHoles} setTotalHoles={setTotalHoles} />

      <ScoreCard
        gameId={currentGameId ?? -1}
        coursePar={coursePar}
        editMode={true}
        players={players}
        scores={scores}
        selectedCourse={selectedCourse}
        totalHoles={totalHoles}
        handleScoreChange={handleScoreChange}
        removePlayer={removePlayer}
      />

      <button
        className='w-full my-4 px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700'
        onClick={() => setIsModalOpen(true)}
      >
        Finish Game
      </button>

      <SaveGameModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onStartNewGame={startNewGame}
      />
    </div>
  );
}

export default Game;
