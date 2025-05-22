import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { baseUrl } from "../Pages/API/ApiConfig";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartSummary, setCartSummary] = useState({
    subtotal: 0,
    total: 0,
    discount: 0,
    shipping: 0,
    tax: 0,
  });

  const [cartCount, setCartCount] = useState(0);
  const [cartId, setCartId] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [subtotalWithDiscount, setSubtotalWithDiscount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [showShippingAndTax, setShowShippingAndTax] = useState(true);

  const getToken = () => localStorage.getItem("token");
  async function fetchWithAuth(url, options = {}) {
    const token = getToken();
    if (!token) throw new Error("Please login");

    const config = {
      ...options,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        ...(options.headers || {}),
      },
    };

    const response = await fetch(url, config);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || "Request failed");
    }
    return response.json();
  }

  const updateCartState = useCallback((data) => {
    setCartId(data.cart_id || null);
    setCartSummary({
      subtotal: data.sub_total || 0,
      total: data.grand_total || 0,
      discount: data.discount_amount || 0,
      shipping: data.shipping_fee_incl_tax || 0,
      tax: data.tax_amount || 0,
    });
    setCartCount(data.items?.length || 0);
    setSubtotalWithDiscount(data.sub_total_with_discount || 0);
    const items =
      data.items?.map((item) => ({
        id: item.product_id,
        cart_item_id: item.cart_item_id,
        name: item.product_name || `Product ${item.product_id}`,
        price: item.product_price || 0,
        quantity: item.qty || 1,
        image: item.image || "default-image.jpg",
      })) || [];

    setCartItems(items);
  }, []);

  const resetCartState = useCallback(() => {
    setCartId(null);
    setCartItems([]);
    setCartCount(0);
    setCartSummary({
      subtotal: 0,
      total: 0,
      discount: 0,
      shipping: 0,
      tax: 0,
    });
    setSubtotalWithDiscount(0);
  }, []);

  const fetchCartData = useCallback(async () => {
    const token = getToken();

    if (!token) {
      resetCartState();
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      const data = await fetchWithAuth(`${baseUrl}/api/carts/customer`);
      updateCartState(data);
    } catch (error) {
      toast.error(error.message);
      resetCartState();
    } finally {
      setIsLoading(false);
    }
  }, [resetCartState, updateCartState]);

  useEffect(() => {
    fetchCartData();

    const onStorageChange = (e) => {
      if (e.key === "token") {
        fetchCartData();
      }
    };

    window.addEventListener("storage", onStorageChange);
    return () => window.removeEventListener("storage", onStorageChange);
  }, [fetchCartData]);

  const addItem = useCallback(
    async (productId, quantity = 1) => {
      if (!cartId) {
        toast.error("Please login to add items to the cart.");
        return;
      }

      try {
        setIsLoading(true);
        await fetchWithAuth(`${baseUrl}/api/carts/${cartId}/items`, {
          method: "POST",
          body: JSON.stringify({ product_id: productId, qty: quantity }),
        });
        toast.success("Item added to cart");
        await fetchCartData();
      } catch (error) {
        toast.error(error.message);
      } finally {
        setIsLoading(false);
      }
    },
    [cartId, fetchCartData]
  );

  const removeItem = useCallback(
    async (cart_item_id) => {
      if (!cartId) {
        toast.error("Please login to modify the cart.");
        return;
      }

      try {
        setIsLoading(true);
        await fetchWithAuth(
          `${baseUrl}/api/carts/${cartId}/items/${cart_item_id}`,
          { method: "DELETE" }
        );
        toast.success("Item removed from cart");
        await fetchCartData();
      } catch (error) {
        toast.error(error.message);
      } finally {
        setIsLoading(false);
      }
    },
    [cartId, fetchCartData]
  );

  const applyCoupon = useCallback(
    async (couponCode) => {
      if (!cartId) {
        toast.error("Please login to apply coupon.");
        return false;
      }

      try {
        setIsLoading(true);
        await fetchWithAuth(`${baseUrl}/api/coupons/apply`, {
          method: "POST",
          body: JSON.stringify({ cart_id: cartId, coupon_code: couponCode }),
        });
        toast.success("Coupon applied successfully");
        await fetchCartData();
        return true;
      } catch (error) {
        toast.error(error.message);
        return false;
      } finally {
        setIsLoading(false);
      }
    },
    [cartId, fetchCartData]
  );

  const removeCoupon = useCallback(async () => {
    if (!cartId) {
      toast.error("Please login to remove coupon.");
      return;
    }

    try {
      setIsLoading(true);
      await fetchWithAuth(`${baseUrl}/api/coupons/remove`, {
        method: "POST",
        body: JSON.stringify({ cart_id: cartId }),
      });
      toast.success("Coupon removed successfully");
      await fetchCartData();
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  }, [cartId, fetchCartData]);

  return (
    <CartContext.Provider
      value={{
        cartCount,
        isLoading,
        updateCart: fetchCartData,
        cartId,
        discount: cartSummary.discount,
        subtotal: cartSummary.subtotal,
        shipping: showShippingAndTax ? cartSummary.shipping : 0,
        tax: showShippingAndTax ? cartSummary.tax : 0,
        total: cartSummary.total,
        cartItems,
        showShippingAndTax,
        setShowShippingAndTax,
        addItem,
        removeItem,
        subtotalWithDiscount,
        applyCoupon,
        removeCoupon,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
