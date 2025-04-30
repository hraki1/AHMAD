import React, { useState } from "react";
import { showOptions, sortOptions, viewModes } from "./data";
import ProductGrid from "./ProductGrid";

// 🧩 Component: ViewModes
function ViewModes({ activeView, onChange }) {
  return (
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
}

// 🧩 Component: SelectBox
function SelectBox({ id, label, options, defaultValue }) {
  return (
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
        {options.map((opt) =>
          typeof opt === "object" ? (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ) : (
            <option key={opt} value={opt}>
              {opt}
            </option>
          )
        )}
      </select>
    </div>
  );
}

// 🔧 Main Toolbar
export default function Toolbar({ onFilterClick, onViewChange }) {
  const [activeView, setActiveView] = useState(5);

  const handleViewChange = (col) => {
    setActiveView(col);
    onViewChange?.(col);
  };

  return (
    <div class="col-12 col-sm-12 col-md-12 col-lg-9 main-col">
      <div className="toolbar toolbar-wrapper shop-toolbar mt-5">
        <div className="row align-items-center">
          {/* Left */}
          <div className="col-4 col-sm-2 col-md-4 col-lg-4 text-left filters-toolbar-item d-flex order-1 order-sm-0">
            <button
              type="button"
              className="btn btn-filter icon anm anm-sliders-hr d-inline-flex d-lg-none me-2"
              onClick={onFilterClick}
            >
              Filter <i className="fa-solid fa-bars ms-1" />
            </button>
            <div className="filters-item d-flex align-items-center">
              <label className="mb-0 me-2 d-none d-lg-inline-block">
                View as:
              </label>
              <ViewModes activeView={activeView} onChange={handleViewChange} />
            </div>
          </div>

          {/* Center */}
          <div className="col-12 col-sm-4 col-md-4 col-lg-4 text-center product-count order-0 order-md-1 mb-3 mb-sm-0">
            <span className="toolbar-product-count">Showing: 15 products</span>
          </div>

          {/* Right */}
          <div className="col-8 col-sm-6 col-md-4 col-lg-4 text-right filters-toolbar-item d-flex justify-content-end order-2 order-sm-2">
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
      <ProductGrid />
    </div>
  );
}
