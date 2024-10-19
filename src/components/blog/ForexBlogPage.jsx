import React, { useEffect, useState } from 'react';
import Heading from "../common/Heading";
import useAxios from '../../redux/useAxios';

const ForexBlogPage = () => {
  const api = useAxios();
  const [candles, setCandles] = useState([]);

  const fetchCandles = async () => {
    try {
      const response = await api.get('/mgi/mgicandles/');
      setCandles(response.data);
    } catch (error) {
      console.error('Error fetching MGI candles:', error);
    }
  };

  useEffect(() => {
    fetchCandles();
  }, []);

  return (
    <>
      <Heading 
  title="Recent Profit Takes: Celebrating Successful Trades in the Forex Market" 
  subtitle="Explore our recent trades that have achieved their take profits, showcasing the effectiveness of our proven strategies and signals."
/>
 <div className="content grid3 mtop">
        {candles
          .filter((candle) => candle.take_profit_candle)
          .sort((a, b) => b.is_active - a.is_active || b.id - a.id)
          .slice(0, 8)
          .map((candle, index) => {
            const { take_profit_candle, currency_pair, is_active } = candle;
            return (
              <div className="box shadow" key={index}>
                <div className="img">
                  <img src={take_profit_candle} alt={currency_pair} />
                </div>
                <div className="text">
                  <div className="category flex">
                    <span
                      style={{
                        background: "#f0f0f0",
                        color: "#333",
                      }}
                    >
                      {currency_pair}
                    </span>
                    {/* Render a tick for active/inactive with label below */}
                    <div style={{ textAlign: "center", marginLeft: "10px" }}>
                      <span
                        style={{
                          color: is_active ? "green" : "gray", // Green for active, gray for inactive
                          fontSize: "20px", // Large tick size
                        }}
                      >
                        {is_active ? "✔" : "✖"} {/* Tick for active, cross for inactive */}
                      </span>
                      <p
                        style={{
                          fontSize: "12px",
                          color: is_active ? "green" : "gray",
                          marginTop: "5px",
                        }}
                      >
                        {is_active ? "Active" : "Inactive"} {/* Active/Inactive label */}
                      </p>
                    </div>
                  </div>

                  {/* Add paragraph description */}
                  <p style={{ marginTop: '10px', fontSize: '14px', color: '#555' }}>
                    Today we took a risk of 36 Pips and achieved a profit of 36+ pips using the MGI Candles trading strategy.
                    The risk-to-reward ratio was 1:1.
                  </p>

                  {/* Add the rounded 'Join Us' button */}
                  <button
                    style={{
                      marginTop: '15px',
                      padding: '10px 20px',
                      backgroundColor: '#007bff',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '25px', // Rounded edges
                      cursor: 'pointer',
                      fontSize: '14px',
                    }}
                    onClick={() => window.location.href = '/join'}
                  >
                    Learn More
                  </button>
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default ForexBlogPage;
