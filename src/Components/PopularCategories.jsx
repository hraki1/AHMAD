import React from "react";
import Slider from "react-slick";

export default function PopularCategories({
  data,
  showHeader = true,
  italic = "Shop by category",
  heading = "Popular Collections",
}) {
  const settings = {
    slidesToShow: 5,
    slidesToScroll: 1,
    arrows: true,
    infinite: true,
    autoplay: true, // ← play Auto
    autoplaySpeed: 3000, // 3s edited
    pauseOnHover: false, // ← do not stop when hover in mouse
    responsive: [
      { breakpoint: 1200, settings: { slidesToShow: 4 } },
      { breakpoint: 992, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      //  2 element in 576 px
      { breakpoint: 576, settings: { slidesToShow: 2 } },
      // 1 element in small screen
      { breakpoint: 420, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <section className="section collection-slider pb-0">
      <div className="container">
        {showHeader && (
          <div className="section-header">
            <div className="main-italic mb-2 mt-0">{italic}</div>
            <div className="main-title-heading">{heading}</div>
          </div>
        )}

        <Slider
          {...settings}
          className="collection-slider-5items gp15 arwOut5 hov-arrow"
        >
          {data.map((c, i) => (
            <div key={i} className="category-item zoomscal-hov">
              <a
                href="shop-left-sidebar.html"
                className="category-link clr-none"
              >
                <div className="zoom-scal zoom-scal-nopb rounded-3">
                  <img
                    className="blur-up lazyload"
                    src={c.img}
                    alt={c.title}
                    title={c.title}
                    width="365"
                    height="365"
                    loading="lazy"
                  />
                </div>
                <div className="details mt-3 text-center">
                  <div className="popular-title">{c.title}</div>
                  <div className="counts-popular">{c.count} Products</div>
                </div>
              </a>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
}
