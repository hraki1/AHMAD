import React, { useState } from "react";
import Description from "./Description";
import AdditionalInformation from "./AdditionalInformation";
import SizeChart from "./SizeChart";
import ShippingReturn from "./ShippingReturn";
import ReviewSection from "./ReviewSection";
import { useTranslation } from "react-i18next";
export default function Product() {
  const [activeTab, setActiveTab] = useState("description");
  const { t } = useTranslation();
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="container">
      <div className="tabs-listing section pb-0">
<ul className="product-tabs style2 list-unstyled d-flex flex-wrap justify-content-center gap-2 mb-4">
  <li
    className={`tablink nav-item ${activeTab === "description" ? "active" : ""} mb-3`}
    onClick={() => handleTabClick("description")}
    style={{ cursor: "pointer" }}
  >
    <span className="nav-link text-center px-3 py-2">
      {t(`Description`)}
    </span>
  </li>

  <li
    className={`tablink nav-item ${activeTab === "additionalInformation" ? "active" : ""} mb-3`}
    onClick={() => handleTabClick("additionalInformation")}
    style={{ cursor: "pointer" }}
  >
    <span className="nav-link text-center px-3 py-2">
      {t(`product.Additional_Information`)}
    </span>
  </li>

  <li
    className={`tablink nav-item ${activeTab === "sizeChart" ? "active" : ""} mb-3`}
    onClick={() => handleTabClick("sizeChart")}
    style={{ cursor: "pointer" }}
  >
    <span className="nav-link text-center px-3 py-2">
      {t(`product.Size_Chart`)}
    </span>
  </li>

  <li
    className={`tablink nav-item ${activeTab === "shippingReturn" ? "active" : ""} mb-3`}
    onClick={() => handleTabClick("shippingReturn")}
    style={{ cursor: "pointer" }}
  >
    <span className="nav-link text-center px-3 py-2">
      {t(`product.Shipping`)}
    </span>
  </li>

  <li
    className={`tablink nav-item ${activeTab === "reviews" ? "active" : ""} mb-3`}
    onClick={() => handleTabClick("reviews")}
    style={{ cursor: "pointer" }}
  >
    <span className="nav-link text-center px-3 py-2">
      {t(`Reviews`)}
    </span>
  </li>
</ul>


        <div className="tab-content">
          {activeTab === "description" && (
            <div className="tab-pane d-block">
              {" "}
              <Description />
            </div>
          )}
          {activeTab === "additionalInformation" && (
            <div className="tab-pane d-block">
              <AdditionalInformation />
            </div>
          )}
          {activeTab === "sizeChart" && (
            <div className="tab-pane d-block">
              <SizeChart />
            </div>
          )}
          {activeTab === "shippingReturn" && (
            <div className="tab-pane d-block">
              <ShippingReturn />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
