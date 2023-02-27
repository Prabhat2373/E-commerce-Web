import { Fragment, useState, useEffect } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { Link } from 'react-router-dom';
import { useLogoutMutation } from '../features/services/RTK/Api';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { LogoutUser } from '../features/Slices/AppSlice';
import AuthWrapper from '../utils/AuthWrapper';

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ');
}

export default function DropDownMenu(user: [] | any) {
  const dispatch = useDispatch();
  const User = useSelector((state: any) => state?.user?.user);
  const [logoutUser] = useLogoutMutation();
  const navigate = useNavigate();
  console.log('IS LOGGED', User?.LoggedIn);

  const Logout = () => {
    logoutUser('')
      .then(() => {
        dispatch(LogoutUser());
        window.localStorage.clear();
        window.location.reload();
        navigate('/login');
      })
      .catch((err) => console.log(err?.message));
  };

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="hover:outline-indigo-600 rounded-full border-2 border-indigo-600">
          <div className="overflow-hidden rounded-full ">
            {
              <img
                src={
                  user?.user?.image ??
                  require('../Assets/images/user-image.jpg')
                }
                alt="user profile"
                className="w-10 object-fill aspect-square rounded-full"
              />
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
            {User?.LoggedIn && (
              <Menu.Item>
                {({ active }) => (
                  <span
                    className={classNames(
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                      'block px-4 py-2 text-sm'
                    )}
                  >
                    Hello! {user?.user?.name ?? 'N.A.'}
                  </span>
                )}
              </Menu.Item>
            )}
            {User?.LoggedIn ? (
              <AuthWrapper>
                <Menu.Item>
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
                </Menu.Item>
              </AuthWrapper>
            ) : (
              ''
            )}
            <Menu.Item>
              {({ active }) => (
                <Link
                  to={`${user?.user?.isSeller ? 'upload-product' : 'register'}`}
                  className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'block px-4 py-2 text-sm'
                  )}
                >
                  {user?.user?.isSeller ? 'Sell Product' : 'Become a Seller'}
                </Link>
              )}
            </Menu.Item>

            <AuthWrapper>
              <Menu.Item>
                {({ active }) => (
                  <Link
                    to={'/your-products'}
                    className={classNames(
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                      'block px-4 py-2 text-sm'
                    )}
                  >
                    Your Products
                  </Link>
                )}
              </Menu.Item>
            </AuthWrapper>

            <form method="POST" action="#">
              <Menu.Item>
                {({ active }) => (
                  <Link
                    type="submit"
                    className={classNames(
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                      'block w-full px-4 py-2 text-left text-sm'
                    )}
                    to={`${User?.LoggedIn ? 'register' : 'login'}`}
                    onClick={() => {
                      User?.LoggedIn ? Logout() : navigate('/register');
                    }}
                  >
                    {User?.LoggedIn ? (
                      <span
                        onClick={() => {
                          Logout();
                        }}
                      >
                        sign out
                      </span>
                    ) : (
                      <span>sign in</span>
                    )}
                  </Link>
                )}
              </Menu.Item>
            </form>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
