import React from "react";
import PageHeader from "../../Components/layout/Header/PageHeader";
import FrequentlyAsked from "./FrequentlyAsked";
import { servicesFaqs } from "./data";
import ServiceSection from "../../Components/ServiceSection";
import FaqsInfo from "./FaqsInfo";

export default function Index() {
  return (
    <div>
      <PageHeader title="FAQ'S" middleBreadcrumb="PAGES" />
      <FrequentlyAsked />
      <ServiceSection
        services={servicesFaqs}
        className="section-color-light"
        pageType="second"
        titleClass="title-faqs"
      />
      <FaqsInfo />
    </div>
  );
}
