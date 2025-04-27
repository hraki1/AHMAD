import React from "react";
import paymentimg from "../../assets/images/icons/safepayment.png";
export default function CartSummary({ subtotal, discount, tax, shipping }) {
  const total = subtotal - discount + tax;

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

        <div className="row g-0 border-bottom py-2">
          <span className="col-6 col-sm-6 cart-subtotal-title">
            <strong>Coupon Discount</strong>
          </span>
          <span className="col-6 col-sm-6 cart-subtotal-title cart-subtotal text-end">
            <span className="money">-${discount.toFixed(2)}</span>
          </span>
        </div>

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

        <div className="row g-0 pt-2">
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

        <p className="cart-shipping fst-normal freeShipclaim">
          <i className="me-2 align-middle fa-solid fa-truck  "></i>
          <b>FREE SHIPPING</b> ELIGIBLE
        </p>

        <div className="customCheckbox cart-tearm">
          <input type="checkbox" id="cart-tearm" />
          <label htmlFor="cart-tearm">
            I agree with the terms and conditions
          </label>
        </div>

        <a
          href="checkout-style1.html"
          id="cartCheckout"
          className="btn btn-lg my-4 checkout w-100"
        >
          Proceed To Checkout
        </a>

        <div className="paymnet-img text-center">
          <img src={paymentimg} alt="Payment" width="299" height="28" />
        </div>
      </div>
    </div>
  );
}
