import { useEffect } from 'react';
import Course from './Course';
import { courses } from '../data/courses';
import Holes from './Holes';
import Player from './Player';
import SaveGameModal from './SaveGameModal';
import ScoreCard from './ScoreCard';
import {
  useGameState,
  GameInterface,
} from '../state/useGameState';

interface GameProps {
  editMode: boolean;
  includeFooter: boolean;
  game?: GameInterface;
}

function Game({ editMode, includeFooter, game }: GameProps) {
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
    loadGame,
    removePlayer,
    setTotalHoles,
    setIsModalOpen,
    startNewGame,
  } = useGameState(courses); // Use all returned state and functions

  // if game is passed load it
  useEffect(() => {
    if (game) {
      loadGame(game);
    }
  }, []);

  return (
    <div>
      {editMode && (
        <Course
          courses={courses}
          selectedCourse={selectedCourse}
          setSelectedCourse={setSelectedCourse}
        />
      )}

      {editMode && (
        <Player
          newPlayerName={newPlayerName}
          setNewPlayerName={setNewPlayerName}
          handleAddPlayer={handleAddPlayer}
        />
      )}

      {editMode && (
        <Holes totalHoles={totalHoles} setTotalHoles={setTotalHoles} />
      )}

      <ScoreCard
        gameId={currentGameId ?? -1}
        coursePar={coursePar}
        editMode={editMode}
        players={players}
        scores={scores}
        selectedCourse={selectedCourse}
        totalHoles={totalHoles}
        handleScoreChange={handleScoreChange}
        removePlayer={removePlayer}
      />

      {includeFooter && (
        <button
          className='w-full my-4 px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700'
          onClick={() => setIsModalOpen(true)}
        >
          Finish Game
        </button>
      )}

      {includeFooter && (
        <SaveGameModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onStartNewGame={startNewGame}
        />
      )}
    </div>
  );
}

export default Game;
