import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  ExternalLink,
  Box,
  CreditCard,
  Calendar,
  ShoppingCart,
  Download,
  FileText,
  Truck,
  DollarSign,
} from "lucide-react";

const Order = ({ order }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const statusColors = {
    paid: {
      text: "text-success",
      bg: "bg-success-light",
      border: "border-success",
    },
    pending: {
      text: "text-warning",
      bg: "bg-warning-light",
      border: "border-warning",
    },
    refunded: { text: "text-info", bg: "bg-info-light", border: "border-info" },
    cancelled: {
      text: "text-danger",
      bg: "bg-danger-light",
      border: "border-danger",
    },
  };

  const status = order.payment_status.toLowerCase();
  const {
    text: statusTextColor,
    bg: statusBgColor,
    border: statusBorderColor,
  } = statusColors[status] || statusColors.pending;

  return (
    <>
      <tr
        onClick={toggleExpand}
        className={`cursor-pointer transition-colors duration-200 border-bottom ${
          isExpanded ? "bg-gray-50" : "hover:bg-gray-50"
        }`}
      >
        <td className="py-3 px-4 align-middle">
          <div className="d-flex align-items-center gap-3">
            <motion.div
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronDown className="text-muted" size={18} />
            </motion.div>
            <div>
              <p className="fw-semibold mb-0 text-dark">{order.order_number}</p>
              <small className="text-muted">#{order.id}</small>
            </div>
          </div>
        </td>
        <td className="py-3 px-4 align-middle">
          <p className="mb-0 text-dark">{order.customer_full_name}</p>
          <small className="text-muted">{order.customer_email}</small>
        </td>
        <td className="py-3 px-4 align-middle">
          <span
            className={`badge ${statusBgColor} ${statusTextColor} ${statusBorderColor} border rounded-pill d-inline-flex align-items-center`}
            style={{ padding: "0.35em 0.65em" }}
          >
            {order.payment_status}
          </span>
        </td>
        <td className="py-3 px-4 align-middle text-end">
          <p className="fw-semibold mb-0 text-dark">
            {order.currency} {order.sub_total}
          </p>
        </td>
      </tr>

      <AnimatePresence>
        {isExpanded && (
          <tr>
            <td colSpan="4" className="p-0 border-0">
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div className="bg-light border border-top-0 rounded-bottom p-4">
                  <div className="row g-4">
                    {/* Order Summary Section */}
                    <div className="col-md-6">
                      <div className="d-flex gap-3">
                        <div className="flex-shrink-0">
                          <div
                            className="p-3 bg-primary bg-opacity-10 rounded-circle text-primary d-flex align-items-center justify-content-center"
                            style={{ width: "44px", height: "44px" }}
                          >
                            <ShoppingCart size={20} />
                          </div>
                        </div>
                        <div className="flex-grow-1">
                          <h5 className="fw-semibold mb-3 d-flex align-items-center">
                            Order Summary
                          </h5>
                          <ul className="list-unstyled border-top pt-3">
                            {order.items.map((item) => (
                              <li
                                key={item.order_item_id}
                                className="py-2 d-flex justify-content-between align-items-center"
                              >
                                <div>
                                  <p className="mb-0 fw-medium text-dark">
                                    {item.product_name}
                                  </p>
                                  <small className="text-muted">
                                    Qty: {item.qty} × {order.currency}
                                    {item.product_price}
                                  </small>
                                </div>
                                <span className="fw-medium">
                                  {order.currency}
                                  {(item.qty * item.product_price).toFixed(2)}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>

                    {/* Order Information Section */}
                    <div className="col-md-6">
                      <div className="d-flex gap-3">
                        <div className="flex-shrink-0">
                          <div
                            className="p-3 bg-purple bg-opacity-10 rounded-circle text-purple d-flex align-items-center justify-content-center"
                            style={{ width: "44px", height: "44px" }}
                          >
                            <Calendar size={20} />
                          </div>
                        </div>
                        <div className="flex-grow-1">
                          <h5 className="fw-semibold mb-3">
                            Order Information
                          </h5>
                          <div className="d-flex flex-column gap-2">
                            <div className="d-flex justify-content-between">
                              <span className="text-muted">Order Date:</span>
                              <span className="fw-medium">
                                {new Date(order.created_at).toLocaleDateString(
                                  "en-US",
                                  {
                                    year: "numeric",
                                    month: "short",
                                    day: "numeric",
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  }
                                )}
                              </span>
                            </div>
                            <div className="d-flex justify-content-between">
                              <span className="text-muted">Shipping:</span>
                              <span className="fw-medium">
                                {order.currency}{" "}
                                {order.shipping_total || "0.00"}
                              </span>
                            </div>
                            <div className="d-flex justify-content-between">
                              <span className="text-muted">Tax:</span>
                              <span className="fw-medium">
                                {order.currency} {order.tax_total || "0.00"}
                              </span>
                            </div>
                            <div className="d-flex justify-content-between pt-2 border-top">
                              <span className="fw-semibold text-dark">
                                Total:
                              </span>
                              <span className="fw-bold text-dark">
                                {order.currency} {order.grand_total}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Payment Section */}
                    <div className="col-md-6">
                      <div className="d-flex gap-3">
                        <div className="flex-shrink-0">
                          <div
                            className="p-3 bg-info bg-opacity-10 rounded-circle text-info d-flex align-items-center justify-content-center"
                            style={{ width: "44px", height: "44px" }}
                          >
                            <CreditCard size={20} />
                          </div>
                        </div>
                        <div className="flex-grow-1">
                          <h5 className="fw-semibold mb-3">Payment Details</h5>
                          <div className="d-flex flex-column gap-2">
                            <div className="d-flex justify-content-between">
                              <span className="text-muted">Method:</span>
                              <span className="fw-medium">
                                {order.payment_method}
                              </span>
                            </div>
                            <div className="d-flex justify-content-between align-items-center">
                              <span className="text-muted">Status:</span>
                              <span
                                className={`badge ${statusBgColor} ${statusTextColor} ${statusBorderColor} border rounded-pill d-inline-flex align-items-center`}
                              >
                                {order.payment_status}
                              </span>
                            </div>
                            {order.tracking_number && (
                              <div className="d-flex justify-content-between align-items-center">
                                <span className="text-muted">Tracking:</span>
                                <span className="fw-medium">
                                  {order.tracking_number}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Actions Section */}
                    <div className="col-md-6">
                      <div className="d-flex gap-3">
                        <div className="flex-shrink-0">
                          <div
                            className="p-3 bg-warning bg-opacity-10 rounded-circle text-warning d-flex align-items-center justify-content-center"
                            style={{ width: "44px", height: "44px" }}
                          >
                            <FileText size={20} />
                          </div>
                        </div>
                        <div className="flex-grow-1">
                          <h5 className="fw-semibold mb-3">Order Actions</h5>
                          <div className="d-flex flex-wrap gap-2">
                            {order.viewLink && (
                              <a
                                href={order.viewLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-outline-secondary btn-sm d-flex align-items-center gap-1"
                              >
                                View Details
                                <ExternalLink size={16} />
                              </a>
                            )}
                            <button className="btn btn-primary btn-sm d-flex align-items-center gap-1">
                              <Download size={16} />
                              Invoice
                            </button>
                            <button className="btn btn-outline-primary btn-sm d-flex align-items-center gap-1">
                              <Truck size={16} />
                              Track
                            </button>
                            {order.payment_status.toLowerCase() ===
                              "pending" && (
                              <button className="btn btn-success btn-sm d-flex align-items-center gap-1">
                                <DollarSign size={16} />
                                Pay Now
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </td>
          </tr>
        )}
      </AnimatePresence>
    </>
  );
};

export default Order;
