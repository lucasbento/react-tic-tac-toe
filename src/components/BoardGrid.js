import React, { PropTypes } from 'react';

import BoardSpace from './BoardSpace';

const styles = {
  board: {
    width: 300,
    listStyleType: 'none',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    padding: 0,
  },
};

const BoardGrid = ({ grid, handleNewMark, isWinnerMark, getPlayerSymbol }) => (
  <ul style={styles.board}>
    {grid.map((rows, rowColumn) =>
      rows.map((row, rowIndex) => (
        <BoardSpace
          key={`row-${rowIndex}-${rowColumn}`}
          column={rowColumn}
          value={row}
          index={rowIndex}
          handleNewMark={handleNewMark}
          isWinnerMark={isWinnerMark}
          getPlayerSymbol={getPlayerSymbol}
        />
      )),
    )}
  </ul>
);

BoardGrid.propTypes = {
  /**
   * The grid of the game's board along with its values.
   */
  grid: PropTypes.arrayOf(
    PropTypes.arrayOf(
      PropTypes.number,
    ).isRequired,
  ).isRequired,
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

export default BoardGrid;
