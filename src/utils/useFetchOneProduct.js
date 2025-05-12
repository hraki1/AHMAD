import { useState, useEffect } from "react";

const BASE_URL = "http://192.168.100.13:3250/api/products";

const useFetchOneProduct = (urlKey) => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        if (!urlKey) throw new Error("No product ID provided");

        setLoading(true);
        const response = await fetch(`${BASE_URL}/${urlKey}`);

        if (!response.ok)
          throw new Error(`HTTP error! status: ${response.status}`);

        const data = await response.json();

        if (!data) throw new Error("No product data received");

        const formattedProduct = {
          ...data,
          price: data.price,
          oldPrice:
            data.oldPrice && data.oldPrice > data.price
              ? data.oldPrice
              : Math.round(data.price * 1.2),
          name:
            typeof data.description === "object"
              ? data.description.name || "Untitled Product"
              : "Untitled Product",
          description:
            typeof data.description === "object"
              ? data.description.en || "No description"
              : data.description || "No description",
          url_key: data.url_key || "",
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
          brand:
            typeof data.brand === "object"
              ? data.brand.name
              : data.brand || "No brand",
          images: data.images || (data.image ? [data.image] : []),
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
