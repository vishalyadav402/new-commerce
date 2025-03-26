"use client";
import ProductCard from "@/app/components/ProductCard";
import axios from "axios";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import GridViewIcon from '@mui/icons-material/GridView';
import ClientLayout from "../ClientLayout";
import Loader from "../components/Loader";

const page = () => {
  const params = useParams();
  const router = useRouter();
  const [url_category, seturl_category] = useState(params.category);

  useEffect(() => {
    // alert(JSON.stringify(url_category))
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
    // alert(url_category)
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


  return (
    <ClientLayout>
    <div className="px-0 md:px-4">
      {/* horizontal category */}
      <div class="grid grid-cols-1 gap-4 mb-2">
        <div class="flex space-x-4 bg-white overflow-x-auto">
          {data.map((item, index) => (
            <ul key={index}>
              <li onClick={()=>router.push('/'+item.Cat_Slug)} class={item.Cat_Slug === url_category ? "flex-1 text-nowrap text-black p-2 my-4 rounded font-medium cursor-pointer bg-purple-100 hover:bg-purple-200":
                "flex-1 text-nowrap text-black p-2 my-4 rounded cursor-pointer hover:bg-purple-200"
              }>
                {item.cat_isActive=="true" && item.CategoryName}
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
                 <li onClick={()=>router.push('/'+url_category)} class="p-2 flex flex-col md:flex-row pointer-events-auto cursor-pointer bg-purple-100 hover:bg-purple-200">
                        <div className="flex justify-center items-center h-[48px] w-[48px] overflow-hidden bg-[`rgb(248, 248, 248`)]">
                          <GridViewIcon color="#ccc"/>
                        </div>
                        <p className="flex justify-center items-center text-md font-medium">
                         All
                        </p>
                  </li>

                  {item.Subcategories &&
                    item.Subcategories.map((subcategory, subIndex) => (
                      <>
                      {subcategory.subcat_isActive=="true"&&
                      <li key={subIndex} onClick={()=>router.push('/'+item.Cat_Slug+"/"+subcategory.subCat_Slug)} class="p-1 md:p-2 flex flex-col md:flex-row cursor-pointer hover:bg-purple-200">
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
                        <p className="self-center md:ps-2 font-semibold ps-1 text-sm text-ellipsis line-clamp-2 overflow-hidden">
                          {url_category == subcategory.subCat_Slug
                            ? subcategory.SubcategoryName
                            : subcategory.SubcategoryName}
                        </p>
                      </li>}
                      </>
                    ))}
                </>
              )}
            </ul>
          ))}
        </div>

        {/* products */}
        <div class="col-span-4 max-h-[75vh] overflow-auto">
          {loading?
          <div className="flex justify-center items-center min-h-[80vh] w-full"><Loader/></div>
          :
          <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-1 min-h-screen p-1 md:gap-4 bg-gray-100 md:p-4 p:2 rounded">
           {productData.map((data, index) => (
              <div key={index}>
                <ProductCard data={data} />
              </div>
            ))}
          </div>
          }
        </div>
        
      </div>
    </div>
    </ClientLayout>
  );
};

export default page;
