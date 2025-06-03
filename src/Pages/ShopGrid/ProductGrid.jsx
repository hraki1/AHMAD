import React, { useState, useEffect, useMemo, useCallback } from "react";
import { fetchAllProducts } from "../../utils/fetchAllProducts";
import useFetchCategories from "../Hooks/useFetchCategories";
import { useSearchParams } from "react-router-dom";
import { useWishlist } from "../../Context/WishlistContext";
import ProductItem from "./ProductItem";
import { useTranslation } from "react-i18next";
import Spinner from "../../Components/UI/SpinnerLoading";
import { Toaster, toast } from "react-hot-toast";
const ProductGrid = ({
  selectedCategoryAndChildrenIds: propCategoryAndChildrenIds = null,
  selectedBrandIds = [],
  availabilityFilter,
  priceRange = [0, 1000],
  gridClass = "",
  productsToShow = 20,
  sortBy = "Featured",
}) => {
  const [products, setProducts] = useState([]);
  const [subcategoryIds, setSubcategoryIds] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { addToWishlist } = useWishlist();
  const [searchParams] = useSearchParams();
  const categoryId = searchParams.get("category");
  const subcategoryId = searchParams.get("subcategory");
  const { t } = useTranslation();
  const [selectedCategoryAndChildrenIds, setSelectedCategoryAndChildrenIds] =
    useState(() => {
      if (categoryId) {
        return [parseInt(categoryId)];
      }
      return propCategoryAndChildrenIds || null;
    });
  useEffect(() => {
    if (categoryId) {
      setSelectedCategoryAndChildrenIds([parseInt(categoryId)]);
    } else {
      setSelectedCategoryAndChildrenIds(propCategoryAndChildrenIds || null);
    }
  }, [categoryId, propCategoryAndChildrenIds]);

  const {
    categories: subcategories,
    loading: subcategoriesLoading,
    error: subcategoriesError,
  } = useFetchCategories(selectedCategoryAndChildrenIds?.[0] || null);

  useEffect(() => {
    if (
      !subcategoriesLoading &&
      !subcategoriesError &&
      selectedCategoryAndChildrenIds?.[0] &&
      subcategories
    ) {
      setSubcategoryIds(subcategories.map((sub) => sub.id));
    } else {
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
  }, [availabilityFilter]);

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
      url_key: product.url_key || "Undefiend",
    });
    toast.success(`${product.name} ${t(`product.Add_Wishlist`)}98`);
  };

  const handleColorChange = useCallback((productId, imgSrc) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === productId ? { ...p, imageUrl: imgSrc } : p))
    );
  }, []);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (selectedCategoryAndChildrenIds?.length > 0) {
      let categoryFilterIds = [];

      if (subcategoryId) {
        categoryFilterIds = [parseInt(subcategoryId)];
      } else {
        categoryFilterIds = [
          ...selectedCategoryAndChildrenIds,
          ...subcategoryIds,
        ].map(Number);
      }

      result = result.filter((p) =>
        categoryFilterIds.includes(Number(p.categoryId))
      );
    }

    if (selectedBrandIds.length > 0) {
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

  const sortedProducts = useMemo(() => {
    let result = [...filteredProducts];

    switch (sortBy) {
      case "Featured":
        break;
      case "Best Selling":
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
        break;
    }

    return result;
  }, [filteredProducts, sortBy]);

  const displayedProducts = useMemo(() => {
    return sortedProducts.slice(0, productsToShow);
  }, [sortedProducts, productsToShow]);

  console.log(products);

  if (subcategoriesLoading || loading)
    return (
      <div>
        <Spinner />
      </div>
    );
  if (error) return <p>{error}</p>;
  if (!sortedProducts.length) return <p>{t(`ShopGridCate.No_filter`)}.</p>;

  return (
    <>
      <Toaster />
      <div className="grid-products grid-view-items">
        <div className={`row col-row product-options ${gridClass}`}>
          {displayedProducts.map((product) => (
            <ProductItem
              key={product.id}
              product={product}
              onAddToWishList={handleAddToWishlist}
              handleColorChange={handleColorChange}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default ProductGrid;
