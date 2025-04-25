import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { FreeMode, Mousewheel, Keyboard, Autoplay } from "swiper/modules";
import Image from "next/image";
import { Box, Stack, Skeleton } from "@mui/material";
import { useRouter } from "next/navigation";

const data = [
  {
    id: 0,
    image: "/images/banner/medical_shop.png",
    alts: "Medical Shop",
    link:"/pharma-wellness",
  },
  {
    id: 1,
    image: "/images/banner/baby_care.png",
    alts: "Baby Care",
    link:"/baby-care",
  },
  // {
  //   id: 2,
  //   image: "/images/banner/cakeshop.png",
  //   alts: "Cake Shop",
  //   link:"/bakery-biscuits/cakes-and-rolls",
  // },
];

const HeroCarousel = () => {
const router = useRouter();

  const [loadingStates, setLoadingStates] = useState(
    new Array(data.length).fill(true) // Initialize all images as loading
  );

  // Handle image load event
  const handleImageLoad = (index) => {
    setLoadingStates((prev) => {
      const newState = [...prev];
      newState[index] = false; // Mark image as loaded
      return newState;
    });
  };

  return (
    <Box>
      <Swiper
        slidesPerView={1}
        spaceBetween={10}
        grabCursor={true}
        freeMode={true}
        loop={true}
        autoplay={{ delay: 3000, pauseOnMouseEnter: true }}
        modules={[FreeMode, Mousewheel, Keyboard, Autoplay]}
        breakpoints={{
          640: { slidesPerView: 2, spaceBetween: 10 },
          768: { slidesPerView: 3, spaceBetween: 20 },
          1024: { slidesPerView: 3, spaceBetween: 20 },
        }}
        className="mySwiper"
      >
        <Stack>
          {data.map((item, index) => (
            <SwiperSlide key={item.id}>
              <Box position="relative">
                {/* Show Skeleton while image is loading */}
                {loadingStates[index] && (
                  <Skeleton
                    variant="rectangular"
                    width={'100%'}
                    height={250}
                    sx={{ borderRadius: 2}}
                  />
                )}
                {/* Actual Image */}
                <Image
                  src={item.image}
                  alt={item.alts}
                  height={300}
                  width={300}
                  onLoad={() => handleImageLoad(index)}
                  onError={() => handleImageLoad(index)} // Hide skeleton even if error
                  style={{
                    height: "100%",
                    width: "100%",
                    objectFit: "contain",
                    opacity: loadingStates[index] ? 0 : 1, // Ensure smooth transition
                    transition: "opacity 0.5s ease-in-out",
                  }}
                  className="shadow-sm rounded-xl cursor-pointer"
                  onClick={()=>router.push(item.link)}
                />
              </Box>
            </SwiperSlide>
          ))}
        </Stack>
      </Swiper>
    </Box>
  );
};

export default HeroCarousel;
