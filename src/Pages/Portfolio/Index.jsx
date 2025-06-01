import React from "react";
import PageHeader from "../../Components/layout/Header/PageHeader";
import PortfolioList from "./PortfolioList";
import { useTranslation } from "react-i18next";
export default function Index() {
  const { t } = useTranslation();
  return (
    <div>
      <PageHeader title={t(`Portfolio`)} middleBreadcrumb={t(`Pages`)} />
      <PortfolioList />
    </div>
  );
}
