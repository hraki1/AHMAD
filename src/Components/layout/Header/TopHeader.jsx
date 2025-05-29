import React, { useState } from "react";
import englishFlag from "../../../assets/images/flag/english.png";
import arabicFlag from "../../../assets/images/flag/arabic.png";
import frenchFlag from "../../../assets/images/flag/french.png";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../../Context/AuthContext";

const flags = {
  english: { img: englishFlag, label: "English" },
  arabic: { img: arabicFlag, label: "Arabic" },
  french: { img: frenchFlag, label: "French" },
};

const TopHeader = () => {
  const [language, setLanguage] = useState("english");
  const [open, setOpen] = useState(false);

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
    setOpen(false);
  };

  const toggleOpen = () => setOpen((prev) => !prev);

  const ctx = useContext(AuthContext);

  console.log(ctx);

  return (
    <div className="top-header">
      <div className="container">
        <div className="row align-items-center">
          {/*  Left */}
          <div className="col-6 col-md-3 col-lg-4 text-left">
            <i className="fa-solid fa-phone"></i>
            <a href="tel:+962779523688">(+962) 779 523 688</a>
            {ctx.isLoggedIn === true && (
              <h1>Auth Test if you see it thta's mean you are authenticat</h1>
            )}
          </div>

          {/* Middle */}
          <div className="d-none d-md-block col-md-6 col-lg-4 text-center">
            Free shipping on all orders over $99
            <Link to="/ShopGrid" className="text-link ms-1">
              Shop now
            </Link>
          </div>

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
                  className="me-1"
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
                            <span>{flags[lang].label}</span>
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
