import React, { useState, useEffect, useMemo } from 'react';
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';
import Accessibility from 'highcharts/modules/accessibility';
import './StockChart.css';

Accessibility(Highcharts);

const StockChart = ({ symbol, apiKey }) => {
  const [historicalData, setHistoricalData] = useState([]);
  const [selectedPeriod, setSelectedPeriod] = useState('30');
  const [loading, setLoading] = useState(true);
  const [chartColor, setChartColor] = useState('#00E396'); // สีเริ่มต้น
  const [startPrice, setStartPrice] = useState(null); // สร้าง state สำหรับเก็บ startPrice
  const [endPrice, setEndPrice] = useState(null); // สร้าง state สำหรับเก็บ endPrice

  const periods = [
    { label: '7D', days: '7' },
    { label: '1M', days: '30' },
    { label: '3M', days: '90' },
    { label: '6M', days: '180' },
    { label: 'YTD', days: 'ytd' },
    { label: '1Y', days: '365' },
    { label: '3Y', days: '1095' },
    { label: '5Y', days: '1825' }
  ];

  const getFilteredData = (data, period) => {
    if (!data.length) return [];

    const currentDate = new Date();
    let startDate;

    if (period === 'ytd') {
      startDate = new Date(currentDate.getFullYear(), 0, 1);
    } else {
      startDate = new Date();
      startDate.setDate(currentDate.getDate() - parseInt(period));
    }

    return data.filter(point => {
      const pointDate = new Date(point[0]);
      return pointDate >= startDate;
    });
  };

  const fetchData = async () => {
    setLoading(true);
    const cacheKey = `stockData_${symbol}`;
    const cachedData = localStorage.getItem(cacheKey);

    if (cachedData) {
      const { data, timestamp } = JSON.parse(cachedData);
      if (Date.now() - timestamp < 24 * 60 * 60 * 1000) {
        setHistoricalData(data);
        setLoading(false);
        return;
      }
    }

    try {
      const response = await fetch(
        `https://financialmodelingprep.com/api/v3/historical-price-full/${symbol}?apikey=${apiKey}`
      );
      const data = await response.json();

      if (data.historical) {
        const processedData = data.historical.map(item => {
          const date = new Date(item.date).getTime();
          return [date, item.close];
        }).reverse();

        setHistoricalData(processedData);
        localStorage.setItem(cacheKey, JSON.stringify({
          data: processedData,
          timestamp: Date.now()
        }));
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [symbol]);

  const filteredData = useMemo(() => {
    return getFilteredData(historicalData, selectedPeriod);
  }, [historicalData, selectedPeriod]);

  useEffect(() => {
    if (filteredData.length > 0) {
      const start = filteredData[0][1]; // ราคาเริ่มต้น (ซ้ายสุด)
      const end = filteredData[filteredData.length - 1][1]; // ราคาล่าสุด (ขวาสุด)

      setStartPrice(start); // อัพเดตค่า startPrice ใน state
      setEndPrice(end); // อัพเดตค่า endPrice ใน state

      // เปลี่ยนสีตามเงื่อนไข
      setChartColor(start < end ? '#988BE8' : '#FF4560');
    }
  }, [filteredData]);

  const pricechangepercent = ((endPrice/startPrice)-1)*100;
  const pricechange = (endPrice-startPrice);
  const changeClass = (startPrice < endPrice ? 'up' : 'down');

  const chartOptions = {
    accessibility: {
      enabled: true // หรือ false ถ้าคุณไม่ต้องการให้มันเปิดใช้งาน
    },
    chart: {
      height: 500,
      backgroundColor: '#2C2C35',
      zoomType: null,  // ปิดการซูมโดยการตั้งค่าเป็น null
      scrollablePlotArea: {
        minWidth: null, // ไม่ให้พื้นที่กราฟขยายตามการ scroll
      },
    },
    title: {
      text: `${symbol}`,
      style: {
        color: '#FFF'
      }
    },
    navigator: {
      enabled: false
    },
    scrollbar: {
      enabled: false
    },
    rangeSelector: {
      enabled: false
    },
    series: [{
      name: symbol,
      data: filteredData,
      type: 'area', // ใช้ area แทน line
      color: chartColor,
      fillColor: {
        linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
        stops: [
          [0, Highcharts.color(chartColor).setOpacity(0.5).get('rgba')], // สี Gradient
          [1, Highcharts.color(chartColor).setOpacity(0).get('rgba')]
        ]
      },
      tooltip: {
        valueDecimals: 2
      }
    }],
    xAxis: {
      type: 'datetime',
      labels: {
        formatter: function() {
          return Highcharts.dateFormat('%e %b %y', this.value); // ฟอร์แมตวันที่ให้แสดงปี
        },
        style: {
          color: '#FFFFFF'
        }
      }
    },
    yAxis: {
      opposite: false,
      gridLineColor: false,
      plotLines: [{
        value: 0, // ตั้งค่าตำแหน่งของเส้น
        color: '#FFFFFF', // สีของเส้น
        width: 2 // ความหนาของเส้น
      }],
      labels: {
        formatter: function() {
          return this.value.toLocaleString('th-TH', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
          });
        },
        style: {
          color: '#FFFFFF'
        }
      }
    },
    tooltip: {
      shared: true,
      split: false,
      xDateFormat: '%e %b %Y',
      pointFormatter: function() {
        return `<span style="color:${this.color}">\u25CF</span> ${this.series.name}: <b>${this.y.toLocaleString('th-TH', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        })}</b><br/>`;
      }
    }
  };

  return (
    <div className="stock-chart-container">
      <div className="mb-4">
        <div>
          <div className='period-button-container'>
            {periods.map((period) => (
              <button 
                key={period.days}
                onClick={() => setSelectedPeriod(period.days)}
                className={`period-button ${selectedPeriod === period.days ? 'active' : ''}`}
              >
                {period.label}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className='pre-price-info'>
        <p>เปลี่ยนแปลง</p>
        <div className={`price-info ${changeClass}`}>
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#00E396"><path d="M444-192v-438L243-429l-51-51 288-288 288 288-51 51-201-201v438h-72Z"/></svg>
          <p>{pricechange !== null ? pricechange.toLocaleString('th-TH', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : 'N/A'}</p>
          <p>{pricechangepercent !== null ? pricechangepercent.toLocaleString('th-TH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })+ '%' : 'N/A'}</p>
        </div>
      </div>
      {loading ? (
        <div className="loading">
          <div className="text-gray-500">Loading...</div>
        </div>
      ) : (
        <HighchartsReact
          highcharts={Highcharts}
          constructorType={'stockChart'}
          options={chartOptions}
        />
      )}
    </div>
  );
};

export default StockChart;
