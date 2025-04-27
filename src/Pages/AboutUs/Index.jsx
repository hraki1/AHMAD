import React from "react";
import PageHeader from "../../Components/layout/Header/PageHeader";
import KindServices from "./KindServices";
import { counterData, servicesAbout } from "./data";
import CounterSection from "./CounterSection";
import TeamMember from "./TeamMember";
import ServiceSection from "../../Components/ServiceSection";
import Video from "./Video";
export default function Index() {
  return (
    <div>
      <PageHeader title="About Us" middleBreadcrumb="Pages" />
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
