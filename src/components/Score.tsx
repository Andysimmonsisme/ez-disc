import { useGame } from '../state/GameContext';

interface ScoreProps {
  gameId: number;
  editMode: boolean;
  playerName: string;
  playerIndex: number;
}

function Score({ gameId, editMode, playerName, playerIndex }: ScoreProps) {
  const { state, dispatch } = useGame();
  const game = state.games.find((game) => game.id === gameId);
  const currentScore =
    game?.scores[playerIndex].scores.reduce((sum, score, index) => {
      if (score === 0) return sum; // Skip if score is 0
      return sum + score - game.course.par[index];
    }, 0) ?? 0;
  const scores: number[] = game?.scores[playerIndex].scores || [];
  const totalScore =
    scores.slice(0, game?.totalHoles ?? 18).reduce((sum, score) => {
      return sum + score;
    }, 0) ?? 0;

  const changeScore = (
    playerIndex: number,
    holeIndex: number,
    change: number
  ) => {
    dispatch({
      type: 'UPDATE_SCORE',
      payload: {
        gameId: gameId,
        playerIndex: playerIndex,
        holeIndex: holeIndex,
        change: change,
      },
    });
  };

  return (
    <tr>
      <td className='sticky left-0 z-1 bg-white dark:bg-gray-800 border-y border-gray-300 dark:border-gray-600 px-4 py-2 font-bold'>
        {playerName} ({currentScore > 0 ? '+' : ''}
        {currentScore})
        <span className='absolute left-0 top-0 h-full w-px bg-gray-300 dark:bg-gray-600'></span>
        <span className='absolute right-0 top-0 h-full w-px bg-gray-300 dark:bg-gray-600'></span>
      </td>
      {scores.map((score, holeIndex) => (
        <td
          key={holeIndex}
          className={`border border-gray-300 dark:border-gray-600 px-2 py-2 ${
            holeIndex === 0 ? 'border-l-0' : ''
          }`}
        >
          <div className='flex items-center justify-center space-x-2'>
            {editMode && (
              <button
                onClick={() => changeScore(playerIndex, holeIndex, -1)}
                className='bg-gray-400 text-white px-2 py-1 rounded hover:bg-gray-500'
                aria-label='Subtract one'
              >
                -
              </button>
            )}
            <span>{score}</span>
            {editMode && (
              <button
                onClick={() => changeScore(playerIndex, holeIndex, 1)}
                className='bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600'
                aria-label='Add one'
              >
                +
              </button>
            )}
          </div>
        </td>
      ))}
      <td className='border border-gray-300 dark:border-gray-600 px-4 py-2 text-center font-bold'>
        {totalScore}
      </td>
      {editMode && (
        <td className='border border-gray-300 dark:border-gray-600 px-4 py-2 text-center'>
          <button
            onClick={() =>
              dispatch({
                type: 'REMOVE_PLAYER',
                payload: { gameId: gameId, playerIndex: playerIndex },
              })
            }
            className='bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600'
          >
            Remove
          </button>
        </td>
      )}
    </tr>
  );
}

export default Score;
