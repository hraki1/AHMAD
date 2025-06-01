import React, { useTransition } from "react";
import PageHeader from "../../Components/layout/Header/PageHeader";
import FrequentlyAsked from "./FrequentlyAsked";
import { servicesFaqs } from "./data";
import ServiceSection from "../../Components/ServiceSection";
import FaqsInfo from "./FaqsInfo";
import { useTranslation } from "react-i18next";
export default function Index() {
  const { t } = useTranslation();
  return (
    <div>
      <PageHeader title={t(`FAQ`)} middleBreadcrumb={t(`Pages`)} />
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
