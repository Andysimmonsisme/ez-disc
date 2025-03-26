import { CourseInterface } from './Course';
import Score from './Score';

interface ScoreCardProps {
  coursePar: number;
  players: string[];
  scores: number[][];
  selectedCourse: CourseInterface;
  totalHoles: number;
  handleScoreChange: (
    playerIndex: number,
    holeIndex: number,
    change: number
  ) => void;
  removePlayer: (playerIndex: number) => void;
}

function ScoreCard({
  coursePar,
  players,
  scores,
  selectedCourse,
  totalHoles,
  handleScoreChange,
  removePlayer,
}: ScoreCardProps) {
  return (
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
  );
}

export default ScoreCard;
