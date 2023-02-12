import React from 'react'
import { FiDelete } from 'react-icons/fi'
import { useSelector } from 'react-redux'
import DeleteIcon from '../components/icons/DeleteIcon'
import EditIcon from '../components/icons/EditIcon'
import Page from '../components/page/Page'
import { useDeleteProductByIdMutation, useGetProductsQuery } from '../Services/rtk/services/Api'

const YourProducts = () => {
    const [deleteProductById] = useDeleteProductByIdMutation();
    const { data: fetchedProducts, refetch: refetchProducts } = useGetProductsQuery("");
    const User = useSelector((state: any) => state?.user?.payload)
    const Products = useSelector((state: any) => state?.products?.products)
    const sellerId = User?._id
    const filteredProducts = Products?.filter((el: any) => el?.sellerId === sellerId)
    const deleteProduct = (id: number) => {
        const config = window.confirm("Are You Sure To Delete This Product");
        if (config) deleteProductById(id).then(() => refetchProducts()).catch((err) => err?.message)

    }

    return (
        <>
            <Page title='Your Products' content={
                <section>
                    <div className="relative overflow-x-auto">
                        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        Product name
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Brand
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Category
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Price
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {!filteredProducts || filteredProducts?.length <= 0 ? <tr className='text-center '><td colSpan={5} className='items-center text-center p-4'>NO ITEMS</td></tr> : filteredProducts?.map((el: any) => {
                                    return (
                                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                {el?.name}
                                            </th>
                                            <td className="px-6 py-4">
                                                {el?.brand}
                                            </td>
                                            <td className="px-6 py-4">
                                                {el?.category}
                                            </td>
                                            <td className="px-6 py-4">
                                                ₹{el?.price}
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className='flex gap-2'>
                                                    <span className='cursor-pointer' onClick={() => alert("ACTION NOT DEFINED YET!")}><EditIcon /></span>
                                                    <span className='cursor-pointer' onClick={() => deleteProduct(el?._id)}><DeleteIcon /></span>
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>

                </section>} />
        </>
    )
}

export default YourProducts