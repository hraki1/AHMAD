import React from "react";
import PropTypes from "prop-types";
import { teamData } from "./data";
import { useTranslation } from "react-i18next";
function TeamMember({ member }) {
  const { t } = useTranslation();
  return (
    <div className="team-item col-item">
      <div className="team-img zoom-scal rounded-0">
        <img
          className="rounded-0 blur-up lazyload w-100"
          data-src={member.image}
          src={member.image} // Use the dynamic image prop
          alt={member.name}
          width="350"
          height="350"
        />
        <ul className="list-inline social-icons d-flex-justify-center">
          {Object.entries(member.socialLinks).map(([platform, link]) => (
            <li key={platform} className="list-inline-item">
              <a
                className="clr-none"
                href={link}
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                title={platform.charAt(0).toUpperCase() + platform.slice(1)}
              >
                <i className={`fab fa-${platform}`}></i>
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className="team-bio pt-3">
        <div className="name-person">{t(`teamData.${member.name}`)}</div>
        <div className="sub-name-person">
          {t(`teamPosition.${member.position}`)}
        </div>
      </div>
    </div>
  );
}

TeamMember.propTypes = {
  member: PropTypes.shape({
    name: PropTypes.string.isRequired,
    position: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    socialLinks: PropTypes.objectOf(PropTypes.string).isRequired,
  }).isRequired,
};

export default function TeamSection() {
  const { t } = useTranslation();
  return (
    <div className="team-section section">
      <div className="container">
        <div className="section-header">
          <div className="main-italic mb-2 mt-0">
            {t("Good_leaders_make_it_better")}
          </div>
          <div className="main-title-heading">{t("Meet_Our_Leaders")}</div>
        </div>

        <div className="team-items row col-row row-cols-lg-4 row-cols-md-4 row-cols-sm-2 row-cols-2 text-center">
          {teamData.map((member, index) => (
            <TeamMember key={index} member={member} />
          ))}
        </div>
      </div>
    </div>
  );
}
