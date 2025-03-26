import Course, { CourseInterface } from './Course';
import Header from './Header';
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
    isModalOpen,
    newPlayerName,
    players,
    scores,
    selectedCourse,
    totalHoles,
    handleAddPlayer,
    handleScoreChange,
    removePlayer,
    saveGame,
    startNewGame,
    setNewPlayerName,
    setSelectedCourse,
    setTotalHoles,
    setIsModalOpen,
  } = useGameState(courses);

  return (
    <div className='min-h-screen p-4 bg-blue-100 dark:bg-gray-900 transition-colors'>
      <div className='p-6 max-w-4xl mx-auto bg-white dark:bg-gray-800 dark:text-white rounded-2xl shadow-lg'>
        <Header />

        <main>
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
            coursePar={coursePar}
            players={players}
            scores={scores}
            selectedCourse={selectedCourse}
            totalHoles={totalHoles}
            handleScoreChange={handleScoreChange}
            removePlayer={removePlayer}
          />

          <button
            className='w-full my-4 px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700'
            onClick={saveGame}
          >
            Save Game
          </button>
        </main>
      </div>
      <SaveGameModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onStartNewGame={startNewGame}
      />
    </div>
  );
}

export default Game;
