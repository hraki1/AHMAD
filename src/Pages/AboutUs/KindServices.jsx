import React, { useState } from "react";
import aboutImage from "../../assets/images/about/about4.jpg"; // استيراد الصورة
import { useTranslation } from "react-i18next";
export default function KindServices() {
  const [activeAccordion, setActiveAccordion] = useState(null);

  const toggleAccordion = (index) => {
    setActiveAccordion(activeAccordion === index ? null : index);
  };
  const { t } = useTranslation();
  const accordionItems = t("accordionItems", { returnObjects: true }).map(
    (item, index) => ({
      id: index + 1,
      ...item,
    })
  );

  return (
    <div>
      <div className="destination-section section pt-0">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-12 col-sm-12 col-md-6">
              <div className="about-images">
                <img
                  className="rounded-0 w-100 blur-up lazyload"
                  src={aboutImage}
                  alt="about"
                  width="700"
                  height="600"
                />
              </div>
            </div>
            <div className="col-12 col-sm-12 col-md-6">
              <div className="about-details faqs-style faqs-style2 px-50">
                <div className="main-title-abousUs">
                  {t("kindServiceTitle")}
                </div>
                <div className="desc-content-about">{t("kindServiceDesc")}</div>
                <div className="accordion" id="accordionFaq">
                  {accordionItems.map(({ id, title, content }) => (
                    <div className="accordion-item" key={id}>
                      <h2 className="accordion-header" id={`heading${id}`}>
                        <button
                          className="accordion-button d-flex justify-content-between align-items-center"
                          type="button"
                          onClick={() => toggleAccordion(id)}
                        >
                          <span className="flex-grow-1">{title}</span>
                          <span className="icon-container">
                            <i
                              className={`fas fa-plus ${
                                activeAccordion === id ? "rotate" : ""
                              }`}
                            ></i>
                          </span>
                        </button>
                      </h2>
                      <div
                        className={`accordion-collapse collapse ${
                          activeAccordion === id ? "show" : ""
                        }`}
                        aria-labelledby={`heading${id}`}
                      >
                        <div className="accordion-body">
                          <div className="desc-content">{content}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
