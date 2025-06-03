import { useState, useEffect } from "react";
import { baseUrl } from "../API/ApiConfig";
const BASE_URL = `${baseUrl}/api/products/by-url`;

const useFetchOneProduct = (urlKey) => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      const languageKey = localStorage.getItem("i18nextLng");
      try {
        const finalId = urlKey;

        if (!finalId) throw new Error("No product ID provided");

        setLoading(true);
        console.log(`${BASE_URL}/${finalId}?lang=${languageKey}`);
        const response = await fetch(
          `${BASE_URL}/${finalId}?lang=${languageKey}`
        );

        if (!response.ok)
          throw new Error(`HTTP error! status: ${response.status}`);

        const data = await response.json();
        console.log("Fetched Product Data:", data);
        console.log("Used ID:", finalId);
        console.log(data);

        if (!data) throw new Error("No product data received");

        const formattedProduct = {
          ...data,
          id: data.product_id,
          price: data.price,
          oldPrice:
            data.oldPrice && data.oldPrice > data.price
              ? data.oldPrice
              : Math.round(data.price * 1.2),
          name:
            typeof data.description === "object"
              ? data.description.name || "Untitled Product"
              : "Untitled Product",
          url_key: data.description?.url_key || `product-${data.product_id}`,
          inventory:
            typeof data.inventory === "object"
              ? data.inventory.stock_availability === true
                ? "In Stock"
                : "Not Available"
              : "Not Available",
          category: {
            name:
              typeof data.category === "object"
                ? data.category.description?.name || "Uncategorized"
                : "Uncategorized",
            description:
              typeof data.category === "object"
                ? data.category.description?.description || ""
                : "",
          },
          attributes: Array.isArray(data.attributes)
            ? data.attributes.map((attr) => ({
                attributeName:
                  attr.attribute?.attribute_name || "Unnamed Attribute",
                optionText: attr.option?.option_text || "Unnamed Option",
              }))
            : [],
          brand:
            typeof data.brand === "object"
              ? data.brand.name
              : data.brand || "No brand",
          images: Array.isArray(data.images)
            ? data.images
                .map((img) => ({
                  ...img,
                  is_main: img.is_main || false, // Ensure is_main exists
                }))
                .sort((a, b) => (b.is_main ? 1 : -1)) // Sort to put main image first
            : data.image
            ? [
                {
                  url: data.image,
                  is_main: true,
                  origin_image: data.origin_image,
                },
              ] // Handle single image case
            : [],
          colors: data.colors || data.variants?.colors || [],
          sizes: data.sizes || data.variants?.sizes || [],
          originalPrice: data.originalPrice || Math.round(data.price * 1.2),
          stock: data.stock || 0,
        };

        setProduct(formattedProduct);
      } catch (err) {
        setError(err.message || "Failed to fetch product");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [urlKey]);

  return { product, loading, error };
};

export default useFetchOneProduct;
