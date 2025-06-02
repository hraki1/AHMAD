// src/pages/PaymentSuccess.tsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../Context/CartContext";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import Spinner from "../../Components/UI/SpinnerLoading";

export default function PaymentSuccess() {
  const { cartId, updateCart } = useCart();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const { t } = useTranslation();
  useEffect(() => {
    async function confirmOrder() {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("You must be logged in to place an order.");
        navigate("/login");
        return;
      }

      try {
        const response = await fetch("https://api.sareh-nomow.xyz/api/orders", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            cartId,
            paymentMethod: "stripe",
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to place order");
        }

        toast.success(t(`Order_successfully`));
        updateCart();
        navigate("/");
      } catch (error) {
        toast.error("Failed to confirm order: " + error.message);
        navigate("/");
      } finally {
        setIsLoading(false);
      }
    }

    confirmOrder();
  }, [cartId, navigate, updateCart]);

  if (isLoading) {
    return <Spinner />;
  }

  return null;
}
