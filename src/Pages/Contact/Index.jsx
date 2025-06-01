import React from "react";
import PageHeader from "../../Components/layout/Header/PageHeader";
import ServiceSection from "../../Components/ServiceSection";
import { servicesAbout } from "./data";
import ContactPage from "./ContactPage";
import ContactMap from "./ContactMap";
import { useTranslation } from "react-i18next";
export default function Index() {
  const { t } = useTranslation();
  return (
    <div>
      <PageHeader title={t(`Contact_Us`)} middleBreadcrumb={t(`Pages`)} />
      <ServiceSection
        services={servicesAbout}
        className="section-color-light mb-5"
        pageType="second"
      />
      <ContactPage />
      <ContactMap />
    </div>
  );
}
