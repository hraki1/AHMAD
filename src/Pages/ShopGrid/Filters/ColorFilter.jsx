import React, { useEffect, useState } from "react";
import { colors } from "../data";

export default function ColorFilter() {
  const [selectedColor, setSelectedColor] = useState(null);

  useEffect(() => {
    const tooltipTriggerList = [].slice.call(
      document.querySelectorAll('[data-bs-toggle="tooltip"]')
    );
    tooltipTriggerList.map(function (tooltipTriggerEl) {
      // eslint-disable-next-line no-undef
      return new bootstrap.Tooltip(tooltipTriggerEl, {
        trigger: "hover",
      });
    });
  }, []);
  const [showContent, setShowContent] = useState(true);

  return (
    <div className="sidebar-widget filterBox filter-widget">
      <div className="widget-title d-flex align-items-center justify-content-between">
        <div class="title-slidebar">Color</div>
        <i
          className="fa-solid fa-list"
          style={{ cursor: "pointer" }}
          onClick={() => setShowContent((prev) => !prev)}
        ></i>
      </div>
      {showContent && (
        <div className="widget-content">
          {" "}
          <div className="widget-content filter-color filterDD">
            <ul className="swacth-list swatches d-flex-center clearfix pt-0">
              {colors.map((color) => (
                <li
                  key={color}
                  className={`swatch large radius available ${color.toLowerCase()} ${
                    selectedColor === color ? "active" : ""
                  }`}
                  onClick={() => setSelectedColor(color)}
                >
                  <span
                    className="swatchLbl"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title={color}
                  ></span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
