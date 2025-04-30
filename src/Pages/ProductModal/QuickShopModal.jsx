import React from "react";

const QuickShopModal = () => {
  return (
    <div
      className="quickshop-modal modal fade"
      id="quickshop_modal"
      tabIndex="-1"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-lg modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-body">
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
            <form
              method="post"
              action="#"
              id="product-form-quickshop"
              className="product-form align-items-center"
            >
              {/* Product Info */}
              <div className="row g-0 item mb-3">
                <a className="col-4 product-image" href="product-layout1.html">
                  <img
                    className="rounded-0 blur-up lazyload"
                    data-src="assets/images/products/addtocart-modal.jpg"
                    src="assets/images/products/addtocart-modal.jpg"
                    alt="Product"
                    title="Product"
                    width="625"
                    height="800"
                  />
                </a>
                <div className="col-8 product-details">
                  <div className="product-variant ps-3">
                    <a className="product-title" href="product-layout1.html">
                      Weave Hoodie Sweatshirt
                    </a>
                    <div className="priceRow mt-2 mb-3">
                      <div className="product-price m-0">
                        <span className="old-price">$114.00</span>
                        <span className="price">$99.00</span>
                      </div>
                    </div>
                    <div className="qtyField">
                      <a className="qtyBtn minus" href="#!">
                        <i className="fa-solid fa-minus"></i>
                      </a>
                      <input
                        type="text"
                        name="quantity"
                        defaultValue="1"
                        className="qty"
                      />
                      <a className="qtyBtn plus" href="#!">
                        <i className="fa-solid fa-plus"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              {/* End Product Info */}

              {/* Swatches Color */}
              <div
                className="variants-clr swatches-image clearfix mb-3 swatch-0 option1"
                data-option-index="0"
              >
                <label className="label d-flex justify-content-center">
                  Color:<span className="slVariant ms-1 fw-bold">Black</span>
                </label>
                <ul className="swatches d-flex-justify-center pt-1 clearfix">
                  <li className="swatch large radius available active">
                    <img
                      src="assets/images/products/swatches/blue-red.jpg"
                      alt="image"
                      width="70"
                      height="70"
                      data-bs-toggle="tooltip"
                      data-bs-placement="top"
                      title="Blue"
                    />
                  </li>
                  <li className="swatch large radius available">
                    <img
                      src="assets/images/products/swatches/blue-red.jpg"
                      alt="image"
                      width="70"
                      height="70"
                      data-bs-toggle="tooltip"
                      data-bs-placement="top"
                      title="Black"
                    />
                  </li>
                  <li className="swatch large radius available">
                    <img
                      src="assets/images/products/swatches/blue-red.jpg"
                      alt="image"
                      width="70"
                      height="70"
                      data-bs-toggle="tooltip"
                      data-bs-placement="top"
                      title="Pink"
                    />
                  </li>
                  <li className="swatch large radius available green">
                    <span
                      className="swatchLbl"
                      data-bs-toggle="tooltip"
                      data-bs-placement="top"
                      title="Green"
                    ></span>
                  </li>
                  <li className="swatch large radius soldout yellow">
                    <span
                      className="swatchLbl"
                      data-bs-toggle="tooltip"
                      data-bs-placement="top"
                      title="Yellow"
                    ></span>
                  </li>
                </ul>
              </div>
              {/* End Swatches Color */}

              {/* Swatches Size */}
              <div
                className="variants-size swatches-size clearfix mb-4 swatch-1 option2"
                data-option-index="1"
              >
                <label className="label d-flex justify-content-center">
                  Size:<span className="slVariant ms-1 fw-bold">S</span>
                </label>
                <ul className="size-swatches d-flex-justify-center pt-1 clearfix">
                  <li className="swatch large radius soldout">
                    <span
                      className="swatchLbl"
                      data-bs-toggle="tooltip"
                      data-bs-placement="top"
                      title="XS"
                    >
                      XS
                    </span>
                  </li>
                  <li className="swatch large radius available active">
                    <span
                      className="swatchLbl"
                      data-bs-toggle="tooltip"
                      data-bs-placement="top"
                      title="S"
                    >
                      S
                    </span>
                  </li>
                  <li className="swatch large radius available">
                    <span
                      className="swatchLbl"
                      data-bs-toggle="tooltip"
                      data-bs-placement="top"
                      title="M"
                    >
                      M
                    </span>
                  </li>
                  <li className="swatch large radius available">
                    <span
                      className="swatchLbl"
                      data-bs-toggle="tooltip"
                      data-bs-placement="top"
                      title="L"
                    >
                      L
                    </span>
                  </li>
                  <li className="swatch large radius available">
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

              {/* Product Action */}
              <div className="product-form-submit d-flex-justify-center">
                <button
                  type="submit"
                  name="add"
                  className="btn product-cart-submit me-2"
                >
                  <span>Add to cart</span>
                </button>
                <button
                  type="submit"
                  name="sold"
                  className="btn btn-secondary product-sold-out d-none"
                  disabled
                >
                  Sold out
                </button>
                <button
                  type="submit"
                  name="buy"
                  className="btn btn-secondary proceed-to-checkout"
                >
                  Buy it now
                </button>
              </div>
              {/* End Product Action */}

              <div className="text-center mt-3">
                <a className="text-link" href="product-layout1.html">
                  View More Details
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickShopModal;
