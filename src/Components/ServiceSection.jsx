import React from "react";
import PropTypes from "prop-types";

/**
 * @param services
 */
export default function ServiceSection({
  services,
  className,
  pageType,
  titleClass,
}) {
  return (
    <section
      className={`section service-section ${
        pageType === "first" ? "pb-0" : ""
      } ${className}`}
    >
      <div className="container">
        <div className="service-info row col-row row-cols-lg-4 row-cols-md-4 row-cols-sm-2 row-cols-2 text-center">
          {services.map((s, i) => (
            <div key={i} className="service-wrap col-item">
              <div className="service-icon mb-3">
                <i className={`icon  ${s.icon}`} aria-hidden="true"></i>
              </div>
              <div className="service-content">
                <div className={`title mb-2 ${titleClass}`}>{s.title}</div>
                {s.link ? (
                  <a
                    href={s.link}
                    className="text-muted"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {s.subtitle}
                  </a>
                ) : (
                  <span className="text-muted">{s.subtitle}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

ServiceSection.propTypes = {
  services: PropTypes.arrayOf(
    PropTypes.shape({
      icon: PropTypes.string.isRequired, // : "fa-solid fa-phone"
      title: PropTypes.string.isRequired,
      subtitle: PropTypes.string.isRequired,
      link: PropTypes.string, // ✅ Not Requierd
    })
  ).isRequired,
};
