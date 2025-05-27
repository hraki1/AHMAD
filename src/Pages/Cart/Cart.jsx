import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css";
import { baseUrl } from "../API/ApiConfig";
import { CartContext } from "../../Context/CartContext";
import CartItem from "./CartItem";

export default function Cart({
  btnName,
  showRemoveIcon = true,
  showPlus = true,
  showMinus = true,
  checkoutLink = "/CheckOut",
}) {
  const { cartId, cartItems, updateCart, isLoading } = useContext(CartContext);

  const [isLoadingDelete, setIsLoadingDelete] = useState(false);

  const token = localStorage.getItem("token");

  const updateQuantity = async (cart_item_id, newQty) => {
    if (!token || !cartId || isLoading) {
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
    if (!cartId || !cart_item_id || isLoading) {
      toast.error("Cart data is loading, please wait...");
      return;
    }

    try {
      setIsLoadingDelete(true);
      const res = await fetch(
        `${baseUrl}/api/carts/${cartId}/items/${cart_item_id}`,
        { method: "DELETE", headers: { Authorization: `Bearer ${token}` } }
      );

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || "Failed to remove item");
      }

      updateCart();
      toast.success("Item removed");
      setIsLoadingDelete(false);
    } catch (err) {
      toast.error(err.message);
      setIsLoadingDelete(false);
    }
  };

  // if (isLoading) return <div>Loading cart...</div>;
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
      <Toaster />
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
            <CartItem
              key={cart_item_id}
              itemId={cart_item_id}
              image={image}
              name={name}
              price={price}
              quantity={quantity}
              onRemove={removeItem}
              onUpdatedQuantity={updateQuantity}
              isLoading={isLoading}
              isLoadingDelete={isLoadingDelete}
            />
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
          disabled={isLoading}
        >
          {btnName}
        </Link>
      </div>
    </div>
  );
}
