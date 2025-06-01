import React, { useContext, useState, useEffect } from "react";
import PageHeader from "../../Components/layout/Header/PageHeader";
import DashboardSidebar from "./DashboardSidebar";
import { AuthContext } from "../../Context/AuthContext";
import Spinner from "../../Components/UI/SpinnerLoading";

export default function Index() {
  const { isAuthenticated, isLoading: isAuthLoading } = useContext(AuthContext);

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
        <p>Error Occurd while fetch orders</p>
      </div>
    );
  }

  return (
    <div>
      <PageHeader title="MY ACCOUNT" middleBreadcrumb="PAGES" />
      <DashboardSidebar orders={orders} />
    </div>
  );
}
