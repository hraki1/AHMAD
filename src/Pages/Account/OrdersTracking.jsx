import React, { useState, useEffect } from "react";

const OrdersTracking = ({ orders }) => {
  const [orderId, setOrderId] = useState("");
  const [billingEmail, setBillingEmail] = useState("");
  const [currentOrder, setCurrentOrder] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (orders && orders.length > 0) {
      // Find the most recent order by created_at
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

    // Validate at least one field is filled
    if (!orderId && !billingEmail) {
      setError("Please enter either Order ID or Billing Email");
      return;
    }

    // Find matching order
    const foundOrder = orders.find(
      (order) =>
        (orderId && order.order_number === orderId) ||
        (billingEmail &&
          order.customer_email.toLowerCase() === billingEmail.toLowerCase())
    );

    if (foundOrder) {
      setCurrentOrder(foundOrder);
    } else {
      setError("No order found with the provided details");
    }
  };

  if (!currentOrder) {
    return <div>Loading order information...</div>;
  }

  // Tracking steps logic
  const trackingSteps = [
    "order placed",
    "preparing to ship",
    "shipped",
    "delivered",
  ];

  const statusToStepIndex = {
    processing: 1,
    shipped: 2,
    delivered: 3,
  };
  const currentStepIndex = statusToStepIndex[currentOrder.status] ?? 0;

  // Tracking table from activities
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
        <div className="title-account mb-0">Orders tracking</div>
      </div>

      <form className="orderstracking-from" onSubmit={handleSubmit}>
        <p className="mb-3">
          To track your order please enter your OrderID or Billing Email in the
          boxes below and press "Track" button. At least one field is required.
        </p>
        {error && <div className="alert alert-danger">{error}</div>}
        <div className="row align-items-center">
          <div className="form-group col-md-5 col-lg-5">
            <input
              name="orderId"
              placeholder="Order ID"
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              id="orderId"
              type="text"
            />
          </div>
          <div className="form-group col-md-5 col-lg-5">
            <input
              name="billingEmail"
              placeholder="Billing email"
              value={billingEmail}
              onChange={(e) => setBillingEmail(e.target.value)}
              id="billingEmail"
              type="email"
            />
          </div>
          <div className="form-group col-md-2 col-lg-2">
            <button type="submit" className="btn rounded w-100">
              <span>Track</span>
            </button>
          </div>
        </div>
      </form>

      <div className="row mt-2">
        <div className="col-sm-12">
          <div className="title-account">
            Status for order no: {currentOrder.order_number}
          </div>

          <div className="row mt-3">
            <div className="col-lg-6 col-md-9 col-sm-8">
              <div className="tracking-detail d-flex-center">
                <ul>
                  <li>
                    <div className="left">
                      <span>Order name</span>
                    </div>
                    <div className="right">
                      <span>
                        {currentOrder.items?.[0]?.product_name || "-"}
                      </span>
                    </div>
                  </li>
                  <li>
                    <div className="left">
                      <span>Customer number</span>
                    </div>
                    <div className="right">
                      <span>{currentOrder.order_number}</span>
                    </div>
                  </li>
                  <li>
                    <div className="left">
                      <span>Order date</span>
                    </div>
                    <div className="right">
                      <span>
                        {new Date(currentOrder.created_at).toLocaleDateString()}
                      </span>
                    </div>
                  </li>
                  <li>
                    <div className="left">
                      <span>Ship Date</span>
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
                      <span>Shipping address</span>
                    </div>
                    <div className="right">
                      <span>{currentOrder.shipping_method_name || "-"}</span>
                    </div>
                  </li>
                  <li>
                    <div className="left">
                      <span>Carrier</span>
                    </div>
                    <div className="right">
                      <span>{currentOrder.shipping_method_name || "-"}</span>
                    </div>
                  </li>
                  <li>
                    <div className="left">
                      <span>Carrier tracking number</span>
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
                  <th>Date</th>
                  <th>Time</th>
                  <th>Description</th>
                  <th>Location</th>
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
