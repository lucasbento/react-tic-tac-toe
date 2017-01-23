import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as gameActions from '../actions/gameActions';

import BoardGrid from '../components/BoardGrid';
import Button from '../components/common/Button';
import Modal from '../components/common/Modal';

const styles = {
  container: {
    marginTop: 20,
  },
  boardContainer: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
  },
  actionsContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
  modalActionsContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
  pageTitle: {
    borderBottom: '1px solid #CCC',
    marginBottom: 15,
    padding: '0 40px 10px',
  },
  title: {
    fontSize: 18,
    textAlign: 'center',
  },
  modalTitle: {
    fontSize: 30,
    marginTop: 0,
    textAlign: 'center',
  },
  modalSubtitle: {
    fontSize: 27,
    marginTop: 0,
    textAlign: 'center',
  },
  button: {
    margin: '0px 5px',
    padding: 5,
    fontSize: 25,
    minWidth: 60,
  },
  currentPlayerContainer: {
    border: '1px solid #0291E8',
    padding: 10,
    borderRadius: 5,
  },
};

export class App extends Component {
  static propTypes = {
    /**
     * The grid of the game's board along with its values.
     */
    boardGrid: PropTypes.arrayOf(
      PropTypes.arrayOf(
        PropTypes.number,
      ).isRequired,
    ).isRequired,
    /**
     * The current player of the game.
     */
    currentPlayer: PropTypes.number,
    /**
     * The marks that won the game.
     */
    winnerMarks: PropTypes.object,
    /**
     * The player that won the game (if it exists).
     */
    winnerPlayer: PropTypes.number,
    /**
     * Whether the game is a tie or not.
     */
    isTie: PropTypes.bool,
    /**
     * The chosen players symbols.
     */
    playersSymbols: PropTypes.object,
    /**
     * The quantity of chosen marks of the game.
     */
    marksCount: PropTypes.number,
    actions: PropTypes.shape({
      /**
       * An action to restart the game to the initial state.
       */
      gameRestart: PropTypes.func,
      /**
       * An action to choose the first player.
       */
      gameChoosePlayer: PropTypes.func,
      /**
       * An action to handle a new mark on a board space.
       */
      newMark: PropTypes.func,
    }),
  };

  state = {
    showChoosePlayerModal: true,
  };

  getPlayerSymbol = player => this.props.playersSymbols[player] || null;

  isWinnerMark = (column, index) => {
    const { winnerMarks } = this.props;

    if (!winnerMarks || !winnerMarks[column]) {
      return false;
    }

    return (winnerMarks[column].indexOf(index) !== -1);
  };

  handleNewMark = (column, row) => {
    const { boardGrid, winnerPlayer } = this.props;

    // Don't let user mark if it's an already-marked board space or there's already a winner
    if (boardGrid[column][row] || winnerPlayer) {
      return null;
    }

    return this.props.actions.newMark(column, row);
  };

  choosePlayer = (player) => {
    this.props.actions.gameChoosePlayer(player);

    this.setState({
      showChoosePlayerModal: false,
    });
  };

  render() {
    const { showChoosePlayerModal } = this.state;
    const {
      boardGrid,
      currentPlayer,
      winnerMarks,
      winnerPlayer,
      isTie,
      marksCount,
      actions: {
        gameRestart,
      },
    } = this.props;

    return (
      <div style={styles.container}>
        <div style={styles.boardContainer}>
          <h1 style={styles.pageTitle}>Tic Tac Toe</h1>

          {!showChoosePlayerModal && (
            <div style={styles.currentPlayerContainer}>
              Current player: {currentPlayer}
            </div>
          )}

          <BoardGrid
            grid={boardGrid}
            winnerMarks={winnerMarks}
            handleNewMark={this.handleNewMark}
            isWinnerMark={this.isWinnerMark}
            getPlayerSymbol={this.getPlayerSymbol}
          />
        </div>

        {marksCount > 0 && (
          <div style={styles.actionsContainer}>
            <Button
              icon="refresh"
              onClick={() => gameRestart()}
              label="Restart"
            />
          </div>
        )}


        <Modal show={showChoosePlayerModal}>
          <h1 style={styles.modalTitle}>What do you want to play with?</h1>

          <div style={styles.modalActionsContainer}>
            <Button
              name="symbol-X"
              icon="times"
              iconPosition="after"
              onClick={() => this.choosePlayer('X')}
              style={styles.button}
            />

            <Button
              name="symbol-O"
              icon="circle-o"
              iconPosition="after"
              onClick={() => this.choosePlayer('O')}
              style={styles.button}
            />
          </div>
        </Modal>

        <Modal
          show={isTie || !!winnerPlayer}
          onClose={() => gameRestart()}
        >
          {isTie && (
            <div>
              <h1 style={styles.modalTitle}>It's a tie!</h1>

              <h2 style={styles.modalSubtitle}>You are both equally strong! 😁</h2>
            </div>
          )}

          {winnerPlayer && (
            <div>
              <h1 style={styles.modalTitle}>Player {winnerPlayer} is the winner!</h1>

              <h2 style={styles.modalSubtitle}>You rock! 😎</h2>
            </div>
          )}

          <div style={styles.modalActionsContainer}>
            <Button
              name="restart"
              icon="play"
              onClick={() => gameRestart()}
              label="New Game"
            />
          </div>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = ({ game }) => ({ ...game });

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(gameActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
