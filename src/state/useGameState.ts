import { useReducer, useEffect } from 'react';
import { CourseInterface } from '../components/Course';

interface Scores {
  player: string;
  scores: number[];
}

export interface GameInterface {
  id: number;
  course: CourseInterface;
  date: Date;
  finished: boolean;
  scores: Scores[];
}

export interface GameState {
  coursePar: number;
  currentGameId: number | null;
  isModalOpen: boolean;
  newPlayerName: string;
  players: string[];
  scores: number[][];
  selectedCourse: CourseInterface;
  totalHoles: number;
  finished: boolean;
}

export type Action =
  | { type: 'LOAD_GAME'; payload: GameInterface }
  | { type: 'ADD_PLAYER' }
  | { type: 'REMOVE_PLAYER'; payload: number }
  | {
      type: 'UPDATE_SCORE';
      payload: { playerIndex: number; holeIndex: number; change: number };
    }
  | { type: 'SET_NEW_PLAYER_NAME'; payload: string }
  | { type: 'CHANGE_COURSE'; payload: CourseInterface }
  | { type: 'SET_TOTAL_HOLES'; payload: number }
  | { type: 'SET_IS_MODAL_OPEN'; payload: boolean }
  | { type: 'SET_COURSE_PAR'; payload: number }
  | { type: 'START_NEW_GAME' };

const initialState: GameState = {
  coursePar: 0,
  currentGameId: null,
  isModalOpen: false,
  newPlayerName: '',
  players: [],
  scores: [],
  selectedCourse: {} as CourseInterface, // selectedCourse will be initialized later
  totalHoles: 0,
  finished: false
};

export const reducer = (state: GameState, action: Action): GameState => {
  switch (action.type) {
    case 'LOAD_GAME':
      return {
        ...state,
        selectedCourse: action.payload.course,
        currentGameId: action.payload.id,
        players: action.payload.scores.map((score: Scores) => score.player),
        scores: action.payload.scores.map((score: Scores) => score.scores),
        finished: action.payload.finished
      };

    case 'ADD_PLAYER':
      return {
        ...state,
        players: [...state.players, state.newPlayerName],
        scores: [...state.scores, Array(state.totalHoles).fill(0)],
        newPlayerName: '',
      };

    case 'REMOVE_PLAYER':
      return {
        ...state,
        players: state.players.filter((_, i) => i !== action.payload),
        scores: state.scores.filter((_, i) => i !== action.payload),
      };

    case 'UPDATE_SCORE':
      return {
        ...state,
        scores: state.scores.map((playerScores, i) =>
          i === action.payload.playerIndex
            ? playerScores.map((score, j) => {
                if (j === action.payload.holeIndex) {
                  const parForHole = state.selectedCourse.par[j]; // Get the par for the hole
                  if (score === 0) {
                    return action.payload.change < 0
                      ? parForHole - 1
                      : parForHole; // Set to one below par or par
                  }
                  return Math.max(0, score + action.payload.change);
                }
                return score;
              })
            : playerScores
        ),
      };
    case 'SET_NEW_PLAYER_NAME':
      return { ...state, newPlayerName: action.payload };

    case 'CHANGE_COURSE':
      return {
        ...state,
        selectedCourse: action.payload,
        totalHoles: action.payload.defaultHoles,
      };

    case 'SET_TOTAL_HOLES':
      return { ...state, totalHoles: action.payload };

    case 'SET_IS_MODAL_OPEN':
      return { ...state, isModalOpen: action.payload };

    case 'SET_COURSE_PAR':
      return { ...state, coursePar: action.payload };

    case 'START_NEW_GAME':
      return { ...initialState, selectedCourse: state.selectedCourse };

    default:
      return state;
  }
};

// Load game from localStorage helper
const loadGameFromLocalStorage = (): GameInterface | null => {
  const unfinishedGame: GameInterface | undefined = JSON.parse(
    localStorage.getItem('games') || '[]'
  ).find((game: GameInterface) => game?.finished === false);
  return unfinishedGame || null;
};

export const useGameState = (courses: CourseInterface[]) => {
  const [state, dispatch] = useReducer(reducer, {
    ...initialState,
    selectedCourse: courses[0],
    totalHoles: courses[0].defaultHoles,
  });

  useEffect(() => {
    const game = loadGameFromLocalStorage();
    if (game) {
      dispatch({ type: 'LOAD_GAME', payload: game });
    }
  }, []);

  useEffect(() => {
    saveGameToLocalStorage();
  }, [state.players, state.scores]);

  useEffect(() => {
    dispatch({
      type: 'SET_TOTAL_HOLES',
      payload: state.scores[0]?.length || state.selectedCourse.defaultHoles,
    });
    saveGameToLocalStorage();
  }, [state.selectedCourse]);

  useEffect(() => {
    const totalPar = state.selectedCourse.par
      .slice(0, state.totalHoles)
      .reduce((acc, cur) => acc + cur, 0);
    dispatch({ type: 'SET_COURSE_PAR', payload: totalPar });
  }, [state.selectedCourse.par, state.totalHoles]);

  const saveGameToLocalStorage = (finished = false) => {
    if (!state.players.length) return;

    let games: GameInterface[] = JSON.parse(
      localStorage.getItem('games') || '[]'
    );
    const playerScores: Scores[] = state.players.map((player, i) => ({
      player,
      scores: state.scores[i],
    }));

    if (state.currentGameId !== null) {
      // Update existing game
      games = games.map((game) =>
        game.id === state.currentGameId
          ? {
              ...game,
              course: state.selectedCourse,
              finished: state.finished || finished,
              scores: playerScores,
            }
          : game
      );
    } else {
      // If a game is loaded, ensure we keep using its ID instead of making a new one
      const unfinishedGame = games.find((game) => !game.finished);
      if (unfinishedGame) {
        unfinishedGame.scores = playerScores;
        unfinishedGame.finished = finished;
      } else {
        // Create a new game only if no unfinished game exists
        const newGameId = games.length ? games[0].id + 1 : 1;
        games.unshift({
          id: newGameId,
          course: state.selectedCourse,
          date: new Date(),
          finished,
          scores: playerScores,
        });
        state.currentGameId = newGameId; // Set new game ID in state
      }
    }

    localStorage.setItem('games', JSON.stringify(games));
  };

  return {
    ...state,
    handleAddPlayer: () =>
      state.newPlayerName.trim() && dispatch({ type: 'ADD_PLAYER' }),
    handleScoreChange: (
      playerIndex: number,
      holeIndex: number,
      change: number
    ) =>
      dispatch({
        type: 'UPDATE_SCORE',
        payload: { playerIndex, holeIndex, change },
      }),
    loadGame: (game: GameInterface) =>
      dispatch({ type: 'LOAD_GAME', payload: game }),
    removePlayer: (index: number) =>
      dispatch({ type: 'REMOVE_PLAYER', payload: index }),
    startNewGame: () => {
      saveGameToLocalStorage(true);
      dispatch({ type: 'START_NEW_GAME' });

      // Select the first course from the list and set it in the new game
      if (courses.length > 0) {
        dispatch({ type: 'CHANGE_COURSE', payload: courses[0] });
      }
    },
    setNewPlayerName: (name: string) =>
      dispatch({ type: 'SET_NEW_PLAYER_NAME', payload: name }),
    setSelectedCourse: (course: CourseInterface) =>
      dispatch({ type: 'CHANGE_COURSE', payload: course }),
    setTotalHoles: (holes: number) =>
      dispatch({ type: 'SET_TOTAL_HOLES', payload: holes }),
    setIsModalOpen: (isOpen: boolean) =>
      dispatch({ type: 'SET_IS_MODAL_OPEN', payload: isOpen }),
  };
};
