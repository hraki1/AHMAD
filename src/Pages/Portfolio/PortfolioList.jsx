import React, { useState } from "react";
import PortfolioNav from "./PortfolioNav";
import PortfolioItem from "./PortfolioItem";
import { projects } from "./data";
import PortfolioModal from "./PortfolioModal";
import { useTranslation } from "react-i18next";
const PortfolioList = () => {
  const [filter, setFilter] = useState("*");

  const filteredProjects =
    filter === "*"
      ? projects
      : projects.filter(
          (project) => project.category === filter || filter === "*"
        );
  const { t } = useTranslation();
  return (
    <div className="container">
      <div className="page-title text-center mb-4">
        <div className="main-title-heading">{t(`Portfolio_Style`)}</div>
        <div
          className="desc-title-page"
          dangerouslySetInnerHTML={{ __html: t("Portfolio_Desc") }}
        ></div>
      </div>

      <PortfolioNav onFilterChange={setFilter} />

      <div className="row col-row masonary-filter portfolio-list">
        <div className="grid-sizer"></div>
        {filteredProjects.map((project, index) => (
          <PortfolioItem
            key={index}
            imgSrc={project.imgSrc}
            title={project.title}
            category={project.category}
          />
        ))}
        <PortfolioModal />
      </div>
    </div>
  );
};

export default PortfolioList;
