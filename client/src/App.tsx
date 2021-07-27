import { useState, useEffect, useRef } from 'react';
import logo from './logo.svg';
import './App.css';
import Sudoku from "./model/sudoku";
import { Board } from "./components/Board";
import styled from 'styled-components';
let sudoku: any = null;
const Button = styled.button`
text-align: center;
border: 1px;
border-style: solid;
border-color: #774f05;
background-color: orange;
color: black;
margin: 10px;
cursor: pointer;

`
const LvlButton = styled.button`
text-align: center;
border: 1px;
border-style: solid;
border-color: #774f05;
color: #774f05;
margin: 10px;
border-radius: 10px;
cursor: pointer;
`

function App() {

  const [Table, setTable] = useState<number[][]>([[0, 5, 0, 0, 9, 7, 0, 1, 0], [0, 0, 0, 0, 4, 5, 7, 0, 0], [0, 0, 0, 0, 3, 0, 2, 4, 0], [0, 0, 2, 0, 5, 8, 6, 0, 7], [0, 0, 0, 3, 7, 9, 0, 0, 0], [0, 0, 7, 0, 0, 2, 0, 5, 0], [5, 0, 0, 0, 8, 0, 0, 0, 0], [0, 7, 0, 9, 0, 0, 5, 0, 0], [9, 0, 3, 5, 6, 1, 8, 7, 2]])
  const [Wrongs, setWrongs] = useState<number[][]>();
  const [Goods, setGoods] = useState<number[][]>();
  const [updatedTable, setupdatedTable] = useState<number[][]>([[0, 5, 0, 0, 9, 7, 0, 1, 0], [0, 0, 0, 0, 4, 5, 7, 0, 0], [0, 0, 0, 0, 3, 0, 2, 4, 0], [0, 0, 2, 0, 5, 8, 6, 0, 7], [0, 0, 0, 3, 7, 9, 0, 0, 0], [0, 0, 7, 0, 0, 2, 0, 5, 0], [5, 0, 0, 0, 8, 0, 0, 0, 0], [0, 7, 0, 9, 0, 0, 5, 0, 0], [9, 0, 3, 5, 6, 1, 8, 7, 2]])


  useEffect(() => {
    sudoku = new Sudoku(JSON.parse(JSON.stringify(Table)));
    sudoku.solveSudoku();

  }, [])
  function setValue(row: number, col: number, val: number) {
    let tmp = Table;
    tmp[row][col] = val;
    setTable(tmp);
    sudoku.updateBoard(tmp);

  }
  function Reset() {
    setTable(JSON.parse(JSON.stringify(sudoku.resetBoard())));
    setWrongs([]);
    setGoods([]);
  }

  function Solve() {
    // sudoku.solveSudoku();
    setTable(JSON.parse(JSON.stringify(sudoku.getBoard())))
    setWrongs([]);
    setGoods([]);
  }
  function Lvl(lvl: string) {
    fetch(`https://sugoku.herokuapp.com/board?difficulty=${lvl}`).then(res => {
      return res.json()
    }).then(res => {
      setTable(res.board);
      sudoku = new Sudoku(JSON.parse(JSON.stringify(res.board)));
      sudoku.solveSudoku();
      sudoku.getBoard();
      sudoku.resetBoard();
      console.log(sudoku.board)
      setWrongs([]);
      setGoods([]);
    })
  }


  function Check() {
    // sudoku.solveSudoku();
    let wrongs: number[][] = []
    let goods: number[][] = []
    const tmp = sudoku.getBoard();
    const empty = sudoku.findEmptySpot();
    [...Array(empty.length).keys()].map(i => {
      const current = empty[i];
      if (Table[current[0]][current[1]] === tmp[current[0]][current[1]]) {
        goods.push([current[0], current[1]])
      } else {
        wrongs.push([current[0], current[1]])
      }
    })
    setWrongs(wrongs);
    setGoods(goods);
  }


  return (
    <div className="App">
      <h1>Sudoku</h1>
      <LvlButton onClick={() => Lvl('easy')} style={{ backgroundColor: '#7a7af2' }}>Easy</LvlButton>
      <LvlButton onClick={() => Lvl('medium')} style={{ backgroundColor: 'yellow' }}>Medium</LvlButton>
      <LvlButton onClick={() => Lvl('hard')} style={{ backgroundColor: 'red' }}>Hard</LvlButton>
      <Board board={Table} setValue={setValue} Wrongs={Wrongs} Goods={Goods} />
      <Button onClick={Reset}>Reset</Button>
      <Button onClick={Solve}>Solve</Button>
      <Button onClick={Check}>Check</Button>

    </div>
  );
}

export default App;
