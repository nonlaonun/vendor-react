import React from "react"
import { NavLink, Link, useLocation } from 'react-router-dom';

function Nav() {
  const location = useLocation();

  return (
    <div>
      <nav>
        <ul>
          <li className="nav-logo">
            <Link to="/">
              <img className="vendor-logo" src="/assets/Vendor-logo.gif" alt="Logo" />
            </Link>
          </li>
          <div className="Link-content"> {/* ทำไว้เผื่อ Link มันเยอะมากๆ จะได้ทำ overflow ตั้งเป็น 400 px / overflow-y: scroll; */}
            <li>
                <NavLink 
                className={({isActive }) => (isActive ? "active" : "inactive")} 
                to="/">
                <svg xmlns="http://www.w3.org/2000/svg" height="26px" viewBox="0 -960 960 960" width="26px" fill="#e8eaed"><path d="M520-600v-240h320v240H520ZM120-440v-400h320v400H120Zm400 320v-400h320v400H520Zm-400 0v-240h320v240H120Zm80-400h160v-240H200v240Zm400 320h160v-240H600v240Zm0-480h160v-80H600v80ZM200-200h160v-80H200v80Zm160-320Zm240-160Zm0 240ZM360-280Z"/></svg>
                <div className="Nav-title-menu">Dasboard</div>
                </NavLink>
            </li>
            <li>
              <NavLink 
                className={() => {
                  const isInvestmentPath = location.pathname.toLowerCase().startsWith('/usstock');
                  return isInvestmentPath ? "active" : "inactive";
                }} to="/USstock/AAPL">
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="m140-220-60-60 300-300 160 160 284-320 56 56-340 384-160-160-240 240Z"/></svg>
                <div className="Nav-title-menu">US Stock</div>
                </NavLink>
            </li>
            <li>
                <NavLink 
                className={({isActive }) => (isActive ? "active" : "inactive")} 
                to="/Commodity">
                <svg xmlns="http://www.w3.org/2000/svg" height="26px" viewBox="0 -960 960 960" width="26px" fill="#e8eaed"><path d="M491-200q12-1 20.5-9.5T520-230q0-14-9-22.5t-23-7.5q-41 3-87-22.5T343-375q-2-11-10.5-18t-19.5-7q-14 0-23 10.5t-6 24.5q17 91 80 130t127 35ZM480-80q-137 0-228.5-94T160-408q0-100 79.5-217.5T480-880q161 137 240.5 254.5T800-408q0 140-91.5 234T480-80Zm0-80q104 0 172-70.5T720-408q0-73-60.5-165T480-774Q361-665 300.5-573T240-408q0 107 68 177.5T480-160Zm0-320Z"/></svg>
                <div className="Nav-title-menu">Commodity</div>
                </NavLink>
            </li>
            <li>
              <NavLink 
              className={({isActive }) => (isActive ? "active" : "inactive")} 
              to="/Economy">
              <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M120-120v-80l80-80v160h-80Zm160 0v-240l80-80v320h-80Zm160 0v-320l80 81v239h-80Zm160 0v-239l80-80v319h-80Zm160 0v-400l80-80v480h-80ZM120-327v-113l280-280 160 160 280-280v113L560-447 400-607 120-327Z"/></svg>
              <div className="Nav-title-menu">Economy</div>
              </NavLink>
            </li>
          </div>
        </ul>
      </nav>
    </div>
  )
}

export default Nav
