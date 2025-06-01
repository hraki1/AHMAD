import React, { useState } from "react";
import { faqData } from "./data";
import { useTranslation } from "react-i18next";
export default function ContactPage() {
  // State to track form input values
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  // State to track validation errors
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear error when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  // Validate the form
  const validateForm = () => {
    let isValid = true;
    const newErrors = { ...errors };

    // Check if all fields are filled
    for (const field in formData) {
      if (!formData[field].trim()) {
        newErrors[field] = `${
          field.charAt(0).toUpperCase() + field.slice(1)
        } is required`;
        isValid = false;
      }
    }

    // Phone number validation - must be at least 10 digits
    if (formData.phone.trim()) {
      const digitsOnly = formData.phone.replace(/\D/g, "");
      if (digitsOnly.length < 10) {
        newErrors.phone = "Phone number must be at least 10 digits";
        isValid = false;
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission

    // Validate form before proceeding
    if (validateForm()) {
      // Print form data to console
      console.log("Form Data:", formData);
    }
  };

  const { t } = useTranslation();
  return (
    <div id="page-content" className="mt-5">
      <div className="container contact-style2">
        <div className="contact-form-details section pt-0">
          <div className="row">
            <div className="col-lg-6">
              {/* Contact Form */}
              <div className="formFeilds contact-form form-vertical mb-4 mb-lg-0">
                <div className="section-header">
                  <div className="main-title-heading">
                    {t(`Send_Us_a_Message`)}
                  </div>
                  <div className="main-italic">{t(`CanContact`)}</div>
                </div>

                <form
                  id="contact-form"
                  className="contact-form"
                  onSubmit={handleSubmit}
                >
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <input
                          type="text"
                          id="ContactFormName"
                          name="name"
                          className="form-control"
                          placeholder={t("form.name")}
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                        />
                        <span className="error_msg" id="name_error">
                          {errors.name}
                        </span>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <input
                          type="email"
                          id="ContactFormEmail"
                          name="email"
                          className="form-control"
                          placeholder={t("form.email")}
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                        />
                        <span className="error_msg" id="email_error">
                          {errors.email}
                        </span>
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
                          placeholder={t("form.phone")}
                          value={formData.phone}
                          onChange={handleInputChange}
                          required
                        />
                        <span className="error_msg" id="phone_error">
                          {errors.phone}
                        </span>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <input
                          type="text"
                          id="ContactSubject"
                          name="subject"
                          className="form-control"
                          placeholder={t("form.subject")}
                          value={formData.subject}
                          onChange={handleInputChange}
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
                      placeholder={t("form.message")}
                      value={formData.message}
                      onChange={handleInputChange}
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
                  {t(`PeopleUsuallyAsk`)}
                </div>
                <div className="main-italic">{t(`HappyToAnswer`)}</div>
              </div>

              <div className="contact-details faqs-style faqs-style1">
                <div className="accordion" id="accordionFaq">
                  {faqData.map((faq, idx) => (
                    <div className="accordion-item" key={idx}>
                      <h2 className="accordion-header " id={`heading${idx}`}>
                        <button
                          className="accordion-button collapsed drop-header-con"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target={`#collapse${idx}`}
                          aria-expanded="false"
                          aria-controls={`collapse${idx}`}
                        >
                          {t(faq.question)}
                          <i className="fas fa-plus ms-auto"></i>
                        </button>
                      </h2>
                      <div
                        id={`collapse${idx}`}
                        className="accordion-collapse collapse"
                        aria-labelledby={`heading${idx}`}
                        data-bs-parent="#accordionFaq"
                      >
                        <div className="accordion-body">
                          <div className="desc-content">{t(faq.answer)}</div>
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
