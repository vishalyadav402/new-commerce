import React, { useEffect, useState } from 'react';
import ProductSlider from './ProductSlider';
import axios from 'axios';
import { Skeleton } from '@mui/material';  // MUI Skeleton for loading state

const categories = [
  { label: 'Baby Care', value: 'baby-care' },
  { label: 'Cleaning Essentials', value: 'cleaning-essentials' },
  { label: 'Personal Care', value: 'personal-care' }
  // Add more categories here
];

const CategorisedProducts = () => {
  const [productsByCategory, setProductsByCategory] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    categories.forEach(category => fetchCategoryProducts(category));
  }, []);

  const fetchCategoryProducts = async (category) => {
    try {
      const response = await axios.get(
        `https://api.therashtriya.com/api/products?category=${category.value}&subcategory=`
      );
      setProductsByCategory(prev => ({
        ...prev,
        [category.label]: response.data
      }));
    } catch (error) {
      console.error(`Error fetching ${category.label} products:`, error);
    } finally {
      // Set loading to false once all categories are fetched
      setLoading(false);
    }
  };

  return (
    <>
      {categories.map(category => (
        <div key={category.value} className="mt-6">
          <p className="text-2xl text-gray-700 font-bold">{category.label} Products</p>

          {/* Display Skeleton while loading */}
          {loading ? (
            <Skeleton variant="rectangular" width="100%" height={300} />
          ) : (
            <ProductSlider productData={productsByCategory[category.label] || []} />
          )}
        </div>
      ))}
    </>
  );
};

export default CategorisedProducts;
