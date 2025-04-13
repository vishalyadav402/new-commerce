import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import ClearIcon from '@mui/icons-material/Clear';
import axios from 'axios';
import AddIcon from '@mui/icons-material/Add';

const AddProductCategory = ({ ProdID,fetchProducts }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState('');
  const [subcategory, setSubcategory] = useState('');
  const [subcategories, setSubcategories] = useState([]);
  const [MasterCat, setMasterCat] = useState([]);

  // Fetch categories from API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('https://api.therashtriya.com/api/categories');
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        Swal.fire('Error', 'Error fetching categories.', 'error');
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  // Update subcategories when a category is selected
  useEffect(() => {
    if (category) {
      const selectedCategory = categories.find((cat) => cat.CategoryName === category);
      setSubcategories(selectedCategory?.Subcategories || []);
    } else {
      setSubcategories([]);
    }
  }, [category, categories]);

  // Fetch product data
  const fetchProductData = async () => {
    try {
      const response = await fetch(`https://api.therashtriya.com/api/master-products/${ProdID}`);
      if (response.ok) {
        const data = await response.json();
        setMasterCat(data || []);
      } else {
        setMasterCat([]);
        console.error('Error fetching product data:', response.statusText);
      }
    } catch (error) {
        setMasterCat([]);
      console.error('Error fetching product data:', error);
    }
  };

  useEffect(() => {
    fetchProductData();
  }, []);

  const handleSave = async () => {
    try {
      const selectedCategory = categories.find((cat) => cat.CategoryName === category);
      const selectedSubcategory = subcategories.find((subcat) => subcat.SubcategoryName === subcategory);

      if (!selectedCategory || !selectedSubcategory) {
        Swal.fire('Validation Error', 'Please select valid category and subcategory.', 'warning');
        return;
      }

      const payload = {
        CategoryID: selectedCategory.CategoryID,
        SubcategoryID: selectedSubcategory.SubcategoryID,
        ProductID: ProdID,
      };

      const response = await fetch('https://api.therashtriya.com/api/master-products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        fetchProductData();
        Swal.fire('Success', 'Category and subcategory saved successfully.', 'success');
        setIsOpen(false); // Close modal on success
      } else {
        const errorData = await response.json();
        Swal.fire('Error', `Failed to save: ${errorData.message || 'Unknown error'}`, 'error');
      }
    } catch (error) {
      console.error('Error saving category:', error);
      Swal.fire('Error', 'An error occurred while saving the data.', 'error');
    }
  };


  const handleDelete = async (id) => {
    try {
      // Show confirmation dialog
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: 'Do you really want to delete this item? This action cannot be undone.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'Cancel',
      });
  
      // Proceed only if the user confirms
      if (result.isConfirmed) {
        // Make a DELETE request to the API
        await axios.delete(`https://api.therashtriya.com/api/master-products/${id}`);
        Swal.fire('Deleted!', 'Item deleted successfully!', 'success');
        fetchProductData();
      }
    } catch (error) {
      console.error('Error deleting the item:', error);
      Swal.fire('Error', 'Failed to delete the item. Please try again.', 'error');
    }
  };
  

  return (
    <>
      

      <div className="flex flex-wrap gap-2">

      <div className="w-full self-center lg:w-[calc(33.33%-0.5rem)] bg-gray-100 rounded-md border border-dashed border-gray-700 p-1">
        <button
          onClick={() => setIsOpen(true)}
          className="text-blue-400 font-semibold text-[0.5rem] md:text-[0.6rem] hover:text-blue-500 flex w-full gap-1"
        >
          <div className="rounded-md bg-blue-400 hover:bg-blue-500 text-white p-1">
              <AddIcon/>
            </div>
            <span className='self-center leading-none'> Add Category</span>
        </button>
      </div>
        {MasterCat.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between w-full lg:w-[calc(33.33%-0.5rem)] bg-gray-100 rounded-md border border-dashed border-gray-700 p-1"
          >
            <div className="flex flex-col">
              <span className="text-gray-800 font-medium text-[0.5rem] md:text-[0.6rem] leading-none capitalize">
                {item.CategorySlug}
              </span>
              <span className="text-gray-600 text-[0.4rem] md:text-[0.5rem] leading-none capitalize">
                {" "}
                {item.SubcategorySlug}
              </span>
            </div>
            <button
              className="rounded-md bg-red-500 hover:bg-red-600 text-white p-1 ml-2"
              onClick={() => handleDelete(item.id)}
            >
              <ClearIcon />
            </button>
          </div>
        ))}
        </div>

      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg w-1/3 p-6">
            <h2 className="text-xl font-bold mb-4">Select Category</h2>

            <div className="mb-4">
              <label
                className="block text-sm font-medium mb-1"
                htmlFor="category"
              >
                Category
              </label>
              <select
                id="category"
                className="w-full px-3 py-2 border rounded"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">Select a category</option>
                {categories.map((cat) => (
                  <option key={cat.CategoryID} value={cat.CategoryName}>
                    {cat.CategoryName}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label
                className="block text-sm font-medium mb-1"
                htmlFor="subcategory"
              >
                Subcategory
              </label>
              <select
                id="subcategory"
                className="w-full px-3 py-2 border rounded"
                value={subcategory}
                onChange={(e) => setSubcategory(e.target.value)}
                disabled={!category}
              >
                <option value="">Select a subcategory</option>
                {subcategories.map((subcat) => (
                  <option
                    key={subcat.SubcategoryID}
                    value={subcat.SubcategoryName}
                  >
                    {subcat.SubcategoryName}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 mr-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                disabled={!category || !subcategory}
              >
                Save Category
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AddProductCategory;
