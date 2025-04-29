import React, { useState } from "react";
import imgtrack from "../../assets/images/products/product9.jpg";

const OrdersTracking = () => {
  const [orderId, setOrderId] = useState("");
  const [billingEmail, setBillingEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle tracking logic here
    console.log("Tracking order:", orderId, billingEmail);
  };

  const trackingSteps = [
    "order placed",
    "preparing to ship",
    "shipped",
    "delivered",
  ];
  const currentStepIndex = 2; // Example: 0-based index of current step (shipped)

  const trackingTable = [
    {
      date: "14 May 2023",
      time: "08.00 AM",
      status: "Shipped",
      badge: "bg-success",
      location: "Canada",
    },
    {
      date: "15 May 2023",
      time: "12.00 AM",
      status: "Shipping info received",
      badge: "bg-dark",
      location: "California",
    },
    {
      date: "16 May 2023",
      time: "10.00 AM",
      status: "Origin scan",
      badge: "bg-secondary",
      location: "London",
    },
  ];

  return (
    <div className="orders-card mt-0 h-100">
      <div className="top-sec d-flex-justify-center justify-content-between mb-4">
        <div className="title-account mb-0">Orders tracking</div>
      </div>

      <form className="orderstracking-from" onSubmit={handleSubmit}>
        <p className="mb-3">
          To track your order please enter your OrderID in the box below and
          press "Track" button.
        </p>
        <div className="row align-items-center">
          <div className="form-group col-md-5 col-lg-5">
            <input
              name="orderId"
              placeholder="Order ID"
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              id="orderId"
              type="text"
              required
            />
          </div>
          <div className="form-group col-md-5 col-lg-5">
            <input
              name="billingEmail"
              placeholder="Billing email"
              value={billingEmail}
              onChange={(e) => setBillingEmail(e.target.value)}
              id="billingEmail"
              type="text"
              required
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
          <div className="title-account">Status for order no: 000123</div>

          <div className="row mt-3">
            <div className="col-lg-2 col-md-3 col-sm-4">
              <img
                className="rounded-0 blur-up lazyload"
                src={imgtrack}
                alt="product"
                width="100%"
              />
            </div>
            <div className="col-lg-6 col-md-9 col-sm-8">
              <div className="tracking-detail d-flex-center">
                <ul>
                  <li>
                    <div className="left">
                      <span>Order name</span>
                    </div>
                    <div className="right">
                      <span>Cuff Beanie Cap</span>
                    </div>
                  </li>
                  <li>
                    <div className="left">
                      <span>Customer number</span>
                    </div>
                    <div className="right">
                      <span>000123</span>
                    </div>
                  </li>
                  <li>
                    <div className="left">
                      <span>Order date</span>
                    </div>
                    <div className="right">
                      <span>14 Nov 2021</span>
                    </div>
                  </li>
                  <li>
                    <div className="left">
                      <span>Ship Date</span>
                    </div>
                    <div className="right">
                      <span>16 Nov 2021</span>
                    </div>
                  </li>
                  <li>
                    <div className="left">
                      <span>Shipping address</span>
                    </div>
                    <div className="right">
                      <span>55 Gallaxy Enque, 2568 street, 23568 NY</span>
                    </div>
                  </li>
                  <li>
                    <div className="left">
                      <span>Carrier</span>
                    </div>
                    <div className="right">
                      <span>Ipsum</span>
                    </div>
                  </li>
                  <li>
                    <div className="left">
                      <span>Carrier tracking number</span>
                    </div>
                    <div className="right">
                      <span>000123</span>
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
