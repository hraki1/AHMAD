import React from "react";
import { faqData } from "./data";

const FAQSection = () => {
  return (
    <div class="row faqs-style mt-5">
      <div class="col-12 col-sm-12 col-md-12 col-lg-10 mx-auto">
        <div class="accordion" id="accordionFaq">
          {faqData.map((section, i) => (
            <div className="section pt-0" key={i}>
              <h3 className="main-title-2 mb-3 ms-2">{section.title}</h3>
              <div className="accordion" id={`accordionFaq-${i}`}>
                {section.questions.map((item, j) => {
                  const itemId = `faq-${i}-${j}`;
                  return (
                    <div
                      className={`accordion-item ${
                        j === section.questions.length - 1 ? "mb-0" : ""
                      }`}
                      key={itemId}
                    >
                      <h2 className="accordion-header" id={`heading-${itemId}`}>
                        <button
                          className="accordion-button collapsed"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target={`#collapse-${itemId}`}
                          aria-expanded="false"
                          aria-controls={`collapse-${itemId}`}
                        >
                          {item.question}
                        </button>
                      </h2>
                      <div
                        id={`collapse-${itemId}`}
                        className="accordion-collapse collapse"
                        aria-labelledby={`heading-${itemId}`}
                        data-bs-parent={`#accordionFaq-${i}`}
                      >
                        <div className="accordion-body">
                          <div className="desc-content">{item.answer}</div>

                          {item.image && (
                            <div className="mt-3">
                              <img
                                src={item.image}
                                alt="FAQ related"
                                className="img-fluid rounded"
                              />
                            </div>
                          )}

                          {item.more && (
                            <ul className="mt-3">
                              {item.more.map((point, idx) => (
                                <li key={idx}>{point}</li>
                              ))}
                            </ul>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQSection;
