import { useContext, useEffect, useState } from "react";
import Button from "../../Components/common/Button";
import useCountriesData from "../Hooks/useCountriesData";
import { baseUrl } from "../API/ApiConfig";
import CartSummary from "./CartSummary";
import { useCart } from "../../Context/CartContext";
import { AuthContext } from "../../Context/AuthContext";
import Spinner from "../../Components/UI/SpinnerLoading";
import toast, { Toaster } from "react-hot-toast";
import { ArrowDown, ChevronDown } from "lucide-react";
import PaymentFiledCheckout from "./PaymentMethodFiledCheckout";

export default function AddressFieldCheckout({
  country,
  setCountry,
  onSelectAddress,
  onSelectDelevaryMethod,
  startPaymentHandler,
  isPaymentLoading,
}) {
  const { user, isLoading: authIsLoading } = useContext(AuthContext);

  const userInformation = { ...user };

  const { countries, loading, error } = useCountriesData();
  const [savedAddresses, setSavedAddresses] = useState([]);
  const [selectedSavedAddressId, setSelectedSavedAddressId] = useState(null);
  const [selectedSavedAddress, setSelectedSavedAddress] = useState(null);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selectedCountryData, setSelectedCountryData] = useState(null);
  const [isEditing, setIsEditing] = useState(true);
  const [showConfirmAddress, setShowConfirmAddress] = useState(true);
  const [errors, setErrors] = useState({});
  const [cartId, setCartId] = useState(null);
  const [discount, setDiscount] = useState(0); // Check this initial value
  const [cartItems, setCartItems] = useState([]);
  const [approve, setApprove] = useState(false);

  const [formData, setFormData] = useState({
    fullName: userInformation?.full_name ?? "",
    phoneNumber: userInformation?.phone_number ?? "",
    addressOne: "",
    addressTwo: "",
    postCode: "",
    country: country,
    city: "",
    savingAddress: false,
    couponCode: "",
  });

  // Handle selecting a saved address
  const handleSelectSavedAddress = (addr) => {
    setSelectedSavedAddressId(addr.id);
    onSelectAddress(addr.id);
    setSelectedSavedAddress(addr);
    setIsCollapsed(false);
    setIsEditing(false);
    setShowConfirmAddress(false);

    setFormData((prev) => ({
      ...prev,
      fullName: addr.full_name,
      phoneNumber: addr.phone_number,
      addressOne: addr.address_1,
      addressTwo: addr.address_2 || "",
      postCode: addr.postcode || "",
      country: addr.countries?.country_code || "",
      city: addr.city?.name || "",
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
      setCountry(countryData);
      setFormData((prev) => ({ ...prev, city: "" }));
    }
  }, [formData.country, countries, setCountry]);

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

    return errors;
  };

  const handleSaveForm = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("User not authenticated");
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
      toast.error("Please select a valid country and city.");
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
        toast.error(message);
        return;
      }

      const resAddress = await response.json();
      console.log(resAddress);
      setSelectedSavedAddressId(resAddress.id);
      onSelectAddress(resAddress.id);
      setSelectedSavedAddress(resAddress);
      setShowConfirmAddress(false);
      setIsEditing(false);

      toast.success("Address saved successfully!");

      // Update saved addresses
      const res = await fetch(`${baseUrl}/api/addresses`, {
        method: "get",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setSavedAddresses(
        data.data || data.items || data.addresses || data || []
      );
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to submit the data.");
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetch(`${baseUrl}/api/carts/customer`, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => {
          if (!res.ok) throw new Error("Failed to fetch cart");
          return res.json();
        })
        .then((data) => {
          setCartId(data.cart_id);
          setDiscount(data.discount_amount || 0); // <-- Set discount from API
          const items = data.items.map((item) => ({
            id: item.product_id,
            cart_item_id: item.cart_item_id,
            name: item.product_name || `Product ${item.product_id}`,
            price: item.product_price || 0,
            quantity: item.qty || 1,
            image: item.image || "default-image.jpg",
          }));
          setCartItems(items);
        })
        .catch((error) => {
          console.error("Error fetching cart:", error);
        });
    }
  }, []);

  function cancelSelectHandler(e) {
    e.stopPropagation();
    setSelectedSavedAddressId(null);
    setSelectedSavedAddress(null);
    setIsEditing(true);
    setShowConfirmAddress(true);
    setIsCollapsed(false);
    setFormData({
      fullName: "",
      phoneNumber: "",
      addressOne: "",
      addressTwo: "",
      postCode: "",
      country: "",
      city: "",
      savingAddress: false,
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
    onSelectAddress(null);
  }

  function enableEditHandler() {
    setIsEditing(true);
    setShowConfirmAddress(false);
  }
  function cancelEditHandler() {
    setIsEditing(false);
  }

  function handleShowAddressDetails() {
    setApprove((prev) => !prev);
  }

  if (loading || authIsLoading)
    return (
      <div className="h">
        <Spinner />
      </div>
    );
  if (error) return <p>{error}</p>;

  return (
    <div className="container">
      <Toaster />
      <form className="checkout-form" onSubmit={handleSaveForm}>
        <div className="row">
          {approve ? (
            <div className="col-lg-8 col-md-8 col-sm-12">
              <div className="p-4 border rounded shadow-sm bg-white">
                <h5 className="mb-4">Saved Address</h5>

                <div className="accordion" id="accordionExample">
                  <div className="accordion-item card mb-3">
                    <button
                      onClick={handleShowAddressDetails}
                      className="btn btn-primary d-flex align-items-center justify-content-between w-100"
                    >
                      <span>Show Address</span>
                      <ChevronDown />
                    </button>
                  </div>
                </div>
              </div>

              {/* ***************************************************************** */}
              <div className="mt-5">
                <PaymentFiledCheckout
                  country={country}
                  setCountry={setCountry}
                  onSelectDelevaryMethod={onSelectDelevaryMethod}
                />
              </div>
            </div>
          ) : (
            <div className="col-lg-8 col-md-8 col-sm-12">
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
                                  <div className="d-flex justify-content-left w-100 align-items-center">
                                    <div>
                                      <strong className="me-2">
                                        {savedAddresses.find(
                                          (addr) =>
                                            addr.id === selectedSavedAddressId
                                        )?.full_name || "Name"}
                                      </strong>
                                    </div>

                                    <div
                                      type="button"
                                      className="btn-sm btn-outline-danger  border-0 btn-addrs"
                                      title="Cancel Select"
                                      onClick={(e) => cancelSelectHandler(e)}
                                    >
                                      ✕
                                    </div>
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
                                    onClick={() =>
                                      handleSelectSavedAddress(addr)
                                    }
                                  >
                                    <div className="d-flex justify-content-between align-items-start">
                                      <strong>{addr.full_name}</strong>
                                    </div>
                                    <div className="mt-1">
                                      <small className="d-block">
                                        {addr.address_1}
                                        {addr.address_2 &&
                                          `, ${addr.address_2}`}
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
                          readOnly={!isEditing}
                        />
                        {errors.fullName && (
                          <small className="text-danger">
                            {errors.fullName}
                          </small>
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
                          readOnly={!isEditing}
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
                          readOnly={!isEditing}
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
                          readOnly={!isEditing}
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
                          readOnly={!isEditing}
                        />
                        {errors.postCode && (
                          <small className="text-danger">
                            {errors.postCode}
                          </small>
                        )}
                      </div>

                      <div className="form-group col-12 col-sm-6">
                        <label
                          htmlFor="address_country1"
                          className="form-label"
                        >
                          Country <span className="required">*</span>
                        </label>
                        <select
                          name="country"
                          value={formData.country}
                          onChange={handleChange}
                          className="form-control"
                          required
                          disabled={!isEditing}
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
                          <small className="text-danger">
                            {errors.country}
                          </small>
                        )}
                      </div>
                    </div>

                    <div className="row">
                      <div className="form-group col-12 col-sm-12">
                        <label
                          htmlFor="address_province"
                          className="form-label"
                        >
                          Town / City <span className="required">*</span>
                        </label>
                        <select
                          name="city"
                          value={formData.city}
                          onChange={handleChange}
                          className="form-control"
                          required
                          disabled={!isEditing}
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

                    {selectedSavedAddress && (
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
                    )}
                  </fieldset>

                  <div className="d-flex gap-2 mt-2">
                    {selectedSavedAddress && !isEditing && (
                      <Button
                        label={"Edit Address"}
                        type={"button"}
                        primary={isEditing}
                        outline={!isEditing}
                        onClick={enableEditHandler}
                      />
                    )}

                    {selectedSavedAddress && isEditing && (
                      <Button
                        label={"Save"}
                        type={"submit"}
                        primary={isEditing}
                        outline={!isEditing}
                      />
                    )}
                    {selectedSavedAddress && isEditing && (
                      <Button
                        label={"Cancel Edit"}
                        type={"button"}
                        primary={isEditing}
                        outline={!isEditing}
                        onClick={cancelEditHandler}
                      />
                    )}
                    {showConfirmAddress && (
                      <Button
                        className=""
                        label="Confirm Address"
                        type="submit"
                        btn-secondary
                      />
                    )}
                    {selectedSavedAddress && !isEditing && (
                      <Button
                        className=""
                        label="Approve Address"
                        type="button"
                        btn-secondary
                        onClick={() => setApprove((prev) => !prev)}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="col-lg-4 marg-btm-big">
            <CartSummary
              tax={0}
              shipping={0}
              setDiscount={setDiscount}
              btnName={"Go to Payemnt"}
              useGrandTotal={false}
              mode="checkout"
              onPlaceOrder={startPaymentHandler}
              isPaymentLoading={isPaymentLoading}
            />
          </div>
        </div>
      </form>
    </div>
  );
}
