import React from "react";
import { faqData } from "./data";

export default function ContactPage() {
  return (
    <div id="page-content mt-5">
      <div className="container contact-style2">
        <div className="contact-form-details section pt-0">
          <div className="row">
            <div className="col-lg-6">
              {/* Contact Form */}
              <div className="formFeilds contact-form form-vertical mb-4 mb-lg-0">
                <div className="section-header">
                  <div className="main-title-heading">Send Us a Message</div>
                  <div className="main-italic">
                    You can contact us any way that is convenient for you.
                  </div>
                </div>

                <form
                  action="php/ajax_sendmail.php"
                  method="post"
                  id="contact-form"
                  className="contact-form"
                >
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <input
                          type="text"
                          id="ContactFormName"
                          name="name"
                          className="form-control"
                          placeholder="Name"
                        />
                        <span className="error_msg" id="name_error"></span>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <input
                          type="email"
                          id="ContactFormEmail"
                          name="email"
                          className="form-control"
                          placeholder="Email"
                        />
                        <span className="error_msg" id="email_error"></span>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <input
                          className="form-control"
                          type="tel"
                          id="ContactFormPhone"
                          name="phone"
                          pattern="[0-9\-]*"
                          placeholder="Phone Number"
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <input
                          type="text"
                          id="ContactSubject"
                          name="subject"
                          className="form-control"
                          placeholder="Subject"
                        />
                        <span className="error_msg" id="subject_error"></span>
                      </div>
                    </div>
                  </div>

                  <div className="form-group">
                    <textarea
                      id="ContactFormMessage"
                      name="message"
                      className="form-control"
                      rows="6"
                      placeholder="Message"
                    ></textarea>
                    <span className="error_msg" id="message_error"></span>
                  </div>

                  <div className="form-group mailsendbtn mb-0 w-100">
                    <input
                      className="btn btn-lg"
                      type="submit"
                      name="contactus"
                      value="Send Message"
                    />
                    <div className="loading">
                      <img
                        className="img-fluid"
                        src="assets/images/icons/ajax-loader.gif"
                        alt="loading"
                      />
                    </div>
                  </div>
                </form>
                <div className="response-msg"></div>
              </div>
            </div>

            {/* FAQs Section */}
            <div className="col-lg-6">
              <div className="section-header">
                <div className="main-title-heading">
                  People usually ask these
                </div>
                <div className="main-italic">
                  We would be happy to answer your questions.
                </div>
              </div>

              <div className="contact-details faqs-style faqs-style1">
                <div className="accordion" id="accordionFaq">
                  {faqData.map((faq, idx) => (
                    <div className="accordion-item" key={idx}>
                      <h2 className="accordion-header" id={`heading${idx}`}>
                        <button
                          className="accordion-button collapsed"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target={`#collapse${idx}`}
                          aria-expanded="false"
                          aria-controls={`collapse${idx}`}
                        >
                          {faq.question}
                          <i className="fas fa-plus ms-auto"></i>
                        </button>
                      </h2>
                      <div
                        id={`collapse${idx}`}
                        className={`accordion-collapse collapse${
                          idx === 0 ? " show" : ""
                        }`}
                        aria-labelledby={`heading${idx}`}
                        data-bs-parent="#accordionFaq"
                      >
                        <div className="accordion-body">
                          <div className="desc-content">{faq.answer}</div>
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
