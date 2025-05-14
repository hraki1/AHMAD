import React, { useState, useEffect } from "react"; // ✅ Added useEffect
import { showOptions, sortOptions, viewModes } from "./data";
import ProductGrid from "./ProductGrid";
import SidebarCategories from "./Filters/SidebarCategories";
import PriceFilter from "./Filters/PriceFilter";
import ColorFilter from "./Filters/ColorFilter";
import SizeFilter from "./Filters/SizeFilter";
import ProductTypeFilter from "./Filters/ProductTypeFilter";
import BrandFilter from "./Filters/BrandFilter";
import AvailabilityFilter from "./Filters/AvailabilityFilter";
import { Link } from "react-router-dom";

// 🔹 ViewModes Component
const ViewModes = ({ activeView, onChange }) => (
  <div className="grid-options view-mode d-flex">
    {viewModes.map(({ class: cls, col }) => (
      <Link
        key={col}
        to="#"
        className={`icon-mode ${cls} ${activeView === col ? "active" : ""}`}
        data-col={col}
        onClick={(e) => {
          e.preventDefault();
          onChange(col); // ✅ Now correctly uses the onChange prop
        }}
      />
    ))}
  </div>
);

// 🔹 Reusable SelectBox
const SelectBox = ({ id, label, options, defaultValue, value, onChange }) => ( // ✅ Added value and onChange props
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
      value={value} // ✅ Changed from defaultValue to value for controlled component
      onChange={(e) => onChange(e.target.value)} // ✅ Added onChange handler
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

// change col
const getGridClasses = (view) => {
  switch (view) {
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
    case 0:
      return "list-style";
  }
};

// 🔶 Main Toolbar
export default function Toolbar({
  onFilterClick,
  onViewChange,
  selectedCategoryAndChildrenIds,
  selectedBrandIds = [],
}) {
  const [activeView, setActiveView] = useState(5);
  const [showFilter, setShowFilter] = useState(false);
  
  // ✅ Added new state variables for product management
  const [showCount, setShowCount] = useState(15);
  const [sortBy, setSortBy] = useState("featured");
  const [products, setProducts] = useState([]); // ✅ Will hold filtered/sorted products
  const [totalProducts, setTotalProducts] = useState(15); // ✅ Track total products count
  
  // ✅ Added useEffect to handle product filtering and sorting
  useEffect(() => {
    // This would normally fetch from an API or filter from props
    // For now, we're just updating the count
    setTotalProducts(showCount);
    
    // Actual implementation would sort and filter products here
    // based on sortBy, showCount, categories, etc.
    
    // Example: Pass the updated products to ProductGrid
    // ProductGrid would receive this data via props
  }, [showCount, sortBy, selectedCategoryAndChildrenIds, selectedBrandIds]);

  const handleViewChange = (col) => {
    setActiveView(col);
    onViewChange?.(col);
  };

  // ✅ Added new handlers for dropdowns
  const handleShowChange = (value) => {
    setShowCount(Number(value));
  };
  
  const handleSortChange = (value) => {
    setSortBy(value);
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
            {/* ✅ Updated to use dynamic total count */}
            <span className="toolbar-product-count">Showing: {totalProducts} products</span>
          </div>

          {/* Right */}
          <div className="col-8 col-sm-6 col-md-4 col-lg-4 d-flex justify-content-end order-2">
            {/* ✅ Updated SelectBox components to be controlled components */}
            <SelectBox
              id="show"
              label="Show:"
              options={showOptions}
              value={showCount}
              onChange={handleShowChange}
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
<<<<<<< HEAD
        availabilityFilter={availabilityFilter}
        priceRange={priceRange}
        gridClass={getGridClasses(activeView)}
=======
        activeView={activeView} // ✅ Added to control grid layout
        sortBy={sortBy} // ✅ Added to control sorting
        showCount={showCount} // ✅ Added to control how many products to show
>>>>>>> origin/thamer-branch
      />{" "}
    </div>
  );
}

// ✅ Note: ProductGrid component would need to be updated to:
// 1. Accept and use activeView to set the grid layout
// 2. Accept sortBy to sort products appropriately
// 3. Accept showCount to limit number of products displayed
// 4. Handle the actual filtering and sorting logic that was
//    outlined in the useEffect in this component