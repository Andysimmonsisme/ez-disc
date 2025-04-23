import { CourseInterface } from '../components/Course';

export interface Scores {
  player: string;
  scores: number[];
}

export interface GameInterface {
  id: number;
  course: CourseInterface;
  totalHoles: number;
  date: Date;
  finished: boolean;
  scores: Scores[];
}

export interface GamesState {
  games: GameInterface[];
  isModalOpen: boolean;
}

export type Action =
  | { type: 'LOAD_GAME'; payload: GameInterface }
  | { type: 'ADD_PLAYER'; payload: { gameId: number; player: string } }
  | { type: 'REMOVE_PLAYER'; payload: { gameId: number; playerIndex: number } }
  | {
      type: 'UPDATE_SCORE';
      payload: {
        gameId: number;
        playerIndex: number;
        holeIndex: number;
        change: number;
      };
    }
  | {
      type: 'CHANGE_COURSE';
      payload: { gameId: number; course: CourseInterface };
    }
  | { type: 'SET_TOTAL_HOLES'; payload: { gameId: number; totalHoles: number } }
  | { type: 'START_NEW_GAME'; payload: number };

export const initialState: GamesState = {
  games: [],
  isModalOpen: false,
};

export const reducer = (state: GamesState, action: Action): GamesState => {
  switch (action.type) {
    case 'LOAD_GAME':
      return {
        ...state,
        games: [...state.games, action.payload],
      };

    case 'ADD_PLAYER': {
      const newGames = state.games.map((game) => {
        // add new player to game
        if (game.id === action.payload.gameId) {
          return {
            ...game,
            scores: [
              ...game.scores,
              {
                player: action.payload.player,
                scores: Array(18).fill(0),
              },
            ],
          };
        }
        return game;
      });

      return {
        ...state,
        games: newGames,
      };
    }

    case 'REMOVE_PLAYER': {
      const newGames = state.games.map((game) => {
        // remove player from game
        if (game.id === action.payload.gameId) {
          return {
            ...game,
            scores: game.scores.filter(
              (_, i) => i !== action.payload.playerIndex
            ),
          };
        }
        return game;
      });

      return {
        ...state,
        games: newGames,
      };
    }

    case 'UPDATE_SCORE': {
      const newGames = state.games.map((game) => {
        // update game
        if (game.id === action.payload.gameId) {
          return {
            ...game,
            scores: game.scores.map((playerScore, i) => {
              // update player score
              if (i === action.payload.playerIndex) {
                return {
                  ...playerScore,
                  scores: playerScore.scores.map((score, j) => {
                    // update score for hole
                    if (j === action.payload.holeIndex) {
                      const parForHole = game.course.par[j]; // Get the par for the hole

                      if (score === 0) {
                        return action.payload.change < 0
                          ? parForHole - 1
                          : parForHole; // Set to one below par or par
                      }
                      return Math.max(0, score + action.payload.change);
                    }
                    return score;
                  }),
                };
              }
              return playerScore;
            }),
          };
        }
        return game;
      });

      return {
        ...state,
        games: newGames,
      };
    }

    case 'CHANGE_COURSE': {
      const newGames = state.games.map((game) => {
        // update course and total holes for game
        if (game.id === action.payload.gameId) {
          return {
            ...game,
            course: action.payload.course,
            totalHoles: action.payload.course.defaultHoles,
          };
        }
        return game;
      });

      return {
        ...state,
        games: newGames,
      };
    }

    case 'SET_TOTAL_HOLES': {
      const newGames = state.games.map((game) => {
        // update total holes for game
        if (game.id === action.payload.gameId) {
          return {
            ...game,
            totalHoles: action.payload.totalHoles,
          };
        }
        return game;
      });

      return {
        ...state,
        games: newGames,
      };
    }

    case 'START_NEW_GAME': {
      const newGames = state.games.map((game) => {
        // update total holes for game
        if (game.id === action.payload) {
          return {
            ...game,
            finished: true,
          };
        }
        return game;
      });

      return {
        ...state,
        games: newGames,
      };
    }

    default:
      return state;
  }
};