import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import types from '../actionTypes';
import * as actions from '../gameActions';
import { initialState } from '../../reducers/game';

describe('Game Actions', () => {
  it('should create an action to choose a player\'s symbol mark', () => {
    const symbol = 'X';
    const action = actions.gameChoosePlayer(symbol);

    expect(action.type).toBe(types.GAME.CHOOSE_PLAYER);
    expect(action.symbol).toBe(symbol);
  });

  it('should create an action to verify the status of the game', () => {
    const action = actions.gameVerify();

    expect(action.type).toBe(types.GAME.VERIFY);
  });

  it('should create an action to change to next player', () => {
    const action = actions.nextPlayer();

    expect(action.type).toBe(types.GAME.NEXT_PLAYER);
  });

  it('should create an action to create new mark and handle gameVerify & nextPlayer', async () => {
    const column = 0;
    const row = 1;

    const mockStore = configureMockStore([thunk]);

    const store = mockStore(initialState);

    store.dispatch(actions.newMark(column, row));

    const dispatchedActions = store.getActions();

    expect(dispatchedActions).toEqual([
      {
        type: types.NEW_MARK,
        column,
        row,
      },
      {
        type: types.GAME.VERIFY,
      },
      {
        type: types.GAME.NEXT_PLAYER,
      },
    ]);
  });
});
