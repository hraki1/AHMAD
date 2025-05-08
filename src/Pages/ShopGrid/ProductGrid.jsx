import React, { useState, useEffect, useMemo, useCallback } from "react";
import { fetchAllProducts } from "../../utils/fetchAllProducts";
import useFetchCategories from "../../utils/useFetchCategories";

const ProductGrid = ({ selectedCategoryAndChildrenIds }) => {
  const [products, setProducts] = useState([]);
  const [cartLoading, setCartLoading] = useState(false);
  const [subcategoryIds, setSubcategoryIds] = useState([]);
  const {
    categories: subcategories,
    loading: subcategoriesLoading,
    error: subcategoriesError,
  } = useFetchCategories(selectedCategoryAndChildrenIds?.[0] || null);

  useEffect(() => {
    if (
      !subcategoriesLoading &&
      !subcategoriesError &&
      selectedCategoryAndChildrenIds?.[0]
    ) {
      setSubcategoryIds(subcategories.map((sub) => sub.id));
    } else if (!selectedCategoryAndChildrenIds) {
      setSubcategoryIds([]);
    }
  }, [
    subcategories,
    subcategoriesLoading,
    subcategoriesError,
    selectedCategoryAndChildrenIds,
  ]);

  useEffect(() => {
    const controller = new AbortController();
    const loadProducts = async () => {
      try {
        const allProducts = await fetchAllProducts(
          [1, 2, 3],
          null,
          controller.signal
        );
        setProducts(
          allProducts.map(
            ({
              id,
              name,
              price,
              priceOld,
              primaryImg,
              variants,
              reviewsCount,
              categoryId,
            }) => ({
              id,
              name,
              oldPrice: `$${(priceOld || price + 20).toFixed(2)}`,
              newPrice: `$${price.toFixed(2)}`,
              imageUrl: primaryImg || "",
              categoryId,
              reviews: reviewsCount || 3,
              colors: variants.map(({ title, src }) => ({
                title,
                imgSrc: src,
              })),
            })
          )
        );
      } catch (error) {
        if (error.name !== "AbortError")
          console.error("Failed to load products:", error);
      }
    };

    loadProducts();
    return () => controller.abort();
  }, []);

  const handleColorChange = useCallback((productId, imgSrc) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === productId ? { ...p, imageUrl: imgSrc } : p))
    );
  }, []);

  const addToCart = useCallback(
    (product) => {
      if (cartLoading) return;
      setCartLoading(true);

      setTimeout(() => {
        const existing = JSON.parse(localStorage.getItem("cartItems")) || [];
        if (existing.find((item) => item.id === product.id)) {
          alert("The item has already been added.");
          return setCartLoading(false);
        }

        const updated = [
          ...existing,
          {
            ...product,
            price: parseFloat(product.newPrice.replace("$", "")),
            quantity: 1,
          },
        ];
        localStorage.setItem("cartItems", JSON.stringify(updated));
        alert("✅ The item has been added successfully");
        setCartLoading(false);
      }, 200);
    },
    [cartLoading]
  );

  const filteredProducts = useMemo(() => {
    if (!selectedCategoryAndChildrenIds) return products;
    const ids = [selectedCategoryAndChildrenIds[0], ...subcategoryIds];
    return products.filter((p) => ids.includes(p.categoryId));
  }, [products, selectedCategoryAndChildrenIds, subcategoryIds]);

  const renderStars = (reviews) =>
    Array.from({ length: 5 }, (_, i) => (
      <i
        key={i}
        className={`fas fa-star`}
        style={{ color: i < reviews ? "gold" : "gray" }}
      />
    ));

  if (subcategoriesLoading) return <p>Loading subcategories...</p>;
  if (!filteredProducts.length)
    return <p>No products found for this category.</p>;

  return (
    <div className="grid-products grid-view-items">
      <div className="row col-row product-options row-cols-lg-4 row-cols-md-3 row-cols-sm-3 row-cols-2">
        {filteredProducts.map((product) => (
          <div className="item col-item" key={product.id}>
            <div className="product-box">
              <div className="product-image">
                <a
                  href="product-layout1.html"
                  className="product-img rounded-3"
                >
                  <img
                    className="blur-up lazyload"
                    src={product.imageUrl}
                    alt={product.name}
                    width="625"
                    height="808"
                  />
                </a>
                <div className="product-labels">
                  <span className="lbl on-sale">Sale</span>
                </div>
                <div className="button-set style1">
                  <button
                    className="btn-icon addtocart"
                    onClick={() => addToCart(product)}
                    disabled={cartLoading}
                    title="Add to Cart"
                  >
                    <i className="fa-solid fa-cart-plus"></i>
                    <span className="text">Add to Cart</span>
                  </button>
                  <a
                    href="#quickview-modal"
                    className="btn-icon quickview"
                    data-bs-toggle="modal"
                    data-bs-target="#quickview_modal"
                  >
                    <i className="fa-solid fa-eye"></i>
                    <span className="text">Quick View</span>
                  </a>
                  <a href="wishlist-style2.html" className="btn-icon wishlist">
                    <i className="fa-solid fa-heart"></i>
                    <span className="text">Add To Wishlist</span>
                  </a>
                  <a href="compare-style2.html" className="btn-icon compare">
                    <i className="fa-solid fa-code-compare"></i>
                    <span className="text">Add to Compare</span>
                  </a>
                </div>
              </div>

              <div className="product-details">
                <div className="product-name">
                  <a href="product-layout1.html">{product.name}</a>
                </div>
                <div className="product-price">
                  <span className="price old-price">{product.oldPrice}</span>
                  <span className="price">{product.newPrice}</span>
                </div>
                <div className="product-review">
                  {renderStars(product.reviews)}
                </div>
                <ul className="variants-clr swatches">
                  {product.colors.map((color, i) => (
                    <li
                      key={i}
                      className="swatch medium radius"
                      onClick={() =>
                        handleColorChange(product.id, color.imgSrc)
                      }
                    >
                      <span className="swatchLbl" title={color.title}>
                        <img
                          src={color.imgSrc}
                          alt={color.title}
                          width="625"
                          height="808"
                        />
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;
