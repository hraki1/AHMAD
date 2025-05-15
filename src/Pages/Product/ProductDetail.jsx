import React, { useState, useCallback, useEffect, useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import renderTime from "./renderTime";
import Countdown from "react-countdown";
import useFetchOneProduct from "../Hooks/useFetchOneProduct";
import { AddToCart } from "../API/AddToCart";
import { toast } from "react-toastify";
import { useNavigate, useLocation } from "react-router-dom";

const SOCIAL_ICONS = [
  { icon: "twitter", title: "Twitter" },
  { icon: "pinterest-p", title: "Pinterest" },
  { icon: "linkedin-in", title: "Linkedin" },
  { icon: "instagram", title: "Instagram" },
  { icon: "youtube", title: "Youtube" },
];

const ProductDetail = () => {
  const { url_key } = useParams();
  const { product, loading, error } = useFetchOneProduct(url_key);
  const [activeImage, setActiveImage] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const FINAL_DATE = "2026-12-12T00:00:00";
  const [addToCartStatus, setAddToCartStatus] = useState({
    loading: false,
    message: "",
    error: null,
  });
  console.log("Product in component:", product);
  const navigate = useNavigate();
  const location = useLocation();

  const handleAddToCart = async () => {
    if (loading) {
      toast.info("Please wait while product data is loading");
      return;
    }

    if (!product) {
      setAddToCartStatus({
        loading: false,
        message: "Product ID is missing",
        error: true,
      });
      return;
    }
    const productId = product.id || product.product_id;
    if (!productId) {
      console.error("Product structure:", product); // لفحص هيكل البيانات
      setAddToCartStatus({
        loading: false,
        message: "Product ID is missing in product data",
        error: true,
      });
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      setAddToCartStatus({
        loading: false,
        message: "You should Sign In",
        error: true,
      });

      navigate(`/LogIn?redirect=${location.pathname}`);
      return;
    }

    setAddToCartStatus({ loading: true, message: "", error: null });

    const result = await AddToCart(productId, quantity);

    setAddToCartStatus({
      loading: false,
      message: result.message,
      error: !result.success,
    });

    if (result.success) {
      if (result.message && result.message.includes("already in your cart")) {
        toast.info(result.message);
        // Consider navigating to the cart or updating a local cart state if you manage one
      } else if (result.message && result.message.includes("increased")) {
        toast.success(result.message);
        // Consider navigating to the cart or updating a local cart state
      } else {
        toast.success(result.message || "Item added to cart!");
        // Consider navigating to the cart or updating a local cart state
      }
    } else {
      toast.error(result.message || "Failed to add item.");
    }
  };

  const productImages = useMemo(() => product?.images || [], [product]);
  const imageToDisplay = useMemo(
    () =>
      activeImage ||
      productImages[0]?.origin_image ||
      productImages[0]?.url ||
      productImages[0] ||
      "",
    [activeImage, productImages]
  );

  const getSliderSettings = useCallback(
    (imagesCount) => ({
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
          settings: { slidesToShow: Math.min(4, imagesCount) },
        },
        {
          breakpoint: 768,
          settings: { slidesToShow: Math.min(3, imagesCount) },
        },
        {
          breakpoint: 576,
          settings: { slidesToShow: Math.min(2, imagesCount) },
        },
      ],
    }),
    []
  );

  const handleThumbnailClick = useCallback((image) => {
    setActiveImage(image?.origin_image || image?.url || image);
  }, []);

  const handleQuantityChange = useCallback((newQuantity) => {
    if (newQuantity >= 1) setQuantity(newQuantity);
  }, []);

  useEffect(() => {
    if (productImages.length > 0 && !activeImage) {
      handleThumbnailClick(productImages[0]);
    }
  }, [productImages, activeImage, handleThumbnailClick]);

  if (loading) return <div className="loading-spinner">Loading...</div>;
  if (error)
    return (
      <div className="error-alert">
        Error: {error}
        <button onClick={() => window.location.reload()}>Retry</button>
      </div>
    );
  if (!product)
    return (
      <div className="empty-state">
        Product not found
        <Link to="/products">Back to products</Link>
      </div>
    );

  const renderStars = () => (
    <div className="reviewStar d-flex-center">
      {[...Array(5)].map((_, i) => (
        <i
          key={i}
          className={`fa${i < Math.floor(product.rating) ? "s" : "r"} fa-star`}
          style={{ color: "gold" }}
        />
      ))}
    </div>
  );

  const renderColorSwatches = () =>
    product.colors?.length > 0 && (
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
                (selectedColor || product.colors[0]) === color ? " active" : ""
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
    );

  const renderSizeSwatches = () =>
    product.sizes?.length > 0 && (
      <div className="product-item swatches-size w-100 mb-4 swatch-1 option2">
        <label className="label d-flex align-items-center">
          Size:{" "}
          <span className="slVariant ms-1 fw-bold">
            {selectedSize || product.sizes[0]}
          </span>
          <Link to="#sizechart-modal" className="text-link sizelink text-muted">
            Size Guide
          </Link>
        </label>
        <ul className="variants-size size-swatches d-flex-center pt-1 clearfix">
          {product.sizes.map((size) => (
            <li
              key={size}
              className={`swatch x-large${
                (selectedSize || product.sizes[0]) === size
                  ? " available active"
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
    );

  const renderThumbnails = () =>
    productImages.length > 1 && (
      <div className="product-thumb product-horizontal-thumb mt-3">
        <div id="gallery" className="product-thumb-horizontal">
          <Slider {...getSliderSettings(productImages.length)}>
            {productImages.map((image, index) => {
              const imageUrl = image?.origin_image || image?.url || image;
              return (
                <div key={index} className="px-1">
                  <button
                    onClick={() => handleThumbnailClick(image)}
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
    );

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
                  <button type="button" className="btn btn-primary prlightbox">
                    <i className="fa-solid fa-arrows-to-eye" />
                  </button>
                </div>
              </div>
              {renderThumbnails()}
            </div>
          </div>

          {/* Product Info */}
          <div className="col-lg-6 col-md-6 col-sm-12 col-12 product-layout-info">
            <div className="product-single-meta">
              <h1 className="main-title-heading">{product.name}</h1>

              <div className="product-review d-flex-center mb-3">
                {renderStars()}
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
              <Countdown date={FINAL_DATE} renderer={renderTime} />
            </div>

            <form className="product-form product-form-border hidedropdown">
              {/* {renderColorSwatches()}
              {renderSizeSwatches()} */}
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
                <div className="product-form-submit buyit fl-1 ms-3">
                  <button
                    type="button"
                    className="btn btn-secondary proceed-to-checkout"
                    onClick={handleAddToCart}
                    // disabled={product.stock <= 0}
                  >
                    {addToCartStatus.loading ? (
                      <>
                        <i className="fa-solid fa-spinner fa-spin me-2"></i>
                        Adding ...
                      </>
                    ) : (
                      "ADD to Cart"
                    )}
                  </button>

                  {addToCartStatus.message && (
                    <div
                      className={`mt-2 alert ${
                        addToCartStatus.error ? "alert-danger" : "alert-success"
                      }`}
                    >
                      {addToCartStatus.message}
                    </div>
                  )}
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
                {SOCIAL_ICONS.map(({ icon, title }) => (
                  <li key={icon} className="list-inline-item">
                    <Link to="#" title={title}>
                      <i className={`fab fa-${icon}`} />
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
};

export default ProductDetail;
