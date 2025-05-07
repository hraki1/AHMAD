import React, { useState, useEffect, useRef } from "react";
import Slider from "react-slick";
import useFetchCategories from "../utils/useFetchCategories";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function PopularCategories({
  showHeader = true,
  italic = "Shop by category",
  heading = "Popular Collections",
  selectedCategoryId,
  setSelectedCategoryId,
  setSelectedParentId, // Add this line
}) {
  const [localSelectedParentId, setLocalSelectedParentId] = useState(null);
  const { categories, loading, error } = useFetchCategories(
    localSelectedParentId
  );
  const sliderRef = useRef(null);

  useEffect(() => {
    if (sliderRef.current && sliderRef.current.innerSlider) {
      sliderRef.current.innerSlider.slickGoTo(0);
    }
  }, [localSelectedParentId]);

  const shouldAutoplay = categories.length >= 4;

  const settings = {
    slidesToShow: 5,
    slidesToScroll: 1,
    arrows: true,
    infinite: shouldAutoplay,
    autoplay: shouldAutoplay,
    autoplaySpeed: 3000,
    pauseOnHover: false,
    responsive: [
      { breakpoint: 1200, settings: { slidesToShow: 4 } },
      { breakpoint: 992, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 576, settings: { slidesToShow: 2 } },
      { breakpoint: 420, settings: { slidesToShow: 1 } },
    ],
  };

  if (loading) return <div>Loading...</div>;
  if (error && categories.length === 0) return <div>{error}</div>;

  return (
    <section className="section collection-slider pb-0">
      <div className="container">
        {showHeader && (
          <div className="section-header">
            <div className="main-italic mb-2 mt-0">{italic}</div>
            <div className="main-title-heading">{heading}</div>
          </div>
        )}

        {localSelectedParentId !== null && (
          <div className="text-center mb-3">
            <button
              className="btn btn-outline-primary"
              onClick={() => {
                setLocalSelectedParentId(null);
                setSelectedParentId(null); // Notify parent to reset
                setSelectedCategoryId(null);
              }}
            >
              BACK
            </button>
          </div>
        )}

        {categories.length > 0 ? (
          <Slider
            ref={sliderRef}
            key={localSelectedParentId ?? "root"}
            {...settings}
            className="collection-slider-5items gp15 arwOut5 hov-arrow"
          >
            {categories.map((c) => (
              <div
                key={c.id}
                className="category-item zoomscal-hov"
                onClick={() => {
                  setSelectedCategoryId(c.id); // تحديث الفئة المحددة
                  setLocalSelectedParentId(c.id); // تحديث الفئة الفرعية
                  setSelectedParentId(c.id);
                }}
                style={{ cursor: "pointer" }}
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
              </div>
            ))}
          </Slider>
        ) : (
          <div className="text-center fs-5 text-muted my-5">No Data Found</div>
        )}
      </div>
    </section>
  );
}
