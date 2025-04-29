import React from "react";
import imgdesc from "../../assets/images/products/addtocart-modal.jpg";
const Description = () => {
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
                There are many variations of passages of Lorem Ipsum available,
                but the majority have suffered alteration in some form, by
                injected humour, or randomised words which don't look even
                slightly believable.
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
