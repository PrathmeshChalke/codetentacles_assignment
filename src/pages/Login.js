import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api/Auth";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const validateForm = (field) => {
    let newErrors = { ...errors };

    if (field === "email" || !field) {
      if (!email) {
        newErrors.email = "Please enter a Email Address.";
      } else if (!/^\S+@\S+\.\S+$/.test(email)) {
        newErrors.email = "Invalid email format.";
      } else {
        newErrors.email = "";
      }
    }

    if (field === "password" || !field) {
      if (!password) {
        newErrors.password = "Please enter a Password.";
      } else if (password.length < 6) {
        newErrors.password = "Password must be at least 6 characters.";
      } else {
        newErrors.password = "";
      }
    }

    setErrors(newErrors);
    return !newErrors.email && !newErrors.password;
  };

  const handleInputChange = (field, value) => {
    if (field === "email") {
      setEmail(value);
    } else if (field === "password") {
      setPassword(value);
    }

    // Clear the error for the field when user starts typing
    setErrors((prevErrors) => ({ ...prevErrors, [field]: "" }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!validateForm()) {
      return;
    }
    setLoading(true);

    try {
      const data = await loginUser(email, password);
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);

      Swal.fire({
        title: "Login Successful",
        text: "Welcome to the dashboard!",
        icon: "success",
        timer: 2000,
        showConfirmButton: true,
      });

      const role = localStorage.getItem("role");
      {
        role === "Admin" && navigate("/List");
      }
      {
        role !== "Admin" && navigate("/Product");
      }
    } catch (err) {
      setError(err);
      Swal.fire({
        title: err,
        icon: "error",
        timer: 2000,
        showConfirmButton: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section
        className="border-red-500 login-form min-h-screen flex items-center justify-center bg-img"
        style={{ backgroundImage: "url('/assets/image/bbblurry.svg')" }}
      >
        <div className="container mx-auto">
          <div className="flex justify-center px-6 my-12">
            <div className="w-96 flex">
              <div className="w-full bg-login p-6 rounded-lg">
                <div className="heading-1 pt-10 m-auto">
                  <img
                    src="https://i.pinimg.com/originals/0a/5f/ea/0a5feae400fc816c4ca2aca8bd67a168.jpg"
                    alt="login-img"
                    className="rounded-full m-auto p-1 border"
                    width="100px"
                    height="100px"
                  />
                  <h3 className="pt-8 font-bold text-4xl text-center tracking-wider text-white">
                    Login
                  </h3>
                  {error && (
                    <p className="text-red-500 text-sm text-center">{error}</p>
                  )}
                </div>
                <form
                  className="pt-8 rounded"
                  onSubmit={handleLogin}
                  noValidate
                >
                  <div className="mb-4">
                    <input
                      className="w-full p-2 mb-1 border rounded"
                      type="email"
                      placeholder="Email"
                      value={email}
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
                      onBlur={() => validateForm("email")}
                    />
                    {errors.email && (
                      <p className="text-red-500 text-xs text-start">
                        {errors.email}
                      </p>
                    )}
                  </div>
                  <div className="mb-4 md:mr-2">
                    <div className="relative">
                      <input
                        className="w-full p-2 mb-1 border rounded"
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        value={password}
                        onChange={(e) =>
                          handleInputChange("password", e.target.value)
                        }
                        onBlur={() => validateForm("password")}
                      />
                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 px-3 flex items-center"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <FontAwesomeIcon icon={faEye} />
                        ) : (
                          <FontAwesomeIcon icon={faEyeSlash} />
                        )}
                      </button>
                    </div>
                    {errors.password && (
                      <p className="text-red-500 text-xs text-start">
                        {errors.password}
                      </p>
                    )}
                  </div>
                  <div className="mb-6 text-center">
                    <button
                      className="w-full bg-blue-600 text-white p-2 rounded flex items-center justify-center"
                      type="submit"
                      disabled={loading}
                    >
                      {loading ? (
                        <svg
                          className="animate-spin h-5 w-5 mr-3 border-t-2 border-white rounded-full"
                          viewBox="0 0 24 24"
                        ></svg>
                      ) : (
                        "Login"
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
