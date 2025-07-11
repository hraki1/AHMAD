import React, { useState, useContext } from "react";
import englishFlag from "../../../assets/images/flag/english.png";
import arabicFlag from "../../../assets/images/flag/arabic.png";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../Context/AuthContext";

const flags = {
  english: { img: englishFlag, label: "English" },
  arabic: { img: arabicFlag, label: "Arabic" },
};

const TopHeader = () => {
  const { i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();

  const language = i18n.language.startsWith("ar") ? "arabic" : "english";

  const handleLanguageChange = (lang) => {
    i18n.changeLanguage(lang === "arabic" ? "ar" : "en");
    setOpen(false);
  };

  const toggleOpen = () => setOpen((prev) => !prev);

  const ctx = useContext(AuthContext);

  return (
    <div className="top-header">
      <div className="container">
        <div className="row align-items-center">
          {/* Left */}
          <div className="col-6 col-md-3 col-lg-4 ">
            <div className="phone-container" style={{ direction: "ltr" }}>
              <i className="fa-solid fa-phone"></i>
              <a href="tel:+962779523688 ">(+962) 779 523 688</a>
            </div>
            {ctx.isLoggedIn && (
              <h1>Auth Test if you see it that's mean you are authenticated</h1>
            )}
          </div>

          {/* Middle */}
          <div className="d-none d-md-block col-md-6 col-lg-4 text-center">
            {t("free_shipping")}
            <Link to="/ShopGrid" className="text-link ms-1">
              {t("shop_now")}
            </Link>
          </div>

          {/* Right - Language Picker */}
          <div className="col-6 col-md-3 col-lg-4 d-flex justify-content-end">
            <div className="language-picker position-relative">
              <div
                className="default-option d-flex align-items-center"
                onClick={toggleOpen}
                style={{ cursor: "pointer" }}
              >
                <img
                  src={flags[language].img}
                  alt={language}
                  width="24"
                  height="24"
                  className="mx-1"
                />
                <span>{flags[language].label}</span>
                <i className="fa-solid fa-caret-down ms-1"></i>
              </div>

              {open && (
                <ul className="select-ul list-unstyled shadow position-absolute bg-white mt-2 p-2 rounded select-language">
                  {Object.keys(flags).map(
                    (lang) =>
                      lang !== language && (
                        <li key={lang}>
                          <div
                            className="option d-flex align-items-center py-1 px-2"
                            style={{ cursor: "pointer" }}
                            onClick={() => handleLanguageChange(lang)}
                          >
                            <img
                              src={flags[lang].img}
                              alt={lang}
                              width="24"
                              height="24"
                              className="me-1"
                            />
                            <span className="">{flags[lang].label}</span>
                          </div>
                        </li>
                      )
                  )}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopHeader;
