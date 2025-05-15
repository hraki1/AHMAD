import React, { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../API/ApiConfig";
const AddressBook = () => {
  const [addresses, setAddresses] = useState([]); // ✅ القيمة الابتدائية مصفوفة فارغة
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(`${baseUrl}/api/addresses`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();
        console.log("Fetched address data:", data);

        setAddresses(data);
      } catch (error) {
        console.error("Error fetching addresses:", error);
        setAddresses([]);
      }
    };

    fetchAddresses();
  }, []);

  const handleEdit = (addressId) => {
    navigate(`/edit-address/${addressId}`);
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <h2 className="text-2xl font-bold mb-6">My Address Book</h2>

      {Array.isArray(addresses) && addresses.length === 0 ? (
        <p className="text-gray-500">No addresses found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 ">
          {addresses.map((address) => (
            <div
              key={address.id}
              className="bg-white shadow-md rounded-xl p-4 border border-gray-200 relative mb-5"
            >
              <div className="data-addesss">
                <div className="row ">
                  <div className="col-md-12 mb-4">
                    <p>
                      <strong>Name:</strong> {address.full_name}
                    </p>
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
                onClick={() => handleEdit(address.id)}
                className="absolute top-3 right-3 text-blue-600 hover:text-blue-800"
              >
                <FaEdit size={18} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AddressBook;
