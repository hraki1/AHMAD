import React, { useState } from "react";
import PageHeader from "../../Components/layout/Header/PageHeader";
import PopularCategories from "../../Components/PopularCategories";
import { categoriesData } from "../Home/data";
import Toolbar from "./Toolbar";
import LeftSlidebar from "./leftSlidebar";

export default function ShopPage() {
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [selectedParentId, setSelectedParentId] = useState(null); // Add this line

  return (
    <div>
      <PageHeader title="Shop Grid" middleBreadcrumb="PAGES" />
      <PopularCategories
        onCategoryClick={setSelectedCategoryId}
        selectedCategoryId={selectedCategoryId}
        data={categoriesData}
        italic=""
        heading="All Menu"
        setSelectedCategoryId={setSelectedCategoryId}
        setSelectedParentId={setSelectedParentId} // Pass the setter
      />
      <div className="container">
        <div className="row">
          <LeftSlidebar />
          <Toolbar selectedCategoryId={selectedCategoryId} />
        </div>
      </div>
    </div>
  );
}
