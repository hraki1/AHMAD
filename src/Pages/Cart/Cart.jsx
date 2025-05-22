import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { baseUrl } from "../API/ApiConfig";
import { useCart } from "../../Context/CartContext";

export default function Cart({
  btnName,
  showRemoveIcon = true,
  showPlus = true,
  showMinus = true,
  checkoutLink = "/CheckOut",
}) {
  const { cartId, cartItems, updateCart, isCartLoading } = useCart();

  const token = localStorage.getItem("token");

  const updateQuantity = async (cart_item_id, newQty) => {
    if (!token || !cartId || isCartLoading) {
      toast.error("Cart data is loading, please wait...");
      return;
    }

    try {
      const res = await fetch(
        `${baseUrl}/api/carts/${cartId}/items/${cart_item_id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ qty: newQty }),
        }
      );

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to update cart item");
      }

      await updateCart();
      toast.success("Cart updated");
    } catch (err) {
      toast.error(err.message);
    }
  };

  const removeItem = async (cart_item_id) => {
    if (!cartId || !cart_item_id || isCartLoading) {
      toast.error("Cart data is loading, please wait...");
      return;
    }

    try {
      const res = await fetch(
        `${baseUrl}/api/carts/${cartId}/items/${cart_item_id}`,
        { method: "DELETE", headers: { Authorization: `Bearer ${token}` } }
      );

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || "Failed to remove item");
      }

      await updateCart();
      toast.success("Item removed");
    } catch (err) {
      toast.error(err.message);
    }
  };

  if (isCartLoading) return <div>Loading cart...</div>;
  if (cartItems.length === 0)
    return (
      <div className="empty-cart text-center py-5">
        <p>Your cart is empty</p>
        <Link to="/ShopGrid" className="btn btn-primary">
          Continue shopping
        </Link>
      </div>
    );

  return (
    <div className="container py-4">
      <table className="table align-middle">
        <thead>
          <tr>
            <th></th>
            <th colSpan="2">Product</th>
            <th className="text-center">Price</th>
            <th className="text-center">Quantity</th>
            <th className="text-center">Total</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map(({ cart_item_id, image, name, price, quantity }) => (
            <tr key={cart_item_id}>
              <td className="text-center">
                {showRemoveIcon && (
                  <button
                    className="btn btn-link text-danger"
                    onClick={() =>
                      window.confirm(`Remove ${name}`) &&
                      removeItem(cart_item_id)
                    }
                    disabled={isCartLoading}
                  >
                    <i className="fa-solid fa-xmark"></i>
                  </button>
                )}
              </td>
              <td>
                <img
                  src={image}
                  alt={name}
                  style={{ width: 80, height: "auto" }}
                  className="img-thumbnail"
                />
              </td>
              <td>{name}</td>
              <td className="text-center">${price.toFixed(2)}</td>
              <td className="text-center">
                {showPlus && (
                  <button
                    onClick={() =>
                      quantity > 1
                        ? updateQuantity(cart_item_id, quantity - 1)
                        : toast.info(
                            "Minimum quantity is 1. Click remove to delete item."
                          )
                    }
                    className="btn btn-outline-secondary"
                    disabled={isCartLoading}
                  >
                    <i className="fa-solid fa-minus"></i>
                  </button>
                )}
                <span className="mx-2">{quantity}</span>
                {showMinus && (
                  <button
                    onClick={() => updateQuantity(cart_item_id, quantity + 1)}
                    className="btn btn-outline-secondary"
                    disabled={isCartLoading}
                  >
                    <i className="fa-solid fa-plus"></i>
                  </button>
                )}
              </td>
              <td className="text-center fw-bold">
                ${(price * quantity).toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="d-flex justify-content-between align-items-center mt-4">
        <Link to="/ShopGrid" className="btn btn-outline-secondary">
          Continue shopping
        </Link>
        <Link
          to={checkoutLink}
          className="btn btn-primary"
          disabled={isCartLoading}
        >
          {btnName}
        </Link>
      </div>
    </div>
  );
}
