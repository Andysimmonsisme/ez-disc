import { createContext, useContext, useReducer, ReactNode } from 'react';
import { reducer, initialState, GamesState, Action } from './gameReducer';

interface GameProviderProps {
  children: ReactNode;
}

const GameContext = createContext<{ state: GamesState; dispatch: React.Dispatch<Action> } | undefined>(undefined);

export const GameProvider = ({ children }: GameProviderProps) => {
  const [state, dispatch] = useReducer(reducer, {
    ...initialState
  });

  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) throw new Error('useGame must be used within a GameProvider');
  return context;
};
