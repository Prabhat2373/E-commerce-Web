import React from 'react';
import { useState } from 'react';
import { StarIcon } from '@heroicons/react/20/solid';
import { useNavigate, useParams } from 'react-router-dom';
import {
  useAddToCartMutation,
  useGetAllCartQuery,
  useGetProductByIdQuery,
} from '../../features/services/RTK/Api';
import { Product } from '../../Types/Products';
import { useSelector } from 'react-redux';
import Carousel from '../../components/carousel/Carousel';

const reviews = { href: '#', average: 4, totalCount: 117 };

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ');
}

const ProductView = () => {
  const User = useSelector((state: any) => state.user.payload);
  const query = useParams();
  const id = User?._id;
  const { data: ProductById } = useGetProductByIdQuery(query?.id ?? '');
  const [Product, setProduct] = useState<Product>();
  const [quantity, setQuantity] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [AddToCart] = useAddToCartMutation();
  const { data: AllCart, refetch: FetchCart } = useGetAllCartQuery(id);
  console.log('ussssss', User);
  console.log('ALL CART', AllCart);
  function AddCart(quantity: any) {
    setIsLoading(true);
    AddToCart({
      payload: {
        name: ProductById?.product?.name,
        description: ProductById?.product?.description,
        price: ProductById?.product?.price,
        image: ProductById?.product?.images?.[0]?.url,
        quantity: quantity,
      },
      id,
    }).then(() => {
      FetchCart();
      setIsLoading(false);
    });
  }
  React.useEffect(() => {
    setProduct(ProductById?.product);
  }, []);
  console.log('PRODUCT', ProductById);
  return (
    <div className="bg-white">
      <div className="pt-6">
        <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8"></div>
        <Carousel data={ProductById?.product?.images ?? []} />

        {/* Product info */}
        <div className="mx-auto max-w-2xl px-4 pt-10 pb-16 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pt-16 lg:pb-24">
          <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              {ProductById?.product?.name}
            </h1>
          </div>

          {/* Options */}
          <div className="mt-4 lg:row-span-3 lg:mt-0">
            <h2 className="sr-only">Product information</h2>
            <p className="text-3xl tracking-tight text-gray-900">
              ₹ {ProductById?.product?.price}
            </p>

            {/* Reviews */}
            <div className="mt-6">
              <h3 className="sr-only">Reviews</h3>
              <div className="flex items-center">
                <div className="flex items-center">
                  {[ProductById?.product?.ratings]?.map((rating: any) => (
                    <StarIcon
                      key={rating}
                      className={classNames(
                        reviews.average > rating
                          ? 'text-gray-900'
                          : 'text-gray-200',
                        'h-5 w-5 flex-shrink-0'
                      )}
                      aria-hidden="true"
                    />
                  ))}
                </div>
                <p className="sr-only">{reviews.average} out of 5 stars</p>
                <a
                  href={reviews.href}
                  className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500"
                >
                  {reviews.totalCount} reviews
                </a>
              </div>
            </div>

            <form className="mt-10">
              <div className="custom-number-input h-10 w-32 flex items-center mt-10">
                <input
                  type={'button'}
                  className="p-2 border w-7 border-indigo-600 text-indigo-600 text-lg cursor-pointer text-center hover:bg-indigo-800 hover:text-slate-200 "
                  value={'-'}
                  onClick={() => setQuantity((prev) => prev - 1)}
                />
                <span className="border p-2 border-indigo-800 text-indigo-600 text-lg">
                  {quantity}
                </span>
                <input
                  type={'button'}
                  className="p-2 border w-7 border-indigo-600 text-indigo-600 text-lg cursor-pointer text-center hover:bg-indigo-800 hover:text-slate-200 "
                  value={'+'}
                  onClick={() => setQuantity((prev) => prev + 1)}
                />
              </div>
              <button
                className={`mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 py-3 px-8 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 `}
                onClick={(e) => {
                  e?.preventDefault();
                  AddCart(quantity ?? 1);
                  setQuantity(0);
                }}
              >
                {isLoading && (
                  <div role="status">
                    <svg
                      aria-hidden="true"
                      className="mr-2 w-8 h-8 text-white animate-spin dark:text-gray-600 fill-blue-600"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="#e1f4fecc"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentFill"
                      />
                    </svg>
                    <span className="sr-only">Loading...</span>
                  </div>
                )}
                {!isLoading ? 'Add to bag' : 'Adding To Bag'}
              </button>
            </form>
          </div>

          <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pt-6 lg:pb-16 lg:pr-8">
            {/* Description and details */}
            <div>
              <h3 className="sr-only">Description</h3>

              <div className="space-y-6">
                <p className="text-base text-gray-900">description</p>
              </div>
            </div>

            <div className="mt-10">
              <h3 className="text-sm font-medium text-gray-900">Highlights</h3>

              {/* <div className="mt-4">
                <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
                  {product.highlights.map((highlight) => (
                    <li key={highlight} className="text-gray-400">
                      <span className="text-gray-600">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div> */}
            </div>

            <div className="mt-10">
              <h2 className="text-sm font-medium text-gray-900">Details</h2>

              <div className="mt-4 space-y-6">
                <p className="text-sm text-gray-600">details</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductView;
