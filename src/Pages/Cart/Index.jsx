import React, { useEffect, useState } from "react";
import PageHeader from "../../Components/layout/Header/PageHeader";
import Cart from "./Cart";
import CartForms from "./CartForms";
import CartSummary from "./CartSummary";
import ProductItem from "../../Components/ProductItem";
import { baseUrl } from "../API/ApiConfig";

export default function Index() {
  const [discount, setDiscount] = useState(0); // Check this initial value
  const [couponApplied, setCouponApplied] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartId, setCartId] = useState(null);

  console.log("Discount state in Index (initial):", discount); // Debugging log

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetch(`${baseUrl}/api/carts/customer`, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((data) => {
          setCartId(data.cart_id);
          console.log("Discount from cart API:", data.discount_amount); // Check the discount from the cart API
        })
        .catch((error) => {
          console.error("Error fetching cart ID:", error);
        });
    }
  }, []);

  // Load discount from localStorage if available
  useEffect(() => {
    const storedDiscount =
      parseFloat(localStorage.getItem("cartDiscount")) || 0;
    console.log("Stored discount from local storage:", storedDiscount); // Debugging log
    if (storedDiscount > 0) {
      setDiscount(storedDiscount);
    }
  }, []);

  // Save discount to localStorage whenever it changes
  useEffect(() => {
    console.log("Discount state before saving to local storage:", discount); // Debugging log
    if (discount > 0) {
      console.log("Saving discount to localStorage:", discount);
      localStorage.setItem("cartDiscount", discount.toString());
    }
  }, [discount]);

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
      <PageHeader title="Shopping Cart" />
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
            />
          </div>
          <div className="col-lg-4">
            <CartSummary
              subtotal={subtotal}
              discount={discountAmount}
              tax={0} // Adjust as necessary
              shipping={0} // Adjust as necessary
              setDiscount={setDiscount}
            />
          </div>
        </div>

        <div className="row">
          <div className="col-12">
            <CartForms
              setDiscount={setDiscount}
              setCouponApplied={setCouponApplied}
              cartId={cartId}
            />
          </div>
        </div>
      </div>
      <ProductItem />
    </div>
  );
}
