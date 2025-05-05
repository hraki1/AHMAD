import React, { useState } from "react";
import Button from "../../Components/common/Button"; // Adjust the import path as necessary

export default function Checkout({ country, setCountry }) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    addressOne: "",
    addressTwo: "",
    postCode: "",
    country: country,
    city: "",
    savingAddress: false,
    deliveryMethod: "",
    cardName: "",
    cardType: "",
    cardNumber: "",
    cvv: "",
    expDate: "",
    comment: "",
    couponCode: "",
  });

  // Generic handleChange for all inputs
  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Handle Save button click: update country in parent component
  const handleSaveCountry = (e) => {
    e.preventDefault();
    setCountry(formData.country);
    console.log(formData);
    const tax = calculateTax();
    console.log(`Calculated Tax: ${tax}`);
  };

  // Optional example tax calculation based on country
  const taxRate = 0.16;
  const calculateTax = () => {
    if (formData.country === "JO") {
      const taxAmount = 100 * taxRate;
      return taxAmount;
    }
    return 0;
  };

  return (
    <div className="container">
      <form
        className="checkout-form"
        method="post"
        action="#"
        onSubmit={handleSaveCountry} // Save country on form submit
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
                        name="firstName"
                        value={formData.firstName}
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
                        name="lastName"
                        value={formData.lastName}
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
                        name="addressOne"
                        value={formData.addressOne}
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
                        name="addressTwo"
                        value={formData.addressTwo}
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
                        name="postCode"
                        value={formData.postCode}
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
                        className="form-control"
                        id="address_country1"
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                      >
                        <option value="JO">Jordan</option>
                        <option value="Saudi">Saudi</option>
                        <option value="USA">America</option>
                        {/* Add other countries here */}
                      </select>
                    </div>
                  </div>

                  <div className="row">
                    <div className="form-group col-12 col-sm-6 d-none">
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
                        <option value="JERASH">Jerash</option>
                        <option value="Amman">Amman</option>
                        <option value="Riydeh">Riydeh</option>
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
                        <option value="JERASH">Jerash</option>
                        <option value="Amman">Amman</option>
                        <option value="Riydeh">Riydeh</option>
                      </select>
                    </div>
                  </div>

                  <div className="row">
                    <div className="form-group col-md-12">
                      <div className="checkout-tearm customCheckbox">
                        <input
                          id="checkout_tearm"
                          name="savingAddress"
                          type="checkbox"
                          checked={formData.savingAddress}
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

              <Button className="mt-2" label="Save" type="submit" primary />
            </div>
            {/* End Shipping Address */}
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
                    {/* Payment Information */}
                    <div className="accordion-item card mb-4">
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
                                  value={formData.cardType}
                                  onChange={handleChange}
                                >
                                  <option value="">Please Select</option>
                                  <option value="american_express">
                                    American Express
                                  </option>
                                  <option value="visa">Visa Card</option>
                                  <option value="mastercard">
                                    Master Card
                                  </option>
                                  <option value="discover">
                                    Discover Card
                                  </option>
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
