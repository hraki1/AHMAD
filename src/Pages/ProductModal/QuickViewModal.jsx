import React from "react";
import { Modal, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faCodeCompare,
  faMinus,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import {
  faFacebookF,
  faTwitter,
  faPinterestP,
  faLinkedinIn,
  faInstagram,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";

// استيراد الصور يدويًا
import img1 from "../../assets/images/products/product2.jpg";
import img2 from "../../assets/images/products/product2-1.jpg";
import img3 from "../../assets/images/products/product2-2.jpg";

const images = [img1, img2, img3];

const QuickViewModal = ({ show, onHide }) => {
  return (
    <Modal
      className="quickview-modal"
      show={show}
      onHide={onHide}
      size="lg"
      centered
    >
      <Modal.Body>
        <button
          type="button"
          className="btn-close"
          onClick={onHide}
          aria-label="Close"
        ></button>
        <div className="row">
          {/* Left Side - Carousel */}
          <div className="col-12 col-sm-6 mb-3">
            <div id="quickView" className="carousel slide">
              <div className="carousel-inner">
                {images.map((img, i) => (
                  <div
                    key={i}
                    className={`carousel-item ${i === 0 ? "active" : ""}`}
                  >
                    <img
                      className="rounded-0"
                      src={img}
                      alt="product"
                      title="Product"
                      width="625"
                      height="808"
                    />
                  </div>
                ))}
              </div>

              {/* Carousel indicators */}
              <div className="carousel-indicators list-inline">
                {images.map((img, i) => (
                  <div
                    key={i}
                    className={`list-inline-item ${i === 0 ? "active" : ""}`}
                    data-bs-target="#quickView"
                    data-bs-slide-to={i}
                  >
                    <img
                      className="rounded-0"
                      src={img}
                      alt="product"
                      title="Product"
                      width="100"
                      height="100"
                    />
                  </div>
                ))}
              </div>

              {/* Arrows */}
              <a
                className="carousel-control-prev"
                href="#quickView"
                role="button"
                data-bs-slide="prev"
              >
                <i className="icon anm anm-angle-left-r"></i>
              </a>
              <a
                className="carousel-control-next"
                href="#quickView"
                role="button"
                data-bs-slide="next"
              >
                <i className="icon anm anm-angle-right-r"></i>
              </a>
            </div>

            <div className="text-center mt-3">
              <a href="product-layout1.html" className="text-link">
                View More Details
              </a>
            </div>
          </div>

          {/* Right Side - Product Info */}
          <div className="col-12 col-sm-6">
            <h2 className="product-title">Product Quick View Popup</h2>
            <div className="product-review d-flex">
              <div className="rating text-warning">
                {[...Array(4)].map((_, i) => (
                  <i key={i} className="fas fa-star"></i>
                ))}
                <i className="far fa-star"></i>
              </div>
              <div className="reviews ms-2">
                <a href="#">10 Reviews</a>
              </div>
            </div>

            <div className="product-info">
              <p className="product-vendor">
                Vendor: <a href="#">HVL</a>
              </p>
              <p className="product-sku">
                SKU: <span>RF104</span>
              </p>
            </div>

            <div className="product-price my-3">
              <span className="price old-price me-2">$135.00</span>
              <span className="price">$129.00</span>
            </div>

            <p className="sort-description">
              The standard chunk of Lorem Ipsum used since the 1500s is
              reproduced below for those interested.
            </p>

            {/* Options: Color */}
            <div className="product-item swatches-image mb-3">
              <label>
                Color: <span className="fw-bold ms-1">Blue</span>
              </label>
              <ul className="d-flex pt-1">
                {["blue", "black", "pink", "green", "yellow"].map(
                  (color, index) => (
                    <li
                      key={index}
                      className={`swatch large radius ${
                        color === "yellow" ? "soldout" : "available"
                      } ${color}`}
                    >
                      <span
                        title={color.charAt(0).toUpperCase() + color.slice(1)}
                      ></span>
                    </li>
                  )
                )}
              </ul>
            </div>

            {/* Options: Size */}
            <div className="product-item swatches-size mb-3">
              <label>
                Size: <span className="fw-bold ms-1">S</span>
              </label>
              <ul className="d-flex pt-1">
                {["XS", "S", "M", "L", "XL"].map((size, i) => (
                  <li
                    key={i}
                    className={`swatch large radius ${
                      size === "XS" ? "soldout" : "available"
                    } ${size === "S" ? "active" : ""}`}
                  >
                    <span title={size}>{size}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quantity & Cart */}
            <div className="d-flex mb-3">
              <div className="quantity me-3">
                <div className="qtyField">
                  <a className="qtyBtn minus" href="#">
                    <FontAwesomeIcon icon={faMinus} />
                  </a>
                  <input
                    type="text"
                    name="quantity"
                    value="1"
                    className="product-form__input qty"
                    readOnly
                  />
                  <a className="qtyBtn plus" href="#">
                    <FontAwesomeIcon icon={faPlus} />
                  </a>
                </div>
              </div>
              <div className="addtocart flex-grow-1">
                <Button className="w-100 product-cart-submit">
                  Add to cart
                </Button>
              </div>
            </div>

            {/* Wishlist & Compare */}
            <div className="wishlist-btn d-flex justify-content-start">
              <a href="wishlist-style1.html" className="me-3">
                <FontAwesomeIcon icon={faHeart} className="me-1" />
                Add to Wishlist
              </a>
              <a href="compare-style1.html">
                <FontAwesomeIcon icon={faCodeCompare} className="me-2" />
                Add to Compare
              </a>
            </div>

            {/* Social Share */}
            <div className="social-sharing mt-3 d-flex align-items-center">
              <span className="me-2">Share :</span>
              <ul className="list-inline d-flex mb-0">
                {[
                  faFacebookF,
                  faTwitter,
                  faPinterestP,
                  faLinkedinIn,
                  faInstagram,
                  faYoutube,
                ].map((icon, index) => (
                  <li key={index} className="list-inline-item me-2">
                    <a href="#">
                      <FontAwesomeIcon icon={icon} />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default QuickViewModal;
