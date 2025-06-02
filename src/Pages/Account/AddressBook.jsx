import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../API/ApiConfig";
import Address from "./Address";
import Spinner from "../../Components/UI/SpinnerLoading";
import { useTranslation } from "react-i18next";
const AddressBook = () => {
  const [addresses, setAddresses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [editingAddressId, setEditingAddressId] = useState(null);
  const { t } = useTranslation();
  useEffect(() => {
    const fetchAddresses = async () => {
      setIsLoading(true);
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(`${baseUrl}/api/addresses`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();
        setAddresses(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching addresses:", error);
        setAddresses([]);
        setIsLoading(false);
      }
    };

    fetchAddresses();
  }, []);

  const handleStartEditing = (addressId) => {
    setEditingAddressId(addressId);
  };

  const handleStopEditing = () => {
    setEditingAddressId(null);
  };

  if (isLoading) {
    return (
      <div>
        <Spinner />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <h2 className="text-2xl font-bold mb-6">
        {t(`Account.My_Address_Book`)}
      </h2>

      {Array.isArray(addresses) && addresses.length === 0 ? (
        <p className="text-gray-500">{t(`Account.No_addresses`)}</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {addresses.map((address) => (
            <Address
              address={address}
              setAddresses={setAddresses}
              key={address.id}
              isEditing={editingAddressId === address.id}
              onStartEditing={handleStartEditing}
              onStopEditing={handleStopEditing}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default AddressBook;
