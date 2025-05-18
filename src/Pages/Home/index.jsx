import Slideshow from "./Slideshow";
import ServiceSection from "../../Components/ServiceSection";
import CollectionBanner from "./CollectionBanner";
import PopularCategories from "../../Components/PopularCategories";
import ProductSlider from "../../Components/ProductSlider";
import TestimonialSection from "./TestimonialSection";
import { services } from "./data";

export default function HomePage() {
  return (
    <>
      <Slideshow />
      <ServiceSection services={services} pageType="first" />
      <CollectionBanner />
      <PopularCategories PopularCategories mode="navigate" />
      <ProductSlider />
      <TestimonialSection />
    </>
  );
}
