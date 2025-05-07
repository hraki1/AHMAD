import React, { useState, useEffect, useCallback } from "react";
import { fetchAllProducts } from "../../utils/fetchAllProducts";

const ProductGrid = ({ selectedCategoryId }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cartLoading, setCartLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    const loadProducts = async () => {
      setLoading(true);
      try {
        const pages = [1, 2, 3];
        const allProducts = await fetchAllProducts(
          pages,
          null,
          controller.signal
        );

        // هنا تأكد أن كل منتج عنده categoryId
        const mappedProducts = allProducts.map((product) => ({
          id: product.id,
          name: product.name,
          oldPrice: `$${(product.priceOld || product.price + 20).toFixed(2)}`,
          newPrice: `$${product.price.toFixed(2)}`,
          imageUrl: product.primaryImg || "",
          colors: product.variants.map((variant) => ({
            title: variant.title,
            imgSrc: variant.src,
          })),
          reviews: product.reviewsCount || 3,
          categoryId: product.categoryId, // <-- ضروري!
        }));

        setProducts(mappedProducts);
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error("Failed to load products:", error);
        }
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
    return () => controller.abort();
  }, []);

  const handleColorChange = useCallback((productId, imgSrc) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === productId ? { ...product, imageUrl: imgSrc } : product
      )
    );
  }, []);

  const addToCart = useCallback(
    (product) => {
      if (cartLoading) return;
      setCartLoading(true);

      setTimeout(() => {
        const existingCart =
          JSON.parse(localStorage.getItem("cartItems")) || [];

        const itemExists = existingCart.find((item) => item.id === product.id);
        if (itemExists) {
          alert("The item has already been added.");
          setCartLoading(false);
          return;
        }

        const numericPrice = parseFloat(product.newPrice.replace("$", ""));

        const updatedCart = [
          ...existingCart,
          {
            ...product,
            price: numericPrice,
            image: product.imageUrl,
            quantity: 1,
          },
        ];

        localStorage.setItem("cartItems", JSON.stringify(updatedCart));
        alert("✅ The item has been added successfully");
        setCartLoading(false);
      }, 200);
    },
    [cartLoading]
  );

  // فلترة المنتجات حسب الفئة
  const filteredProducts = selectedCategoryId
    ? products.filter((p) => p.categoryId === selectedCategoryId)
    : products;

  return (
    <div className="grid-products grid-view-items">
      <div className="row col-row product-options row-cols-lg-4 row-cols-md-3 row-cols-sm-3 row-cols-2">
        {loading ? (
          <p>Loading...</p>
        ) : filteredProducts.length === 0 ? (
          <p>لا يوجد منتجات لهذه الفئة</p>
        ) : (
          filteredProducts.map((product) => (
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
                      title={product.name}
                      width="625"
                      height="808"
                    />
                  </a>
                  <div className="product-labels">
                    <span className="lbl on-sale">Sale</span>
                  </div>
                  <div className="saleTime" data-countdown="2025/01/01"></div>
                  <div className="button-set style1">
                    <button
                      className="btn-icon addtocart"
                      onClick={() => addToCart(product)}
                      title="Add to Cart"
                      disabled={cartLoading}
                    >
                      <i className="fa-solid fa-cart-plus"></i>
                      <span className="text">Add to Cart</span>
                    </button>

                    <a
                      href="#quickview-modal"
                      className="btn-icon quickview quick-view-modal"
                      data-bs-toggle="modal"
                      data-bs-target="#quickview_modal"
                    >
                      <span
                        className="icon-wrap d-flex-justify-center h-100 w-100"
                        data-bs-toggle="tooltip"
                        data-bs-placement="left"
                        title="Quick View"
                      >
                        <i className="fa-solid fa-eye"></i>
                        <span className="text">Quick View</span>
                      </span>
                    </a>
                    <a
                      href="wishlist-style2.html"
                      className="btn-icon wishlist"
                      data-bs-toggle="tooltip"
                      data-bs-placement="left"
                      title="Add To Wishlist"
                    >
                      <i className="fa-solid fa-heart"></i>
                      <span className="text">Add To Wishlist</span>
                    </a>
                    <a
                      href="compare-style2.html"
                      className="btn-icon compare"
                      data-bs-toggle="tooltip"
                      data-bs-placement="left"
                      title="Add to Compare"
                    >
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
                    {[...Array(5)].map((_, i) => (
                      <i
                        key={i}
                        className={`fas fa-star ${
                          i < product.reviews ? "active" : "inactive"
                        }`}
                        style={{
                          color: i < product.reviews ? "gold" : "gray",
                        }}
                      ></i>
                    ))}
                    <span className="caption hidden ms-1">
                      {product.reviews} Reviews
                    </span>
                  </div>
                  <ul className="variants-clr swatches">
                    {product.colors.map((color, index) => (
                      <li
                        className="swatch medium radius"
                        key={index}
                        onClick={() =>
                          handleColorChange(product.id, color.imgSrc)
                        }
                      >
                        <span
                          className="swatchLbl"
                          data-bs-toggle="tooltip"
                          data-bs-placement="top"
                          title={color.title}
                        >
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
          ))
        )}
      </div>
    </div>
  );
};

export default ProductGrid;
