import React, { useState } from "react";

export default function SidebarCategories({ className }) {
  const [openCategories, setOpenCategories] = useState({});
  const [openSubCategories, setOpenSubCategories] = useState({});

  const toggleCategory = (category) => {
    setOpenCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  const toggleSubCategory = (sub) => {
    setOpenSubCategories((prev) => ({
      ...prev,
      [sub]: !prev[sub],
    }));
  };

  const renderToggleIcon = () => <i className="fa-solid fa-bars ms-2"></i>;

  const [showContent, setShowContent] = useState(true);

  return (
    <div
      className={`sidebar-widget clearfix categories filterBox filter-widget ${className}`}
    >
      <div class="widget-title d-flex justify-content-between align-items-center">
        <div class="title-slidebar">Categories</div>
        <i
          className="fa-solid fa-list"
          style={{ cursor: "pointer" }}
          onClick={() => setShowContent((prev) => !prev)}
        ></i>
      </div>
      {showContent && (
        <div className="widget-content">
          {" "}
          <div className="widget-content filterDD">
            <ul className="sidebar-categories scrollspy clearfix">
              {/* Clothing */}
              <li className="lvl1 sub-level more-item">
                <a
                  href="#"
                  className="site-nav d-flex justify-content-between align-items-center"
                  onClick={(e) => {
                    e.preventDefault();
                    toggleCategory("clothing");
                  }}
                >
                  <span>Clothing</span>
                  {renderToggleIcon()}
                </a>
                <ul
                  className={`sublinks ps-3 ${
                    openCategories["clothing"] ? "d-block" : "d-none"
                  }`}
                >
                  {/* Men */}
                  <li className="lvl2 sub-level sub-sub-level">
                    <a
                      href="#"
                      className="site-nav d-flex justify-content-between align-items-center"
                      onClick={(e) => {
                        e.preventDefault();
                        toggleSubCategory("men");
                      }}
                    >
                      <span>Men</span>
                      {renderToggleIcon()}
                    </a>
                    <ul
                      className={`sublinks ps-3 ${
                        openSubCategories["men"] ? "d-block" : "d-none"
                      }`}
                    >
                      <li className="lvl3">
                        <a href="#" className="site-nav">
                          Shirt <span className="count">(25)</span>
                        </a>
                      </li>
                      <li className="lvl3">
                        <a href="#" className="site-nav">
                          Jeans <span className="count">(6)</span>
                        </a>
                      </li>
                      <li className="lvl3">
                        <a href="#" className="site-nav">
                          Shoes <span className="count">(9)</span>
                        </a>
                      </li>
                    </ul>
                  </li>

                  <li className="lvl2">
                    <a href="#" className="site-nav">
                      Women <span className="count">(14)</span>
                    </a>
                  </li>
                  <li className="lvl2">
                    <a href="#" className="site-nav">
                      Child <span className="count">(26)</span>
                    </a>
                  </li>
                </ul>
              </li>

              {/* Jewellery */}
              <li className="lvl1 sub-level more-item">
                <a
                  href="#"
                  className="site-nav d-flex justify-content-between align-items-center"
                  onClick={(e) => {
                    e.preventDefault();
                    toggleCategory("jewellery");
                  }}
                >
                  <span>Jewellery</span>
                  {renderToggleIcon()}
                </a>
                <ul
                  className={`sublinks ps-3 ${
                    openCategories["jewellery"] ? "d-block" : "d-none"
                  }`}
                >
                  <li className="lvl2">
                    <a href="#" className="site-nav">
                      Ring <span className="count">(12)</span>
                    </a>
                  </li>
                  <li className="lvl2">
                    <a href="#" className="site-nav">
                      Necklaces <span className="count">(15)</span>
                    </a>
                  </li>
                  <li className="lvl2">
                    <a href="#" className="site-nav">
                      Earrings <span className="count">(18)</span>
                    </a>
                  </li>
                </ul>
              </li>

              {/* Accessories */}
              <li className="lvl1 more-item">
                <a
                  href="#"
                  className="site-nav d-flex justify-content-between align-items-center"
                  onClick={(e) => {
                    e.preventDefault();
                    toggleCategory("accessories");
                  }}
                >
                  <span>Accessories</span>
                  {renderToggleIcon()}
                </a>
                <ul
                  className={`sublinks ps-3 ${
                    openCategories["accessories"] ? "d-block" : "d-none"
                  }`}
                >
                  <li className="lvl2">
                    <a href="#" className="site-nav">
                      Bags <span className="count">(10)</span>
                    </a>
                  </li>
                  <li className="lvl2">
                    <a href="#" className="site-nav">
                      Watches <span className="count">(8)</span>
                    </a>
                  </li>
                </ul>
              </li>

              {/* Shoes */}
              <li className="lvl1 more-item">
                <a
                  href="#"
                  className="site-nav d-flex justify-content-between align-items-center"
                  onClick={(e) => {
                    e.preventDefault();
                    toggleCategory("shoes");
                  }}
                >
                  <span>Shoes</span>
                  {renderToggleIcon()}
                </a>
                <ul
                  className={`sublinks ps-3 ${
                    openCategories["shoes"] ? "d-block" : "d-none"
                  }`}
                >
                  <li className="lvl2">
                    <a href="#" className="site-nav">
                      Sneakers <span className="count">(18)</span>
                    </a>
                  </li>
                  <li className="lvl2">
                    <a href="#" className="site-nav">
                      Boots <span className="count">(12)</span>
                    </a>
                  </li>
                </ul>
              </li>

              {/* Electronic */}
              <li className="lvl1 more-item">
                <a
                  href="#"
                  className="site-nav d-flex justify-content-between align-items-center"
                  onClick={(e) => {
                    e.preventDefault();
                    toggleCategory("electronic");
                  }}
                >
                  <span>Electronic</span>
                  {renderToggleIcon()}
                </a>
                <ul
                  className={`sublinks ps-3 ${
                    openCategories["electronic"] ? "d-block" : "d-none"
                  }`}
                >
                  <li className="lvl2">
                    <a href="#" className="site-nav">
                      Phones <span className="count">(20)</span>
                    </a>
                  </li>
                  <li className="lvl2">
                    <a href="#" className="site-nav">
                      Laptops <span className="count">(15)</span>
                    </a>
                  </li>
                </ul>
              </li>

              {/* Cosmetics */}
              <li className="lvl1 more-item">
                <a
                  href="#"
                  className="site-nav d-flex justify-content-between align-items-center"
                  onClick={(e) => {
                    e.preventDefault();
                    toggleCategory("cosmetics");
                  }}
                >
                  <span>Cosmetics</span>
                  {renderToggleIcon()}
                </a>
                <ul
                  className={`sublinks ps-3 ${
                    openCategories["cosmetics"] ? "d-block" : "d-none"
                  }`}
                >
                  <li className="lvl2">
                    <a href="#" className="site-nav">
                      Lipsticks <span className="count">(12)</span>
                    </a>
                  </li>
                  <li className="lvl2">
                    <a href="#" className="site-nav">
                      Foundation <span className="count">(14)</span>
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
