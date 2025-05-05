import React, { useEffect, useState } from "react";
import PageHeader from "../../Components/layout/Header/PageHeader";
import Cart from "./Cart";
import CartForms from "./CartForms";
import CartSummary from "./CartSummary";
import imageCart1 from "../../assets/images/products/product1-120x170.jpg";
import imageCart2 from "../../assets/images/products/product2-120x170.jpg";
import ProductItem from "../../Components/ProductItem";
import MiniCart from "./MiniCart";
import img from "../../assets/images/products/cart-product-img1.jpg";
import imgtow from "../../assets/images/products/cart-product-img2.jpg";

export default function Index() {
  const [discount, setDiscount] = useState(0);
  const [couponApplied, setCouponApplied] = useState(false);

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

  // Load discount from localStorage if available
  useEffect(() => {
    const storedDiscount =
      parseFloat(localStorage.getItem("cartDiscount")) || 0;
    if (storedDiscount > 0) {
      setDiscount(storedDiscount);
    }
  }, []); // Runs only once when the component is mounted

  // Save discount to localStorage whenever it changes
  useEffect(() => {
    if (discount > 0) {
      // Only save when discount is greater than 0
      console.log("Saving discount to localStorage:", discount); // Log the value being saved
      localStorage.setItem("cartDiscount", discount.toString());
    }
  }, [discount]); // Runs every time discount changes

  const calculateTotal = () => {
    const subtotal = cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
    // Apply discount
    const totalWithDiscount = subtotal - (subtotal * discount) / 100;
    return totalWithDiscount;
  };
  const removeDiscount = () => {
    setDiscount(0); // Reset discount to 0
    localStorage.setItem("cartDiscount", "0"); // Save to localStorage
  };

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
              subtotal={calculateTotal()}
              discount={(calculateTotal() * discount) / 100}
              tax={10}
              shipping={0}
              setDiscount={setDiscount} //
            />
          </div>
        </div>
        {/* CartForms under Cart */}
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
      <MiniCart
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
      />
    </div>
  );
}
