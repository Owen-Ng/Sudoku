import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
function ErrorPage() {
  const navigate = useNavigate();

    return (
      <div style={{"width":"100%" , "textAlign":"center" }}>
        <div style={{"marginTop": "20%"}}>
          <h1 >404 Error</h1>
          <button onClick={() =>{navigate('/')}}>Go back to Sudoku</button>
        </div>
      </div>
    );
  }
  
  export default ErrorPage;
  