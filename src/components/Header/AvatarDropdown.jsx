import { Popover, Transition } from '@headlessui/react';
import { sessionStorageItems, userDataInfo } from 'contains/enum';
import { nftsAvatarImgs } from 'contains/fakeData';
import { FynContext } from 'context/FynContext';
import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import Avatar from 'shared/Avatar/Avatar';
import { editAddressString } from 'shared/pipeline/pipeline';
import { editNameString } from 'shared/pipeline/editNameString';
import { validateFunction } from 'utils/validation';
import Cookies from 'universal-cookie';

export default function AvatarDropdown() {
  const cookies = new Cookies();
  const userInfo = cookies.get(sessionStorageItems.USER);
  const name =
    userInfo &&
    (cookies.get(sessionStorageItems.USER)[userDataInfo.USERNAME] ||
      cookies.get(sessionStorageItems.USER)[userDataInfo.EMAIL]);
  //userInfo && JSON.parse(cookies.get(sessionStorageItems.USER))[userDataInfo.USERNAME];

  const wallet = userInfo && cookies.get(sessionStorageItems.USER)[userDataInfo.WALLET];
  //userInfo && JSON.parse(cookies.get(sessionStorageItems.USER))[userDataInfo.WALLET];

  const [setCurrentAccount, setWalletConnected, setCurrentSessionInfo] = React.useState(FynContext);
  let avatarImg = sessionStorage.getItem(sessionStorageItems.AVATAR);
  if (!avatarImg) {
    const randomAvatar = Math.floor((Math.random() * 3));;
    avatarImg = nftsAvatarImgs[randomAvatar];
    sessionStorage.setItem(sessionStorageItems.AVATAR, avatarImg);
  }

  return (
    <div className="AvatarDropdown">
      <Popover className="relative">
        {({ open }) => (
          <>
            <Popover.Button
              className={`inline-flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75`}>
              <Avatar imgUrl={avatarImg} sizeClass="w-8 h-8 sm:w-9 sm:h-9" />
            </Popover.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1">
              <Popover.Panel className="absolute z-10 w-screen max-w-[260px] px-4 mt-3 -right-10 sm:right-0 sm:px-0">
                <div className="overflow-hidden rounded-3xl shadow-lg ring-1 ring-black ring-opacity-5">
                  <div className="relative grid grid-cols-1 gap-6 bg-white dark:bg-neutral-800 py-7 px-6">
                    <div className="flex items-center space-x-3">
                      <Avatar imgUrl={avatarImg} sizeClass="w-12 h-12" />
                      <div className="flex-grow">
                        {name && (
                          <h4 title={name} className="font-semibold">
                            {editNameString(name)}
                          </h4>
                        )}
                        {wallet && (
                          <p title={wallet} className="text-xs mt-0.5">
                            {editAddressString(wallet)}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* ------------------ 2 --------------------- */}
                    <Link
                      to={'/dashboard'}
                      className="flex p-2 -m-3 transition duration-150 ease-in-out rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50">
                      <div className="flex items-center justify-center flex-shrink-0 text-neutral-500 dark:text-neutral-300">
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M9 10C10.1046 10 11 9.10457 11 8C11 6.89543 10.1046 6 9 6C7.89543 6 7 6.89543 7 8C7 9.10457 7.89543 10 9 10Z"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M2.67004 18.9501L7.60004 15.6401C8.39004 15.1101 9.53004 15.1701 10.24 15.7801L10.57 16.0701C11.35 16.7401 12.61 16.7401 13.39 16.0701L17.55 12.5001C18.33 11.8301 19.59 11.8301 20.37 12.5001L22 13.9001"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium ">{'Inventory'}</p>
                      </div>
                    </Link>

                    {/* ------------------ 2 --------------------- */}
                    <Link
                      to={'/account'}
                      className="flex p-2 -m-3 transition duration-150 ease-in-out rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50">
                      <div className="flex items-center justify-center flex-shrink-0 text-neutral-500 dark:text-neutral-300">
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M19.2101 15.74L15.67 19.2801C15.53 19.4201 15.4 19.68 15.37 19.87L15.18 21.22C15.11 21.71 15.45 22.05 15.94 21.98L17.29 21.79C17.48 21.76 17.75 21.63 17.88 21.49L21.42 17.95C22.03 17.34 22.32 16.63 21.42 15.73C20.53 14.84 19.8201 15.13 19.2101 15.74Z"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeMiterlimit="10"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M18.7001 16.25C19.0001 17.33 19.84 18.17 20.92 18.47"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeMiterlimit="10"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M3.40991 22C3.40991 18.13 7.25994 15 11.9999 15C13.0399 15 14.0399 15.15 14.9699 15.43"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium ">{'Account'}</p>
                      </div>
                    </Link>

                    {/* ------------------ 2 --------------------- */}
                    <Link
                      to={'/'}
                      className="flex p-2 -m-3 transition duration-150 ease-in-out rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50">
                      <div className="flex items-center flex-shrink-0 text-neutral-500 dark:text-neutral-300">
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M8.90002 7.55999C9.21002 3.95999 11.06 2.48999 15.11 2.48999H15.24C19.71 2.48999 21.5 4.27999 21.5 8.74999V15.27C21.5 19.74 19.71 21.53 15.24 21.53H15.11C11.09 21.53 9.24002 20.08 8.91002 16.54"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M15 12H3.62"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M5.85 8.6499L2.5 11.9999L5.85 15.3499"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                      <div
                        className="ml-4"
                        href="/"
                        onClick={() => {
                          //sessionStorage.setItem(sessionStorageItems.IS_AUTH, 'no');
                          sessionStorage.removeItem(sessionStorageItems.USER);
                          sessionStorage.removeItem(sessionStorageItems.TOKEN);
                          sessionStorage.removeItem(sessionStorageItems.AVATAR);
                          sessionStorage.removeItem(sessionStorageItems.TEMP_EGG);
                          cookies.remove(sessionStorageItems.USER);
                          cookies.remove('user');
                          cookies.remove('auth');
                          cookies.remove('jwt');
                          cookies.set('auth', 'no', { path: "/", secure: true, sameSite: true });

                          validateFunction(setCurrentAccount, {});
                          validateFunction(setWalletConnected, false);
                          validateFunction(setCurrentSessionInfo, {});
                          //window.location.reload();
                        }}>
                        <p className="text-sm font-medium ">Logout</p>
                      </div>
                    </Link>
                  </div>
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    </div>
  );
}
