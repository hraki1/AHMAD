import { useState, useEffect } from "react";
import { FaEdit } from "react-icons/fa";
import { baseUrl } from "../API/ApiConfig";
import toast, { Toaster } from "react-hot-toast";
import Modal from "../../Components/UI/Modal";

export default function Address({
  address,
  setAddresses,
  isEditing,
  onStartEditing,
  onStopEditing,
}) {
  const [modalOpen, setModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    full_name: address?.full_name || "",
    phone_number: address?.phone_number || "",
    address_1: address?.address_1 || "",
    address_2: address?.address_2 || "",
    postcode: address?.postcode || "",
    is_default: address?.is_default || false,
  });
  useEffect(() => {
    setFormData({
      full_name: address?.full_name || "",
      phone_number: address?.phone_number || "",
      address_1: address?.address_1 || "",
      address_2: address?.address_2 || "",
      postcode: address?.postcode || "",
      is_default: address?.is_default || false,
    });
  }, [address]); // يتم تشغيل هذا التأثير عند تغير prop address

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    const newValue =
      type === "select-one" && name === "is_default" ? value === "true" : value;

    setFormData({ ...formData, [name]: newValue });
  };

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

  const handleEditAddress = async (addressId) => {
    if (isEditing) {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("User not authenticated");
        return;
      }

      setIsLoading(true);

      try {
        const responseEdit = await fetch(
          `${baseUrl}/api/addresses/${addressId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(formData),
          }
        );

        if (responseEdit.ok) {
          const updatedAddress = await responseEdit.json();

          setFormData((prev) => ({
            ...prev,
            ...updatedAddress,
          }));

          if (setAddresses) {
            setAddresses((prev) =>
              prev.map((addr) =>
                addr.id === addressId ? updatedAddress : addr
              )
            );
          }

          toast.success("Address updated successfully");
          setError("");
          onStopEditing();
        } else {
          setError("Error Editing Data. Check Your Input.");
          toast.error("Failed to update address");
        }
      } catch (error) {
        console.error("Error updating address:", error);
        setError("Error Connecting to Server.");
        toast.error("Error updating address");
      } finally {
        setIsLoading(false);
      }
    } else {
      onStartEditing(addressId);
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
                <strong>Name:</strong>
                {isEditing ? (
                  <input
                    className="form-control"
                    name="full_name"
                    value={formData.full_name}
                    onChange={handleChange}
                  />
                ) : (
                  address?.full_name
                )}
              </p>
              <button
                onClick={toggleShowModal}
                className="btn btn-outline-danger btn-sm"
                disabled={isEditing}
              >
                <i className="fas fa-trash-alt me-2"></i> Delete
              </button>
            </div>

            <div className="row">
              <div className="col-md-4 mb-4">
                <p>
                  <strong>Phone:</strong>
                  {isEditing ? (
                    <input
                      className="form-control"
                      name="phone_number"
                      value={formData.phone_number}
                      onChange={handleChange}
                    />
                  ) : (
                    address.phone_number
                  )}
                </p>
              </div>
              <div className="col-md-4 mb-4">
                <p>
                  <strong>Address One:</strong>
                  {isEditing ? (
                    <input
                      className="form-control"
                      name="address_1"
                      value={formData.address_1}
                      onChange={handleChange}
                    />
                  ) : (
                    address?.address_1
                  )}
                </p>
              </div>
              <div className="col-md-4 mb-4">
                <p>
                  <strong>Address Tow:</strong>
                  {isEditing ? (
                    <input
                      className="form-control"
                      name="address_2"
                      value={formData.address_2}
                      onChange={handleChange}
                    />
                  ) : (
                    address?.address_2
                  )}
                </p>
              </div>
              <div className="col-md-4 mb-4">
                <p>
                  <strong>postcode:</strong>
                  {isEditing ? (
                    <input
                      className="form-control"
                      name="postcode"
                      value={formData.postcode}
                      onChange={handleChange}
                    />
                  ) : (
                    address?.postcode
                  )}
                </p>
              </div>
              <div className="col-md-4 mb-4">
                <p>
                  <strong>Country:</strong> {address.countries.name}
                </p>
              </div>
              <div className="col-md-4 mb-4">
                <p>
                  <strong>City:</strong> {address.city.name}
                </p>
              </div>
              <div className="col-md-4 mb-4">
                <p>
                  <strong>Default Address:</strong>
                  {isEditing ? (
                    <select
                      className="form-select"
                      name="is_default"
                      value={formData.is_default}
                      onChange={handleChange}
                    >
                      <option value={true}>Yes</option>
                      <option value={false}>No</option>
                    </select>
                  ) : address.is_default ? (
                    "Yes"
                  ) : (
                    "No"
                  )}
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
          onClick={() => handleEditAddress(address.id)}
          className="absolute top-3 right-3 text-blue-600 hover:text-blue-800"
          disabled={isLoading}
        >
          {isLoading ? "Saving..." : isEditing ? "Save" : <FaEdit size={18} />}
        </button>
      </div>
    </div>
  );
}
