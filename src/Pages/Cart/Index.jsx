import React, { useContext, useEffect, useState } from "react";
import PageHeader from "../../Components/layout/Header/PageHeader";
import Cart from "./Cart";
import CartForms from "./CartForms";
import CartSummary from "./CartSummary";
import ProductItem from "../../Components/ProductItem";
import { baseUrl } from "../API/ApiConfig";
import { useCart } from "../../Context/CartContext";
import { AuthContext } from "../../Context/AuthContext";

export default function Index() {
  const [cartItems, setCartItems] = useState([]);
  const [cartId, setCartId] = useState(null);
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponMessage, setCouponMessage] = useState(""); // حالة لرسالة الكوبون

  const { isAuthenticated } = useContext(AuthContext);

  const {
    subtotal,
    setSubtotal,
    shipping,
    setShipping,
    tax,
    setTax,
    total,
    discount,
    setTotal,
    showShippingAndTax,
    setShowShippingAndTax,
    updateCart,
    cartCount,
  } = useCart();

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
          setSubtotal(data.sub_total || 0);
          setShipping(data.shipping_fee_incl_tax || 0);
          setTax(data.tax_amount || 0);
          setTotal(data.grand_total || 0);

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
  }, [setSubtotal, setShipping, setTax, setTotal]);

  useEffect(() => {
    setShowShippingAndTax(false);
    return () => setShowShippingAndTax(true);
  }, [setShowShippingAndTax]);

  if (!isAuthenticated) {
    return (
      <div>
        <PageHeader title="Shopping Cart" />
        <div className="container">
          <div className="row">
            <div className="col-12  main-col">
              <Cart
                cartItems={cartItems}
                setCartItems={setCartItems}
                discount={discount}
                couponApplied={couponApplied}
                setCartId={setCartId}
                cartId={cartId}
                btnName={"Proceed To Checkout"}
              />
            </div>
          </div>
        </div>
        <ProductItem />
      </div>
    );
  }
  return (
    <div>
      <PageHeader title="Shopping Cart" />
      <div className="container">
        <div className="row">
          <div
            className={`col-12 col-sm-12 col-md-12  ${
              cartCount === 0 ? "col-lg-12" : "col-lg-8 "
            } main-col`}
          >
            <Cart
              cartItems={cartItems}
              setCartItems={setCartItems}
              discount={discount}
              couponApplied={couponApplied}
              setCartId={setCartId}
              cartId={cartId}
              btnName={"Proceed To Checkout"}
            />
          </div>

          {cartCount !== 0 && (
            <div className="col-lg-4">
              <CartSummary
                btnName={"Proceed To Checkout"}
                isPreview={true}
                setCouponApplied={setCouponApplied}
                setCouponMessage={setCouponMessage}
                useGrandTotal={false}
              />
            </div>
          )}
        </div>

        {cartCount !== 0 && (
          <div className="row">
            <div className="col-12">
              <CartForms
                cartId={cartId}
                setCouponApplied={setCouponApplied}
                setTotal={setTotal}
                couponApplied={couponApplied}
                message={couponMessage}
                setMessage={setCouponMessage}
              />
            </div>
          </div>
        )}
      </div>
      <ProductItem />
    </div>
  );
}
