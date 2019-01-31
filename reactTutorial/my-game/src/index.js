import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

  //Function component - replaces classes with only render method in it
  function Square(props) {
    return (
      <button className="square" onClick={props.onClick}>
        {props.value}
      </button>
    );
  }
  
  class Board extends React.Component {

    renderSquare(i,j) {
      return ( 
        <Square 
          value={this.props.squares[i][j]} 
          onClick={() => this.props.onClick(i,j)}
        />
      );
    }
  
    render() {
      return (
        <div>
          <div className="board-row">
            {this.renderSquare(0,0)}
            {this.renderSquare(0,1)}
            {this.renderSquare(0,2)}
            {this.renderSquare(0,3)}
          </div>
          <div className="board-row">
            {this.renderSquare(1,0)}
            {this.renderSquare(1,1)}
            {this.renderSquare(1,2)}
            {this.renderSquare(1,3)}
          </div>
          <div className="board-row">
            {this.renderSquare(2,0)}
            {this.renderSquare(2,1)}
            {this.renderSquare(2,2)}
            {this.renderSquare(2,3)}
          </div>
          <div className="board-row">
            {this.renderSquare(3,0)}
            {this.renderSquare(3,1)}
            {this.renderSquare(3,2)}
            {this.renderSquare(3,3)}
          </div>
        </div>
      );
    }
  }
  
  class Game extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        history: [{
          squares: generateArray(),
        }],
        stepNumber: 0,
      };
      console.log(this.state.history);
    }

    handleClick(i,j) {
      const history = this.state.history.slice(0, this.state.stepNumber + 1);
      console.log(history);
      const current = history[history.length - 1];
      //2d array slice must be done row per row
      const squares = current.squares.slice().map(function(row){ return row.slice(); });
      //DEBUG
      //console.log(squares);
      let nullIndexI = -1;
      let nullIndexJ = -1;
      while (nullIndexI < squares.length-1 && nullIndexJ===-1) {
        nullIndexI++;
        nullIndexJ = squares[nullIndexI].findIndex((el) => { return el==null });
      }
      if (nullIndexI!==-1 && nullIndexJ!==-1) {
        if (nullIndexI===i && (nullIndexJ + 1===j || nullIndexJ -1 ===j))
        {
          squares[nullIndexI][nullIndexJ] = squares[i][j];
          squares[i][j] = null;
        }
        else if (nullIndexJ===j && (nullIndexI + 1===i || nullIndexI -1 ===i))
        {
          squares[nullIndexI][nullIndexJ] = squares[i][j];
          squares[i][j] = null;
        }
        else {
          alert("This move is not possible!")
          //DEBUG
          //console.log("null indexes: [" + nullIndexI + ", " + nullIndexJ + "]")
          //console.log("clicked indexes: [" + i + ", " + j + "]")
          return;
        }
      }
      
      this.setState({
        history: history.concat([{
          squares: squares,
        }]),
        stepNumber: history.length,

      });
    }

    jumpTo(step) {
      this.setState({
        stepNumber: step,
      });
    }

    render() {
      const history = this.state.history;
      console.log(this);
      const current = history[this.state.stepNumber];
      const winner = calculateWinner(current.squares);

      const moves = history.map((step, move) => {
        const desc = move ?
          'Go to move #' + move :
          'Go to game start';
        return (
          <li key={move}>
            <button onClick={() => this.jumpTo(move)}>{desc}</button>
          </li>
        );
      });

      let status;
      if (winner) {
        status = "Winner: " + winner;
      } else {
        status = "Number of moves: " + this.state.stepNumber; 
      }
      return (
        <div className="game">
          <div className="game-board">
            <Board 
              squares={current.squares}
              onClick={(i,j) => this.handleClick(i,j)}
            />
          </div>
          <div className="game-info">
            <div>{status}</div>
            <ol>{moves}</ol>
          </div>
        </div>
      );
    }
  }
  
  // ========================================
  
  ReactDOM.render(
    <Game />,
    document.getElementById('root')
  );

  function generateArray() {
      let squares = Array(4).fill().map(() => Array(4));;
      let nums = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,null];
      let counter = nums.length;
      for (let i=0; i<counter / 4; i++) {
        for (let j=0; j<counter / 4; j++) {
          let index = Math.floor(Math.random() * nums.length);
          squares[i][j] = nums.splice(index,1)[0] ;
        }
      }
      return squares;
  }
  //Winning debug board generator
  /*
  function winnerTestArray() {
    let squares = Array(4).fill().map(() => Array(4));;
    let nums = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,null,15];
    let counter = nums.length;
    let index = 0;
    for (let i=0; i<counter / 4; i++) {
      for (let j=0; j<counter / 4; j++) {
        squares[i][j] = nums[index];
        index++;
      }
    }
    return squares;
  }*/

  function calculateWinner (squares) {
    const winningArrray = [
      [1,2,3,4],
      [5,6,7,8],
      [9,10,11,12],
      [13,14,15,null],
    ];
    for (let i=0; i < winningArrray.length; i++) {
      const [a,b,c,d] = winningArrray[i];
      if (squares[i][0] !== a || squares[i][1] !== b || squares[i][2] !== c || squares[i][3] !== d) {
        return null;
      }
    }
    return true;
  }
  