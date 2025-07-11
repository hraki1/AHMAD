import React, { useEffect, useState, useMemo } from "react";
import Button from "./common/Button";
import { fetchAllProducts } from "../utils/fetchAllProducts";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
const ProductSlider = ({ showTabs = true, subtitle, title }) => {
  const [productsData, setProductsData] = useState({
    bestsellers: [],
    newarrivals: [],
    toprated: [],
  });
  const [activeTab, setActiveTab] = useState("bestsellers");
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();
  const defaultSubtitle = t("Special_Offers");
  const defaulttitle = t("Browse_the_huge_variety_of_our_best_seller");
  subtitle = defaultSubtitle || subtitle;
  title = defaulttitle || title;
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true); // بدء التحميل
      const pages = [1, 2, 3];
      const allProducts = await fetchAllProducts(pages);

      if (allProducts && allProducts.length > 0) {
        setProductsData({
          bestsellers: allProducts.slice(0, 4),
          newarrivals: allProducts.slice(4, 8),
          toprated: allProducts.slice(8, 13),
        });
      }
      setLoading(false); // إنهاء التحميل
    };

    fetchProducts();
  }, []);

  const memoizedProductsData = useMemo(() => productsData, [productsData]);

  const handleTabClick = (tab) => setActiveTab(tab);

  const renderProduct = (product) => (
    <div className="item col-item" key={product.id}>
      <div className="product-box">
        <div className="product-image">
          <Link
            to={`/product/${product.url_key || product.id}`}
            className="product-img rounded-3"
          >
            {product.primaryImg ? (
              <img
                src={product.primaryImg}
                alt={product.name}
                title={product.name}
                width="625"
                height="808"
                className="blur-up lazyload"
              />
            ) : (
              // Optionally render a placeholder image if the primaryImg is not available
              <img
                src="/path/to/placeholder-image.jpg" // Use a default placeholder image
                alt={product.name}
                title={product.name}
                width="625"
                height="808"
                className="blur-up lazyload"
              />
            )}
          </Link>
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
            <Link to={product.href || "#"}>{product.name}</Link>
          </div>
          <div className="product-price">
            <span className="price old-price">
              ${product.old_price.toFixed(2)}
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
                    {loading ? (
                      <p className="text-center my-4">Loading...</p>
                    ) : productsData[tabKey]?.length > 0 ? (
                      productsData[tabKey].map(renderProduct)
                    ) : (
                      <p className="text-center my-4">No Product Now.</p>
                    )}
                  </div>
                  <div className="view-collection text-center mt-4 mt-md-5">
                    <Button
                      label={t("view_collection")}
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
};

export default ProductSlider;
