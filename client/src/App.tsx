import { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes,Route } from "react-router-dom";
import SudokuBoard from "./SudokuBoard";
import ErrorPage from './components/ErrorPage';

function App() {


  return (
    <Router>
      <Routes>
      <Route   path="/" element={<SudokuBoard/>}/>
      {/* else  */}
      <Route   path="*" element={<ErrorPage/>}/> 
      </Routes>
    </Router>
  );
}

export default App;
