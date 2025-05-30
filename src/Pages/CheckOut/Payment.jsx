import React, { useEffect, useState } from "react";
import PageHeader from "../../Components/layout/Header/PageHeader";
import CartSummary from "../Cart/CartSummary";
import { useCart } from "../../Context/CartContext";

export default function Payment() {
  const [formData, setFormData] = useState({
    deliveryMethod: "standard",
    paymentMethod: "card",
    cardName: "",
    cardType: "",
    cardNumber: "",
    cvv: "",
    expDate: "",
    paypalEmail: "",
  });

  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const [discount, setDiscount] = useState(0);
  const { cartId, updateCart } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    updateCart();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    if (!token) {
      alert("You must be logged in to place an order.");
      return;
    }

    setIsProcessing(true);

    const paymentMethodApiMap = {
      card: "stripe",
      paypal: "paypal",
      cod: "cash_on_delivery",
    };

    const selectedPaymentMethod = paymentMethodApiMap[formData.paymentMethod];

    // build payload
    const payload = {
      cartId: cartId,
      paymentMethod: selectedPaymentMethod,
    };

    // Add payment-specific data
    if (formData.paymentMethod === "card") {
      payload.cardDetails = {
        name: formData.cardName,
        type: formData.cardType,
        number: formData.cardNumber,
        cvv: formData.cvv,
        expDate: formData.expDate,
      };
    } else if (formData.paymentMethod === "paypal") {
      payload.paypalEmail = formData.paypalEmail;
    }

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

      console.log("Order placed successfully:", data);
      alert("Order placed successfully!");
       updateCart();
    } catch (error) {
      console.error("Order submission failed:", error.message);
      alert("Error placing order: " + error.message);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <>
      <PageHeader title="Payment" />
      <div className="container">
        <form className="checkout-form" onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-8">
              {/* Payment Methods */}
              <div className="block mb-4">
                <h3 className="title mb-3">Payment Methods</h3>
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
                  <label htmlFor="card">Pay with credit card</label>
                </div>

                {formData.paymentMethod === "card" && (
                  <div className="card-body px-0">
                    <div className="row">
                      <div className="form-group col-md-6">
                        <label htmlFor="cardName">Name on Card *</label>
                        <input
                          type="text"
                          name="cardName"
                          className="form-control"
                          value={formData.cardName}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="form-group col-md-6">
                        <label htmlFor="cardType">Credit Card Type *</label>
                        <select
                          name="cardType"
                          className="form-control"
                          value={formData.cardType}
                          onChange={handleChange}
                        >
                          <option value="">Please Select</option>
                          <option value="american-express">
                            American Express
                          </option>
                          <option value="visa">Visa Card</option>
                          <option value="mastercard">Master Card</option>
                          <option value="discover">Discover Card</option>
                        </select>
                      </div>
                      <div className="form-group col-md-4">
                        <label htmlFor="cardNumber">Credit Card Number *</label>
                        <input
                          type="text"
                          name="cardNumber"
                          className="form-control"
                          value={formData.cardNumber}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="form-group col-md-4">
                        <label htmlFor="cvv">CVV Code *</label>
                        <input
                          type="text"
                          name="cvv"
                          className="form-control"
                          value={formData.cvv}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="form-group col-md-4">
                        <label htmlFor="expDate">Expiration Date *</label>
                        <input
                          type="date"
                          name="expDate"
                          className="form-control"
                          value={formData.expDate}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>
                )}

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
                  <label htmlFor="paypal">Pay with PayPal</label>
                </div>

                {formData.paymentMethod === "paypal" && (
                  <div className="form-group mt-2">
                    <label>PayPal Email</label>
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
                  <label htmlFor="cod">Cash On Delivery</label>
                </div>
              </div>
            </div>

            {/* Cart Summary */}
            <div className="col-md-4">
              <CartSummary
                tax={0}
                shipping={0}
                setDiscount={setDiscount}
                btnName={"Place Order"}
                useGrandTotal={true}
                mode="payment"
                onPlaceOrder={handleSubmit}
              />
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
