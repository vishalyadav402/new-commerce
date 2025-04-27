"use client";

import AllCategory from "@/app/components/AllCategory";
import Image from "next/image";
import ClientLayout from "./ClientLayout";
import HeroCarousel from "./components/HeroCarousel";
import CategorisedProducts from "./components/CategorisedProducts";

export default function Home() {

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
          {/* <CategorisedProducts/> */}
          
        </div>
      </main>
    </ClientLayout>
  );
}
