import React, { useState } from "react";
import { Link } from "react-router-dom";

const PortfolioNav = ({ onFilterChange }) => {
  const [activeFilter, setActiveFilter] = useState("*");

  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
    onFilterChange(filter);
  };

  return (
    <nav className="nav justify-content-center mb-4 pb-2 portfolio-nav">
      <Link
        className={`nav-item btn ${activeFilter === "*" ? "active" : ""}`}
        to="#"
        onClick={() => handleFilterChange("*")}
      >
        All
      </Link>
      <Link
        className={`nav-item btn ${
          activeFilter === "pfashion" ? "active" : ""
        }`}
        to="#"
        onClick={() => handleFilterChange("pfashion")}
      >
        Fashion
      </Link>
      <Link
        className={`nav-item btn ${activeFilter === "pshoes" ? "active" : ""}`}
        to="#"
        onClick={() => handleFilterChange("pshoes")}
      >
        Shoes
      </Link>
      <Link
        className={`nav-item btn ${
          activeFilter === "pelectronic" ? "active" : ""
        }`}
        to="#"
        onClick={() => handleFilterChange("pelectronic")}
      >
        Electronic
      </Link>
    </nav>
  );
};

export default PortfolioNav;
