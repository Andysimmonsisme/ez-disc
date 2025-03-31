import { useGame } from '../state/GameContext';
import Score from './Score';

interface ScoreCardProps {
  gameId: number;
  editMode: boolean;
}

function ScoreCard({ gameId, editMode }: ScoreCardProps) {
  const { state } = useGame();
  const game = state.games.find((game) => game.id === gameId);
  const players = game?.scores.map((score) => score.player) || [];
  const totalPar =
    game?.course.par
      ?.slice(0, game.totalHoles)
      .reduce((acc, cur) => acc + cur, 0) ?? 18;

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
            {Array.from({ length: game?.totalHoles || 18 }, (_, i) => (
              <th
                key={i}
                className={`bg-white dark:bg-gray-800 border border-gray-300 px-2 dark:border-gray-600 ${
                  i === 0 ? 'border-l-0' : ''
                }`}
              >
                Hole {i + 1} (Par {game?.course.par[i]})
              </th>
            ))}
            <th className='bg-white dark:bg-gray-800 border border-gray-300 px-4 py-2 dark:border-gray-600'>
              Total (Par {totalPar})
            </th>
          </tr>
        </thead>
        <tbody>
          {players.map((playerName, playerIndex) => (
            <Score
              key={playerIndex}
              gameId={gameId}
              editMode={editMode}
              playerName={playerName}
              playerIndex={playerIndex}
            />
          ))}
        </tbody>
      </table>
    </section>
  );
}

export default ScoreCard;
