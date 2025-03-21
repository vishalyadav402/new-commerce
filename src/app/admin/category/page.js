"use client";
import AdminLayout from "@/app/AdminLayout";
import React, { useState, useEffect } from "react";
import axios from "axios";

const Page = () => {
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    categoryName: "",
    Slug: "",
    image: null,
  });
  const [selectedCategoryId, setSelectedCategoryId] = useState(null); // To track which category is being edited
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal open state
  const [alertMessage, setAlertMessage] = useState(""); // Alert message state

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("https://api.therashtriya.com/api/category");
        setCategories(response.data); // Bind categories data
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
      ...(name === "categoryName" && {
        Slug: value
          .toLowerCase()
          .trim()
          .replace(/[^a-z0-9]+/g, "-") // Replace spaces and special characters with '-'
          .replace(/^-+|-+$/g, ""), // Remove leading or trailing '-'
      }),
    }));
  };
  

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, image: e.target.files[0] }));
  };

  // Handle form submission (Add or Update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const data = new FormData();
    data.append("categoryName", formData.categoryName);
    data.append("Slug", formData.Slug);
    data.append("image", formData.image);

    try {
      if (selectedCategoryId) {
        // Update category if an ID is selected
        const response = await axios.put(
          `https://api.therashtriya.com/api/category/${selectedCategoryId}`,
          data,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );

        if (response.status === 200) {
          setAlertMessage("Category updated successfully!");
          setIsModalOpen(false); // Close modal on success
          setFormData({ categoryName: "", Slug: "", image: null });
          
          // Update the category list after successful update
          setCategories((prev) =>
            prev.map((category) =>
              category.CategoryID === selectedCategoryId
                ? { ...category, ...response.data }
                : category
            )
          );
        } else {
          setAlertMessage("Error updating category.");
        }
      } else {
        // Create new category if no ID is selected
        const response = await axios.post(
          "https://api.therashtriya.com/api/category",
          data,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );

        if (response.status === 200) {
          setAlertMessage("Category added successfully!");
          setFormData({ categoryName: "", Slug: "", image: null });
          setCategories((prev) => [...prev, response.data]); // Add new category to the list
        } else {
          setAlertMessage("Error adding category.");
        }
      }
    } catch (error) {
      setAlertMessage("Error submitting category: " + error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle category edit (open modal)
  const handleEdit = (category) => {
    setSelectedCategoryId(category.CategoryID);
    setFormData({
      categoryName: category.CategoryName,
      Slug: category.Slug,
      image: null, // You might want to manage image separately if needed
    });
    setIsModalOpen(true); // Open the modal for editing
  };

  // Handle category delete
  const handleDelete = async (categoryId) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this category?");
    if (isConfirmed) {
      try {
        const response = await axios.delete(
          `https://api.therashtriya.com/api/category/${categoryId}`
        );

        if (response.status === 200) {
          alert("Category deleted successfully!");
          setCategories((prev) => prev.filter((category) => category.CategoryID !== categoryId)); // Remove category from list
        } else {
          alert("Error deleting category.");
        }
      } catch (error) {
        alert("Error deleting category: " + error);
      }
    }
  };

  return (
    <AdminLayout>
      <div className="p-4">
        {/* Add Category Form */}
        <h1 className="text-2xl font-bold mb-4">Add Category</h1>
        <form
  className="mb-8 max-w-xl"
  onSubmit={handleSubmit}
  encType="multipart/form-data"
>
  {/* Category Name */}
  <div className="mb-6">
    <label
      htmlFor="categoryName"
      className="block text-sm font-medium text-gray-700 mb-2"
    >
      Category Name
    </label>
    <input
      type="text"
      name="categoryName"
      id="categoryName"
      onChange={handleChange}
      required
      className="mt-1 block w-full p-3 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 text-gray-800 placeholder-gray-400"
      placeholder="Enter category name"
    />
  </div>

  {/* Slug */}
  <div className="mb-6">
    <label htmlFor="Slug" className="block text-sm font-medium text-gray-700 mb-2">
      Slug
    </label>
    <input
      type="text"
      name="Slug"
      id="Slug"
      value={formData.Slug}
      onChange={handleChange}
      required
      className="mt-1 block w-full p-3 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 text-gray-800 placeholder-gray-400"
      placeholder="Enter Slug"
    />
  </div>

  {/* Image */}
  <div className="mb-6">
    <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-2">
      Image
    </label>
    <input
      type="file"
      name="image"
      id="image"
      onChange={handleFileChange}
      className="block w-full p-3 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
    />
  </div>

  {/* Submit Button */}
  <button
    type="submit"
    disabled={isSubmitting}
    className={`w-full py-3 font-semibold text-white rounded-lg ${
      isSubmitting ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
    } transition-all duration-300`}
  >
    {isSubmitting ? "Submitting..." : "Add Category"}
  </button>
</form>


        {/* Modal for Edit Category */}
        {isModalOpen && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div className="bg-white p-8 rounded-lg shadow-lg w-full sm:w-3/4 md:w-1/2 lg:w-1/3">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
        Update Category
      </h2>
      <form onSubmit={handleSubmit}>
        {/* Category Name */}
        <div className="mb-6">
          <label
            htmlFor="categoryName"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Category Name
          </label>
          <input
            type="text"
            name="categoryName"
            id="categoryName"
            value={formData.categoryName}
            onChange={handleChange}
            required
            className="mt-1 block w-full p-3 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 text-gray-800 placeholder-gray-400"
            placeholder="Enter category name"
          />
        </div>

        {/* Slug */}
        <div className="mb-6">
          <label
            htmlFor="Slug"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Slug
          </label>
          <input
            type="text"
            name="Slug"
            id="Slug"
            value={formData.Slug}
            onChange={handleChange}
            required
            className="mt-1 block w-full p-3 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 text-gray-800 placeholder-gray-400"
            placeholder="Enter Slug"
          />
        </div>

        {/* Image */}
        <div className="mb-6">
          <label
            htmlFor="image"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Image
          </label>
          <input
            type="file"
            name="image"
            id="image"
            onChange={handleFileChange}
            className="block w-full p-3 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-3 font-semibold text-white rounded-lg ${
            isSubmitting ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
          } transition-all duration-300`}
        >
          {isSubmitting ? "Submitting..." : "Update Category"}
        </button>
      </form>

      {/* Close Button */}
      <button
        onClick={() => setIsModalOpen(false)}
        className="mt-4 w-full py-2 text-center text-red-500 font-semibold bg-transparent border-2 border-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-all duration-300"
      >
        Close
      </button>
    </div>
  </div>
)}


        {/* Alert Message */}
        {alertMessage && (
          <div className="mt-4 px-4 p-2 mb-2 max-w-xl bg-green-400 text-white rounded-lg">
            {alertMessage}
          </div>
        )}

        {/* Category List */}
        <h2 className="text-2xl font-bold mb-4">Category List</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((category) => (
            <div
              key={category.CategoryID}
              className="bg-white p-4 rounded-lg shadow-md flex flex-col items-center"
            >
              <img
                src={category.image}
                alt={category.CategoryName}
                className="h-24 w-24 object-cover mb-2 shadow-lg rounded-full"
              />
              <h3 className="text-lg font-semibold">{category.CategoryName}</h3>
              <p className="text-sm text-gray-600">{category.Slug}</p>
              {/* <ul className="mt-2">
                {category.Subcategories.map((sub) => (
                  <li key={sub.SubcategoryID} className="text-sm text-gray-500">
                    - {sub.SubcategoryName}
                  </li>
                ))}
              </ul> */}
              <div className="flex space-x-2">
  <button
    onClick={() => handleEdit(category)}
    className="mt-2 bg-yellow-500 text-white py-1 px-4 rounded"
  >
    Edit
  </button>
  <button
    onClick={() => handleDelete(category.CategoryID)}
    className="mt-2 bg-red-500 text-white py-1 px-4 rounded"
  >
    Delete
  </button>

  {/* <button
    onClick={() => handleStatus(category.CategoryID)}
    className="mt-2 bg-orange-500 text-white py-1 px-4 rounded"
  >
    Offline
  </button> */}
</div>

            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
};

export default Page;
