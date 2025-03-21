"use client";
import AdminLayout from "@/app/AdminLayout";
import React, { useState, useEffect } from "react";
import axios from "axios";

const Page = () => {
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    subcategoryName: "",
    categoryID: "",
    slug: "",
  });
  const [selectedSubcategoryId, setSelectedSubcategoryId] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("https://api.therashtriya.com/api/category");
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  // Handle form inputs
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "subcategoryName" && {
        slug: value
          .toLowerCase()
          .trim()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-+|-+$/g, ""),
      }),
    }));
  };

  // Handle form submission (Add or Update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const data = {
      subcategoryName: formData.subcategoryName,
      categoryID: formData.categoryID,
      slug: formData.slug,
    };

    try {
      if (selectedSubcategoryId) {
        const response = await axios.put(
          `https://api.therashtriya.com/api/subcategory/${selectedSubcategoryId}`,
          data
        );

        if (response.status === 200) {
          setAlertMessage("Subcategory updated successfully!");
          setFormData({ subcategoryName: "", categoryID: "", slug: "" });
          setSelectedSubcategoryId(null);
        }
      } else {
        const response = await axios.post(
          "https://api.therashtriya.com/api/subcategory",
          data
        );

        if (response.status === 200) {
          setAlertMessage("Subcategory added successfully!");
          setFormData({ subcategoryName: "", categoryID: "", slug: "" });
        }
      }
    } catch (error) {
      setAlertMessage("Error submitting subcategory: " + error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AdminLayout>
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Add Subcategory</h1>
        <form className="mb-8 max-w-xl" onSubmit={handleSubmit}>
          <div className="mb-6">
            <label
              htmlFor="subcategoryName"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Subcategory Name
            </label>
            <input
              type="text"
              name="subcategoryName"
              id="subcategoryName"
              value={formData.subcategoryName}
              onChange={handleChange}
              required
              className="mt-1 block w-full p-3 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 bg-gray-50"
              placeholder="Enter subcategory name"
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="categoryID"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Select Category
            </label>
            <select
              name="categoryID"
              id="categoryID"
              value={formData.categoryID}
              onChange={handleChange}
              required
              className="mt-1 block w-full p-3 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 bg-gray-50"
            >
              <option value="" disabled>
                Select a category
              </option>
              {categories.map((category) => (
                <option key={category.CategoryID} value={category.CategoryID}>
                  {category.CategoryName}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-6">
            <label
              htmlFor="slug"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Slug
            </label>
            <input
              type="text"
              name="slug"
              id="slug"
              value={formData.slug}
              onChange={handleChange}
              required
              className="mt-1 block w-full p-3 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 bg-gray-50"
              placeholder="Enter slug"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-3 font-semibold text-white rounded-lg ${
              isSubmitting ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {isSubmitting
              ? "Submitting..."
              : selectedSubcategoryId
              ? "Update Subcategory"
              : "Add Subcategory"}
          </button>
        </form>

        {alertMessage && (
          <div className="mt-4 px-4 py-2 md:w-72 bg-green-400 text-white rounded-lg">
            {alertMessage}
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default Page;
