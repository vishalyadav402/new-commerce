"use client";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const AllCategory = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://api.therashtriya.com/api/categories");
        setData(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="py-4">
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-8 lg:grid-cols-10 gap-4">
        {loading
          ? Array.from({ length: 10 }).map((_, index) => (
              <div
                key={index}
                className="animate-pulse bg-gray-200 rounded-xl w-full h-24"
              ></div>
            ))
          : data
              ?.filter(
                (category) =>
                  category.cat_isActive === true || category.cat_isActive === "true"
              ) // Filter only active categories
              .map((category) => (
                <div key={category.CategoryID}>
                {category.CategoryImage&& <div
                  className="cursor-pointer shadow-sm rounded-xl"
                  onClick={() => router.push("/" + category.Cat_Slug)}
                  key={category.CategoryID}
                >
                  <div className="flex justify-center text-center rounded-xl shadow-sm">
                    <Image
                      src={category.CategoryImage || "/images/placeholder-icon.png"}
                      alt={category.CategoryName}
                      className="w-full h-24 object-contain rounded-xl"
                      height={100}
                      width={100}
                      style={{ height: "100%", width: "100%"}}
                    />
                  </div>
                </div>}
                </div>
              ))}
      </div>
    </div>
  );
};

export default AllCategory;
