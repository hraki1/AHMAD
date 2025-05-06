import React from "react";
import { Link } from "react-router-dom";

const Button = ({ label, href, primary, className = "", type, to }) => {
  const classes = `btn ${
    primary ? "btn-primary" : "btn-secondary"
  } ${className}`;

  if (href) {
    // If `href` is provided, use Link for navigation
    return (
      <Link to={href} className={classes}>
        {label}
      </Link>
    );
  }

  if (to) {
    // If `to` is provided, use Link for navigation
    return (
      <Link to={to} className={classes}>
        {label}
      </Link>
    );
  }

  // If no `href` or `to`, render a button (used for forms)
  return (
    <button type={type || "button"} className={classes}>
      {label}
    </button>
  );
};

export default Button;
