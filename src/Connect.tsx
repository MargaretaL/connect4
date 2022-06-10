import styled from '@emotion/styled';
import React, { Reducer, useCallback, useEffect, useReducer } from 'react';
import { Row } from './Row';
import { checkFourInARow } from './utils';

interface GameHistoryItem {
  currentPlayer?: number | null;
  board?: (number | undefined | null)[][];
  message?: string;
  gameOver?: boolean;
}

interface State {
  gameHistory: GameHistoryItem[];
}

interface Action {
  type: string;
  board?: (number | undefined | null)[][];
  message?: string;
  nextPlayer?: number;
}

const initialGameState: State = {
  gameHistory: [
    {
      currentPlayer: 1,
      board: [
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
      ],
      gameOver: false,
      message: 'Lets play!',
    },
  ],
};

const initialLocalStorage =
  JSON.parse(localStorage.getItem('GameState')!) || initialGameState;

const gameReducer: Reducer<State, Action> = (state, action) => {
  switch (action.type) {
    case 'NEWGAME':
      return {
        ...initialGameState,
      };
    case 'TOGGLEPLAYER':
      return {
        gameHistory: [
          ...state.gameHistory,
          {
            ...state.gameHistory[state.gameHistory.length - 1],
            currentPlayer: action.nextPlayer,
            board: action.board,
            message: action.message,
          },
        ],
      };
    case 'ENDGAME':
      return {
        gameHistory: [
          ...state.gameHistory,
          {
            ...state.gameHistory[state.gameHistory.length - 1],
            gameOver: true,
            message: action.message,
            board: action.board,
          },
        ],
      };
    case 'UPDATEMESSAGE':
      return {
        gameHistory: [
          ...state.gameHistory,
          {
            ...state.gameHistory[state.gameHistory.length - 1],
            message: action.message,
          },
        ],
      };
    case 'UNDO':
      const newHistory = state.gameHistory.slice(
        0,
        state.gameHistory.length - 1
      );
      return {
        gameHistory: newHistory,
      };
    default:
      throw Error(`Action "${action.type}" is not a valid action.`);
  }
};

const Table = styled.table`
  background-color: #1990ff;
  padding: 10px 40px;
`;

const Buttons = styled.div`
  margin: 20px;
  display: flex;
  justify-content: space-between;
`;
const Button = styled.div<{ bg?: string }>`
  padding: 6px 20px;
  background-color: ${({ bg }) => bg};
  cursor: pointer;
`;

export const Connect = () => {
  const [gameState, dispatchGameState] = useReducer<
    React.Reducer<State, Action>
  >(gameReducer, initialLocalStorage);

  useEffect(() => {
    localStorage.setItem('GameState', JSON.stringify(gameState));
  }, [gameState]);

  const latestGameHistoryItem =
    gameState?.gameHistory?.[gameState?.gameHistory.length - 1] ||
    initialGameState;

  const play = useCallback(
    (column: number) => {
      if (!latestGameHistoryItem.gameOver) {
        let board = latestGameHistoryItem?.board?.map((columns) => [
          ...columns,
        ]);
        //check if cell is taken, starting at the bottom row and upwards
        for (let row = 5; row >= 0; row--) {
          if (board && !board[row][column]) {
            board[row][column] = latestGameHistoryItem.currentPlayer;
            break;
          }
        }
        // Check status of board using checkForWin function from ./utils
        let result = checkFourInARow(board);

        if (result === 1) {
          dispatchGameState({
            type: 'ENDGAME',
            message: 'Red  player wins! 🥳',
            board,
          });
        } else if (result === 2) {
          dispatchGameState({
            type: 'ENDGAME',
            message: 'Yellow player wins! 🥳',
            board,
          });
        } else if (result === 'draw') {
          dispatchGameState({
            type: 'ENDGAME',
            message: 'Draw Game!',
            board,
          });
        } else {
          const nextPlayer = latestGameHistoryItem.currentPlayer === 1 ? 2 : 1;
          dispatchGameState({
            type: 'TOGGLEPLAYER',
            message: 'Keep playing!',
            nextPlayer,
            board,
          });
        }
      } else {
        dispatchGameState({
          type: 'UPDATEMESSAGE',
          message: 'Game Over. Please start a new game.',
        });
      }
    },
    [
      latestGameHistoryItem?.board,
      latestGameHistoryItem?.currentPlayer,
      latestGameHistoryItem?.gameOver,
    ]
  );

  return (
    <>
      <Table>
        <tbody>
          {latestGameHistoryItem?.board?.map((row, i: number) => (
            <Row key={i} row={row} play={play} />
          ))}
        </tbody>
      </Table>
      <p>{latestGameHistoryItem.message}</p>
      <Buttons>
        <Button
          bg="green"
          onClick={() => {
            dispatchGameState({ type: 'NEWGAME' });
          }}
        >
          New Game
        </Button>
        {gameState.gameHistory.length > 1 ? (
          <Button
            bg="orange"
            onClick={() => {
              dispatchGameState({ type: 'UNDO' });
            }}
          >
            Undo
          </Button>
        ) : null}
      </Buttons>
    </>
  );
};
