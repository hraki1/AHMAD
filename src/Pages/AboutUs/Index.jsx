import React from "react";
import PageHeader from "../../Components/layout/Header/PageHeader";
import KindServices from "./KindServices";
import { counterData, servicesAbout } from "./data";
import CounterSection from "./CounterSection";
import TeamMember from "./TeamMember";
import ServiceSection from "../../Components/ServiceSection";
import Video from "./Video";
import { useTranslation } from "react-i18next";
export default function Index() {
  const { t } = useTranslation();
  return (
    <div>
      <PageHeader title={t("AboutUs")} middleBreadcrumb="Pages" />
      <KindServices />
      <CounterSection counterData={counterData} />
      <TeamMember />
      <ServiceSection
        services={servicesAbout}
        className="section-color-light"
        pageType="second"
      />
      <Video />
    </div>
  );
}
