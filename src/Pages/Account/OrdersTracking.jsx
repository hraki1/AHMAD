import React, { useState, useEffect } from "react";
import Spinner from "../../Components/UI/SpinnerLoading";
import { useTranslation } from "react-i18next";

const OrdersTracking = ({ orders }) => {
  const { t } = useTranslation();

  const [orderId, setOrderId] = useState("");
  const [billingEmail, setBillingEmail] = useState("");
  const [currentOrder, setCurrentOrder] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (orders && orders.length > 0) {
      const lastOrder = orders.reduce((latest, order) => {
        const latestDate = new Date(latest.created_at);
        const currentDate = new Date(order.created_at);
        return currentDate > latestDate ? order : latest;
      }, orders[0]);

      setCurrentOrder(lastOrder);
      setOrderId(lastOrder.order_number);
      setBillingEmail(lastOrder.customer_email);
    }
  }, [orders]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!orderId && !billingEmail) {
      setError(t("OrdersTracking.errorEnterFields"));
      return;
    }

    const foundOrder = orders.find(
      (order) =>
        (orderId && order.order_number === orderId) ||
        (billingEmail &&
          order.customer_email.toLowerCase() === billingEmail.toLowerCase())
    );

    if (foundOrder) {
      setCurrentOrder(foundOrder);
    } else {
      setError(t("OrdersTracking.errorNotFound"));
    }
  };

  if (!currentOrder) {
    return (
      <div>
        <Spinner />
      </div>
    );
  }

  const trackingSteps = [
    t("OrdersTracking.trackingSteps.orderPlaced"),
    t("OrdersTracking.trackingSteps.preparingToShip"),
    t("OrdersTracking.trackingSteps.shipped"),
    t("OrdersTracking.trackingSteps.delivered"),
  ];

  const statusToStepIndex = {
    processing: 1,
    shipped: 2,
    delivered: 3,
  };
  const currentStepIndex = statusToStepIndex[currentOrder.status] ?? 0;

  const trackingTable = currentOrder.activities
    .slice()
    .reverse()
    .map((activity) => ({
      date: new Date(activity.created_at).toLocaleDateString(),
      time: new Date(activity.created_at).toLocaleTimeString(),
      status: activity.comment,
      badge: "bg-secondary",
      location: "-",
    }));

  return (
    <div className="orders-card mt-0 h-100">
      <div className="top-sec d-flex-justify-center justify-content-between mb-4">
        <div className="title-account mb-0">{t("OrdersTracking.title")}</div>
      </div>

      <form className="orderstracking-from" onSubmit={handleSubmit}>
        <p className="mb-3">{t("OrdersTracking.instructions")}</p>
        {error && <div className="alert alert-danger">{error}</div>}
        <div className="row align-items-center">
          <div className="form-group col-md-5 col-lg-5">
            <input
              name="orderId"
              placeholder={t("OrdersTracking.orderId") || "Order ID"}
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              id="orderId"
              type="text"
            />
          </div>
          <div className="form-group col-md-5 col-lg-5">
            <input
              name="billingEmail"
              placeholder={t("OrdersTracking.billingEmail") || "Billing email"}
              value={billingEmail}
              onChange={(e) => setBillingEmail(e.target.value)}
              id="billingEmail"
              type="email"
            />
          </div>
          <div className="form-group col-md-2 col-lg-2">
            <button type="submit" className="btn rounded w-100">
              <span>{t("OrdersTracking.trackButton")}</span>
            </button>
          </div>
        </div>
      </form>

      <div className="row mt-2">
        <div className="col-sm-12">
          <div className="title-account">
            {t("OrdersTracking.statusForOrder", {
              orderNumber: currentOrder.order_number,
            })}
          </div>

          <div className="row mt-3">
            <div className="col-lg-6 col-md-9 col-sm-8">
              <div className="tracking-detail d-flex-center">
                <ul>
                  <li>
                    <div className="left">
                      <span>{t("OrdersTracking.orderName")}</span>
                    </div>
                    <div className="right">
                      <span>
                        {currentOrder.items?.[0]?.product_name || "-"}
                      </span>
                    </div>
                  </li>
                  <li>
                    <div className="left">
                      <span>{t("OrdersTracking.customerNumber")}</span>
                    </div>
                    <div className="right">
                      <span>{currentOrder.order_number}</span>
                    </div>
                  </li>
                  <li>
                    <div className="left">
                      <span>{t("OrdersTracking.orderDate")}</span>
                    </div>
                    <div className="right">
                      <span>
                        {new Date(currentOrder.created_at).toLocaleDateString()}
                      </span>
                    </div>
                  </li>
                  <li>
                    <div className="left">
                      <span>{t("OrdersTracking.shipDate")}</span>
                    </div>
                    <div className="right">
                      <span>
                        {currentOrder.shipments?.[0]?.shipped_at
                          ? new Date(
                              currentOrder.shipments[0].shipped_at
                            ).toLocaleDateString()
                          : "-"}
                      </span>
                    </div>
                  </li>
                  <li>
                    <div className="left">
                      <span>{t("OrdersTracking.shippingAddress")}</span>
                    </div>
                    <div className="right">
                      <span>{currentOrder.shipping_method_name || "-"}</span>
                    </div>
                  </li>
                  <li>
                    <div className="left">
                      <span>{t("OrdersTracking.carrier")}</span>
                    </div>
                    <div className="right">
                      <span>{currentOrder.shipping_method_name || "-"}</span>
                    </div>
                  </li>
                  <li>
                    <div className="left">
                      <span>{t("OrdersTracking.carrierTrackingNumber")}</span>
                    </div>
                    <div className="right">
                      <span>
                        {currentOrder.transactions?.[0]?.transaction_id || "-"}
                      </span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-4 col-md-12 col-sm-12 mt-4 mt-lg-0">
              <div className="tracking-map map-section ratio ratio-16x9 h-100">
                <iframe
                  src="https://www.google.com/maps/embed?pb="
                  allowFullScreen
                  height="650"
                  title="Map"
                ></iframe>
              </div>
            </div>
          </div>

          <div className="tracking-steps nav mt-5 mb-4 clearfix">
            {trackingSteps.map((step, idx) => (
              <div
                key={step}
                className={`step ${
                  idx < currentStepIndex
                    ? "done"
                    : idx === currentStepIndex
                    ? "current"
                    : ""
                }`}
              >
                <span>{step}</span>
              </div>
            ))}
          </div>

          <div className="table-bottom-brd table-responsive">
            <table className="table align-middle text-center order-table">
              <thead>
                <tr>
                  <th>{t("OrdersTracking.table.date")}</th>
                  <th>{t("OrdersTracking.table.time")}</th>
                  <th>{t("OrdersTracking.table.description")}</th>
                  <th>{t("OrdersTracking.table.location")}</th>
                </tr>
              </thead>
              <tbody>
                {trackingTable.map((item, idx) => (
                  <tr key={idx}>
                    <td>{item.date}</td>
                    <td>{item.time}</td>
                    <td>
                      <span
                        className={`badge rounded-pill ${item.badge} custom-badge`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td>{item.location}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrdersTracking;
