import React from "react";
import PageHeader from "../../Components/layout/Header/PageHeader";
import DashboardSidebar from "./DashboardSidebar";

export default function Index() {
  return (
    <div>
      <PageHeader title="MY ACCOUNT" middleBreadcrumb="PAGES" />
      <DashboardSidebar />
    </div>
  );
}
