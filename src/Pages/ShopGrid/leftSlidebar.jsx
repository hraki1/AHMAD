// src/components/shop/leftSlidebar.js
import SidebarCategories from "./Filters/SidebarCategories";
import PriceFilter from "./Filters/PriceFilter";
import ColorFilter from "./Filters/ColorFilter";
import SizeFilter from "./Filters/SizeFilter";
import ProductTypeFilter from "./Filters/ProductTypeFilter";
import BrandFilter from "./Filters/BrandFilter";
import AvailabilityFilter from "./Filters/AvailabilityFilter";

export default function LeftSlidebar({
  onBrandFilterChange,
  onCategoryFilterChange,
  onAvailabilityFilterChange,
  onPriceChange,
}) {
  const handlePriceFilterChange = (range) => {
    onPriceChange?.(range);
  };

  return (
    <div className="col-12 col-sm-12 col-md-12 col-lg-3 sidebar sidebar-bg filterbar mt-5">
      <div className="closeFilter d-block d-lg-none">
        <i className="fa-solid fa-x" style={{ cursor: "pointer" }}></i>
      </div>
      <div className="sidebar-tags sidebar-sticky clearfix">
        {/* Filter By */}
        <div className="sidebar-widget filterBox filter-widget">
          {/* ... */}
        </div>
        {/* */}
        <SidebarCategories onCategoryFilterChange={onCategoryFilterChange} />
        <PriceFilter onPriceChange={handlePriceFilterChange} />{" "}
        {/* ✅ تمرير الدالة إلى PriceFilter */}
        {/* <ColorFilter /> */}
        {/* <SizeFilter /> */}
        {/* <ProductTypeFilter /> */}
        <BrandFilter onFilterChange={onBrandFilterChange} />
        <AvailabilityFilter
          onAvailabilityFilterChange={onAvailabilityFilterChange}
        />
      </div>
    </div>
  );
}
