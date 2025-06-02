import React, { useEffect, useState } from "react";
import PageHeader from "../../Components/layout/Header/PageHeader";
import Modal from "../../Components/UI/Modal";
import CartSummary from "../Cart/CartSummary";
import { useCart } from "../../Context/CartContext";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
export default function Payment() {
  const [formData, setFormData] = useState({
    deliveryMethod: "standard",
    paymentMethod: "cod",
    cardName: "",
    cardType: "",
    cardNumber: "",
    cvv: "",
    expDate: "",
    paypalEmail: "",
  });
  const { t } = useTranslation();
  const [discount, setDiscount] = useState(0);
  const { cartId, updateCart, cartItems } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState();
  const [modalMessage, setModalMessage] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    if (!cartId) {
      navigate("/cart");
    }
    updateCart();
  }, []);

  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handlePlaceOrder = async () => {
    const method = formData.paymentMethod;
    if (method === "card") {
      return handlerStripePayment();
    } else if (method === "cod") {
      return handleCashOnDeliveryOrder();
    } else if (method === "paypal") {
      toast.error("PayPal payment is currently not supported.");
    } else {
      toast.bind("Please select a payment method.");
    }
  };

  const handlerStripePayment = async () => {
    try {
      const response = await fetch("http://localhost:9090/payment/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cartItems }),
      });

      const resData = await response.json();

      if (!response.ok) {
        throw new Error(resData.message || "Stripe session creation failed.");
      }

      window.location.href = resData.url;
    } catch (err) {
      console.error("Stripe error:", err);
      toast.error("Stripe payment failed. Please try again.");
    }
  };

  const handleCashOnDeliveryOrder = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("You must be logged in to place an order.");
      return;
    }

    setIsProcessing(true);

    const payload = {
      cartId,
      paymentMethod: "cash_on_delivery",
    };

    try {
      const response = await fetch("https://api.sareh-nomow.xyz/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to place order");
      }

      toast.success("Order placed successfully!");
      setModalMessage("Order placed successfully!");
      setIsModalOpen(true);
      updateCart();
    } catch (error) {
      console.error("Order submission failed:", error.message);
      toast.error("Error placing order: " + error.message);
    } finally {
      setIsProcessing(false);
    }
  };

  function handleCloseModal() {
    setIsModalOpen(false);
    navigate("/");
  }

  return (
    <>
      <Toaster />
      <Modal open={isModalOpen}>
        <div className="p-4 text-center">
          <div className="d-flex justify-content-center">
            <p className="mb-1 fs-4 text-success fw-bold">{modalMessage}</p>
          </div>
          <div className="d-flex justify-content-center gap-3 mt-4">
            <button onClick={handleCloseModal} className="btn btn-primary px-4">
              OK
            </button>
          </div>
        </div>
      </Modal>
      <PageHeader title={t(`Payment.Payment`)} />
      <div className="container">
        <form className="checkout-form" onSubmit={(e) => e.preventDefault()}>
          <div className="row">
            <div className="col-md-8">
              <div className="block mb-4">
                <h3 className="title mb-3">{t(`Payment.Payment_Methods`)}</h3>

                {/* Credit Card */}
                <div className="customRadio">
                  <input
                    id="card"
                    type="radio"
                    name="paymentMethod"
                    value="card"
                    checked={formData.paymentMethod === "card"}
                    onChange={handleChange}
                  />
                  <label htmlFor="card">{t(`Payment.Pay_card`)}</label>
                </div>

                {/* Paypal */}
                <div className="customRadio">
                  <input
                    id="paypal"
                    type="radio"
                    name="paymentMethod"
                    value="paypal"
                    checked={formData.paymentMethod === "paypal"}
                    onChange={handleChange}
                  />
                  <label htmlFor="paypal">{t(`Payment.Pay_PayPal`)}</label>
                </div>

                {formData.paymentMethod === "paypal" && (
                  <div className="form-group mt-2">
                    <label>{t(`Payment.PayPal_Email`)}</label>
                    <input
                      type="email"
                      name="paypalEmail"
                      className="form-control"
                      value={formData.paypalEmail}
                      onChange={handleChange}
                    />
                  </div>
                )}

                {/* COD */}
                <div className="customRadio">
                  <input
                    id="cod"
                    type="radio"
                    name="paymentMethod"
                    value="cod"
                    checked={formData.paymentMethod === "cod"}
                    onChange={handleChange}
                  />
                  <label htmlFor="cod">{t(`Payment.Cash_Delivery`)}</label>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <CartSummary
                tax={0}
                shipping={0}
                setDiscount={setDiscount}
                btnName={isProcessing ? "Processing..." : "Place Order"}
                useGrandTotal={true}
                mode="payment"
                onPlaceOrder={handlePlaceOrder}
              />
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
