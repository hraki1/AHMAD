import React from "react";

import Button from "../../Components/common/Button";
import { productsData } from "./data";
import ProductCard from "./ProductCard";

export default function ProductSlider() {
  const [activeTab, setActiveTab] = React.useState("bestsellers");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <section className="section product-slider tab-slider-product">
      <div className="container">
        <div className="text-center">
          <div className="main-italic mb-2">Special Offers</div>
          <div className="main-title-heading mb-5">
            Browse the huge variety of our best seller
          </div>
        </div>
        <div className="tabs-listing">
          <ul
            className="nav nav-tabs style1 justify-content-center"
            id="productTabs"
            role="tablist"
          >
            <li className="nav-item" role="presentation">
              <button
                className={`nav-link head-font ${
                  activeTab === "bestsellers" ? "active" : ""
                }`}
                id="bestsellers-tab"
                data-bs-toggle="tab"
                data-bs-target="#bestsellers"
                type="button"
                role="tab"
                aria-controls="bestsellers"
                aria-selected={activeTab === "bestsellers"}
                onClick={() => handleTabClick("bestsellers")}
              >
                Bestseller
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                className={`nav-link head-font ${
                  activeTab === "newarrivals" ? "active" : ""
                }`}
                id="newarrivals-tab"
                data-bs-toggle="tab"
                data-bs-target="#newarrivals"
                type="button"
                role="tab"
                aria-controls="newarrivals"
                aria-selected={activeTab === "newarrivals"}
                onClick={() => handleTabClick("newarrivals")}
              >
                New Arrivals
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                className={`nav-link head-font ${
                  activeTab === "toprated" ? "active" : ""
                }`}
                id="toprated-tab"
                data-bs-toggle="tab"
                data-bs-target="#toprated"
                type="button"
                role="tab"
                aria-controls="toprated"
                aria-selected={activeTab === "toprated"}
                onClick={() => handleTabClick("toprated")}
              >
                Top Rated
              </button>
            </li>
          </ul>
          <div className="tab-content" id="productTabsContent">
            {["bestsellers", "newarrivals", "toprated"].map((tabKey) => (
              <div
                key={tabKey}
                className={`tab-pane ${
                  activeTab === tabKey ? "show active" : ""
                }`}
                id={tabKey}
                role="tabpanel"
                aria-labelledby={`${tabKey}-tab`}
              >
                <div className="grid-products grid-view-items">
                  <div className="row col-row product-options row-cols-xl-4 row-cols-lg-4 row-cols-md-3 row-cols-sm-3 row-cols-2">
                    {productsData[tabKey] && productsData[tabKey].length > 0 ? (
                      productsData[tabKey].map((product) => (
                        <ProductCard key={product.id} {...product} />
                      ))
                    ) : (
                      <p className="text-center my-4">No products available.</p>
                    )}
                  </div>
                  <div className="view-collection text-center mt-4 mt-md-5">
                    <Button
                      label="View Collection"
                      href="shop-left-sidebar.html"
                      primary={false}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
