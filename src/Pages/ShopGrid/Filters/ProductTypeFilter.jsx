import React, { useState } from "react";
import { productTypes } from "../data";
import { useTranslation } from "react-i18next";

export default function ProductTypeFilter({ className }) {
  const { t } = useTranslation();

  const [selectedTypes, setSelectedTypes] = useState({
    fashion: false,
    electronic: false,
    shoes: false,
  });

  const handleCheckboxChange = (e) => {
    const { id, checked } = e.target;
    setSelectedTypes((prev) => ({
      ...prev,
      [id]: checked,
    }));
  };
  const [showContent, setShowContent] = useState(true);

  return (
    <div className={`sidebar-widget filter-widget product-type ${className}`}>
      <div className="widget-title d-flex align-items-center justify-content-between">
        <div className="title-slidebar">{t(`Type`)}</div>
        <i
          className="fa-solid fa-list"
          style={{ cursor: "pointer" }}
          onClick={() => setShowContent((prev) => !prev)}
        ></i>
      </div>

      {showContent && (
        <div className="widget-content">
          <div className="widget-content">
            <ul className="clearfix">
              {productTypes.map((type) => (
                <li key={type.id} className="d-flex align-item-center mb-3">
                  <input
                    type="checkbox"
                    value={type.id}
                    id={type.id}
                    checked={selectedTypes[type.id]}
                    onChange={handleCheckboxChange}
                  />
                  <label className="ms-1 popular-title my-0" htmlFor={type.id}>
                    <span></span>
                    {type.label}
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
