import gameReducer, { initialState as state } from '../game';
import { BOARD_SIZE } from '../../reducers/gameHelpers';
import types from '../../actions/actionTypes';

describe('Game Reducer', () => {
  it('should return initial state', () => {
    expect(gameReducer()).toBe(state);
  });

  it('should choose the player', () => {
    expect(
      gameReducer(state, {
        type: types.GAME.CHOOSE_PLAYER,
        symbol: 'X',
      }),
    ).toMatchSnapshot();
  });

  it('should handle a new mark', () => {
    expect(
      gameReducer(state, {
        type: types.NEW_MARK,
        column: 0,
        row: 1,
      }),
    ).toMatchSnapshot();
  });

  it('should define player 1 as winner on vertical board spaces', () => {
    expect(
      gameReducer({
        ...state,
        boardGrid: [
          [
            1,
            null,
            null,
          ],
          [
            1,
            null,
            null,
          ],
          [
            1,
            null,
            null,
          ],
        ],
      }, {
        type: types.GAME.VERIFY,
      }),
    ).toMatchSnapshot();
  });

  it('should define player 1 as winner on diagonal board spaces', () => {
    expect(
      gameReducer({
        ...state,
        boardGrid: [
          [
            1,
            null,
            null,
          ],
          [
            null,
            1,
            null,
          ],
          [
            null,
            null,
            1,
          ],
        ],
      }, {
        type: types.GAME.VERIFY,
      }),
    ).toMatchSnapshot();
  });

  it('should define game as tie', () => {
    expect(
      gameReducer({
        ...state,
        marksCount: BOARD_SIZE ** 2,
      }, {
        type: types.GAME.VERIFY,
      }),
    ).toMatchSnapshot();
  });

  it('should change to the next player', () => {
    expect(
      gameReducer(state, {
        type: types.GAME.NEXT_PLAYER,
      }),
    ).toMatchSnapshot();
  });

  it('should restart to the initial state but keep the chosen player symbol', () => {
    expect(
      gameReducer({
        ...state,
        playersSymbols: {
          1: 'X',
          2: 'O',
        },
      }, {
        type: types.GAME.RESTART,
      }),
    ).toMatchSnapshot();
  });
});
