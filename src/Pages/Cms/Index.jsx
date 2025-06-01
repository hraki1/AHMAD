import React from "react";
import PageHeader from "../../Components/layout/Header/PageHeader";
import Cms from "./Cms";
import { useTranslation } from "react-i18next";
export default function Index() {
  const { t } = useTranslation();
  return (
    <div>
      <PageHeader title={t(`INFORMATION_PAGE`)} middleBreadcrumb={t(`Pages`)} />
      <Cms />
    </div>
  );
}
