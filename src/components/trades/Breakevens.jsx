import React, { useEffect, useState } from 'react';
import Heading from "../common/Heading"
import useAxios from '../../redux/useAxios';

const Breakevens = () => {

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
      <Heading title='Breakeven Trades' subtitle='These are the trades that have been entered and Now there in breakeven' />
      <div className="content grid3 mtop">
    
      {candles
        .filter((candle) => candle.breakeven_candle)
        .sort((a, b) => b.is_active - a.is_active || b.id - a.id)
        .slice(0, 8)
        .map((candle, index) => {
          const { breakeven_candle, currency_pair, is_active } = candle;
         return (
            <div className="box shadow" key={index}>
              <div className="img">
                <img src={breakeven_candle} alt={currency_pair} />
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
              </div>

              
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Breakevens;
