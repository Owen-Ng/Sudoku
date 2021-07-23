import { useState, useEffect, useRef } from 'react';
import logo from './logo.svg';
import './App.css';
import Sudoku from "./model/sudoku";
import { Board } from "./components/Board";
import styled from 'styled-components';
let sudoku: any = null;
function App() {

  const [Table, setTable] = useState<string[][]>([["5", "3", ".", ".", "7", ".", ".", ".", "."], ["6", ".", ".", "1", "9", "5", ".", ".", "."], [".", "9", "8", ".", ".", ".", ".", "6", "."], ["8", ".", ".", ".", "6", ".", ".", ".", "3"], ["4", ".", ".", "8", ".", "3", ".", ".", "1"], ["7", ".", ".", ".", "2", ".", ".", ".", "6"], [".", "6", ".", ".", ".", ".", "2", "8", "."], [".", ".", ".", "4", "1", "9", ".", ".", "5"], [".", ".", ".", ".", "8", ".", ".", "7", "9"]]
  )

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
      console.log(JSON.stringify(res.board));
      // setTable(res);
      // sudoku = new Sudoku(Table);
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
