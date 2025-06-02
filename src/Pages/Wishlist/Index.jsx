import React from "react";
import PageHeader from "../../Components/layout/Header/PageHeader";
import Wishlist from "./Wishlist";
import Modal from "../ProductModal/Index";
import { useTranslation } from "react-i18next";
export default function Index() {
  const { t } = useTranslation();
  return (
    <div>
      <PageHeader title={t(`Wishlist`)} />
      <Wishlist />
      <Modal />
    </div>
  );
}
