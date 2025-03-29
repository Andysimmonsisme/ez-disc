import { useEffect, useState } from 'react';
import { CourseInterface } from './Course';

interface ScoreProps {
  editMode: boolean;
  playerName: string;
  playerIndex: number;
  scores: number[][];
  totalScore: number;
  coursePar: number;
  selectedCourse: CourseInterface;
  onScoreChange: (holeIndex: number, change: number) => void;
  onRemove: () => void;
}

function Score({
  editMode,
  playerName,
  playerIndex,
  scores,
  totalScore,
  coursePar,
  selectedCourse,
  onScoreChange,
  onRemove,
}: ScoreProps) {
  const calculateCurrentScore = () =>
    scores[playerIndex].reduce((sum, score, index) => {
      if (score === 0) return sum; // Skip if score is 0
      return sum + score - selectedCourse.par[index];
    }, 0);
  const [currentScore, setCurrentScore] = useState(0);

  useEffect(() => {
    setCurrentScore(calculateCurrentScore());
  }, [scores]);

  const changeScore = (holeIndex: number, change: number) => {
    onScoreChange(holeIndex, change);
  };

  return (
    <tr>
      <td className='sticky left-0 z-1 bg-white dark:bg-gray-800 border-y border-gray-300 dark:border-gray-600 px-4 py-2 font-bold'>
        {playerName} ({currentScore > 0 ? '+' : ''}
        {currentScore})
        <span className='absolute left-0 top-0 h-full w-px bg-gray-300 dark:bg-gray-600'></span>
        <span className='absolute right-0 top-0 h-full w-px bg-gray-300 dark:bg-gray-600'></span>
      </td>
      {scores[playerIndex].map((score, holeIndex) => (
        <td
          key={holeIndex}
          className={`border border-gray-300 dark:border-gray-600 px-2 py-2 ${holeIndex === 0 ? 'border-l-0' : ''}`}
        >
          <div className='flex items-center justify-center space-x-2'>
            {editMode && (
              <button
                onClick={() => changeScore(holeIndex, -1)}
                className='bg-gray-400 text-white px-2 py-1 rounded hover:bg-gray-500'
                aria-label='Subtract one'
              >
                -
              </button>
            )}
            <span>{score}</span>
            {editMode && (
              <button
                onClick={() => changeScore(holeIndex, 1)}
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
            onClick={onRemove}
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
