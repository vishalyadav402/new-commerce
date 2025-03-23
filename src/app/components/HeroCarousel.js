import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import {FreeMode, Mousewheel, Keyboard, Autoplay } from "swiper/modules";
import Image from "next/image";
import {
  Box,
  Stack,
} from "@mui/material";


const data = [
  {
    id:0,
    image:'/images/banner/medical_shop.png',
    alts:''
  },
  {
    id:1,
    image:'/images/banner/baby_care.png',
    alts:''
  },
  {
    id:2,
    image:'/images/banner/cakeshop.png',
    alts:''
  },
]

const HeroCarousel = () => {

  const [isloading, setIsloading] = useState(false);
  // const [data, setData] = useState([]);


  return (
    <Box>
      <Swiper
        cssMode={true}
        slidesPerView={2}
        spaceBetween={10}
        grabCursor={true}
        freeMode={true}
        mousewheel={true}
        loop={true}
        autoplay={{ delay: 3000, pauseOnMouseEnter: true }}
        keyboard={true}
        modules={[FreeMode, Mousewheel, Keyboard, Autoplay]}
        
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
        }}
        className="mySwiper"
      >
        <Stack >
          {data &&
            data.map((item, key) => (
              <SwiperSlide key={key}>
                <Image preload
                  loading="eager"
                  src={item && item.image}
                  alt={item && item.alts} 
                  height={300}
                  width={300} 
                  style={{height:'100%',width:'100%',objectFit:'contain'}}
                  className="shadow-sm rounded-xl"/>
              </SwiperSlide>
            ))}
        </Stack>
      </Swiper>
    </Box>
  );
};

export default HeroCarousel;
