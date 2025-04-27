"use client";
import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import ImageMagnifier from '@/app/components/ImageMagnifier';
import Addtocartbtn from '@/app/components/Addtocartbtn';
import axios from 'axios';
import { useParams } from 'next/navigation';
import String_to_html from '@/app/components/String_to_html';
import ClientLayout from '@/app/ClientLayout';

const Page = () => {
  const whyshopquestions = [
    {
      id: 1,
      imgicon: '/why-us/fastdelivery.svg',
      title: 'Superfast Delivery',
      para: 'Get your order delivered to your doorstep at the earliest from dark stores near you.'
    },
    {
      id: 2,
      imgicon: '/why-us/special_offer.svg',
      title: 'Best Prices & Offers',
      para: 'Best price destination with offers directly from the manufacturers.'
    },
    {
      id: 3,
      imgicon: '/why-us/assortment.svg',
      title: 'Wide Assortment',
      para: 'Choose from 5000+ products across food, personal care, household & other categories.'
    }
  ];

  const params = useParams();
  const slug = params.productdetail;

  const [productdetails, setproductdetails] = useState([]);

  const product_Data = async () => {
    try {
      if (!slug) alert("Product Slug is empty!, please check database product table.");
      const response = await axios.get('https://api.therashtriya.com/api/products/' + slug);
      setproductdetails(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    product_Data();
  }, [])

  return (
    <ClientLayout>
      <div className="flex flex-col md:grid md:grid-cols-2 px-4">

        {/* LEFT PART */}
        <div className="p-0 md:p-10 bg-white md:border">
          {/* Product Image */}
          <div className="flex justify-center">
            <ImageMagnifier
              src={productdetails?.ProductImage || "/images/placeholder-icon.png"}
              zoom={2}
            />
          </div>

          {/* Mobile Only - Product Info */}
          <div className="block md:hidden mt-6">
            <p className="text-[1.5rem] leading-tight font-semibold">{productdetails?.ProductName}</p>
            <p className="bg-[#f0f0f0] rounded-sm p-1 my-2 text-gray-400 text-sm max-w-[5rem] text-center">90 Mins</p>

            <div className="flex justify-between items-center my-4">
              <div>
                <p className="text-[0.75rem] text-gray-600 font-semibold">1 pack (64 pieces)</p>
                <p className="font-normal">MRP <span className="font-semibold">₹{productdetails?.ProductPrice}</span></p>
                <p className="text-[0.75rem] text-gray-600">(Inclusive of all taxes)</p>
              </div>
              <Addtocartbtn data={productdetails} pagetitle={"previewpage"} />
            </div>
          </div>

          {/* Product Details */}
          <div className="border-t-2 my-8">
            <p className="text-[1.5rem] leading-tight font-semibold my-5">Product Details</p>
            <div>
              <p className="font-medium text-sm my-2">{productdetails?.ProductName}</p>
              <p className="text-sm my-2 text-gray-600">
                <String_to_html htmlString={productdetails?.ProductDescription} />
              </p>
            </div>
          </div>

          {/* Why Shop Section - Mobile Only */}
          <div className="block md:hidden mt-8">
            <p className="text-[1.25rem] font-semibold mb-5">Why shop from Vega?</p>
            {whyshopquestions.map((item) => (
              <div key={item.id} className="flex mb-5">
                <div className="self-center">
                  <div className="w-[50px] h-[50px]">
                    <Image src={item.imgicon} height={50} width={50} alt={item.title} className="object-contain" />
                  </div>
                </div>
                <div className="self-center ps-4">
                  <p className="text-[0.9rem] font-medium text-gray-800">{item.title}</p>
                  <p className="text-[0.75rem] text-gray-500">{item.para}</p>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* RIGHT PART */}
        <div className="hidden md:flex flex-col p-0 md:p-10 md:border">
          {/* Breadcrumb + Product Info */}
          <div>
            <p className="text-gray-400 font-medium capitalize text-[0.75rem]">
              {params.category}/{params.subcategory}/{params.productdetail}
            </p>
            <p className="text-[1.5rem] leading-tight font-semibold my-2">{productdetails?.ProductName}</p>
            <p className="bg-[#f0f0f0] rounded-sm p-1 my-2 text-gray-400 text-sm max-w-[5rem] text-center">90 Mins</p>
            <hr className="border-t border-gray-200 my-5" />
          </div>

          <div className="flex justify-between items-center">
            <div>
              <p className="text-[0.75rem] text-gray-600 font-semibold">1 pack (64 pieces)</p>
              <p className="font-normal">MRP <span className="font-semibold">₹{productdetails?.ProductPrice}</span></p>
              <p className="text-[0.75rem] text-gray-600">(Inclusive of all taxes)</p>
            </div>
            <div>
              <Addtocartbtn data={productdetails} pagetitle={"previewpage"} />
            </div>
          </div>

          {/* Why Shop Section - Desktop Only */}
          <div className="mt-10">
            <p className="font-semibold mb-5 text-[1.25rem]">Why shop from Vega?</p>
            {whyshopquestions.map((item) => (
              <div key={item.id} className="flex mb-5">
                <div className="self-center">
                  <div className="w-[70px] h-[70px]">
                    <Image src={item.imgicon} height={70} width={70} alt={item.title} className="object-contain" />
                  </div>
                </div>
                <div className="self-center ps-5">
                  <p className="text-[0.9rem] font-medium text-gray-800">{item.title}</p>
                  <p className="text-[0.75rem] text-gray-500">{item.para}</p>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </ClientLayout>
  )
}

export default Page;
