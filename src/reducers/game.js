import cloneDeep from 'lodash.clonedeep';
import types from '../actions/actionTypes';
import {
  BOARD_SIZE,
  generateBoardGrid,
  verifyBoardSpaces,
} from './gameHelpers';

export const initialState = {
  boardGrid: generateBoardGrid(),
  currentPlayer: 1,
  playersSymbols: {},
  winnerMarks: {},
  winnerPlayer: null,
  marksCount: 0,
  isTie: false,
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case types.GAME.CHOOSE_PLAYER: {
      return {
        ...state,
        playersSymbols: {
          1: action.symbol,
          2: (action.symbol === 'X') ? 'O' : 'X',
        },
      };
    }
    case types.NEW_MARK: {
      const { currentPlayer } = state;
      const boardGrid = cloneDeep(state.boardGrid); // Using `cloneDeep` so `boardGrid` isn't copied with references

      const { column, row } = action;

      boardGrid[column][row] = currentPlayer;

      return {
        ...state,
        boardGrid,
        marksCount: state.marksCount + 1,
      };
    }
    case types.GAME.VERIFY: {
      const boardSize = BOARD_SIZE;
      const maxMarksCount = boardSize ** 2;

      const { currentPlayer: winnerPlayer, marksCount } = state;

      if (marksCount === maxMarksCount) {
        return {
          ...state,
          isTie: true,
        };
      }

      const boardGrid = cloneDeep(state.boardGrid);

      for (let i = 0; i < boardSize; i += 1) {
        // Check if user won horizontally
        if (verifyBoardSpaces(boardGrid[i][0], boardGrid[i][1], boardGrid[i][2])) {
          return {
            ...state,
            winnerMarks: {
              [i]: [0, 1, 2],
            },
            winnerPlayer,
          };
        }

        // Check if user won vertically
        if (verifyBoardSpaces(boardGrid[0][i], boardGrid[1][i], boardGrid[2][i])) {
          return {
            ...state,
            winnerMarks: {
              0: [i],
              1: [i],
              2: [i],
            },
            winnerPlayer,
          };
        }
      }

      /*
       Check if user won diagonally
       */
      if (verifyBoardSpaces(boardGrid[0][0], boardGrid[1][1], boardGrid[2][2])) {
        return {
          ...state,
          winnerMarks: {
            0: [0],
            1: [1],
            2: [2],
          },
          winnerPlayer,
        };
      }

      if (verifyBoardSpaces(boardGrid[0][2], boardGrid[1][1], boardGrid[2][0])) {
        return {
          ...state,
          winnerMarks: {
            0: [2],
            1: [1],
            2: [0],
          },
          winnerPlayer,
        };
      }

      return state;
    }
    case types.GAME.NEXT_PLAYER: {
      return {
        ...state,
        currentPlayer: ((state.currentPlayer === 1) ? 2 : 1),
      };
    }
    case types.GAME.RESTART: {
      return {
        ...initialState,
        playersSymbols: state.playersSymbols,
      };
    }
    default: {
      return state;
    }
  }
};
