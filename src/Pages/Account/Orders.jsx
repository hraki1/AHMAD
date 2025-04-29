// Orders.jsx
import React from "react";
import img from "../../assets/images/products/product1-120x170.jpg";
const Orders = () => {
  const orders = [
    {
      id: "#12301",
      name: "Oxford Cuban Shirt",
      price: "$99.00",
      status: "Shipped",
      badge: "bg-success",
      img: img,
      viewLink: "product-layout1.html",
    },
    {
      id: "#12302",
      name: "Cuff Beanie Cap",
      price: "$128.00",
      status: "Pending",
      badge: "bg-danger",
      img: img,
      viewLink: "product-layout2.html",
    },
    {
      id: "#12303",
      name: "Flannel Collar Shirt",
      price: "$114.00",
      status: "Processing",
      badge: "bg-dark",
      img: img,
      viewLink: "product-layout3.html",
    },
    {
      id: "#12304",
      name: "Cotton Hooded Hoodie",
      price: "$198.00",
      status: "Canceled",
      badge: "bg-secondary",
      img: img,
      viewLink: "product-layout4.html",
    },
  ];

  return (
    <div className="orders-card mt-0 h-100">
      <div className="top-sec d-flex-justify-center justify-content-between mb-4">
        <div className="title-account mb-0">My Orders</div>
      </div>

      <div className="table-bottom-brd table-responsive">
        <table className="table align-middle text-center order-table">
          <thead>
            <tr className="table-head text-nowrap">
              <th>Image</th>
              <th>Order Id</th>
              <th>Product Details</th>
              <th>Price</th>
              <th>Status</th>
              <th>View</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>
                  <img
                    className="blur-up lazyload"
                    src={order.img}
                    alt="product"
                    width="50"
                  />
                </td>
                <td>
                  <span className="id">{order.id}</span>
                </td>
                <td>
                  <span className="name">{order.name}</span>
                </td>
                <td>
                  <span className="price fw-500">{order.price}</span>
                </td>
                <td>
                  <span
                    className={`badge rounded-pill ${order.badge} custom-badge`}
                  >
                    {order.status}
                  </span>
                </td>
                <td>
                  <a href={order.viewLink} className="view">
                    <i
                      className="fa-solid fa-eye-slash btn-link"
                      style={{ color: "#e10e0e" }}
                    ></i>
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;
