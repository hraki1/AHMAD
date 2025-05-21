import React from "react";
import paymentimg from "../../assets/images/icons/safepayment.png";
import { Link } from "react-router-dom";
import { useCart } from "../../Context/CartContext";

export default function CartSummary({
  subtotal = 0,
  discount = 0,
  tax = 0,
  shipping = 0,
  total = 0, // ✅ total من الـ API
  setDiscount,
  country,
  btnName = "",
  isPreview = false,
}) {
  const discountPercentage = subtotal ? (discount / subtotal) * 100 : 0;
  const { showShippingAndTax } = useCart();

  const removeDiscount = () => {
    setDiscount(0);
    localStorage.setItem("cartDiscount", "0");
  };

  return (
    <div className="cart-info sidebar-sticky">
      <div className="cart-order-detail cart-col">
        <div className="row g-0 border-bottom pb-2">
          <span className="col-6 col-sm-6 cart-subtotal-title">
            <strong>Subtotal</strong>
          </span>
          <span className="col-6 col-sm-6 cart-subtotal-title cart-subtotal text-end">
            <span className="money">${subtotal.toFixed(2)}</span>
          </span>
        </div>

        {discount > 0 && (
          <div className="row g-0 border-bottom py-2">
            <span className="col-6 col-sm-6 cart-subtotal-title">
              <strong>Coupon Discount</strong>
            </span>
            <span className="col-6 col-sm-6 cart-subtotal-title cart-subtotal text-end">
              <span className="money">-${discount.toFixed(2)}</span>
            </span>
          </div>
        )}

        {showShippingAndTax && (
          <>
            <div className="row g-0 border-bottom py-2">
              <span className="col-6 col-sm-6 cart-subtotal-title">
                <strong>Tax</strong>
              </span>
              <span className="col-6 col-sm-6 cart-subtotal-title cart-subtotal text-end">
                <span className="money">${tax.toFixed(2)}</span>
              </span>
            </div>

            <div className="row g-0 border-bottom py-2">
              <span className="col-6 col-sm-6 cart-subtotal-title">
                <strong>Shipping</strong>
              </span>
              <span className="col-6 col-sm-6 cart-subtotal-title cart-subtotal text-end">
                <span className="money">
                  {shipping === 0 ? "Free shipping" : `$${shipping.toFixed(2)}`}
                </span>
              </span>
            </div>
          </>
        )}

        <div className="row g-0 pt-2">
          {discountPercentage > 0 && (
            <div className="small text-muted">
              <span>Price Before Discount: ${subtotal.toFixed(2)}</span>
              <br />
              <button
                onClick={removeDiscount}
                className="btn-remove-dis mt-1 mb-2"
              >
                Remove Discount
              </button>
            </div>
          )}

          <span className="col-6 col-sm-6 cart-subtotal-title fs-6">
            <strong>Total</strong>
          </span>
          <span className="col-6 col-sm-6 cart-subtotal-title fs-5 cart-subtotal text-end text-primary">
            <b className="money">${total.toFixed(2)}</b>
          </span>
        </div>

        <p className="cart-shipping mt-3">
          Shipping &amp; taxes calculated at checkout
        </p>

        {/* <p className="cart-shipping fst-normal freeShipclaim">
          <i className="me-2 align-middle fa-solid fa-truck"></i>
          <b>FREE SHIPPING</b> ELIGIBLE
        </p> */}

        <div className="customCheckbox cart-tearm">
          <input type="checkbox" id="cart-tearm" />
          <label htmlFor="cart-tearm">
            I agree with the terms and conditions
          </label>
        </div>

        <Link
          to="/CheckOut"
          id="cartCheckout"
          className="btn btn-lg my-4 checkout w-100"
        >
          {btnName}
        </Link>

        <div className="paymnet-img text-center">
          <img src={paymentimg} alt="Payment" width="299" height="28" />
        </div>
      </div>
    </div>
  );
}
