import React, { MutableRefObject, useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useCreateProductMutation } from '../Services/rtk/services/test';

const ProductCreate = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const productRef = useRef<any>();
    const [CreateProduct] = useCreateProductMutation()
    const navigate = useNavigate()
    const onSubmit = async (data: any) => {
        var formdata = new FormData();
        formdata.append("name", data.name);
        formdata.append("desc", data.desc);
        formdata.append("price", data.price);
        formdata.append("stock", data.stock);
        formdata.append("category", data.category);
        formdata.append("brand", data.brand);
        formdata.append("ratings", data.ratings);
        formdata.append("file",  productRef.current.files[0]);

        CreateProduct(formdata).then(() => {
            navigate("/")
            alert("Product Has Been Created");
        }).catch((err) => console.log(err?.message));
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="my-20">
            <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
                <div className="w-full p-6 m-auto bg-white rounded-md shadow-xl lg:max-w-xl">
                    <h1 className="text-3xl font-semibold text-center text-indigo-500 uppercase">
                        Upload Product 
                    </h1>
                    <div className="mb-2">
                        <label
                            htmlFor="name"
                            className="block text-sm font-semibold text-gray-800"
                        >
                            Name
                        </label>
                        <input
                            type="text"

                            className="block w-full px-4 py-2 mt-2 text-indigo-500 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            {...register("name")}
                        />
                    </div>
                    <div className="mb-2">
                        <label
                            htmlFor="name"
                            className="block text-sm font-semibold text-gray-800"
                        >
                            Product Image
                        </label>
                        <input
                            type="file"
                            className="block w-full px-4 py-2 mt-2 text-indigo-500 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            {...register("file")}
                            id="profile"
                            ref={productRef}
                            onChange={() => {
                                console.log(productRef);

                            }}
                        />
                    </div>
                  
                    <div className="mb-2">
                        <label
                            htmlFor="desc"
                            className="block text-sm font-semibold text-gray-800"
                        >
                            Description 
                        </label>
                        <input
                            type="text"
                            className="block w-full px-4 py-2 mt-2 text-indigo-500 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            {...register("desc")}
                        />
                    </div>
                    <div className="mb-2">
                        <label
                            htmlFor="password"
                            className="block text-sm font-semibold text-gray-800"
                        >
                          price
                        </label>
                        <input
                            type="number"
                            className="block w-full px-4 py-2 mt-2 text-indigo-500 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            {...register("price")}

                        />
                    </div>
                    <div className="mb-2">
                        <label
                            htmlFor="password"
                            className="block text-sm font-semibold text-gray-800"
                        >
                          Stock Count
                        </label>
                        <input
                            type="number"
                            className="block w-full px-4 py-2 mt-2 text-indigo-500 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            {...register("stock")}

                        />
                    </div>
                    <div className="mb-2">
                        <label
                            htmlFor="password"
                            className="block text-sm font-semibold text-gray-800"
                        >
                         category
                        </label>
                        <input
                            type="text"
                            className="block w-full px-4 py-2 mt-2 text-indigo-500 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            {...register("category")}

                        />
                    </div>
                    <div className="mb-2">
                        <label
                            htmlFor="password"
                            className="block text-sm font-semibold text-gray-800"
                        >
                         Brand Name
                        </label>
                        <input
                            type="text"
                            className="block w-full px-4 py-2 mt-2 text-indigo-500 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            {...register("brand")}

                        />
                    </div>
                    <div className="mb-2">
                        <label
                            htmlFor="password"
                            className="block text-sm font-semibold text-gray-800"
                        >
                        ratings
                        </label>
                        <input
                            type="number"
                            className="block w-full px-4 py-2 mt-2 text-indigo-500 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            {...register("ratings")}

                        />
                    </div>
                  
                    <div className="mt-6">
                        <input type="submit" className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-indigo-700 rounded-md hover:bg-indigo-500 focus:outline-none focus:bg-indigo-800" value={"Upload Product"} />
                    </div>

                </div>
            </div>
        </form>
    )
}

export default ProductCreate
