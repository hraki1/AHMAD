import React from "react";
import imgdesc from "../../assets/images/products/1.jpg";
import { Link, useParams } from "react-router-dom";
import useFetchOneProduct from "../../utils/useFetchOneProduct";
const Description = () => {
  const { url_key } = useParams();
  const { product, loading, error } = useFetchOneProduct(url_key);
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
              <ol className="">
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
              <div className="desc-content">
                The standard chunk of Lorem Ipsum used since the 1500s is
                reproduced below for those interested. Sections 1.10.32 and
                1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also
                reproduced in their exact original form, accompanied by English
                versions from the 1914 translation by H. Rackham.
              </div>
            </div>

            <div className="col-12 col-sm-12 col-md-4 col-lg-4">
              <img
                src={imgdesc}
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
