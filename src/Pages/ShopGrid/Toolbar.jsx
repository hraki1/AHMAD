import React, { useState } from "react";
import { showOptions, sortOptions, viewModes } from "./data";
import ProductGrid from "./ProductGrid";
import SidebarCategories from "./Filters/SidebarCategories";
import PriceFilter from "./Filters/PriceFilter";
import ColorFilter from "./Filters/ColorFilter";
import SizeFilter from "./Filters/SizeFilter";
import ProductTypeFilter from "./Filters/ProductTypeFilter";
import BrandFilter from "./Filters/BrandFilter";
import AvailabilityFilter from "./Filters/AvailabilityFilter";

// 🔹 ViewModes Component
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

// 🔹 Reusable SelectBox
const SelectBox = ({ id, label, options, defaultValue }) => (
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
      defaultValue={defaultValue}
    >
      {options.map((opt) => (
        <option key={opt.value || opt} value={opt.value || opt}>
          {opt.label || opt}
        </option>
      ))}
    </select>
  </div>
);

// 🔸 Filters List
const filters = [
  SidebarCategories,
  PriceFilter,
  ColorFilter,
  SizeFilter,
  ProductTypeFilter,
  BrandFilter,
  AvailabilityFilter,
];

// 🔶 Main Toolbar
export default function Toolbar({
  onFilterClick,
  onViewChange,
  selectedCategoryAndChildrenIds,
  selectedBrandIds = [],
  availabilityFilter,
  priceRange,
}) {
  const [activeView, setActiveView] = useState(5);
  const [showFilter, setShowFilter] = useState(false);

  const handleViewChange = (col) => {
    setActiveView(col);
    onViewChange?.(col);
  };

  const toggleFilter = () => {
    setShowFilter((prev) => !prev);
    onFilterClick?.();
  };

  return (
    <div className="col-12 col-lg-9 main-col">
      <div className="toolbar toolbar-wrapper shop-toolbar mt-5">
        <div className="row align-items-center">
          {/* Left */}
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

          {/* Center */}
          <div className="col-12 col-sm-4 col-md-4 col-lg-4 text-center order-0 order-md-1 mb-3 mb-sm-0">
            <span className="toolbar-product-count">Showing: 15 products</span>
          </div>

          {/* Right */}
          <div className="col-8 col-sm-6 col-md-4 col-lg-4 d-flex justify-content-end order-2">
            <SelectBox
              id="show"
              label="Show:"
              options={showOptions}
              defaultValue={15}
            />
            <SelectBox
              id="sort"
              label="Sort by:"
              options={sortOptions}
              defaultValue="featured"
            />
          </div>
        </div>
      </div>
      {/* Filters */}
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
      />{" "}
    </div>
  );
}
