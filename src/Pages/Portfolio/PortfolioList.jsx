import React, { useState } from "react";
import PortfolioNav from "./PortfolioNav";
import PortfolioItem from "./PortfolioItem";
import { projects } from "./data";
import PortfolioModal from "./PortfolioModal";

const PortfolioList = () => {
  const [filter, setFilter] = useState("*");

  const filteredProjects =
    filter === "*"
      ? projects
      : projects.filter(
          (project) => project.category === filter || filter === "*"
        );

  return (
    <div className="container">
      <div className="page-title text-center mb-4">
        <div className="main-title-heading">Portfolio Style</div>
        <div className="desc-title-page">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. <br />
          Lorem Ipsum has been the industry's standard dummy text ever since the
          1500s.
        </div>
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
