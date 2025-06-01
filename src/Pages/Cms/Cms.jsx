import React from "react";
import { useTranslation } from "react-i18next";

const Section = ({ title, contents, list, customList }) => {
  const { t } = useTranslation();

  return (
    <div className="section-cms mb-4">
      <div className="main-title-2 mb-3">{title}</div>

      {contents &&
        contents.map((text, idx) => (
          <div key={idx} className="desc-content mb-2">
            {text}
          </div>
        ))}

      {list && list.type === "ul" && (
        <ul className="list-dot">
          {list.items.map((item, idx) => (
            <li key={idx} className="mb-1 desc-content">
              {item}
            </li>
          ))}
        </ul>
      )}

      {list && list.type === "ol" && (
        <ol className="list-decimal">
          {list.items.map((item, idx) => (
            <li key={idx} className="mb-1 desc-content">
              {item}
            </li>
          ))}
        </ol>
      )}

      {customList && (
        <ul className="checkmark-info">
          {customList.map((item, idx) => (
            <li key={idx} className="mb-1">
              <i
                className="fa-regular fa-circle-check me-1"
                style={{ color: "#2f415d" }}
              ></i>
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const Cms = () => {
  const { t } = useTranslation();

  const sections = t("cms.sections", { returnObjects: true });

  return (
    <div id="page-content">
      <div className="container">
        <div className="text-content">
          {sections.map((section, idx) => (
            <Section key={idx} {...section} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Cms;
