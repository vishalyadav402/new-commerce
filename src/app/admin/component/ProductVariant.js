import { useState } from 'react';
import axios from 'axios';

const ProductVariant = ({prodID}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    variantName: '',
    productId: prodID,
    stock: '',
    price: '',
    description: '',
    image: null,
  });
  const [loading, setLoading] = useState(false); // Loading state for the form submission
  const [error, setError] = useState(null); // Error state to handle errors

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle image file change
  const handleImageChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      image: e.target.files[0],
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true while making the API request

    const formDataToSend = new FormData();
    formDataToSend.append('VariantName', formData.variantName);
    formDataToSend.append('ProductID', prodID);
    formDataToSend.append('Stock', formData.stock);
    formDataToSend.append('Price', formData.price);
    formDataToSend.append('Description', formData.description);
    formDataToSend.append('Image', formData.image);

    try {
      // Send the form data to your API using axios
      const response = await axios.post('https://api.therashtriya.com/api/variants', formDataToSend, {
        // headers: {
        //   'Authorization': 'Bearer YOUR_JWT_TOKEN', // Replace with actual token
        //   ...formDataToSend.getHeaders(),
        // },
      });

      console.log('Response:', response.data);
      setIsOpen(false); // Close the modal after successful submission
      setLoading(false); // Set loading to false after the request is completed
    } catch (err) {
      console.error('Error submitting form:', err);
      setError('Failed to submit the form. Please try again.'); // Set error message
      setLoading(false); // Set loading to false if there's an error
    }
  };

  return (
    <div>
      {/* Button to open modal */}
      <button
        onClick={() => setIsOpen(true)}
        className="bg-purple-500 text-sm text-white px-2 py-1 rounded"
      >
        Add Variant
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-auto">
            <h2 className="text-xl font-semibold mb-4">Add Product Variant ({formData.productId})</h2>
            <form onSubmit={handleSubmit}>
              {/* Variant Name */}
              <div className="mb-4">
                <label htmlFor="variantName" className="block text-sm font-medium text-gray-700">
                  Variant Name
                </label>
                <input
                  type="text"
                  id="variantName"
                  name="variantName"
                  value={formData.variantName}
                  onChange={handleChange}
                  className="mt-1 p-2 border border-gray-300 rounded w-full"
                  required
                />
              </div>

             <div className='flex gap-2'>
              {/* Product ID */}
              {/* <div className="mb-4">
                <label htmlFor="productId" className="block text-sm font-medium text-gray-700">
                  Product ID
                </label>
                <input
                  type="text"
                  id="productId"
                  name="productId"
                  
                  value={formData.productId}
                  onChange={handleChange}
                  className="mt-1 p-2 border border-gray-300 rounded w-full"
                  required
                />
              </div> */}

              {/* Stock */}
              <div className="mb-4">
                <label htmlFor="stock" className="block text-sm font-medium text-gray-700">
                  Stock
                </label>
                <input
                  type="number"
                  id="stock"
                  name="stock"
                  value={formData.stock}
                  onChange={handleChange}
                  className="mt-1 p-2 border border-gray-300 rounded w-full"
                  required
                />
              </div>

              {/* Price */}
              <div className="mb-4">
                <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                  Price
                </label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  className="mt-1 p-2 border border-gray-300 rounded w-full"
                  required
                />
              </div>
              </div>

              

              {/* Description */}
              <div className="mb-4">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="mt-1 p-2 border border-gray-300 rounded w-full"
                  rows="4"
                  required
                />
              </div>

              {/* Image */}
              <div className="mb-4">
                <label htmlFor="image" className="block text-sm font-medium text-gray-700">
                  Product Image
                </label>
                <input
                  type="file"
                  id="image"
                  name="image"
                  onChange={handleImageChange}
                  className="mt-1 p-2 border border-gray-300 rounded w-full"
                  required
                />
              </div>

              {/* Error Message */}
              {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

              <div className="flex justify-end gap-2">
                {/* Cancel Button */}
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded"
                >
                  Cancel
                </button>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                  disabled={loading} // Disable button when loading
                >
                  {loading ? 'Submitting...' : 'Submit'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductVariant;
