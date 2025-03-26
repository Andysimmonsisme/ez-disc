import { useState, useEffect } from 'react';
import Player from './components/Player';
import SaveGameModal from './components/SaveGameModal';

interface Scores {
  player: string;
  scores: number[];
}

interface Game {
  id: number;
  scores: Scores[];
}

function App() {
  const courses = [
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

  const [coursePar, setCoursePar] = useState<number>(0);
  const [currentGameId, setCurrentGameId] = useState<number | null>(null);
  const [darkMode, setDarkMode] = useState(localStorage.getItem('theme') === 'dark');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newPlayerName, setNewPlayerName] = useState('');
  const [players, setPlayers] = useState<string[]>([]);
  const [scores, setScores] = useState<number[][]>([]);
  const [selectedCourse, setSelectedCourse] = useState(courses[0]);
  const [totalHoles, setTotalHoles] = useState(selectedCourse.defaultHoles);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  useEffect(() => {
    setTotalHoles(selectedCourse.defaultHoles);
    setCoursePar(
      selectedCourse.par.reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        0
      )
    );
  }, [selectedCourse]);

  useEffect(() => {
    setCoursePar(
      selectedCourse.par.slice(0, totalHoles).reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        0
      )
    );
  }, [totalHoles]);

  const handleAddPlayer = () => {
    if (newPlayerName.trim()) {
      setPlayers([...players, newPlayerName.trim()]);
      setScores([...scores, Array(totalHoles).fill(0)]);
      setNewPlayerName('');
    }
  };

  const handleScoreChange = (
    playerIndex: number,
    holeIndex: number,
    change: number
  ) => {
    setScores((prevScores) =>
      prevScores.map((playerScores, i) =>
        i === playerIndex
          ? playerScores.map((score, j) => {
              if (j === holeIndex) {
                const newScore = score + change;

                // first setting score with minus sign
                if (newScore < 0) {
                  return selectedCourse.par[holeIndex] - 1;
                }
                // first setting score with plus sign
                else if (score === 0 && newScore === 1) {
                  return selectedCourse.par[holeIndex];
                }

                return score + change;
              }
              return score;
            })
          : playerScores
      )
    );
  };

  const removePlayer = (index: number) => {
    setPlayers(players.filter((_, i) => i !== index));
    setScores(scores.filter((_, i) => i !== index));
  };

  const saveGame = () => {
    if (!players.length) return;
    let games: Game[] = JSON.parse(localStorage.getItem('games') || '[]');
    const lastGameId = games.length ? games[games.length - 1].id : 0;
    const playerScores: Scores[] = [];

    players.forEach((player: string, i: number) => {
      playerScores.push({
        player: player,
        scores: scores[i],
      });
    });

    setCurrentGameId((prevGameId) => prevGameId ?? lastGameId + 1);

    // game has already been saved
    if (currentGameId) {
      games = games.map((game) => {
        if (game.id === currentGameId) return { ...game, scores: playerScores };

        return game;
      });
    } 
    // game hasn't been saved
    else {
      games.push({ id: lastGameId + 1, scores: playerScores });
    }
    localStorage.setItem('games', JSON.stringify(games));
    setIsModalOpen(true);
  };

  const startNewGame = () => {
    setCurrentGameId(null);
    setPlayers([]);
    setScores([]);
  };

  return (
    <div className='min-h-screen p-4 bg-blue-100 dark:bg-gray-900 transition-colors'>
      <div className='p-6 max-w-4xl mx-auto bg-white dark:bg-gray-800 dark:text-white rounded-2xl shadow-lg'>
        <header className='flex justify-between items-center mb-4'>
          <h1 className='text-4xl font-extrabold text-blue-900 dark:text-white'>
            EZ Disc
          </h1>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className='px-4 py-2 rounded bg-gray-700 dark:bg-gray-200 text-white dark:text-black hover:bg-gray-600 dark:hover:bg-gray-300'
          >
            Toggle {darkMode ? 'Light' : 'Dark'} Mode
          </button>
        </header>

        <main>
          <section className='mb-4'>
            <label htmlFor='courseSelect' className='block text-lg mb-2'>
              Select Course
            </label>
            <select
              id='courseSelect'
              value={selectedCourse.name}
              onChange={(e) =>
                setSelectedCourse(
                  courses.find((course) => course.name === e.target.value) ||
                    courses[0]
                )
              }
              className='w-full p-2 rounded border border-gray-300 dark:bg-gray-700 dark:text-white'
            >
              {courses.map((course) => (
                <option key={course.name} value={course.name}>
                  {course.name}
                </option>
              ))}
            </select>
          </section>

          <section className='flex flex-wrap items-center space-x-4 mb-4'>
            <label htmlFor='player-name' className='w-full text-lg mb-2'>
              Player Name
            </label>
            <input
              id='player-name'
              type='text'
              value={newPlayerName}
              onChange={(e) => setNewPlayerName(e.target.value)}
              className='border border-gray-300 rounded px-4 py-2 flex-1 bg-white dark:bg-gray-700 dark:text-white'
            />
            <button
              onClick={handleAddPlayer}
              className='bg-blue-600 text-white my-2 px-4 py-2 rounded hover:bg-blue-700'
            >
              Add Player
            </button>
          </section>

          <section className='mb-4 flex items-center space-x-4'>
            <button
              onClick={() => setTotalHoles(9)}
              className={`px-4 py-2 rounded ${
                totalHoles === 9
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 hover text-black dark:bg-gray-700 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              9 Holes
            </button>
            <button
              onClick={() => setTotalHoles(18)}
              className={`px-4 py-2 rounded ${
                totalHoles === 18
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-black dark:bg-gray-700 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              18 Holes
            </button>
          </section>

          <section className='overflow-x-auto'>
            <table className='table-auto w-full border-collapse border border-gray-300 dark:border-gray-600'>
              <thead>
                <tr>
                  <th className='border border-gray-300 px-4 py-2 dark:border-gray-600'>
                    Player
                  </th>
                  {Array.from({ length: totalHoles }, (_, i) => (
                    <th
                      key={i}
                      className='border border-gray-300 px-2 dark:border-gray-600'
                    >
                      Hole {i + 1} (Par{' '}
                      {selectedCourse && selectedCourse.par[i]})
                    </th>
                  ))}
                  <th className='border border-gray-300 px-4 py-2 dark:border-gray-600'>
                    Total (Par {coursePar})
                  </th>
                </tr>
              </thead>
              <tbody>
                {players.map((playerName, playerIndex) => (
                  <Player
                    key={playerIndex}
                    playerName={playerName}
                    playerScores={scores[playerIndex]}
                    coursePar={coursePar}
                    totalScore={scores[playerIndex].reduce(
                      (sum, score) => sum + score,
                      0
                    )}
                    onScoreChange={(holeIndex, change) =>
                      handleScoreChange(playerIndex, holeIndex, change)
                    }
                    onRemove={() => removePlayer(playerIndex)}
                  />
                ))}
              </tbody>
            </table>
          </section>
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

export default App;
