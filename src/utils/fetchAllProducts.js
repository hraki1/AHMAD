// src/utils/fetchAllProducts.js
const BASE_URL = "http://192.168.100.13:3250/api/products";

/**
 * Format a single product into the desired structure
 */
const formatProduct = (product) => {
  const mainImage = product.images?.find((img) => img.is_main);
  const hoverImage = product.images?.find((img) => !img.is_main);

  return {
    id: product.product_id,
    name: product.description?.name || "Name not found",
    price: product.price || 0,
    old_price: product.old_price || 0,
    primaryImg: mainImage?.origin_image || "",
    hoverImg: hoverImage?.single_image || mainImage?.single_image || "",
    reviewsCount: 3,
    rating: 4,
    href: "/ShopGrid",
    labels: [{ text: "Sale", className: "on-sale" }],
    countdown: "2025/01/01",
    variants:
      product.images?.map((img, i) => ({
        src: img.single_image,
        title: `Color ${i + 1}`,
      })) || [],
    buttonLinks: {
      cart: {
        href: "#quickshop-modal",
        className: "addtocart quick-shop-modal",
        modal: "#quickshop_modal",
        title: "Quick Shop",
        text: "Quick Shop",
      },

      url_key: product.description?.url_key || `product-${product.id}`,

      quickView: {
        href: "#quickview-modal",
        className: "quickview quick-view-modal",
        modal: "#quickview_modal",
        title: "Quick View",
      },
      compare: { href: "compare-style2.html" },
    },
    categoryId: Number(product.category_id),
    brandId: product.brand_id ? Number(product.brand_id) : null,
    subcategory: product.subcategory || "No subcategory",
    inStock: product.inventory?.stock_availability === true, // ✅ قيمة منطقية للتوفر
  };
};

/**
 * Fetch all products from given pages
 * @param {number[]} pages - Array of page numbers to fetch
 * @param {function|null} transformFn - Optional transformation function
 * @param {AbortSignal} abortSignal - Optional abort signal
 * @param {function|null} setLoading - Optional state updater for loading
 * @param {function|null} setError - Optional state updater for error
 * @param {object|null} availabilityFilter - Optional filter for availability { instock: boolean, outofstock: boolean }
 * @returns {Promise<Array>} All formatted products
 */
export const fetchAllProducts = async (
  pages = [1],
  transformFn = null,
  abortSignal,
  setLoading = null,
  setError = null,
  availabilityFilter
) => {
  try {
    if (setLoading) setLoading(true);
    if (setError) setError(null);

    console.time("⏱️ Fetching products");
    let availabilityQuery = "";
    if (availabilityFilter?.instock && !availabilityFilter?.outofstock) {
      availabilityQuery = "&stock_availability=true";
    } else if (!availabilityFilter?.instock && availabilityFilter?.outofstock) {
      availabilityQuery = "&stock_availability=false";
    } else {
      availabilityQuery = "";
    }

    const fetchPromises = pages.map((page) =>
      fetch(`${BASE_URL}?page=${page}&limit=10${availabilityQuery}`, {
        signal: abortSignal,
      })
    );
    const results = await Promise.allSettled(fetchPromises);

    results
      .filter((res) => res.status === "rejected")
      .forEach((err) =>
        console.warn("⚠️ Failed request:", err.reason?.message || err.reason)
      );

    const successfulResponses = results
      .filter((res) => res.status === "fulfilled")
      .map((res) => res.value);

    const jsonDataArray = await Promise.all(
      successfulResponses.map((res) => res.json())
    );

    const allProductsRaw = jsonDataArray.flatMap((json) => json.data);

    const allProducts = transformFn
      ? transformFn(allProductsRaw)
      : allProductsRaw.map(formatProduct);

    return allProducts;
  } catch (error) {
    console.error("❌ Error fetching products:", error);
    if (setError) setError(error.message || "حدث خطأ أثناء جلب المنتجات");
    return [];
  } finally {
    if (setLoading) setLoading(false);
    console.timeEnd("⏱️ Fetching products");
  }
};
