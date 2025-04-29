import React from "react";
import PageHeader from "../../Components/layout/Header/PageHeader";
import ProductDetail from "./ProductDetail";
import Product from "./Product";
import Description from "./Description";

export default function Index() {
  return (
    <div>
      <PageHeader title="PRODUCT" />
      <ProductDetail />
      <Product />
    </div>
  );
}
