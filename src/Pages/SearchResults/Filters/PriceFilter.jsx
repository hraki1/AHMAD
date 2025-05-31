// src/components/shop/Filters/PriceFilter.js
import React, { useState } from "react";

export default function PriceFilter({ className, onPriceChange }) {
  const defaultPriceRange = [0, 100];
  const [priceRange, setPriceRange] = useState(defaultPriceRange);
  const [amount, setAmount] = useState("$0 - $100");

  const handleSliderChange = (event, newValue) => {
    if (newValue[0] > newValue[1]) return;
    setPriceRange(newValue);
    setAmount(`$${newValue[0]} - $${newValue[1]}`);
    if (onPriceChange) onPriceChange(newValue);
  };

  const handleFilterClick = (e) => {
    e.preventDefault();
    console.log(`Filtered Price Range: ${amount}`);
    if (onPriceChange) onPriceChange(priceRange);
  };

  const handleResetClick = (e) => {
    e.preventDefault();
    // Reset to default values
    setPriceRange(defaultPriceRange);
    setAmount(`$${defaultPriceRange[0]} - $${defaultPriceRange[1]}`);
    if (onPriceChange) onPriceChange(null); // Pass null to clear the filter
    console.log("Price filter reset");
  };

  const [showContent, setShowContent] = useState(true);

  return (
    <div className={`sidebar-widget filterBox filter-widget ${className}`}>
      <div className="widget-title d-flex align-items-center justify-content-between">
        <div className="title-slidebar">Price</div>
        <i
          className="fa-solid fa-list"
          style={{ cursor: "pointer" }}
          onClick={() => setShowContent((prev) => !prev)}
        ></i>
      </div>
      {showContent && (
        <div className="widget-content">
          <form
            className="widget-content price-filter filterDD"
            action="#"
            method="post"
            onSubmit={handleFilterClick}
          >
            <div id="slider-range" className="mt-2">
              <input
                type="range"
                min="0"
                max="1000"
                value={priceRange[0]}
                onChange={(e) =>
                  handleSliderChange(e, [
                    parseInt(e.target.value),
                    priceRange[1],
                  ])
                }
                className="slider"
              />
              <input
                type="range"
                min="0"
                max="1000"
                value={priceRange[1]}
                onChange={(e) =>
                  handleSliderChange(e, [
                    priceRange[0],
                    parseInt(e.target.value),
                  ])
                }
                className="slider"
              />
            </div>
            <div className="row">
              <div className="col-6">
                <input
                  id="amount"
                  type="text"
                  value={amount}
                  readOnly
                  className="form-control"
                />
              </div>
              <div className="col-6 text-right d-flex justify-content-end">
                <button 
                  className="btn btn-sm btn-outline-secondary me-2"
                  type="button"
                  onClick={handleResetClick}
                >
                  Reset
                </button>
                <button className="btn btn-sm" type="submit">
                  Filter
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}