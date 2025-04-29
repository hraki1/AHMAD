import React, { useState } from "react";
import modalone from "../../assets/images/portfolio/portfolio1.jpg";

const CarouselItem = ({ src, alt, width, height, isActive }) => (
  <div
    className={`carousel-item ${isActive ? "active" : ""}`}
    data-bs-interval={10000}
  >
    <img
      className="rounded-0 blur-up lazyload w-100"
      src={src}
      alt={alt}
      title=""
      width={width}
      height={height}
    />
  </div>
);

export default function PortfolioModal() {
  const [activeSlide, setActiveSlide] = useState(0);

  const handleSlideChange = (index) => {
    setActiveSlide(index);
  };

  const images = [modalone, modalone];

  return (
    <div>
      <div
        className="portfolio-modal modal fade"
        id="portfolio_modal"
        tabIndex={-1}
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-body">
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
              <div className="main-title-prot-card border-bottom mb-4 pb-3">
                Project Title
              </div>
              <div className="row portfolio-inner clearfix">
                <div className="col-12 col-md-6 portfolio-img mb-4 mb-md-0 text-center">
                  <div
                    id="carouselPortfolio"
                    className="carousel carousel-dark slide"
                    data-bs-ride="carousel"
                  >
                    <div className="carousel-indicators">
                      {images.map((_, index) => (
                        <button
                          key={index}
                          type="button"
                          data-bs-target="#carouselPortfolio"
                          data-bs-slide-to={index}
                          className={index === activeSlide ? "active" : ""}
                          aria-label={`Slide ${index + 1}`}
                          onClick={() => handleSlideChange(index)}
                        />
                      ))}
                    </div>
                    <div className="carousel-inner">
                      {images.map((image, index) => (
                        <CarouselItem
                          key={index}
                          src={image}
                          alt="portfolio"
                          width={450}
                          height={465}
                          isActive={index === activeSlide}
                        />
                      ))}
                    </div>
                    <button
                      className="carousel-control-prev"
                      type="button"
                      data-bs-target="#carouselPortfolio"
                      data-bs-slide="prev"
                    >
                      <span
                        className="carousel-control-prev-icon"
                        aria-hidden="true"
                      />
                      <span className="visually-hidden">Previous</span>
                    </button>
                    <button
                      className="carousel-control-next"
                      type="button"
                      data-bs-target="#carouselPortfolio"
                      data-bs-slide="next"
                    >
                      <span
                        className="carousel-control-next-icon"
                        aria-hidden="true"
                      />
                      <span className="visually-hidden">Next</span>
                    </button>
                  </div>
                </div>
                <div className="col-12 col-md-6 portfolio-details">
                  <div className="sub-title-prot-card">Features:</div>
                  <div className="desc-title-portfolio-details">
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since the 1500s, when an unknown
                    printer took a galley book.
                  </div>
                  <div className="sub-title-prot-card">Specification:</div>
                  <ul className="list-unstyled mb-0">
                    <li className="mb-1">
                      <span className="fw-600">Color</span>: Black, White, Blue
                    </li>
                    <li className="mb-1">
                      <span className="fw-600">Dimensions</span>: 15 x 15 x 3
                      cm; 250 Grams
                    </li>
                    <li className="mb-1">
                      <span className="fw-600">Manufacturer</span>: Fashion and
                      Retail Limited
                    </li>
                    <li className="mb-1">
                      <span className="fw-600">Release date</span>: 21 July,
                      2023
                    </li>
                  </ul>
                  <a href="#" className="btn btn-primary mt-4 visit-link">
                    Visit Brand
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
