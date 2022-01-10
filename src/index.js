import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';

function Square(props) {
  return /*#__PURE__*/(
    React.createElement("button", { className: "square", onClick: props.onClick },
    props.value));
}

function Board(props) {
  const renderSquare = i => {
    return /*#__PURE__*/React.createElement(Square, { value: props.squares[i], onClick: () => props.onClick(i) });
  };

  return /*#__PURE__*/(
    React.createElement("div", null, /*#__PURE__*/
    React.createElement("div", { className: "board-row" },
    renderSquare(0),
    renderSquare(1),
    renderSquare(2)), /*#__PURE__*/

    React.createElement("div", { className: "board-row" },
    renderSquare(3),
    renderSquare(4),
    renderSquare(5)), /*#__PURE__*/

    React.createElement("div", { className: "board-row" },
    renderSquare(6),
    renderSquare(7),
    renderSquare(8))));



}

function Game(props) {
  const [history, setHistory] = React.useState([
  {
    squares: Array(9).fill(null) }]);


  const [step, setStep] = React.useState(0);
  const [Xnext, setXNext] = React.useState(true);

  const click = i => {
    const newhistory = history.slice(0, step + 1);
    const newsquares = newhistory[newhistory.length - 1].squares.slice();

    newsquares[i] = Xnext ? "X" : "O";

    setHistory(
    newhistory.concat([
    {
      squares: newsquares }]));



    setStep(newhistory.length);
    setXNext(x => !x);
  };

  const jump = i => {
    setStep(i);
    setXNext(i % 2 == 0);
  };

  let winner = calculateWinner(history[step].squares);
  let status = winner ?
  "Winner: " + winner :
  "Next player: " + (Xnext ? "X" : "O");

  let moves = history.map((squares, index) => {
    let desc = "Go to move #" + index;
    return /*#__PURE__*/(
      React.createElement("li", { key: index }, /*#__PURE__*/
      React.createElement("button", { onClick: () => jump(index) }, desc)));


  });

  return /*#__PURE__*/(
    React.createElement("div", { className: "game" }, /*#__PURE__*/
    React.createElement("div", { className: "game-board" }, /*#__PURE__*/
    React.createElement(Board, { squares: history[step].squares, onClick: click })), /*#__PURE__*/

    React.createElement("div", { className: "game-info" }, /*#__PURE__*/
    React.createElement("div", null, status), /*#__PURE__*/
    React.createElement("ol", null, moves))));



}

// ========================================

ReactDOM.render( /*#__PURE__*/React.createElement(Game, null), document.getElementById("root"));

function calculateWinner(squares) {
  const lines = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
