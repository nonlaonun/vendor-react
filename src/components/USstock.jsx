import React, { useEffect, useState } from 'react';
import { NavLink, Routes, Route, Navigate, useParams, useNavigate } from 'react-router-dom';
import Overview from './USstock/Overview';
import Financials from './USstock/Financials';
import Valuation from './USstock/Valuation';
import SearchBar from './SearchBar';
import './USstock.css'

function USstock() {
  const [stockProfile, setStockProfile] = useState([]);
  const { symbol } = useParams();
  const navigate = useNavigate();

  const apikey = import.meta.env.VITE_API_KEY;

  async function getStockData(symbol) {
    try {
      const response = await fetch(`https://financialmodelingprep.com/api/v3/profile/${symbol}?apikey=${apikey}`);
      const responseJson = await response.json();
      setStockProfile(responseJson);

      // เช็คว่าเป็น ETF หรือไม่
      if (responseJson.length > 0 && responseJson[0].isEtf) {
        navigate(`/ETF/${symbol}`);
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  const price = stockProfile[0]?.price;
  const pchange = stockProfile[0]?.changes;
  const closep = price - pchange ;
  const percent = closep !== 0 ? ((price / closep) - 1) * 100 : 0;
  const changeClass = pchange < 0 ? 'down' : 'up';

  useEffect(() => {
    getStockData(symbol);
  }, [symbol]);

  useEffect(() => {
    document.title = `${symbol} - ${stockProfile[0]?.companyName || ""}`;
  }, [stockProfile, symbol]);

  return (
    <div>
      <SearchBar />
      <div className='USstock-content-render'>

        <div className='stock-profile'>
          <div className='stock-profile-img'>
            <img src={stockProfile[0]?.image} alt="Logo" className='logo-symbol' />
          </div>
          <div className='stock-profile-name'>
            <div className='stock-full-name'>
              {stockProfile[0]?.companyName || "ไม่พบข้อมูลหลักทรัพย์"}
            </div>
              <div className='stock-market-location'>
                <div className='stock-symbol'>{stockProfile[0]?.symbol || "ไม่พบข้อมูลหลักทรัพย์"}</div>
                <div className='stock-Exchange'>{stockProfile[0]?.exchangeShortName}</div>
                <div className='stock-Country'>{stockProfile[0]?.country}</div>
              </div>
          </div>
          <div className='stock-profile-pricing'>
              <div className='stock-price-box'>
                  <div className='stock-price'>{stockProfile[0]?.price.toFixed(2)}</div>
                  <div className='stock-currency'>{stockProfile[0]?.currency}</div>
              </div>
              <div className={`stock-change-box ${changeClass}`}>
                  <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="green"><path d="M444-192v-438L243-429l-51-51 288-288 288 288-51 51-201-201v438h-72Z"/></svg>
                  <div className='stock-change'>{stockProfile[0]?.changes.toFixed(2)}</div>
                  <div className='stock-percent-change'>{percent.toFixed(2)}%</div>
              </div>
            </div>
        </div>

        <div className="Investment-nav">
          <NavLink
            className={({ isActive }) => (isActive ? "Innavactive" : "Innavinactive")}
            to="Overview">Overview</NavLink>
          <NavLink
            className={({ isActive }) => (isActive ? "Innavactive" : "Innavinactive")}
            to="Financials">Financials</NavLink>
          <NavLink
            className={({ isActive }) => (isActive ? "Innavactive" : "Innavinactive")}
            to="Valuation">Valuation</NavLink>
        </div>

        <Routes>
          <Route path="/" element={<Navigate replace to="Overview" />} />
          <Route path="*" element={<Navigate replace to="Overview" />} />
          <Route path="Overview" element={<Overview AllStockData={stockProfile}/>} />
          <Route path="Financials/*" element={<Financials />} />
          <Route path="Valuation" element={<Valuation />} />
        </Routes>
      </div>
    </div>
  );
}

export default USstock;


/*   const getStockData = async (symbol) => {
    try {
      const response = await fetch(`https://financialmodelingprep.com/api/v3/profile/${symbol}?apikey=${apikey}`);
      const responseJson = await response.json();
      
      if (responseJson && responseJson.length > 0) {
        setStockProfile(responseJson);
      }
    } catch (error) {
      console.error('Error fetching stock data:', error);
    }
  }; */

/* const handleSearch = (newSymbol) => {
    navigate(`/investment/${newSymbol}`); // Change the URL to the new symbol
  }; */

  /* const stockData = stockProfile.map((Profile, index) => (
    <div key={index}>
      <h1>In-map</h1>
      <p>Company Name = {Profile.companyName}</p>
      <p>mktCap = {Profile.mktCap}</p>
    </div>
  )); */


  {/* <input type="text" placeholder="Search symbol" onKeyDown={(e) => {
        if (e.key === 'Enter') {
          handleSearch(e.target.value);
        }
      }} /> */}



