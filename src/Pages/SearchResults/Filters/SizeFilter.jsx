import React, { useState, useRef } from "react";
import { CSSTransition } from "react-transition-group";

export default function SizeFilter({ className }) {
  const [selectedSize, setSelectedSize] = useState("XL");
  const [showContent, setShowContent] = useState(true);
  const contentRef = useRef(null);

  // دالة لاختيار المقاس
  const handleSizeSelect = (size) => {
    setSelectedSize(size);
  };

  return (
    <div className={`sidebar-widget filterBox filter-widget ${className}`}>
      <div className="widget-title d-flex align-items-center justify-content-between">
        <div className="title-slidebar">Size</div>
        <i
          className="fa-solid fa-list"
          style={{ cursor: "pointer" }}
          onClick={() => setShowContent((prev) => !prev)}
        ></i>
      </div>

      {/* تأثير الانزلاق للصندوق كله */}
      <CSSTransition
        in={showContent}
        timeout={400}
        classNames="slide"
        unmountOnExit
        nodeRef={contentRef} // استخدام useRef هنا
      >
        <div className="widget-content filter-size filterDD" ref={contentRef}>
          <ul className="swacth-list size-swatches d-flex-center clearfix">
            {[
              "XS",
              "S",
              "M",
              "L",
              "X",
              "XL",
              "XLL",
              "XXL",
              "25",
              "35",
              "40",
            ].map((size) => (
              <li
                key={size}
                className={`swatch large radius ${
                  selectedSize === size ? "active" : ""
                } ${["S", "M", "L"].includes(size) ? "available" : "soldout"}`}
              >
                <span
                  className="swatchLbl"
                  data-bs-toggle="tooltip"
                  data-bs-placement="top"
                  title={size}
                  onClick={() => handleSizeSelect(size)}
                >
                  {size}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </CSSTransition>
    </div>
  );
}
