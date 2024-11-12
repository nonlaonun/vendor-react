import React, { useEffect, useState,  } from 'react';
import { NavLink, Routes, Route, Navigate, useParams } from 'react-router-dom';
import Balancesheet from './Financials/Balancesheet';
import Incomestatement from './Financials/Incomestatement';
import Cashflow from './Financials/Cashflow';
import './Financials.css'


function Financials() {
  const { symbol } = useParams(); 

  return (
    <div>
      <h2 className='Fintitle'>งบการเงินของ : {symbol}</h2>

      <div className='Financials-nav'>
        <NavLink className={({ isActive }) => (isActive ? "activefin" : "inactivefin")}
        to="Income-statement">Income statement</NavLink>

        <NavLink className={({ isActive }) => (isActive ? "activefin" : "inactivefin")}
        to="balance-sheet">Balance sheet</NavLink>

        <NavLink className={({ isActive }) => (isActive ? "activefin" : "inactivefin")}
        to="cash-flow-statement">Cash flow statement</NavLink>
      </div>
      
      <Routes>
        <Route path="/" element={<Navigate replace to="Income-statement" />} />
        <Route path="*" element={<Navigate replace to="Income-statement" />} />
        <Route path="balance-sheet/*" element={<Balancesheet />} />
        <Route path="Income-statement/*" element={<Incomestatement />} />
        <Route path="cash-flow-statement/*" element={<Cashflow />} />
      </Routes>
    </div>
  )
}

export default Financials
