export const AddToCart = async (productId, qty = 1) => {
  const token = localStorage.getItem("token");

  if (!productId) {
    return { success: false, message: "product_id is required" };
  }

  if (!token) {
    window.location.href = "/login";
    return { success: false, message: "Not authenticated" };
  }

  try {
    let cartId = null;

    // Step 1: Get the cart
    const res1 = await fetch("http://192.168.100.13:3250/api/carts/customer", {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (res1.ok) {
      const cartData = await res1.json();
      cartId = cartData.id || cartData.cart_id;
    } else if (res1.status === 404) {
      const res2 = await fetch("http://192.168.100.13:3250/api/carts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({}),
      });

      if (!res2.ok) {
        const errorText = await res2.text();
        throw new Error("Failed to create cart: " + errorText);
      }

      const newCart = await res2.json();
      cartId = newCart.id || newCart.cart_id;
    } else {
      const errorText = await res1.text();
      throw new Error("Failed to get cart: " + errorText);
    }

    if (!cartId) {
      throw new Error("Cart ID is missing");
    }

    // Step 2: Get existing cart items
    const itemsRes = await fetch(
      `http://192.168.100.13:3250/api/carts/${cartId}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    if (!itemsRes.ok) {
      throw new Error("Failed to fetch cart details");
    }

    const cartDetails = await itemsRes.json();
    const existingItem = cartDetails.items?.find(
      (item) => item.product_id === productId
    );

    // Step 3: Update or Add item
    if (existingItem) {
      const updatedQty = existingItem.qty + qty;

      const updateRes = await fetch(
        `http://192.168.100.13:3250/api/carts/${cartId}/items/${existingItem.cart_item_id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ qty: updatedQty }),
        }
      );

      if (!updateRes.ok) {
        const errData = await updateRes.json();
        throw new Error(errData.message || "Failed to update quantity");
      }

      return {
        success: true,
        message: "Quantity increased successfully",
      };
    } else {
      // Product not in cart → Add new
      const addRes = await fetch(
        `http://192.168.100.13:3250/api/carts/${cartId}/items`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ qty, product_id: productId }),
        }
      );

      if (!addRes.ok) {
        const errorData = await addRes.json();
        throw new Error(errorData.message || "Failed to add product");
      }

      return {
        success: true,
        message: "Item added successfully",
      };
    }
  } catch (error) {
    console.error("Error in AddToCart:", error.message);
    return { success: false, message: error.message };
  }
};
