import ScoreCard from './ScoreCard';
import { useSavedGamesState } from '../state/useSavedGamesState';

function SavedGames() {
  const {
    games,
    editMode,
    changeEditMode,
    handleScoreChange,
    removePlayer,
  } = useSavedGamesState();
  return (
    <>
      {games.length === 0 ? (
        <p>No saved games.</p>
      ) : (
        <div className='space-y-4'>
          {games.map((game, index) => (
            <section
              key={game.id}
              className='p-4 bg-gray-100 dark:bg-gray-700 dark:text-white rounded-lg shadow-md'
            >
              <h2 className='text-2xl font-bold'>{game.course.name}</h2>
              <p className='mb-2'>
                {new Date(game.date).toLocaleString('en-US', {
                  dateStyle: 'medium', // e.g., "Mar 27, 2025"
                  timeStyle: 'short', // e.g., "10:15 AM"
                })}
              </p>

              <div
                role='group'
                aria-label='View and Edit Toggle'
                className='flex'
              >
                <button
                  type='button'
                  onClick={() => changeEditMode(false, index)}
                  aria-pressed={!editMode[index]}
                  className={`px-4 py-2 rounded border border-gray-300 dark:border-gray-600 ${
                    !editMode[index] ? 'bg-blue-600 text-white' : 'hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  View
                </button>

                <button
                  type='button'
                  onClick={() => changeEditMode(true, index)}
                  aria-pressed={editMode[index]}
                  className={`px-4 py-2 rounded border border-gray-300 dark:border-gray-600 ${
                    editMode[index] ? 'bg-blue-600 text-white' : 'hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  Edit
                </button>
              </div>

              <ScoreCard
                gameId={game.id}
                coursePar={game.course.par
                  .slice(0, game.scores[0].scores.length)
                  .reduce((sum, score) => sum + score, 0)}
                editMode={editMode[index]}
                players={game.scores.map((score) => score.player)}
                scores={game.scores.map((score) => score.scores)}
                selectedCourse={game.course}
                totalHoles={game.scores[0].scores.length}
                handleScoreChange={handleScoreChange}
                removePlayer={removePlayer}
              />
            </section>
          ))}
        </div>
      )}
    </>
  );
}

export default SavedGames;
