export const BOARD_SIZE = 3;

export const generateBoardGrid = () => {
  const boardSize = BOARD_SIZE;

  // Initializes an array with three `undefined` indexes
  const boardGrid = new Array(boardSize);

  // Loop through these indexes
  for (let i = 0; i < boardSize; i += 1) {
    const boardRows = new Array(boardSize);

    // And create three rows with `null` value for each one of them
    for (let j = 0; j < boardSize; j += 1) {
      boardRows[j] = null;
    }

    // Append the rows to the grid
    boardGrid[i] = boardRows;
  }

  return boardGrid;
};

export const verifyBoardSpaces = (firstSpace, secondSpace, thirdSpace) => (
  firstSpace !== null &&
  firstSpace === secondSpace &&
  firstSpace === thirdSpace
);
