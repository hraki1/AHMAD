import React from "react";
import PageHeader from "../../Components/layout/Header/PageHeader";
import ServiceSection from "../../Components/ServiceSection";
import { servicesAbout } from "./data";
import ContactPage from "./ContactPage";
import ContactMap from "./ContactMap";

export default function Index() {
  return (
    <div>
      <PageHeader title="CONTACT US" middleBreadcrumb="PAGES" />
      <ServiceSection
        services={servicesAbout}
        className="section-color-light"
        pageType="second"
      />
      <ContactPage />
      <ContactMap />
    </div>
  );
}
