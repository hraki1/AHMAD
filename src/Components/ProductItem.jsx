import React, { useState } from "react";
import { productsData } from "./data";

export default function ProductItem() {
  const [products] = useState(productsData); // import from data and save it inside usestate

  return (
    <section className="section product-slider pb-0 mb-5">
      <div className="container">
        <div className="section-header">
          <div className="main-title-pages">You may also like</div>
        </div>
        <div className="product-slider-4items gp10 arwOut5 grid-products">
          <div className="row">
            {products.map((product, index) => (
              <div
                key={index}
                className="col-md-3 col-sm-6 col-12"
                style={{ position: "relative" }}
              >
                <div className="product-box">
                  <div className="product-image">
                    <a
                      href="product-layout1.html"
                      className="product-img rounded-3"
                    >
                      <img
                        className="blur-up lazyload"
                        src={product.image}
                        alt="Product"
                        title="Product"
                        width="625"
                        height="808"
                      />
                    </a>
                    <div className="product-labels productes-labels-imp">
                      <span className="lbl on-sale">Sale</span>
                    </div>
                    <div
                      className="saleTime"
                      data-countdown={product.saleTime}
                    ></div>
                    <div className="button-set style1">
                      <a
                        href="#quickshop-modal"
                        className="btn-icon addtocart quick-shop-modal"
                        data-bs-toggle="modal"
                        data-bs-target="#quickshop_modal"
                      >
                        <span
                          className="icon-wrap d-flex-justify-center h-100 w-100"
                          data-bs-toggle="tooltip"
                          data-bs-placement="left"
                          title="Quick Shop"
                        >
                          <i className="fa-solid fa-cart-plus"></i>
                          <span className="text">Quick Shop</span>
                        </span>
                      </a>
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
                          <i className="fa-solid fa-eye"></i>
                          <span className="text">Quick View</span>
                        </span>
                      </a>
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
                  <div className="product-details">
                    <div className="product-name">
                      <a href="product-layout1.html">{product.name}</a>
                    </div>
                    <div className="product-price">
                      <span className="price old-price">
                        {product.oldPrice}
                      </span>
                      <span className="price">{product.newPrice}</span>
                    </div>
                    <div className="product-review">
                      {[...Array(5)].map((_, index) => (
                        <i
                          key={index}
                          className={`fas fa-star ${
                            index < product.reviews ? "filled" : ""
                          }`}
                          style={{ color: "gold" }}
                        ></i>
                      ))}
                      <span className="caption hidden ms-1">
                        {product.reviews} Reviews
                      </span>
                    </div>
                    <ul className="variants-clr swatches">
                      {product.variantImages.map((image, index) => (
                        <li key={index} className="swatch medium radius">
                          <span
                            className="swatchLbl"
                            data-bs-toggle="tooltip"
                            data-bs-placement="top"
                            title={`Variant ${index + 1}`}
                          >
                            <img
                              src={image}
                              alt={`product-${index}`}
                              width="625"
                              height="808"
                            />
                          </span>
                        </li>
                      ))}
                    </ul>
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
