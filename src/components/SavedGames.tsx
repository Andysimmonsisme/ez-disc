import { useEffect, useState } from 'react';
import { Game } from '../state/useGameState';
import ScoreCard from './ScoreCard';

function SavedGames() {
  const [games, setGames] = useState<Game[]>([]);

  useEffect(() => {
    setGames(JSON.parse(localStorage.getItem('games') || '[]'));
  }, []);
  return (
    <>
      {games.length === 0 ? (
        <p>No saved games.</p>
      ) : (
        <div className='space-y-4'>
          {games.map((game) => (
            <section
              key={game.id}
              className='p-4 bg-gray-100 dark:bg-gray-700 dark:text-white rounded-lg shadow-md'
            >
              <h2 className='text-lg font-bold mb-2'>
                {game.course.name}{' '}
                {new Date(game.date).toLocaleString('en-US', {
                  dateStyle: 'medium', // e.g., "Mar 27, 2025"
                  timeStyle: 'short', // e.g., "10:15 AM"
                })}
              </h2>

              <ScoreCard
                coursePar={game.course.par
                  .slice(0, game.scores[0].scores.length)
                  .reduce((sum, score) => sum + score, 0)}
                players={game.scores.map((score) => score.player)}
                scores={game.scores.map((score) => score.scores)}
                selectedCourse={game.course}
                totalHoles={game.scores[0].scores.length}
                handleScoreChange={() => {}}
                removePlayer={() => {}}
              />
            </section>
          ))}
        </div>
      )}
    </>
  );
}

export default SavedGames;
