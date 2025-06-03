import React, { useState, useEffect } from "react";
import useFetchCategories from "../../Hooks/useFetchCategories";
import { useTranslation } from "react-i18next";
import Spinner from "../../../Components/UI/SpinnerLoading";
export default function SidebarCategories({
  onCategoryFilterChange,
  className,
  resetTrigger,
}) {
  const [categoryHierarchy, setCategoryHierarchy] = useState([]);
  const parentId = categoryHierarchy.at(-1)?.id || null;
  const { categories, loading, error } = useFetchCategories(parentId);
  const [showContent, setShowContent] = useState(true);
  const { t } = useTranslation();
  useEffect(() => {
    if (resetTrigger) {
      setCategoryHierarchy([]);
    }
  }, [resetTrigger]);

  const handleCategoryClick = (category) => {
    setCategoryHierarchy((prev) => [...prev, category]);
    const childIds = categories.map((c) => c.id);
    onCategoryFilterChange?.([category.id, ...childIds]);
  };

  const backToAll = () => {
    setCategoryHierarchy([]);
    onCategoryFilterChange?.([]);
  };

  const backOneLevel = () => {
    if (categoryHierarchy.length > 1) {
      const updatedHierarchy = categoryHierarchy.slice(0, -1);
      const parent = updatedHierarchy.at(-1);
      setCategoryHierarchy(updatedHierarchy);

      // تمرير الفئة الجديدة والفئات الفرعية المعروضة حالياً
      const childIds = categories.map((c) => c.id);
      onCategoryFilterChange?.([parent.id, ...childIds]);
    } else {
      backToAll();
    }
  };

  return (
    <div
      className={`sidebar-widget clearfix categories filterBox filter-widget ${className}`}
    >
      <div className="widget-title d-flex justify-content-between align-items-center">
        <div className="title-slidebar">{t(`Categories`)}</div>
        <i
          className="fa-solid fa-list"
          style={{ cursor: "pointer" }}
          onClick={() => setShowContent((prev) => !prev)}
        ></i>
      </div>

      {showContent && (
        <div className="widget-content">
          {categoryHierarchy.length > 0 && (
            <div className="mb-3">
              <div className="d-flex flex-column flex-sm-row justify-content-center gap-2">
                <button
                  className="btn btn-outline-primary btn-sm"
                  onClick={backToAll}
                >
                  {t(`ShopGridCate.Back_All`)}
                </button>
                {categoryHierarchy.length > 1 && (
                  <button
                    className="btn btn-outline-primary btn-sm"
                    onClick={backOneLevel}
                  >
                    {t(`ShopGridCate.Back_One`)}
                  </button>
                )}
              </div>
            </div>
          )}

          <div className="widget-content filterDD">
            <ul className="sidebar-categories scrollspy clearfix">
              {loading && (
                <li>
                  <Spinner />
                </li>
              )}
              {error && <li>Error loading categories</li>}
              {!loading &&
                !error &&
                categories?.map((category) => (
                  <li key={category.id} className="lvl1 more-item">
                    <a
                      href="#"
                      className="site-nav d-flex justify-content-between align-items-center"
                      onClick={(e) => {
                        e.preventDefault();
                        handleCategoryClick(category);
                      }}
                    >
                      <span>{category.name}</span>
                      <i className="fa-solid fa-chevron-right"></i>
                    </a>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
