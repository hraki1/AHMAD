import React, { useState } from "react";
import en from "./locales/en";
import ar from "./locales/ar";

const OrdersCard = ({ order, locale = "en" }) => {
  const t = locale === "ar" ? ar : en; // اختيار اللغة

  const [isExpanded, setIsExpanded] = useState(false);
  const toggleExpand = () => setIsExpanded(!isExpanded);

  // باقي الكود نفس الكود اللي أعطيتني إياه مع استبدال النصوص بـ t

  return (
    <div className="card mb-3 shadow-sm w-100">
      <div
        className={`card-header d-flex justify-content-between align-items-center ${
          isExpanded ? "bg-light" : ""
        }`}
        onClick={toggleExpand}
        style={{ cursor: "pointer" }}
      >
        <div className="d-flex align-items-center gap-3">
          <div>
            <h6 className="mb-0">
              {t.orderCard.orderNumber} {order.order_number}
            </h6>
            <small className="text-muted">
              {t.orderCard.id}: {order.id}
            </small>
          </div>
        </div>
        <span className={`badge bg-primary text-capitalize`}>
          {order.payment_status}
        </span>
      </div>

      {isExpanded && (
        <div className="card-body">
          <div className="mb-3">
            <h6>{t.orderCard.customer}</h6>
            <p className="mb-0">
              <strong>{order.customer_full_name}</strong> <br />
              <small className="text-muted">{order.customer_email}</small>
            </p>
          </div>

          <h6>{t.orderCard.products}</h6>
          <div className="list-group mb-3">
            {order.items.map((item) => (
              <div
                key={item.order_item_id}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                <div>
                  <p className="mb-1 fw-medium">{item.product_name}</p>
                  <small className="text-muted">
                    {t.orderCard.quantity} {item.qty} × {order.currency}
                    {item.product_price.toFixed(2)}
                  </small>
                </div>
                {/* زر التقييم وهكذا */}
              </div>
            ))}
          </div>

          <div className="border-top pt-3">
            <div className="d-flex justify-content-between">
              <span>{t.orderCard.shipping}</span>
              <span>
                {order.currency} {order.shipping_total || "0.00"}
              </span>
            </div>
            <div className="d-flex justify-content-between">
              <span>{t.orderCard.tax}</span>
              <span>
                {order.currency} {order.tax_total || "0.00"}
              </span>
            </div>
            <div className="d-flex justify-content-between fw-bold mt-2">
              <span>{t.orderCard.total}</span>
              <span>
                {order.currency} {order.grand_total}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrdersCard;
