import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import { useNavigate } from 'react-router-dom';
import { StarIcon } from '@heroicons/react/20/solid';
interface CarouselProps {
    data?: any;
}
export default function Carousel({ data }: CarouselProps) {
    const navigate = useNavigate();
    return (
        <>
            <Swiper
                slidesPerView={4}
                spaceBetween={30}
                pagination={{
                    clickable: true,
                }}
                width={1200}
                height={1200}
                className="mySwiper"
            >
                {data?.map((element: any, index: number) => {
                    return (
                        <SwiperSlide>
                            <div className="swiper-child w-[400px] bg-[#D9D9D9] m-3 " key={index + 1} onClick={() => {
                                navigate(`/view/${element?.id}`);
                            }}>
                                <img src={element?.src} alt="sfs" width={"400px"} height={"440px"} />
                                <div className="flex justify-between p-2">
                                    <h3>Classic </h3>
                                    <p className="flex">
                                        <StarIcon
                                            key={'sd'}
                                            className={'text-orange-500 h-5 w-5 flex-shrink-0'}
                                            aria-hidden="true"
                                        />
                                        <StarIcon
                                            key={'sd'}
                                            className={'text-orange-500 h-5 w-5 flex-shrink-0'}
                                            aria-hidden="true"
                                        />
                                        <StarIcon
                                            key={'sd'}
                                            className={'text-orange-500 h-5 w-5 flex-shrink-0'}
                                            aria-hidden="true"
                                        />
                                        <StarIcon
                                            key={'sd'}
                                            className={'text-orange-500 h-5 w-5 flex-shrink-0'}
                                            aria-hidden="true"
                                        />
                                        <StarIcon
                                            key={'sd'}
                                            className={'text-gray-400 h-5 w-5 flex-shrink-0'}
                                            aria-hidden="true"
                                        />
                                    </p>
                                </div>
                                <div className="flex justify-between p-2">
                                    <h2>$ 200</h2>
                                    add
                                </div>
                            </div>
                        </SwiperSlide>
                    )
                })}
            </Swiper>
        </>
    );
}
