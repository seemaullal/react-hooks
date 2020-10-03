// useState: tic tac toe
// http://localhost:3000/isolated/exercise/04.js

import React from 'react';

function Board({onClick, squares}) {
  const winner = calculateWinner(squares);
  const nextValue = calculateNextValue(squares);
  const status = calculateStatus(winner, squares, nextValue);

  function renderSquare(i) {
    return (
      <button className="square" onClick={() => onClick(i)}>
        {squares[i]}
      </button>
    );
  }

  return (
    <div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  );
}

function Game() {
  const [history, setHistory] = React.useState([Array(9).fill(null)]);
  const [currentStep, setCurrentStep] = React.useState(0);

  const currentSquares = history[currentStep];
  const winner = calculateWinner(currentSquares);
  const nextValue = calculateNextValue(currentSquares);
  const status = calculateStatus(winner, currentSquares, nextValue);

  function selectSquare(square) {
    if (winner || currentSquares[square]) {
      return;
    }
    setHistory(currentHistory => {
      const newHistory = [];
      for (let i = 0; i <= currentStep; i++) {
        newHistory.push(currentHistory[i]);
      }
      const stepToAdd = [...newHistory[currentStep]];
      stepToAdd[square] = nextValue;
      newHistory.push(stepToAdd);
      setCurrentStep(current => currentStep + 1);
      return newHistory;
    });
  }

  function restart() {
    setHistory([Array(9).fill(null)]);
    setCurrentStep(0);
  }

  function updateStep(step) {
    setCurrentStep(step);
  }

  const moves = history.map((_item, step) => {
    const onCurrentStep = currentStep === step;
    const currentMessage = onCurrentStep ? ' (current)' : '';
    const buttonMessage =
      step === 0 ? `Go to game start` : `Go to move #${step}${currentMessage}`;
    return (
      <li key={step}>
        <button onClick={() => updateStep(step)} disabled={onCurrentStep}>
          {buttonMessage}
        </button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board onClick={selectSquare} squares={currentSquares} />
        <button className="restart" onClick={restart}>
          restart
        </button>
      </div>
      <div className="game-info">
        <div>{status}</div>
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

function calculateStatus(winner, squares, nextValue) {
  return winner
    ? `Winner: ${winner}`
    : squares.every(Boolean)
    ? `Scratch: Cat's game`
    : `Next player: ${nextValue}`;
}

function calculateNextValue(squares) {
  const xSquaresCount = squares.filter(r => r === 'X').length;
  const oSquaresCount = squares.filter(r => r === 'O').length;
  return oSquaresCount === xSquaresCount ? 'X' : 'O';
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

function App() {
  return <Game />;
}

export default App;
