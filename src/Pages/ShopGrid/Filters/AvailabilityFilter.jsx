import React, { useState } from "react";
import { availabilityOptions } from "../data";

export default function AvailabilityFilter({ className }) {
  const [availability, setAvailability] = useState({
    instock: false,
    outofstock: false,
  });

  const handleChange = (e) => {
    const { id, checked } = e.target;
    setAvailability((prev) => ({
      ...prev,
      [id]: checked,
    }));
  };
  const [showContent, setShowContent] = useState(true);

  return (
    <div className={`sidebar-widget filter-widget availability ${className}`}>
      <div className="widget-title d-flex align-items-center justify-content-between">
        <div class="title-slidebar">Availability</div>
        <i
          className="fa-solid fa-list"
          style={{ cursor: "pointer" }}
          onClick={() => setShowContent((prev) => !prev)}
        ></i>
      </div>{" "}
      {showContent && (
        <div className="widget-content">
          {" "}
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
