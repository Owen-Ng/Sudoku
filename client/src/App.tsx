import { useState, useEffect, useRef } from 'react';
import logo from './logo.svg';
import './App.css';
import Sudoku from "./model/sudoku";
import { Board } from "./components/Board";
import styled from 'styled-components';
let sudoku: any = null;
function App() {

  const [Table, setTable] = useState<number[][]>([[0, 5, 0, 0, 9, 7, 0, 1, 0], [0, 0, 0, 0, 4, 5, 7, 0, 0], [0, 0, 0, 0, 3, 0, 2, 4, 0], [0, 0, 2, 0, 5, 8, 6, 0, 7], [0, 0, 0, 3, 7, 9, 0, 0, 0], [0, 0, 7, 0, 0, 2, 0, 5, 0], [5, 0, 0, 0, 8, 0, 0, 0, 0], [0, 7, 0, 9, 0, 0, 5, 0, 0], [9, 0, 3, 5, 6, 1, 8, 7, 2]])

  useEffect(() => {
    sudoku = new Sudoku(Table)

  }, [])
  // const sudoku = new Sudoku(JSON.parse(JSON.stringify(Table)));
  // sudoku.solveSudoku();
  // console.log(sudoku.getBoard());
  // console.log(sudoku.resetBoard())
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

  function Reset() {
    setTable(sudoku.resetBoard());
  }

  function Solve() {
    sudoku.solveSudoku();
    setTable(JSON.parse(JSON.stringify(sudoku.getBoard())))
    console.log(Table)
  }
  function Lvl(lvl: string) {
    fetch(`https://sugoku.herokuapp.com/board?difficulty=${lvl}`).then(res => {
      return res.json()
    }).then(res => {
      setTable(res.board);
      sudoku = new Sudoku(Table);
    })


  }
  return (
    <div className="App">
      <h1>Sudoku</h1>
      <LvlButton onClick={() => Lvl('easy')} style={{ backgroundColor: '#7a7af2' }}>Easy</LvlButton>
      <LvlButton onClick={() => Lvl('medium')} style={{ backgroundColor: 'yellow' }}>Medium</LvlButton>
      <LvlButton onClick={() => Lvl('hard')} style={{ backgroundColor: 'red' }}>Hard</LvlButton>
      <Board board={Table} />
      <Button onClick={Reset}>Reset</Button>
      <Button onClick={Solve}>Solve</Button>

    </div>
  );
}

export default App;
