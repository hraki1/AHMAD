import { Link } from "react-router-dom";
import { baseUrl } from "../Pages/API/ApiConfig";

const SocialMediaLogin = () => {
  return (
    <>
      <div className="login-divide">
        <span className="login-divide-text">OR</span>
      </div>

      <div className="sub-banner text-center mb-3">
        Sign in with social account
      </div>
      <div className="login-social d-flex-justify-center">
        <Link
          to=""
          className="social-link facebook rounded-5 d-flex-justify-center"
        >
          {" "}
          <i className="fa-brands fa-facebook-f mx-1"></i> facebook
        </Link>
        <Link
          to={baseUrl + "/api/auth/google"}
          className="social-link facebook rounded-5 d-flex-justify-center"
          style={{ backgroundColor: "red" }}
        >
          {" "}
          <i className="fa-brands fa-google mx-1"></i> Google
        </Link>
        <Link
          to=""
          className="social-link facebook rounded-5 d-flex-justify-center"
          style={{ backgroundColor: "#000" }}
        >
          {" "}
          <i className="fa-brands fa-x-twitter mx-1"></i> Twitter
        </Link>
      </div>
    </>
  );
};

export default SocialMediaLogin;
