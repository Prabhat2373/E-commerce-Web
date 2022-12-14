import React, {useState} from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import LoadingImage from "../../Assets/images/load.png";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import { useNavigate } from 'react-router-dom';
import { StarIcon } from '@heroicons/react/20/solid';
import { useAddToCartMutation, useGetAllCartQuery } from "../../Services/rtk/services/test";
interface CarouselProps {
    data?: any;
}
export default function Carousel({ data }: CarouselProps) {
    const navigate = useNavigate();
    const [AddToCart] = useAddToCartMutation();
    console.log(LoadingImage);
    const { data: AllCart, refetch: FetchCart } = useGetAllCartQuery('');
    const [isLoading, setIsLoading] = useState(false)
    function AddCart(id: any, quantity: any) {
        setIsLoading(true)
        AddToCart({
            payload: {
                quantity
            }, id
        }).then(() => {
            setIsLoading(false)
            FetchCart()
        })
    }

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
                {data?.length > 0 ? data?.map((element: any, index: number) => {
                    return (
                        <SwiperSlide>
                            <div className="swiper-child w-[400px] bg-[#D9D9D9] m-3 " key={element?._id + 1} >
                                <img src={element?.image ?? LoadingImage} alt={element?._id} className="cursor-pointer" width={"400px"} height={"440px"} onClick={() => {
                                    navigate(`/view/${element?._id}`);
                                }} />
                                <div className="flex justify-between p-2">
                                    <h3>{element?.name ?? "PRODUCT "}</h3>
                                    <p className="flex">
                                        <StarIcon
                                            key={Math.random()}
                                            className={'text-orange-500 h-5 w-5 flex-shrink-0'}
                                            aria-hidden="true"
                                        />
                                        <StarIcon
                                            key={Math.random()}
                                            className={'text-orange-500 h-5 w-5 flex-shrink-0'}
                                            aria-hidden="true"
                                        />
                                        <StarIcon
                                            key={Math.random()}
                                            className={'text-orange-500 h-5 w-5 flex-shrink-0'}
                                            aria-hidden="true"
                                        />
                                        <StarIcon
                                            key={Math.random()}
                                            className={'text-orange-500 h-5 w-5 flex-shrink-0'}
                                            aria-hidden="true"
                                        />
                                        <StarIcon
                                            key={Math.random()}
                                            className={'text-gray-400 h-5 w-5 flex-shrink-0'}
                                            aria-hidden="true"
                                        />
                                    </p>
                                </div>
                                <div className="flex justify-between p-2">
                                    <h2>₹ {element?.price}</h2>
                                    <p className="cursor-pointer" onClick={(e) => {
                                        console.log(e);
                                        
                                        AddCart(element?._id, 1)
                                    }}>{!isLoading && element?._id ? <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M3 3H5L5.4 5M7 13H17L21 5H5.4M7 13L5.4 5M7 13L4.70711 15.2929C4.07714 15.9229 4.52331 17 5.41421 17H17M17 17C15.8954 17 15 17.8954 15 19C15 20.1046 15.8954 21 17 21C18.1046 21 19 20.1046 19 19C19 17.8954 18.1046 17 17 17ZM9 19C9 20.1046 8.10457 21 7 21C5.89543 21 5 20.1046 5 19C5 17.8954 5.89543 17 7 17C8.10457 17 9 17.8954 9 19Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                </svg> : "Loading.."}</p>
                                </div>
                            </div>
                        </SwiperSlide>
                    )
                }) : <div className="swiper-child w-[400px] bg-[#D9D9D9] m-3 " key={Math.random()} >
                    <img src={LoadingImage} alt={"alter"} className="cursor-pointer" width={"400px"} height={"440px"} />
                    <div className="flex justify-between p-2">
                        <h3>{"PRODUCT "}</h3>
                        <p className="flex">
                            <StarIcon
                                key={Math.random()}
                                className={'text-orange-500 h-5 w-5 flex-shrink-0'}
                                aria-hidden="true"
                            />
                            <StarIcon
                                key={Math.random()}
                                className={'text-orange-500 h-5 w-5 flex-shrink-0'}
                                aria-hidden="true"
                            />
                            <StarIcon
                                key={Math.random()}
                                className={'text-orange-500 h-5 w-5 flex-shrink-0'}
                                aria-hidden="true"
                            />
                            <StarIcon
                                key={Math.random()}
                                className={'text-orange-500 h-5 w-5 flex-shrink-0'}
                                aria-hidden="true"
                            />
                            <StarIcon
                                key={Math.random()}
                                className={'text-gray-400 h-5 w-5 flex-shrink-0'}
                                aria-hidden="true"
                            />
                        </p>
                    </div>
                    <div className="flex justify-between p-2">
                        <h2>₹ price</h2>
                        <p className="cursor-pointer" onClick={() => console.log('ADDING TO CART')}><svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3 3H5L5.4 5M7 13H17L21 5H5.4M7 13L5.4 5M7 13L4.70711 15.2929C4.07714 15.9229 4.52331 17 5.41421 17H17M17 17C15.8954 17 15 17.8954 15 19C15 20.1046 15.8954 21 17 21C18.1046 21 19 20.1046 19 19C19 17.8954 18.1046 17 17 17ZM9 19C9 20.1046 8.10457 21 7 21C5.89543 21 5 20.1046 5 19C5 17.8954 5.89543 17 7 17C8.10457 17 9 17.8954 9 19Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        </svg></p>
                    </div>
                </div>}
            </Swiper>
        </>
    );
}
