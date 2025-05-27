import { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { baseUrl } from "../API/ApiConfig";
import toast, { Toaster } from "react-hot-toast";

import Modal from "../../Components/UI/Modal";

export default function Address({ address, onEdit, setAddresses }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  function toggleShowModal() {
    setModalOpen((prev) => !prev);
  }

  const handleDeleteAddress = async (id) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("User not authenticated");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`${baseUrl}/api/addresses/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setIsLoading(false);
      if (!response.ok) throw new Error("Failed to delete address.");
    } catch (error) {
      console.error("Error deleting address:", error);
      toast.error("Failed to delete address.");
      setIsLoading(false);
      toggleShowModal();
    }

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${baseUrl}/api/addresses`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      toggleShowModal();

      setAddresses(data);
    } catch (error) {
      console.error("Error fetching addresses:", error);
      setAddresses([]);
      toggleShowModal();
    }
  };

  return (
    <div>
      <Toaster />
      <Modal open={modalOpen}>
        <div className="p-4 text-center">
          <h2 className="h4 fw-bold text-white">
            Delete Address from Your AddressBook?
          </h2>

          <div className="d-flex justify-content-center gap-3 mt-4">
            <button
              onClick={() => {
                handleDeleteAddress(address.id);
              }}
              className="btn btn-secondary px-4 btn-one-hover-shipp"
            >
              {isLoading ? "Deleting..." : "Yes, Remove"}
            </button>

            <button
              onClick={toggleShowModal}
              className="btn btn-primary px-4 btn-tow-hover-shipp"
              disabled={isLoading}
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>
      <div className="bg-white shadow-md rounded-xl p-4 border border-gray-200 relative mb-5">
        <div className="data-addesss">
          <div className="row ">
            <div className="col-md-12 mb-4 d-flex justify-content-between align-items-center">
              <p className="mb-0">
                <strong>Name:</strong> {address.full_name}
              </p>
              <button
                onClick={toggleShowModal}
                className="btn btn-outline-danger btn-sm"
              >
                <i className="fas fa-trash-alt me-2"></i> Delete
              </button>
            </div>

            <div className="row">
              <div className="col-md-4 mb-4">
                <p>
                  <strong>Phone:</strong> {address.phone_number}
                </p>
              </div>
              <div className="col-md-4 mb-4">
                <p>
                  <strong>Country:</strong> {address.countries?.name}
                </p>
              </div>
              <div className="col-md-4 mb-4">
                <p>
                  <strong>City:</strong> {address.city?.name}
                </p>
              </div>
              <div className="col-md-4 mb-4">
                <p>
                  <strong>Address One:</strong> {address.address_1}
                </p>
              </div>
              <div className="col-md-4 mb-4">
                <p>
                  <strong>Address Tow:</strong> {address.address_2}
                </p>
              </div>
              <div className="col-md-4 mb-4">
                <p>
                  <strong>postcode:</strong> {address.postcode}
                </p>
              </div>
              <div className="col-md-4 mb-4">
                <p>
                  <strong>Notes:</strong> {address.notes}
                </p>
              </div>
            </div>
          </div>
        </div>
        <button
          onClick={() => onEdit(address.id)}
          className="absolute top-3 right-3 text-blue-600 hover:text-blue-800"
        >
          <FaEdit size={18} />
        </button>
      </div>
    </div>
  );
}
