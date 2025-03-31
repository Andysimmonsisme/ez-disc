import { useEffect, useState } from 'react';
import Course from './Course';
import Holes from './Holes';
import Player from './Player';
import SaveGameModal from './SaveGameModal';
import ScoreCard from './ScoreCard';
import { GameInterface } from '../state/gameReducer';
import { useGame } from '../state/GameContext';
import { courses } from '../data/courses';

interface GameProps {
  editMode: boolean;
  includeFooter: boolean;
  game?: GameInterface;
}

function Game({ editMode, includeFooter, game }: GameProps) {
  const { state, dispatch } = useGame();
  const [gameId, setGameId] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // if game is passed load it, else try to load from local storage
  useEffect(() => {
    const localStorageGames: GameInterface[] = JSON.parse(
      localStorage.getItem('games') || '[]'
    );
    const localStorageGame = localStorageGames.find(
      (g: GameInterface) => !g?.finished
    );

    if (game) {
      dispatch({ type: 'LOAD_GAME', payload: game });
      setGameId(game.id);
    } else if (localStorageGame) {
      dispatch({ type: 'LOAD_GAME', payload: localStorageGame });
      setGameId(localStorageGame.id);
    } else {
      startNewGame(localStorageGames);
    }
  }, []);

  useEffect(() => {
    if (gameId === null) return; // Prevent running if gameId is not set

    const currentGame = state.games.find((game) => game.id === gameId);
    if (!currentGame || !currentGame.scores.length) return; // Prevent saving `null` or empty games

    let localStorageGames = JSON.parse(localStorage.getItem('games') || '[]');

    // game not passed in props
    if (!game) {
      if (currentGame.finished)
        startNewGame(localStorageGames);
    }

    const gameExistsInLocalStorage = localStorageGames.find(
      (g: GameInterface) => g?.id === currentGame?.id
    );

    if (gameExistsInLocalStorage) {
      localStorageGames = localStorageGames.map((g: GameInterface) => {
        if (g.id === currentGame?.id) return currentGame;
        return g;
      });
    } else {
      localStorageGames.unshift(currentGame);
    }

    localStorage.setItem('games', JSON.stringify(localStorageGames));
  }, [state.games, gameId]);

  function startNewGame(localStorageGames: GameInterface[]) {
    setGameId(localStorageGames[0]?.id + 1 || 1);
    dispatch({
      type: 'LOAD_GAME',
      payload: {
        id: localStorageGames[0]?.id + 1 || 1,
        course: courses[0],
        totalHoles: courses[0].defaultHoles,
        date: new Date(),
        finished: false,
        scores: [],
      },
    });
  }

  return (
    <div>
      {editMode && <Course gameId={gameId ?? 1} />}

      {editMode && <Player gameId={gameId ?? 1} />}

      {editMode && <Holes gameId={gameId ?? 1} />}

      <ScoreCard gameId={gameId ?? -1} editMode={editMode} />

      {includeFooter && (
        <button
          className='w-full my-4 px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700'
          onClick={() => setIsModalOpen(true)}
        >
          Finish Game
        </button>
      )}

      {includeFooter && (
        <SaveGameModal
          gameId={gameId ?? 1}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
}

export default Game;
