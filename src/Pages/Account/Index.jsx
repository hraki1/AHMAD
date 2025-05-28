import React, { useContext } from "react";
import PageHeader from "../../Components/layout/Header/PageHeader";
import DashboardSidebar from "./DashboardSidebar";
import { AuthContext } from "../../Context/AuthContext";
import Spinner from "../../Components/UI/SpinnerLoading";

export default function Index() {
  const { isAuthenticated, isLoading } = useContext(AuthContext);

  if (isLoading) {
    return (
      <div style={{ height: "100vh" }}>
        <Spinner />
      </div>
    );
  }

  return (
    <div>
      <PageHeader title="MY ACCOUNT" middleBreadcrumb="PAGES" />
      <DashboardSidebar />
    </div>
  );
}
