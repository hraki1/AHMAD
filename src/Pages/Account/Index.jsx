import React, { useContext, useState, useEffect } from "react";
import PageHeader from "../../Components/layout/Header/PageHeader";
import DashboardSidebar from "./DashboardSidebar";
import { AuthContext } from "../../Context/AuthContext";
import Spinner from "../../Components/UI/SpinnerLoading";
import { useTranslation } from "react-i18next";
export default function Index() {
  const { isAuthenticated, isLoading: isAuthLoading } = useContext(AuthContext);
  const { t } = useTranslation();
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchOrders() {
      setIsLoading(true);

      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found. Please log in.");
      }
      try {
        const response = await fetch(
          "https://api.sareh-nomow.website/api/orders/user",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const resData = await response.json();
        if (!response.ok) {
          setError(resData.message || "Error Occurred While fetching Orders");
        } else {
          setOrders(resData);
          console.log(resData);
          setError(null);
        }
      } catch (err) {
        setError(err.message || "Error Occurred While fetching Orders");
      } finally {
        setIsLoading(false);
      }
    }
    fetchOrders();
  }, []);

  if (isLoading || isAuthLoading) {
    return (
      <div style={{ height: "100vh" }}>
        <Spinner />
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ height: "100vh" }}>
        <p>{t(`Account.Error_Occurd`)}</p>
      </div>
    );
  }

  return (
    <div>
      <PageHeader title={t(`MyAccount`)} middleBreadcrumb={t(`Pages`)} />
      <DashboardSidebar orders={orders} />
    </div>
  );
}
