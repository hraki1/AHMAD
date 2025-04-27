import React from "react";

const CartForms = ({ setDiscount, setCouponApplied }) => {
  const applyCoupon = (e) => {
    e.preventDefault();
    const couponInput = e.target.elements.coupon.value.trim();

    //  admin copoun
    if (couponInput === "admin") {
      setDiscount(10);
      setCouponApplied(true);
    } else if (couponInput === "admin") {
      setDiscount(20);
      setCouponApplied(true);
    } else {
      setDiscount(0);
      setCouponApplied(false);
      alert("Invalid coupon code. Try again.");
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
              <form onSubmit={applyCoupon}>
                <div className="form-group">
                  <label htmlFor="coupon">Enter your coupon code.</label>
                  <div className="input-group0">
                    <input
                      className="form-control"
                      type="text"
                      name="coupon"
                      id="coupon"
                      placeholder="e.g., DISCOUNT10"
                      required
                    />
                    <input
                      type="submit"
                      className="btn text-nowrap mt-3"
                      value="Apply Coupon"
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>

          {/* Shipping Calculator Section */}
          <div className="col-12 mb-12 cart-col">
            <div id="shipping-calculator" className="mt-4">
              <h5>Get shipping estimates</h5>
              <form
                className="estimate-form row row-cols-lg-3 row-cols-md-3 row-cols-1"
                action="#"
                method="post"
              >
                <FormGroup
                  label="Country"
                  id="address_country"
                  name="address[country]"
                  options={[
                    { value: "0", label: "Select a country..." },
                    { value: "US", label: "United States" },
                    { value: "CA", label: "Canada" },
                    // أضف المزيد حسب الحاجة
                  ]}
                />
                <FormGroup
                  label="State"
                  id="address_province"
                  name="address[province]"
                  options={[
                    { value: "0", label: "Select a state..." },
                    { value: "AL", label: "Alabama" },
                    { value: "CA", label: "California" },
                    // أضف المزيد حسب الحاجة
                  ]}
                />
                <FormGroup
                  label="Postal/Zip Code"
                  id="address_zip"
                  name="address[zip]"
                  inputType="text"
                />
                <div className="actionRow">
                  <input
                    type="button"
                    className="btn btn-secondary get-rates"
                    value="Calculate shipping"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const FormGroup = ({ label, id, name, options, inputType }) => {
  return (
    <div className="form-group mb-3">
      <label htmlFor={id}>{label}</label>
      {options ? (
        <select id={id} name={name} className="form-control">
          {options.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : (
        <input type={inputType} id={id} name={name} className="form-control" />
      )}
    </div>
  );
};

export default CartForms;
