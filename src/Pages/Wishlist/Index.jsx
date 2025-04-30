import React from "react";
import PageHeader from "../../Components/layout/Header/PageHeader";
import Wishlist from "./Wishlist";
import Modal from "../ProductModal/Index";
export default function Index() {
  return (
    <div>
      <PageHeader title="Wishlist" />
      <Wishlist />
      <Modal />
    </div>
  );
}
