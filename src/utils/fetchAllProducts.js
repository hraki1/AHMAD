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
    priceOld: (product.price || 0) + 20,
    primaryImg: mainImage?.single_image || "",
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
      quickView: {
        href: "#quickview-modal",
        className: "quickview quick-view-modal",
        modal: "#quickview_modal",
        title: "Quick View",
      },
      wishlist: { href: "wishlist-style2.html" },
      compare: { href: "compare-style2.html" },
    },
    categoryId: Number(product.category_id), // ✅ لضمان التوافق مع الفلاتر
    brandId: product.brand_id ? Number(product.brand_id) : null,
    subcategory: product.subcategory || "No subcategory",
  };
};

/**
 * Fetch all products from given pages, with optional transform function.
 * Supports aborting and error handling per-request.
 */
export const fetchAllProducts = async (
  pages = [1],
  transformFn = null,
  abortSignal
) => {
  try {
    const fetchPromises = pages.map((page) =>
      fetch(`${BASE_URL}?page=${page}&limit=10`, { signal: abortSignal })
    );

    const results = await Promise.allSettled(fetchPromises);

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
    return [];
  }
};
