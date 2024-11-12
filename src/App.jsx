import { Route, Routes, useLocation, useParams } from 'react-router-dom'
import { useState, useEffect  } from 'react'
import './App.css'
import './Nav.css'
import './Innav.css'
import Nav from './Nav'
import Dashboard from './components/Dashboard'
import Commodity from './components/Commodity'
import USstock from './components/USstock'
import Page404 from './components/Page404'
import Etf from './components/Etf'
import Economy from './components/Economy'


function App() {
  const [count, setCount] = useState(0)
  const location = useLocation();

  useEffect(() => {
    switch (location.pathname) {
      case "/":
        document.title = "Dashboard";
        break;
      case "/Commodity":
        document.title = "Commodity";
        break;
      case "/About":
        document.title = "About Us";
        break;
      default:
        if (!location.pathname.startsWith("/USstock")) {
          document.title = "Page Not Found";
        }
        break;
    }
  }, [location.pathname]);

  return (
    <div className='render-content'>
        <Nav />

      <div className='main-page-content'>
        <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/Commodity" element={<Commodity />} />
        <Route path='/Economy' element={<Economy/> } />
        <Route path="/USstock/:symbol/*" element={<USstock />} />
        <Route path="/ETF/:symbol/*" element={<Etf />} />
        <Route path="*" element={<Page404 />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
