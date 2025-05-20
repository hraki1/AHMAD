import React, { useState, useEffect, useRef } from "react";
import Slider from "react-slick";
import { useNavigate, useLocation } from "react-router-dom";
import useFetchCategories from "../Pages/Hooks/useFetchCategories";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function PopularCategories({
  showHeader = true,
  italic = "Shop by category",
  heading = "Popular Collections",
  selectedCategoryId,
  setSelectedCategoryId,
  setSelectedParentId,
  onCategoryClick,
  onBackToAll,
  mode = "default",
  resetHierarchy,
  forcedParentId,
  forcedCategoryData,
  data = [],
}) {
  const location = useLocation();
  const initialHierarchy = location.state?.categoryHierarchy || [];

  const [categoryHierarchy, setCategoryHierarchy] = useState([]);

  const parentId =
    categoryHierarchy.length > 0
      ? categoryHierarchy[categoryHierarchy.length - 1].id
      : forcedParentId || null;

  const { categories, loading, error } = useFetchCategories(parentId);
  const sliderRef = useRef(null);
  const navigate = useNavigate();

  // Reset on prop change
  useEffect(() => {
    if (resetHierarchy) {
      setCategoryHierarchy([]);
    }
  }, [resetHierarchy]);

  // Load hierarchy from forcedParentId
  useEffect(() => {
    if (forcedParentId && categoryHierarchy.length === 0) {
      const foundCategory = data.find((cat) => cat.id === forcedParentId);
      if (foundCategory) {
        setCategoryHierarchy([foundCategory]);
      } else {
        setCategoryHierarchy([
          {
            id: forcedParentId,
            title: "Loading...",
            img: "",
            count: 0,
          },
        ]);
      }
    }
  }, [forcedParentId, data]);

  useEffect(() => {
    if (sliderRef.current?.innerSlider) {
      sliderRef.current.innerSlider.slickGoTo(0);
    }
  }, [parentId]);

  const handleCategoryClick = (category) => {
    if (mode === "navigate") {
      navigate(`/ShopGrid?category=${category.id}`, {
        state: {
          categoryHierarchy: [...categoryHierarchy, category],
        },
      });
    } else {
      setSelectedCategoryId(category.id);
      setSelectedParentId(category.id);
      setCategoryHierarchy((prev) => [...prev, category]);

      const childIds = categories.map((child) => child.id);
      onCategoryClick?.(category.id, childIds);
    }
  };

  const backToAll = () => {
    setCategoryHierarchy([]);
    setSelectedCategoryId(null);
    setSelectedParentId(null);
    onBackToAll?.();
  };

  const backOneLevel = () => {
    if (categoryHierarchy.length > 1) {
      const updatedHierarchy = categoryHierarchy.slice(0, -1);
      const parent = updatedHierarchy[updatedHierarchy.length - 1];
      setCategoryHierarchy(updatedHierarchy);
      setSelectedCategoryId(parent.id);
      setSelectedParentId(parent.id);

      const parentChildren = categories.map((c) => c.id);
      onCategoryClick?.(parent.id, parentChildren);
    } else {
      backToAll();
    }
  };

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

  const renderSlider = () => (
    <Slider
      ref={sliderRef}
      key={parentId || "root"}
      {...settings}
      className="collection-slider-5items gp15 arwOut5 hov-arrow"
    >
      {categories.map((c) => (
        <div
          key={c.id}
          className="category-item zoomscal-hov"
          onClick={() => handleCategoryClick(c)}
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
  );

  return (
    <section className="section collection-slider pb-0">
      <div className="container">
        {showHeader && (
          <div className="section-header">
            <div className="main-italic mb-2 mt-0">{italic}</div>
            <div className="main-title-heading">{heading}</div>
          </div>
        )}

        {categoryHierarchy.length > 0 && (
          <div className="text-center mb-3">
            {categoryHierarchy.length > 1 && (
              <button
                className="btn btn-outline-primary ms-2"
                onClick={backOneLevel}
              >
                Back One Level
              </button>
            )}
          </div>
        )}

        {loading && (
          <div className="text-center fs-5 text-muted my-5">Loading...</div>
        )}
        {!loading && error && categories.length === 0 && (
          <div className="text-center fs-5 text-danger my-5">{error}</div>
        )}
        {!loading && categories.length === 0 ? (
          <div className="text-center fs-5 text-muted my-5">
            {parentId
              ? "No subcategories found for this category."
              : "No main categories found."}
          </div>
        ) : (
          renderSlider()
        )}
      </div>
    </section>
  );
}
