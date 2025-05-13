import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import useFetchOneProduct from "../../utils/useFetchOneProduct";

const Description = () => {
  const { url_key } = useParams();
  const { product, loading, error } = useFetchOneProduct(url_key);
  const [activeImage, setActiveImage] = useState(null); // ممكن نخليه لو حبيت تغير الصورة لاحقاً

  if (loading) {
    return <div className="loading-spinner">Loading...</div>;
  }

  if (error) {
    return (
      <div className="error-alert">
        Error: {error}
        <button onClick={() => window.location.reload()}>Retry</button>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="empty-state">
        Product not found. <Link to="/products">Back to products</Link>
      </div>
    );
  }

  const productImages = product.images || [];

  // نعرض فقط الصورة الرئيسية (أول صورة أو الصورة النشطة)
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
        Description
      </div>
      <div id="description" className="tab-content">
        <div className="product-description">
          <div className="row">
            <div className="col-12 col-sm-12 col-md-8 col-lg-8">
              <div className="desc-content">
                {product.description.description}.
              </div>
              <div className="mb-3 main-title-2 main">Features</div>
              <ol>
                <li className="desc-content mb-2">
                  High quality fabric, very comfortable to touch and wear.
                </li>
                <li className="desc-content mb-2">
                  This cardigan sweater is cute for no reason, perfect for
                  travel and casual.
                </li>
                <li className="desc-content mb-2">
                  It can tie in front-is forgiving to your belly or tie behind.
                </li>
                <li className="desc-content mb-4">
                  Light weight and perfect for layering.
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
