import React from "react";

import Button from "./common/Button";
import { productsData } from "../Pages/Home/data";
import ProductCard from "../Pages/Home/ProductCard";

export default function ProductSlider({
  showTabs = true,
  subtitle = "Special Offers",
  title = "Browse the huge variety of our best seller",
}) {
  const [activeTab, setActiveTab] = React.useState("bestsellers");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <section className="section product-slider tab-slider-product">
      <div className="container">
        <div className="text-center">
          <div className="main-italic mb-2">{subtitle}</div>
          <div className="main-title-heading mb-5">{title}</div>
        </div>

        <div className="tabs-listing">
          {showTabs && (
            <ul
              className="nav nav-tabs style2 justify-content-center"
              id="productTabs"
              role="tablist"
            >
              {["bestsellers", "newarrivals", "toprated"].map((tabKey) => (
                <li className="nav-item" role="presentation" key={tabKey}>
                  <button
                    className={`nav-link head-font ${
                      activeTab === tabKey ? "active" : ""
                    }`}
                    id={`${tabKey}-tab`}
                    data-bs-toggle="tab"
                    data-bs-target={`#${tabKey}`}
                    type="button"
                    role="tab"
                    aria-controls={tabKey}
                    aria-selected={activeTab === tabKey}
                    onClick={() => handleTabClick(tabKey)}
                  >
                    {tabKey === "bestsellers"
                      ? "Bestseller"
                      : tabKey === "newarrivals"
                      ? "New Arrivals"
                      : "Top Rated"}
                  </button>
                </li>
              ))}
            </ul>
          )}

          <div className="tab-content" id="productTabsContent">
            <div
              className={`tab-pane show active`}
              id={activeTab}
              role="tabpanel"
              aria-labelledby={`${activeTab}-tab`}
            >
              <div className="grid-products grid-view-items">
                <div className="row col-row product-options row-cols-xl-4 row-cols-lg-4 row-cols-md-3 row-cols-sm-3 row-cols-2">
                  {productsData[activeTab] &&
                  productsData[activeTab].length > 0 ? (
                    productsData[activeTab].map((product) => (
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
          </div>
        </div>
      </div>
    </section>
  );
}
