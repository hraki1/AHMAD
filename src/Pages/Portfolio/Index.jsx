import React from "react";
import PageHeader from "../../Components/layout/Header/PageHeader";
import PortfolioList from "./PortfolioList";

export default function Index() {
  return (
    <div>
      <PageHeader title="PORTFOLIO" middleBreadcrumb="PAGES" />
      <PortfolioList />
    </div>
  );
}
