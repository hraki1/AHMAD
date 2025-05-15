import React, { createContext, useContext, useState, useEffect } from "react";
const CartContext = createContext();
export function CartProvider({ children }) {
  const [cartCount, setCartCount] = useState(0);
  const [isCartLoading, setIsCartLoading] = useState(true);
  const fetchCartCount = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setIsCartLoading(false);
      return;
    }
    try {
      const response = await fetch(
        "http://192.168.100.13:3250/api/carts/customer",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.ok) {
        const cartData = await response.json();
        setCartCount(cartData.items?.length || 0);
      }
    } catch (error) {
      console.error("Error fetching cart count:", error);
    } finally {
      setIsCartLoading(false);
    }
  };
  useEffect(() => {
    fetchCartCount();
  }, []);
  const updateCartCount = async () => {
    await fetchCartCount();
  };
  return (
    <CartContext.Provider value={{ cartCount, isCartLoading, updateCartCount }}>
      {" "}
      {children}{" "}
    </CartContext.Provider>
  );
}
export function useCart() {
  return useContext(CartContext);
}
