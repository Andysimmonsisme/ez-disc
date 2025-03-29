import { CourseInterface } from './Course';
import Score from './Score';

interface ScoreCardProps {
  gameId: number;
  coursePar: number;
  editMode: boolean;
  players: string[];
  scores: number[][];
  selectedCourse: CourseInterface;
  totalHoles: number;
  handleScoreChange: (
    playerIndex: number,
    holeIndex: number,
    change: number,
    gameId: number
  ) => void;
  removePlayer: (playerIndex: number, gameId: number) => void;
}

function ScoreCard({
  gameId,
  coursePar,
  editMode,
  players,
  scores,
  selectedCourse,
  totalHoles,
  handleScoreChange,
  removePlayer,
}: ScoreCardProps) {
  return (
    <section className='overflow-x-auto border-l-0 border-gray-300 dark:border-gray-600'>
      <table className='table-auto w-full border-collapse border border-l-0 border-gray-300 dark:border-gray-600'>
        <thead>
          <tr>
            <th className='sticky left-0 z-1 bg-white dark:bg-gray-800 border-y border-l-0 border-gray-300 dark:border-gray-600 px-4 py-2'>
              Player
              <span className='absolute left-0 top-0 h-full w-px bg-gray-300 dark:bg-gray-600'></span>
              <span className='absolute right-0 top-0 h-full w-px bg-gray-300 dark:bg-gray-600'></span>
            </th>
            {Array.from({ length: totalHoles }, (_, i) => (
              <th
                key={i}
                className={`border border-gray-300 px-2 dark:border-gray-600 ${i === 0 ? 'border-l-0' : ''}`}
              >
                Hole {i + 1} (Par {selectedCourse && selectedCourse.par[i]})
              </th>
            ))}
            <th className='border border-gray-300 px-4 py-2 dark:border-gray-600'>
              Total (Par {coursePar})
            </th>
          </tr>
        </thead>
        <tbody>
          {players.map((playerName, playerIndex) => (
            <Score
              key={playerIndex}
              editMode={editMode}
              playerName={playerName}
              scores={scores}
              playerIndex={playerIndex}
              coursePar={coursePar}
              selectedCourse={selectedCourse}
              totalScore={scores[playerIndex].reduce(
                (sum, score) => sum + score,
                0
              )}
              onScoreChange={(holeIndex, change) =>
                handleScoreChange(playerIndex, holeIndex, change, gameId)
              }
              onRemove={() => removePlayer(playerIndex, gameId)}
            />
          ))}
        </tbody>
      </table>
    </section>
  );
}

export default ScoreCard;
