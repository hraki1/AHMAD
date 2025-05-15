import React, { useEffect, useState } from "react";
import PageHeader from "../../Components/layout/Header/PageHeader";
import Cart from "./Cart";
import CartForms from "./CartForms";
import CartSummary from "./CartSummary";
import ProductItem from "../../Components/ProductItem";
// import MiniCart from "./MiniCart";

export default function Index() {
  const [discount, setDiscount] = useState(0);
  const [couponApplied, setCouponApplied] = useState(false);
  const [cartItems, setCartItems] = useState([]);

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
      console.log("Saving discount to localStorage:", discount);
      localStorage.setItem("cartDiscount", discount.toString());
    }
  }, [discount]);

  const calculateTotal = () => {
    const subtotal = cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
    const discountAmount = (subtotal * discount) / 100;
    const totalAfterDiscount = subtotal - discountAmount;

    return { subtotal, discountAmount, totalAfterDiscount };
  };

  const removeDiscount = () => {
    setDiscount(0);
    localStorage.setItem("cartDiscount", "0");
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
            />
          </div>
          <div className="col-lg-4">
            <CartSummary
              subtotal={subtotal}
              discount={discountAmount}
              tax={10}
              shipping={0}
              setDiscount={setDiscount}
            />
          </div>
        </div>

        <div className="row">
          <div className="col-12">
            <CartForms
              setDiscount={setDiscount}
              setCouponApplied={setCouponApplied}
            />
          </div>
        </div>
      </div>
      <ProductItem />
      {/* <MiniCart
        items={[
          {
            name: "Women Sandals",
            variant: "Black",
            size: "XL",
            price: 54.0,
            quantity: 1,
            img: img,
            link: "product-layout1.html",
          },
          {
            name: "Sleeve Round T-Shirt",
            variant: "Yellow",
            size: "M",
            price: 99.0,
            oldPrice: 114.0,
            quantity: 1,
            img: imgtow,
            link: "product-layout1.html",
          },
        ]}
        onQuantityChange={(index, newQty) => console.log(index, newQty)}
        onRemove={(index) => console.log("Remove", index)}
        onClose={() => console.log("Cart closed")}
      /> */}
    </div>
  );
}
