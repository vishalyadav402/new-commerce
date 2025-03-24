"use client"
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import ClientLayout2 from '../ClientLayout2';
import ProductCard from '../components/ProductCard';

const page = () => {

    const [search,setSearch]=useState("")

    useEffect(() => {
        product_Data(search);
       }, [search])
       
     
       const [productData, setproductData]=useState([]);
     
        const product_Data = async (search)=>{
            try {
                const response = await axios.get(search==""?'https://api.therashtriya.com/api/products':'https://api.therashtriya.com/product/search?query='+search);
                setproductData(response.data);
                console.log(JSON.stringify(response.data))
              } catch (error) {
                console.error(error);
              }
        }

  return (
    <ClientLayout2 title={search} setTitle={setSearch}>
    <div className="p-4 md:px-[8rem] min-h-screen">
      <div className='my-4'>

        {search!="" &&<p className="text-[0.9em] text-gray-900 font-bold"> Showing results for "{search}"</p>}
      </div>

        <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-4 rounded">
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

export default page