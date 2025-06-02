import React, { useState, useEffect } from "react";
import useFetchBrands from "../../Hooks/useFetchBrands";
import { useTranslation } from "react-i18next";
export default function BrandFilter({ className, onFilterChange }) {
  const { brands, loading, error } = useFetchBrands();
  const [selectedBrands, setSelectedBrands] = useState({});

  useEffect(() => {
    if (brands.length > 0) {
      const initialSelected = brands.reduce((acc, brand) => {
        acc[brand.id] = false;
        return acc;
      }, {});
      setSelectedBrands(initialSelected);
    }
  }, [brands]);

  const handleCheckboxChange = (e) => {
    const { id, checked } = e.target;
    const updated = {
      ...selectedBrands,
      [id]: checked,
    };
    setSelectedBrands(updated);

    // selected IDs (strings, so convert to number if needed)
    const selected = Object.keys(updated)
      .filter((key) => updated[key])
      .map(Number);

    if (onFilterChange) onFilterChange(selected);
  };
  const { t } = useTranslation();
  return (
    <div className={`sidebar-widget filter-widget brand-filter ${className}`}>
      <div className="widget-title d-flex align-items-center justify-content-between">
        <div className="title-slidebar">{t(`Brands`)}</div>
        {/* ... */}
      </div>
      {/* ... */}
      <div className="widget-content">
        <div className="widget-content filterDD">
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>Failed to load brands</p>
          ) : (
            <ul className="clearfix">
              {brands.map((brand) => (
                <li key={brand.id} className="d-flex align-item-center mb-3">
                  <input
                    type="checkbox"
                    id={brand.id}
                    checked={!!selectedBrands[brand.id]}
                    onChange={handleCheckboxChange}
                  />
                  <label htmlFor={brand.id} className="ms-1 popular-title my-0">
                    {brand.name}
                  </label>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
