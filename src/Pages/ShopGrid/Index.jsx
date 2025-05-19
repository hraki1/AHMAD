// src/pages/shop/ShopPage.js
import React, { useState, useCallback, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PageHeader from "../../Components/layout/Header/PageHeader";
import PopularCategories from "../../Components/PopularCategories";
import { categoriesData } from "../Home/data";
import Toolbar from "./Toolbar";
import LeftSlidebar from "./leftSlidebar";
import useFetchCategories from "../Hooks/useFetchCategories";

export default function ShopPage() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const categoryId = queryParams.get("category");
  const subcategoryId = queryParams.get("subcategory");
  const navigate = useNavigate();
  const [hidePopularCategories, setHidePopularCategories] = useState(false);

  const [selectedCategoryIds, setSelectedCategoryIds] = useState(null);
  const [selectedParentId, setSelectedParentId] = useState(null);
  const [selectedBrandIds, setSelectedBrandIds] = useState([]);
  const [availabilityFilter, setAvailabilityFilter] = useState({
    instock: false,
    outofstock: false,
  });
  const [priceRangeFilter, setPriceRangeFilter] = useState([0, 1000]);

  const { categories: subcategories } = useFetchCategories(
    selectedCategoryIds?.[0] || null
  );

  useEffect(() => {
    const updateFiltersFromURL = () => {
      if (categoryId) {
        const categoryIdNum = parseInt(categoryId);
        const subcategoryIdNum = subcategoryId ? parseInt(subcategoryId) : null;

        if (subcategoryIdNum) {
          setSelectedCategoryIds([subcategoryIdNum]);
        } else {
          // جلب الفئات الفرعية للفئة الرئيسية
          const childIds = subcategories
            .filter((cat) => cat.parentId === categoryIdNum)
            .map((cat) => cat.id);

          setSelectedCategoryIds([categoryIdNum, ...childIds]);
        }
      } else {
        setSelectedCategoryIds(null);
      }
    };

    updateFiltersFromURL();
  }, [categoryId, subcategoryId, subcategories]);

  const handleCategoryClick = useCallback(
    (categoryId, childIds) => {
      setHidePopularCategories(true);
      navigate(`/ShopGrid?category=${categoryId}`);
    },
    [navigate]
  );
  const backToAll = useCallback(() => {
    setHidePopularCategories(false);
    setSelectedCategoryIds(null);
    setSelectedParentId(null);
    setSelectedBrandIds([]);
    setAvailabilityFilter({
      instock: false,
      outofstock: false,
    });
    setPriceRangeFilter([0, 1000]);
    navigate("/ShopGrid");
  }, [navigate]);

  const handleSidebarCategoryFilterChange = useCallback(
    (categoryIds) => {
      if (categoryIds && categoryIds.length > 0) {
        navigate(`/ShopGrid?category=${categoryIds[0]}`);
      } else {
        navigate("/ShopGrid");
      }
    },
    [navigate]
  );

  const handleAvailabilityFilterChange = useCallback((availability) => {
    setAvailabilityFilter(availability);
  }, []);

  const handlePriceRangeFilterChange = useCallback((priceRange) => {
    setPriceRangeFilter(priceRange);
  }, []);

  return (
    <div>
      <PageHeader title="Shop Grid" middleBreadcrumb="PAGES" />

      {/* ✅ زر العودة للكل إذا في فئة مختارة */}
      {(categoryId || subcategoryId) && (
        <div className="container my-3 text-end">
          <button className="btn btn-outline-secondary" onClick={backToAll}>
            Back to All Products
          </button>
        </div>
      )}

      <PopularCategories
        data={categoriesData}
        heading={categoryId ? "Subcategories" : "All Menu"}
        italic=""
        selectedCategoryId={selectedCategoryIds?.[0] || null}
        onCategoryClick={handleCategoryClick}
        setSelectedCategoryId={(id) => setSelectedCategoryIds(id ? [id] : null)}
        setSelectedParentId={setSelectedParentId}
        onBackToAll={backToAll}
        resetHierarchy={!categoryId && !subcategoryId}
        forcedParentId={categoryId ? parseInt(categoryId) : null}
        forcedCategoryData={
          categoryId
            ? categoriesData.find((cat) => cat.id === parseInt(categoryId))
            : null
        }
      />
      <div className="container">
        <div className="row">
          <LeftSlidebar
            onBrandFilterChange={setSelectedBrandIds}
            onCategoryFilterChange={handleSidebarCategoryFilterChange}
            onAvailabilityFilterChange={handleAvailabilityFilterChange}
            onPriceChange={handlePriceRangeFilterChange}
          />
          <Toolbar
            selectedCategoryAndChildrenIds={selectedCategoryIds}
            selectedBrandIds={selectedBrandIds}
            availabilityFilter={availabilityFilter}
            priceRange={priceRangeFilter}
            productsToShow={12}
            gridClass="col-xl-3 col-lg-4 col-md-4 col-sm-6 col-6"
          />
        </div>
      </div>
    </div>
  );
}
