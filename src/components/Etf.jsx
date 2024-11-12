import React, { useEffect, useState } from 'react';
import {Navigate, useParams, useNavigate } from 'react-router-dom'
import SearchBar from './SearchBar';


function Etf() {
  const { symbol } = useParams();
  const navigate = useNavigate();
  const [stockProfile, setStockProfile] = useState([]);
  const apikey = import.meta.env.VITE_API_KEY;


    async function getStockData(symbol) {
      try {
        const response = await fetch(`https://financialmodelingprep.com/api/v3/profile/${symbol}?apikey=${apikey}`);
        const responseJson = await response.json();
        setStockProfile(responseJson);
  
        // เช็คว่าเป็น USstock หรือไม่
        if (responseJson.length > 0 && !responseJson[0].isEtf) {
          navigate(`/USstock/${symbol}`);
        }
      } catch (error) {
        console.log(error.message);
      }
    }

    useEffect(() => {
      getStockData(symbol);
    }, [symbol]);

    useEffect(() => {
      document.title = `${symbol} - ${stockProfile[0]?.companyName || ""}`;
    }, [stockProfile, symbol]);

  return (
    <div>
    <SearchBar />
      This page for ETF 
      <br />
      <p>Symbol = {stockProfile[0]?.symbol || "ไม่พบข้อมูลหลักทรัพย์"}</p>
      <p>CompanyName = {stockProfile[0]?.companyName || ""}</p>
      <p>mktCap = {stockProfile[0]?.mktCap || ""}</p>
    </div>
  )
}

export default Etf
