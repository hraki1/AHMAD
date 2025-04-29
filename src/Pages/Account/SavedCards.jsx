import React, { useState } from "react";
import cardlogo from "../../assets/images/icons/bank-logo1.png";
import cardlogo2 from "../../assets/images/icons/bank-logo2.png";

const SavedCards = () => {
  const [showModal, setShowModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  const cards = [
    {
      logo: cardlogo,
      cardNumber: "3742 4545 5400 126",
      nameOnCard: "Hema Jecno",
      validity: "XX/XX",
      cardType: "visa",
    },
    {
      logo: cardlogo2,
      cardNumber: "3742 4545 5400 126",
      nameOnCard: "Hema Jecno",
      validity: "XX/XX",
      cardType: "mastercard",
    },
  ];

  const handleEditClick = (card) => {
    setSelectedCard(card);
    setEditModal(true);
  };

  return (
    <div className="h-100" id="payment">
      <div className="banks-card mt-0 h-100">
        <div className="top-sec d-flex-justify-center justify-content-between mb-4">
          <div className="title-account">Saved Cards</div>
          <button
            type="button"
            className="btn btn-primary btn-sm"
            onClick={() => setShowModal(true)}
          >
            <i className="fa-solid fa-plus me-1"></i> Add New
          </button>

          {/* New Card Modal */}
          {showModal && (
            <div
              className="modal fade show"
              id="addCardModal"
              style={{ display: "block" }}
            >
              <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                  <div className="modal-header">
                    <h2 className="modal-title">Cards details</h2>
                    <button
                      type="button"
                      className="btn-close"
                      onClick={() => setShowModal(false)}
                      aria-label="Close"
                    ></button>
                  </div>
                  <div className="modal-body">
                    <form className="add-card-from" method="post" action="#">
                      {/* Form inputs for adding a card */}
                    </form>
                  </div>
                  <div className="modal-footer justify-content-center">
                    <button type="submit" className="btn btn-primary m-0">
                      <span>Add Card</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="bank-book-section">
          <div className="row g-4 row-cols-lg-3 row-cols-md-2 row-cols-sm-2 row-cols-1">
            {/* Card Entries */}
            {cards.map((card, index) => (
              <div className="address-select-box" key={index}>
                <div className="address-box bg-block">
                  <div className="top bank-logo d-flex-justify-center justify-content-between mb-3">
                    <img
                      src={card.logo}
                      className="bank-logo"
                      width="40"
                      alt=""
                    />
                  </div>
                  <div className="middle">
                    <div className="card-number mb-3">
                      <h6>Card Number</h6>
                      <p className="text-muted">{card.cardNumber}</p>
                    </div>
                    <div className="name-validity d-flex-justify-center justify-content-between">
                      <div className="left">
                        <h6>Name on card</h6>
                        <p className="text-muted">{card.nameOnCard}</p>
                      </div>
                      <div className="right">
                        <h6>Validity</h6>
                        <p className="text-muted">{card.validity}</p>
                      </div>
                    </div>
                  </div>
                  <div className="bottom d-flex-justify-center justify-content-between">
                    <button
                      type="button"
                      className="bottom-btn btn btn-gray btn-sm"
                      onClick={() => handleEditClick(card)}
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

          {/* Edit Bank card Modal */}
          {editModal && selectedCard && (
            <div
              className="modal fade show"
              id="editCardModal"
              style={{ display: "block" }}
            >
              <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                  <div className="modal-header">
                    <h2 className="modal-title">Edit Card details</h2>
                    <button
                      type="button"
                      className="btn-close"
                      onClick={() => setEditModal(false)}
                      aria-label="Close"
                    ></button>
                  </div>
                  <div className="modal-body">
                    <form className="add-card-from" method="post" action="#">
                      <div className="form-row">
                        <div className="form-group col-lg-12">
                          <label htmlFor="edit-card-number" className="d-none">
                            Card Number
                          </label>
                          <input
                            name="edit-card-number"
                            placeholder="Card Number"
                            id="edit-card-number"
                            type="text"
                            defaultValue={selectedCard.cardNumber}
                          />
                        </div>
                        <div className="form-group col-lg-6">
                          <label htmlFor="edit-bank-card" className="d-none">
                            Card <span className="required">*</span>
                          </label>
                          <select
                            id="edit-bank-card"
                            className="form-control"
                            defaultValue={selectedCard.cardType}
                          >
                            <option value="visa">Visa</option>
                            <option value="mastercard">Mastercard</option>
                            <option value="american_Express">
                              American Express
                            </option>
                            <option value="discover">Discover</option>
                          </select>
                        </div>
                        <div className="form-group col-lg-6">
                          <label htmlFor="edit-cvv-code" className="d-none">
                            CVV Code <span className="required">*</span>
                          </label>
                          <input
                            name="edit-cvv-code"
                            placeholder="CVV Code"
                            id="edit-cvv-code"
                            type="text"
                          />
                        </div>
                        <div className="form-group col-lg-6 mb-md-0">
                          <label htmlFor="edit-card-month" className="d-none">
                            Month <span className="required">*</span>
                          </label>
                          <select id="edit-card-month" className="form-control">
                            {/* Month options */}
                          </select>
                        </div>
                        <div className="form-group col-lg-6 mb-0">
                          <label htmlFor="edit-card-year" className="d-none">
                            Year <span className="required">*</span>
                          </label>
                          <select id="edit-card-year" className="form-control">
                            {/* Year options */}
                          </select>
                        </div>
                      </div>
                    </form>
                  </div>
                  <div className="modal-footer justify-content-center">
                    <button type="submit" className="btn btn-primary m-0">
                      <span>Save Card</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SavedCards;
