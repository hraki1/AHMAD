import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../API/ApiConfig";
import Address from "./Address";
import Spinner from "../../Components/UI/SpinnerLoading";

const AddressBook = () => {
  const [addresses, setAddresses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

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

  const handleEdit = (addressId) => {
    navigate(`/edit-address/${addressId}`);
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
      <h2 className="text-2xl font-bold mb-6">My Address Book</h2>

      {Array.isArray(addresses) && addresses.length === 0 ? (
        <p className="text-gray-500">No addresses found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 ">
          {addresses.map((address) => (
            <Address
              address={address}
              onEdit={handleEdit}
              setAddresses={setAddresses}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default AddressBook;
