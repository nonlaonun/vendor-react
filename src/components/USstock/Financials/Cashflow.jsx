import React from 'react'
import { useParams } from 'react-router-dom';


function Cashflow() {
  const { symbol } = useParams(); 
  return (
    <div>
      Cash flow statement
      <p>Symbol =  {symbol}</p>
    </div>
  )
}

export default Cashflow
