import React, { useState, useCallback } from "react";
import PageHeader from "../../Components/layout/Header/PageHeader";
import PopularCategories from "../../Components/PopularCategories";
import { categoriesData } from "../Home/data";
import Toolbar from "./Toolbar";
import LeftSlidebar from "./leftSlidebar";

export default function ShopPage() {
  const [selectedCategoryIds, setSelectedCategoryIds] = useState(null);
  const [selectedParentId, setSelectedParentId] = useState(null);

  const handleCategoryClick = useCallback((categoryId, childIds) => {
    setSelectedCategoryIds([categoryId, ...childIds]);
  }, []);

  const handleBackToAll = useCallback(() => {
    setSelectedCategoryIds(null);
    setSelectedParentId(null);
  }, []);

  return (
    <div>
      <PageHeader title="Shop Grid" middleBreadcrumb="PAGES" />
      <PopularCategories
        data={categoriesData}
        heading="All Menu"
        italic=""
        selectedCategoryId={selectedCategoryIds?.[0] || null}
        onCategoryClick={handleCategoryClick}
        setSelectedCategoryId={(id) => setSelectedCategoryIds(id ? [id] : null)}
        setSelectedParentId={setSelectedParentId}
        onBackToAll={handleBackToAll}
      />
      <div className="container">
        <div className="row">
          <LeftSlidebar />
          <Toolbar selectedCategoryAndChildrenIds={selectedCategoryIds} />
        </div>
      </div>
    </div>
  );
}
