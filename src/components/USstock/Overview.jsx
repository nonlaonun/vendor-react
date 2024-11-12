import React, { useEffect, useState } from 'react';
import { NavLink, Routes, Route, Navigate, useParams, useNavigate } from 'react-router-dom';
import './Overview.css'
import StockChart from './StockChart';

function Overview({AllStockData}) {
  const [stockmetrics, setStockMetrics] = useState([]);
  const [stockquote, setStockquote] = useState([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const { symbol } = useParams();

  const apikey = import.meta.env.VITE_API_KEY;

  async function fetchStockMetrics(symbol) {
      const response = await fetch(`https://financialmodelingprep.com/api/v3/key-metrics-ttm/${symbol}?apikey=${apikey}`);
      const responseJson = await response.json();
      setStockMetrics(responseJson);
  }

  async function fetchquote(symbol) {
      const response = await fetch(`https://financialmodelingprep.com/api/v3/quote/${symbol}?apikey=${apikey}`);
      const responseJson = await response.json();
      setStockquote(responseJson);
  }


  useEffect(() => {
    fetchStockMetrics(symbol);
    fetchquote(symbol);
  }, [symbol]);

  const toggleContent = () => {
    setIsExpanded(!isExpanded);
  };
  
  const revpershare =  stockmetrics[0]?.revenuePerShareTTM;
  const netpershare =  stockmetrics[0]?.netIncomePerShareTTM;
  const ofcpershare =  stockmetrics[0]?.operatingCashFlowPerShareTTM;
  const fcfpershare =  stockmetrics[0]?.freeCashFlowPerShareTTM;

  const netmargin = (netpershare / revpershare)*100;
  const ofcmargin = (ofcpershare / revpershare)*100;
  const fcfmargin = (fcfpershare / revpershare)*100;

  const ccc = stockmetrics[0]?.daysOfInventoryOnHandTTM + stockmetrics[0]?.daysSalesOutstandingTTM - stockmetrics[0]?.daysPayablesOutstandingTTM;

  return (
    <div className='stock-overview'>
      <div className='stock-info-detail'>
        <div className='stock-description'>
          <div className='stock-description-title'>รายละเอียดบริษัท</div>
          <div className='stock-description-line'></div>
          <div id="stock-description-detail" className={isExpanded ? 'expanded' : ''}>{AllStockData[0]?.description}</div>
          <span className="read-more-btn" onClick={toggleContent}>
          {isExpanded ? 'ย่อเนื้อหา' : 'อ่านเพิ่มเติม'}
          </span>
        </div>
        <div className='stock-snap-shot'>
            <div className='stock-snap-shot-detail'>
                <p className='snap-metric'>ชื่อบริษัท</p>
                <p className='metric-detail'>{AllStockData[0]?.companyName ?? 'N/A'}</p>
            </div>
            <div className='stock-snap-shot-detail'>
                <p className='snap-metric'>CEO</p>
                <p className='metric-detail'>{AllStockData[0]?.ceo ?? 'N/A'}</p>
            </div>
            <div className='stock-snap-shot-detail'>
                <p className='snap-metric'>Sector</p>
                <p className='metric-detail'>{AllStockData[0]?.sector ?? 'N/A'}</p>
            </div>
            <div className='stock-snap-shot-detail'>
                <p className='snap-metric'>Website</p>
                <p className='metric-detail'>{AllStockData[0]?.website ?? 'N/A'}</p>
            </div>
            <div className='stock-snap-shot-detail'>
                <p className='snap-metric'>IPO</p>
                <p className='metric-detail'>{AllStockData[0]?.ipoDate ?? 'N/A'}</p>
            </div>
        </div>
        <div className='stock-financial-overview-table'>
        {/*   <div className='stock-financial-overview-table-title'>
            ตัวเลขทางการเงินเบื้องต้น
          </div> */}
              <div className='stock-financial-overview'>
                <div className='stock-financial-overview-column-1'>
                  {/* profile */}
                  <div className='profile'>
                    <div className='profile-title'>Profile</div>
                        <div className='profile-box'>
                            <div className='financial-list'>
                                <p className='financial-metric'>MarketCap</p>
                                <p className='financial-detail'>{AllStockData[0]?.mktCap != null ? (AllStockData[0].mktCap / 1e9).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })+ 'B' : 'N/A'}</p>
                            </div>
                            <div className='financial-list'>
                                <p className='financial-metric'>EPS</p>
                                <p className='financial-detail'> {stockquote[0]?.eps != null ? stockquote[0].eps.toFixed(1) : 'N/A'} </p>
                            </div>
                            <div className='financial-list'>
                                <p className='financial-metric'>จำนวนหุ้น</p>
                                <p className='financial-detail'>
                                    {stockquote[0]?.sharesOutstanding != null ? (stockquote[0].sharesOutstanding / 1e6).toLocaleString(undefined, { minimumFractionDigits: 1, maximumFractionDigits: 1 })+ 'M' : 'N/A'}</p>
                            </div>
                            <div className='financial-list'>
                                <p className='financial-metric'>จำนวนพนักงาน</p>
                                <p className='financial-detail'>{AllStockData[0]?.fullTimeEmployees ?? 'N/A'}</p>
                            </div>
                            <div className='financial-list'>
                                <p className='financial-metric'>Beta</p>
                                <p className='financial-detail'>{AllStockData[0]?.beta != null ? AllStockData[0].beta.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + 'x' : 'N/A'}</p>
                            </div>
                        </div>
                    </div>
                  {/*  margin  */}
                  <div className='margin'>
                      <div className='margin-title'>Margin</div>
                      <div className='margin-box'>
                          <div className='financial-list'>
                              <p className='financial-metric'>Net</p>
                              <p className='financial-detail'>{netmargin != null ? netmargin.toFixed(2)+ '%' : 'N/A'}</p>
                          </div>
                          <div className='financial-list'>
                              <p className='financial-metric'>OFC</p>
                              <p className='financial-detail'>{ofcmargin != null ? ofcmargin.toFixed(2)+ '%' : 'N/A'}</p>
                          </div>
                          <div className='financial-list'>
                              <p className='financial-metric'>FCF</p>
                              <p className='financial-detail'>{fcfmargin != null ? fcfmargin.toFixed(2)+ '%'  : 'N/A'}</p>
                          </div>
                      </div>
                  </div>
                  {/*  Return */}
                  <div className='return'>
                      <div className='return-title'>Return</div>
                      <div className='return-box'>
                          <div className='financial-list'>
                              <p className='financial-metric'>ROE</p>
                              <p className='financial-detail'>{stockmetrics[0]?.roeTTM != null ? (stockmetrics[0].roeTTM * 100).toFixed(2) + '%' : 'N/A'}</p>
                          </div>
                          <div className='financial-list'>
                              <p className='financial-metric'>ROIC</p>
                              <p className='financial-detail'>{stockmetrics[0]?.roicTTM != null ? (stockmetrics[0].roicTTM * 100).toFixed(2) + '%' : 'N/A'}</p>

                          </div>
                          <div className='financial-list'>
                              <p className='financial-metric'>ROTA</p>
                              <p className='financial-detail'>{stockmetrics[0]?.returnOnTangibleAssetsTTM != null ? (stockmetrics[0].returnOnTangibleAssetsTTM * 100).toFixed(2) + '%' : 'N/A'}</p>
                          </div>
                      </div>
                  </div>
                </div>
                {/* column-2 */}
                <div className='stock-financial-overview-column-2'>
                  {/* Valuation(TTM */}
                  <div className='valuation'>
                    <div className='valuation-title'>Valuation (x)</div>
                      <div className='valuation-box'>
                        <div className='financial-list'>
                            <p className='financial-metric'>P/S</p>
                            <p className='financial-detail'>{stockmetrics[0]?.priceToSalesRatioTTM != null ? stockmetrics[0].priceToSalesRatioTTM.toFixed(2) : 'N/A'}</p>
                        </div>
                        <div className='financial-list'>
                            <p className='financial-metric'>P/E</p>
                            <p className='financial-detail'>{stockmetrics[0]?.peRatioTTM != null ? stockmetrics[0].peRatioTTM.toFixed(2) : 'N/A'}</p>
                        </div>
                        <div className='financial-list'>
                            <p className='financial-metric'>P/OFC</p>
                            <p className='financial-detail'>{stockmetrics[0]?.pocfratioTTM != null ? stockmetrics[0].pocfratioTTM.toFixed(2) : 'N/A'}</p>
                        </div>
                        <div className='financial-list'>
                            <p className='financial-metric'>P/FCF</p>
                            <p className='financial-detail'>{stockmetrics[0]?.pfcfRatioTTM != null ? stockmetrics[0].pfcfRatioTTM.toFixed(2) : 'N/A'}</p>
                        </div>
                        <div className='financial-list'>
                            <p className='financial-metric'>P/B</p>
                            <p className='financial-detail'>{stockmetrics[0]?.pbRatioTTM != null ? stockmetrics[0].pbRatioTTM.toFixed(2) : 'N/A'}</p>
                        </div>
                        <div className='financial-list'>
                            <p className='financial-metric'>EV/S</p>
                            <p className='financial-detail'>{stockmetrics[0]?.evToSalesTTM != null ? stockmetrics[0].evToSalesTTM.toFixed(2) : 'N/A'}</p>
                        </div>
                        <div className='financial-list'>
                            <p className='financial-metric'>EV/EBITDA</p>
                            <p className='financial-detail'>{stockmetrics[0]?.enterpriseValueOverEBITDATTM != null ? stockmetrics[0].enterpriseValueOverEBITDATTM.toFixed(2) : 'N/A'}</p>
                        </div>
                        <div className='financial-list'>
                            <p className='financial-metric'>EV/FCF</p>
                            <p className='financial-detail'>{stockmetrics[0]?.evToFreeCashFlowTTM != null ? stockmetrics[0].evToFreeCashFlowTTM.toFixed(2) : 'N/A'}</p>
                        </div>
                      </div>
                  </div>
                  {/* Financial Health */}
                  <div className='fin-health'>
                    <div className='fin-health-title'>
                        Financial Health
                    </div>
                      <div className='fin-health-box'>
                        <div className='financial-list'>
                            <p className='financial-metric'>D/A</p>
                            <p className='financial-detail'>{stockmetrics[0]?.debtToAssetsTTM != null ? stockmetrics[0].debtToAssetsTTM.toFixed(2) + 'x' : 'N/A'}</p>
                        </div>
                        <div className='financial-list'>
                            <p className='financial-metric'>D/E</p>
                            <p className='financial-detail'>{stockmetrics[0]?.debtToEquityTTM != null ? stockmetrics[0].debtToEquityTTM.toFixed(2) + 'x' : 'N/A'}</p>
                        </div>
                        <div className='financial-list'>
                            <p className='financial-metric'>Current</p>
                            <p className='financial-detail'>{stockmetrics[0]?.currentRatioTTM != null ? stockmetrics[0].currentRatioTTM.toFixed(2) + 'x' : 'N/A'}</p>
                        </div>
                        <div className='financial-list'>
                            <p className='financial-metric'>ICR</p>
                            <p className='financial-detail'>{stockmetrics[0]?.interestCoverageTTM != null ? stockmetrics[0].interestCoverageTTM.toFixed(2) + 'x' : 'N/A'}</p>
                        </div>
                        <div className='financial-list'>
                            <p className='financial-metric'>คุณภาพกำไร</p>
                            <p className='financial-detail'>{stockmetrics[0]?.incomeQualityTTM != null ? stockmetrics[0].incomeQualityTTM.toFixed(2) + 'x' : 'N/A'}</p>
                        </div>
                      </div>
                  </div>
                </div>
                {/* column-3 */}
                <div className='stock-financial-overview-column-3'>
                  <div className='Yield'>
                      <div className='Yield-title'>
                        Yield
                      </div>
                      <div className='Yield-box'>
                        <div className='financial-list'>
                            <p className='financial-metric'>กำไรสุทธิ</p>
                            <p className='financial-detail'>{stockmetrics[0]?.earningsYieldTTM != null ? (stockmetrics[0].earningsYieldTTM * 100).toFixed(2) + '%' : 'N/A'}</p>
                        </div>
                        <div className='financial-list'>
                            <p className='financial-metric'>FCF</p>
                            <p className='financial-detail'>{stockmetrics[0]?.freeCashFlowYieldTTM != null ? (stockmetrics[0].freeCashFlowYieldTTM * 100).toFixed(2) + '%' : 'N/A'}</p>
                        </div>
                        <div className='financial-list'>
                            <p className='financial-metric'>ปันผล</p>
                            <p className='financial-detail'>{stockmetrics[0]?.dividendYieldTTM != null ? (stockmetrics[0].dividendYieldTTM * 100).toFixed(2) + '%' : 'N/A'}</p>
                        </div>
                        <div className='financial-list'>
                            <p className='financial-metric'>Payout</p>
                            <p className='financial-detail'>{stockmetrics[0]?.payoutRatioTTM != null ? (stockmetrics[0].payoutRatioTTM * 100).toFixed(2) + '%' : 'N/A'}</p>
                        </div>
                        <div className='financial-list'>
                            <p className='financial-metric'>DPS</p>
                            <p className='financial-detail'>{stockmetrics[0]?.dividendPerShareTTM != null ? stockmetrics[0].dividendPerShareTTM.toFixed(2) : 'N/A'}</p>
                        </div>
                      </div>
                  </div>
                  {/* Cash */}
                  <div className='Cash'>
                    <div className='Cash-title'>
                        วงจรเงินสด
                    </div>
                    <div className='Cash-box'>
                        <div className='financial-list'>
                            <p className='financial-metric'>DSO</p>
                            <p className='financial-detail'>{stockmetrics[0]?.daysSalesOutstandingTTM != null ? stockmetrics[0].daysSalesOutstandingTTM.toFixed(2)+ ' วัน' : 'N/A'}</p>
                        </div>
                        <div className='financial-list'>
                            <p className='financial-metric'>DPO</p>
                            <p className='financial-detail'>{stockmetrics[0]?.daysPayablesOutstandingTTM != null ? stockmetrics[0].daysPayablesOutstandingTTM.toFixed(2)+ ' วัน' : 'N/A'}</p>
                        </div>
                        <div className='financial-list'>
                            <p className='financial-metric'>DOH</p>
                            <p className='financial-detail'>{stockmetrics[0]?.daysOfInventoryOnHandTTM != null ? stockmetrics[0].daysOfInventoryOnHandTTM.toFixed(2)+ ' วัน' : 'N/A'}</p>
                        </div>
                        <div className='financial-list'>
                            <p className='financial-metric'>RTO</p>
                            <p className='financial-detail'>{stockmetrics[0]?.receivablesTurnoverTTM != null ? stockmetrics[0].receivablesTurnoverTTM.toFixed(2)+ 'x' : 'N/A'}</p>
                        </div>
                        <div className='financial-list'>
                            <p className='financial-metric'>PTO</p>
                            <p className='financial-detail'>{stockmetrics[0]?.payablesTurnoverTTM != null ? stockmetrics[0].payablesTurnoverTTM.toFixed(2)+ 'x' : 'N/A'}</p>
                        </div>
                        <div className='financial-list'>
                            <p className='financial-metric'>ITO</p>
                            <p className='financial-detail'>{stockmetrics[0]?.inventoryTurnoverTTM != null ? stockmetrics[0].inventoryTurnoverTTM.toFixed(2)+ 'x' : 'N/A'}</p>
                        </div>
                        <div className='financial-list'>
                            <p className='financial-metric'>CCC</p>
                            <p className='financial-detail'>{ccc != null ? ccc.toFixed(2)+ ' วัน' : 'N/A'}</p>
                        </div>
                    </div>
                  </div>
                </div>
              </div>
        </div>
      </div>{/* div ปิด stock-info-detail */}
      <div className='stock-chart'>
      <StockChart symbol={symbol} apiKey={apikey} />
      </div>
    </div>
  )
}

export default Overview
