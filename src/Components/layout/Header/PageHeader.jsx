import React from "react";
import { Link } from "react-router-dom";

export default function PageHeader({ title, middleBreadcrumb }) {
  return (
    <div className="page-header text-center">
      <div className="container">
        <div className="row">
          <div className="col-12 col-sm-12 col-md-12 col-lg-12 d-flex justify-content-between align-items-center">
            <div className="main-title-pages">{title}</div>
            <div className="breadcrumbs">
              <Link to={"/"} title="Back to the home page">
                Home
              </Link>
              {middleBreadcrumb && (
                <>
                  <i className="fa-solid fa-angle-right me-2 ms-2"></i>
                  <span className="title">{middleBreadcrumb}</span>
                </>
              )}
              <i className="fa-solid fa-angle-right me-2 ms-2"></i>
              <span className="main-title fw-bold">{title}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
