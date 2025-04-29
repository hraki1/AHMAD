import React, { useState } from "react";
import img from "../../assets/images/products/product1.jpg";
import imgTow from "../../assets/images/products/product1-2.jpg";
import imgThree from "../../assets/images/products/product1-3.jpg";
import imgFour from "../../assets/images/products/electronic-product4-1.jpg";
import imgFive from "../../assets/images/products/product5-1.jpg";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import renderTime from "./renderTime";
import Countdown from "react-countdown";

export default function ProductDetail() {
  const [activeImage, setActiveImage] = useState(img);

  const images = [
    { img: img },
    { img: imgTow },
    { img: imgThree },
    { img: imgFour },
    { img: imgFive },
  ];

  const settings = {
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    centerPadding: "0",
    focusOnSelect: true,
  };
  // To change main image
  const handleThumbnailClick = (image) => {
    setActiveImage(image);
  };
  const finalDate = "2026-12-12T00:00:00"; //

  return (
    <div>
      <div className="container">
        {/*Product Content*/}
        <div className="product-single">
          <div className="row">
            <div className="col-lg-6 col-md-6 col-sm-12 col-12 product-layout-img mb-4 mb-md-0">
              {/* Product Horizontal */}
              <div className="product-details-img product-horizontal-style">
                {/* Product Main */}
                <div className="zoompro-wrap">
                  {/* Product Image */}
                  <div className="zoompro-span">
                    <img
                      id="zoompro"
                      className="zoompro"
                      src={activeImage}
                      data-zoom-image={activeImage}
                      alt="product"
                      width={625}
                      height={808}
                    />
                  </div>
                  {/* End Product Image */}
                  {/* Product Label */}
                  <div className="product-labels">
                    <span className="lbl pr-label1">New</span>
                    <span className="lbl on-sale">Sale</span>
                  </div>
                  {/* End Product Label */}
                  {/* Product Buttons */}
                  <div className="product-buttons">
                    <a
                      href="https://www.youtube.com/watch?v=450p7goxZqg&list=RDRBumgq5yVrA&index=4"
                      className="btn btn-primary"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span
                        className="icon-wrap d-flex-justify-center h-100 w-100"
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        title="Watch Video"
                      >
                        <i className="fa-solid fa-video" />
                      </span>
                    </a>
                    <a
                      href="#;"
                      className="btn btn-primary prlightbox"
                      data-bs-toggle="tooltip"
                      data-bs-placement="top"
                      title="Zoom Image"
                    >
                      <i className="fa-solid fa-arrows-to-eye" />
                    </a>
                  </div>
                  {/* End Product Buttons */}
                </div>
                {/* End Product Main */}
                {/* Product Thumb */}
                <div className="product-thumb product-horizontal-thumb mt-3">
                  <div id="gallery" className="product-thumb-horizontal">
                    <Slider {...settings}>
                      {images.map((image, index) => (
                        <a
                          key={index}
                          data-image={image.img}
                          data-zoom-image={image.img}
                          className="slick-slide"
                          onClick={() => handleThumbnailClick(image.img)}
                        >
                          <img
                            className="blur-up lazyload"
                            data-src={image.img}
                            src={image.img}
                            alt="product"
                            width={625}
                            height={808}
                          />
                        </a>
                      ))}
                    </Slider>
                  </div>
                </div>
                {/* End Product Thumb */}
                {/* Product Gallery */}
                <div className="lightboximages">
                  <a href={img} data-size="1000x1280" />
                  <a href={imgTow} data-size="1000x1280" />
                  <a href={imgThree} data-size="1000x1280" />
                  <a href={imgFour} data-size="1000x1280" />
                  <a href={imgFive} data-size="1000x1280" />
                </div>
                {/* End Product Gallery */}
              </div>
              {/* End Product Horizontal */}
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12 col-12 product-layout-info">
              {/* Product Details */}
              <div className="product-single-meta">
                <div className="main-title-heading">Product Layout Style</div>
                {/* Product Reviews */}
                <div className="product-review d-flex-center mb-3">
                  <div className="reviewStar d-flex-center">
                    <i className="fas fa-star" style={{ color: "gold" }} />
                    <i className="fas fa-star" style={{ color: "gold" }} />
                    <i className="fas fa-star" style={{ color: "gold" }} />
                    <i className="fas fa-star" style={{ color: "gold" }} />
                    <i className="far fa-star" style={{ color: "gold" }} />
                    <span className="caption hidden ms-1">""</span>
                  </div>
                  <a className="reviewLink d-flex-center" href="#reviews">
                    3 Reviews
                  </a>
                </div>
                {/* End Product Reviews */}
                {/* Product Info */}
                <div className="product-info">
                  <div className="product-stock-title d-flex">
                    Availability:
                    <span className="pro-stockLbl ps-0">
                      <span className="d-flex-center stockLbl instock text-uppercase">
                        {" "}
                        In stock
                      </span>
                    </span>
                  </div>
                  <div className="product-stock-title">
                    Vendor:
                    <span className="text">
                      <a href="#">HVL</a>
                    </span>
                  </div>
                  <div className="product-stock-title">
                    Product Type:<span className="text">Tops</span>
                  </div>
                  <div className="product-stock-title">
                    SKU:<span className="text">RF104</span>
                  </div>
                </div>
                {/* End Product Info */}
                {/* Product Price */}
                <div className="product-price d-flex-center my-3">
                  <span className="price old-price">$135.00</span>
                  <span className="price">$99.00</span>
                </div>
                {/* End Product Price */}
                <hr />
                {/* Sort Description */}
                <div className="desc-content">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s.
                </div>
                {/* End Sort Description */}
                <hr />
                {/* Countdown */}
                <div className="harry-up-text">Hurry up! Sales Ends In</div>
                <Countdown date={finalDate} renderer={renderTime} />

                {/* End Countdown */}
              </div>
              {/* End Product Details */}
              {/* Product Form */}
              <form
                method="post"
                action="#"
                className="product-form product-form-border hidedropdown"
              >
                {/* Swatches */}
                <div className="product-swatches-option">
                  {/* Swatches Color */}
                  <div
                    className="product-item swatches-image w-100 mb-4 swatch-0 option1"
                    data-option-index={0}
                  >
                    <label className="label d-flex align-items-center">
                      Color:
                      <span className="slVariant ms-1 fw-bold">Blue</span>
                    </label>
                    <ul className="variants-clr swatches d-flex-center pt-1 clearfix">
                      <li className="swatch x-large available active">
                        <img
                          src={img}
                          alt="image"
                          width={80}
                          height={80}
                          data-bs-toggle="tooltip"
                          data-bs-placement="top"
                          title="Blue"
                        />
                      </li>
                      <li className="swatch x-large available">
                        <img
                          src={imgTow}
                          alt="image"
                          width={80}
                          height={80}
                          data-bs-toggle="tooltip"
                          data-bs-placement="top"
                          title="Black"
                        />
                      </li>
                      <li className="swatch x-large available purple">
                        <img
                          src={imgThree}
                          alt="image"
                          width={80}
                          height={80}
                          data-bs-toggle="tooltip"
                          data-bs-placement="top"
                          title="Purple"
                        />
                      </li>
                      <li className="swatch x-large available green">
                        <img
                          src={imgFour}
                          alt="image"
                          width={80}
                          height={80}
                          data-bs-toggle="tooltip"
                          data-bs-placement="top"
                          title="Green"
                        />
                      </li>
                      <li className="swatch x-large soldout yellow">
                        <img
                          src={imgFive}
                          alt="image"
                          width={80}
                          height={80}
                          data-bs-toggle="tooltip"
                          data-bs-placement="top"
                          title="Yellow"
                        />
                      </li>
                    </ul>
                  </div>
                  {/* End Swatches Color */}
                  {/* Swatches Size */}
                  <div
                    className="product-item swatches-size w-100 mb-4 swatch-1 option2"
                    data-option-index={1}
                  >
                    <label className="label d-flex align-items-center">
                      Size:<span className="slVariant ms-1 fw-bold">S</span>{" "}
                      <a
                        href="#sizechart-modal"
                        className="text-link sizelink text-muted size-chart-modal"
                        data-bs-toggle="modal"
                        data-bs-target="#sizechart_modal"
                      >
                        Size Guide
                      </a>
                    </label>
                    <ul className="variants-size size-swatches d-flex-center pt-1 clearfix">
                      <li className="swatch x-large soldout">
                        <span
                          className="swatchLbl"
                          data-bs-toggle="tooltip"
                          data-bs-placement="top"
                          title="XS"
                        >
                          XS
                        </span>
                      </li>
                      <li className="swatch x-large available active">
                        <span
                          className="swatchLbl"
                          data-bs-toggle="tooltip"
                          data-bs-placement="top"
                          title="S"
                        >
                          S
                        </span>
                      </li>
                      <li className="swatch x-large available">
                        <span
                          className="swatchLbl"
                          data-bs-toggle="tooltip"
                          data-bs-placement="top"
                          title="M"
                        >
                          M
                        </span>
                      </li>
                      <li className="swatch x-large available">
                        <span
                          className="swatchLbl"
                          data-bs-toggle="tooltip"
                          data-bs-placement="top"
                          title="L"
                        >
                          L
                        </span>
                      </li>
                      <li className="swatch x-large available">
                        <span
                          className="swatchLbl"
                          data-bs-toggle="tooltip"
                          data-bs-placement="top"
                          title="XL"
                        >
                          XL
                        </span>
                      </li>
                    </ul>
                  </div>
                  {/* End Swatches Size */}
                </div>
                {/* End Swatches */}
                {/* Product Action */}
                <div className="product-action w-100 d-flex-wrap my-3 my-md-4">
                  {/* Product Quantity */}
                  <div className="product-form-quantity d-flex-center">
                    <div className="qtyField">
                      <a className="qtyBtn minus" href="#;">
                        <i className="fa-solid fa-minus" />
                      </a>
                      <input
                        type="text"
                        name="quantity"
                        defaultValue={1}
                        className="product-form-input qty"
                      />
                      <a className="qtyBtn plus" href="#;">
                        <i className="fa-solid fa-plus" />
                      </a>
                    </div>
                  </div>
                  {/* End Product Quantity */}
                  {/* Product Add */}
                  <div className="product-form-submit addcart fl-1 ms-3">
                    <button
                      type="submit"
                      name="add"
                      className="btn btn-secondary product-form-cart-submit"
                    >
                      <span>Add to cart</span>
                    </button>
                    <button
                      type="submit"
                      name="add"
                      className="btn btn-secondary product-form-sold-out d-none"
                      disabled="disabled"
                    >
                      <span>Out of stock</span>
                    </button>
                    <button
                      type="submit"
                      name="add"
                      className="btn btn-secondary product-form-pre-order d-none"
                    >
                      <span>Pre-order Now</span>
                    </button>
                  </div>
                  {/* Product Add */}
                  {/* Product Buy */}
                  <div className="product-form-submit buyit fl-1 ms-3">
                    <button
                      type="submit"
                      className="btn btn-primary proceed-to-checkout"
                    >
                      <span>Buy it now</span>
                    </button>
                  </div>
                  {/* End Product Buy */}
                </div>
                {/* End Product Action */}
                {/* Product Info link */}
                <p className="infolinks d-flex-center justify-content-between">
                  <a className="text-link wishlist" href="wishlist-style1.html">
                    <i className="fa-regular fa-heart me-2" />{" "}
                    <span>Add to Wishlist</span>
                  </a>
                  <a className="text-link compare" href="compare-style1.html">
                    <i className="fa-solid fa-rotate me-2" />{" "}
                    <span>Add to Compare</span>
                  </a>
                  <a
                    href="#shippingInfo-modal"
                    className="text-link shippingInfo"
                    data-bs-toggle="modal"
                    data-bs-target="#shippingInfo_modal"
                  >
                    <i className="fa-regular fa-paper-plane  me-2" />{" "}
                    <span>Delivery &amp; Returns</span>
                  </a>
                  <a
                    href="#productInquiry-modal"
                    className="text-link emaillink me-0"
                    data-bs-toggle="modal"
                    data-bs-target="#productInquiry_modal"
                  >
                    <i className="fa-regular fa-circle-question  me-2" />{" "}
                    <span>Enquiry</span>
                  </a>
                </p>
                {/* End Product Info link */}
              </form>
              {/* End Product Form */}
              {/* Product Info */}
              <div
                className="userViewMsg featureText"
                data-user={20}
                data-time={11000}
              >
                <i className="fa-regular fa-eye  me-1" />
                <b className="uersView">21</b> People are Looking for this
                Product
              </div>
              <div className="shippingMsg featureText">
                <i className="fa-regular fa-clock  me-1" />
                Estimated Delivery Between <b id="fromDate">
                  Wed, May 1
                </b> and <b id="toDate">Tue, May 7</b>.
              </div>
              <div className="freeShipMsg featureText" data-price={199}>
                <i className="fa-solid fa-truck  me-1" />
                Spent{" "}
                <b className="freeShip">
                  <span
                    className="money"
                    data-currency-usd="$199.00"
                    data-currency="USD"
                  >
                    $199.00
                  </span>
                </b>{" "}
                More for Free shipping
              </div>
              {/* End Product Info */}
              {/* Social Sharing */}
              <div className="payment-shop d-flex align-self-center">
                <span className="sharing-lbl">Share :</span>
                <ul className="list-inline social-icons d-inline-flex ms-1">
                  <li className="list-inline-item">
                    <a href="#" title="Twitter">
                      <i className="fab fa-twitter" />
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <a href="#" title="Pinterest">
                      <i className="fab fa-pinterest-p" />
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <a href="#" title="Linkedin">
                      <i className="fab fa-linkedin-in" />
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <a href="#" title="Instagram">
                      <i className="fab fa-instagram" />
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <a href="#" title="Youtube">
                      <i className="fab fa-youtube" />
                    </a>
                  </li>
                </ul>
              </div>
              {/* End Social Sharing */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
