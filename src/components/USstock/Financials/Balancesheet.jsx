import React from 'react'
import { useParams } from 'react-router-dom';


function Balancesheet() {
  const { symbol } = useParams(); 

  return (
    <div>
      Balance sheet
      <p>Symbol =  {symbol}</p>
    </div>
  )
}

export default Balancesheet