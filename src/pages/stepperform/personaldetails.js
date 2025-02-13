import { faCameraAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";

export default function PersonalDetails({
  formData,
  updateFormData,
  errors,
  validateField,
}) {
  const [previewImage, setPreviewImage] = useState(formData?.photo || "");

  const SUPPORTED_FORMATS = [
    "image/jpeg",
    "image/png",
    "image/jpg",
    "image/gif",
    "image/svg+xml",
  ];

  const handleImageUpload = (e) => {
    const file = e.target.files[0];

    if (file) {
      if (
        !SUPPORTED_FORMATS.includes(file.type) ||
        file.size > 2 * 1024 * 1024
      ) {
        validateField("photo");
        return;
      }

      // Store the actual file object in formData
      updateFormData("photo", file);

      // Generate a preview for UI display
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (field, value) => {
    updateFormData(field, value);
  };

  return (
    <div className="flex w-full p-2">
      <div className="w-full">
        <h1 className="block text-left w-full text-gray-500 text-2xl font-bold mb-6">
          Personal Details
        </h1>
        <form>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-700 text-left">
              Profile Image <span className="text-red-500">*</span>
            </label>
            <div className="mt-1 flex flex-col items-start">
              <span className="inline-block w-20 h-20 rounded-full overflow-hidden bg-gray-100">
                {previewImage ? (
                  <img
                    src={previewImage}
                    alt="profilepic"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="w-full h-full flex items-center justify-center bg-gray-300">
                    <FontAwesomeIcon icon={faCameraAlt} />{" "}
                  </span>
                )}
              </span>
              <div className="flex items-center justify-center bg-grey-lighter">
                <label className="w-50 flex flex-col items-center px-4 py-2 mt-5 bg-blue-300 text-gray-700 rounded-lg shadow-lg tracking-wide border border-blue cursor-pointer hover:bg-blue hover:text-white">
                  <span className="text-base leading-normal">Upload Image</span>
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageUpload}
                    onBlur={() => validateField("photo")}
                  />
                </label>
              </div>
            </div>
            {errors?.photo && (
              <p className="text-red-500 text-sm text-start">{errors.photo}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-700 text-left">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              className={`w-full px-3 py-3 text-sm leading-tight text-gray-700 border rounded appearance-none focus:outline-none focus:shadow-outline ${
                errors?.name ? "border-red-500" : "border-gray-200"
              }`}
              type="text"
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              onBlur={() => validateField("name")}
              placeholder="Enter Name"
            />
            {errors?.name && (
              <p className="text-red-500 text-sm text-start">{errors.name}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-700 text-left">
              Gender <span className="text-red-500">*</span>
            </label>
            <div className="flex space-x-7">
              {["Male", "Female", "Others"].map((gender) => (
                <div key={gender} className="flex items-center">
                  <input
                    type="radio"
                    value={gender}
                    name="gender"
                    checked={formData.gender === gender}
                    onChange={() => {
                      handleChange("gender", gender);
                      validateField("gender");
                    }}
                    onBlur={() => validateField("gender")}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-200 focus:ring-blue-500 focus:ring-2"
                  />
                  <label className="ms-2 text-sm font-medium text-gray-900">
                    {gender}
                  </label>
                </div>
              ))}
            </div>
            {errors?.gender && (
              <p className="text-red-500 text-sm text-start">{errors.gender}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-700 text-left">
              Phone Number <span className="text-red-500">*</span>
            </label>
            <input
              className={`w-full px-3 py-3 text-sm leading-tight text-gray-700 border rounded appearance-none focus:outline-none focus:shadow-outline ${
                errors?.phoneNumber ? "border-red-500" : "border-gray-200"
              }`}
              type="number"
              value={formData.phoneNumber}
              onChange={(e) => handleChange("phoneNumber", e.target.value)}
              onBlur={() => validateField("phoneNumber")}
              placeholder="Phone Number"
            />
            {errors?.phoneNumber && (
              <p className="text-red-500 text-sm text-start">
                {errors.phoneNumber}
              </p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
