"use client"
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import ClientLayout2 from '../ClientLayout2';
import ProductCard from '../components/ProductCard';
import RecentSearches from '../components/RecentSearches';

// Debounce function to delay the execution
const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

const page = () => {

    const [search, setSearch] = useState("");

    // Debounce the search value for 500ms
    const debouncedSearch = useDebounce(search, 500);

    useEffect(() => {
        if (debouncedSearch) {
            product_Data(debouncedSearch);
            // Save the debounced value to localStorage
            const recentSearches = JSON.parse(localStorage.getItem('recentSearches')) || [];
            if (!recentSearches.includes(debouncedSearch)) {
                recentSearches.push(debouncedSearch);
                localStorage.setItem('recentSearches', JSON.stringify(recentSearches));
            }
        }
    }, [debouncedSearch]);

    const [productData, setproductData] = useState([]);

    const product_Data = async (search) => {
        try {
            const response = await axios.get(`https://api.therashtriya.com/product/search?query=${search}`);
            setproductData(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <ClientLayout2 title={search} setTitle={setSearch}>
            <div className="p-4 md:px-[8rem] min-h-screen">
              <RecentSearches/>
                <div className='my-4'>
                    {search !== "" && <p className="text-[0.9em] text-gray-900 font-bold"> Showing results for "{search}"</p>}
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-4 rounded">
                    {productData.map((data, index) => (
                        <div key={index}>
                            <ProductCard data={data} />
                        </div>
                    ))}
                </div>
            </div>
        </ClientLayout2>
    )
}

export default page;
