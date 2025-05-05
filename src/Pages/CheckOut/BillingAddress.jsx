import React from "react";

export default function BillingAddress() {
  return (
    <div>
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
                />
              </div>
              <div className="form-group col-12">
                <input
                  name="address12"
                  id="address-12"
                  type="text"
                  placeholder="Apartment, suite, unit etc. (optional)"
                  className="form-control"
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
                />
              </div>
              <div className="form-group col-12 col-sm-6">
                <label htmlFor="address_country2" className="form-label">
                  Country <span className="required">*</span>
                </label>
                <select
                  id="address_country2"
                  name="country1"
                  className="form-control"
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
                  className="form-control"
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
                  className="form-control"
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
  );
}
