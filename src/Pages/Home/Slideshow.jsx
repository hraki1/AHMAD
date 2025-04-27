import React from "react";
import Slider from "react-slick";
import Button from "../../Components/common/Button"; // Adjust the import path as necessary

// Slick CSS
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { slides } from "./data";

export default function Slideshow() {
  const settings = {
    dots: true,
    arrows: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 4500,
    slidesToShow: 1,
    slidesToScroll: 1,
    pauseOnHover: false,
  };

  return (
    <section className="slideshow slideshow-wrapper">
      <Slider {...settings} className="home-slideshow slick-arrow-dots">
        {slides.map((s, idx) => (
          <div key={idx} className="slide">
            <div className="slideshow-wrap">
              <picture>
                <source media="(max-width:767px)" srcSet={s.mobile} />
                <img
                  src={s.desktop}
                  alt={`slide-${idx + 1}`}
                  width="1920"
                  height="795"
                  loading="lazy"
                  className="blur-up lazyload w-100"
                />
              </picture>

              <div className="container">
                <div
                  className={`slideshow-content slideshow-overlay ${s.position}`}
                >
                  <div className="slideshow-content-in">
                    <div className="wrap-caption animation style1 text-start text-white">
                      {s.subtitle && (
                        <div className="main-sub-title">{s.subtitle}</div>
                      )}

                      <div className="main-title">
                        {s.title.split("\n").map((l, i) => (
                          <span key={i}>
                            {l}
                            <br />
                          </span>
                        ))}
                      </div>

                      {s.caption && (
                        <div className="main-title-2 xs-hide">{s.caption}</div>
                      )}

                      <div className="ss-btnWrap">
                        {s.buttons.map((b, i) => (
                          <Button
                            key={i}
                            label={b.label}
                            href={b.href}
                            primary={b.primary}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </section>
  );
}
