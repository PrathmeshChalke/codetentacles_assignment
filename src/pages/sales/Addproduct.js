import React, { useState } from "react";
import Layout from "../../component/Layout";
import { Link } from "react-router-dom";
import { addProduct } from "../../api/Auth";
import Swal from "sweetalert2";

export default function Addproduct() {
  const [formData, setFormData] = useState({
    name: "",
    image: null,
    description: "",
    price: "",
  });

  const [errors, setErrors] = useState({});

  const [loading, setLoading] = useState(false); // Loader state

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    validateField(name, value);

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setFormData((prev) => ({
        ...prev,
        image: file, // Store file object, not string
      }));

      validateField("image", file);
      setErrors((prevErrors) => ({
        ...prevErrors,
        image: "",
      }));
    }
  };

  const validateField = (name, value) => {
    let errorMsg = "";

    switch (name) {
      case "name":
        if (!value) errorMsg = "Please enter a Product Name.";
        else if (value.length < 3)
          errorMsg = "Product Name Must be at least 3 characters.";
        break;

      case "image":
        if (!value) errorMsg = "Please upload a Product Image.";
        else if (
          !["image/jpeg", "image/png", "image/gif", "image/svg+xml"].includes(
            value.type
          )
        )
          errorMsg = "Invalid file format (Only JPG, PNG, GIF, SVG).";
        break;

      case "description":
        if (!value) errorMsg = "Please enter a Description.";
        else if (value.length < 10)
          errorMsg = "Must be at least 10 characters.";
        break;

      case "price":
        if (!value) errorMsg = "Please enter a Product Price.";
        else if (isNaN(value) || value <= 0)
          errorMsg = "Product Price Must be a valid number greater than 0.";
        break;

      default:
        break;
    }

    setErrors((prevErrors) => ({ ...prevErrors, [name]: errorMsg }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let newErrors = {};
    Object.keys(formData).forEach((key) => {
      validateField(key, formData[key]);
    });

    if (Object.values(errors).some((error) => error)) {
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("price", formData.price);

    if (formData.image) {
      formDataToSend.append("image", formData.image);
    }

    setLoading(true);

    try {
      const response = await addProduct(formDataToSend);

      if (response.success === true) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Product added successfully!",
        });

        setFormData({
          name: "",
          image: null,
          description: "",
          price: "",
        });
      }

      console.log(response);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Layout>
        <div className="bg-white p-4 mb-2 rounded-lg  dark:border-gray-700 mt-14">
          <div>
            <h3 class="!text-defaulttextcolor dark:!text-defaulttextcolor/70 dark:text-white text-left dark:hover:text-white text-[1.125rem] font-semibold">
              Add Product
            </h3>
          </div>
        </div>
        <div className="bg-white">
          <div className="p-4 rounded-lg dark:border-gray-700 ">
            <div className="">
              <div className="w-full ">
                <form action="/" method="post" onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label
                      className="block mb-2 text-sm font-medium text-gray-700 text-left required"
                      for="firstName"
                    >
                      Product Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      className="w-full px-3 py-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                      id="firstName"
                      type="text"
                      name="name"
                      placeholder="Product Name"
                      value={formData.name}
                      autoComplete="off"
                      onChange={handleChange}
                      onBlur={(e) => validateField("name", e.target.value)}
                    />
                    {errors.name && (
                      <p className="text-red-500 text-sm text-start">
                        {errors.name}
                      </p>
                    )}
                  </div>
                  <div className="mb-4">
                    <label
                      className="block mb-2 text-sm font-medium text-gray-700 text-left"
                      for="firstName"
                    >
                      Product Image <span className="text-red-500">*</span>
                    </label>
                    <div className="flex items-center justify-center w-full">
                      <label
                        for="dropzone-file"
                        className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                      >
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <svg
                            className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 20 16"
                          >
                            <path
                              stroke="currentColor"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                            />
                          </svg>
                          <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                            <span className="font-semibold">
                              Click to upload
                            </span>{" "}
                            or drag and drop
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            SVG, PNG, JPG or GIF (MAX. 800x400px)
                          </p>
                        </div>
                        <input
                          id="dropzone-file"
                          type="file"
                          className="hidden"
                          name="image"
                          onChange={handleFileChange}
                          onBlur={(e) =>
                            validateField("image", e.target.files[0])
                          }
                        />
                      </label>
                    </div>
                    {errors.image && (
                      <p className="text-red-500 text-sm text-start">
                        {errors.image}
                      </p>
                    )}
                  </div>
                  <div className="mb-4">
                    <label
                      className="block mb-2 text-sm font-medium text-gray-700 text-left"
                      for="firstName"
                    >
                      Description <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      placeholder="Description"
                      className="w-full px-3 py-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                      value={formData.description}
                      onChange={handleChange}
                      name="description"
                      onBlur={(e) =>
                        validateField("description", e.target.value)
                      }
                    />
                    {errors.description && (
                      <p className="text-red-500 text-sm text-start">
                        {errors.description}
                      </p>
                    )}
                  </div>
                  <div className="mb-4">
                    <label
                      className="block mb-2 text-sm font-medium text-gray-700 text-left"
                      for="firstName"
                    >
                      Price <span className="text-red-500">*</span>
                    </label>
                    <input
                      className="w-full px-3 py-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                      id="price"
                      type="text"
                      name="price"
                      placeholder="Price"
                      autoComplete="off"
                      value={formData.price}
                      onChange={handleChange}
                      onBlur={(e) => validateField("price", e.target.value)}
                    />
                    {errors.price && (
                      <p className="text-red-500 text-sm text-start">
                        {errors.price}
                      </p>
                    )}
                  </div>
                  <div className="flex justify-between">
                    <Link
                      to="/Product"
                      type="button"
                      disabled={loading}
                      className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                    >
                      Back
                    </Link>
                    <button
                      type="submit"
                      disabled={loading}
                      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                    >
                      {loading ? (
                        <svg
                          className="animate-spin h-5 w-5 mr-3 border-t-2 border-white rounded-full"
                          viewBox="0 0 24 24"
                        ></svg>
                      ) : (
                        "Submit"
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}
