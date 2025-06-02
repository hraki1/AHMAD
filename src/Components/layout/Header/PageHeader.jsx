import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function PageHeader({ title, middleBreadcrumb, hideHome }) {
  const { t } = useTranslation();

  return (
    <div className="page-header text-center">
      <div className="container">
        <div className="row">
          <div className="col-12 col-sm-12 col-md-12 col-lg-12 d-flex justify-content-between align-items-center">
            <div className="main-title-pages">{t(title)}</div>
            <div className="breadcrumbs">
              {!hideHome && (
                <>
                  <Link to="/" title={t("BackToHome")}>
                    {t("Home")}
                  </Link>
                  <i className="fa-solid fa-angle-right mx-2 "></i>
                </>
              )}
              {middleBreadcrumb && (
                <>
                  <span className="title">{t(middleBreadcrumb)}</span>
                  <i className="fa-solid fa-angle-right mx-2 "></i>
                </>
              )}
              <span className="main-title fw-bold">{t(title)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
