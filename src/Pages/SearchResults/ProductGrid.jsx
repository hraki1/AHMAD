import React, { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { fetchAllProducts } from "../../utils/fetchAllProducts";
import ProductItem from "./ProductItem";
import { useWishlist } from "../../Context/WishlistContext";
import Spinner from "../../Components/UI/SpinnerLoading";

const SearchPage = ({ gridClass = "" }) => {
  const [searchParams] = useSearchParams();
  const searchTerm = searchParams.get("query")?.toLowerCase().trim() || "";
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { addToWishlist } = useWishlist();

  useEffect(() => {
    const controller = new AbortController();

    const loadProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const pages = [1, 2, 3, 4, 5];
        const allProducts = await fetchAllProducts(
          pages,
          null,
          controller.signal,
          setLoading,
          setError
        );

        const mappedProducts = allProducts.map(
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
            created_at,
          }) => ({
            id,
            name,
            oldPrice: `$${(old_price || price + 20).toFixed(2)}`,
            newPrice: `$${price.toFixed(2)}`,
            price,
            imageUrl: primaryImg || "",
            categoryId,
            brandId,
            reviews: reviewsCount || 3,
            colors: variants.map(({ title, src }) => ({
              title,
              imgSrc: src,
            })),
            url_key,
            inStock,
            createdAt: created_at || new Date().toISOString(),
          })
        );

        setProducts(mappedProducts);
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
  }, []);

  const filteredProducts = useMemo(() => {
    if (!searchTerm) return [];
    return products.filter((p) => p.name.toLowerCase().includes(searchTerm));
  }, [products, searchTerm]);

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

  const handleColorChange = (productId, imgSrc) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === productId ? { ...p, imageUrl: imgSrc } : p))
    );
  };

  if (loading) return <Spinner />;
  if (error) return <p>Error loading products: {error}</p>;
  if (!filteredProducts.length)
    return (
      <p className="fs-4 text-center text-danger">
        No results for "{searchTerm}"
      </p>
    );

  return (
    <div className="grid-products grid-view-items">
      <h2>Search Results for: "{searchTerm}"</h2>
      <div className={`row col-row product-options ${gridClass}`}>
        {filteredProducts.map((product) => (
          <ProductItem
            key={product.id}
            product={product}
            onAddToWishList={handleAddToWishlist}
            handleColorChange={handleColorChange}
          />
        ))}
      </div>
    </div>
  );
};

export default SearchPage;
