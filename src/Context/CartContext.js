import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [subtotal, setSubtotal] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [tax, setTax] = useState(0);
  const [shipping, setShipping] = useState(0);

  // Load data from localStorage when the component mounts
  useEffect(() => {
    const storedSubtotal =
      parseFloat(localStorage.getItem("cartSubtotal")) || 0;
    const storedDiscount =
      parseFloat(localStorage.getItem("cartDiscount")) || 0;
    const storedTax = parseFloat(localStorage.getItem("cartTax")) || 0;
    const storedShipping =
      parseFloat(localStorage.getItem("cartShipping")) || 0;

    // Log to ensure values are being loaded correctly
    console.log(
      "Loaded data from localStorage:",
      storedSubtotal,
      storedDiscount,
      storedTax,
      storedShipping
    );

    // Check if storedDiscount is different from 0 before setting
    if (storedDiscount !== 0) {
      setDiscount(storedDiscount);
    }
    setSubtotal(storedSubtotal);
    setTax(storedTax);
    setShipping(storedShipping);
  }, []); // Runs once on mount

  // Save data to localStorage whenever it changes
  useEffect(() => {
    console.log(
      "Saving data to localStorage:",
      subtotal,
      discount,
      tax,
      shipping
    );
    localStorage.setItem("cartSubtotal", subtotal.toString());
    localStorage.setItem("cartDiscount", discount.toString());
    localStorage.setItem("cartTax", tax.toString());
    localStorage.setItem("cartShipping", shipping.toString());
  }, [subtotal, discount, tax, shipping]); // Runs whenever any of these values change

  return (
    <CartContext.Provider
      value={{
        subtotal,
        setSubtotal,
        discount,
        setDiscount,
        tax,
        setTax,
        shipping,
        setShipping,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
