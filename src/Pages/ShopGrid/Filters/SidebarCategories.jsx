// src/components/shop/Filters/SidebarCategories.js
import React, { useState } from "react";
import useFetchCategories from "../../Hooks/useFetchCategories";

// مكون لعرض الـ Subcategories عند الضغط
const SubCategoryList = ({ parentId, isOpen, onCategorySelect }) => {
  const {
    categories: subcategories,
    loading,
    error,
  } = useFetchCategories(parentId);

  const handleSubCategoryClick = (subcategoryId) => {
    onCategorySelect(subcategoryId);
  };

  return (
    <ul className={`sublinks ps-3 ${isOpen ? "d-block" : "d-none"}`}>
      {loading && <li>Loading...</li>}
      {error && <li>Error loading subcategories</li>}
      {!loading &&
        !error &&
        subcategories?.map((sub) => (
          <li key={sub.id} className="lvl2">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handleSubCategoryClick(sub.id);
              }}
            >
              {sub.name}
            </a>
          </li>
        ))}
    </ul>
  );
};

export default function SidebarCategories({
  onCategoryFilterChange,
  className,
}) {
  const [openCategories, setOpenCategories] = useState({});
  const [showContent, setShowContent] = useState(true);
  const { categories, loading, error } = useFetchCategories();

  const toggleCategory = (categoryId) => {
    setOpenCategories((prev) => ({
      ...prev,
      [categoryId]: !prev[categoryId],
    }));
  };

  const handleCategoryClick = (categoryId) => {
    onCategoryFilterChange?.([categoryId]); // تمرير معرف الفئة كمصفوفة
  };

  const renderToggleIcon = () => <i className="fa-solid fa-bars ms-2"></i>;

  return (
    <div
      className={`sidebar-widget clearfix categories filterBox filter-widget ${className}`}
    >
      <div className="widget-title d-flex justify-content-between align-items-center">
        <div className="title-slidebar">Categories</div>
        <i
          className="fa-solid fa-list"
          style={{ cursor: "pointer" }}
          onClick={() => setShowContent((prev) => !prev)}
        ></i>
      </div>
      {showContent && (
        <div className="widget-content">
          <div className="widget-content filterDD">
            <ul className="sidebar-categories scrollspy clearfix">
              {loading && <p>Loading...</p>}
              {error && <p>Error loading categories.</p>}
              {!loading &&
                !error &&
                categories?.map((category) => (
                  <li key={category.id} className="lvl1 more-item">
                    <a
                      href="#"
                      className="site-nav d-flex justify-content-between align-items-center"
                      onClick={(e) => {
                        e.preventDefault();
                        handleCategoryClick(category.id); // فلترة عند النقر على الفئة الرئيسية
                        toggleCategory(category.id);
                      }}
                    >
                      <span>{category.name}</span>
                      {renderToggleIcon()}
                    </a>

                    {/* عند الضغط على الفئة، يتم عرض الـ Subcategories */}
                    <SubCategoryList
                      parentId={category.id}
                      isOpen={openCategories[category.id]}
                      onCategorySelect={handleCategoryClick} // تمرير دالة الفلترة إلى الفئات الفرعية
                    />
                  </li>
                ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
