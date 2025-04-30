import React from "react";

const AddToCartModal = () => {
  return (
    <div
      className="addtocart-modal modal fade"
      id="addtocart_modal"
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
              id="product-form-addtocart"
              className="product-form align-items-center"
            >
              <h3 className="title mb-3 text-success text-center">
                Added to cart Successfully!
              </h3>

              <div className="row d-flex-center text-center">
                <div className="col-md-6">
                  {/* Product Image */}
                  <a className="product-image" href="product-layout1.html">
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
                  {/* End Product Image */}
                </div>

                <div className="col-md-6 mt-3 mt-md-0">
                  {/* Product Info */}
                  <div className="product-details">
                    <a className="product-title" href="product-layout1.html">
                      Cuff Beanie Cap
                    </a>
                    <p className="product-clr my-2 text-muted">Black / XL</p>
                  </div>

                  <div className="addcart-total rounded-5">
                    <p className="product-items mb-2">
                      There are <strong>1</strong> items in your cart
                    </p>
                    <p className="d-flex-justify-center">
                      Total: <span className="price">$198.00</span>
                    </p>
                  </div>
                  {/* End Product Info */}

                  {/* Product Action */}
                  <div className="product-form-submit d-flex-justify-center">
                    <a
                      href="#"
                      className="btn btn-outline-primary product-continue w-100"
                    >
                      Continue Shopping
                    </a>
                    <a
                      href="cart-style1.html"
                      className="btn btn-secondary product-viewcart w-100 my-2 my-md-3"
                    >
                      View Cart
                    </a>
                    <a
                      href="checkout-style1.html"
                      className="btn btn-primary product-checkout w-100"
                    >
                      Proceed to checkout
                    </a>
                  </div>
                  {/* End Product Action */}
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddToCartModal;
