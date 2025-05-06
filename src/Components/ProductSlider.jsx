import React, { useEffect, useState } from "react";
import Button from "./common/Button";
import { fetchAllProducts } from "../utils/fetchAllProducts";

export default function ProductSlider({
  showTabs = true,
  subtitle = "Special Offers",
  title = "Browse the huge variety of our best seller",
}) {
  const [productsData, setProductsData] = useState({
    bestsellers: [],
    newarrivals: [],
    toprated: [],
  });
  const [activeTab, setActiveTab] = useState("bestsellers");

  useEffect(() => {
    const fetchProducts = async () => {
      const pages = [1, 2, 3];
      const allProducts = await fetchAllProducts(pages);

      setProductsData({
        bestsellers: allProducts.slice(0, 4),
        newarrivals: allProducts.slice(4, 8),
        toprated: allProducts.slice(8, 13),
      });
    };

    fetchProducts();
  }, []);

  const handleTabClick = (tab) => setActiveTab(tab);

  // دالة بسيطة لعرض كل منتج (بديل ProductCard)
  const renderProduct = (product) => (
    <div className="item col-item" key={product.id}>
      <div className="product-box">
        <div className="product-image">
          <a href={product.href || "#"} className="product-img rounded-3">
            <img
              src={product.primaryImg}
              alt={product.name}
              title={product.name}
              width="625"
              height="808"
              className="blur-up lazyload"
            />
          </a>
          <div className="product-labels">
            {product.labels?.map((label, i) => (
              <span key={i} className={`lbl ${label.className}`}>
                {label.text}
              </span>
            ))}
          </div>
        </div>
        <div className="product-details">
          <div className="product-name">
            <a href={product.href || "#"}>{product.name}</a>
          </div>
          <div className="product-price">
            <span className="price old-price">
              ${product.priceOld.toFixed(2)}
            </span>
            <span className="price">${product.price.toFixed(2)}</span>
          </div>
          <div className="product-review">
            {[...Array(5)].map((_, i) => (
              <i
                key={i}
                className={`fas fa-star ${
                  i < product.rating ? "active" : "inactive"
                }`}
                style={{ color: i < product.rating ? "gold" : "gray" }}
              />
            ))}
            <span className="caption ms-1">{product.reviewsCount} Reviews</span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <section className="section product-slider tab-slider-product">
      <div className="container">
        <div className="text-center">
          <div className="main-italic mb-2">{subtitle}</div>
          <div className="main-title-heading mb-5">{title}</div>
        </div>

        <div className="tabs-listing">
          {showTabs && (
            <ul className="nav nav-tabs style2 justify-content-center">
              {["bestsellers", "newarrivals", "toprated"].map((tabKey) => (
                <li className="nav-item" role="presentation" key={tabKey}>
                  <button
                    className={`nav-link head-font ${
                      activeTab === tabKey ? "active" : ""
                    }`}
                    type="button"
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

          <div className="tab-content">
            {["bestsellers", "newarrivals", "toprated"].map((tabKey) => (
              <div
                key={tabKey}
                className={`tab-pane fade ${
                  activeTab === tabKey ? "show active" : ""
                }`}
              >
                <div className="grid-products grid-view-items">
                  <div className="row col-row product-options row-cols-xl-4 row-cols-lg-4 row-cols-md-3 row-cols-sm-3 row-cols-2">
                    {productsData[tabKey]?.length > 0 ? (
                      productsData[tabKey].map(renderProduct)
                    ) : (
                      <p className="text-center my-4">No Product Now.</p>
                    )}
                  </div>
                  <div className="view-collection text-center mt-4 mt-md-5">
                    <Button
                      label="View Collection"
                      to="/ShopGrid"
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
