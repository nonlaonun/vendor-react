import React, { useEffect, useState } from 'react';
import { NavLink, Routes, useParams } from 'react-router-dom';
import './Incomestatement.css'


function IncomeA() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    
    const apikey = import.meta.env.VITE_API_KEY;
    const { symbol } = useParams();

    /* const mockData = [
      {
        date: "2023-12-31",
        revenue: 120000,
        costOfRevenue: 80000,
        grossProfit: 40000,
        grossProfitRatio: 0.33,
        researchAndDevelopmentExpenses: 15000,
        generalAndAdministrativeExpenses: 10000,
        sellingAndMarketingExpenses: 12000,
        operatingExpenses: 37000,
        interestIncome: 2000,
        interestExpense: 5000,
        ebitda: 37000,
        netIncome: 23000,
        eps: 1.5,
        weightedAverageShsOut: 15000,
        weightedAverageShsOutDil: 15500,
      },
      {
        date: "2022-12-31",
        revenue: 110000,
        costOfRevenue: 75000,
        grossProfit: 35000,
        grossProfitRatio: 0.32,
        researchAndDevelopmentExpenses: 12000,
        generalAndAdministrativeExpenses: 9000,
        sellingAndMarketingExpenses: 10000,
        operatingExpenses: 31000,
        interestIncome: 2500,
        interestExpense: 4000,
        ebitda: 34000,
        netIncome: 20000,
        eps: 1.4,
        weightedAverageShsOut: 15000,
        weightedAverageShsOutDil: 15500,
      },
      {
        date: "2021-12-31",
        revenue: 105000,
        costOfRevenue: 70000,
        grossProfit: 35000,
        grossProfitRatio: 0.33,
        researchAndDevelopmentExpenses: 10000,
        generalAndAdministrativeExpenses: 8000,
        sellingAndMarketingExpenses: 9000,
        operatingExpenses: 27000,
        interestIncome: 3000,
        interestExpense: 3000,
        ebitda: 33000,
        netIncome: 19000,
        eps: 1.3,
        weightedAverageShsOut: 15000,
        weightedAverageShsOutDil: 15500,
      },
      {
        date: "2021-12-31",
        revenue: 105000,
        costOfRevenue: 70000,
        grossProfit: 35000,
        grossProfitRatio: 0.33,
        researchAndDevelopmentExpenses: 10000,
        generalAndAdministrativeExpenses: 8000,
        sellingAndMarketingExpenses: 9000,
        operatingExpenses: 27000,
        interestIncome: 3000,
        interestExpense: 3000,
        ebitda: 33000,
        netIncome: 19000,
        eps: 1.3,
        weightedAverageShsOut: 15000,
        weightedAverageShsOutDil: 15500,
      },
      {
        date: "2021-12-31",
        revenue: 105000,
        costOfRevenue: 70000,
        grossProfit: 35000,
        grossProfitRatio: 0.33,
        researchAndDevelopmentExpenses: 10000,
        generalAndAdministrativeExpenses: 8000,
        sellingAndMarketingExpenses: 9000,
        operatingExpenses: 27000,
        interestIncome: 3000,
        interestExpense: 3000,
        ebitda: 33000,
        netIncome: 19000,
        eps: 1.3,
        weightedAverageShsOut: 15000,
        weightedAverageShsOutDil: 15500,
      },
      {
        date: "2021-12-31",
        revenue: 105000,
        costOfRevenue: 70000,
        grossProfit: 35000,
        grossProfitRatio: 0.33,
        researchAndDevelopmentExpenses: 10000,
        generalAndAdministrativeExpenses: 8000,
        sellingAndMarketingExpenses: 9000,
        operatingExpenses: 27000,
        interestIncome: 3000,
        interestExpense: 3000,
        ebitda: 33000,
        netIncome: 19000,
        eps: 1.3,
        weightedAverageShsOut: 15000,
        weightedAverageShsOutDil: 15500,
      },
      {
        date: "2021-12-31",
        revenue: 105000,
        costOfRevenue: 70000,
        grossProfit: 35000,
        grossProfitRatio: 0.33,
        researchAndDevelopmentExpenses: 10000,
        generalAndAdministrativeExpenses: 8000,
        sellingAndMarketingExpenses: 9000,
        operatingExpenses: 27000,
        interestIncome: 3000,
        interestExpense: 3000,
        ebitda: 33000,
        netIncome: 19000,
        eps: 1.3,
        weightedAverageShsOut: 15000,
        weightedAverageShsOutDil: 15500,
      },
      {
        date: "2021-12-31",
        revenue: 105000,
        costOfRevenue: 70000,
        grossProfit: 35000,
        grossProfitRatio: 0.33,
        researchAndDevelopmentExpenses: 10000,
        generalAndAdministrativeExpenses: 8000,
        sellingAndMarketingExpenses: 9000,
        operatingExpenses: 27000,
        interestIncome: 3000,
        interestExpense: 3000,
        ebitda: 33000,
        netIncome: 19000,
        eps: 1.3,
        weightedAverageShsOut: 15000,
        weightedAverageShsOutDil: 15500,
      },
      {
        date: "2021-12-31",
        revenue: 105000,
        costOfRevenue: 70000,
        grossProfit: 35000,
        grossProfitRatio: 0.33,
        researchAndDevelopmentExpenses: 10000,
        generalAndAdministrativeExpenses: 8000,
        sellingAndMarketingExpenses: 9000,
        operatingExpenses: 27000,
        interestIncome: 3000,
        interestExpense: 3000,
        ebitda: 33000,
        netIncome: 19000,
        eps: 1.3,
        weightedAverageShsOut: 15000,
        weightedAverageShsOutDil: 15500,
      },
      {
        date: "2021-12-31",
        revenue: 105000,
        costOfRevenue: 70000,
        grossProfit: 35000,
        grossProfitRatio: 0.33,
        researchAndDevelopmentExpenses: 10000,
        generalAndAdministrativeExpenses: 8000,
        sellingAndMarketingExpenses: 9000,
        operatingExpenses: 27000,
        interestIncome: 3000,
        interestExpense: 3000,
        ebitda: 33000,
        netIncome: 19000,
        eps: 1.3,
        weightedAverageShsOut: 15000,
        weightedAverageShsOutDil: 15500,
      },
      {
        date: "2021-12-31",
        revenue: 105000,
        costOfRevenue: 70000,
        grossProfit: 35000,
        grossProfitRatio: 0.33,
        researchAndDevelopmentExpenses: 10000,
        generalAndAdministrativeExpenses: 8000,
        sellingAndMarketingExpenses: 9000,
        operatingExpenses: 27000,
        interestIncome: 3000,
        interestExpense: 3000,
        ebitda: 33000,
        netIncome: 19000,
        eps: 1.3,
        weightedAverageShsOut: 15000,
        weightedAverageShsOutDil: 15500,
      },
      {
        date: "2021-12-31",
        revenue: 105000,
        costOfRevenue: 70000,
        grossProfit: 35000,
        grossProfitRatio: 0.33,
        researchAndDevelopmentExpenses: 10000,
        generalAndAdministrativeExpenses: 8000,
        sellingAndMarketingExpenses: 9000,
        operatingExpenses: 27000,
        interestIncome: 3000,
        interestExpense: 3000,
        ebitda: 33000,
        netIncome: 19000,
        eps: 1.3,
        weightedAverageShsOut: 15000,
        weightedAverageShsOutDil: 15500,
      },
      {
        date: "2021-12-31",
        revenue: 105000,
        costOfRevenue: 70000,
        grossProfit: 35000,
        grossProfitRatio: 0.33,
        researchAndDevelopmentExpenses: 10000,
        generalAndAdministrativeExpenses: 8000,
        sellingAndMarketingExpenses: 9000,
        operatingExpenses: 27000,
        interestIncome: 3000,
        interestExpense: 3000,
        ebitda: 33000,
        netIncome: 19000,
        eps: 1.3,
        weightedAverageShsOut: 15000,
        weightedAverageShsOutDil: 15500,
      },
      {
        date: "2021-12-31",
        revenue: 105000,
        costOfRevenue: 70000,
        grossProfit: 35000,
        grossProfitRatio: 0.33,
        researchAndDevelopmentExpenses: 10000,
        generalAndAdministrativeExpenses: 8000,
        sellingAndMarketingExpenses: 9000,
        operatingExpenses: 27000,
        interestIncome: 3000,
        interestExpense: 3000,
        ebitda: 33000,
        netIncome: 19000,
        eps: 1.3,
        weightedAverageShsOut: 15000,
        weightedAverageShsOutDil: 15500,
      },
      {
        date: "2021-12-31",
        revenue: 105000,
        costOfRevenue: 70000,
        grossProfit: 35000,
        grossProfitRatio: 0.33,
        researchAndDevelopmentExpenses: 10000,
        generalAndAdministrativeExpenses: 8000,
        sellingAndMarketingExpenses: 9000,
        operatingExpenses: 27000,
        interestIncome: 3000,
        interestExpense: 3000,
        ebitda: 33000,
        netIncome: 19000,
        eps: 1.3,
        weightedAverageShsOut: 15000,
        weightedAverageShsOutDil: 15500,
      },
      {
        date: "2021-12-31",
        revenue: 105000,
        costOfRevenue: 70000,
        grossProfit: 35000,
        grossProfitRatio: 0.33,
        researchAndDevelopmentExpenses: 10000,
        generalAndAdministrativeExpenses: 8000,
        sellingAndMarketingExpenses: 9000,
        operatingExpenses: 27000,
        interestIncome: 3000,
        interestExpense: 3000,
        ebitda: 33000,
        netIncome: 19000,
        eps: 1.3,
        weightedAverageShsOut: 15000,
        weightedAverageShsOutDil: 15500,
      },
      {
        date: "2021-12-31",
        revenue: 105000,
        costOfRevenue: 70000,
        grossProfit: 35000,
        grossProfitRatio: 0.33,
        researchAndDevelopmentExpenses: 10000,
        generalAndAdministrativeExpenses: 8000,
        sellingAndMarketingExpenses: 9000,
        operatingExpenses: 27000,
        interestIncome: 3000,
        interestExpense: 3000,
        ebitda: 33000,
        netIncome: 19000,
        eps: 1.3,
        weightedAverageShsOut: 15000,
        weightedAverageShsOutDil: 15500,
      },
      {
        date: "2021-12-31",
        revenue: 105000,
        costOfRevenue: 70000,
        grossProfit: 35000,
        grossProfitRatio: 0.33,
        researchAndDevelopmentExpenses: 10000,
        generalAndAdministrativeExpenses: 8000,
        sellingAndMarketingExpenses: 9000,
        operatingExpenses: 27000,
        interestIncome: 3000,
        interestExpense: 3000,
        ebitda: 33000,
        netIncome: 19000,
        eps: 1.3,
        weightedAverageShsOut: 15000,
        weightedAverageShsOutDil: 15500,
      },
      {
        date: "2021-12-31",
        revenue: 105000,
        costOfRevenue: 70000,
        grossProfit: 35000,
        grossProfitRatio: 0.33,
        researchAndDevelopmentExpenses: 10000,
        generalAndAdministrativeExpenses: 8000,
        sellingAndMarketingExpenses: 9000,
        operatingExpenses: 27000,
        interestIncome: 3000,
        interestExpense: 3000,
        ebitda: 33000,
        netIncome: 19000,
        eps: 1.3,
        weightedAverageShsOut: 15000,
        weightedAverageShsOutDil: 15500,
      },
      {
        date: "2021-12-31",
        revenue: 105000,
        costOfRevenue: 70000,
        grossProfit: 35000,
        grossProfitRatio: 0.33,
        researchAndDevelopmentExpenses: 10000,
        generalAndAdministrativeExpenses: 8000,
        sellingAndMarketingExpenses: 9000,
        operatingExpenses: 27000,
        interestIncome: 3000,
        interestExpense: 3000,
        ebitda: 33000,
        netIncome: 19000,
        eps: 1.3,
        weightedAverageShsOut: 15000,
        weightedAverageShsOutDil: 15500,
      },
      {
        date: "2021-12-31",
        revenue: 105000,
        costOfRevenue: 70000,
        grossProfit: 35000,
        grossProfitRatio: 0.33,
        researchAndDevelopmentExpenses: 10000,
        generalAndAdministrativeExpenses: 8000,
        sellingAndMarketingExpenses: 9000,
        operatingExpenses: 27000,
        interestIncome: 3000,
        interestExpense: 3000,
        ebitda: 33000,
        netIncome: 19000,
        eps: 1.3,
        weightedAverageShsOut: 15000,
        weightedAverageShsOutDil: 15500,
      },
      {
        date: "2021-12-31",
        revenue: 105000,
        costOfRevenue: 70000,
        grossProfit: 35000,
        grossProfitRatio: 0.33,
        researchAndDevelopmentExpenses: 10000,
        generalAndAdministrativeExpenses: 8000,
        sellingAndMarketingExpenses: 9000,
        operatingExpenses: 27000,
        interestIncome: 3000,
        interestExpense: 3000,
        ebitda: 33000,
        netIncome: 19000,
        eps: 1.3,
        weightedAverageShsOut: 15000,
        weightedAverageShsOutDil: 15500,
      },
      {
        date: "2021-12-31",
        revenue: 105000,
        costOfRevenue: 70000,
        grossProfit: 35000,
        grossProfitRatio: 0.33,
        researchAndDevelopmentExpenses: 10000,
        generalAndAdministrativeExpenses: 8000,
        sellingAndMarketingExpenses: 9000,
        operatingExpenses: 27000,
        interestIncome: 3000,
        interestExpense: 3000,
        ebitda: 33000,
        netIncome: 19000,
        eps: 1.3,
        weightedAverageShsOut: 15000,
        weightedAverageShsOutDil: 15500,
      },
      {
        date: "2021-12-31",
        revenue: 105000,
        costOfRevenue: 70000,
        grossProfit: 35000,
        grossProfitRatio: 0.33,
        researchAndDevelopmentExpenses: 10000,
        generalAndAdministrativeExpenses: 8000,
        sellingAndMarketingExpenses: 9000,
        operatingExpenses: 27000,
        interestIncome: 3000,
        interestExpense: 3000,
        ebitda: 33000,
        netIncome: 19000,
        eps: 1.3,
        weightedAverageShsOut: 15000,
        weightedAverageShsOutDil: 15500,
      },
      {
        date: "2021-12-31",
        revenue: 105000,
        costOfRevenue: 70000,
        grossProfit: 35000,
        grossProfitRatio: 0.33,
        researchAndDevelopmentExpenses: 10000,
        generalAndAdministrativeExpenses: 8000,
        sellingAndMarketingExpenses: 9000,
        operatingExpenses: 27000,
        interestIncome: 3000,
        interestExpense: 3000,
        ebitda: 33000,
        netIncome: 19000,
        eps: 1.3,
        weightedAverageShsOut: 15000,
        weightedAverageShsOutDil: 15500,
      },
      {
        date: "2021-12-31",
        revenue: 105000,
        costOfRevenue: 70000,
        grossProfit: 35000,
        grossProfitRatio: 0.33,
        researchAndDevelopmentExpenses: 10000,
        generalAndAdministrativeExpenses: 8000,
        sellingAndMarketingExpenses: 9000,
        operatingExpenses: 27000,
        interestIncome: 3000,
        interestExpense: 3000,
        ebitda: 33000,
        netIncome: 19000,
        eps: 1.3,
        weightedAverageShsOut: 15000,
        weightedAverageShsOutDil: 15500,
      },
      {
        date: "2021-12-31",
        revenue: 105000,
        costOfRevenue: 70000,
        grossProfit: 35000,
        grossProfitRatio: 0.33,
        researchAndDevelopmentExpenses: 10000,
        generalAndAdministrativeExpenses: 8000,
        sellingAndMarketingExpenses: 9000,
        operatingExpenses: 27000,
        interestIncome: 3000,
        interestExpense: 3000,
        ebitda: 33000,
        netIncome: 19000,
        eps: 1.3,
        weightedAverageShsOut: 15000,
        weightedAverageShsOutDil: 15500,
      },
    ];

    useEffect(() => {
      const fetchData = async () => {
        // หากคุณต้องการใช้ mock data
        setData(mockData);
        setLoading(false);
      };
    
      fetchData();
    }, []); */

    
    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch(`https://financialmodelingprep.com/api/v3/income-statement/${symbol}?period=annual&apikey=${apikey}`);
            const result = await response.json();
            setData(result);
          } catch (error) {
            console.error('Error fetching data:', error);
          } finally {
            setLoading(false);
          }
        };
    
        fetchData();
      }, [symbol]);

    // กำหนด headers โดยใช้ปีจากข้อมูลที่ได้รับ
    const headers = [
    `หน่วย : ล้าน / สกุล : ${data[0]?.reportedCurrency}`,
    ...(data.length > 0 ? data.map(item => item.date) : [])
  ];

    const headers2 = [
    `รายการ`,
    ...(data.length > 0 ? data.map(item => item.date) : [])
  ];

  const items = [
    { label: "Revenue", key: "revenue" },
    { label: "Cost of Revenue", key: "costOfRevenue" },
    { label: "Gross Profit", key: "grossProfit" },
    { label: "Research and Development Expenses", key: "researchAndDevelopmentExpenses" },
    { label: "General and Administrative Expenses", key: "generalAndAdministrativeExpenses" },
    { label: "Selling and Marketing Expenses", key: "sellingAndMarketingExpenses" },
    { label: "Total Cost and Expenses ", key: "costAndExpenses" },
    { label: "Operating Expenses", key: "operatingExpenses" },
    { label: "Operating Income", key: "operatingIncome" },
    { label: "Interest Income", key: "interestIncome" },
    { label: "Interest Expense", key: "interestExpense" },
    { label: "Net Income", key: "netIncome" },
    { label: "EPS", key: "eps" },
    { label: "EBITDA", key: "ebitda" },
    { label: "Shareout", key: "weightedAverageShsOut" },
    { label: "Shareout Diluted", key: "weightedAverageShsOutDil" },
  ];

  const itemratios = [
    { label: "Gross Profit Margin (%)", key: "grossProfitRatio" },
    { label: "Operating Margin (%)", key: "operatingmargin" },
    { label: "Net Profit Margin (%)", key: "netIncomeMargin" },
    { label: "EBITDA Margin (%)", key: "ebitdaMargin" },
  ];

  const formatData = (item, entry) => {
    const { key } = item;
    const value = entry[key];
  
    // ตรวจสอบเงื่อนไขแต่ละกรณี
    if (key === "eps") {
      return value;
    } else {
      return (value / 1000000).toLocaleString(undefined, { minimumFractionDigits: 1, maximumFractionDigits: 1 });
    }
  };

  const formatDataratio = (itemratio, entry) => {
    const { key } = itemratio;
    const value = entry[key];
  
    // ตรวจสอบเงื่อนไขแต่ละกรณี
    if (key === "grossProfitRatio") {
      return `${(value * 100).toLocaleString(undefined, { minimumFractionDigits: 1, maximumFractionDigits: 1 })} %`;

    } else if (key === "operatingmargin") {
      const operatingmargin = (entry.operatingIncome / entry.revenue) * 100;
      return `${operatingmargin.toLocaleString(undefined, { minimumFractionDigits: 1, maximumFractionDigits: 1 })} %`;
    
    } else if (key === "netIncomeMargin") {
      const netIncomeMargin = (entry.netIncome / entry.revenue) * 100;
      return `${netIncomeMargin.toLocaleString(undefined, { minimumFractionDigits: 1, maximumFractionDigits: 1 })} %`;

    } else if (key === "ebitdaMargin") {
      const ebitdaMargin = (entry.ebitda / entry.revenue) * 100;
      return `${ebitdaMargin.toLocaleString(undefined, { minimumFractionDigits: 1, maximumFractionDigits: 1 })} %`;

    } else {
      return (value / 1000000).toLocaleString(undefined, { minimumFractionDigits: 1, maximumFractionDigits: 1 });
    }
  };

  // ฟังก์ชันคำนวณอัตราการเติบโต
const formatGrowthData = (data, key) => {
  const growthRates = [];
  
  for (let i = 0; i < data.length - 1; i++) {
    const current = data[i][key];
    const previous = data[i + 1][key];
    const growthRate = ((current / previous) - 1) * 100;
    growthRates.push(growthRate.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' %');
  }

  growthRates.push('-'); // สำหรับปีสุดท้ายที่ไม่มีข้อมูลการเติบโต
  return growthRates;
};

// ฟังก์ชันคำนวณต้นทุนแปรผัน
const calculateVariableCost = (data) => {
  return data.map(entry => entry.costOfRevenue + entry.sellingAndMarketingExpenses);
};

// คำนวณการเติบโตของ revenue
const revenueGrowthRates = formatGrowthData(data, "revenue");

// ฟังก์ชันคำนวณการเติบโตของต้นทุนแปรผัน
const variableCostGrowthRates = formatGrowthData(
  data.map(entry => ({ variableCost: entry.costOfRevenue + entry.sellingAndMarketingExpenses })),
  "variableCost"
);

// ฟังก์ชันคำนวณต้นทุนแปรผันต่อการเติบโตของรายได้ (ไม่คูณ 100)
const calculateVariableCostToRevenueGrowth = (variableCostGrowthRates, revenueGrowthRates) => {
  const variableCostToRevenueGrowthRates = [];
  
  for (let i = 0; i < revenueGrowthRates.length - 1; i++) {
    const revenueGrowthRate = parseFloat(revenueGrowthRates[i]);
    const variableCostGrowthRate = parseFloat(variableCostGrowthRates[i]);
    const costToRevenueRatio = revenueGrowthRate ? (variableCostGrowthRate / revenueGrowthRate) : '-';
    variableCostToRevenueGrowthRates.push(
      costToRevenueRatio !== '-' ? costToRevenueRatio.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : '-'
    );
  }

  variableCostToRevenueGrowthRates.push('-'); // สำหรับปีสุดท้าย
  return variableCostToRevenueGrowthRates;
};

// คำนวณการเปรียบเทียบระหว่างการเติบโตของ variable cost และ revenue
const variableCostToRevenueGrowthRates = calculateVariableCostToRevenueGrowth(variableCostGrowthRates, revenueGrowthRates);


return (
  <div className="rendertable">
    <div className='precontainer'>
      <div className="container">
        <div className="row">
        {loading ? (
          <p className='Loading'>Loading...</p> // แสดงข้อความระหว่างที่โหลดข้อมูล
        ) : (
          <table>
            <thead>
              <tr>
                {headers.map((header, index) => (
                  <th key={index} style={{ border: '1px solid black', padding: '8px' }}>{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr key={index}>
                  <td style={{ border: '1px solid black', padding: '8px' }}>{item.label}</td>
                  {data.length > 0 && (
                    <>
                      {data.map((entry, idx) => (
                          <td key={idx} style={{ border: "1px solid black", padding: "8px" }}>
                          {formatData(item, entry)}
                          </td>
                      ))}
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        )}
        </div>
      </div>
    </div>

    <div className='precontainer'>
      <div className='title'>อัตรากำไร</div>
      <div className="container2"> 
        <div className="row">
        {loading ? (
          <p className='Loading'>Loading...</p> // แสดงข้อความระหว่างที่โหลดข้อมูล
        ) : (
          <table>
            <thead>
              <tr>
                {headers2.map((header, index) => (
                  <th key={index} style={{ border: '1px solid black', padding: '8px' }}>{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {itemratios.map((itemratio, index) => (
                <tr key={index}>
                  <td style={{ border: '1px solid black', padding: '8px' }}>{itemratio.label}</td>
                  {data.length > 0 && (
                    <>
                      {data.map((entry, idx) => (
                          <td key={idx} style={{ border: "1px solid black", padding: "8px" }}>
                          {formatDataratio(itemratio, entry)}
                          </td>
                      ))}
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        )}
        </div>
      </div>
    </div>

    <div className='precontainer'>
      <div className='title'>อัตราการเติบโตของต้นทุนแปรผัน</div>
      <div className="container2">
        <div className="row">
        {loading ? (
          <p className='Loading'>Loading...</p>
        ) : (
          <table>
            <thead>
              <tr>
                {headers2.map((header, index) => (
                  <th key={index} style={{ border: '1px solid black', padding: '8px' }}>{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ border: '1px solid black', padding: '8px' }}>Revenue Growth (%)</td>
                {revenueGrowthRates.map((rate, idx) => (
                  <td key={idx} style={{ border: "1px solid black", padding: "8px" }}>
                    {rate}
                  </td>
                ))}
              </tr>
              <tr>
                <td style={{ border: '1px solid black', padding: '8px' }}>Variable Cost Growth (%)</td>
                {variableCostGrowthRates.map((rate, idx) => (
                  <td key={idx} style={{ border: "1px solid black", padding: "8px" }}>
                    {rate}
                  </td>
                ))}
              </tr>
              <tr>
                <td style={{ border: '1px solid black', padding: '8px' }}>Variable Cost to Revenue Growth (X)</td>
                {variableCostToRevenueGrowthRates.map((rate, idx) => (
                  <td key={idx} style={{ border: "1px solid black", padding: "8px" }}>
                    {rate}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        )}
        </div>
      </div>
    </div>
  </div>
  );
};

export default IncomeA