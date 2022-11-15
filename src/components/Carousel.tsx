import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay } from "swiper"

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import "../App.css";

// import required modules
import { Pagination } from "swiper";

const Carousel = () => {
    SwiperCore.use([Autoplay]);
    return (

        <Swiper
            pagination={{
                dynamicBullets: true,
            }}
            loop={true}
            autoplay={{
                delay: 1500,
                disableOnInteraction: false
            }}

            modules={[Pagination]}
            className="mySwiper"
        >
            <SwiperSlide >Slide 1</SwiperSlide>
            <SwiperSlide>Slide 2</SwiperSlide>
            <SwiperSlide>Slide 3</SwiperSlide>
            <SwiperSlide>Slide 4</SwiperSlide>
            <SwiperSlide>Slide 5</SwiperSlide>
            <SwiperSlide>Slide 6</SwiperSlide>
            <SwiperSlide>Slide 7</SwiperSlide>
            <SwiperSlide>Slide 8</SwiperSlide>
            <SwiperSlide>Slide 9</SwiperSlide>
        </Swiper>
    )
}

export default Carousel