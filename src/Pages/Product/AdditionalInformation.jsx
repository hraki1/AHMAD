import React from "react";

const AdditionalInformation = () => {
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
                    <tr>
                      <th>Color</th>
                      <td>Black, White, Blue, Red, Gray</td>
                    </tr>
                    <tr>
                      <th>Product Dimensions</th>
                      <td>15 x 15 x 3 cm; 250 Grams</td>
                    </tr>
                    <tr>
                      <th>Date First Available</th>
                      <td>14 May 2023</td>
                    </tr>
                    <tr>
                      <th>Manufacturer</th>
                      <td>Fashion and Retail Limited</td>
                    </tr>
                    <tr>
                      <th>Department</th>
                      <td>Men Shirt</td>
                    </tr>
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
