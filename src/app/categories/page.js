"use client"
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { slugify } from '../utils/slugify';
import ClientLayout from '../ClientLayout';


const page = () => {

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://api.therashtriya.com/api/categories');
        setData(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const router = useRouter();
  return (
    <ClientLayout>
    <main className="p-4 md:px-14 mt-20">
    <p className='text-3xl text-black-700 font-semibold mb-5'>Categories</p>
    {data.map((item, index) => (
      <div key={index}>
        <p className='text-lg text-black-700 font-semibold my-3'>{item.CategoryName}</p>
        <ul className='grid md:grid-cols-2 gap-2'>
          {item.Subcategories && item.Subcategories.map((subcategory, subIndex) => (
              <li key={subIndex} className='py-1'>
                <div className='cursor-pointer text-blue-950' onClick={()=>router.push('/'+ slugify(subcategory.SubcategoryName))}>
                  <p className='text-md text-gray-600'>{subcategory.SubcategoryName}</p>
                </div>
              </li>

          ))}
        </ul>
      </div>
    ))}
  </main>
  </ClientLayout>
  )
}

export default page