import React, { useState } from "react";
import { useLocation } from 'react-router-dom';
import Back from "../common/Back";
import Heading from "../common/Heading";
import img from "../images/hero1.jpg";
import "./OnePairDetails.css"; // Assuming custom styles here
import AdditionalInfo from "./AdditionalInfo"; // The new component for extra images and info

const OnePairDetails = () => {
  const location = useLocation();
  const { candle } = location.state; // Extract the candle data from the state

  // State to manage visibility of the additional component
  const [showMore, setShowMore] = useState(false);

  // Handle the "More About" button click
  const handleShowMore = () => {
    setShowMore(!showMore); // Toggle between show and hide
  };

  return (
    <>
      <section className='about'>
        <Back name='About : ' title={candle.currency_pair} cover={img} />
        <div className='container flex mtop'>
          <div className='left row'>
            <Heading title='MGI Candles Idea' subtitle='Check out our forex journal and Currency movements' />
            <p>The MGI candles idea showcases a unique method of reading price movements through specific candle formations. By combining multiple timeframes, it helps traders identify strong momentum shifts and potential reversals in the market.</p>
            <p>Below are the reasons for entering the <strong>{candle.currency_pair}</strong> pair trade based on the current strategy.</p>

            <div className='trade-details'>
              <p>Candle Pattern in 30min / 1hr ? ---- <strong>Candle Pattern: {candle.candle_pattern}</strong></p>
              <p>London / New York Ladder Kill zone ? ---- <strong>Session: {candle.session}</strong></p>
              <p>Candle Pattern in 30min / 1hr ? ---- <strong>Candle Pattern: {candle.candle_pattern}</strong></p>
              <p>61% Fibonacci in 15min candles ? ---- <strong>Fibonacci Level: {candle.fibonacci_level}</strong></p>
            </div>

            <button className='btn2' onClick={handleShowMore}>
              {showMore ? "Hide Details" : `More About ${candle.currency_pair}`}
            </button>
          </div>

          <div className='right row'>
            <img src={candle.entry_candle} alt="Signal Candle" className="candle-image" />
          </div>
        </div>
      </section>

      {/* Conditionally render the additional component */}
     {showMore && <AdditionalInfo candle={candle} />}

    </>
  );
};

export default OnePairDetails;
