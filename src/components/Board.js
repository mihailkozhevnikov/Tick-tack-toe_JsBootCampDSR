import React from 'react';
import Square from './Square';
import ResultBar from './ResultBar';

class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          squares: Array(9).fill(null),
          xIsNext: true,         
        };
    }

    restart(){
      this.setState({
        squares: Array(9).fill(null),
        xIsNext: true,
      });
  
    }

    handleClick(i) {       
        const squares = this.state.squares.slice();
        if (this.calculateWinner(squares) || squares[i]) {
           return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
          squares: squares,
          xIsNext: !this.state.xIsNext,
        });
      }

    checkMarkSquare(i, winComb){
      if (!winComb || !this.state.squares[i]||
        !(winComb[0]==i || winComb[1]==i || winComb[2]==i)){
        return false;
      }
      return true;
    }
    renderSquare(i, winComb) {  
        return <Square value={this.state.squares[i]} mark = {this.checkMarkSquare(i, winComb)} 
        onClick={() => this.handleClick(i)}/>;
    }

    setRandom(){
      let availableFields = new Array();
      for (let i = 0; i< this.state.squares.length; i++){
        if (!this.state.squares[i]){
          availableFields.push(i);       
        }
      }
      var rand = Math.floor(Math.random() * availableFields.length);
      this.handleClick(availableFields[rand]);
      return;
    }

    renderResultBar(winner, status){
        if (winner){
          return  <ResultBar value={status} />
        }
    }

    checkAllFilled(array){
      let length = array.length;
      array = array.filter(element => element);
      if (array.length==length){
      return true;
    }
      return false;
    }

    calculateWinner(squares) {
      let result = new Object();
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
            result.winElement = squares[a];
            result.winComb = lines[i];
            return result;
          }
        }
        if (this.checkAllFilled(squares)){
          result.winElement = 'Dead heat!';
          result.winComb = Array(3).fill(null);
          return result;
        }
        return null;
      }

    render() {
        const winner = this.calculateWinner(this.state.squares);
        let status;
        let winComb = Array(3).fill(null);
        if (winner) {
          winComb = winner.winComb;
          status = winner.winElement == 'Dead heat!'? winner.winElement : "Winner is " + winner.winElement + "!" ;
        } else {
          status = 'Next player is: ' + (this.state.xIsNext ? 'X' : 'O');
        }
  
      return (
        <div className="board">
          <div className="status">{status}</div>
          <div className="board-row">
            {this.renderSquare(0, winComb)}
            {this.renderSquare(1, winComb)}
            {this.renderSquare(2, winComb)}
          </div>
          <div className="board-row">
            {this.renderSquare(3, winComb)}
            {this.renderSquare(4, winComb)}
            {this.renderSquare(5, winComb)}
          </div>
          <div className="board-row">
            {this.renderSquare(6, winComb)}
            {this.renderSquare(7, winComb)}
            {this.renderSquare(8, winComb)}
          </div> 
          <div className="board-row">
            <button className="board-row-action-button" onClick={() => this.restart()}>Restart</button>
            <button className="board-row-action-button" onClick={() => this.setRandom()}>Help</button>
          </div>
            { this.renderResultBar(winner, status)}        
        </div>
      );
    }
  }
export default Board;