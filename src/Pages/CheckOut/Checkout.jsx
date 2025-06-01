import { useContext, useEffect, useState } from "react";
import useCountriesData from "../Hooks/useCountriesData";
import { baseUrl } from "../API/ApiConfig";
import { CartContext, useCart } from "../../Context/CartContext";
import { AuthContext } from "../../Context/AuthContext";
import Spinner from "../../Components/UI/SpinnerLoading";
import toast, { Toaster } from "react-hot-toast";
import AddressFieldCheckout from "./AddressFiledCheckout";
import Modal from "../../Components/UI/Modal";
import { useNavigate } from "react-router-dom";

function isVaildOrder(orderData) {
  const errors = [];
  if (!orderData.cartId || orderData.cartId === "") {
    errors.push("there is No Cart");
  }
  if (!orderData.addressId || orderData.addressId === "") {
    errors.push("You Have to Add Your Address");
  }
  if (!orderData.DelevaryMethodId || orderData.DelevaryMethodId === "") {
    errors.push("You Have to Choose Delevary Method");
  }

  if (errors.length > 0) {
    return { isVaild: false, errors };
  } else {
    return { isVaild: true };
  }
}

export default function Checkout({ country, setCountry }) {
  const { user, isLoading: authIsLoading, token } = useContext(AuthContext);

  const navigate = useNavigate();

  const userInformation = { ...user };

  console.log(userInformation?.full_name);

  const { countries, loading, error } = useCountriesData();

  const { cartId } = useContext(CartContext);
  const { userId } = useContext(AuthContext);
  //   const [selectedCartId, setSelectedCartId] = useState();
  const [selectedAddressId, setSelectedSavedAddressId] = useState(null);
  const [selectedDelevaryId, setSelectedDelevaryId] = useState(null);
  const [isPaymentLoading, setIsPaymentLoading] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState();
  const [errors, setErrors] = useState([]);

  const orderData = {
    cartId: cartId ?? "",
    DelevaryMethodId: selectedDelevaryId ?? "",
    addressId: selectedAddressId ?? "",
    userId: userId ?? "",
  };

  console.log(orderData);

  async function startPaymentHandler() {
    console.log(orderData);
    const isVaild = isVaildOrder(orderData);
    if (isVaild.isVaild) {
      console.log("start payment");
      try {
        const responseSaveAddress = await fetch(
          `https://api.sareh-nomow.website/api/carts/${orderData.cartId}/shipping-address/${orderData.addressId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const responseSaveDelevarymethod = await fetch(
          `https://api.sareh-nomow.website/api/carts/${orderData.cartId}/shipping-method/${orderData.DelevaryMethodId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!responseSaveAddress.ok || !responseSaveDelevarymethod.ok) {
          console.log(responseSaveAddress);
          console.log(responseSaveDelevarymethod);
        }
      } catch (err) {
        setIsModalOpen((prev) => {
          setErrors(
            prev.push(
              err.message || "Can't Complete wwith your order please try again."
            )
          );
          return true;
        });
      }

      navigate("/payment");

      return;
    }

    setErrors(isVaild.errors);
    setIsModalOpen(true);
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
      <Modal open={isModalOpen}>
        <div className="p-4 text-center">
          <h2 className="h3 fs-3  fw-bold text-white mb-3">
            There is Empty Fileds!
          </h2>
          {errors && errors.length > 0 ? (
            <ul className="list-unstyled text-start text-danger">
              {errors.map((error, index) => (
                <li key={index} className="mb-1 fs-5">
                  • {error}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-white">No errors found.</p>
          )}
          <div className="d-flex justify-content-center gap-3 mt-4">
            <button
              onClick={() => setIsModalOpen(false)}
              className="btn btn-primary px-4"
            >
              Close
            </button>
          </div>
        </div>
      </Modal>
      <div className="row">
        <AddressFieldCheckout
          setCountry={setCountry}
          country={country}
          onSelectAddress={setSelectedSavedAddressId}
          onSelectDelevaryMethod={setSelectedDelevaryId}
          startPaymentHandler={startPaymentHandler}
          isPaymentLoading={isPaymentLoading}
        />
      </div>
    </div>
  );
}
