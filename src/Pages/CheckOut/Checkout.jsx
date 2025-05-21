import React, { useEffect, useState } from "react";
import Button from "../../Components/common/Button";
import useCountriesData from "../Hooks/useCountriesData";
import { baseUrl } from "../API/ApiConfig";

export default function Checkout({ country, setCountry }) {
  const { countries, loading, error } = useCountriesData();
  const [savedAddresses, setSavedAddresses] = useState([]);
  const [selectedSavedAddressId, setSelectedSavedAddressId] = useState(null);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selectedCountryData, setSelectedCountryData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [errors, setErrors] = useState({});
  const [cartId, setCartId] = useState(null);
  const [isApproving, setIsApproving] = useState(false);

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

  // Fetch cart ID when component mounts
  useEffect(() => {
    const fetchCartId = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const res = await fetch(`${baseUrl}/api/carts/customer`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.ok) {
          const cartData = await res.json();
          setCartId(cartData.id || cartData.cart_id);
        } else if (res.status === 404) {
          // Create new cart if doesn't exist
          const createRes = await fetch(`${baseUrl}/api/carts`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({}),
          });

          if (createRes.ok) {
            const newCart = await createRes.json();
            setCartId(newCart.id || newCart.cart_id);
          }
        }
      } catch (err) {
        console.error("Failed to fetch cart ID", err);
      }
    };

    fetchCartId();
  }, []);

  // Handle selecting a saved address
  const handleSelectSavedAddress = (addr) => {
    setSelectedSavedAddressId(addr.id);
    setIsCollapsed(false);
    setIsEditing(false);

    setFormData((prev) => ({
      ...prev,
      fullName: addr.full_name,
      phoneNumber: addr.phone_number,
      addressOne: addr.address_1,
      addressTwo: addr.address_2 || "",
      postCode: addr.postcode || "",
      country: addr.countries?.country_code || "",
      city: addr.city?.name || "",
      deliveryMethod: "",
    }));

    setCountry(addr.countries?.country_code || "");
  };

  // When country changes in the form
  useEffect(() => {
    if (formData.country) {
      const countryData = countries.find(
        (c) => c.country_code === formData.country
      );
      setSelectedCountryData(countryData);
      setFormData((prev) => ({ ...prev, city: "", deliveryMethod: "" }));
    }
  }, [formData.country, countries]);

  // When saved address changes
  useEffect(() => {
    if (selectedSavedAddressId && countries.length > 0) {
      const addr = savedAddresses.find((a) => a.id === selectedSavedAddressId);
      if (addr) {
        const countryCode = addr.countries?.country_code;
        const countryData = countries.find(
          (c) => c.country_code === countryCode
        );
        setSelectedCountryData(countryData);

        const cityName = addr.city?.name || "";
        if (cityName && countryData?.Cities?.some((c) => c.name === cityName)) {
          setFormData((prev) => ({ ...prev, city: cityName }));
        }
      }
    }
  }, [selectedSavedAddressId, countries, savedAddresses]);

  // Fetch saved addresses
  useEffect(() => {
    const fetchSavedAddresses = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;
      try {
        const res = await fetch(`${baseUrl}/api/addresses`, {
          method: "get",
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setSavedAddresses(
          data.data || data.items || data.addresses || data || []
        );
      } catch (err) {
        console.error("Failed to fetch saved addresses", err);
      }
    };
    fetchSavedAddresses();
  }, []);

  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.fullName.trim()) {
      errors.fullName = "Full Name is required.";
    } else if (!/^[A-Za-z][A-Za-z0-9\s]*$/.test(formData.fullName)) {
      errors.fullName =
        "Full Name must start with a letter and contain only letters, numbers, and spaces.";
    }

    if (!formData.phoneNumber.trim()) {
      errors.phoneNumber = "Phone Number is required.";
    } else if (!/^\+\d+$/.test(formData.phoneNumber)) {
      errors.phoneNumber =
        "Phone Number must start with '+' and contain digits only.";
    }

    if (!formData.addressOne.trim()) {
      errors.addressOne = "Address is required.";
    }

    if (!formData.postCode.trim()) {
      errors.postCode = "Postcode is required.";
    } else if (!/^\d+$/.test(formData.postCode)) {
      errors.postCode = "Postcode must contain only numbers.";
    }

    if (!formData.country) {
      errors.country = "Country is required.";
    }

    if (!formData.city) {
      errors.city = "City is required.";
    }

    if (!formData.deliveryMethod) {
      errors.deliveryMethod = "Shipping method is required.";
    }

    return errors;
  };

  const handleSaveCountry = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      alert("User not authenticated");
      return;
    }

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
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

    try {
      const response = await fetch(`${baseUrl}/api/addresses`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          full_name: formData.fullName,
          phone_number: formData.phoneNumber,
          address_1: formData.addressOne,
          address_2: formData.addressTwo,
          postcode: formData.postCode,
          country_id: selectedCountry.id,
          city_id: selectedCity.id,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const message =
          errorData?.message || "Something went wrong while sending data.";
        alert(message);
        return;
      }

      alert("Address saved successfully!");

      setFormData({
        fullName: "",
        phoneNumber: "",
        addressOne: "",
        addressTwo: "",
        postCode: "",
        country: "",
        city: "",
        deliveryMethod: "",
      });

      // Update saved addresses
      const res = await fetch(`${baseUrl}/api/addresses`, {
        method: "get",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setSavedAddresses(
        data.data || data.items || data.addresses || data || []
      );

      setIsEditing(false);
      setSelectedSavedAddressId(null);
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to submit the data.");
    }
  };

  const handleApproveAddress = async () => {
    if (!formData.deliveryMethod) {
      alert("Please select a shipping method first");
      return;
    }

    if (!selectedSavedAddressId || !cartId) {
      alert("Missing required information");
      return;
    }

    setIsApproving(true);

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("User not authenticated");
        return;
      }

      // 1. Update shipping address
      const addressResponse = await fetch(
        `${baseUrl}/api/carts/${cartId}/shipping-address/${selectedSavedAddressId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!addressResponse.ok) {
        throw new Error("Failed to update shipping address");
      }

      // 2. Update shipping method
      const selectedMethod =
        selectedCountryData?.ShippingZone?.[0]?.zone_methods?.find(
          (method) => method.method.name === formData.deliveryMethod
        );

      if (!selectedMethod) {
        throw new Error("Selected shipping method not found");
      }

      const methodResponse = await fetch(
        `${baseUrl}/api/carts/${cartId}/shipping-method/${selectedMethod.shipping_zone_method_id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!methodResponse.ok) {
        throw new Error("Failed to update shipping method");
      }

      alert("Shipping address and method approved successfully!");
    } catch (error) {
      console.error("Error approving address:", error);
      alert(error.message || "Failed to approve address");
    } finally {
      setIsApproving(false);
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

  const handleDeleteAddress = async (id) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("User not authenticated");
      return;
    }

    if (!window.confirm("Are you sure you want to delete this address?"))
      return;

    try {
      const response = await fetch(`${baseUrl}/api/addresses/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error("Failed to delete address.");

      alert("Address deleted successfully.");

      if (selectedSavedAddressId === id) {
        setSelectedSavedAddressId(null);
        setFormData({
          fullName: "",
          phoneNumber: "",
          addressOne: "",
          addressTwo: "",
          postCode: "",
          country: "",
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
      }

      const res = await fetch(`${baseUrl}/api/addresses`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      setSavedAddresses(
        data.data || data.items || data.addresses || data || []
      );
    } catch (error) {
      console.error("Error deleting address:", error);
      alert("Failed to delete address.");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container">
      <form className="checkout-form" onSubmit={handleSaveCountry}>
        <div className="row">
          <div className="col-lg-6 col-md-6 col-sm-12">
            {savedAddresses.length > 0 && (
              <div className="block mb-3 payment-methods mb-4">
                <div className="block-content">
                  <div className="main-title-check mb-3">Saved Address</div>
                  <div className="payment-accordion">
                    <div className="accordion" id="accordionExample">
                      <div className="accordion-item card mb-4">
                        <div className="card-header" id="headingFour">
                          <button
                            className="card-link d-flex align-items-center justify-content-between collapsed"
                            type="button"
                            onClick={() => setIsCollapsed(!isCollapsed)}
                          >
                            {selectedSavedAddressId ? (
                              <div className="w-100">
                                <div className="d-flex justify-content-between w-100 align-items-center">
                                  <div>
                                    <strong className="me-2">
                                      {savedAddresses.find(
                                        (addr) =>
                                          addr.id === selectedSavedAddressId
                                      )?.full_name || "Name"}
                                    </strong>
                                  </div>

                                  <button
                                    type="button"
                                    className="btn btn-sm btn-outline-danger border-0"
                                    style={{
                                      fontSize: "14px",
                                      padding: "2px 6px",
                                    }}
                                    title="إلغاء اختيار العنوان"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setSelectedSavedAddressId(null);
                                      setIsCollapsed(false);
                                      setIsEditing(false);
                                      setFormData({
                                        fullName: "",
                                        phoneNumber: "",
                                        addressOne: "",
                                        addressTwo: "",
                                        postCode: "",
                                        country: "",
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
                                      setCountry("");
                                      setSelectedCountryData(null);
                                    }}
                                  >
                                    ✕
                                  </button>
                                </div>

                                <div className="text-start w-100">
                                  <small className="d-block">
                                    {savedAddresses.find(
                                      (addr) =>
                                        addr.id === selectedSavedAddressId
                                    )?.address_1 || "Address 1"}
                                  </small>
                                  <small className="d-block">
                                    {savedAddresses.find(
                                      (addr) =>
                                        addr.id === selectedSavedAddressId
                                    )?.city?.name || "City"}
                                    ,{" "}
                                    {savedAddresses.find(
                                      (addr) =>
                                        addr.id === selectedSavedAddressId
                                    )?.countries?.name || "Country"}
                                  </small>
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
                        >
                          <div className="card-body">
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
                                  onClick={() => handleSelectSavedAddress(addr)}
                                >
                                  <div className="d-flex justify-content-between align-items-start">
                                    <strong>{addr.full_name}</strong>

                                    <button
                                      type="button"
                                      className="btn btn-sm btn-danger"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleDeleteAddress(addr.id);
                                      }}
                                    >
                                      Delete
                                    </button>
                                  </div>
                                  <div className="mt-1">
                                    <small className="d-block">
                                      {addr.address_1}
                                      {addr.address_2 && `, ${addr.address_2}`}
                                    </small>
                                    <small className="d-block">
                                      {addr.city?.name || "No city"},
                                      {addr.countries?.name || "No country"}
                                    </small>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="block mb-3 shipping-address mb-4">
              <div className="block-content">
                <div className="main-title-check mb-3">
                  {selectedSavedAddressId
                    ? "Address Details"
                    : "Add New Address"}
                </div>
                <fieldset>
                  <div className="row">
                    <div className="form-group col-12 col-sm-6">
                      <label htmlFor="fullName" className="form-label">
                        Full Name <span className="required">*</span>
                      </label>
                      <input
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        required
                        className="form-control"
                        readOnly={!!selectedSavedAddressId && !isEditing}
                      />
                      {errors.fullName && (
                        <small className="text-danger">{errors.fullName}</small>
                      )}
                    </div>

                    <div className="form-group col-12 col-sm-6">
                      <label htmlFor="phoneNumber" className="form-label">
                        Phone Number <span className="required">*</span>
                      </label>
                      <input
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        required
                        className="form-control"
                        readOnly={!!selectedSavedAddressId && !isEditing}
                      />
                      {errors.phoneNumber && (
                        <small className="text-danger">
                          {errors.phoneNumber}
                        </small>
                      )}
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
                        onChange={handleChange}
                        required
                        className="form-control"
                        readOnly={!!selectedSavedAddressId && !isEditing}
                      />
                      {errors.addressOne && (
                        <small className="text-danger">
                          {errors.addressOne}
                        </small>
                      )}
                    </div>

                    <div className="form-group col-12">
                      <input
                        name="addressTwo"
                        value={formData.addressTwo}
                        onChange={handleChange}
                        className="form-control"
                        placeholder="Apartment, suite, unit etc. (optional)"
                        readOnly={!!selectedSavedAddressId && !isEditing}
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
                        onChange={handleChange}
                        className="form-control"
                        readOnly={!!selectedSavedAddressId && !isEditing}
                      />
                      {errors.postCode && (
                        <small className="text-danger">{errors.postCode}</small>
                      )}
                    </div>

                    <div className="form-group col-12 col-sm-6">
                      <label htmlFor="address_country1" className="form-label">
                        Country <span className="required">*</span>
                      </label>
                      <select
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        className="form-control"
                        required
                        disabled={!!selectedSavedAddressId && !isEditing}
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
                      {errors.country && (
                        <small className="text-danger">{errors.country}</small>
                      )}
                    </div>
                  </div>

                  <div className="row">
                    <div className="form-group col-12 col-sm-6">
                      <label htmlFor="address_State" className="form-label">
                        Shipping Method <span className="required">*</span>
                      </label>
                      <select
                        name="deliveryMethod"
                        value={formData.deliveryMethod}
                        onChange={handleChange}
                        className="form-control"
                        required
                      >
                        <option value="">Select Shipping Method</option>
                        {selectedCountryData?.ShippingZone?.[0]?.zone_methods
                          ?.filter((method) => method.is_enabled)
                          .map((method) => (
                            <option
                              key={method.shipping_zone_method_id}
                              value={method.method.name}
                            >
                              {method.method.name} - {method.cost}{" "}
                              {selectedCountryData?.currency?.code || "JOD"}
                            </option>
                          ))}
                      </select>
                      {errors.deliveryMethod && (
                        <small className="text-danger">
                          {errors.deliveryMethod}
                        </small>
                      )}
                    </div>

                    <div className="form-group col-12 col-sm-6">
                      <label htmlFor="address_province" className="form-label">
                        Town / City <span className="required">*</span>
                      </label>
                      <select
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        className="form-control"
                        required
                        disabled={!!selectedSavedAddressId && !isEditing}
                      >
                        <option value="">Select a City</option>
                        {selectedCountryData?.Cities?.map((city) => (
                          <option key={city.id} value={city.name}>
                            {city.name}
                          </option>
                        ))}
                      </select>
                      {errors.city && (
                        <small className="text-danger">{errors.city}</small>
                      )}
                    </div>
                  </div>

                  {!selectedSavedAddressId && (
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
                  )}
                </fieldset>

                {selectedSavedAddressId ? (
                  <div className="d-flex gap-2 mt-2">
                    <Button
                      label={isEditing ? "Save Address" : "Edit Address"}
                      type={isEditing ? "submit" : "button"}
                      primary={isEditing}
                      outline={!isEditing}
                      onClick={(e) => {
                        if (!isEditing) {
                          e.preventDefault();
                          setIsEditing(true);
                        }
                      }}
                    />
                    <Button
                      label={isApproving ? "Approving..." : "Approve"}
                      type="button"
                      primary
                      disabled={!formData.deliveryMethod || isApproving}
                      onClick={handleApproveAddress}
                    />
                  </div>
                ) : (
                  <Button
                    className="mt-2"
                    label="Save Address"
                    type="submit"
                    btn-secondary
                  />
                )}
              </div>
            </div>
          </div>
          {/* End Shipping Method  */}

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
