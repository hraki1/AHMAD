import React from "react";
import PageHeader from "../../Components/layout/Header/PageHeader";
import ProductDetail from "./ProductDetail";
import Product from "./Product";
import ProductSlider from "../../Components/ProductSlider";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

export default function Index() {
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
