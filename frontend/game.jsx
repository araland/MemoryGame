import React from 'react';
import Card from './card';

export default class Game extends React.Component {
  constructor(props){
    super(props);
    this.state = {size: this.props.game.size,board: populate(this.props.game.size),
    firstPos: null, secondPos: null, noMatch: false};
  }

  makeGuess(pos){
    if (!this.state.board[pos[0]][pos[1]].revealed){
      if (this.state.firstPos === null){
        this.state.board[pos[0]][pos[1]].revealed = true;
        this.setState({noMatch: false, board: this.state.board, firstPos: pos});
      } else {
        this.state.board[pos[0]][pos[1]].revealed = true;
        if (this.compare(pos)){
          this.setState({noMatch: false, board: this.state.board, firstPos: null});
        } else {
          this.setState({noMatch: true, board: this.state.board, secondPos: pos});
        }
      }
      if (this.state.noMatch){
        this.state.board[this.state.firstPos[0]][this.state.firstPos[1]].revealed = false;
        this.state.board[this.state.secondPos[0]][this.state.secondPos[1]].revealed = false;
        this.setState({noMatch: false, board: this.state.board, firstPos: pos, secondPos: null});
      }
    }
  }

  compare(pos){
    if (this.state.board[pos[0]][pos[1]].value === this.state.board[this.state.firstPos[0]][this.state.firstPos[1]].value){
      return true;
    }
    return false;
  }

  render(){
    return (<div className="board">
      {this.state.board.map((cardRows,rIdx)=>
        {return cardRows.map((card, cIdx)=>{
            return <span onClick={()=>this.makeGuess([rIdx, cIdx])}><Card card={this.state.board[rIdx][cIdx]}/></span>;
          });}
        )}
    </div>);
  }

}

function populate(size){
  const VALUES = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  let values = VALUES;
  size = size * size / 2;

  while (size > values.length){
    values = values.concat(values);
  }
  values = shuffle(values);
  values = values.slice(0,size).concat(values.slice(0,size));
  values = shuffle(values);
  let array = new Array(Math.sqrt(size * 2)).fill(0).map(() => new Array(Math.sqrt(size * 2)).fill(0));
  let idx = 0;
  for (let i = 0; i < Math.sqrt(size * 2); i++){
    for (let j = 0; j < Math.sqrt(size * 2); j++){
      let card = {value: values[idx], revealed: false};
      idx++;
      array[i][j] = card;
    }
  }
  return array;
}

function shuffle(array){
  let counter = array.length;

  while (counter > 0) {
      let index = Math.floor(Math.random() * counter);
      counter--;
      let temp = array[counter];
      array[counter] = array[index];
      array[index] = temp;
  }
  return array;
}
