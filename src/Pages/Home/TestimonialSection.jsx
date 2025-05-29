import React from "react";
import Slider from "react-slick";
import Button from "../../Components/common/Button";
// import quoteIcon from "../../assets/images/icons/demo1-quote-icon.png";
import brandIcon from "../../assets/images/icons/brand-icon.png";
import useFetchBrands from "../Hooks/useFetchBrands";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
export default function TestimonialSection() {
  const settings = {
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3500,
    pauseOnHover: false,
    responsive: [
      { breakpoint: 1200, settings: { slidesToShow: 3 } },
      { breakpoint: 992, settings: { slidesToShow: 2 } },
      { breakpoint: 768, settings: { slidesToShow: 1 } },
    ],
  };
  const { brands, loading, error } = useFetchBrands();
  const { t } = useTranslation();
  return (
    <section className="section home-blog-post">
      <div className="container">
        <div className="section-header">
          <div className="main-italic mb-2 mt-0">{t("Brands")}</div>
          <div className="main-title-heading">{t("Our_brands")}</div>
        </div>

        <div className="testimonial-wraper">
          {loading ? (
            <p className="text-center">Loading...</p>
          ) : error ? (
            <p className="text-center text-danger">{error}</p>
          ) : (
            <Slider
              {...settings}
              className="blog-slider-3items gp15 arwOut5 hov-arrow"
            >
              {brands.map((brand, i) => (
                <div key={i} className="blog-item">
                  <div className="blog-article zoomscal-hov">
                    <div className="blog-img">
                      <Link className="featured-image zoom-scal" to="/Brands">
                        <img
                          className="blur-up lazyload"
                          src={brand.image}
                          alt={brand.name}
                          width="740"
                          height="410"
                        />
                      </Link>
                    </div>

                    <div className="blog-content">
                      <h2 className="h3 mb-3 text-center">
                        <Link to="/Brands"></Link>
                      </h2>
                      <div className="brand-name mb-1 ">{brand.slug}</div>
                      <p className="content mb-5">{brand.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          )}

          <div className="view-collection text-center mt-4 mt-md-5">
            <Button label={t("View_brands")} to="/Brands" primary={false} />
          </div>
        </div>
      </div>
    </section>
  );
}
