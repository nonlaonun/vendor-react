import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import './SearchBar.css'

const apikey = import.meta.env.VITE_API_KEY;
 // ย้าย API key ไปไว้ใน .env

function SearchBar() {
    const [searchKeyword, setSearchKeyword] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    
    const navigate = useNavigate();
    const inputRef = useRef(null);
    const suggestionsRef = useRef(null);
    const searchTimeoutRef = useRef(null); // สำหรับเก็บ timeout ID
  
    const searchStock = async (keyword) => {
      if (!keyword) return [];
      try {
        const response = await fetch(
          `https://financialmodelingprep.com/api/v3/search?query=${keyword}&apikey=${apikey}`
        );
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        return data.slice(0, 20);
      } catch (error) {
        console.error("Error fetching stock data:", error);
        throw error;
      }
    };
  
    const handleSelect = (symbol) => {
      const currentPath = window.location.pathname;
      
      if (currentPath.startsWith("/USstock/")) {
        const newPath = currentPath.replace(/\/USstock\/[^\/]+/, `/USstock/${symbol}`);
        navigate(newPath);
      } else {
        navigate(`/USstock/${symbol}`);
      }
      setSuggestions([]);
      setShowSuggestions(false);
    };
    
    // Debounced search function
    const debouncedSearch = useCallback((keyword) => {
      // ยกเลิก timeout เก่า (ถ้ามี)
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }

      // สร้าง timeout ใหม่
      searchTimeoutRef.current = setTimeout(async () => {
        if (!keyword) {
          setSuggestions([]);
          setShowSuggestions(false);
          return;
        }

        setIsLoading(true);
        setError(null);

        try {
          const results = await searchStock(keyword);
          setSuggestions(results);
          setShowSuggestions(true);
        } catch (error) {
          setError('Failed to fetch results. Please try again.');
          setSuggestions([]);
        } finally {
          setIsLoading(false);
        }
      }, 400); // รอ 400ms หลังจากพิมพ์ครั้งสุดท้าย
    }, []);
    
    const handleInputChange = (event) => {
      const keyword = event.target.value;
      setSearchKeyword(keyword);
      debouncedSearch(keyword);
    };
  
    useEffect(() => {
      const handleClickOutside = (event) => {
        if (
          inputRef.current && 
          !inputRef.current.contains(event.target) &&
          suggestionsRef.current &&
          !suggestionsRef.current.contains(event.target)
        ) {
          setShowSuggestions(false);
        }
      };
      document.addEventListener('mousedown', handleClickOutside);
      
      // Cleanup
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
        // ยกเลิก timeout ที่ค้างอยู่เมื่อ component unmount
        if (searchTimeoutRef.current) {
          clearTimeout(searchTimeoutRef.current);
        }
      };
    }, []);
  
    return (
      <div className="search-bar-container">
      <div className='pre-search-bar'>
        <svg xmlns="http://www.w3.org/2000/svg" className='Search-img' height="22px" viewBox="0 -960 960 960" width="22px" fill="#e8eaed"><path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z"/></svg>
          <input
            type="text"
            value={searchKeyword}
            onChange={handleInputChange}
            onClick={() => setShowSuggestions(true)}
            ref={inputRef}
            placeholder="Search stocks..."
            className="search-input"
            aria-label="Search stocks"
            aria-expanded={showSuggestions}
          />
          {showSuggestions && suggestions.length > 0 && (
          <ul className="suggestions-list" ref={suggestionsRef}>
            {suggestions.map((suggestion) => (
              <li 
                key={suggestion.symbol} 
                onClick={() => handleSelect(suggestion.symbol)}
                className="suggestion-item"
              >
                <span className="symbol-searchbar">{suggestion.symbol}</span>
                <span className="name-searchbar">{suggestion.name}</span>
                <span className="exchange-searchbar">{suggestion.exchangeShortName}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
        {/* Loading indicator */}
        {/* {isLoading && (
          <span className="loading-indicator">
            Loading...
          </span>
        )} */}
        {/* Error message */}
        {/* {error && (
          <div className="error-message">
            {error}
          </div>
        )} */}
        {/* Suggestions list */}
        
      </div>
    );
}
  
export default SearchBar;