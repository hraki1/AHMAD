import React from "react";
import PageHeader from "../../Components/layout/Header/PageHeader";
import CollectionStyle from "./CollectionStyle";

export default function Index() {
  return (
    <div>
      <PageHeader title="COLLECTIONS STYLE" middleBreadcrumb="SHOP" />
      <CollectionStyle />
    </div>
  );
}
