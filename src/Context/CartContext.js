import React, { createContext, useContext, useEffect, useState } from "react";
import { baseUrl } from "../Pages/API/ApiConfig";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartCount, setCartCount] = useState(0);
  const [isCartLoading, setIsCartLoading] = useState(true);

  const [cartId, setCartId] = useState(null);
  const [discount, setDiscount] = useState(0);
  const [subtotal, setSubtotal] = useState(0);
  const [shippingValue, setShippingValue] = useState(0);
  const [taxValue, setTaxValue] = useState(0);
  const [total, setTotal] = useState(0);
  const [cartItems, setCartItems] = useState([]);

  const [showShippingAndTax, setShowShippingAndTax] = useState(true);

  const fetchCartData = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setIsCartLoading(false);
      return;
    }

    try {
      const response = await fetch(`${baseUrl}/api/carts/customer`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) throw new Error("Failed to fetch cart data");
      const data = await response.json();

      setCartId(data.cart_id);
      setDiscount(data.discount_amount || 0);
      setSubtotal(data.sub_total || 0);
      setShippingValue(data.shipping_fee_incl_tax || 0);
      setTaxValue(data.tax_amount || 0);
      setTotal(data.grand_total || 0);
      setCartCount(data.items?.length || 0);

      const items = data.items.map((item) => ({
        id: item.product_id,
        cart_item_id: item.cart_item_id,
        name: item.product_name || `Product ${item.product_id}`,
        price: item.product_price || 0,
        quantity: item.qty || 1,
        image: item.image || "default-image.jpg",
      }));
      setCartItems(items);
    } catch (error) {
      console.error("Error fetching cart:", error);
    } finally {
      setIsCartLoading(false);
    }
  };

  useEffect(() => {
    fetchCartData();
  }, []);

  const updateCart = async () => {
    await fetchCartData();
  };

  return (
    <CartContext.Provider
      value={{
        cartCount,
        isCartLoading,
        updateCart,
        cartId,
        discount,
        subtotal,
        shipping: showShippingAndTax ? shippingValue : 0,
        tax: showShippingAndTax ? taxValue : 0,
        total,
        cartItems,
        setCartItems,
        showShippingAndTax,
        setShowShippingAndTax,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
