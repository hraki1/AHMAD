import React from "react";

const PortfolioItem = ({ imgSrc, title, category }) => {
  return (
    <div
      className={`col-6 col-sm-6 col-md-4 col-lg-3 col-item ${category} portfolio-masonary`}
    >
      <a
        href="#portfolio-modal"
        className="portfolio-item position-relative overflow-hidden overlay d-block portfolio-popup zoomscal-hov"
        data-bs-toggle="modal"
        data-bs-target="#portfolio_modal"
      >
        <div className="portfolio-img zoom-scal rounded-0">
          <img
            className="rounded-0 blur-up lazyload"
            data-src={imgSrc}
            src={imgSrc}
            alt="portfolio"
            title=""
            width="450"
            height="465"
          />
        </div>
        <div className="caption rounded-0">
          <h3 className="project-title-prot">{title}</h3>
          <p className="btn-outline-light">View Details</p>
        </div>
      </a>
    </div>
  );
};

export default PortfolioItem;
