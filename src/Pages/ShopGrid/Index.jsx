import React, { useState } from "react";
import PageHeader from "../../Components/layout/Header/PageHeader";
import PopularCategories from "../../Components/PopularCategories";
import { categoriesData } from "../Home/data";
import Toolbar from "./Toolbar";
import SidebarFilter from "./Filters/SidebarFilter";
import ProductCard from "../Home/ProductCard";
import LeftSlidebar from "./leftSlidebar";

export default function ShopPage() {
  const [showSidebar, setShowSidebar] = useState(false);

  const toggleSidebar = () => {
    setShowSidebar((prev) => !prev);
  };

  const closeSidebar = () => {
    setShowSidebar(false);
  };

  return (
    <div>
      <PageHeader title="Shop Grid" middleBreadcrumb="PAGES" />
      <PopularCategories data={categoriesData} italic="" heading="All Menu" />
      <div className="container">
        <div className="row">
          <LeftSlidebar />
          <Toolbar />
        </div>
      </div>
    </div>
  );
}
