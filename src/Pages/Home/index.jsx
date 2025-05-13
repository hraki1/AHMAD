import React, { useState } from "react";
import Slideshow from "./Slideshow";
import ServiceSection from "../../Components/ServiceSection";
import CollectionBanner from "./CollectionBanner";
import PopularCategories from "../../Components/PopularCategories";
import ProductSlider from "../../Components/ProductSlider";
import TestimonialSection from "./TestimonialSection";
import BlogPostSection from "./BlogPostSection";
import { categoriesData, services } from "./data";

export default function HomePage() {
  const [selectedParentId, setSelectedParentId] = useState(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  return (
    <>
      <Slideshow />
      <ServiceSection services={services} pageType="first" />
      <CollectionBanner />
      <PopularCategories PopularCategories mode="navigate" />
      <ProductSlider />
      <TestimonialSection />
      <BlogPostSection />
    </>
  );
}
