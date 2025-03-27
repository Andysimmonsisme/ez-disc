import { useEffect, useState } from 'react';
import { Game } from './useGameState';

export const useSavedGamesState = () => {
  const [games, setGames] = useState<Game[]>(JSON.parse(localStorage.getItem('games') || '[]'));
  const [editMode, setEditMode] = useState<boolean[]>(
    Array(games.length).fill(false)
  );

  // changes to games
  useEffect(() => {
    saveGames();
  }, [games]);

  const changeEditMode = (value: boolean, index: number) => {
    setEditMode((prevValue) => {
      const newValue = [...prevValue];

      newValue[index] = value;
      return newValue;
    });
  };

  const handleScoreChange = (
    playerIndex: number,
    holeIndex: number,
    change: number,
    gameId: number
  ) => {
    setGames((prevGames) => {
      return prevGames.map((game) => {
        // update this game
        if (game.id === gameId) {
          return {
            ...game,
            scores: game.scores.map((playerScores, i) => {
              // update scores for this player
              if (i === playerIndex) {
                return {
                  ...playerScores,
                  scores: playerScores.scores.map((score, j) => {
                    if (j === holeIndex) {
                      const newScore = score + change;

                      // first setting score with minus sign
                      if (newScore < 0) {
                        return game.course.par[holeIndex] - 1;
                      }
                      // first setting score with plus sign
                      else if (score === 0 && newScore === 1) {
                        return game.course.par[holeIndex];
                      }

                      return score + change;
                    }
                    return score;
                  }),
                };
              }
              return playerScores; // this player score was not edited, return as is
            }),
          };
        }
        
        return game; // this game was not edited, return as is
      });
    });
  };

  const removePlayer = (playerIndex: number, gameId: number) => {
    setGames((prevGames) => {
      return prevGames.map((game) => {
        if (game.id === gameId) {
          return {
            ...game,
            scores: game.scores.filter((_, index) => index !== playerIndex),
          };
        }

        return game;
      });
    });
  };

  const saveGames = () => {
    localStorage.setItem('games', JSON.stringify(games));
  };

  return {
    games,
    editMode,
    changeEditMode,
    handleScoreChange,
    removePlayer,
    saveGames,
  };
};
