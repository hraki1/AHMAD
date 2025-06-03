import { Link } from "react-router-dom";
import { baseUrl } from "../Pages/API/ApiConfig";
import { useTranslation } from "react-i18next";
const SocialMediaLogin = () => {
  const { t } = useTranslation();
  return (
    <>
      <div className="login-divide">
        <span className="login-divide-text">{t(`OR`)}</span>
      </div>

      <div className="sub-banner text-center mb-3">
        {t(`Sign_in_with_social_account`)}
      </div>
      <div className="login-social d-flex-justify-center">
        <Link
          to={baseUrl + "/api/auth/google"}
          className="social-link facebook rounded-5 d-flex-justify-center"
          style={{ backgroundColor: "red" }}
        >
          {" "}
          <i className="fa-brands fa-google mx-1"></i> Google
        </Link>
      </div>
    </>
  );
};

export default SocialMediaLogin;
