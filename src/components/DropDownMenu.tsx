import { Fragment, useState, useEffect } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { FaRegUserCircle } from 'react-icons/fa';
import { Link } from "react-router-dom";

function classNames(...classes: any) {
    return classes.filter(Boolean).join(' ')
}

export default function DropDownMenu(user: [] | any) {
    // const [isLoggedIn, setIsLoggedIn] = useState(false)
    let isLoggedIn = false
    console.log(user);

    if(user?.user?.payload?.lenght > 0 || user?.user?.payload?.[0]?.name !== undefined) isLoggedIn = true;
    console.log("LOGGED IN", isLoggedIn);

    return (
        <Menu as="div" className="relative inline-block text-left">
            <div>
                <Menu.Button className="hover:outline-indigo-600 rounded-full border-2 border-indigo-600">
                    {/* <FaRegUserCircle />
                    <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" /> */}

                    <div className='overflow-hidden rounded-full '>
                        {!user || user?.user?.payload?.length <= 0 ? <><FaRegUserCircle /><ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" /> </> : <img src={user?.user?.payload?.[0]?.image} alt="user profile" className="w-10" />
                        }
                    </div>

                </Menu.Button>
            </div>

            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <Menu.Items className="absolute left-0 md:-left-44 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                        {isLoggedIn ? <Menu.Item>
                            {({ active }) => (
                                <Link
                                    to="/profile"
                                    className={classNames(
                                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                        'block px-4 py-2 text-sm'
                                    )}
                                >
                                    Account settings
                                </Link>
                            )}
                        </Menu.Item> : ''}
                        <Menu.Item>
                            {({ active }) => (
                                <Link
                                    to={`${user?.user?.payload?.[0]?.isSeller ? 'upload-product' : 'register'}`}
                                    className={classNames(
                                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                        'block px-4 py-2 text-sm'
                                    )}
                                >
                                    {user?.user?.payload?.[0]?.isSeller ? "Sell Product" : 'Become a Seller'}
                                </Link>
                            )}
                        </Menu.Item>
                        <form method="POST" action="#">
                            <Menu.Item>
                                {({ active }) => (
                                    <Link
                                        type="submit"
                                        className={classNames(
                                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                            'block w-full px-4 py-2 text-left text-sm'
                                        )}
                                        to={`${isLoggedIn ? "signup" : "login"}`}
                                    >
                                        {isLoggedIn ? "Sign Out" : "Sign In"}
                                    </Link>
                                )}
                            </Menu.Item>
                        </form>
                    </div>
                </Menu.Items>
            </Transition>
        </Menu>
    )
}
