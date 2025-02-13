import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";

export default function CredentialsDetails({
  formData,
  updateFormData,
  errors,
  validateField,
}) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleInputChange = (field, value) => {
    updateFormData(field, value);
    validateField(field);
  };

  return (
    <div className="flex w-full p-2">
      <div className="w-full">
        <h1 className="block text-left w-full text-gray-800 text-2xl font-bold mb-6">
          Credentials Details
        </h1>
        <form>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-700 text-left">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              className={`w-full px-3 py-3 text-sm leading-tight text-gray-700 border rounded appearance-none focus:outline-none focus:shadow-outline ${
                errors?.email ? "border-red-500" : "border-gray-200"
              }`}
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              onBlur={() => validateField("email")}
            />
            {errors?.email && (
              <p className="text-red-500 text-sm mt-1 text-start">{errors.email}</p>
            )}
          </div>

          <div className="grid gap-2 md:grid-cols-2">
            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium text-left text-gray-700">
                Password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  className={`w-full px-3 py-3 text-sm leading-tight text-gray-700 border rounded appearance-none focus:outline-none focus:shadow-outline ${
                    errors?.password ? "border-red-500" : "border-gray-200"
                  }`}
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={formData.password}
                  onChange={(e) =>
                    handleInputChange("password", e.target.value)
                  }
                  onBlur={() => validateField("password")}
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
              {errors?.password && (
                <p className="text-red-500 text-sm mt-1 text-start">{errors.password}</p>
              )}
            </div>

            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium text-left text-gray-700">
                Confirm Password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  className={`w-full px-3 py-3 text-sm leading-tight text-gray-700 border rounded appearance-none focus:outline-none focus:shadow-outline ${
                    errors?.password_confirmation
                      ? "border-red-500"
                      : "border-gray-200"
                  }`}
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  value={formData.password_confirmation}
                  onChange={(e) =>
                    handleInputChange("password_confirmation", e.target.value)
                  }
                  onBlur={() => validateField("password_confirmation")}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 px-3 flex items-center"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <FontAwesomeIcon icon={faEye} />
                  ) : (
                    <FontAwesomeIcon icon={faEyeSlash} />
                  )}{" "}
                </button>
              </div>
              {errors?.password_confirmation && (
                <p className="text-red-500 text-sm mt-1 text-start">
                  {errors.password_confirmation}
                </p>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
