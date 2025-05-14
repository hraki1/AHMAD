import React from "react";
import useFetchOneProduct from "../Hooks/useFetchOneProduct";
import { useParams } from "react-router-dom";

const AdditionalInformation = () => {
  const { url_key } = useParams();
  const { product, loading, error } = useFetchOneProduct(url_key);

  if (loading) {
    return <p>Loading additional information...</p>;
  }

  if (error) {
    return <p>Error loading additional information: {error}</p>;
  }

  if (!product || !product.attributes || product.attributes.length === 0) {
    return (
      <div className="pt-5">
        <div
          className="tabs-ac-style d-md-none main-title-2"
          id="additionalInformation"
        >
          Additional Information
        </div>
        <div id="additionalInformation" className="tab-content">
          <div className="product-description">
            <p>No additional information available for this product.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-5">
      <div
        className="tabs-ac-style d-md-none main-title-2"
        id="additionalInformation"
      >
        Additional Information
      </div>
      <div id="additionalInformation" className="tab-content">
        <div className="product-description">
          <div className="row">
            <div className="col-12 col-sm-12 col-md-12 col-lg-12 mb-4 mb-md-0">
              <div className="table-responsive">
                <table className="table table-bordered align-middle table-part mb-0">
                  <tbody>
                    {product.attributes.map((attr, index) => (
                      <tr key={index}>
                        <th>{attr.attributeName}</th>
                        <td>{attr.optionText}</td>
                      </tr>
                    ))}
                    {/* يمكنك إضافة المزيد من المعلومات من كائن product هنا إذا لزم الأمر */}
                    {product.brand && (
                      <tr>
                        <th>Brand</th>
                        <td>{product.brand}</td>
                      </tr>
                    )}
                    {product.stock !== undefined && (
                      <tr>
                        <th>Availability</th>
                        <td>
                          {product.stock > 0 ? "In Stock" : "Out of Stock"}
                        </td>
                      </tr>
                    )}
                    {/* مثال لعرض اسم التصنيف */}
                    {product.category && product.category.name && (
                      <tr>
                        <th>Category</th>
                        <td>{product.category.name}</td>
                      </tr>
                    )}
                    {/* يمكنك إضافة أي معلومات أخرى من كائن product ترغب بعرضها */}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdditionalInformation;
