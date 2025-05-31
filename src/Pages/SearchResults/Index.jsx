import React, { useState, useCallback, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PageHeader from "../../Components/layout/Header/PageHeader";
import PopularCategories from "../../Components/PopularCategories";
import Toolbar from "./Toolbar";
import LeftSlidebar from "./leftSlidebar";
import useFetchCategories from "../Hooks/useFetchCategories";

export default function SearchResults() {
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

  const { categories: subcategories, loading: subcatLoading } =
    useFetchCategories(selectedCategoryIds?.[0] || null);

  // Define handleSidebarCategoryFilterChange first
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

  // Then define backToAll that uses it
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
    handleSidebarCategoryFilterChange([]);
  }, [navigate, handleSidebarCategoryFilterChange]);

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
    // When categoryId changes, force a reset
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
      <PageHeader title="Search Results" />

      {(categoryId || subcategoryId) && (
        <div className="container my-3 text-end">
          <button className="btn btn-outline-secondary" onClick={backToAll}>
            Back to All
          </button>
        </div>
      )}

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
