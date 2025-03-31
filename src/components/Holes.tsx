import { useEffect, useState } from 'react';
import { useGame } from '../state/GameContext';

interface HolesProps {
  gameId: number;
}

function Holes({ gameId }: HolesProps) {
  const { state, dispatch } = useGame();
  const [totalHoles, setTotalHoles] = useState(18);

  useEffect(() => {
    const game = state.games.find((game) => game.id === gameId);
    if (game) {
      setTotalHoles(game.totalHoles); // Update totalHoles when the game changes
    }
  }, [gameId, state.games]);

  return (
    <section className='mb-4 flex items-center space-x-4'>
      <button
        onClick={() => {
          setTotalHoles(9);
          dispatch({
            type: 'SET_TOTAL_HOLES',
            payload: { gameId: gameId, totalHoles: 9 },
          });
        }}
        className={`px-4 py-2 rounded ${
          totalHoles === 9
            ? 'bg-blue-600 text-white'
            : 'bg-gray-200 hover text-black dark:bg-gray-700 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600'
        }`}
      >
        9 Holes
      </button>
      <button
        onClick={() => {
          setTotalHoles(18);
          dispatch({
            type: 'SET_TOTAL_HOLES',
            payload: { gameId: gameId, totalHoles: 18 },
          });
        }}
        className={`px-4 py-2 rounded ${
          totalHoles === 18
            ? 'bg-blue-600 text-white'
            : 'bg-gray-200 text-black dark:bg-gray-700 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600'
        }`}
      >
        18 Holes
      </button>
    </section>
  );
}

export default Holes;
