import { useWishlist } from "../../Context/WishlistContext";
import { useState } from "react";
import QuickViewModal from "../ProductModal/QuickViewModal";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AddToCart } from "../API/AddToCart";
import { toast } from "react-toastify";
import { useCart } from "../../Context/CartContext";
import { useTranslation } from "react-i18next";

const Wishlist = () => {
  const { wishlistItems, removeFromWishlist } = useWishlist();
  const { updateCart } = useCart();

  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [addToCartStatus, setAddToCartStatus] = useState({
    loading: false,
    productId: null,
    message: "",
    error: null,
  });

  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  console.log(wishlistItems);

  const handleRemoveItem = (productId, e) => {
    e.preventDefault();
    removeFromWishlist(productId);
  };

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
  return (
    <div className="container">
      <div
        className="alert alert-success py-2 alert-dismissible fade show cart-alert"
        role="alert"
      >
        {t(`There`)}{" "}
        <span className="text-primary fw-600">{wishlistItems.length}</span>{" "}
        {t(`products_wishlist`)}
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="alert"
          aria-label="Close"
        ></button>
      </div>

      <form action="#" method="post">
        <div className="wishlist-table table-content table-responsive">
          <table className="table align-middle text-nowrap table-bordered">
            <thead className="thead-bg">
              <tr>
                <th className="product-name text-start" colSpan="2">
                  {t(`Product`)}
                </th>
                <th className="product-price text-center">{t(`Price`)}</th>
                <th className="stock-status text-center">
                  {t(`Stock_Status`)}
                </th>
                <th className="product-subtotal text-center">
                  {t(`product.Add_Cart`)}
                </th>
              </tr>
            </thead>
            <tbody>
              {wishlistItems.map((product) => (
                <tr key={product.id}>
                  <td className="product-thumbnail">
                    <Link
                      to={`/product/${product.url_key}`}
                      className="product-img"
                    >
                      <img
                        className="image rounded-0"
                        src={product.imgSrc}
                        alt={product.name}
                        title={product.name}
                        width="120"
                        height="170"
                      />
                    </Link>
                  </td>
                  <td className="product-details">
                    <p className="product-name mb-0">{product.name}</p>
                    <p className="variant-cart my-1 text-muted">
                      {product.variant}
                    </p>
                    <button
                      type="button"
                      className="btn remove-icon close-btn position-static me-3"
                      onClick={(e) => handleRemoveItem(product.id, e)}
                    >
                      <i className="fa-solid fa-xmark"></i>
                    </button>
                  </td>
                  <td className="product-price text-center">
                    <span className="amount fw-500">
                      ${product.price?.toFixed(2)}
                    </span>
                  </td>
                  <td className="product-stock text-center">
                    <span
                      className={
                        product.stock?.toLowerCase() === "in stock"
                          ? "text-in-stock"
                          : "text-out-stock"
                      }
                    >
                      {product.stock}
                    </span>
                  </td>
                  <td className="product-action text-center">
                    <button
                      type="button"
                      className={`btn btn-secondary proceed-to-checkout text-nowrap ${
                        product.stock?.toLowerCase() !== "in stock"
                          ? "soldOutBtn disabled"
                          : ""
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
                          {t(`Adding`)}
                        </>
                      ) : product.stock?.toLowerCase() !== "in stock" ? (
                        t(`product.Out_Stock`)
                      ) : (
                        t(`product.Add_Cart`)
                      )}
                    </button>
                    {addToCartStatus.productId === product.id &&
                      addToCartStatus.message && (
                        <div
                          className={`mt-2 alert ${
                            addToCartStatus.error
                              ? "alert-danger"
                              : "alert-success"
                          } wishlist-alert-style`}
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
      </form>

      <QuickViewModal
        show={showModal}
        onHide={() => setShowModal(false)}
        product={selectedProduct}
      />
    </div>
  );
};

export default Wishlist;
