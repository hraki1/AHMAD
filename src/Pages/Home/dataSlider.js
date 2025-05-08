import { Link } from "react-router-dom";

export const dataSlider = async () => {
  // جلب البيانات من الصفحة الأولى
  const res1 = await fetch(
    "http://192.168.100.13:3250/api/products?page=1&limit=10"
  );
  const json1 = await res1.json();

  // جلب البيانات من الصفحة الثانية
  const res2 = await fetch(
    "http://192.168.100.13:3250/api/products?page=2&limit=10"
  );
  const json2 = await res2.json();

  // mearge pages
  const allProducts = [...json1.data, ...json2.data];

  // convert data
  const transformed = allProducts.map((product) => {
    const mainImage = product.images?.find((img) => img.is_main);
    const hoverImage = product.images?.find((img) => !img.is_main);
    const imageUrl = product.images[10]?.single_image;
    if (!imageUrl) {
      console.log("URL غير موجود أو الصورة مفقودة");
    }

    return {
      id: product.product_id,
      name: product.description?.name || "اسم غير متوفر",
      price: product.price || 0,
      priceOld: (product.price || 0) + 20, //
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
          title: `لون ${i + 1}`,
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
    };
  });

  const toprated = transformed.slice(8, 13); //

  return {
    bestsellers: transformed.slice(0, 4), //
    newarrivals: transformed.slice(4, 8), //
    toprated: toprated, //
  };
};
