import React, { useState, useEffect } from "react";
import useFetchBrands from "../../../utils/useFetchBrands";

export default function BrandFilter({ className, onFilterChange }) {
  const { brands, loading, error } = useFetchBrands();
  const [selectedBrands, setSelectedBrands] = useState({});
  const [showContent, setShowContent] = useState(true);

  useEffect(() => {
    // لما توصل البيانات من الـ API
    if (brands.length > 0) {
      const initialSelected = brands.reduce((acc, brand) => {
        acc[brand.name] = false;
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

    // إرسال الماركات المختارة لأعلى (للأب مثلاً لتحديث النتائج)
    const selected = Object.keys(updated).filter((key) => updated[key]);
    if (onFilterChange) onFilterChange(selected);
  };

  return (
    <div className={`sidebar-widget filter-widget brand-filter ${className}`}>
      <div className="widget-title d-flex align-items-center justify-content-between">
        <div className="title-slidebar">Brands</div>
        <i
          className="fa-solid fa-list"
          style={{ cursor: "pointer" }}
          onClick={() => setShowContent((prev) => !prev)}
        ></i>
      </div>
      {showContent && (
        <div className="widget-content">
          <div className="widget-content filterDD">
            {loading ? (
              <p>جاري التحميل...</p>
            ) : error ? (
              <p>فشل تحميل الماركات</p>
            ) : (
              <ul className="clearfix">
                {brands.map((brand) => (
                  <li
                    key={brand.name}
                    className="d-flex align-item-center mb-3"
                  >
                    <input
                      type="checkbox"
                      id={brand.name}
                      checked={selectedBrands[brand.name] || false}
                      onChange={handleCheckboxChange}
                    />
                    <label
                      htmlFor={brand.name}
                      className="ms-1 popular-title my-0"
                    >
                      <span></span>
                      {brand.name}
                    </label>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
