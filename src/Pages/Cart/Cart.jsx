import React, { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function Cart({ cartItems, setCartItems }) {
  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  // Initialize cart items with sample data
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    setCartItems(storedItems);
    setIsLoading(false); // انتهى التحميل
  }, [setCartItems]);
  if (isLoading) {
    return <p>Loading cart...</p>; // أو يمكن تركها فارغة أو وضع Spinner
  }

  // Calculate total price
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);
  };

  const totalPrice = calculateTotal();

  // Increase quantity of an item
  const increaseQuantity = (id) => {
    const updatedItems = cartItems.map((item) =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCartItems(updatedItems);
    localStorage.setItem("cartItems", JSON.stringify(updatedItems)); // حفظ التحديث
  };

  // Decrease quantity of an item
  const decreaseQuantity = (id) => {
    const updatedItems = cartItems.map((item) =>
      item.id === id && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
    setCartItems(updatedItems);
    localStorage.setItem("cartItems", JSON.stringify(updatedItems)); // حفظ التحديث
  };
  const removeItem = (id) => {
    const updatedItems = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedItems);
    localStorage.setItem("cartItems", JSON.stringify(updatedItems)); // حفظ التحديث
  };

  return (
    <>
      <form action="#" method="post" className="cart-table table-bottom-brd">
        <table className="table align-middle">
          <thead className="cart-row cart-header small-hide position-relative">
            <tr>
              <th className="action">&nbsp;</th>
              <th colSpan="2" className="text-start">
                Product
              </th>
              <th className="text-center">Price</th>
              <th className="text-center">Quantity</th>
              <th className="text-center">Total</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item) => (
              <tr
                className="cart-row cart-flex position-relative"
                key={item.id}
              >
                <td className="cart-delete text-center small-hide">
                  <a
                    href="#"
                    className="cart-remove remove-icon position-static"
                    onClick={(e) => {
                      e.preventDefault();
                      removeItem(item.id);
                    }}
                  >
                    <i className="fa-solid fa-xmark"></i>
                  </a>
                </td>
                <td className="cart-image cart-flex-item">
                  <a href="product-layout1.html">
                    <img
                      className="cart-image rounded-0 blur-up lazyload"
                      src={item.image}
                      alt={item.name}
                      width="120"
                      height="170"
                    />
                  </a>
                </td>
                <td className="cart-meta small-text-left cart-flex-item">
                  <div className="list-view-item-title">
                    <a href="product-layout1.html">{item.name}</a>
                  </div>
                  <div className="cart-meta-text">
                    Color: Black
                    <br />
                    Size: Small
                    <br />
                    Qty: {item.quantity}
                  </div>
                  <div className="cart-price d-md-none">
                    <span className="money fw-500">${item.price}</span>
                  </div>
                </td>
                <td className="cart-price cart-flex-item text-center small-hide">
                  <span className="money">${item.price}</span>
                </td>
                <td className="cart-update-wrapper cart-flex-item text-end text-md-center">
                  <div className="cart-qty d-flex justify-content-end justify-content-md-center">
                    <div className="qtyField">
                      <a
                        className="qtyBtn minus"
                        href="#"
                        onClick={(e) => {
                          e.preventDefault(); // Prevent default anchor behavior
                          decreaseQuantity(item.id);
                        }}
                      >
                        <i className="fa-solid fa-minus"></i>
                      </a>
                      <a
                        className="qtyBtn plus"
                        href="#"
                        onClick={(e) => {
                          e.preventDefault(); // Prevent default anchor behavior
                          increaseQuantity(item.id);
                        }}
                      >
                        <i className="fa-solid fa-plus"></i>
                      </a>

                      <input
                        className="cart-qty-input qty"
                        type="text"
                        name="updates[]"
                        value={item.quantity}
                        pattern="[0-9]*"
                        readOnly
                      />
                    </div>
                  </div>
                  <a
                    href="#"
                    title="Remove"
                    className="removeMb d-md-none d-inline-block text-decoration-underline mt-2 me-3"
                  >
                    Remove
                  </a>
                </td>
                <td className="cart-price cart-flex-item text-center small-hide">
                  <span className="money fw-500">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="3" className="text-start">
                <Link
                  to="/ShopGrid"
                  className="btn btn-outline-secondary btn-sm cart-continue"
                >
                  {" "}
                  <i className="icon anm anm-angle-left-r me-2 d-none"></i>{" "}
                  Continue shopping
                </Link>
              </td>
              <td colSpan="3" className="text-end">
                <button
                  type="submit"
                  name="clear"
                  className="btn btn-secondary btn-sm small-hide d-none"
                >
                  <i className="icon anm anm-times-r me-2 d-none"></i> Clear
                  Shopping Cart
                </button>
                <button
                  type="submit"
                  name="update"
                  className="btn btn-secondary btn-sm cart-continue ms-2 d-none"
                >
                  <i className="icon anm anm-sync-ar me-2 d-none"></i> Update
                  Cart
                </button>
              </td>
            </tr>
          </tfoot>
        </table>
      </form>
    </>
  );
}
