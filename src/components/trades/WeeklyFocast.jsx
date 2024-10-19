import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom'; // Import useHistory from react-router-dom
import Heading from "../common/Heading";
import useAxios from '../../redux/useAxios';

const WeeklyFocast = () => {
  const api = useAxios();
  const [candles, setCandles] = useState([]);
  const history = useHistory(); // Initialize history

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

  // Function to handle "View More Details" button click
  const handleViewMore = (candle) => {
    history.push(`/candles/${candle.id}`, { candle }); // Navigate to the details page with candle data
  };

  return (
    <>
      <Heading title='Weekly Forecast' subtitle='Overview of what am looking for every currency for this Week' />
      <div className="content grid3 mtop">
        {candles
          .filter((candle) => candle.signal_candle)
          .sort((a, b) => b.is_active - a.is_active || b.id - a.id)
          .map((candle, index) => {
            const { signal_candle, currency_pair, trade_signal, is_active } = candle;

            return (
              <div className="box shadow" key={index}>
                <div className="img">
                  <img src={signal_candle} alt={currency_pair} />
                </div>
                <div className="text">
                  <div className="category flex">
                    <span style={{ background: "#f0f0f0", color: "#333" }}>
                      {currency_pair}
                    </span>
                    {/* Active/Inactive status */}
                    <div style={{ textAlign: "center", marginLeft: "10px" }}>
                      <span
                        style={{
                          color: is_active ? "green" : "gray",
                          fontSize: "26px", // Increase icon size
                          fontWeight: "bold",
                        }}
                      >
                        {is_active ? "✔" : "✖"}
                      </span>
                      <p
                        style={{
                          fontSize: "14px", // Increase text size
                          color: is_active ? "green" : "gray",
                          marginTop: "5px",
                        }}
                      >
                        {is_active ? "Active" : "Inactive"}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="button flex" style={{ justifyContent: "space-between" }}>
                  {/* BUY/SELL Button */}
                  <div>
                    <button
                      className="btn2"
                      style={{
                        backgroundColor: trade_signal.toUpperCase() === "BUY" ? "blue" : "red",
                        color: "#fff",
                        padding: "6px 12px", // Smaller padding
                        fontSize: "16px", // Smaller text size
                      }}
                    >
                      {trade_signal.toUpperCase()}
                    </button>
                  </div>

                  {/* View More Details Button */}
                  <div>
                    <button
                      className="btn2"
                      style={{ backgroundColor: "#ccc", color: "#333", padding: "6px 12px", fontSize: "18px", marginLeft: "10px" }}
                      onClick={() => handleViewMore(candle)}
                    >
                      View More Details
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default WeeklyFocast;
