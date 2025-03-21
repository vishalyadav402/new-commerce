"use client"
import React from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';

// import required modules
import { FreeMode,Navigation, Mousewheel, Keyboard } from 'swiper/modules';

import ProductCard from './ProductCard';

const ProductSlider = ({productData}) => {



  return (
    <div className='py-4'>
        <Swiper
        slidesPerView={6}
        spaceBetween={10}
        freeMode={true}
        Navigation={{ clickable: true }}
        cssMode={true}
        navigation={true}
        mousewheel={true}
        keyboard={true}
        modules={[FreeMode, Navigation, Mousewheel, Keyboard]}
        className="mySwiper"
        breakpoints={{
            // when window width is >= 320px
            320: {
              slidesPerView: 2,
              spaceBetween: 10,
            },
            // when window width is >= 480px
            480: {
              slidesPerView: 2,
              spaceBetween: 10,
            },
            // when window width is >= 600px
            600: {
              slidesPerView: 3,
              spaceBetween: 10,
            },
            // when window width is >= 768px
            768: {
              slidesPerView: 3,
              spaceBetween: 10,
            },
            // when window width is >= 1024px
            1024: {
              slidesPerView: 4,
              spaceBetween: 10,
            },
            // when window width is >= 1280px
            1280: {
              slidesPerView: 5,
              spaceBetween: 10,
            },
            // when window width is >= 1440px
            1440: {
              slidesPerView: 6,
              spaceBetween: 10,
            },
        }}>
        {productData.map((product, index) => (
          <SwiperSlide key={index}>
            <ProductCard data={product}/>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default ProductSlider