import React from "react";
import PageHeader from "../../Components/layout/Header/PageHeader";
import Cms from "./Cms";

export default function Index() {
  return (
    <div>
      <PageHeader title="INFORMATION PAGE" middleBreadcrumb="PAGES" />
      <Cms />
    </div>
  );
}
