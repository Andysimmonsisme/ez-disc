import { useSavedGamesState } from '../state/useSavedGamesState';
import Game from './Game';

function SavedGames() {
  const { games, editMode, changeEditMode } = useSavedGamesState();
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
                    !editMode[index]
                      ? 'bg-blue-600 text-white'
                      : 'hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  View
                </button>

                <button
                  type='button'
                  onClick={() => changeEditMode(true, index)}
                  aria-pressed={editMode[index]}
                  className={`px-4 py-2 rounded border border-gray-300 dark:border-gray-600 ${
                    editMode[index]
                      ? 'bg-blue-600 text-white'
                      : 'hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  Edit
                </button>
              </div>

              <Game editMode={editMode[index]} includeFooter={false} game={game} />
            </section>
          ))}
        </div>
      )}
    </>
  );
}

export default SavedGames;
