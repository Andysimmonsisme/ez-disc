import { useState } from 'react';
import { useGame } from '../state/GameContext';

interface PlayerProps {
  gameId: number;
}

function Player({ gameId }: PlayerProps) {
  const { dispatch } = useGame();
  const [playerName, setPlayerName] = useState('');

  return (
    <section className='flex flex-wrap items-center space-x-4 mb-4'>
      <label htmlFor='player-name' className='w-full text-lg mb-2'>
        Player Name
      </label>
      <input
        id='player-name'
        type='text'
        value={playerName}
        onChange={(e) => setPlayerName(e.target.value)}
        className='border border-gray-300 rounded px-4 py-2 flex-1 bg-white dark:bg-gray-700 dark:text-white'
      />
      <button
        onClick={() => {
          dispatch({
            type: 'ADD_PLAYER',
            payload: { gameId: gameId, player: playerName },
          });
          setPlayerName('');
        }}
        className='bg-blue-600 text-white my-2 px-4 py-2 rounded hover:bg-blue-700'
      >
        Add Player
      </button>
    </section>
  );
}

export default Player;
