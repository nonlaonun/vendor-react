import React, { useEffect, useState,  } from 'react';
import { NavLink, Routes, Route, Navigate, useParams } from 'react-router-dom';
import IncomeA from './Incomestatement/IncomeA';
import IncomeQ from './Incomestatement/IncomeQ';
import './period.css'


function Incomestatement() {
  return (
    <div>
      <div className='period-nav'>
        <NavLink className={({ isActive }) => (isActive ? "activeperiod" : "inactiveperiod")}
        to="annual">Annual</NavLink>

        <NavLink className={({ isActive }) => (isActive ? "activeperiod" : "inactiveperiod")}
        to="quarterly">Quarterly</NavLink>

      </div>

      <div className='Routes'>
        <Routes>
          <Route path="/" element={<Navigate replace to="annual" />} />
          <Route path="*" element={<Navigate replace to="annual" />} />
          <Route path="annual" element={<IncomeA />} />
          <Route path="quarterly" element={<IncomeQ />} />
        </Routes>
      </div>
    </div>
  )
}

export default Incomestatement
