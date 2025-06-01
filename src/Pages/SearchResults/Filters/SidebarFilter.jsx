import React, { useState } from "react";
import SidebarCategories from "./SidebarCategories";
import PriceFilter from "./PriceFilter";
import ColorFilter from "./ColorFilter";
import SizeFilter from "./SizeFilter";
import ProductTypeFilter from "./ProductTypeFilter";
import BrandFilter from "./BrandFilter";
import AvailabilityFilter from "./AvailabilityFilter";
import ProductTags from "./ProductTags";
import ProductCard from "../../Home/ProductCard";

export default function SidebarFilter({ onClose }) {
  const [filters, setFilters] = useState(["Women", "Blue", "XL"]);

  const removeFilter = (value) => {
    setFilters(filters.filter((f) => f !== value));
  };

  const clearAllFilters = () => {
    setFilters([]);
  };

  return (
    <>
      {/* Sidebar */}
      <div className="col-12 col-sm-12 col-md-12 col-lg-3 sidebar sidebar-bg filterbar">
        <div className="closeFilter cls-bord" onClick={onClose}>
          <i className="fa-solid fa-x" style={{ cursor: "pointer" }}></i>
        </div>
        <SidebarCategories />
        <PriceFilter />
        <ColorFilter />
        <SizeFilter />
        <ProductTypeFilter />
        <BrandFilter />
        <AvailabilityFilter />
        <ProductTags />
        <div className="sidebar-tags clearfix">
          {/* Filter By */}
          <div className="sidebar-widget filterBox filter-widget">
            <div className="widget-title">
              <h2>Filter By</h2>
            </div>
            <div className="widget-content filterby filterDD">
              <ul className="items tags-list d-flex-wrap">
                {filters.map((filter, index) => (
                  <li className="item" key={index}>
                    <a
                      href="#;"
                      className="rounded-5"
                      onClick={(e) => {
                        e.preventDefault();
                        removeFilter(filter);
                      }}
                    >
                      <span className="filter-value">{filter}</span>
                      <i className="fa-solid fa-x"></i>
                    </a>
                  </li>
                ))}
              </ul>
              {filters.length > 0 && (
                <a
                  href="#;"
                  className="btn btn-sm brd-link"
                  onClick={(e) => {
                    e.preventDefault();
                    clearAllFilters();
                  }}
                >
                  Clear All
                </a>
              )}
            </div>
          </div>
          {/* End Filter By */}
        </div>
      </div>
    </>
  );
}
