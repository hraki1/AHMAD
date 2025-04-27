import React, { useState } from "react";

const CollapsibleLinks = ({ title, children }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="footer-links mb-3">
      <h4
        className="h4 d-flex align-items-center justify-content-between pointer"
        onClick={() => setOpen(!open)}
      >
        {title}
        <i className="fa-solid fa-bars fa-lg d-lg-none" />
      </h4>
      <ul
        className={`list-unstyled mb-0 ${
          open ? "d-block" : "d-none d-lg-block"
        }`}
      >
        {children}
      </ul>
    </div>
  );
};

export default CollapsibleLinks;
