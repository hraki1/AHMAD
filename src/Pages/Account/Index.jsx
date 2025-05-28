import React, { useContext } from "react";
import PageHeader from "../../Components/layout/Header/PageHeader";
import DashboardSidebar from "./DashboardSidebar";
import { AuthContext } from "../../Context/AuthContext";

export default function Index() {
  const ctx = useContext(AuthContext);
  return (
    <div>
      <PageHeader title="MY ACCOUNT" middleBreadcrumb="PAGES" />
      <DashboardSidebar />
    </div>
  );
}
