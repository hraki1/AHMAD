import React from "react";
import { Link } from "react-router-dom";

const Button = ({
  label,
  href,
  primary,
  className = "",
  type,
  to,
  onClick,
}) => {
  const classes = `btn ${
    primary ? "btn-primary" : "btn-secondary"
  } ${className}`;

  if (href) {
    return (
      <Link to={href} className={classes}>
        {label}
      </Link>
    );
  }

  if (to) {
    return (
      <Link to={to} className={classes}>
        {label}
      </Link>
    );
  }

  return (
    <button type={type || "button"} className={classes} onClick={onClick}>
      {label}
    </button>
  );
};

export default Button;
