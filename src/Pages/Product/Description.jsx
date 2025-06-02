import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import useFetchOneProduct from "../Hooks/useFetchOneProduct";
import Spinner from "../../Components/UI/SpinnerLoading";
import { useTranslation } from "react-i18next";
const Description = () => {
  const { t } = useTranslation();
  const { url_key } = useParams();
  const { product, loading, error } = useFetchOneProduct(url_key);
  const [activeImage, setActiveImage] = useState(null); // ممكن نخليه لو حبيت تغير الصورة لاحقاً

  if (loading) {
    return (
      <div className="loading-spinner">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-alert">
        Error: {error}
        <button onClick={() => window.location.reload()}>{t(`Retry`)}</button>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="empty-state">
        {t(`product.Product_not_found`)}{" "}
        <Link to="/products">{t(`product.Back_to_products`)}</Link>
      </div>
    );
  }

  const productImages = product.images || [];

  const imageToDisplay =
    activeImage ||
    (productImages.length > 0
      ? productImages[0]?.origin_image || productImages[0]
      : "path_to_default_image.jpg");

  return (
    <div className="pt-5">
      {/* Description */}
      <div
        className="tabs-ac-style d-md-none active main-title-2"
        id="description"
      >
        {t(`Description`)}
      </div>
      <div id="description" className="tab-content">
        <div className="product-description">
          <div className="row">
            <div className="col-12 col-sm-12 col-md-8 col-lg-8">
              <div className="desc-content">
                {product.description.description}.
              </div>
              <div className="mb-3 main-title-2 main">{t(`Features`)}</div>
              <ol>
                <li className="desc-content mb-2">
                  {t(`product.High_quality`)}
                </li>
                <li className="desc-content mb-2">
                  {t(`product.This_cardigan`)}
                </li>
                <li className="desc-content mb-2">{t(`product.It_can`)} </li>
                <li className="desc-content mb-4">
                  {t(`product.Light_weight`)}
                </li>
              </ol>
            </div>

            <div className="col-12 col-sm-12 col-md-4 col-lg-4">
              <img
                src={imageToDisplay}
                alt="product detail"
                width="600"
                height="600"
              />
            </div>
          </div>
        </div>
      </div>
      {/* End Description */}
    </div>
  );
};

export default Description;
