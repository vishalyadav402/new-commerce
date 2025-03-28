"use client"
import React, { useEffect, useState } from 'react'
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import Image from 'next/image';
import ImageMagnifier from '@/app/components/ImageMagnifier';
import Addtocartbtn from '@/app/components/Addtocartbtn';
import axios from 'axios';
import { useParams } from 'next/navigation';
import String_to_html from '@/app/components/String_to_html';
import ClientLayout from '@/app/ClientLayout';
const page = () => {

  const whyshopquestions=[
    {
      id:1,
      imgicon:'/why-us/fastdelivery.svg',
      title:'Superfast Delivery',
      para:'Get your order delivered to your doorstep at the earliest from dark stores near you.'
    },
    {
      id:2,
      imgicon:'/why-us/special_offer.svg',
      title:'Best Prices & Offers',
      para:'Best price destination with offers directly from the manufacturers.'
    },
    {
      id:3,
      imgicon:'/why-us/assortment.svg',
      title:'Wide Assortment',
      para:'Choose from 5000+ products across food, personal care, household & other categories.'
    }
  ]

const params = useParams();
const slug = params.productdetail;

 const [productdetails, setproductdetails]=useState([]);

 


 const product_Data = async ()=>{
  // alert(JSON.stringify(params.productdetail))
     try {
        !slug&&alert("Product Slug is empty!, please check database product table.");

         const response = await axios.get('https://api.therashtriya.com/api/products/'+slug);
         setproductdetails(response.data[0]);
       } catch (error) {
        // setproductdetails({data:{"ProductID":"25"}});
         console.error(error);
       }
 }

 useEffect(() => {
  product_Data();
 }, [])


  return (
    <ClientLayout>
    <div className='grid grid-cols-1 md:grid-cols-2 px-4'>
{/* Image Magnifier */}
    <div class="col-span-1 md:col-span-1 p-3 md:p-10 overflow-y-auto max-h-[100vh] bg-white border">
        <div className='flex justify-center'>
        <ImageMagnifier
        src={productdetails?.ProductImage||"/no-photo.png"}  // Replace with your image URL
        zoom={2}  // Adjust the zoom level
      />
        {/* <Image src={'/no-photo.png'} height={100} width={100} style={{height:'300px',width:'300px'}}></Image> */}
        </div>

        {/* product details part */}
        <div className='border-t-2 my-8'>
          <p className='text-[1.5rem] leading-tight font-semibold my-5'>Product Details</p>
              <div>
              <p className='font-medium text-sm my-2'>{productdetails?.ProductName}</p>
              <p className='text-sm my-2 text-gray-600'><String_to_html htmlString={productdetails?.ProductDescription}></String_to_html></p>
              </div>
        </div>
    </div>

    {/* right part */}
    <div class="col-span-1 md:col-span-1 p-3 md:p-10 overflow-y-auto max-h-[100vh] border">
      <div>
        <p className='text-gray-400 font-semibold text-[0.75rem]'>{params.category+"/"+params.subcategory+"/"+params.productdetail}
          {/* {productdetails?.ProductName}*/}</p>
        <p className='text-[1.5rem] leading-tight font-semibold my-2'>{productdetails?.ProductName}</p>
        <p className='bg-[#f0f0f0] rounded-sm p-1 my-2 text-gray-400 text-sm max-w-[5rem] text-center'>30 Mins</p>
        <a href='/' className='text-[#0C831F] text-[18px] font-[500] my-1'>View all by Shop Name <ArrowRightIcon/></a>
        <hr class="border-t border-gray-200 my-5"/>
      </div>

        <div className='flex justify-between'>
        <div>
          <p className='text-[0.75rem] text-gray-600 font-semibold'>1 pack (64 pieces)</p>
          <p className='font-normal'>MRP <span className='font-semibold'>₹{productdetails?.ProductPrice}</span></p>
          <p className='text-[0.75rem] text-gray-600 font-normal'>(Inclusive of all taxes)</p>
        </div>
        <div>
           <Addtocartbtn data={productdetails} pagetitle={"previewpage"}/>
        </div>
        </div>

        <div>
          <p className='font-semibold my-5'>Why shop from Vega?</p>
          {whyshopquestions.map((item,index)=>(<>
          <div className='flex mb-5'>
            <div className="self-center">
            <div style={{width:'50px',width:'50px'}}><Image src={item.imgicon} height={100} width={100} style={{height:'100%',width:'100%'}}></Image></div>
            </div>
            <div className='self-center ps-5'>
              <p className='text-[0.75rem] text-gray-800'>{item.title}</p>
              <p className='text-[0.75rem] text-gray-500'>{item.para}</p>
            </div>
          </div>
          </>))}
        </div>
    </div>

   </div>
   </ClientLayout>
  )
}

export default page
