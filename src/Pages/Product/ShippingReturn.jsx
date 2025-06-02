import React from "react";
import { useTranslation } from "react-i18next";

const ShippingReturn = () => {
  const { t } = useTranslation();

  return (
    <div className="pt-5">
      <div
        className="tabs-ac-style d-md-none main-title-2"
        id="shipping-return"
      >
        {t("shippingReturn.title")}
      </div>
      <div id="shipping-return" className="tab-content">
        <h4>{t("shippingReturn.title")}</h4>
        <ul className="checkmark-info">
          <li className="desc-content mb-2">
            {t("shippingReturn.list.dispatch")}
          </li>
          <li className="desc-content mb-2">
            {t("shippingReturn.list.warranty")}
          </li>
          <li className="desc-content mb-2">
            {t("shippingReturn.list.freeShipping")}
          </li>
          <li className="desc-content mb-2">
            {t("shippingReturn.list.deliveryTime")}
          </li>
          <li className="desc-content mb-2">{t("shippingReturn.list.cod")}</li>
          <li className="desc-content mb-4">
            {t("shippingReturn.list.returns")}
          </li>
        </ul>

        <div className="main-title-2 mb-2">
          {t("shippingReturn.freeReturnsTitle")}
        </div>
        <div className="desc-content">
          {t("shippingReturn.freeReturnsDesc")}
        </div>

        <div className="main-title-2 mb-2">
          {t("shippingReturn.specialFinancingTitle")}
        </div>
        <div>{t("shippingReturn.specialFinancingDesc")}</div>
      </div>
    </div>
  );
};

export default ShippingReturn;
