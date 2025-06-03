import React, { useState, useCallback, useEffect, useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import renderTime from "./renderTime";
import Countdown from "react-countdown";
import useFetchOneProduct from "../Hooks/useFetchOneProduct";
import { AddToCart } from "../API/AddToCart";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate, useLocation } from "react-router-dom";
import { useWishlist } from "../../Context/WishlistContext";
import { useCart } from "../../Context/CartContext";
import Spinner from "../../Components/UI/SpinnerLoading";
import Modal from "../../Components/UI/Modal";
import { useTranslation } from "react-i18next";

const SOCIAL_ICONS = [
  { icon: "twitter", title: "Twitter" },
  { icon: "pinterest-p", title: "Pinterest" },
  { icon: "linkedin-in", title: "Linkedin" },
  { icon: "instagram", title: "Instagram" },
  { icon: "youtube", title: "Youtube" },
];

const ProductDetail = ({ product }) => {
  // NEW SCHEMA CHANGE: Product comes from props
  const { t } = useTranslation();
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

  console.log(product);
  const navigate = useNavigate();
  const location = useLocation();
  const { updateCart } = useCart();
  const { addToWishlist } = useWishlist();

  // NEW SCHEMA CHANGE: Updated inventory check
  const isInStock = product?.inventory?.qty > 0;

  const handleAddToWishlist = (e, product) => {
    e.preventDefault();
    addToWishlist({
      id: product.product_id,
      name: product.description?.name,
      price: product.price,
      stock: isInStock ? "In Stock" : "Out Of Stock",
      disabled: !isInStock,
      imgSrc: product.images?.[0]?.origin_image || "",
      variant: product.colors?.[0] || "Default variant",
      url_key: product.description.url_key || "Undefiend",
    });
    toast.success(`${product.description?.name} added to wishlist!`);
  };

  const [openModal, setOpenModal] = useState(false);
  const toggleModal = () => setOpenModal((prev) => !prev);

  const viewLoginPage = () => {
    setAddToCartStatus({
      loading: false,
      message: "You should Sign In",
      error: true,
    });
    navigate(`/LogIn?redirect=${location.pathname}`);
  };

  const handleAddToCart = async () => {
    if (!product) {
      setAddToCartStatus({
        loading: false,
        message: "Product data is missing",
        error: true,
      });
      return;
    }

    const productId = product.product_id; // NEW SCHEMA CHANGE
    if (!productId) {
      setAddToCartStatus({
        loading: false,
        message: "Product ID is missing",
        error: true,
      });
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      toggleModal();
      return;
    }

    setAddToCartStatus({ loading: true, message: "", error: null });

    let result;
    try {
      result = await AddToCart(productId, quantity, product.description?.name); // NEW SCHEMA CHANGE
    } catch (err) {
      toast.error("Add item failed!");
    }

    setAddToCartStatus({
      loading: false,
      message: result?.message,
      error: !result?.success,
    });

    if (result?.success) {
      toast.success(result.message);
      await updateCart();
    } else {
      toast.error(result?.message || "Failed to add item.");
    }
  };

  // NEW SCHEMA CHANGE: Updated image handling
  const productImages = useMemo(() => product?.images || [], [product]);
  const imageToDisplay = useMemo(
    () => activeImage || productImages[0]?.origin_image || "",
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
    setActiveImage(image?.origin_image || "");
  }, []);

  const handleQuantityChange = useCallback((newQuantity) => {
    if (newQuantity >= 1) setQuantity(newQuantity);
  }, []);

  useEffect(() => {
    if (productImages.length > 0 && !activeImage) {
      handleThumbnailClick(productImages[0]);
    }
  }, [productImages, activeImage, handleThumbnailClick]);

  if (!product) return <Spinner />;

  const renderStars = () => (
    <div className="reviewStar d-flex-center">
      {[...Array(5)].map((_, i) => (
        <i
          key={i}
          className={`fa${
            i < Math.floor(product.rating || 0) ? "s" : "r"
          } fa-star`}
          style={{ color: "gold" }}
        />
      ))}
    </div>
  );

  const renderThumbnails = () =>
    productImages.length > 1 && (
      <div className="product-thumb product-horizontal-thumb mt-3">
        <div id="gallery" className="product-thumb-horizontal">
          <Slider {...getSliderSettings(productImages.length)}>
            {productImages.map((image, index) => (
              <div key={index} className="px-1">
                <button
                  onClick={() => handleThumbnailClick(image)}
                  className={`thumbnail-btn ${
                    activeImage === image.origin_image ? "active" : ""
                  }`}
                  style={{
                    background: "none",
                    border:
                      activeImage === image.origin_image
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
                    src={image.origin_image}
                    alt={`${product.description?.name || "Product"} thumbnail ${
                      index + 1
                    }`}
                    style={{
                      width: "100%",
                      height: "auto",
                      display: "block",
                    }}
                  />
                </button>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    );

  return (
    <div className="container">
      <Toaster />
      <Modal open={openModal}>
        <div className="p-4 text-center">
          <h2 className="fw-bold text-white h1">{t(`product.Should_Login`)}</h2>
          <div className="d-flex justify-content-center gap-3 mt-4">
            <button
              onClick={viewLoginPage}
              className="btn btn-secondary px-4 btn-one-hover-shipp"
            >
              Login
            </button>
            <button
              onClick={toggleModal}
              className="btn btn-primary px-4 btn-tow-hover-shipp"
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>
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
                    alt={product.description?.name || "Product"}
                  />
                </div>
                <div className="product-labels">
                  {/* NEW SCHEMA CHANGE: You might need to add these flags to your schema */}
                  {product.isNew && (
                    <span className="lbl pr-label1">{t(`product.New`)}</span>
                  )}
                  {product.discountPercentage > 0 && (
                    <span className="lbl on-sale">
                      {product.discountPercentage}% {t(`product.Off`)}
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
              <h1 className="main-title-heading">
                {product.description?.name || "Product"}
              </h1>

              <div className="product-review d-flex-center mb-3">
                {renderStars()}
                <Link to="#reviews" className="reviewLink d-flex-center">
                  {product.reviews?.length || 0} {t(`Reviews`)}
                </Link>
              </div>

              <div className="product-info">
                <div className="product-stock-title d-flex align-items-center ">
                  {t(`Availability`)}:{" "}
                  <span className="pro-stockLbl ps-1">
                    {isInStock ? "In Stock" : "Out of Stock"}
                  </span>
                </div>
                <div className="product-stock-title d-none">
                  {t(`product.Vendor`)}:{" "}
                  <Link to="#">{product.brand?.name || "No Brand"}</Link>
                </div>
                <div className="product-stock-title align-items-center">
                  {t(`Category`)}:{" "}
                  <span>
                    {product.category?.description?.name || "No Category"}
                  </span>
                </div>
                <div className="product-stock-title align-items-center">
                  {t(`product.SKU`)}: <span>{product.sku || "N/A"}</span>
                </div>
              </div>

              <div className="product-price d-flex-center my-3 align-items-center">
                {product.old_price && (
                  <span className="price old-price">
                    ${product.old_price.toFixed(2)}
                  </span>
                )}
                <span className="price">
                  ${product.price?.toFixed(2) || "0.00"}
                </span>
              </div>

              <hr />
              <div className="desc-content">
                {product.description?.short_description ||
                  "No description available"}
              </div>
              <hr />

              {/* <div className="harry-up-text">{t(`product.Hurry_up`)}</div>
              <Countdown date={FINAL_DATE} renderer={renderTime} /> */}
            </div>

            <form className="product-form product-form-border hidedropdown">
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
                    className={`btn btn-secondary proceed-to-checkout text-nowrap ${
                      !isInStock ? "soldOutBtn disabled" : ""
                    }`}
                    onClick={handleAddToCart}
                    disabled={!isInStock}
                  >
                    {addToCartStatus.loading ? (
                      <>
                        <i className="fa-solid fa-spinner fa-spin me-2"></i>
                        {t(`product.Adding`)}
                      </>
                    ) : !isInStock ? (
                      t(`product.Out_Stock`)
                    ) : (
                      t(`product.Add_Cart`)
                    )}
                  </button>
                </div>
              </div>

              <p className="infolinks d-flex-center">
                <Link
                  to="#"
                  onClick={(e) => handleAddToWishlist(e, product)}
                  className="text-link wishlist"
                  style={{
                    pointerEvents: "auto",
                    opacity: 1,
                  }}
                >
                  <i className="fa-regular fa-heart me-2" />
                  {isInStock
                    ? t(`product.Add_Wishlist`)
                    : t(`product.Out_Stock`)}
                </Link>
                <Link to="/FAQ" className="text-link shippingInfo">
                  <i className="fa-regular fa-paper-plane me-2" />{" "}
                  {t(`product.Delivery`)}
                </Link>
              </p>
            </form>

            <div className="userViewMsg featureText">
              <i className="fa-regular fa-eye me-1" />
              <b>{product.views || 0}</b> {t(`product.People_Looking`)}
            </div>
            <div className="shippingMsg featureText">
              <i className="fa-regular fa-clock me-1" />
              {t(`product.Estimated_Between`)} <b>{t(`product.Wed`)}</b>{" "}
              {t(`and`)} <b>{t(`product.Tue`)}</b>.
            </div>

            <div className="payment-shop d-flex align-self-center">
              <span className="sharing-lbl">{t(`Share`)} :</span>
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
