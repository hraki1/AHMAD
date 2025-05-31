import { useEffect } from "react";

import PageHeader from "../../Components/layout/Header/PageHeader";
import ProductDetail from "./ProductDetail";
import Product from "./Product";
import ProductSlider from "../../Components/ProductSlider";
import { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";
import ScrollToTop from "../../Components/common/ScrollToTop";

export default function Index() {
  const ctx = useContext(AuthContext);

  // useEffect(() => {
  //   window.scrollTo(0, 0); // Scroll to the top of the page
  // });

  return (
    <div>
      <ScrollToTop />
      <PageHeader title="PRODUCT" />
      <ProductDetail />
      <Product />
      <ProductSlider
        showTabs={false}
        subtitle="Weekly Deals"
        title="Check out our newest discounts!"
      />
    </div>
  );
}
