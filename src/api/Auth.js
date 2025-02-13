import Swal from "sweetalert2";
import api from "./axios";

export const loginUser = async (email, password) => {
  try {
    const response = await api.post("/login", { email, password });
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Login failed";
  }
};

export const fetchUsers = async () => {
  try {
    const response = await api.get("/user-list");
    return response.data;
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: error.response?.data?.message || "Form submission failed",
    });
    throw error.response?.data?.message || "Failed to fetch users";
  }
};

export const deleteUser = async (userId) => {
  try {
    const response = await api.post(`/user-delete/${userId}`);
    return response.data;
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: error.response?.data?.message || "Form submission failed",
    });
    throw error.response?.data?.message || "Failed to delete user";
  }
};

export const countryData = async () => {
  try {
    const response = await api.get("/country-list");
    return response.data;
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: error.response?.data?.message || "Form submission failed",
    });
    throw error.response?.data?.message || "Failed to fetch users";
  }
};

export const fetchProductList = async () => {
  try {
    const response = await api.get("/product-list");
    return response.data;
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: error.response?.data?.message || "Form submission failed",
    });
    throw error.response?.data?.message || "Failed to fetch product";
  }
};

export const stateData = async (country_id) => {
  try {
    const response = await api.get(`/state-list`, {
      params: { country_id },
    });

    return response.data;
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: error.response?.data?.message || "Form submission failed",
    });
    throw error.response?.data?.message || "Failed to fetch states";
  }
};

export const submitForm = async (formData) => {
  try {
    const response = await api.post("/register", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: error.response?.data?.message || "Form submission failed",
    });
    throw error.response?.data?.message || "Form submission failed";
  }
};

export const addProduct = async (formData) => {
  try {
    const response = await api.post("/add-product", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: error.response?.data?.message || "Form submission failed",
    });
    throw error.response?.data?.message || "Form submission failed";
  }
};
