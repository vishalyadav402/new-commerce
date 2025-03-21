"use client";
import ProductCard from "@/app/components/ProductCard";
import axios from "axios";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import GridViewIcon from '@mui/icons-material/GridView';
import ClientLayout from "@/app/ClientLayout";

const page = () => {
  const params = useParams();
  const router = useRouter();
  const [url_category, seturl_category] = useState(params.category);
  const [url_subcategory, seturl_subcategory] = useState(params.subcategory);
  useEffect(() => {
    // alert(JSON.stringify(url_subcategory))
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://api.therashtriya.com/api/categories"
        );
        setData(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
    product_Data();
  }, []);

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // product api
  const [productData, setproductData] = useState([]);

  const product_Data = async () => {
    try {
      const response = await axios.get(
        "https://api.therashtriya.com/api/products"
      );
      setproductData(response.data);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  const [filtersubcategorydata,setFiltersubcategorydata] = useState([]);
    
  //subcategory filter data
  const filtersubcategory = () =>{
    // data.filter()
    // setFiltersubcategorydata
  }


  return (
    <ClientLayout>
    <div className="px-4">
      {/* horizontal category */}
      <div class="grid grid-cols-1 gap-4 mb-2">
        <div class="flex space-x-4 bg-white overflow-x-auto">
          {data.map((item, index) => (
            <ul key={index}>
              <li onClick={()=>router.push('/'+item.Cat_Slug)} class={item.Cat_Slug === url_category ? "flex-1 text-nowrap text-black p-2 rounded font-medium":
                "flex-1 text-nowrap text-black p-2 rounded"
              }>
                {item.CategoryName}
              </li>
            </ul>
          ))}
        </div>
      </div>




      {/* sub category & products */}
      <div class="grid grid-cols-5 gap-2">
        {/* sub category */}
        <div class="col-span-1 max-h-[75vh] overflow-auto">
          {data.map((item, index) => (
            <ul key={index} class="space-y-2 bg-white">
             
              {item.Cat_Slug == url_category && (
                <>
                 <li onClick={()=>router.push('/'+url_category)} class="p-2 flex flex-col md:flex-row cursor-pointer">
                    <div className="flex justify-center items-center h-[48px] w-[48px] overflow-hidden bg-[`rgb(248, 248, 248`)]">
                      {/* <Image
                        src={
                          item.CategoryImage || "/no-photo.png"
                        }
                        style={{
                          height: "100%",
                          width: "100%",
                          position: "relative",
                          top: "8px",
                          transform: "scale(0.95)",
                        }}
                        height={100}
                        width={100}
                      ></Image> */}
                      <GridViewIcon color="#ccc"/>
                    </div>
                    <p className="self-center ps-2 text-md font-medium">
                      {/* {item.CategoryName} */} All l
                    </p>
                  </li>
                  
                  {item.Subcategories &&
                    item.Subcategories.map((subcategory, subIndex) => (
                      <li key={subIndex} onClick={()=>router.push('/'+item.Cat_Slug+"/"+subcategory.subCat_Slug)} 
                      class={subcategory.subCat_Slug === url_subcategory?"p-2 flex flex-col md:flex-row bg-green-100 hover:bg-green-200 cursor-pointer":"p-2 flex flex-col md:flex-row cursor-pointer hover:bg-green-200"
                      }>
                        <div className="h-[48px] w-[48px] overflow-hidden bg-[`rgb(248, 248, 248`)]">
                          <Image
                            src={
                              subcategory.SubcategoryImage || "/no-photo.png"
                            }
                            style={{
                              height: "100%",
                              width: "100%",
                              position: "relative",
                              top: "8px",
                              transform: "scale(0.95)",
                            }}
                            height={100}
                            width={100}
                            alt="sub category image"
                          ></Image>
                        </div>
                        <p className="self-center md:ps-2 text-sm">
                          {url_category == subcategory.subCat_Slug
                            ? subcategory.SubcategoryName
                            : subcategory.SubcategoryName}
                        </p>
                      </li>
                    ))}
                </>
              )}
            </ul>
          ))}
        </div>
        {/* products */}
        <div class="col-span-4 max-h-[75vh] overflow-auto">
          <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-4 bg-gray-100 md:p-4 p:2 rounded">
            {productData.map((data, index) => (
              <div key={index}>
                <ProductCard data={data} />
                {/* <Button onClick={()=>router.push('/'+(data.ProductName).replaceAll(' ','-'))}>click</Button> */}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
    </ClientLayout>
  );
};

export default page;
