interface PlayerProps {
  playerName: string;
  playerScores: number[];
  totalScore: number;
  coursePar: number;
  onScoreChange: (holeIndex: number, change: number) => void;
  onRemove: () => void;
}

function Player({
  playerName,
  playerScores,
  totalScore,
  coursePar,
  onScoreChange,
  onRemove,
}: PlayerProps) {
  return (
    <tr>
      <td className='border border-gray-300 dark:border-gray-600 px-4 py-2 font-bold'>
        {playerName}
      </td>
      {playerScores.map((score, holeIndex) => (
        <td
          key={holeIndex}
          className='border border-gray-300 dark:border-gray-600 px-2 py-2'
        >
          <div className='flex items-center justify-center space-x-2'>
            <button
              onClick={() => onScoreChange(holeIndex, -1)}
              className='bg-gray-400 text-white px-2 py-1 rounded hover:bg-gray-500'
              aria-label='Subtract one'
            >
              -
            </button>
            <span>{score}</span>
            <button
              onClick={() => onScoreChange(holeIndex, 1)}
              className='bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600'
              aria-label='Add one'
            >
              +
            </button>
          </div>
        </td>
      ))}
      <td className='border border-gray-300 dark:border-gray-600 px-4 py-2 text-center font-bold'>
        {totalScore} ({totalScore > coursePar && '+'}
        {totalScore - coursePar})
      </td>
      <td className='border border-gray-300 dark:border-gray-600 px-4 py-2 text-center'>
        <button
          onClick={onRemove}
          className='bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600'
        >
          Remove
        </button>
      </td>
    </tr>
  );
}

export default Player;
