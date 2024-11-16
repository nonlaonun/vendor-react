import React from 'react';
import { NavLink, Routes, Route, Navigate} from 'react-router-dom';
import BalancesheetA from './Balancesheet/BalancesheetA';
import BalancesheetQ from './Balancesheet/BalancesheetQ';
import './period.css'


function Balancesheet() {
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
          <Route path="annual" element={<BalancesheetA />} />
          <Route path="quarterly" element={<BalancesheetQ />} />
        </Routes>
      </div>
    </div>
  )
}

export default Balancesheet
