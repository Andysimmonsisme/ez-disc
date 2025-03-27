import Course, { CourseInterface } from './Course';
import Holes from './Holes';
import Player from './Player';
import SaveGameModal from './SaveGameModal';
import ScoreCard from './ScoreCard';
import { useGameState } from '../state/useGameState';

function Game() {
  const courses: CourseInterface[] = [
    {
      name: 'Boyd Hill',
      defaultHoles: 18,
      par: Array(18).fill(3),
    },
    {
      name: 'Fewell Park',
      defaultHoles: 9,
      par: Array(18).fill(3),
    },
    {
      name: 'Westminster Park',
      defaultHoles: 18,
      par: [3, 3, 3, 5, 4, 3, 3, 3, 3, 3, 3, 3, 3, 4, 3, 3, 3, 4],
    },
    {
      name: 'Winget Park',
      defaultHoles: 18,
      par: [3, 3, 3, 3, 3, 3, 3, 4, 4, 3, 3, 4, 3, 4, 3, 3, 3, 3],
    },
    {
      name: 'Winthrop Meadows',
      defaultHoles: 18,
      par: [3, 3, 3, 3, 3, 3, 3, 3, 4, 3, 3, 4, 4, 3, 3, 3, 5, 3],
    },
  ];
  const {
    coursePar,
    currentGameId,
    isModalOpen,
    newPlayerName,
    players,
    scores,
    selectedCourse,
    totalHoles,
    handleAddPlayer,
    handleScoreChange,
    removePlayer,
    startNewGame,
    setNewPlayerName,
    setSelectedCourse,
    setTotalHoles,
    setIsModalOpen,
  } = useGameState(courses);

  return (
    <>
      <Course
        courses={courses}
        selectedCourse={selectedCourse}
        setSelectedCourse={setSelectedCourse}
      />

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
    </>
  );
}

export default Game;
