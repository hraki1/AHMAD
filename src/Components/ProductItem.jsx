import React, { useEffect, useState } from "react";
import { fetchAllProducts } from "../utils/fetchAllProducts";
import { Link } from "react-router-dom";
import Button from "./common/Button";
import { useTranslation } from "react-i18next";

export default function ProductItem() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { t } = useTranslation();

  useEffect(() => {
    const controller = new AbortController();
    const loadProducts = async () => {
      const data = await fetchAllProducts(
        [1],
        null,
        controller.signal,
        setLoading,
        setError
      );

      const updatedData = data.slice(0, 4).map((product) => ({
        ...product,
        selectedImage: product.primaryImg,
        variants: [
          {
            src: product.primaryImg,
            title: "Default",
          },
          ...product.variants,
        ],
      }));

      setProducts(updatedData);
    };

    loadProducts();

    return () => controller.abort();
  }, []);

  const handleVariantClick = (productIndex, image) => {
    setProducts((prev) =>
      prev.map((item, index) =>
        index === productIndex ? { ...item, selectedImage: image } : item
      )
    );
  };

  return (
    <section className="section product-slider pb-0 mb-5">
      <div className="container">
        <div className="section-header">
          <div className="main-title-pages">{t(`You_may_also_like`)}</div>
        </div>
        <div className="product-slider-4items gp10 arwOut5 grid-products">
          <div className="row">
            {loading && <p>Loading...</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}
            {products.map((product, index) => (
              <div
                key={index}
                className="col-md-3 col-sm-6 col-12 mb-5"
                style={{ position: "relative" }}
              >
                <div className="product-box">
                  <div className="product-image">
                    <Link
                      to={`/product/${product.url_key || product.id}`}
                      className="product-img rounded-3"
                    >
                      <img
                        className="blur-up lazyload"
                        src={product.selectedImage}
                        alt="Product"
                        title="Product"
                        width="625"
                        height="808"
                      />
                    </Link>
                    <div className="product-labels productes-labels-imp">
                      <span className="lbl on-sale">Sale</span>
                    </div>
                    <div
                      className="saleTime"
                      data-countdown={product.countdown}
                    ></div>
                    <div className="button-set style1">
                      {/* ... أزرار الشراء ... */}
                    </div>
                  </div>
                  <div className="product-details">
                    <div className="product-name mt-2 font-weight-bold">
                      {product.name}
                    </div>
                    <div className="product-price">
                      <span className="price old-price">
                        ${product.old_price}
                      </span>
                      <span className="price">${product.price}</span>
                    </div>
                    <div className="product-review">
                      {[...Array(5)].map((_, i) => (
                        <i
                          key={i}
                          className={`fas fa-star ${
                            i < product.rating ? "filled" : ""
                          }`}
                          style={{ color: "gold" }}
                        ></i>
                      ))}
                      <span className="caption hidden ms-1">
                        {product.reviewsCount} Reviews
                      </span>
                    </div>
                    <ul className="variants-clr swatches">
                      {product.variants.map((variant, vIndex) => (
                        <li key={vIndex} className="swatch medium radius">
                          <span
                            className="swatchLbl"
                            title={variant.title}
                            style={{ cursor: "pointer" }}
                            onClick={() =>
                              handleVariantClick(index, variant.src)
                            }
                          >
                            <img
                              src={variant.src}
                              alt={`variant-${vIndex}`}
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
            <div className="view-collection text-center mt-4 mt-md-5">
              <Button
                label={t("view_collection")}
                to="/ShopGrid"
                primary={false}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
