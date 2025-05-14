import React, { createContext, useState, useEffect, useContext } from "react";

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [initialized, setInitialized] = useState(false); //

  //
  useEffect(() => {
    try {
      const storedWishlist = localStorage.getItem("wishlist");
      if (storedWishlist) {
        const parsedItems = JSON.parse(storedWishlist);
        if (Array.isArray(parsedItems)) {
          setWishlistItems(parsedItems);
        }
      }
    } catch (error) {
      console.error("Error loading wishlist:", error);
      localStorage.removeItem("wishlist");
    } finally {
      setInitialized(true);
    }
  }, []);

  //
  useEffect(() => {
    if (initialized) {
      //
      localStorage.setItem("wishlist", JSON.stringify(wishlistItems));
    }
  }, [wishlistItems, initialized]);

  const addToWishlist = (product) => {
    setWishlistItems((prevItems) => {
      const exists = prevItems.some((item) => item.id === product.id);
      if (!exists) {
        return [...prevItems, product];
      }
      return prevItems;
    });
  };

  const removeFromWishlist = (productId) => {
    setWishlistItems((prevItems) =>
      prevItems.filter((item) => item.id !== productId)
    );
  };

  return (
    <WishlistContext.Provider
      value={{ wishlistItems, addToWishlist, removeFromWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);
