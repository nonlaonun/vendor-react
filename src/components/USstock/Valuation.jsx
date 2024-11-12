import React from 'react'
import { useParams } from 'react-router-dom';

function Valuation() {
  const { symbol } = useParams(); 

  return (
    <div>
      <h1>Valuation</h1>
      <p>Symbol =  {symbol}</p>

    </div>
  )
}

export default Valuation
