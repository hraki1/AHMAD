import React from "react";
import Slideshow from "./Slideshow";
import ServiceSection from "../../Components/ServiceSection";
import CollectionBanner from "./CollectionBanner";
import PopularCategories from "../../Components/PopularCategories";
import ScrollTop from "../../Components/layout/Footer/ScrollTop";
import ProductSlider from "./ProductSlider";
import TestimonialSection from "./TestimonialSection";
import BlogPostSection from "./BlogPostSection";
import { categoriesData, services } from "./data";

export default function HomePage() {
  return (
    <>
      <Slideshow />
      <ServiceSection services={services} pageType="first" />
      <CollectionBanner />
      <PopularCategories data={categoriesData} />
      <ProductSlider />
      <TestimonialSection />
      <BlogPostSection />
      <ScrollTop />
    </>
  );
}
