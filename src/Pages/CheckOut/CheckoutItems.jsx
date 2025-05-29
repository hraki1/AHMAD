import { useContext } from "react";
import { Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { CartContext } from "../../Context/CartContext";
import CheckoutItem from "./CheckoutItem";

export default function CheckoutItems({ btnName, checkoutLink = "/CheckOut" }) {
  const { cartItems, isLoading } = useContext(CartContext);

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
            <CheckoutItem
              key={cart_item_id}
              itemId={cart_item_id}
              image={image}
              name={name}
              price={price}
              quantity={quantity}
            />
          ))}
        </tbody>
      </table>

      <div className="d-flex justify-content-between align-items-center mt-4">
        <Link to="/ShopGrid" className="btn btn-outline-secondary">
          Continue shopping
        </Link>
      </div>
    </div>
  );
}
