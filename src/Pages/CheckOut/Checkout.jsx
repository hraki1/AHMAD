import React, { useEffect, useState } from "react";
import Button from "../../Components/common/Button"; // Adjust the import path as necessary
import useCountriesData from "../Hooks/useCountriesData";
import { baseUrl } from "../API/ApiConfig";

export default function Checkout({ country, setCountry }) {
  const { countries, loading, error } = useCountriesData();
  const [savedAddresses, setSavedAddresses] = useState([]);
  const [selectedSavedAddressId, setSelectedSavedAddressId] = useState(null);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selectedCountryData, setSelectedCountryData] = useState(null);

  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
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

  useEffect(() => {
    const fetchSavedAddresses = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;
      try {
        const res = await fetch(`${baseUrl}/api/addresses`, {
          method: "get",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        const addresses = data.data || data.items || data.addresses || data;
        setSavedAddresses(addresses || []);
      } catch (err) {
        console.error("Failed to fetch saved addresses", err);
      }
    };

    fetchSavedAddresses();
  }, []);

  useEffect(() => {
    if (formData.country) {
      const countryData = countries.find(
        (c) => c.country_code === formData.country
      );
      setSelectedCountryData(countryData);
      // Reset city when country changes
      setFormData((prev) => ({ ...prev, city: "" }));
    }
  }, [formData.country, countries]);

  // Handle Save button click: update country in parent component
  const handleSaveCountry = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      alert("User not authenticated");
      return;
    }

    // If a saved address is selected, use it directly
    if (selectedSavedAddressId) {
      try {
        const response = await fetch(`${baseUrl}/api/use-saved-address`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ address_id: selectedSavedAddressId }),
        });

        if (!response.ok) throw new Error("Failed to use saved address.");
        const result = await response.json();
        alert("Saved address used successfully!");
        return;
      } catch (error) {
        console.error("Error:", error);
        alert("Failed to use the saved address.");
        return;
      }
    }

    // Otherwise, use the form data
    const selectedCountry = countries.find(
      (c) => c.country_code === formData.country
    );
    const selectedCity = selectedCountry?.Cities?.find(
      (c) => c.name === formData.city
    );

    if (!selectedCountry || !selectedCity) {
      alert("Please select a valid country and city.");
      return;
    }

    const payload = {
      full_name: formData.fullName,
      phone_number: formData.phoneNumber,
      address_1: formData.addressOne,
      address_2: formData.addressTwo,
      postcode: formData.postCode,
      country_id: selectedCountry.id,
      city_id: selectedCity.id,
    };

    try {
      const response = await fetch(`${baseUrl}/api/addresses`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok)
        throw new Error("Something went wrong while sending data.");

      const result = await response.json();
      console.log("Success:", result);
      alert("Address saved successfully!");
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to submit the data.");
    }
  };

  const calculateShippingCost = () => {
    if (!formData.country || !formData.deliveryMethod) return 0;

    const selectedMethod =
      selectedCountryData?.ShippingZone?.[0]?.zone_methods?.find(
        (method) => method.method.name === formData.deliveryMethod
      );

    return selectedMethod?.cost || 0;
  };
  // Optional example tax calculation based on country
  const taxRate = 0.16;
  const calculateTax = () => {
    if (formData.country === "JO") {
      const subtotal = 100; // Replace with your actual subtotal
      const shippingCost = calculateShippingCost();
      const taxAmount = (subtotal + shippingCost) * taxRate;
      return taxAmount;
    }
    return 0;
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

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
            <div
              className={`block mb-3 payment-methods mb-4 ${
                savedAddresses.length === 0 ? "d-none" : ""
              }`}
            >
              <div className="block-content">
                <div className="main-title-check mb-3">Saved Address</div>
                <div className="payment-accordion">
                  <div className="accordion" id="accordionExample">
                    <div className="accordion-item card mb-4">
                      <div className="card-header" id="headingFour">
                        <button
                          className="card-link d-flex align-items-center justify-content-between collapsed"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#collapseFourr"
                          aria-expanded={isCollapsed ? "true" : "false"}
                          aria-controls="collapseFourr"
                          onClick={() => setIsCollapsed(!isCollapsed)}
                        >
                          {selectedSavedAddressId ? (
                            <div className="w-100">
                              <div className="d-flex justify-content-between w-100">
                                <div>
                                  <strong className="me-2">
                                    {savedAddresses.find(
                                      (addr) =>
                                        addr.id === selectedSavedAddressId
                                    )?.full_name || "Name"}
                                  </strong>
                                </div>
                                <div>
                                  <small className="text-muted">
                                    {savedAddresses.find(
                                      (addr) =>
                                        addr.id === selectedSavedAddressId
                                    )?.delivery_method?.method?.name ||
                                      "No shipping method"}
                                  </small>
                                </div>
                              </div>
                              <div className="text-start w-100">
                                <small className="d-block">
                                  {savedAddresses.find(
                                    (addr) => addr.id === selectedSavedAddressId
                                  )?.address_1 || "Address 1"}
                                </small>
                                <small className="d-block">
                                  {savedAddresses.find(
                                    (addr) => addr.id === selectedSavedAddressId
                                  )?.city?.name || "City"}{" "}
                                  ,
                                  {savedAddresses.find(
                                    (addr) => addr.id === selectedSavedAddressId
                                  )?.country?.name || "Country"}
                                </small>
                                {savedAddresses.find(
                                  (addr) => addr.id === selectedSavedAddressId
                                )?.delivery_method?.cost && (
                                  <small className="text-success d-block">
                                    Cost:{" "}
                                    {savedAddresses.find(
                                      (addr) =>
                                        addr.id === selectedSavedAddressId
                                    )?.delivery_method?.cost || 0}{" "}
                                    {savedAddresses.find(
                                      (addr) =>
                                        addr.id === selectedSavedAddressId
                                    )?.delivery_method?.currency || "JOD"}
                                  </small>
                                )}
                              </div>
                            </div>
                          ) : (
                            "Select a saved address"
                          )}
                          <i className="fa-solid fa-bars"></i>
                        </button>
                      </div>
                      <div
                        className={`accordion-collapse collapse ${
                          isCollapsed ? "show" : ""
                        }`}
                        id="collapseFourr"
                        aria-labelledby="headingFour"
                        data-bs-parent="#accordionExample"
                      >
                        <div className="card-body">
                          {savedAddresses?.length > 0 ? (
                            <div className="saved-addresses-list">
                              {savedAddresses.map((addr) => (
                                <div
                                  key={addr.id}
                                  className={`p-3 mb-2 rounded ${
                                    selectedSavedAddressId === addr.id
                                      ? "bg-primary text-white fw-bold"
                                      : "bg-light"
                                  }`}
                                  style={{ cursor: "pointer" }}
                                  onClick={() => {
                                    setSelectedSavedAddressId(addr.id);
                                    setIsCollapsed(false);
                                    // Update form data with selected address
                                    setFormData((prev) => ({
                                      ...prev,
                                      fullName: addr.full_name,
                                      phoneNumber: addr.phone_number,
                                      addressOne: addr.address_1,
                                      addressTwo: addr.address_2 || "",
                                      postCode: addr.postcode || "",
                                      country: addr.country?.country_code || "",
                                      city: addr.city?.name || addr.city || "",
                                      deliveryMethod:
                                        addr.delivery_method?.method?.name ||
                                        "",
                                    }));
                                  }}
                                >
                                  <div className="d-flex justify-content-between">
                                    <strong>{addr.full_name}</strong>
                                    {addr.delivery_method?.method?.name && (
                                      <span className="badge bg-secondary">
                                        {addr.delivery_method.method.name}
                                      </span>
                                    )}
                                  </div>
                                  <div className="mt-1">
                                    <small className="d-block">
                                      {addr.address_1}
                                      {addr.address_2 && `, ${addr.address_2}`}
                                    </small>
                                    <small className="d-block">
                                      {addr.city?.name || addr.city},{" "}
                                      {addr.country?.name || addr.country}
                                    </small>
                                    {addr.delivery_method?.cost && (
                                      <small className="text-success d-block">
                                        Shipping Cost:{" "}
                                        {addr.delivery_method.cost}{" "}
                                        {addr.delivery_method.currency || "JOD"}
                                      </small>
                                    )}
                                  </div>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <div>No saved addresses found.</div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Shipping Address */}
            <div className="block mb-3 shipping-address mb-4">
              <div className="block-content">
                <div className="main-title-check mb-3">Add New Address</div>
                <fieldset>
                  <div className="row">
                    <div className="form-group col-12 col-sm-6">
                      <label htmlFor="fullName" className="form-label">
                        Full Name <span className="required">*</span>
                      </label>
                      <input
                        name="fullName"
                        value={formData.fullName}
                        id="fullName"
                        type="text"
                        required
                        className="form-control"
                        onChange={handleChange}
                      />
                    </div>

                    <div className="form-group col-12 col-sm-6">
                      <label htmlFor="phoneNumber" className="form-label">
                        Phone Number <span className="required">*</span>
                      </label>
                      <input
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        id="phoneNumber"
                        type="tel"
                        required
                        pattern="^\+?[1-9]\d{9,14}$"
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
                        <option value="">Select a Country</option>
                        {countries.map((countryItem) => (
                          <option
                            key={countryItem.id}
                            value={countryItem.country_code}
                          >
                            {countryItem.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="row">
                    <div className="form-group col-12 col-sm-6">
                      <label htmlFor="address_State" className="form-label">
                        Shipping Method <span className="required">*</span>
                      </label>
                      <select
                        id="address_State"
                        name="deliveryMethod"
                        value={formData.deliveryMethod}
                        className="form-control"
                        onChange={handleChange}
                        required
                      >
                        <option value="">Select Shipping Method</option>
                        {selectedCountryData?.ShippingZone?.[0]?.zone_methods
                          ?.filter((method) => method.is_enabled)
                          .map((method) => (
                            <option
                              key={method.shipping_zone_method_id}
                              value={method.method.name}
                              data-cost={method.cost}
                            >
                              {method.method.name} - {method.cost}{" "}
                              {selectedCountryData?.currency?.code || "JOD"}
                            </option>
                          ))}
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
                        <option value="">Select a City</option>
                        {selectedCountryData?.Cities?.map((city) => (
                          <option key={city.id} value={city.name}>
                            {city.name}
                          </option>
                        ))}
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

          {/*  */}
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
// setCountry(formData.country);
// const tax = calculateTax();
// console.log(`Calculated Tax: ${tax}`);
