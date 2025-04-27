import React, { useState } from "react";
import { useLocation } from "react-router-dom";

export default function Checkout() {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    address1: "",
    address2: "",
    postcode: "",
    country: "0",
    state: "0",
    city: "0",
    billingAddressSame: false,
    cardName: "",
    cardNumber: "",
    cvv: "",
    expDate: "",
    comment: "",
    couponCode: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="container">
      <form
        className="checkout-form"
        method="post"
        action="#"
        onSubmit={handleSubmit}
      >
        <div className="row">
          <div className="col-lg-6 col-md-6 col-sm-12">
            {/* Shipping Address */}
            <div className="block mb-3 shipping-address mb-4">
              <div className="block-content">
                <div className="main-title-check mb-3">Shipping Address</div>
                <fieldset>
                  <div className="row">
                    <div className="form-group col-12 col-sm-6">
                      <label htmlFor="firstname" className="form-label">
                        First Name <span className="required">*</span>
                      </label>
                      <input
                        name="firstname"
                        value={formData.firstname}
                        id="firstname"
                        type="text"
                        required
                        className="form-control"
                        onChange={handleChange}
                      />
                    </div>
                    <div className="form-group col-12 col-sm-6">
                      <label htmlFor="lastname" className="form-label">
                        Last Name <span className="required">*</span>
                      </label>
                      <input
                        name="lastname"
                        value={formData.lastname}
                        id="lastname"
                        type="text"
                        required
                        className="form-control"
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="form-group col-12">
                      <label htmlFor="address-1" className="form-label">
                        Address <span className="required">*</span>
                      </label>
                      <input
                        name="address1"
                        value={formData.address1}
                        id="address-1"
                        type="text"
                        required
                        placeholder="Street address"
                        className="form-control"
                        onChange={handleChange}
                      />
                    </div>
                    <div className="form-group col-12">
                      <input
                        name="address2"
                        value={formData.address2}
                        id="address-2"
                        type="text"
                        placeholder="Apartment, suite, unit etc. (optional)"
                        className="form-control"
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="form-group col-12 col-sm-6">
                      <label htmlFor="postcode" className="form-label">
                        Postcode / ZIP <span className="required">*</span>
                      </label>
                      <input
                        name="postcode"
                        value={formData.postcode}
                        id="postcode"
                        type="text"
                        className="form-control"
                        onChange={handleChange}
                      />
                    </div>
                    <div className="form-group col-12 col-sm-6">
                      <label htmlFor="address_country1" className="form-label">
                        Country <span className="required">*</span>
                      </label>
                      <select
                        id="address_country1"
                        name="country"
                        value={formData.country}
                        className="form-control"
                        onChange={handleChange}
                      >
                        <option value="0">Select a country</option>
                        {/* Add other countries here */}
                      </select>
                    </div>
                  </div>
                  <div className="row">
                    <div className="form-group col-12 col-sm-6">
                      <label htmlFor="address_State" className="form-label">
                        State <span className="required">*</span>
                      </label>
                      <select
                        id="address_State"
                        name="state"
                        value={formData.state}
                        className="form-control"
                        onChange={handleChange}
                      >
                        <option value="0">Select a state</option>
                        <option value="AL">Alabama</option>
                        {/* Add other states here */}
                      </select>
                    </div>
                    <div className="form-group col-12 col-sm-6">
                      <label htmlFor="address_province" className="form-label">
                        Town / City <span className="required">*</span>
                      </label>
                      <select
                        id="address_province"
                        name="city"
                        value={formData.city}
                        className="form-control"
                        onChange={handleChange}
                      >
                        <option value="0">Select a city</option>
                        <option value="AR">Arkansas</option>
                        {/* Add other cities here */}
                      </select>
                    </div>
                  </div>
                  <div className="row">
                    <div className="form-group col-md-12">
                      <div className="checkout-tearm customCheckbox">
                        <input
                          id="checkout_tearm"
                          name="billingAddressSame"
                          type="checkbox"
                          checked={formData.billingAddressSame}
                          onChange={handleChange}
                        />
                        <label htmlFor="checkout_tearm">
                          Save address to my account
                        </label>
                      </div>
                    </div>
                  </div>
                </fieldset>
              </div>
            </div>
            {/* End Shipping Address */}

            {/* Billing Address */}
            <div className="block mb-3 billing-address mb-4">
              <div className="block-content">
                <div className="main-title-check mb-3">Billing Address</div>
                <fieldset>
                  <div className="row">
                    <div className="form-group col-md-12">
                      <div className="checkout-tearm customCheckbox">
                        <input
                          id="add_tearm"
                          name="billingAddressSame"
                          type="checkbox"
                          checked={formData.billingAddressSame}
                          onChange={handleChange}
                        />
                        <label htmlFor="add_tearm">
                          The same as shipping address
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="form-group col-12">
                      <label htmlFor="address-11" className="form-label">
                        Address <span className="required">*</span>
                      </label>
                      <input
                        name="address11"
                        id="address-11"
                        type="text"
                        required
                        placeholder="Street address"
                        className="form-control"
                        onChange={handleChange}
                      />
                    </div>
                    <div className="form-group col-12">
                      <input
                        name="address12"
                        id="address-12"
                        type="text"
                        placeholder="Apartment, suite, unit etc. (optional)"
                        className="form-control"
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="form-group col-12 col-sm-6">
                      <label htmlFor="postcode2" className="form-label">
                        Postcode / ZIP <span className="required">*</span>
                      </label>
                      <input
                        name="postcode2"
                        id="postcode2"
                        type="text"
                        className="form-control"
                        onChange={handleChange}
                      />
                    </div>
                    <div className="form-group col-12 col-sm-6">
                      <label htmlFor="address_country2" className="form-label">
                        Country <span className="required">*</span>
                      </label>
                      <select
                        id="address_country2"
                        name="country1"
                        value={formData.country}
                        className="form-control"
                        onChange={handleChange}
                      >
                        <option value="0">Select a country</option>
                        {/* Add other countries here */}
                      </select>
                    </div>
                  </div>
                  <div className="row">
                    <div className="form-group col-12 col-sm-6 mb-sm-0">
                      <label htmlFor="address_State1" className="form-label">
                        State <span className="required">*</span>
                      </label>
                      <select
                        id="address_State1"
                        name="state1"
                        value={formData.state}
                        className="form-control"
                        onChange={handleChange}
                      >
                        <option value="0">Select a state</option>
                        <option value="AL">Alabama</option>
                        {/* Add other states here */}
                      </select>
                    </div>
                    <div className="form-group col-12 col-sm-6 mb-0">
                      <label htmlFor="address_province2" className="form-label">
                        Town / City <span className="required">*</span>
                      </label>
                      <select
                        id="address_province2"
                        name="city1"
                        value={formData.city}
                        className="form-control"
                        onChange={handleChange}
                      >
                        <option value="0">Select a city</option>
                        <option value="AR">Arkansas</option>
                        {/* Add other cities here */}
                      </select>
                    </div>
                  </div>
                </fieldset>
              </div>
            </div>
            {/* End Billing Address */}
          </div>

          <div className="col-lg-6 col-md-6 col-sm-12">
            {/* Delivery Methods */}
            <div className="block mb-3 delivery-methods mb-4">
              <div className="block-content">
                <div className="main-title-check mb-3">Delivery Methods</div>
                <div className="delivery-methods-content">
                  <div className="customRadio clearfix">
                    <input
                      id="formcheckoutRadio1"
                      name="deliveryMethod"
                      type="radio"
                      className="radio"
                      value="formcheckoutRadio1"
                      checked={formData.deliveryMethod === "formcheckoutRadio1"}
                      onChange={handleChange}
                    />
                    <label htmlFor="formcheckoutRadio1" className="mb-0">
                      Standard Delivery $2.99 (3-5 days)
                    </label>
                  </div>
                  <div className="customRadio clearfix">
                    <input
                      id="formcheckoutRadio2"
                      name="deliveryMethod"
                      type="radio"
                      className="radio"
                      value="formcheckoutRadio2"
                      checked={formData.deliveryMethod === "formcheckoutRadio2"}
                      onChange={handleChange}
                    />
                    <label htmlFor="formcheckoutRadio2" className="mb-0">
                      Express Delivery $10.99 (1-2 days)
                    </label>
                  </div>
                  <div className="customRadio clearfix mb-0">
                    <input
                      id="formcheckoutRadio3"
                      name="deliveryMethod"
                      type="radio"
                      className="radio"
                      value="formcheckoutRadio3"
                      checked={formData.deliveryMethod === "formcheckoutRadio3"}
                      onChange={handleChange}
                    />
                    <label htmlFor="formcheckoutRadio3" className="mb-0">
                      Same-Day $20.00 (Evening Delivery)
                    </label>
                  </div>
                </div>
              </div>
            </div>
            {/* End Delivery Methods */}

            {/* Payment Methods */}
            <div className="block mb-3 payment-methods mb-4">
              <div className="block-content">
                <h3 className="main-title-check mb-3">Payment Methods</h3>
                <div className="payment-accordion">
                  <div className="accordion" id="accordionExample">
                    {/* Direct Bank Transfer */}
                    <div className="accordion-item card mb-2">
                      <div className="card-header" id="headingOne">
                        <button
                          className="card-link d-flex align-items-center justify-content-between"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#collapseOne"
                          aria-expanded="false"
                          aria-controls="collapseOne"
                        >
                          Direct Bank Transfer
                          <i className="fa-solid fa-bars"></i>
                        </button>
                      </div>
                      <div
                        id="collapseOne"
                        className="accordion-collapse collapse"
                        aria-labelledby="headingOne"
                        data-bs-parent="#accordionExample"
                      >
                        <div className="card-body">
                          <div className="desc-content">
                            Make your payment directly into our bank account.
                            Please use your Order ID as the payment reference.
                            Your order won't be shipped until the funds have
                            cleared in our account.
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* Cheque Payment */}
                    <div className="accordion-item card mb-2">
                      <div className="card-header" id="headingTwo">
                        <button
                          className="card-link d-flex align-items-center justify-content-between"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#collapseTwo"
                          aria-expanded="false"
                          aria-controls="collapseTwo"
                        >
                          Cheque Payment
                          <i className="fa-solid fa-bars"></i>
                        </button>
                      </div>
                      <div
                        id="collapseTwo"
                        className="accordion-collapse collapse"
                        aria-labelledby="headingTwo"
                        data-bs-parent="#accordionExample"
                      >
                        <div className="card-body">
                          <div className="desc-content">
                            Please send your cheque to Store Name, Store Street,
                            Store Town, Store State / County, Store Postcode.
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* PayPal */}
                    <div className="accordion-item card mb-2">
                      <div className="card-header" id="headingThree">
                        <button
                          className="card-link d-flex align-items-center justify-content-between"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#collapseThree"
                          aria-expanded="false"
                          aria-controls="collapseThree"
                        >
                          PayPal
                          <i className="fa-solid fa-bars"></i>
                        </button>
                      </div>
                      <div
                        id="collapseThree"
                        className="accordion-collapse collapse"
                        aria-labelledby="headingThree"
                        data-bs-parent="#accordionExample"
                      >
                        <div className="card-body">
                          <div className="desc-content">
                            Pay via PayPal you can pay with your credit card if
                            you don't have a PayPal account.
                          </div>
                          <div className="input-group mb-0 d-flex">
                            <input
                              type="text"
                              className="form-control"
                              placeholder="paypal@example.com"
                              required
                            />
                            <button className="btn btn-primary" type="submit">
                              Pay 99.00 USD
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* Payment Information */}
                    <div className="accordion-item card mb-0">
                      <div className="card-header" id="headingFour">
                        <button
                          className="card-link d-flex align-items-center justify-content-between"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#collapseFour"
                          aria-expanded="false"
                          aria-controls="collapseFour"
                        >
                          Payment Information
                          <i className="fa-solid fa-bars"></i>
                        </button>
                      </div>
                      <div
                        id="collapseFour"
                        className="accordion-collapse collapse"
                        aria-labelledby="headingFour"
                        data-bs-parent="#accordionExample"
                      >
                        <div className="card-body">
                          <fieldset>
                            <div className="row">
                              <div className="form-group col-12 col-sm-6">
                                <label htmlFor="input-cardname">
                                  Name on Card{" "}
                                  <span className="required">*</span>
                                </label>
                                <input
                                  name="cardName"
                                  value={formData.cardName}
                                  id="input-cardname"
                                  className="form-control"
                                  type="text"
                                  onChange={handleChange}
                                />
                              </div>
                              <div className="form-group col-12 col-sm-6">
                                <label>
                                  Credit Card Type{" "}
                                  <span className="required">*</span>
                                </label>
                                <select
                                  name="cardType"
                                  className="form-control"
                                  onChange={handleChange}
                                >
                                  <option value="">Please Select</option>
                                  <option value="1">American Express</option>
                                  <option value="2">Visa Card</option>
                                  <option value="3">Master Card</option>
                                  <option value="4">Discover Card</option>
                                </select>
                              </div>
                            </div>
                            <div className="row">
                              <div className="form-group col-12 col-sm-4">
                                <label htmlFor="input-cardno">
                                  Credit Card Number{" "}
                                  <span className="required">*</span>
                                </label>
                                <input
                                  name="cardNumber"
                                  value={formData.cardNumber}
                                  id="input-cardno"
                                  className="form-control"
                                  type="text"
                                  onChange={handleChange}
                                />
                              </div>
                              <div className="form-group col-12 col-sm-4">
                                <label htmlFor="input-cvv">
                                  CVV Code <span className="required">*</span>
                                </label>
                                <input
                                  name="cvv"
                                  value={formData.cvv}
                                  id="input-cvv"
                                  className="form-control"
                                  type="text"
                                  onChange={handleChange}
                                />
                              </div>
                              <div className="form-group col-12 col-sm-4">
                                <label>
                                  Expiration Date{" "}
                                  <span className="required">*</span>
                                </label>
                                <input
                                  type="date"
                                  name="expDate"
                                  value={formData.expDate}
                                  className="form-control"
                                  onChange={handleChange}
                                />
                              </div>
                              <div className="form-group col-12 mb-0">
                                <button
                                  className="btn btn-primary"
                                  type="submit"
                                >
                                  Submit
                                </button>
                              </div>
                            </div>
                          </fieldset>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* End Payment Methods */}

                {/* Order Comment */}
                <div className="block mb-3 order-comments mb-4">
                  <div className="block-content">
                    <h3 className="main-title-check mb-3">Order Comment</h3>
                    <fieldset>
                      <div className="row">
                        <div className="form-group col-md-12 mb-0">
                          <textarea
                            className="resize-both form-control"
                            rows="4"
                            placeholder="Place your comment here"
                            value={formData.comment}
                            onChange={handleChange}
                            name="comment"
                          ></textarea>
                          <small className="mt-2 d-block">
                            *Savings include promotions, coupons, rueBUCKS, and
                            shipping (if applicable).
                          </small>
                        </div>
                      </div>
                    </fieldset>
                  </div>
                </div>
                {/* End Order Comment */}
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
