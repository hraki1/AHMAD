import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import PageHeader from "../../Components/layout/Header/PageHeader";
import { baseUrl } from "../API/ApiConfig";
export default function Verify() {
  const location = useLocation();
  const navigate = useNavigate();
  const inputsRef = useRef([]);
  const [code, setCode] = useState(new Array(6).fill(""));
  const email = location.state?.email || "";

  const handleChange = (value, index) => {
    if (!/^\d?$/.test(value)) return;
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);
    if (value && index < 5) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  const verifyOTP = async () => {
    const otp = code.join("");
    if (otp.length !== 6) {
      alert("Please enter the full 6-digit code.");
      return;
    }

    try {
      const response = await fetch(`${baseUrl}/api/auth/verify-otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, otp }),
      });

      const result = await response.json();

      if (response.ok) {
        alert("Verification successful!");
        navigate("/"); // Or the next page you want
      } else {
        alert(result.message || "Invalid code.");
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      alert("Network error. Please try again.");
    }
  };

  return (
    <div>
      <PageHeader title="Verify Code" />
      <div className="container">
        <div className="service-info row text-center Verify-boxs">
          <div className="service-wrap col-item Verify-box">
            <div className="service-icon mb-3">
              <i
                className="fa-regular fa-envelope mb-4 icon-verify"
                aria-hidden="true"
              ></i>
              <div className="main-title-2 mb-1">Verify Your Email</div>
              <div className="desc-content mb-5">
                Please Enter The Verification Code We Sent <br />
                To <span>{email}</span>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: "10px",
                }}
              >
                {code.map((digit, index) => (
                  <input
                    key={index}
                    type="text"
                    inputMode="numeric"
                    maxLength="1"
                    value={digit}
                    onChange={(e) => handleChange(e.target.value, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    ref={(el) => (inputsRef.current[index] = el)}
                    style={{
                      width: "45px",
                      height: "50px",
                      textAlign: "center",
                      fontSize: "24px",
                      border: "1px solid #ccc",
                      borderRadius: "8px",
                    }}
                  />
                ))}
              </div>

              <button onClick={verifyOTP} className="btn btn-primary mt-4">
                Verify
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
