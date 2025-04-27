import React from "react";

const Button = ({ label, href, primary }) => {
  return (
    <a
      className={`btn ${primary ? "btn-primary" : "btn-secondary"}`}
      href={href}
    >
      {label}
    </a>
  );
};

export default Button;
