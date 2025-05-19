import React, { useState, useEffect } from "react";
import PageHeader from "../../Components/layout/Header/PageHeader";
import Checkout from "./Checkout";
import Cart from "../Cart/Cart";
import CartSummary from "../Cart/CartSummary";
import { baseUrl } from "../API/ApiConfig";
export default function Index() {
  const [discount, setDiscount] = useState(0); // Check this initial value
  const [couponApplied, setCouponApplied] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartId, setCartId] = useState(null);
  const [country, setCountry] = useState(null); // الدولة بشكل افتراضي

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetch(`${baseUrl}/api/carts/customer`, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => {
          if (!res.ok) throw new Error("Failed to fetch cart");
          return res.json();
        })
        .then((data) => {
          setCartId(data.cart_id);
          setDiscount(data.discount_amount || 0); // <-- Set discount from API
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
        .catch((error) => {
          console.error("Error fetching cart:", error);
        });
    }
  }, []);

  const calculateTotal = () => {
    const subtotal = cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
    const discountAmount = discount;
    const totalAfterDiscount = subtotal - discountAmount;

    return { subtotal, discountAmount, totalAfterDiscount };
  };

  const { subtotal, discountAmount, totalAfterDiscount } = calculateTotal();

  return (
    <div>
      <PageHeader title="Checkout" />
      <Checkout country={country || "Jordan"} setCountry={setCountry} />
      <div className="container">
        <div className="row">
          <div className="col-12 col-sm-12 col-md-12 col-lg-8 main-col">
            <Cart
              cartItems={cartItems}
              setCartItems={setCartItems}
              discount={discount}
              couponApplied={couponApplied}
              setCartId={setCartId}
              cartId={cartId}
              btnName={"Payemnt"}
            />
          </div>
          <div className="col-lg-4">
            <CartSummary
              subtotal={subtotal}
              discount={discountAmount}
              tax={0} // Adjust as necessary
              shipping={0} // Adjust as necessary
              setDiscount={setDiscount}
              btnName={"Payemnt"}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
