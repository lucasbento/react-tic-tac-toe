import React, { PropTypes } from 'react';
import { css } from 'glamor';

import Icon from './common/Icon';

const styles = {
  boardSpace: css({
    fontSize: 40,
    width: 95,
    height: 95,
    border: '1px solid indigo',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
    ':hover': {
      boxShadow: '0px 0px 21px 0px rgba(43, 0, 130, 0.28)',
    },
  }),
  winnerBoardSpace: css({
    color: '#0291E8',
  }),
};

const SYMBOLS = {
  X: 'times',
  O: 'circle-o',
};

const BoardSpace = ({ column, index, value, handleNewMark, isWinnerMark, getPlayerSymbol }) => {
  const icon = (value) ? SYMBOLS[getPlayerSymbol(value)] : null;

  const containerStyle = (isWinnerMark(column, index)) ? {
    ...styles.boardSpace,
    ...styles.winnerBoardSpace,
  } : styles.boardSpace;

  return (
    <li
      {...containerStyle}
      onClick={() => handleNewMark(column, index)}
    >
      {(value !== null) ?
        <Icon name={icon} /> :
        null
      }
    </li>
  );
};

BoardSpace.propTypes = {
  /**
   * The column of the space in the board grid.
   */
  column: PropTypes.number.isRequired,
  /**
   * The index (row) of the space in the board grid.
   */
  index: PropTypes.number.isRequired,
  /**
   * The board space value.
   */
  value: PropTypes.number,
  /**
   * A function to handle a new mark on a clicked board space.
   */
  handleNewMark: PropTypes.func.isRequired,
  /**
   * A function to check if the board space is in the winner marks.
   */
  isWinnerMark: PropTypes.func.isRequired,
  /**
   * A function to return the player's chosen symbol.
   */
  getPlayerSymbol: PropTypes.func.isRequired,
};

export default BoardSpace;
