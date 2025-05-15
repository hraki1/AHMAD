import React, { useEffect, useState } from "react";
import Button from "../../Components/common/Button"; // Adjust the import path as necessary
import useCountriesData from "../Hooks/useCountriesData";
import { baseUrl } from "../API/ApiConfig";
export default function Checkout({ country, setCountry }) {
  const { countries, loading, error } = useCountriesData();
  const [savedAddresses, setSavedAddresses] = useState([]);
  const [selectedSavedAddressId, setSelectedSavedAddressId] = useState(null);
  const [isCollapsed, setIsCollapsed] = useState(false);

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

        console.log("Token", token);
        const data = await res.json();
        console.log("API Response:", data); // Add this to see the exact response structure

        // Try different ways to access the data
        const addresses = data.data || data.items || data.addresses || data;
        console.log("Addresses extracted:", addresses);

        setSavedAddresses(addresses || []);
      } catch (err) {
        console.error("Failed to fetch saved addresses", err);
      }
    };

    fetchSavedAddresses();
  }, []);

  // Handle Save button click: update country in parent component
  const handleSaveCountry = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      alert("User not authenticated");
      return;
    }

    // إذا تم اختيار عنوان محفوظ، أرسله مباشرة
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

    // غير ذلك، استخدم البيانات من الفورم (كما هو موجود حاليًا)
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

  // Optional example tax calculation based on country
  const taxRate = 0.16;
  const calculateTax = () => {
    if (formData.country === "JO") {
      const taxAmount = 100 * taxRate;
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

                {/* Accordion to select another address */}
                <div className="payment-accordion">
                  <div className="accordion" id="accordionExample">
                    <div className="accordion-item card mb-4">
                      <div className="card-header" id="headingFour">
                        <button
                          className="card-link d-flex align-items-center justify-content-between collapsed"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#collapseFourr"
                          aria-expanded={isCollapsed ? "true" : "false"} // تحديث حالة الـ aria-expanded بناءً على isCollapsed
                          aria-controls="collapseFourr"
                          onClick={() => setIsCollapsed(!isCollapsed)} // تغيير حالة collapse عند الضغط
                        >
                          {(() => {
                            const selectedAddress = savedAddresses.find(
                              (addr) => addr.id === selectedSavedAddressId
                            );
                            return selectedAddress ? (
                              <>
                                <div>
                                  <strong className="me-1">
                                    {selectedAddress.full_name}
                                  </strong>
                                  <small className="me-1">
                                    {selectedAddress.address_1}
                                  </small>
                                  <small className="me-1">
                                    {selectedAddress.city?.name ||
                                      selectedAddress.city}
                                    ,{" "}
                                    {selectedAddress.country?.name ||
                                      selectedAddress.country}
                                  </small>
                                </div>
                              </>
                            ) : (
                              "Select a saved address"
                            );
                          })()}
                          <i className="fa-solid fa-bars"></i>
                        </button>
                      </div>
                      <div
                        className={`accordion-collapse collapse ${
                          isCollapsed ? "show" : ""
                        }`} // استخدام حالة isCollapsed للتحكم في الفتح والإغلاق
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
                                  className={`p-2 mb-2 rounded ${
                                    selectedSavedAddressId === addr.id
                                      ? "bg-primary text-white fw-bold"
                                      : "bg-light"
                                  }`}
                                  style={{ cursor: "pointer" }}
                                  onClick={() => {
                                    setSelectedSavedAddressId(addr.id);
                                    setIsCollapsed(false); // إغلاق القائمة بعد اختيار العنوان
                                  }}
                                >
                                  {addr.full_name}, {addr.address_1},{" "}
                                  {addr.city?.name || addr.city},{" "}
                                  {addr.country?.name || addr.country}
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
                        <option value="">Select a City</option>
                        {formData.country &&
                          countries
                            .find((c) => c.country_code === formData.country)
                            ?.Cities?.map((city) => (
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
