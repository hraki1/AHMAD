import React, { useState, useEffect } from "react";
import { showOptions, sortOptions, viewModes } from "./data";
import ProductGrid from "./ProductGrid";
import SidebarCategories from "./Filters/SidebarCategories";
import PriceFilter from "./Filters/PriceFilter";
import ColorFilter from "./Filters/ColorFilter";
import SizeFilter from "./Filters/SizeFilter";
import ProductTypeFilter from "./Filters/ProductTypeFilter";
import BrandFilter from "./Filters/BrandFilter";
import AvailabilityFilter from "./Filters/AvailabilityFilter";

// ✅ مكون ViewModes لتغيير طريقة عرض المنتجات
const ViewModes = ({ activeView, onChange }) => (
  <div className="grid-options view-mode d-flex">
    {viewModes.map(({ class: cls, col }) => (
      <a
        key={col}
        href="#"
        className={`icon-mode ${cls} ${activeView === col ? "active" : ""}`}
        data-col={col}
        onClick={(e) => {
          e.preventDefault();
          onChange(col);
        }}
      />
    ))}
  </div>
);

// ✅ مكون SelectBox لإعادة استخدام Dropdown
const SelectBox = ({ id, label, options, value, onChange }) => (
  <div className="filters-item d-flex align-items-center ms-2 ms-lg-3">
    {label && (
      <label
        htmlFor={id}
        className="mb-0 me-2 text-nowrap d-none d-sm-inline-flex"
      >
        {label}
      </label>
    )}
    <select
      id={id}
      className={`filters-toolbar-${id}`}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      {options.map((opt) => (
        <option key={opt.value || opt} value={opt.value || opt}>
          {opt.label || opt}
        </option>
      ))}
    </select>
  </div>
);

// ✅ قائمة الفلاتر
const filters = [
  SidebarCategories,
  PriceFilter,
  ColorFilter,
  SizeFilter,
  ProductTypeFilter,
  BrandFilter,
  AvailabilityFilter,
];

// ✅ تحديد الكلاسات حسب طريقة العرض
const getGridClasses = (view) => {
  switch (view) {
    case 0:
      return "list-style";
    case 1:
      return "row-cols-1";
    case 2:
      return "row-cols-2";
    case 3:
      return "row-cols-md-3 row-cols-sm-3 row-cols-2";
    case 4:
      return "row-cols-lg-4 row-cols-md-3 row-cols-sm-3 row-cols-2";
    case 5:
    default:
      return "row-cols-xl-5 row-cols-lg-4 row-cols-md-3 row-cols-sm-3 row-cols-2";
  }
};

// ✅ مكون Toolbar الرئيسي
export default function Toolbar({
  onFilterClick,
  onViewChange,
  selectedCategoryAndChildrenIds,
  selectedBrandIds = [],
  priceRange,
  availabilityFilter,
}) {
  const [activeView, setActiveView] = useState(5);
  const [showFilter, setShowFilter] = useState(false);
  const [productsPerPage, setProductsPerPage] = useState(15);
  const [sortBy, setSortBy] = useState("Featured");
  const [totalProducts, setTotalProducts] = useState(100); // يمكن تعديلها حسب بيانات الـ API

  const handleViewChange = (col) => {
    setActiveView(col);
    onViewChange?.(col);
  };

  const handleProductsPerPageChange = (value) => {
    setProductsPerPage(Number(value));
  };

  const handleSortChange = (value) => {
    setSortBy(value);
  };

  const toggleFilter = () => {
    setShowFilter((prev) => !prev);
    onFilterClick?.();
  };

  // ✅ عدد المنتجات المعروضة فعليًا
  const displayedProductCount = Math.min(productsPerPage, totalProducts);

  return (
    <div className="col-12 col-lg-9 main-col">
      <div className="toolbar toolbar-wrapper shop-toolbar mt-5">
        <div className="row align-items-center">
          {/* Left - View Mode + Filter Button */}
          <div className="col-4 col-sm-2 col-md-4 col-lg-4 d-flex order-1 order-sm-0">
            <button
              type="button"
              className="btn btn-filter icon anm anm-sliders-hr d-inline-flex d-lg-none me-2"
              onClick={toggleFilter}
            >
              Filter <i className="fa-solid fa-bars ms-1" />
            </button>
            <div className="d-flex align-items-center">
              <label className="mb-0 me-2 d-none d-lg-inline-block">
                View as:
              </label>
              <ViewModes activeView={activeView} onChange={handleViewChange} />
            </div>
          </div>

          {/* Center - Total Products Count */}
          <div className="col-12 col-sm-4 col-md-4 col-lg-4 text-center order-0 order-md-1 mb-3 mb-sm-0">
            <span className="toolbar-product-count">
              Showing: {displayedProductCount} of {totalProducts} products
            </span>
          </div>

          {/* Right - Filters: Show & Sort */}
          <div className="col-8 col-sm-6 col-md-4 col-lg-4 d-flex justify-content-end order-2">
            <SelectBox
              id="show"
              label="Show:"
              options={showOptions}
              value={productsPerPage}
              onChange={handleProductsPerPageChange}
            />
            <SelectBox
              id="sort"
              label="Sort by:"
              options={sortOptions}
              value={sortBy}
              onChange={handleSortChange}
            />
          </div>
        </div>
      </div>

      {/* Filters Section (Mobile) */}
      {showFilter && (
        <div className="filter-menu visible">
          {filters.map((FilterComp, idx) => (
            <FilterComp key={idx} className="mb-5" />
          ))}
        </div>
      )}

      {/* Product Grid */}
      <ProductGrid
        selectedCategoryAndChildrenIds={selectedCategoryAndChildrenIds}
        selectedBrandIds={selectedBrandIds}
        availabilityFilter={availabilityFilter}
        priceRange={priceRange}
        gridClass={getGridClasses(activeView)}
        activeView={activeView}
        sortBy={sortBy}
        showCount={productsPerPage}
      />
    </div>
  );
}
