/* eslint-disable @typescript-eslint/no-empty-interface */
import React, { FC } from 'react';
import Logo from 'shared/Logo/Logo';
import MenuBar from 'shared/MenuBar/MenuBar';
import SwitchDarkMode from 'shared/SwitchDarkMode/SwitchDarkMode';
import Navigation from 'shared/Navigation/Navigation';
import { useLocation } from 'react-router-dom';
import { FynContext } from 'context/FynContext';
import AvatarDropdown from './AvatarDropdown';
import Button from 'shared/Button/Button';
import { mockUserData } from 'contains/fakeData';
import { sessionStorageItems, userDataInfo } from 'contains/enum';
import Cookies from 'universal-cookie';

const MainNav2 = () => {
  const cookies = new Cookies();
  const { notFound } = React.useContext(FynContext);
  const [loggedin, setLoggedin] = React.useState('no');
  const location = useLocation();
  const auth = cookies.get('auth');
  const userInfo = cookies.get(sessionStorageItems.USER);

  React.useEffect(() => {
    if (
      !location.pathname.includes('/login') &&
      !location.pathname.includes('/signup') &&
      !location.pathname.includes('/verify') &&
      !notFound
    ) {
      setLoggedin('yes');
    } else {
      setLoggedin('no');
    }
    // if (
    //   location.pathname.includes('/login') ||
    //   location.pathname.includes('/signup') ||
    //   location.pathname.includes('/verify') ||
    //   notFound
    // ) {
    //   console.log('mainnav2 is called and logged in no');
    //   setLoggedin('no');
    // } else {
    //   setLoggedin('yes');
    // }
  }, [location, notFound, loggedin]);

  const notLoggedInComponents = (
    // This is temporary - stores a mock user response
    <Button href="/login">
      {/*onClick={() => {
        sessionStorage.setItem(sessionStorageItems.USER, JSON.stringify(mockUserData));
        sessionStorage.setItem(sessionStorageItems.IS_AUTH, 'yes');
        setLoggedin('yes');
        window.location.reload();
      }}>*/}
      Login
    </Button>
  );

  const loggedInComponents = <AvatarDropdown />;

  return (
    <div className={`nc-MainNav2 affyn-navBar relative z-10 ${'onTop '}`}>
      <div className="container py-5 relative flex justify-between items-center space-x-4 xl:space-x-8">
        <div className="flex justify-start flex-grow items-center space-x-3 sm:space-x-8 lg:space-x-10">
          <Logo />
        </div>
        <div className="flex-shrink-0 flex items-center justify-end text-neutral-700 dark:text-neutral-100 space-x-1">
          <div className="hidden items-center xl:flex space-x-2">
            <Navigation loggedin={loggedin} />
            <div className="hidden sm:block h-10 border-l border-neutral-300 dark:border-neutral-6000"></div>
            <SwitchDarkMode />
            {auth === 'yes' ? loggedInComponents : notLoggedInComponents}
          </div>
          <div className="flex items-center space-x-1.5 xl:hidden">
            {auth === 'yes' ? loggedInComponents : notLoggedInComponents}
            <MenuBar />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainNav2;
