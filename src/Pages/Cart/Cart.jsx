import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { baseUrl } from "../API/ApiConfig";
export default function Cart() {
  const [loading, setLoading] = useState(true);
  const [cartItems, setCartItems] = useState([]);
  const [error, setError] = useState(null);
  const [cartId, setCartId] = useState(null);

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      setError("Please login to view your cart");
      setLoading(false);
      return;
    }

    fetch(`${baseUrl}/api/carts/customer`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch cart");
        return res.json();
      })
      .then((data) => {
        setCartId(data.cart_id);
        const items = data.items.map((item) => ({
          id: item.product_id,
          cart_item_id: item.cart_item_id,
          name: item.product_name || `Product ${item.product_id}`,
          price: item.product_price || 0,
          quantity: item.qty || 1,
          image: item.image || "default-image.jpg",
        }));
        setCartItems(items);
      })
      .catch((err) => {
        setError(err.message);
        toast.error(err.message);
      })
      .finally(() => setLoading(false));
  }, [token]);

  const updateQuantity = async (cart_item_id, newQty) => {
    if (!token || !cartId) return toast.error("Please login to update cart");

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

      setCartItems((items) =>
        items.map((item) =>
          item.cart_item_id === cart_item_id
            ? { ...item, quantity: newQty }
            : item
        )
      );
      toast.success("Cart updated");
    } catch (err) {
      toast.error(err.message);
    }
  };

  const removeItem = async (cart_item_id) => {
    if (!cartId || !cart_item_id) return toast.error("Missing cart or item ID");

    try {
      const res = await fetch(
        `${baseUrl}/api/carts/${cartId}/items/${cart_item_id}`,
        { method: "DELETE", headers: { Authorization: `Bearer ${token}` } }
      );

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || "Failed to remove item");
      }

      setCartItems((items) =>
        items.filter((item) => item.cart_item_id !== cart_item_id)
      );
      toast.success("Item removed");
    } catch (err) {
      toast.error(err.message);
    }
  };

  if (loading) return <div>Loading cart...</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;
  if (cartItems.length === 0)
    return (
      <div className="empty-cart text-center py-5">
        <p>Your cart is empty</p>
        <Link to="/ShopGrid" className="btn btn-primary">
          Continue shopping
        </Link>
      </div>
    );

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
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
                <button
                  className="btn btn-link text-danger"
                  onClick={() =>
                    window.confirm("Remove this item?") &&
                    removeItem(cart_item_id)
                  }
                >
                  <i className="fa-solid fa-xmark"></i>
                </button>
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
                <button
                  onClick={() =>
                    quantity > 1
                      ? updateQuantity(cart_item_id, quantity - 1)
                      : toast.info(
                          "Minimum quantity is 1. Click remove to delete item."
                        )
                  }
                  className="btn btn-outline-secondary"
                >
                  <i className="fa-solid fa-minus"></i>
                </button>
                <span className="mx-2">{quantity}</span>
                <button
                  onClick={() => updateQuantity(cart_item_id, quantity + 1)}
                  className="btn btn-outline-secondary"
                >
                  <i className="fa-solid fa-plus"></i>
                </button>
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
        <div className="fs-4">Total: ${totalPrice.toFixed(2)}</div>
        <button className="btn btn-primary">Proceed to checkout</button>
      </div>
    </div>
  );
}
