import React, { useState } from "react";
import { baseUrl } from "../API/ApiConfig";

const CartForms = ({ cartId, setDiscount, setCouponApplied }) => {
  const [couponCode, setCouponCode] = useState("");
  const [message, setMessage] = useState("");

  const handleCouponApplied = async (e) => {
    e.preventDefault();

    if (!couponCode.trim()) {
      setMessage("Please enter a coupon code.");
      return;
    }

    if (!cartId) {
      setMessage("Please wait, cart is still loading!");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      // 1. تطبيق الكوبون
      const response = await fetch(`${baseUrl}/api/coupons/apply`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          cartId: cartId,
          couponCode: couponCode,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message || "Coupon applied successfully.");

        // 2. جلب بيانات السلة المحدثة بعد تطبيق الكوبون
        const cartResponse = await fetch(`${baseUrl}/api/carts/customer`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (cartResponse.ok) {
          const cartData = await cartResponse.json();
          console.log("Updated cart data:", cartData);

          // 3. تحديث قيمة الخصم من استجابة السلة
          setDiscount(cartData.discount_amount);
          setCouponApplied(true);
        } else {
          throw new Error("Failed to fetch updated cart data");
        }
      } else {
        setMessage(data.message || "Invalid coupon code.");
        setDiscount(0);
        setCouponApplied(false);
      }
    } catch (error) {
      console.error("Error applying coupon:", error);
      setMessage("Failed to apply coupon. Please try again.");
      setDiscount(0);
      setCouponApplied(false);
    }
  };

  return (
    <>
      <div className="col-12 col-sm-12 col-md-12 col-lg-8 main-col">
        <div className="row my-4 pt-3">
          {/* Note Section */}
          <div className="col-12 col-sm-12 col-md-12 col-lg-6 mb-12 cart-col">
            <div className="cart-note mb-4">
              <h5>Add a note to your order</h5>
              <label htmlFor="cart-note">
                Notes about your order, e.g. special notes for delivery.
              </label>
              <textarea
                name="note"
                id="cart-note"
                className="form-control cart-note-input"
                rows="3"
                required
              ></textarea>
            </div>
          </div>

          {/* Discount Section */}
          <div className="col-12 col-sm-12 col-md-12 col-lg-6 mb-12 cart-col">
            <div className="cart-discount">
              <h5>Apply Discount Code</h5>
              <form onSubmit={handleCouponApplied}>
                <div className="form-group">
                  <label htmlFor="coupon">Enter your coupon code.</label>
                  <div className="input-group0">
                    <input
                      className="form-control"
                      type="text"
                      name="coupon"
                      id="coupon"
                      placeholder="e.g., DISCOUNT"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                    />
                    <input
                      type="submit"
                      className="btn text-nowrap mt-3"
                      value="Apply Coupon"
                      disabled={!cartId || !couponCode.trim()}
                    />
                  </div>
                </div>
                {/* Message Feedback */}
                {message && (
                  <div className="alert alert-info mt-2" role="alert">
                    {message}
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartForms;
