import types from './actionTypes';

export const gameChoosePlayer = symbol => ({
  type: types.GAME.CHOOSE_PLAYER,
  symbol,
});

export const gameVerify = () => ({
  type: types.GAME.VERIFY,
});

export const nextPlayer = () => ({
  type: types.GAME.NEXT_PLAYER,
});

export const newMark = (column, row) =>
  (dispatch) => {
    dispatch({
      type: types.NEW_MARK,
      column,
      row,
    });

    dispatch(gameVerify());

    return dispatch(nextPlayer());
  };

export const gameRestart = () => ({
  type: types.GAME.RESTART,
});
