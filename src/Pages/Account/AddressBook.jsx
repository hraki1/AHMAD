import React, { useState } from "react";

const AddressBook = () => {
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      name: "Hema Jecno",
      type: "Home",
      address:
        "123, The Company Name Inc, Street Road City name, State name and Zip code.",
      mobile: "(+40) 123 456 7890",
    },
    {
      id: 2,
      name: "Hema Jecno",
      type: "Office",
      address:
        "123, The Company Name Inc, Street Road City name, State name and Zip code.",
      mobile: "(+40) 123 456 7890",
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);

  const handleEdit = (address) => {
    setSelectedAddress(address);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedAddress(null);
  };

  const handleSaveAddress = (event) => {
    event.preventDefault();
    // هنا يمكنك إضافة الكود لتحديث البيانات في `addresses`
    setShowModal(false);
  };

  return (
    <div className="col-12 col-sm-12 col-md-12 col-lg-9">
      <div className="dashboard-content tab-content h-100" id="top-tabContent">
        {/* Address Book */}
        <div className="h-100" id="address">
          <div className="address-card mt-0 h-100">
            <div className="top-sec d-flex-justify-center justify-content-between mb-4">
              <div className="mb-0 title-account">Address Book</div>
              <button
                type="button"
                className="btn btn-primary btn-sm"
                data-bs-toggle="modal"
                data-bs-target="#addNewModal"
              >
                <i className="fa-solid fa-plus me-1"></i> Add New
              </button>
            </div>

            <div className="address-book-section">
              <div className="row g-4  row-cols-md-2 row-cols-sm-2 row-cols-1">
                {addresses.map((addr) => (
                  <div key={addr.id} className="address-select-box">
                    <div className="address-box bg-block">
                      <div className="top d-flex-justify-center justify-content-between mb-3">
                        <h5 className="m-0">{addr.name}</h5>
                        <span className="product-labels start-auto end-0">
                          <span
                            className={`lbl ${
                              addr.type === "Home" ? "pr-label1" : "pr-label4"
                            }`}
                          >
                            {addr.type}
                          </span>
                        </span>
                      </div>
                      <div className="middle">
                        <div className="address mb-2 text-muted">
                          <address className="m-0">{addr.address}</address>
                        </div>

                        <div className="number">
                          <p>
                            Mobile:{" "}
                            <a href={`tel:${addr.mobile}`}>{addr.mobile}</a>
                          </p>
                        </div>
                      </div>
                      <div className="bottom d-flex-justify-center justify-content-between">
                        <button
                          type="button"
                          className="bottom-btn btn btn-gray btn-sm"
                          onClick={() => handleEdit(addr)}
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          className="bottom-btn btn btn-gray btn-sm"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Edit Address Modal */}
              {showModal && (
                <div
                  className="modal fade show"
                  style={{ display: "block" }}
                  id="addEditModal"
                  tabIndex="-1"
                  aria-labelledby="addEditModalLabel"
                  aria-hidden="true"
                >
                  <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h2 className="modal-title" id="addEditModalLabel">
                          Edit Address details
                        </h2>
                        <button
                          type="button"
                          className="btn-close"
                          onClick={handleCloseModal}
                          aria-label="Close"
                        ></button>
                      </div>
                      <div className="modal-body">
                        <form
                          className="edit-address-from"
                          onSubmit={handleSaveAddress}
                        >
                          <div className="form-row row-cols-lg-2 row-cols-md-2 row-cols-sm-1 row-cols-1">
                            <div className="form-group">
                              <label htmlFor="edit-name" className="d-none">
                                Name
                              </label>
                              <input
                                name="name"
                                placeholder="Name"
                                value={selectedAddress?.name || ""}
                                id="edit-name"
                                type="text"
                              />
                            </div>
                            <div className="form-group">
                              <label htmlFor="edit-type" className="d-none">
                                Address type <span className="required">*</span>
                              </label>
                              <select
                                name="edit_type_id"
                                id="edit-type"
                                value={selectedAddress?.type || ""}
                              >
                                <option value="">Select Address type</option>
                                <option value="home">Home</option>
                                <option value="office">Office</option>
                              </select>
                            </div>
                            <div className="form-group">
                              <label htmlFor="edit-company" className="d-none">
                                Company
                              </label>
                              <input
                                name="company"
                                placeholder="Company"
                                value={selectedAddress?.company || ""}
                                id="edit-company"
                                type="text"
                              />
                            </div>
                            <div className="form-group">
                              <label
                                htmlFor="edit-apartment"
                                className="d-none"
                              >
                                Apartment <span className="required">*</span>
                              </label>
                              <input
                                name="apartment"
                                placeholder="Apartment"
                                value={selectedAddress?.apartment || ""}
                                id="edit-apartment"
                                type="text"
                              />
                            </div>
                            <div className="form-group">
                              <label
                                htmlFor="edit-street-address"
                                className="d-none"
                              >
                                Street Address{" "}
                                <span className="required">*</span>
                              </label>
                              <input
                                name="street_address"
                                placeholder="Street Address"
                                value={selectedAddress?.streetAddress || ""}
                                id="edit-street-address"
                                type="text"
                              />
                            </div>
                            <div className="form-group">
                              <label htmlFor="edit-city" className="d-none">
                                City <span className="required">*</span>
                              </label>
                              <input
                                name="city"
                                placeholder="City"
                                value={selectedAddress?.city || ""}
                                id="edit-city"
                                type="text"
                              />
                            </div>
                            <div className="form-group">
                              <label htmlFor="edit-postcode" className="d-none">
                                Post Code <span className="required">*</span>
                              </label>
                              <input
                                name="postcode"
                                placeholder="Post Code"
                                value={selectedAddress?.postcode || ""}
                                id="edit-postcode"
                                type="text"
                              />
                            </div>
                            <div className="form-group">
                              <label
                                htmlFor="edit-telephone"
                                className="d-none"
                              >
                                Telephone <span className="required">*</span>
                              </label>
                              <input
                                name="telephone"
                                placeholder="Telephone"
                                value={selectedAddress?.telephone || ""}
                                id="edit-telephone"
                                type="tel"
                              />
                            </div>
                            <div className="form-group mb-md-0">
                              <label htmlFor="edit-zone" className="d-none">
                                Region / State{" "}
                                <span className="required">*</span>
                              </label>
                              <select
                                name="edit_zone_id"
                                id="edit-zone"
                                value={selectedAddress?.zone || ""}
                              >
                                <option value="">Select Region / State</option>
                                <option value="AL">Alabama</option>
                                <option value="AK">Alaska</option>
                                <option value="AZ">Arizona</option>
                                <option value="AR">Arkansas</option>
                                <option value="CA">California</option>
                                <option value="CO">Colorado</option>
                                <option value="CT">Connecticut</option>
                                <option value="DE">Delaware</option>
                              </select>
                            </div>
                            <div className="form-group mb-0">
                              <label htmlFor="edit-country" className="d-none">
                                Country <span className="required">*</span>
                              </label>
                              <select
                                name="edit_country_id"
                                id="edit-country"
                                value={selectedAddress?.country || ""}
                              >
                                <option value="">Select Country</option>
                                <option value="AI" label="Anguilla">
                                  Anguilla
                                </option>
                                <option value="AG" label="Antigua and Barbuda">
                                  Antigua and Barbuda
                                </option>
                                <option value="AR" label="Argentina">
                                  Argentina
                                </option>
                                <option value="AW" label="Aruba">
                                  Aruba
                                </option>
                                <option value="BS" label="Bahamas">
                                  Bahamas
                                </option>
                                <option value="BB" label="Barbados">
                                  Barbados
                                </option>
                                <option value="BZ" label="Belize">
                                  Belize
                                </option>
                                <option value="BM" label="Bermuda">
                                  Bermuda
                                </option>
                                <option value="BO" label="Bolivia">
                                  Bolivia
                                </option>
                                <option value="BR" label="Brazil">
                                  Brazil
                                </option>
                              </select>
                            </div>
                          </div>
                        </form>
                      </div>
                      <div className="modal-footer justify-content-center">
                        <button type="submit" className="btn btn-primary m-0">
                          <span>Save Address</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {/* End Edit Address Modal */}
            </div>
          </div>
        </div>
        {/* End Address Book */}
      </div>
    </div>
  );
};

export default AddressBook;
