"use client";

import AllCategory from "@/app/components/AllCategory";
import ProductSlider from "@/app/components/ProductSlider";
import Image from "next/image";
import ClientLayout from "./ClientLayout";
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import HeroCarousel from "./components/HeroCarousel";

export default function Home() {

  useEffect(() => {
    product_Data();
   }, [])
   
 
   const [productData, setproductData]=useState([]);
 
    const product_Data = async ()=>{
        try {
            const response = await axios.get('https://api.therashtriya.com/api/products');
            setproductData(response.data);
          } catch (error) {
            console.error(error);
          }
    }

  return (
    <ClientLayout>
      <main>
        <div className="p-4 lg:px-[8rem] min-h-screen">
          {/* Banner */}
          {/* <div className="shadow-lg rounded-xl w-full my-4">
            <Image
              className="rounded-xl"
              src="/images/banner/banner.svg"
              alt="Banner Image"
              height={100}
              width={100}
              layout="responsive"
            />
          </div> */}
         

          <div className="shadow-lg rounded-xl w-full hidden md:block">
            <Image
              className="rounded-xl"
              src="/images/carousel/gif_banner.gif"
              alt="Banner Image"
              height={100}
              width={100}
              layout="responsive"
              placeholder="blur"
              blurDataURL="/images/placeholder-icon.png" // Low-quality placeholder image
            />
          </div>

           {/* carousel */}
           <div className="w-full md:mt-4">
          <HeroCarousel/>
          </div>
         

          {/* Categories */}
          <AllCategory />

          {/* Product Slider */}
          <p className="text-2xl text-gray-700 mt-4 font-bold">Baby Care Products</p>
          <ProductSlider productData={productData} />
        
          {/* Product Slider */}
          <p className="text-2xl text-gray-700 mt-4 font-bold">Explore by Products</p>
          <ProductSlider productData={productData} />
        </div>
      </main>
    </ClientLayout>
  );
}
