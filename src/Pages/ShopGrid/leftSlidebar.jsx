import SidebarCategories from "./Filters/SidebarCategories";
import PriceFilter from "./Filters/PriceFilter";
import BrandFilter from "./Filters/BrandFilter";
import AvailabilityFilter from "./Filters/AvailabilityFilter";

export default function LeftSlidebar({
  onBrandFilterChange,
  onCategoryFilterChange,
  onAvailabilityFilterChange,
  onPriceChange,
  resetTrigger,
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
        <SidebarCategories
          onCategoryFilterChange={onCategoryFilterChange}
          resetTrigger={resetTrigger}
        />
        <PriceFilter onPriceChange={handlePriceFilterChange} />
        <BrandFilter onFilterChange={onBrandFilterChange} />
        <AvailabilityFilter
          onAvailabilityFilterChange={onAvailabilityFilterChange}
        />
      </div>
    </div>
  );
}
