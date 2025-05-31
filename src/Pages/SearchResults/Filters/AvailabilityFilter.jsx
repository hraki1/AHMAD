// src/components/shop/Filters/AvailabilityFilter.js
import React, { useState, useEffect } from "react";
import { availabilityOptions } from "../data";

export default function AvailabilityFilter({
  className,
  onAvailabilityFilterChange,
}) {
  const [availability, setAvailability] = useState({
    instock: false,
    outofstock: false,
  });
  const [showContent, setShowContent] = useState(true);

  useEffect(() => {
    onAvailabilityFilterChange?.(availability);
  }, [availability, onAvailabilityFilterChange]);

  const handleChange = (e) => {
    const { id, checked } = e.target;
    setAvailability((prev) => {
      return {
        instock: id === "instock" ? checked : false,
        outofstock: id === "outofstock" ? checked : false,
      };
    });
  };

  return (
    <div className={`sidebar-widget filter-widget availability ${className}`}>
      <div className="widget-title d-flex align-items-center justify-content-between">
        <div className="title-slidebar">Availability</div>
        <i
          className="fa-solid fa-list"
          style={{ cursor: "pointer" }}
          onClick={() => setShowContent((prev) => !prev)}
        ></i>
      </div>
      {showContent && (
        <div className="widget-content">
          <div className="widget-content filterDD">
            <ul className="clearfix">
              {availabilityOptions.map(({ id, label }) => (
                <li key={id} className="d-flex align-item-center mb-3">
                  <input
                    type="checkbox"
                    id={id}
                    checked={availability[id]}
                    onChange={handleChange}
                  />
                  <label className="ms-1 popular-title my-0" htmlFor={id}>
                    <span></span>
                    {label}
                  </label>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
