import React, { useState } from "react";
import { brands } from "../data";

export default function BrandFilter({ className }) {
  const [selectedBrands, setSelectedBrands] = useState(
    brands.reduce((acc, brand) => ({ ...acc, [brand]: false }), {})
  );

  const handleCheckboxChange = (e) => {
    const { id, checked } = e.target;
    setSelectedBrands((prev) => ({
      ...prev,
      [id]: checked,
    }));
  };
  const [showContent, setShowContent] = useState(true);

  return (
    <div className={`sidebar-widget filter-widget brand-filter  ${className}`}>
      <div className="widget-title d-flex align-items-center justify-content-between">
        <div class="title-slidebar">Brands</div>
        <i
          className="fa-solid fa-list"
          style={{ cursor: "pointer" }}
          onClick={() => setShowContent((prev) => !prev)}
        ></i>
      </div>{" "}
      {showContent && (
        <div className="widget-content">
          <div className="widget-content filterDD">
            <ul className="clearfix">
              {brands.map((brand) => (
                <li key={brand} className="d-flex align-item-center mb-3">
                  <input
                    type="checkbox"
                    id={brand}
                    checked={selectedBrands[brand]}
                    onChange={handleCheckboxChange}
                  />
                  <label htmlFor={brand} className="ms-1 popular-title my-0">
                    <span></span>
                    {brand}
                  </label>
                </li>
              ))}
            </ul>
          </div>{" "}
        </div>
      )}
    </div>
  );
}
