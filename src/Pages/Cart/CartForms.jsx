import React, { useContext, useState } from "react";
import { baseUrl } from "../API/ApiConfig";
import { useCart } from "../../Context/CartContext";
import { AuthContext } from "../../Context/AuthContext";
import { useTranslation } from "react-i18next";
const CartForms = ({
  cartId,
  setCouponApplied,
  setTotal,
  couponApplied: couponAppliedProp,
  message,
  setMessage,
}) => {
  const { t } = useTranslation();
  const [couponCode, setCouponCode] = useState("");
  const { updateCart } = useCart();

  const { user } = useContext(AuthContext);

  console.log(user);

  const handleCouponApplied = async (e) => {
    e.preventDefault();

    if (couponAppliedProp) {
      return;
    }

    if (!couponCode.trim()) {
      setMessage(t(`coupon_code`));
      return;
    }

    if (!cartId) {
      setMessage(t(`cart_loading`));
      return;
    }

    try {
      const token = localStorage.getItem("token");

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
        setMessage(data.message || t(`Coupon_applied`));
        setCouponApplied(true);
        await updateCart();
        setCouponCode("");
      } else {
        setMessage(data.message || t(`Invalid_coupon`));
        setCouponApplied(false);
      }
    } catch (error) {
      console.error(t(`Error_coupon`), error);
      setMessage(t(`Failed_coupon`));
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
              <h5>{t(`note_order`)}</h5>
              <label htmlFor="cart-note">{t(`Notes_delivery`)}</label>
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
              <h5>{t(`Apply_Discount`)}</h5>
              <form onSubmit={handleCouponApplied}>
                <div className="form-group">
                  <label htmlFor="coupon">{t(`Enter_coupon`)}</label>
                  <div className="input-group0">
                    <input
                      className="form-control"
                      type="text"
                      name="coupon"
                      id="coupon"
                      placeholder="e.g., DISCOUNT"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      disabled={couponAppliedProp}
                    />
                    <input
                      type="submit"
                      className="btn text-nowrap mt-3"
                      value={t(`Apply_Coupon`)}
                      disabled={
                        !cartId || !couponCode.trim() || couponAppliedProp
                      }
                    />
                  </div>
                </div>
                {/* Message Feedback */}
                {message && (
                  <div
                    className={`alert ${
                      message === t(`Coupon_applied`)
                        ? "alert-success"
                        : "alert-info"
                    } mt-2`}
                    role="alert"
                  >
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
