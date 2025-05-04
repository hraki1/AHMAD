import React, { useState } from "react";
import SidebarCategories from "./Filters/SidebarCategories";
import PriceFilter from "./Filters/PriceFilter";
import ColorFilter from "./Filters/ColorFilter";
import SizeFilter from "./Filters/SizeFilter";
import ProductTypeFilter from "./Filters/ProductTypeFilter";
import BrandFilter from "./Filters/BrandFilter";
import AvailabilityFilter from "./Filters/AvailabilityFilter";

export default function LeftSlidebar() {
  const [showContent, setShowContent] = useState(true);

  return (
    <div className="col-12 col-sm-12 col-md-12 col-lg-3 sidebar sidebar-bg filterbar mt-5">
      <div className="closeFilter d-block d-lg-none">
        <i className="fa-solid fa-x" style={{ cursor: "pointer" }}></i>
      </div>
      <div className="sidebar-tags sidebar-sticky clearfix">
        {/* Filter By */}
        <div className="sidebar-widget filterBox filter-widget">
          <div className="widget-title d-flex justify-content-between align-items-center">
            <div className="title-slidebar">Filter By</div>
            <i
              className="fa-solid fa-list"
              style={{ cursor: "pointer" }}
              onClick={() => setShowContent((prev) => !prev)}
            ></i>{" "}
          </div>
          {showContent && (
            <div className="widget-content">
              {" "}
              <div className="widget-content filterby filterDD">
                <ul className="items tags-list d-flex-wrap">
                  <li className="item">
                    <a href="#" className="rounded-5">
                      <span className="filter-value">Women</span>
                      <i className="fas fa-times"></i>
                    </a>
                  </li>
                  <li className="item">
                    <a href="#" className="rounded-5">
                      <span className="filter-value">Blue</span>
                      <i className="fas fa-times"></i>
                    </a>
                  </li>
                  <li className="item">
                    <a href="#" className="rounded-5">
                      <span className="filter-value">XL</span>
                      <i className="fas fa-times"></i>
                    </a>
                  </li>
                </ul>
                <a href="#" className="btn btn-sm brd-link">
                  Clear All
                </a>
              </div>
            </div>
          )}
        </div>
        {/* <!--End Filter By Normal Screen--> */}
        <SidebarCategories />
        <PriceFilter />
        <ColorFilter />
        <SizeFilter />
        <ProductTypeFilter />
        <BrandFilter />
        <AvailabilityFilter />
      </div>
    </div>
  );
}
