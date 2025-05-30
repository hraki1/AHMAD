import React from "react";
import paymentimg from "../../assets/images/icons/safepayment.png";
import { useCart } from "../../Context/CartContext";
import { baseUrl } from "../../Pages/API/ApiConfig";

export default function CartSummary({
  btnName = "",
  isPreview = false,
  country,
  mode = "cart",
  setCouponApplied,
  setCouponMessage,
  useGrandTotal = false,
  checkoutLink = "/CheckOut",
  onPlaceOrder,
  isPaymentLoading,
}) {
  const {
    subtotal,
    discount,
    tax,
    shipping,
    total: grandTotal,
    cartId,
    showShippingAndTax,
    updateCart,
    setDiscount,
    subtotalWithDiscount,
  } = useCart();

  const discountPercentage = subtotal ? (discount / subtotal) * 100 : 0;

  const handleRemoveDiscount = async () => {
    if (!cartId) return;

    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const response = await fetch(`${baseUrl}/api/coupons/remove`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ cartId }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.removeItem("cartDiscount");
        await updateCart();
        setCouponApplied(false);
        setCouponMessage("");
      } else {
        console.error("Failed to remove discount:", data);
      }
    } catch (error) {
      console.error("Error removing discount:", error);
    }
  };

  const totalAmountToShow = useGrandTotal ? grandTotal : subtotalWithDiscount;

  return (
    <div className="cart-info sidebar-sticky">
      <div className="cart-order-detail cart-col">
        <div className="row g-0 border-bottom pb-2">
          <span className="col-6 cart-subtotal-title">
            <strong>Subtotal</strong>
          </span>
          <span className="col-6 cart-subtotal text-end">
            ${subtotal.toFixed(2)}
          </span>
        </div>

        {discount > 0 && (
          <div className="row g-0 border-bottom py-2">
            <span className="col-6 cart-subtotal-title">
              <strong>Coupon Discount</strong>
            </span>
            <span className="col-6 cart-subtotal text-end">
              -${discount.toFixed(2)}
            </span>
          </div>
        )}

        {mode === "payment" && (
          <>
            <div className="row g-0 border-bottom py-2">
              <span className="col-6 cart-subtotal-title">
                <strong>Tax</strong>
              </span>
              <span className="col-6 cart-subtotal text-end">
                ${tax.toFixed(2)}
              </span>
            </div>

            <div className="row g-0 border-bottom py-2">
              <span className="col-6 cart-subtotal-title">
                <strong>Shipping</strong>
              </span>
              <span className="col-6 cart-subtotal text-end">
                {shipping === 0 ? "Free shipping" : `$${shipping.toFixed(2)}`}
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
                onClick={handleRemoveDiscount}
                className="btn-remove-dis mt-1 mb-2"
              >
                Remove Discount
              </button>
            </div>
          )}

          <span className="col-6 cart-subtotal-title fs-6">
            <strong>Total</strong>
          </span>
          <span className="col-6 cart-subtotal text-end fs-5 text-primary">
            <b>${totalAmountToShow.toFixed(2)}</b>
          </span>
        </div>

        <p className="cart-shipping mt-3">
          Shipping &amp; taxes calculated at checkout
        </p>

        <div className="customCheckbox cart-tearm">
          <input type="checkbox" id="cart-tearm" />
          <label htmlFor="cart-tearm">
            I agree with the terms and conditions
          </label>
        </div>
        {mode === "payment" ? (
          <button
            type="button"
            className="btn btn-lg btn-success my-4 w-100"
            onClick={onPlaceOrder}
          >
            Place Order
          </button>
        ) : (
          <button
            id="cartCheckout"
            className="btn btn-lg my-4 checkout w-100"
            type="button"
            onClick={onPlaceOrder}
            disabled={isPaymentLoading}
          >
            {isPaymentLoading ? `${btnName}...` : btnName}
          </button>
        )}
        <div className="paymnet-img text-center">
          <img src={paymentimg} alt="Payment" width="299" height="28" />
        </div>
      </div>
    </div>
  );
}
