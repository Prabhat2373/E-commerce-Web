import { Fragment, useState, useEffect } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { Link } from "react-router-dom";
import { useLogoutMutation } from '../Services/rtk/services/test';
import { useNavigate } from "react-router-dom";

function classNames(...classes: any) {
    return classes.filter(Boolean).join(' ')
}

export default function DropDownMenu(user: [] | any) {
    // const [isLoading, setIsLoading] = useState(false)
    const [logoutUser] = useLogoutMutation()
    const navigate = useNavigate();
    let isLoggedIn = false
    console.log(user);

    if (user?.user?.payload?.lenght > 0 || user?.user?.payload?.[0]?.name !== undefined) isLoggedIn = true;
    console.log("LOGGED IN", isLoggedIn);

    const Logout = () => {
        logoutUser("").then(() => {
            navigate("/login");
            window.location.reload();
        }).catch((err) => console.log(err?.message))
    }

    return (
        <Menu as="div" className="relative inline-block text-left">
            <div>
                <Menu.Button className="hover:outline-indigo-600 rounded-full border-2 border-indigo-600">

                    <div className='overflow-hidden rounded-full '>
                        {<img src={user?.user?.payload?.[0]?.image ?? require("../Assets/images/user-image.jpg")} alt="user profile" className="w-10" />
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
                                        to={`${isLoggedIn ? "register" : "login"}`}
                                        onClick={() => {
                                            isLoggedIn ? Logout() : navigate("/register")
                                        }}
                                    >
                                        {isLoggedIn ? <span onClick={() => {
                                            console.log("----------");

                                            Logout()
                                        }}>sign out</span> : <span>sign in</span>}
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
