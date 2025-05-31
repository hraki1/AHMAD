import React, { useState, useEffect } from "react";
import PageHeader from "../../Components/layout/Header/PageHeader";
import { baseUrl } from "../API/ApiConfig";
import CheckoutItems from "./CheckoutItems";
import Checkout from "./Checkout";

export default function Index() {
  const [discount, setDiscount] = useState(0); // Check this initial value
  const [couponApplied, setCouponApplied] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartId, setCartId] = useState(null);
  const [country, setCountry] = useState(null); // الدولة بشكل افتراضي

  const [isVaildEntries, setIsVaildEntries] = useState(false); // الدولة بشكل افتراضي

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

  return (
    <div>
      <PageHeader title="Checkout" />
      <Checkout country={country || "Jordan"} setCountry={setCountry} />
      <div className="container">
        <div className="row">
          <div className="col-12 col-sm-12 col-md-12 col-lg-8 main-col">
            <CheckoutItems
              cartItems={cartItems}
              setCartItems={setCartItems}
              discount={discount}
              couponApplied={couponApplied}
              setCartId={setCartId}
              cartId={cartId}
              btnName={"Payemnt"}
              showRemoveIcon={false}
              showPlus={false}
              showMinus={false}
              checkoutLink="/Payment"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
