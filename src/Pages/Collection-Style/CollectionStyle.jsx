import React from "react";
import { categories } from "./data";

const CollectionStyle = () => {
  return (
    <div id="page-content">
      <div className="container">
        <div className="collection-style1 row col-row row-cols-xl-4 row-cols-lg-3 row-cols-md-2 row-cols-2">
          {categories.map((cat, idx) => (
            <div key={idx} className="category-item col-item zoomscal-hov">
              <a
                href="shop-left-sidebar.html"
                className="category-link clr-none"
              >
                <div className="zoom-scal zoom-scal-nopb">
                  <img
                    className="blur-up lazyload w-100"
                    data-src={cat.image}
                    src={cat.image}
                    alt={cat.title}
                    width="365"
                    height="365"
                  />
                </div>
                <div className="details mt-3 d-flex justify-content-between align-items-center">
                  <h4 className="category-title mb-0">{cat.title}</h4>
                  <p className="counts">{cat.count} Items</p>
                </div>
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CollectionStyle;
