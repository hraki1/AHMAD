import React, { useState } from "react";
import { Link } from "react-router-dom";
import Description from "./Description";
import AdditionalInformation from "./AdditionalInformation";
import SizeChart from "./SizeChart";
import ShippingReturn from "./ShippingReturn";
import ReviewSection from "./ReviewSection";

export default function Product() {
  const [activeTab, setActiveTab] = useState("description");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="container">
      <div className="tabs-listing section pb-0">
        <ul className="product-tabs style2 list-unstyled d-flex-wrap d-flex-justify-center d-none d-md-flex">
          <li
            className={`tablink ${activeTab === "description" ? "active" : ""}`}
            onClick={() => handleTabClick("description")}
          >
            <span className="tablink">Description</span>
          </li>
          <li
            className={`tablink ${
              activeTab === "additionalInformation" ? "active" : ""
            }`}
            onClick={() => handleTabClick("additionalInformation")}
          >
            <span className="tablink">Additional Information</span>
          </li>
          <li
            className={`tablink ${activeTab === "sizeChart" ? "active" : ""}`}
            onClick={() => handleTabClick("sizeChart")}
          >
            <span className="tablink">Size Chart</span>
          </li>
          <li
            className={`tablink ${
              activeTab === "shippingReturn" ? "active" : ""
            }`}
            onClick={() => handleTabClick("shippingReturn")}
          >
            <span className="tablink">Shipping &amp; Return</span>
          </li>
          <li
            className={`tablink ${activeTab === "reviews" ? "active" : ""}`}
            onClick={() => handleTabClick("reviews")}
          >
            <span className="tablink">Reviews</span>
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
          {activeTab === "reviews" && (
            <div className="tab-pane d-block">
              <ReviewSection />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
