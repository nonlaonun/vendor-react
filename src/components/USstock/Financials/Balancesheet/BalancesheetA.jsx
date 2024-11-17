import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function BalancesheetA() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const apikey = import.meta.env.VITE_API_KEY;
  const { symbol } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://financialmodelingprep.com/api/v3/balance-sheet-statement/${symbol}?period=annual&apikey=${apikey}`);
        const result = await response.json();
        
        // ตรวจสอบว่า result เป็น array และไม่ว่างก่อนที่จะ setData
        if (Array.isArray(result) && result.length > 0) {
          setData(result);
        } else {
          console.error('Unexpected data format:', result);
          setData([]);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [symbol, apikey]);

  // ปรับ headers ให้ตรวจสอบข้อมูลก่อน
  const headers = [
    `หน่วย : ล้าน / สกุล : ${data[0]?.reportedCurrency || 'N/A'}`,
    ...(data.length > 0 ? data.map(item => item.date) : [])
  ];

  const Assets = [
    { label: "Cash and CashEquivalents", key: "cashAndCashEquivalents" },
    { label: "ShortTerm Investments", key: "shortTermInvestments" },
    { label: "cashAndShortTermInvestments", key: "cashAndShortTermInvestments" },
    { label: "netReceivables", key: "netReceivables" },
    { label: "inventory", key: "inventory" },
    { label: "otherCurrentAssets", key: "otherCurrentAssets" },
    { label: "totalCurrentAssets", key: "totalCurrentAssets" },
    { label: "propertyPlantEquipmentNet", key: "propertyPlantEquipmentNet" },
    { label: "goodwill", key: "goodwill" },
    { label: "intangibleAssets", key: "intangibleAssets" },
    { label: "longTermInvestments", key: "longTermInvestments" },
    { label: "taxAssets", key: "taxAssets" },
    { label: "otherNonCurrentAssets", key: "otherNonCurrentAssets" },
    { label: "totalNonCurrentAssets", key: "totalNonCurrentAssets" },
    { label: "otherAssets", key: "otherAssets" },
    { label: "totalAssets", key: "totalAssets" }
  ];

  const formatDataAssets = (item, entry) => {
    const { key } = item;
    const value = entry[key];
    if (typeof value === 'number') {
      return (value / 1000000).toLocaleString(undefined, {
        minimumFractionDigits: 1,
        maximumFractionDigits: 1,
      });
    }
    return '-'; // ถ้าไม่มีข้อมูลหรือไม่ใช่ตัวเลข
  };

  const Debt = [
    { label: "accountPayables", key: "accountPayables" },
    { label: "shortTermDebt", key: "shortTermDebt" },
    { label: "taxPayables", key: "taxPayables" },
    { label: "deferredRevenue", key: "deferredRevenue" },
    { label: "otherCurrentLiabilities", key: "otherCurrentLiabilities" },
    { label: "totalCurrentLiabilities", key: "totalCurrentLiabilities" },
    { label: "longTermDebt", key: "longTermDebt" },
    { label: "deferredRevenueNonCurrent", key: "deferredRevenueNonCurrent" },
    { label: "deferredTaxLiabilitiesNonCurrent", key: "deferredTaxLiabilitiesNonCurrent" },
    { label: "otherNonCurrentLiabilities", key: "otherNonCurrentLiabilities" },
    { label: "totalNonCurrentLiabilities", key: "totalNonCurrentLiabilities" },
    { label: "otherLiabilities", key: "otherLiabilities" },
    { label: "capitalLeaseObligations", key: "capitalLeaseObligations" },
    { label: "totalLiabilities", key: "totalLiabilities" }
  ];

  const formatDataDebt = (item, entry) => {
    const { key } = item;
    const value = entry[key];
    if (typeof value === 'number') {
      return (value / 1000000).toLocaleString(undefined, {
        minimumFractionDigits: 1,
        maximumFractionDigits: 1,
      });
    }
    return '-'; // ถ้าไม่มีข้อมูลหรือไม่ใช่ตัวเลข
  };


  const Equity = [
    { label: "preferredStock", key: "preferredStock" },
    { label: "commonStock", key: "commonStock" },
    { label: "taxPayables", key: "taxPayables" },
    { label: "retainedEarnings", key: "retainedEarnings" },
    { label: "accumulatedOtherComprehensiveIncomeLoss", key: "accumulatedOtherComprehensiveIncomeLoss" },
    { label: "othertotalStockholdersEquity", key: "othertotalStockholdersEquity" },
    { label: "totalStockholdersEquity", key: "totalStockholdersEquity" },
    { label: "totalEquity", key: "totalEquity" },
    { label: "totalLiabilitiesAndStockholdersEquity", key: "totalLiabilitiesAndStockholdersEquity" },
    { label: "minorityInterest", key: "minorityInterest" },
    { label: "totalLiabilitiesAndTotalEquity", key: "totalLiabilitiesAndTotalEquity" },
    { label: "totalInvestments", key: "totalInvestments" },
    { label: "totalDebt", key: "totalDebt" },
    { label: "netDebt", key: "netDebt" }
  ];

  const formatDataEquity = (item, entry) => {
    const { key } = item;
    const value = entry[key];
    if (typeof value === 'number') {
      return (value / 1000000).toLocaleString(undefined, {
        minimumFractionDigits: 1,
        maximumFractionDigits: 1,
      });
    }
    return '-'; // ถ้าไม่มีข้อมูลหรือไม่ใช่ตัวเลข
  };

  return (
    <div className="rendertable">
      <div className='precontainer'>
        <div className='title'>สินทรัพย์</div>
        <div className="container">
          <div className="row">
            {loading ? (
              <p className='Loading'>Loading...</p>
            ) : (
              data.length > 0 ? (
                <table>
                  <thead>
                    <tr>
                      {headers.map((header, index) => (
                        <th key={index} style={{ border: '1px solid black', padding: '8px' }}>{header}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {Assets.map((item, index) => (
                      <tr key={index}>
                        <td style={{ border: '1px solid black', padding: '8px' }}>{item.label}</td>
                        {data.map((entry, idx) => (
                          <td key={idx} style={{ border: "1px solid black", padding: "8px" }}>
                            {formatDataAssets(item, entry)}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (<p>ไม่พบข้อมูลสำหรับสัญลักษณ์นี้</p>)
            )}
          </div>
        </div>
      </div>

      <div className='precontainer'>
        <div className='title'>หนี้สิน</div>
        <div className="container">
          <div className="row">
            {loading ? (
              <p className='Loading'>Loading...</p>
            ) : (
              data.length > 0 ? (
                <table>
                  <thead>
                    <tr>
                      {headers.map((header, index) => (
                        <th key={index} style={{ border: '1px solid black', padding: '8px' }}>{header}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {Debt.map((item, index) => (
                      <tr key={index}>
                        <td style={{ border: '1px solid black', padding: '8px' }}>{item.label}</td>
                        {data.map((entry, idx) => (
                          <td key={idx} style={{ border: "1px solid black", padding: "8px" }}>
                            {formatDataDebt(item, entry)}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (<p>ไม่พบข้อมูลสำหรับสัญลักษณ์นี้</p>)
            )}
          </div>
        </div>
      </div>

      <div className='precontainer'>
        <div className='title'>ส่วนของผู้ถือหุ้น</div>
        <div className="container">
          <div className="row">
            {loading ? (
              <p className='Loading'>Loading...</p>
            ) : (
              data.length > 0 ? (
                <table>
                  <thead>
                    <tr>
                      {headers.map((header, index) => (
                        <th key={index} style={{ border: '1px solid black', padding: '8px' }}>{header}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {Equity.map((item, index) => (
                      <tr key={index}>
                        <td style={{ border: '1px solid black', padding: '8px' }}>{item.label}</td>
                        {data.map((entry, idx) => (
                          <td key={idx} style={{ border: "1px solid black", padding: "8px" }}>
                            {formatDataEquity(item, entry)}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (<p>ไม่พบข้อมูลสำหรับสัญลักษณ์นี้</p>)
            )}
          </div>
        </div>
      </div>

      <div className='sec-link-box'>
        ที่มาของบการเงิน : <a className='sec-link' href={data[0]?.finalLink} target="_blank" rel="noopener noreferrer">{data[0]?.finalLink}</a>
      </div>
    </div>
  );
}

export default BalancesheetA;
