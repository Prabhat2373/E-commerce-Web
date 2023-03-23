import { Fragment, useState, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import {
  useGetAllCartQuery,
  useRemoveCartItemMutation,
} from '../features/services/RTK/Api';
import { useDispatch, useSelector } from 'react-redux';
import { Product } from '../Types/Products';
import { useNavigate } from 'react-router-dom';

interface Props {
  isOpen: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
export default function Cart({ isOpen, setOpen }: Props) {
  const [productId, setProductId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const User = useSelector((state: any) => state.user.payload);
  const navigate = useNavigate();
  const [removeItem] = useRemoveCartItemMutation();
  const { data: CartItems, refetch: FetchMore } = useGetAllCartQuery(User?._id);
  const [CartData, setCartData] = useState<Product[]>([]);
  useEffect(() => {
    setCartData(CartItems?.payload);
    FetchMore();
  }, [CartItems]);


  function remove(id: number) {
    setIsLoading(true);
    removeItem(id).then(() => {
      FetchMore();

      setIsLoading(false);
    });
  }

  console.log('cart data', CartData);
  const SubTotal = CartData?.reduce((item: any, price: any) => {
    return Number(price?.price) + item;
  }, 0);
  return (
    <>
      {isOpen && (
        <Transition.Root show={isOpen} as={Fragment}>
          <Dialog as="div" className="relative z-10" onClose={setOpen}>
            <Transition.Child
              as={Fragment}
              enter="ease-in-out duration-500"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in-out duration-500"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>

            <div className="fixed inset-0 overflow-hidden">
              <div className="absolute inset-0 overflow-hidden">
                <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                  <Transition.Child
                    as={Fragment}
                    enter="transform transition ease-in-out duration-500 sm:duration-700"
                    enterFrom="translate-x-full"
                    enterTo="translate-x-0"
                    leave="transform transition ease-in-out duration-500 sm:duration-700"
                    leaveFrom="translate-x-0"
                    leaveTo="translate-x-full"
                  >
                    <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                      <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                        <div className="flex-1 overflow-y-auto py-6 px-4 sm:px-6">
                          <div className="flex items-start justify-between">
                            <Dialog.Title className="text-lg font-medium text-gray-900">
                              Shopping cart
                            </Dialog.Title>
                            <div className="ml-3 flex h-7 items-center">
                              <button
                                type="button"
                                className="-m-2 p-2 text-gray-400 hover:text-gray-500"
                                onClick={() => setOpen(false)}
                              >
                                <span className="sr-only">Close panel</span>
                                <XMarkIcon
                                  className="h-6 w-6"
                                  aria-hidden="true"
                                />
                              </button>
                            </div>
                          </div>

                          <div className="mt-8">
                            <div className="flow-root">
                              <ul
                                role="list"
                                className="-my-6 divide-y divide-gray-200"
                              >
                                {!CartData ? (
                                  <div className="h-full flex justify-center items-center">
                                    No Items
                                  </div>
                                ) : (
                                  CartData?.map((products: any) => (
                                    <li
                                      key={products.name + 1}
                                      className="flex py-6"
                                    >
                                      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                        <img
                                          src={products?.image}
                                          alt={'alternative'}
                                          className="h-full w-full object-cover object-center"
                                        />
                                      </div>

                                      <div className="ml-4 flex flex-1 flex-col">
                                        <div>
                                          <div className="flex justify-between text-base font-medium text-gray-900">
                                            <h3>
                                              <a href={'/'}>{products.name}</a>
                                            </h3>
                                            <p className="ml-4">
                                              ₹ {products.price}
                                            </p>
                                          </div>
                                          <p className="mt-1 text-sm text-gray-500">
                                            {products?.name}
                                          </p>
                                        </div>
                                        <div className="flex flex-1 items-end justify-between text-sm">
                                          <p className="text-gray-500">
                                            Qty {products.quantity}
                                          </p>

                                          <div className="flex">
                                            <button
                                              className="font-medium text-indigo-600 hover:text-indigo-500"
                                              id={products?._id}
                                              onClick={(e) => {
                                                remove(products?._id);
                                                setProductId(
                                                  e?.currentTarget?.id
                                                );
                                              }}
                                            >
                                              {isLoading &&
                                                products?._id === productId
                                                ? 'Loading...'
                                                : 'Remove'}
                                            </button>
                                          </div>
                                        </div>
                                      </div>
                                    </li>
                                  ))
                                )}
                              </ul>
                            </div>
                          </div>
                        </div>

                        <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
                          <div className="flex justify-between text-base font-medium text-gray-900">
                            <p>Subtotal</p>
                            <p>₹ {SubTotal ?? 0}</p>
                          </div>
                          <p className="mt-0.5 text-sm text-gray-500">
                            Shipping and taxes calculated at checkout.
                          </p>
                          <div className="mt-6 flex justify-center">
                            <input
                              type="button"
                              className={`flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 w-full disabled:bg-slate-600 ${!SubTotal || SubTotal === undefined
                                ? 'cursor-not-allowed'
                                : 'cursor-pointer'
                                }`}
                              value="Checkout"
                              defaultValue={'Checkout'}
                              disabled={!SubTotal || SubTotal === undefined}
                              onClick={() => navigate('/order-form')}
                            />
                          </div>
                          <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                            <p>
                              <span className="p-2">or</span>
                              <button
                                type="button"
                                className="font-medium text-indigo-600 hover:text-indigo-500"
                                onClick={() => setOpen(false)}
                              >
                                Continue Shopping
                                <span aria-hidden="true"> &rarr;</span>
                              </button>
                            </p>
                          </div>
                        </div>
                      </div>
                    </Dialog.Panel>
                  </Transition.Child>
                </div>
              </div>
            </div>
          </Dialog>
        </Transition.Root>
      )}
    </>
  );
}
