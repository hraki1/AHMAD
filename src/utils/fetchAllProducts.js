export const fetchAllProducts = async (pages = [1], transformFn = null) => {
  try {
    //
    const fetchPromises = pages.map((page) =>
      fetch(`http://192.168.100.13:3250/api/products?page=${page}&limit=10`)
    );

    // جلب كل الصفحات بالتوازي
    const responses = await Promise.all(fetchPromises);
    const jsonDataArray = await Promise.all(responses.map((res) => res.json()));

    // دمج بيانات المنتجات من كل الصفحات
    const allProductsRaw = jsonDataArray.flatMap((json) => json.data);

    // إذا تم تمرير دالة تحويل، طبقها على البيانات، وإلا طبق التحويل الافتراضي
    const allProducts = transformFn
      ? transformFn(allProductsRaw)
      : allProductsRaw.map((product) => {
          const mainImage = product.images?.find((img) => img.is_main);
          const hoverImage = product.images?.find((img) => !img.is_main);

          return {
            id: product.product_id,
            name: product.description?.name || "اسم غير متوفر",
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

    return allProducts;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};
