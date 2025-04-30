import React from "react";

const MiniCart = ({ items, onQuantityChange, onRemove, onClose }) => {
  const totalItems = items.length;
  const totalPrice = items.reduce((sum, item) => sum + item.price, 0);

  return (
    <div
      id="minicart-drawer"
      className="minicart-right-drawer offcanvas offcanvas-end"
      tabIndex="-1"
    >
      {/* MiniCart Empty */}
      <div
        id="cartEmpty"
        className={`cartEmpty d-flex-justify-center flex-column text-center p-3 text-muted ${
          totalItems === 0 ? "" : "d-none"
        }`}
      >
        <div className="minicart-header d-flex-center justify-content-between w-100">
          <h4 className="fs-6">Your cart (0 Items)</h4>
          <button
            className="close-cart border-0"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
            onClick={onClose}
          >
            <i
              className="fa-solid fa-x"
              data-bs-toggle="tooltip"
              data-bs-placement="left"
              title="Close"
            ></i>
          </button>
        </div>
        <div className="cartEmpty-content mt-4">
          <i className="icon anm anm-cart-l fs-1 text-muted"></i>
          <p className="my-3">No Products in the Cart</p>
          <a href="index.html" className="btn btn-primary cart-btn">
            Continue shopping
          </a>
        </div>
      </div>
      {/* End MiniCart Empty */}

      {/* MiniCart Content */}
      <div
        id="cart-drawer"
        className={`block block-cart ${totalItems === 0 ? "d-none" : ""}`}
      >
        <div className="minicart-header">
          <button
            className="close-cart border-0"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
            onClick={onClose}
          >
            <i
              className="fa-solid fa-x"
              data-bs-toggle="tooltip"
              data-bs-placement="left"
              title="Close"
            ></i>
          </button>
          <h4 className="fs-6">Your cart ({totalItems} Items)</h4>
        </div>

        <div className="minicart-content">
          <ul className="m-0 clearfix">
            {items.map((item, index) => (
              <li
                key={index}
                className="item d-flex justify-content-center align-items-center"
              >
                <a className="product-image rounded-0" href={item.link}>
                  <img
                    className="rounded-0 blur-up lazyload"
                    data-src={item.img}
                    src={item.img}
                    alt="product"
                    title="Product"
                    width="120"
                    height="170"
                  />
                </a>
                <div className="product-details">
                  <a className="product-title" href={item.link}>
                    {item.name}
                  </a>
                  <div className="variant-cart my-2">
                    {item.variant} / {item.size}
                  </div>
                  <div className="priceRow">
                    <div className="product-price">
                      {item.oldPrice && (
                        <span className="price old-price">
                          ${item.oldPrice.toFixed(2)}
                        </span>
                      )}
                      <span className="price">${item.price.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
                <div className="qtyDetail text-center">
                  <div className="qtyField">
                    <a
                      className="qtyBtn minus"
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        onQuantityChange(index, item.quantity - 1);
                      }}
                    >
                      <i className="fa-solid fa-minus"></i>
                    </a>
                    <input
                      type="text"
                      name="quantity"
                      value={item.quantity}
                      className="qty"
                      readOnly
                    />
                    <a
                      className="qtyBtn plus"
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        onQuantityChange(index, item.quantity + 1);
                      }}
                    >
                      <i className="fa-solid fa-plus"></i>
                    </a>
                  </div>
                  <a href="#" className="edit-i remove">
                    <i
                      className="fa-solid fa-pen"
                      data-bs-toggle="tooltip"
                      data-bs-placement="top"
                      title="Edit"
                    ></i>
                  </a>
                  <a
                    href="#"
                    className="remove"
                    onClick={(e) => {
                      e.preventDefault();
                      onRemove(index);
                    }}
                  >
                    <i
                      className="fa-solid fa-xmark"
                      data-bs-toggle="tooltip"
                      data-bs-placement="top"
                      title="Remove"
                    ></i>
                  </a>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="minicart-bottom">
          <div className="shipinfo">
            <div className="progress mb-2">
              <div
                className="progress-bar progress-bar-striped progress-bar-animated"
                role="progressbar"
                aria-valuenow="50"
                aria-valuemin="0"
                aria-valuemax="100"
              >
                50%
              </div>
            </div>
            <div className="freeShipMsg">
              <i className="fa-solid fa-truck fs-6 me-2 align-middle"></i>
              Only <span className="money">$199.00</span> away from{" "}
              <b>Free Shipping</b>
            </div>
            <div className="freeShipMsg d-none">
              <i className="icon anm anm-truck-l fs-6 me-2 align-middle"></i>
              Congrats! You are eligible for <b>Free Shipping</b>
            </div>
          </div>
          <div className="subtotal clearfix my-3">
            <div className="totalInfo clearfix mb-1 d-none">
              <span>Shipping:</span>
              <span className="item product-price">$10.00</span>
            </div>
            <div className="totalInfo clearfix mb-1 d-none">
              <span>Tax:</span>
              <span className="item product-price">$0.00</span>
            </div>
            <div className="totalInfo clearfix">
              <span>Total:</span>
              <span className="item product-price">
                ${totalPrice.toFixed(2)}
              </span>
            </div>
          </div>
          <div className="agree-check customCheckbox">
            <input
              id="prTearm"
              name="tearm"
              type="checkbox"
              value="tearm"
              required
            />
            <label htmlFor="prTearm"> I agree with the </label>
            <a href="#" className="ms-1 text-link">
              Terms &amp; conditions
            </a>
          </div>
          <div className="minicart-action d-flex mt-3">
            <a
              href="checkout-style1.html"
              className="proceed-to-checkout btn btn-primary w-50 me-1"
            >
              Check Out
            </a>
            <a
              href="cart-style1.html"
              className="cart-btn btn btn-secondary w-50 ms-1"
            >
              View Cart
            </a>
          </div>
        </div>
      </div>
      {/* End MiniCart Content */}
    </div>
  );
};

export default MiniCart;
