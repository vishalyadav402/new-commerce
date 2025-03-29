"use client";
import ProductCard from "@/app/components/ProductCard";
import axios from "axios";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState, useRef } from "react";
import GridViewIcon from "@mui/icons-material/GridView";
import ClientLayout from "../ClientLayout";
import Loader from "../components/Loader";

// Swiper Imports
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";

const Page = () => {
  const params = useParams();
  const router = useRouter();
  const [url_category, setUrlCategory] = useState(params.category);
  const [data, setData] = useState([]);
  const [productData, setProductData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const swiperRef = useRef(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  useEffect(() => {
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
    fetchProductData();
  }, []);

  // Fetch product data
  const fetchProductData = async () => {
    try {
      const response = await axios.get(
        "https://api.therashtriya.com/api/products"
      );
      setProductData(response.data);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  return (
    <ClientLayout>
      <div className="px-0 md:px-4">
        {/* ✅ Swiper for Horizontal Category List */}
        <div className="relative flex items-center md:mb-2">
          {/* ✅ Prev Button (Hidden if Disabled) */}
          {!isBeginning && (
            <button
              className="absolute left-0 z-10 bg-white shadow-md p-1 rounded-full"
              onClick={() => swiperRef.current?.slidePrev()}
            >
              <ChevronLeft />
            </button>
          )}

          <Swiper
            spaceBetween={10}
            slidesPerView={"auto"}
            navigation={false} // Hides default navigation
            modules={[Navigation]}
            className="swiper-container w-full"
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            onSlideChange={(swiper) => {
              setIsBeginning(swiper.isBeginning);
              setIsEnd(swiper.isEnd);
            }}
          >
            {data.map((item, index) => (
              <SwiperSlide key={index} className="!w-auto">
                <li
                  onClick={() => router.push(`/${item.Cat_Slug}`)}
                  className={`px-4 py-2 text-sm rounded cursor-pointer whitespace-nowrap inline-flex ${
                    item.Cat_Slug === url_category
                      ? "text-purple-dark bg-purple-100 hover:bg-purple-200 font-medium"
                      : "text-black hover:bg-purple-200"
                  }`}
                >
                  {item.cat_isActive == "true" && item.CategoryName}
                </li>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* ✅ Next Button (Hidden if Disabled) */}
          {!isEnd && (
            <button
              className="absolute right-0 z-10 bg-white shadow-md p-1 rounded-full"
              onClick={() => swiperRef.current?.slideNext()}
            >
              <ChevronRight />
            </button>
          )}
        </div>

        {/* ✅ Subcategory & Products */}
        <div className="grid grid-cols-5 md:gap-2 gap-0">
          {/* ✅ Subcategory List */}
          <div className="col-span-1 max-h-[75vh] overflow-auto no-scrollbar">
            {data.map((item, index) => (
              <ul key={index} className="space-y-0 bg-white">
                {item.Cat_Slug == url_category && (
                  <>
                    <li
                      onClick={() => router.push(`/${url_category}`)}
                      className="p-2 flex justify-center items-center md:justify-start flex-col md:flex-row cursor-pointer bg-white hover:bg-purple-200 md:border-purple-100 md:border"
                    >
                      <div className="flex justify-center items-center h-[48px] w-[48px] overflow-hidden bg-gray-100">
                        <GridViewIcon color="disabled" />
                      </div>
                      <p className="flex justify-center md:ps-3 md:items-center text-sm md:text-md font-normal">
                        All
                      </p>
                    </li>

                    {item.Subcategories &&
                      item.Subcategories.map((subcategory, subIndex) => (
                        <React.Fragment key={subIndex}>
                          {subcategory.subcat_isActive == "true" && (
                            <li
                              onClick={() =>
                                router.push(
                                  `/${item.Cat_Slug}/${subcategory.subCat_Slug}`
                                )
                              }
                              className="p-1 md:p-2 gap-1 flex flex-col justify-center items-center md:justify-start md:flex-row cursor-pointer hover:bg-purple-200 md:border-purple-100 md:border-x md:border-b"
                            >
                              <div className="h-[48px] w-[48px] overflow-hidden bg-gray-100">
                                <Image
                                  src={
                                    subcategory.SubcategoryImage ||
                                    "/no-photo.png"
                                  }
                                  style={{
                                    height: "100%",
                                    width: "100%",
                                    position: "relative",
                                    transform: "scale(0.95)",
                                  }}
                                  height={100}
                                  width={100}
                                  alt="subcategory image"
                                />
                              </div>
                              <p className="md:self-center md:ps-2 text-gray-500 text-center font-normal md:text-gray-700 md:font-medium text-[11px] leading-none md:text-sm text-ellipsis line-clamp-3 overflow-hidden">
                                {subcategory.SubcategoryName}
                              </p>
                            </li>
                          )}
                        </React.Fragment>
                      ))}
                  </>
                )}
              </ul>
            ))}
          </div>

          {/* ✅ Products */}
          <div className="col-span-4 max-h-[75vh] overflow-auto no-scrollbar">
            {loading ? (
              <div className="flex justify-center items-center min-h-[80vh] w-full">
                <Loader />
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-1 min-h-screen p-1 md:gap-4 bg-gray-100 md:p-4 p:2 rounded">
                {productData.map((data, index) => (
                  <div key={index}>
                    <ProductCard data={data} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </ClientLayout>
  );
};

export default Page;
