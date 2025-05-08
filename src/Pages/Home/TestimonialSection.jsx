import React from "react";
import Slider from "react-slick";
import Button from "../../Components/common/Button";
// import quoteIcon from "../../assets/images/icons/demo1-quote-icon.png";
import brandIcon from "../../assets/images/icons/brand-icon.png";
import { testimonials } from "./data";

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

  return (
    <section className="section testimonial-slider style1">
      <div className="container">
        <div className="section-header">
          <div className="main-italic mb-2 mt-0">Brands</div>
          <div className="main-title-heading">Our brands</div>
        </div>

        <div className="testimonial-wraper">
          <Slider
            {...settings}
            className="testimonial-slider-3items gp15 slick-arrow-dots arwOut5"
          >
            {testimonials.map((t, index) => (
              <div key={index} className="testimonial-slide">
                <div className="testimonial-content text-center">
                  <div className="quote-icon mb-3 mb-lg-4">
                    <img
                      className="blur-up lazyload mx-auto"
                      src={brandIcon}
                      alt="icon"
                      width="40"
                      height="40"
                    />
                  </div>

                  <div className="content">
                    <div className="text mb-2">
                      <p>
                        <img
                          className="brand-name"
                          src="https://images-platform.99static.com//pyJ8X3pEcCeRiL-MOiVXWHYQTHk=/509x211:1480x1182/fit-in/500x500/99designs-contests-attachments/89/89453/attachment_89453866"
                        />
                      </p>
                    </div>

                    <div className="product-review my-3">
                      {/* {[...Array(5)].map((_, i) => (
                        <i
                          key={i}
                          className={`${i < t.stars ? "fas" : "far"} fa-star`}
                          style={{ color: "gold" }}
                        />
                      ))} */}
                      <span className="caption hidden ms-1"></span>
                    </div>
                  </div>

                  <div className="auhimg d-flex-justify-center text-left">
                    <div className="image">
                      {/* <img
                        className="rounded-circle blur-up lazyload"
                        src={t.img}
                        alt={t.name}
                        width="65"
                        height="65"
                      /> */}
                    </div>
                    <div className="auhtext ms-3">
                      <h5 className="authour mb-1">{t.name}</h5>
                      <p className="text-muted"></p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
          <div className="view-collection text-center mt-4 mt-md-5">
            <Button label="View brands" to="/Brands" primary={false} />
          </div>
        </div>
      </div>
    </section>
  );
}
