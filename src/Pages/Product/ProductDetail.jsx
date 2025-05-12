import React, { useState, useCallback, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import renderTime from "./renderTime";
import Countdown from "react-countdown";
import useFetchOneProduct from "../../utils/useFetchOneProduct";

const socialIcons = [
  { icon: "twitter", title: "Twitter" },
  { icon: "pinterest-p", title: "Pinterest" },
  { icon: "linkedin-in", title: "Linkedin" },
  { icon: "instagram", title: "Instagram" },
  { icon: "youtube", title: "Youtube" },
];

export default function ProductDetail() {
  const { productId } = useParams();
  const { product, loading, error } = useFetchOneProduct(productId);
  const [activeImage, setActiveImage] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const finalDate = "2026-12-12T00:00:00";

  // Dynamic slider settings based on number of images
  const getSliderSettings = (imagesCount) => {
    return {
      autoplay: imagesCount > 3,
      autoplaySpeed: 2000,
      infinite: imagesCount > 3,
      slidesToShow: Math.min(5, imagesCount),
      slidesToScroll: 1,
      centerMode: imagesCount <= 3,
      centerPadding: "0",
      focusOnSelect: true,
      arrows: imagesCount > 3,
      dots: false,
      responsive: [
        {
          breakpoint: 992,
          settings: {
            slidesToShow: Math.min(4, imagesCount),
          },
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: Math.min(3, imagesCount),
          },
        },
        {
          breakpoint: 576,
          settings: {
            slidesToShow: Math.min(2, imagesCount),
          },
        },
      ],
    };
  };

  const handleThumbnailClick = useCallback(
    (image) => setActiveImage(image),
    []
  );

  const preventDefault = useCallback((e) => e.preventDefault(), []);

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity >= 1) setQuantity(newQuantity);
  };

  useEffect(() => {
    if (product?.images?.length > 0 && !activeImage) {
      setActiveImage(product.images[0]?.origin_image || product.images[0]);
    }
  }, [product, activeImage]);

  if (loading) {
    return <div className="loading-spinner">Loading...</div>;
  }

  if (error) {
    return (
      <div className="error-alert">
        Error: {error}
        <button onClick={() => window.location.reload()}>Retry</button>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="empty-state">
        Product not found
        <Link to="/products">Back to products</Link>
      </div>
    );
  }

  const productImages = product.images || [];
  const imageToDisplay =
    activeImage ||
    (productImages.length > 0
      ? productImages[0]?.origin_image || productImages[0]
      : "path_to_default_image.jpg");

  return (
    <div className="container">
      <div className="product-single">
        <div className="row">
          {/* Product Images */}
          <div className="col-lg-6 col-md-6 col-sm-12 col-12 product-layout-img mb-4 mb-md-0">
            <div className="product-details-img product-horizontal-style">
              <div className="zoompro-wrap">
                <div className="zoompro-span">
                  <img
                    className="zoompro img-fluid"
                    src={imageToDisplay}
                    alt={product.name}
                  />
                </div>
                <div className="product-labels">
                  {product.isNew && <span className="lbl pr-label1">New</span>}
                  {product.discountPercentage > 0 && (
                    <span className="lbl on-sale">
                      {product.discountPercentage}% Off
                    </span>
                  )}
                </div>
                <div className="product-buttons">
                  {product.videoLink && (
                    <Link
                      to={product.videoLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-primary"
                    >
                      <span className="icon-wrap d-flex-justify-center h-100 w-100">
                        <i className="fa-solid fa-video" />
                      </span>
                    </Link>
                  )}
                  <button
                    type="button"
                    className="btn btn-primary prlightbox"
                    onClick={preventDefault}
                  >
                    <i className="fa-solid fa-arrows-to-eye" />
                  </button>
                </div>
              </div>

              {productImages.length > 1 && (
                <div className="product-thumb product-horizontal-thumb mt-3">
                  <div id="gallery" className="product-thumb-horizontal">
                    <Slider {...getSliderSettings(productImages.length)}>
                      {productImages.map((image, index) => {
                        const imageUrl = image?.origin_image || image;
                        return (
                          <div key={index} className="px-1">
                            <button
                              onClick={() => handleThumbnailClick(imageUrl)}
                              className={`thumbnail-btn ${
                                activeImage === imageUrl ? "active" : ""
                              }`}
                              style={{
                                background: "none",
                                border:
                                  activeImage === imageUrl
                                    ? "2px solid #007bff"
                                    : "1px solid #ddd",
                                padding: 0,
                                cursor: "pointer",
                                width: "100%",
                                borderRadius: "4px",
                                overflow: "hidden",
                                transition: "border-color 0.3s ease",
                              }}
                            >
                              <img
                                className="img-fluid blur-up lazyload"
                                src={imageUrl}
                                alt={`${product.name} thumbnail ${index + 1}`}
                                style={{
                                  width: "100%",
                                  height: "auto",
                                  display: "block",
                                }}
                              />
                            </button>
                          </div>
                        );
                      })}
                    </Slider>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Product Info */}
          <div className="col-lg-6 col-md-6 col-sm-12 col-12 product-layout-info">
            <div className="product-single-meta">
              <h1 className="main-title-heading">{product.name}</h1>

              <div className="product-review d-flex-center mb-3">
                <div className="reviewStar d-flex-center">
                  {[...Array(5)].map((_, i) => (
                    <i
                      key={i}
                      className={`fa${
                        i < Math.floor(product.rating) ? "s" : "r"
                      } fa-star`}
                      style={{ color: "gold" }}
                    />
                  ))}
                </div>
                <Link to="#reviews" className="reviewLink d-flex-center">
                  {product.reviewCount} Reviews
                </Link>
              </div>

              <div className="product-info">
                <div className="product-stock-title d-flex">
                  Availability:{" "}
                  <span className="pro-stockLbl ps-0 pt-1">
                    {product.inventory}
                  </span>
                </div>
                <div className="product-stock-title d-none">
                  Vendor: <Link to="#">{product.brand}</Link>
                </div>
                <div className="product-stock-title">
                  Category: <span>{product.category.name}</span>
                </div>
                <div className="product-stock-title">
                  SKU: <span>{product.sku}</span>
                </div>
              </div>
              <div className="product-price d-flex-center my-3">
                {product.oldPrice > product.price && (
                  <span className="price old-price">
                    ${product.oldPrice.toFixed()}
                  </span>
                )}
                <span className="price">${product.price.toFixed(2)}</span>
              </div>

              <hr />
              <div className="desc-content">{product.category.description}</div>
              <hr />

              <div className="harry-up-text">Hurry up! Sales Ends In</div>
              <Countdown date={finalDate} renderer={renderTime} />
            </div>

            <form className="product-form product-form-border hidedropdown">
              {product.colors?.length > 0 && (
                <div className="product-item swatches-image w-100 mb-4 swatch-0 option1">
                  <label className="label d-flex align-items-center">
                    Color:{" "}
                    <span className="slVariant ms-1 fw-bold">
                      {selectedColor || product.colors[0]}
                    </span>
                  </label>
                  <ul className="variants-clr swatches d-flex-center pt-1 clearfix">
                    {product.colors.map((color, idx) => (
                      <li
                        key={idx}
                        className={`swatch x-large available${
                          (selectedColor || product.colors[0]) === color
                            ? " active"
                            : ""
                        }`}
                        onClick={() => setSelectedColor(color)}
                      >
                        <div
                          className="color-swatch"
                          style={{ backgroundColor: color }}
                          title={color}
                        />
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {product.sizes?.length > 0 && (
                <div className="product-item swatches-size w-100 mb-4 swatch-1 option2">
                  <label className="label d-flex align-items-center">
                    Size:{" "}
                    <span className="slVariant ms-1 fw-bold">
                      {selectedSize || product.sizes[0]}
                    </span>
                    <Link
                      to="#sizechart-modal"
                      className="text-link sizelink text-muted"
                    >
                      Size Guide
                    </Link>
                  </label>
                  <ul className="variants-size size-swatches d-flex-center pt-1 clearfix">
                    {product.sizes.map((size, idx) => (
                      <li
                        key={size}
                        className={`swatch x-large${
                          (selectedSize || product.sizes[0]) === size
                            ? " available active"
                            : idx === 0
                            ? " soldout"
                            : " available"
                        }`}
                        onClick={() => setSelectedSize(size)}
                      >
                        <span className="swatchLbl" title={size}>
                          {size}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="product-action w-100 d-flex-wrap my-3 my-md-4">
                <div className="product-form-quantity d-flex-center">
                  <div className="qtyField">
                    <button
                      type="button"
                      className="qtyBtn minus"
                      onClick={() => handleQuantityChange(quantity - 1)}
                    >
                      <i className="fa-solid fa-minus" />
                    </button>
                    <input
                      type="text"
                      value={quantity}
                      className="product-form-input qty"
                      readOnly
                    />
                    <button
                      type="button"
                      className="qtyBtn plus"
                      onClick={() => handleQuantityChange(quantity + 1)}
                    >
                      <i className="fa-solid fa-plus" />
                    </button>
                  </div>
                </div>

                <div className="product-form-submit addcart fl-1 ms-3 d-none">
                  <button
                    type="submit"
                    className="btn btn-primary product-form-cart-submit"
                    disabled={product.stock <= 0}
                  >
                    {product.stock > 0 ? "Add to cart" : "Out of stock"}
                  </button>
                </div>

                <div className="product-form-submit buyit fl-1 ms-3">
                  <button
                    type="submit"
                    className="btn btn-secondary  proceed-to-checkout"
                  >
                    Buy it now
                  </button>
                </div>
              </div>

              <p className="infolinks d-flex-center justify-content-between">
                <Link to="/wishlist" className="text-link wishlist">
                  <i className="fa-regular fa-heart me-2" /> Add to Wishlist
                </Link>
                <Link to="/compare" className="text-link compare">
                  <i className="fa-solid fa-rotate me-2" /> Add to Compare
                </Link>
                <Link
                  to="#shippingInfo-modal"
                  className="text-link shippingInfo"
                >
                  <i className="fa-regular fa-paper-plane me-2" /> Delivery &
                  Returns
                </Link>
                <Link
                  to="#productInquiry-modal"
                  className="text-link emaillink me-0"
                >
                  <i className="fa-regular fa-circle-question me-2" /> Enquiry
                </Link>
              </p>
            </form>

            <div className="userViewMsg featureText">
              <i className="fa-regular fa-eye me-1" />
              <b>{product.views || 0}</b> People are Looking for this Product
            </div>

            <div className="shippingMsg featureText">
              <i className="fa-regular fa-clock me-1" />
              Estimated Delivery Between <b>Wed, May 1</b> and <b>Tue, May 7</b>
              .
            </div>

            <div className="payment-shop d-flex align-self-center">
              <span className="sharing-lbl">Share :</span>
              <ul className="list-inline social-icons d-inline-flex ms-1">
                {socialIcons.map((item) => (
                  <li key={item.icon} className="list-inline-item">
                    <Link to="#" title={item.title}>
                      <i className={`fab fa-${item.icon}`} />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
