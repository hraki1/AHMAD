import { useContext, useEffect, useState } from "react";
import useCountriesData from "../Hooks/useCountriesData";
import { baseUrl } from "../API/ApiConfig";
import { CartContext } from "../../Context/CartContext";
import { AuthContext } from "../../Context/AuthContext";
import Spinner from "../../Components/UI/SpinnerLoading";
import toast, { Toaster } from "react-hot-toast";
import AddressFieldCheckout from "./AddressFiledCheckout";
import Modal from "../../Components/UI/Modal";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Checkout({ country, setCountry }) {
  const { t } = useTranslation();

  const {
    user,
    isLoading: authIsLoading,
    token,
    userId,
  } = useContext(AuthContext);
  const { cartId } = useContext(CartContext);

  const navigate = useNavigate();
  const { countries, loading, error } = useCountriesData();

  const [selectedAddressId, setSelectedSavedAddressId] = useState(null);
  const [selectedDelevaryId, setSelectedDelevaryId] = useState(null);
  const [isPaymentLoading, setIsPaymentLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errors, setErrors] = useState([]);

  const orderData = {
    cartId: cartId ?? "",
    DelevaryMethodId: selectedDelevaryId ?? "",
    addressId: selectedAddressId ?? "",
    userId: userId ?? "",
  };

  function isVaildOrder(orderData) {
    const errors = [];
    if (!orderData.cartId) {
      errors.push(t(`checkOut.No_Cart`));
    }
    if (!orderData.addressId) {
      errors.push(t(`checkOut.Add_Address`));
    }
    if (!orderData.DelevaryMethodId) {
      errors.push(t(`checkOut.Delevary_Method`));
    }

    return errors.length > 0
      ? { isVaild: false, errors }
      : { isVaild: true, errors: [] };
  }

  async function startPaymentHandler() {
    const validation = isVaildOrder(orderData);

    if (!validation.isVaild) {
      setErrors(validation.errors);
      setIsModalOpen(true);
      return;
    }

    setIsPaymentLoading(true);

    try {
      const responseSaveAddress = await fetch(
        `${baseUrl}/api/carts/${orderData.cartId}/shipping-address/${orderData.addressId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const responseSaveDelevarymethod = await fetch(
        `${baseUrl}/api/carts/${orderData.cartId}/shipping-method/${orderData.DelevaryMethodId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!responseSaveAddress.ok || !responseSaveDelevarymethod.ok) {
        throw new Error(t("checkOut.Error_saving_order_data"));
      }

      navigate("/payment");
    } catch (err) {
      setErrors([err.message || t("checkOut.Unknown_error")]);
      setIsModalOpen(true);
    } finally {
      setIsPaymentLoading(false);
    }
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
          <h2 className="h3 fs-3 fw-bold text-white mb-3">
            {t(`checkOut.Empty_Fileds`)}
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
            <p className="text-white">{t(`checkOut.No_errors`)}</p>
          )}
          <div className="d-flex justify-content-center gap-3 mt-4">
            <button
              onClick={() => setIsModalOpen(false)}
              className="btn btn-primary px-4"
            >
              {t("Close")}
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
