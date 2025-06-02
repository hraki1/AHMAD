import React, { useState } from "react";
import { useWishlist } from "../../Context/WishlistContext";
import { useCart } from "../../Context/CartContext";
import { AddToCart } from "../API/AddToCart";
import { toast } from "react-toastify";
import { useNavigate, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import QuickViewModal from "../ProductModal/QuickViewModal";
import { useTranslation } from "react-i18next";
const Wishlist = () => {
  const { t } = useTranslation();
  const { wishlistItems, removeFromWishlist } = useWishlist();
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [addToCartStatus, setAddToCartStatus] = useState({
    loading: false,
    productId: null,
    message: "",
    error: null,
  });
  const navigate = useNavigate();
  const location = useLocation();
  const { updateCart } = useCart();

  const handleAddToCart = async (product) => {
    const productId = product.id || product.product_id;
    if (!productId) {
      setAddToCartStatus({
        loading: false,
        productId: null,
        message: "Product ID is missing",
        error: true,
      });
      toast.error("Product ID is missing");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      setAddToCartStatus({
        loading: false,
        productId: null,
        message: "You should Sign In",
        error: true,
      });
      toast.error("You should Sign In");
      navigate(`/LogIn?redirect=${location.pathname}`);
      return;
    }

    setAddToCartStatus({
      loading: true,
      productId,
      message: "",
      error: null,
    });

    const result = await AddToCart(productId, 1, product.name);

    setAddToCartStatus({
      loading: false,
      productId,
      message: result.message,
      error: !result.success,
    });

    if (result.success) {
      toast.success(result.message);
      await updateCart();
    } else {
      toast.error(result.message || "Failed to add item.");
    }
  };

  const handleQuickView = (product, e) => {
    e.preventDefault();
    setSelectedProduct(product);
    setShowModal(true);
  };

  const handleRemoveItem = (productId, e) => {
    e.preventDefault();
    removeFromWishlist(productId);
  };

  return (
    <div className="h-100" id="wishlist">
      <div className="orders-card mt-0 h-100">
        <div className="top-sec d-flex justify-content-between mb-4">
          <div className="title-account mb-0">{t(`My_Wishlist`)}</div>
          <div className="alert alert-success py-2 mb-0">
            {t(`There`)}{" "}
            <span className="text-primary fw-600">{wishlistItems.length}</span>{" "}
            {t(`products_wishlist`)}
          </div>
        </div>

        <div className="table-bottom-brd table-responsive">
          <table className="table align-middle text-center order-table">
            <thead>
              <tr className="table-head text-nowrap">
                <th scope="col">{t(`Image`)}</th>
                <th scope="col">{t(`Product_ID`)}</th>
                <th scope="col">{t(`orderCard.productDetails`)}</th>
                <th scope="col">{t(`Price`)}</th>
                <th scope="col">{t(`Stock_Status`)}</th>
                <th scope="col">{t(`Action`)}</th>
              </tr>
            </thead>
            <tbody>
              {wishlistItems.map((product) => (
                <tr key={product.id}>
                  <td>
                    <img
                      className="blur-up lazyload"
                      src={product.imgSrc}
                      alt={product.name}
                      width="50"
                    />
                  </td>
                  <td>
                    <span className="id">#{product.id}</span>
                  </td>
                  <td>
                    <span className="name">{product.name}</span>
                    {product.variant && (
                      <p className="variant-cart my-1 text-muted small">
                        {product.variant}
                      </p>
                    )}
                  </td>
                  <td>
                    <span className="price fw-500">
                      ${product.price?.toFixed(2)}
                    </span>
                  </td>
                  <td>
                    <span
                      className={
                        product.stock?.toLowerCase() === "in stock"
                          ? "text-success"
                          : "text-danger"
                      }
                    >
                      {product.stock}
                    </span>
                  </td>
                  <td>
                    <div className="d-flex  align-items-center justify-content-around">
                      <button
                        type="button"
                        className={`btn btn-md text-nowrap mb-2 ${
                          product.stock?.toLowerCase() !== "in stock"
                            ? "btn-outline-secondary disabled"
                            : "btn-primary"
                        }`}
                        onClick={() => handleAddToCart(product)}
                        disabled={
                          product.stock?.toLowerCase() !== "in stock" ||
                          (addToCartStatus.loading &&
                            addToCartStatus.productId === product.id)
                        }
                      >
                        {addToCartStatus.loading &&
                        addToCartStatus.productId === product.id ? (
                          <>
                            <i className="fa-solid fa-spinner fa-spin me-2"></i>
                            Adding
                          </>
                        ) : product.stock?.toLowerCase() !== "in stock" ? (
                          t(`product.Out_Stock`)
                        ) : (
                          t(`product.Add_Cart`)
                        )}
                      </button>
                      <button
                        type="button"
                        className="btn btn-link text-danger mb-2"
                        onClick={(e) => handleRemoveItem(product.id, e)}
                      >
                        <i className="fa-solid fa-xmark "></i>
                      </button>
                    </div>
                    {addToCartStatus.productId === product.id &&
                      addToCartStatus.message && (
                        <div
                          className={`mt-1 small ${
                            addToCartStatus.error
                              ? "text-danger"
                              : "text-success"
                          }`}
                        >
                          {addToCartStatus.message}
                        </div>
                      )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
