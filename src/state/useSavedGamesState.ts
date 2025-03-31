import { useState } from 'react';
import { GameInterface } from './gameReducer';

export const useSavedGamesState = () => {
  const games: GameInterface[] = JSON.parse(localStorage.getItem('games') || '[]');
  const [editMode, setEditMode] = useState<boolean[]>(
    Array(games.length).fill(false)
  );

  const changeEditMode = (value: boolean, index: number) => {
    setEditMode((prevValue) => {
      const newValue = [...prevValue];

      newValue[index] = value;
      return newValue;
    });
  };

  return {
    games,
    editMode,
    changeEditMode,
  };
};
