import React, { useState, useCallback, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PageHeader from "../../Components/layout/Header/PageHeader";
import PopularCategories from "../../Components/PopularCategories";
import Toolbar from "./Toolbar";
import LeftSlidebar from "./leftSlidebar";
import useFetchCategories from "../Hooks/useFetchCategories";
import { useTranslation } from "react-i18next";

export default function ShopPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const categoryId = queryParams.get("category");
  const subcategoryId = queryParams.get("subcategory");

  const [forceReset, setForceReset] = useState(false);
  const [hidePopularCategories, setHidePopularCategories] = useState(false);
  const [selectedCategoryIds, setSelectedCategoryIds] = useState(null);
  const [selectedParentId, setSelectedParentId] = useState(null);
  const [selectedBrandIds, setSelectedBrandIds] = useState([]);
  const [availabilityFilter, setAvailabilityFilter] = useState({
    instock: false,
    outofstock: false,
  });
  const [priceRangeFilter, setPriceRangeFilter] = useState([0, 1000]);

  const { t } = useTranslation();
  const { categories: subcategories } = useFetchCategories(
    selectedCategoryIds?.[0] || null
  );

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

  const backToAll = useCallback(() => {
    // Reset all filters and states
    setSelectedCategoryIds(null);
    setSelectedParentId(null);
    setSelectedBrandIds([]);
    setAvailabilityFilter({ instock: false, outofstock: false });
    setPriceRangeFilter([0, 1000]);
    setHidePopularCategories(false);

    // Trigger full reset by changing the URL and state
    navigate("/ShopGrid", { replace: true });
    setForceReset((prev) => !prev); // Optional: reset components like PopularCategories
  }, [navigate]);

  useEffect(() => {
    const updateFiltersFromURL = () => {
      if (categoryId) {
        const categoryIdNum = parseInt(categoryId);
        const subcategoryIdNum = subcategoryId ? parseInt(subcategoryId) : null;

        if (subcategoryIdNum) {
          setSelectedCategoryIds([subcategoryIdNum]);
          setSelectedParentId(categoryIdNum);
        } else {
          const childIds = subcategories
            .filter((cat) => cat.parentId === categoryIdNum)
            .map((cat) => cat.id);
          setSelectedCategoryIds([categoryIdNum, ...childIds]);
          setSelectedParentId(categoryIdNum);
        }
        setHidePopularCategories(true);
      } else {
        setSelectedCategoryIds(null);
        setSelectedParentId(null);
        setHidePopularCategories(false);
      }
    };

    updateFiltersFromURL();
  }, [categoryId, subcategoryId, subcategories, location.search]);

  useEffect(() => {
    setForceReset((prev) => !prev);
  }, [categoryId]);

  const handleCategoryClick = useCallback(
    (categoryId) => {
      setHidePopularCategories(true);
      navigate(`/ShopGrid?category=${categoryId}`);
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
      <PageHeader title={t(`ShopGrid`)} middleBreadcrumb={t(`Pages`)} />

      {(categoryId || subcategoryId) && (
        <div className="container my-3 text-end">
          <button className="btn btn-outline-secondary" onClick={backToAll}>
            {t(`ShopGridCate.Back_All`)}
          </button>
        </div>
      )}

      <PopularCategories
        heading={t(`ShopGridCate.All_Menu`)}
        italic=""
        selectedCategoryId={selectedCategoryIds?.[0] || null}
        onCategoryClick={handleCategoryClick}
        setSelectedCategoryId={(id) => setSelectedCategoryIds(id ? [id] : null)}
        setSelectedParentId={setSelectedParentId}
        onBackToAll={backToAll}
        resetHierarchy={forceReset}
        forcedParentId={categoryId ? parseInt(categoryId) : null}
      />

      <div className="container">
        <div className="row">
          <LeftSlidebar
            onBrandFilterChange={setSelectedBrandIds}
            onCategoryFilterChange={handleSidebarCategoryFilterChange}
            onAvailabilityFilterChange={handleAvailabilityFilterChange}
            onPriceChange={handlePriceRangeFilterChange}
            resetTrigger={!categoryId && !subcategoryId}
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
