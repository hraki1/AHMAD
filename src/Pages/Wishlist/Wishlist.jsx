import React, { useState } from "react";
import QuickViewModal from "../ProductModal/QuickViewModal"; // Ensure correct path
import imgOne from "../../assets/images/products/product1-120x170.jpg";
import imgTwo from "../../assets/images/products/product1-120x170.jpg";
import imgThree from "../../assets/images/products/product1-120x170.jpg";
import imgFour from "../../assets/images/products/product1-120x170.jpg";

const Wishlist = () => {
  const [products] = useState([
    {
      id: 1,
      name: "Oxford Cuban Shirt",
      variant: "Black / XL",
      price: "$143.00",
      stock: "in stock",
      imgSrc: imgOne,
      disabled: false,
    },
    {
      id: 2,
      name: "Cuff Beanie Cap",
      variant: "Maroon / M",
      price: "$128.00",
      stock: "Out Of stock",
      imgSrc: imgTwo,
      disabled: true,
    },
    {
      id: 3,
      name: "Flannel Collar Shirt",
      variant: "Blue / M",
      price: "$116.00",
      stock: "in stock",
      imgSrc: imgThree,
      disabled: false,
    },
    {
      id: 4,
      name: "Cotton Hooded Hoodie",
      variant: "Orange / S",
      price: "$99.00",
      stock: "in stock",
      imgSrc: imgFour,
      disabled: false,
    },
  ]);

  const [showModal, setShowModal] = useState(false);

  return (
    <div className="container">
      <div
        className="alert alert-success py-2 alert-dismissible fade show cart-alert"
        role="alert"
      >
        There are <span className="text-primary fw-600">{products.length}</span>{" "}
        products in this wishlist
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="alert"
          aria-label="Close"
        ></button>
      </div>

      <form action="#" method="post">
        <div className="wishlist-table table-content table-responsive">
          <table className="table align-middle text-nowrap table-bordered">
            <thead className="thead-bg">
              <tr>
                <th className="product-name text-start" colSpan="2">
                  Product
                </th>
                <th className="product-price text-center">Price</th>
                <th className="stock-status text-center">Stock Status</th>
                <th className="product-subtotal text-center">Add to Cart</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <td className="product-thumbnail">
                    <a className="product-img" href={QuickViewModal}>
                      <img
                        className="image rounded-0"
                        src={product.imgSrc}
                        alt="Product"
                        title="Product"
                        width="120"
                        height="170"
                      />
                    </a>
                    <button
                      type="button"
                      className="btn btn-light"
                      onClick={() => setShowModal(true)} // 👈 Show modal here
                    >
                      <i className="fa-solid fa-magnifying-glass"></i>
                    </button>
                  </td>
                  <td className="product-details">
                    <p className="product-name mb-0">{product.name}</p>
                    <p className="variant-cart my-1 text-muted">
                      {product.variant}
                    </p>
                    <button
                      type="button"
                      className="btn remove-icon close-btn position-static me-3"
                    >
                      <i className="fa-solid fa-xmark"></i>
                    </button>
                  </td>
                  <td className="product-price text-center">
                    <span className="amount fw-500">{product.price}</span>
                  </td>
                  <td className="product-stock text-center">
                    <span
                      className={
                        product.stock === "in stock"
                          ? "text-in-stock"
                          : "text-out-stock"
                      }
                    >
                      {product.stock}
                    </span>
                  </td>
                  <td className="product-action text-center">
                    <button
                      type="button"
                      className={`btn btn-secondary text-nowrap ${
                        product.disabled ? "soldOutBtn disabled" : ""
                      }`}
                    >
                      {product.disabled ? "Out Of stock" : "Add To Cart"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </form>

      {/* Include QuickViewModal */}
      <QuickViewModal show={showModal} onHide={() => setShowModal(false)} />
    </div>
  );
};

export default Wishlist;
