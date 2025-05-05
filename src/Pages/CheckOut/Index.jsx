import React, { useState, useEffect } from "react";
import PageHeader from "../../Components/layout/Header/PageHeader";
import Checkout from "./Checkout";
import Cart from "../Cart/Cart";
import CartSummary from "../Cart/CartSummary";
import imageCart1 from "../../assets/images/products/product1-120x170.jpg";
import imageCart2 from "../../assets/images/products/product2-120x170.jpg";

export default function Index() {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Oxford Cuban Shirt",
      price: 99,
      quantity: 2,
      image: imageCart1,
    },
    {
      id: 2,
      name: "Cuff Beanie Cap",
      price: 128,
      quantity: 1,
      image: imageCart2,
    },
  ]);

  const [discount, setDiscount] = useState(0);
  const [couponApplied, setCouponApplied] = useState(false);
  const [country, setCountry] = useState(null); // الدولة بشكل افتراضي

  // Load discount from localStorage if available
  useEffect(() => {
    const storedDiscount =
      parseFloat(localStorage.getItem("cartDiscount")) || 0;
    if (storedDiscount > 0) {
      setDiscount(storedDiscount);
    }
  }, []);

  // Save discount to localStorage whenever it changes
  useEffect(() => {
    if (discount > 0) {
      localStorage.setItem("cartDiscount", discount.toString());
    }
  }, [discount]);

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  // discount is amount (not percentage), لذا نفترض أنه مبلغ ثابت
  // لو خصم نسبة قم بتعديل المنطق هنا

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
            />
          </div>
          <div className="col-lg-4">
            <CartSummary
              subtotal={subtotal}
              discount={discount}
              shipping={0}
              setDiscount={setDiscount}
              country={country} //
            />
          </div>
        </div>
      </div>
    </div>
  );
}
