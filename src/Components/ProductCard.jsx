// ProductCard.jsx
import React from "react";

const ProductCard = ({ product }) => {
  return (
    <div className="item col-item">
      <div className="product-box">
        {/* Product Image */}
        <div className="product-image">
          <a href={product.link} className="product-img rounded-3">
            <img
              className="primary blur-up lazyload"
              src={product.image}
              alt={product.name}
              title={product.name}
              width="625"
              height="808"
            />
            <img
              className="hover blur-up lazyload"
              src={product.hoverImage}
              alt={product.name}
              title={product.name}
              width="625"
              height="808"
            />
          </a>
          {/* Product Labels */}
          <div className="product-labels">
            {product.labels.map((label) => (
              <span
                key={`${label.text}-${label.class}`}
                className={`lbl ${label.class}`}
              >
                {label.text}
              </span>
            ))}
          </div>
          {/* Product Buttons */}
          <div className="button-set style1">
            {/* Add to Cart */}
            <a
              href="#addtocart-modal"
              className="btn-icon addtocart add-to-cart-modal"
              data-bs-toggle="modal"
              data-bs-target="#addtocart_modal"
            >
              <span
                className="icon-wrap d-flex-justify-center h-100 w-100"
                data-bs-toggle="tooltip"
                data-bs-placement="left"
                title="Add to Cart"
              >
                <i className="fa-solid fa-cart-plus"></i>
                <span className="text">Add to Cart</span>
              </span>
            </a>
            {/* Quick View */}
            <a
              href="#quickview-modal"
              className="btn-icon quickview quick-view-modal"
              data-bs-toggle="modal"
              data-bs-target="#quickview_modal"
            >
              <span
                className="icon-wrap d-flex-justify-center h-100 w-100"
                data-bs-toggle="tooltip"
                data-bs-placement="left"
                title="Quick View"
              >
                <i className="fa-solid fa-magnifying-glass"></i>
                <span className="text">Quick View</span>
              </span>
            </a>
            {/* Wishlist */}
            <a
              href="wishlist-style2.html"
              className="btn-icon wishlist"
              data-bs-toggle="tooltip"
              data-bs-placement="left"
              title="Add To Wishlist"
            >
              <i className="fa-solid fa-heart"></i>
              <span className="text">Add To Wishlist</span>
            </a>
            {/* Compare */}
            <a
              href="compare-style2.html"
              className="btn-icon compare"
              data-bs-toggle="tooltip"
              data-bs-placement="left"
              title="Add to Compare"
            >
              <i className="fa-solid fa-code-compare"></i>
              <span className="text">Add to Compare</span>
            </a>
          </div>
        </div>
        {/* Product Details */}
        <div className="product-details">
          <div className="product-name">
            <a href={product.link}>{product.name}</a>
          </div>
          <div className="product-price">
            <span className="price">{product.price}</span>
          </div>
          <div className="product-review">
            {[...Array(5)].map((_, index) => (
              <i
                key={`star-${index}`}
                className={
                  index < product.rating ? "fas fa-star" : "far fa-star"
                }
                style={{ color: "gold" }}
              ></i>
            ))}
            <span className="caption hidden ms-1">
              {product.reviews} Reviews
            </span>
          </div>
          <ul className="variants-clr swatches">
            {product.variants.map((variant) => (
              <li key={variant} className={`swatch medium radius ${variant}`}>
                <span
                  className="swatchLbl"
                  data-bs-toggle="tooltip"
                  data-bs-placement="top"
                  title={variant}
                ></span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
