import React from 'react';
import './AdditionalInfo.css'; // Make sure to create and link this CSS file

const AdditionalInfo = ({ candle }) => {
  const images = [
    { src: candle.entry_candle, description: "Signal For Entry" },
    { src: candle.breakeven_candle, description: "Breakeven after 20+ pips" },
    { src: candle.take_profit_candle, description: "Take profit with 40+ pips" },
    { src: candle.monday_candle, description: "Monday - Image" },
    { src: candle.tuesday_candle, description: "Tuesday - Image" },
    { src: candle.wednesday_candle, description: "Wednesday - Image" },
    { src: candle.thursday_candle, description: "Thursday - Image" },
    { src: candle.friday_candle, description: "Friday - Image" },
    { src: candle.saturday_candle, description: "Saturday - Image" },
    { src: candle.sunday_candle, description: "Sunday - Image" },
  ];

  return (
    <div className="additional-info-container">
      <h3>More Information and Candles</h3>
      <div className="image-grid">
        {images.map((image, index) => (
          <div key={index} className="image-card">
            <img src={image.src} alt={image.description} className="additional-image" />
            <p className="image-description">{image.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdditionalInfo;
