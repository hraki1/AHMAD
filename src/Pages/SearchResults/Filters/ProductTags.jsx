import React, { useState, useCallback } from "react";
import { tags } from "../data";

export default function ProductTags({ className }) {
  const [activeTag, setActiveTag] = useState("Women");

  const handleTagClick = useCallback((tag) => {
    setActiveTag(tag);
  }, []);
  const [showContent, setShowContent] = useState(true);

  return (
    <div
      className={`sidebar-widget filterBox filter-widget product-tag ${className}`}
    >
      <div className="widget-title d-flex align-items-center justify-content-between">
        <div className="title-slidebar">Product Tags</div>
        <i
          className="fa-solid fa-list"
          style={{ cursor: "pointer" }}
          onClick={() => setShowContent((prev) => !prev)}
        ></i>
      </div>{" "}
      {showContent && (
        <div className="widget-content">
          <div className="widget-content filterDD">
            <ul className="tags-list product-tags d-flex-wrap clearfix">
              {tags.map((tag) => (
                <li
                  key={tag}
                  className={`item ${activeTag === tag ? "active" : ""}`}
                >
                  <a
                    href="#"
                    className="rounded-5"
                    onClick={(e) => {
                      e.preventDefault();
                      handleTagClick(tag);
                    }}
                  >
                    {tag}
                  </a>
                </li>
              ))}
            </ul>
            <span className="btn btn-sm brd-link btnview">View all</span>
          </div>
        </div>
      )}
    </div>
  );
}
