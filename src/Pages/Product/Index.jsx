import React from "react";
import PageHeader from "../../Components/layout/Header/PageHeader";
import ProductDetail from "./ProductDetail";
import Product from "./Product";
import ProductSlider from "../../Components/ProductSlider";
import { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";

export default function Index() {
  const ctx = useContext(AuthContext);
  console.log(ctx);
  return (
    <div>
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
