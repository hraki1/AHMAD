// src/components/shop/ProductGrid.js
import React, { useState, useEffect, useMemo, useCallback } from "react";
import { fetchAllProducts } from "../../utils/fetchAllProducts";
import useFetchCategories from "../Hooks/useFetchCategories";
import { Link } from "react-router-dom";
import { useWishlist } from "../../Context/WishlistContext";

const ProductGrid = ({
  selectedCategoryAndChildrenIds,
  selectedBrandIds = [],
  availabilityFilter,
  priceRange = [0, 1000],
  gridClass,
  productsToShow,
  sortBy = "Featured", // 👈 Adding sortBy parameter
  displayedProductCount, // ✅ Received displayedProductCount
  productsPerPageValue, // ✅ Received productsPerPage
}) => {
  const [products, setProducts] = useState([]);
  // const [cartLoading, setCartLoading] = useState(false);
  const [subcategoryIds, setSubcategoryIds] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { addToWishlist } = useWishlist();

  const handleAddToWishlist = (e, product) => {
    e.preventDefault();
    addToWishlist({
      id: product.id,
      name: product.name,
      price: parseFloat(product.newPrice.replace("$", "")),
      stock: product.inStock ? "in stock" : "Out Of stock",
      disabled: !product.inStock,
      imgSrc: product.imageUrl,
      variant: product.colors[0]?.title || "Default variant",
    });
    alert(`${product.name} added to wishlist!`);
  };

  const {
    categories: subcategories,
    loading: subcategoriesLoading,
    error: subcategoriesError,
  } = useFetchCategories(selectedCategoryAndChildrenIds?.[0] || null);
  useEffect(() => {}, [displayedProductCount, productsPerPageValue]);

  useEffect(() => {
    if (
      !subcategoriesLoading &&
      !subcategoriesError &&
      selectedCategoryAndChildrenIds?.[0] &&
      subcategories
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
    availabilityFilter,
  ]);

  useEffect(() => {
    const controller = new AbortController();
    const loadProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const totalPages = 5;
        const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

        const allProducts = await fetchAllProducts(
          pages,
          null,
          controller.signal,
          setLoading,
          setError,
          availabilityFilter
        );
        setProducts(
          allProducts.map(
            ({
              id,
              name,
              price,
              old_price,
              primaryImg,
              variants,
              reviewsCount,
              categoryId,
              brandId,
              url_key,
              inStock,
              created_at, // 👈 Add date field for sorting by date
            }) => ({
              id,
              name,
              oldPrice: `$${(old_price || price + 20).toFixed(2)}`,
              newPrice: `$${price.toFixed(2)}`,
              price: price, // 👈 Store raw price for sorting
              imageUrl: primaryImg || "",
              categoryId,
              brandId,
              reviews: reviewsCount || 3,
              colors: variants.map(({ title, src }) => ({
                title,
                imgSrc: src,
              })),
              url_key: url_key,
              inStock,
              createdAt: created_at || new Date().toISOString(), // 👈 Add created date for sorting
            })
          )
        );
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error("Failed to load products:", error);
          setError(error.message || "Failed to load products.");
        }
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
    return () => controller.abort();
  }, [selectedCategoryAndChildrenIds, selectedBrandIds, availabilityFilter]);

  const handleColorChange = useCallback((productId, imgSrc) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === productId ? { ...p, imageUrl: imgSrc } : p))
    );
  }, []);

  // const addToCart = useCallback(
  //   (product) => {
  //     if (cartLoading) return;
  //     setCartLoading(true);

  //     setTimeout(() => {
  //       const existing = JSON.parse(localStorage.getItem("cartItems")) || [];
  //       if (existing.find((item) => item.id === product.id)) {
  //         alert(`${product.name} added to cart!`);
  //         return setCartLoading(false);
  //       }

  //       const updated = [
  //         ...existing,
  //         {
  //           ...product,
  //           price: parseFloat(product.newPrice.replace("$", "")),
  //           quantity: 1,
  //           image: product.imageUrl, // أضف هذا السطر
  //         },
  //       ];
  //       localStorage.setItem("cartItems", JSON.stringify(updated));
  //       alert(`${product.name} added to cart!`);
  //       setCartLoading(false);
  //     }, 200);
  //   },
  //   [cartLoading]
  // );

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (
      selectedCategoryAndChildrenIds &&
      selectedCategoryAndChildrenIds.length > 0
    ) {
      const allCategoryIds = [
        selectedCategoryAndChildrenIds[0],
        ...subcategoryIds,
      ].map(Number);
      result = result.filter((p) =>
        allCategoryIds.includes(Number(p.categoryId))
      );
    }

    if (selectedBrandIds && selectedBrandIds.length > 0) {
      const brandIdSet = new Set(selectedBrandIds.map(Number));
      result = result.filter((p) => brandIdSet.has(Number(p.brandId)));
    }

    if (availabilityFilter?.instock && !availabilityFilter?.outofstock) {
      result = result.filter((p) => p.inStock);
    } else if (!availabilityFilter?.instock && availabilityFilter?.outofstock) {
      result = result.filter((p) => !p.inStock);
    }

    if (priceRange && priceRange.length === 2) {
      const [min, max] = priceRange;
      result = result.filter((p) => {
        const price = parseFloat(p.newPrice.replace("$", ""));
        return price >= min && price <= max;
      });
    }

    return result;
  }, [
    products,
    selectedCategoryAndChildrenIds,
    subcategoryIds,
    selectedBrandIds,
    availabilityFilter,
    priceRange,
  ]);

  // Apply sorting based on sortBy value
  const sortedProducts = useMemo(() => {
    let result = [...filteredProducts];

    switch (sortBy) {
      case "Featured":
        // Featured usually maintains default order or uses a "featured" flag
        break;
      case "Best Selling":
        // Assuming we track sales in the future, for now using reviews as proxy
        result.sort((a, b) => b.reviews - a.reviews);
        break;
      case "Alphabetically, A-Z":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "Alphabetically, Z-A":
        result.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "Price, low to high":
        result.sort((a, b) => {
          const priceA = parseFloat(a.newPrice.replace("$", ""));
          const priceB = parseFloat(b.newPrice.replace("$", ""));
          return priceA - priceB;
        });
        break;
      case "Price, high to low":
        result.sort((a, b) => {
          const priceA = parseFloat(a.newPrice.replace("$", ""));
          const priceB = parseFloat(b.newPrice.replace("$", ""));
          return priceB - priceA;
        });
        break;
      case "Date, old to new":
        result.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        break;
      case "Date, new to old":
        result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      default:
        // Default sorting logic
        break;
    }

    return result;
  }, [filteredProducts, sortBy]);

  const displayedProducts = useMemo(() => {
    return sortedProducts.slice(0, productsToShow); // 👈 Use sortedProducts instead of filteredProducts
  }, [sortedProducts, productsToShow]);

  const renderStars = (reviews) =>
    Array.from({ length: 5 }, (_, i) => (
      <i
        key={i}
        className={`fas fa-star`}
        style={{ color: i < reviews ? "gold" : "gray" }}
      />
    ));

  if (subcategoriesLoading || loading) return <p>Loading products...</p>;
  if (error) return <p>Error loading products: {error}</p>;
  if (!sortedProducts.length) return <p>No products found for this filter.</p>;

  return (
    <div className="grid-products grid-view-items">
      <div className={` row col-row product-options ${gridClass}`}>
        {displayedProducts.map((product) => (
          <div className="item col-item" key={product.id}>
            <div className="product-box">
              <div className="product-image">
                <Link
                  to={`/product/${product.url_key || product.id}`}
                  className="product-img rounded-3"
                >
                  <img
                    className="blur-up lazyload"
                    src={product.imageUrl}
                    alt={product.name}
                    width="625"
                    height="808"
                  />
                </Link>
                <div className="product-labels">
                  <span className="lbl on-sale">Sale</span>
                </div>
                <div className="button-set style1">
                  {/* <button
                    className="btn-icon addtocart"
                    // onClick={() => addToCart(product)}
                    // disabled={cartLoading}
                    title="Add to Cart"
                  >
                    <i className="fa-solid fa-cart-plus"></i>
                    <span className="text">Add to Cart</span>
                  </button> */}
                  <Link
                    to={`/product/${product.url_key || product.id}`}
                    className="btn-icon quickview"
                  >
                    <i className="fa-solid fa-eye"></i>
                    <span className="text">Quick View</span>
                  </Link>
                  <Link
                    href="#"
                    className="btn-icon wishlist"
                    onClick={(e) => handleAddToWishlist(e, product)}
                  >
                    <i className="fa-solid fa-heart"></i>
                    <span className="text">Add To Wishlist</span>
                  </Link>
                  {/* <Link href="compare-style2.html" className="btn-icon compare">
                    <i className="fa-solid fa-code-compare"></i>
                    <span className="text">Add to Compare</span>
                  </Link> */}
                </div>
              </div>

              <div className="product-details">
                <div className="product-name">
                  <Link to={`/product/${product.url_key}`}>{product.name}</Link>
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
