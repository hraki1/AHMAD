import React, { useState } from "react";
import aboutImage from "../../assets/images/about/about4.jpg"; // استيراد الصورة
import { accordionItems } from "./data";

export default function KindServices() {
  const [activeAccordion, setActiveAccordion] = useState(null);

  const toggleAccordion = (index) => {
    setActiveAccordion(activeAccordion === index ? null : index);
  };

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
                  We Provide Continuous & Kind Service for Customers
                </div>
                <div className="desc-content-about">
                  There are many variations of passages of Lorem Ipsum
                  available, but the majority have suffered alteration in some
                  form, by injected humour, or randomised words which don't look
                  even slightly believable. If you are going to use a passage of
                  Lorem Ipsum, you need to be sure there isn't anything
                  embarrassing hidden in the middle of text..
                </div>
                <div className="accordion" id="accordionFaq">
                  {accordionItems.map(({ id, title, content }) => (
                    <div className="accordion-item" key={id}>
                      <h2 className="accordion-header" id={`heading${id}`}>
                        <button
                          className="accordion-button"
                          type="button"
                          onClick={() => toggleAccordion(id)}
                        >
                          {title}
                          <i
                            className={`fas fa-plus ms-auto ${
                              activeAccordion === id ? "rotate" : ""
                            }`}
                          ></i>
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
