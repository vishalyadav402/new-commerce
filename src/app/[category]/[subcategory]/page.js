"use client";
import ProductCard from "@/app/components/ProductCard";
import axios from "axios";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState, useMemo, useRef } from "react";
import GridViewIcon from "@mui/icons-material/GridView";
import ClientLayout from "@/app/ClientLayout";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "@mui/icons-material"; // MUI Icons

const Page = () => {
  const params = useParams();
  const router = useRouter();

  // ✅ Store category & subcategory in state (but do not reload)
  const [url_category, setUrlCategory] = useState(params.category);
  const [url_subcategory, setUrlSubcategory] = useState(params.subcategory);

  const [categories, setCategories] = useState([]); // Stores categories ONCE
  const [productData, setProductData] = useState([]); // Stores product data
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const swiperRef = useRef(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  // ✅ Fetch Categories Once
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("https://api.therashtriya.com/api/categories");
        setCategories(response.data); // ✅ Stores categories in state ONCE
      } catch (error) {
        setError(error);
      }
    };
    fetchCategories();
  }, []); // ✅ Runs ONLY on mount (no re-fetching)

  // ✅ Fetch Products when Category/Subcategory changes
  useEffect(() => {
    if (!url_category) return;

    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://api.therashtriya.com/api/products?category=${url_category}&subcategory=${url_subcategory || ""}`
        );
        // alert(JSON.stringify(response.data))
        setProductData(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [url_category, url_subcategory]); // ✅ Fetches ONLY when subcategory changes

  // ✅ Memoized filtered subcategories (Prevents re-renders)
  const subcategories = useMemo(() => {
    const category = categories.find((cat) => cat.Cat_Slug === url_category);
    return category ? category.Subcategories || [] : [];
  }, [categories, url_category]);

  

  // ✅ Handle Subcategory Click (Updates URL & State)
  const handleSubcategoryClick = (subcategorySlug) => {
    setUrlSubcategory(subcategorySlug); // ✅ Updates subcategory state
    router.push(`/${url_category}/${subcategorySlug}`, { scroll: false });
  };
  // ✅ Handle Category Click
  const handleCategoryClick = (categorySlug) => {
    setUrlCategory(categorySlug);
    setUrlSubcategory(null);
    router.push(`/${categorySlug}`, { scroll: false });
  };


  return (
    <ClientLayout>
      <div className="px-0 md:px-4">
       
      {/* ✅ Swiper for Horizontal Category List */}
      <div className="relative flex items-center md:mb-2 h-10 bg-white">
        {/* ✅ Prev Button (Hidden if Disabled) */}
        {!isBeginning && (
          <button
            className="absolute left-0 z-10 bg-white text-purple-dark shadow-md p-1 rounded-full"
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
          {categories.filter((item) => item.cat_isActive === "true").map((item, index) => (
            <SwiperSlide key={index} className="!w-auto">
              <li
                onClick={() => handleCategoryClick(item.Cat_Slug)}
                className={`px-2 mt-1 py-1 text-sm rounded cursor-pointer whitespace-nowrap inline-flex 
                  ${item.Cat_Slug === url_category 
                    ? "text-purple-dark bg-purple-100 hover:bg-purple-200 font-medium"
                    : "text-black hover:bg-purple-200"}
                `}
              >
              {item.CategoryName}
              </li>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* ✅ Next Button (Hidden if Disabled) */}
        {!isEnd && (
          <button
            className="absolute right-0 z-10 bg-white shadow-md text-purple-dark p-1 rounded-full"
            onClick={() => swiperRef.current?.slideNext()}
          >
            <ChevronRight />
          </button>
        )}
      </div>

        {/* ✅ Subcategory & Products */}
        <div className="grid grid-cols-5 gap-0">
          {/* ✅ Subcategory List (Static) */}
          <div className="col-span-1 max-h-[75vh] overflow-auto no-scrollbar">
            <ul className="space-y-0 bg-white">

              {/* ✅ Subcategories (Filtered in useMemo) */}
              {subcategories.map((subcategory, subIndex) => (
                <li
                  key={subIndex}
                  onClick={() => handleSubcategoryClick(subcategory.subCat_Slug)}
                  className={
                    subcategory.subCat_Slug === url_subcategory
                      ? "p-1 md:p-2 gap-1 flex flex-col justify-center items-center md:justify-start md:flex-row border-r-4 border-purple-dark cursor-pointer"
                      : "p-2 gap-1 flex flex-col justify-center items-center md:justify-start md:flex-row cursor-pointer"
                  }
                >
                  <div className="h-[48px] w-[48px] overflow-hidden bg-gray-100">
                    <Image
                      src={subcategory.SubcategoryImage || "/images/placeholder-icon.png"}
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
                  <p className="md:self-center md:ps-2 text-gray-500 text-center md:text-start font-normal md:text-gray-700 md:font-medium text-[11px] leading-none md:text-sm text-ellipsis line-clamp-3 overflow-hidden">
                    {subcategory.SubcategoryName}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          {/* ✅ Products (Updates Only on Subcategory Click) */}
          <div className="col-span-4 max-h-[75vh] overflow-auto no-scrollbar">
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-1 min-h-screen p-1 md:gap-2 bg-gray-100 md:p-4 p:2 rounded">
              {loading ? (
                <p className="col-span-full">Loding Products...</p>
              ) : error ? (
                <p className="text-center col-span-full text-pink-dark">Failed to load products.</p>
              ) : productData.length > 0 ? (
                [...productData].reverse().map((data, index) => (
                  <div key={index}>
                    <ProductCard data={data} />
                  </div>
                ))
              ) : (
                <p className="col-span-full">No products found.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </ClientLayout>
  );
};

export default Page;
