import React, { FC } from 'react';
import ButtonPrimary from 'shared/Button/ButtonPrimary';
import { sessionStorageItems, userDataInfo } from 'contains/enum';
import { useLocation } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { isMobile } from 'utils/common';

export interface SectionHero2Props {
  children?: React.ReactNode;
  className?: string;
}

const SectionHero2: FC<SectionHero2Props> = ({ className = '', children }) => {
  //const { notFound } = React.useContext(FynContext);
  const cookies = new Cookies();
  const [loggedin, setLoggedin] = React.useState('no');
  const location = useLocation();
  const auth = cookies.get('auth');
  const userInfo = cookies.get(sessionStorageItems.USER);

  React.useEffect(() => {
    if (
      !location.pathname.includes('/login') &&
      !location.pathname.includes('/signup') &&
      !location.pathname.includes('/verify') //&&
      //!notFound
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
  }, [location, loggedin]);

  const notLoggedInComponents = (
    // This is temporary - stores a mock user response
    <ButtonPrimary href="/login">
      <span>Please login to purchase your buddies</span>
    </ButtonPrimary>
  );

  const focusOnEgg = () => {
    const eggSection = document.getElementById('egg_section') as HTMLElement;
    const eggSectionBg = document.getElementById('egg_section_background') as HTMLElement;
    eggSectionBg.focus();
    setTimeout(function () {
      eggSectionBg.blur();
    }, 1000);
    eggSection.scrollIntoView({ behavior: 'smooth', block: isMobile() ? 'start' : 'center' });
  };

  const loggedInComponents = (
    <ButtonPrimary onClick={focusOnEgg}>
      <span>Click on the eggs to mint them!</span>
    </ButtonPrimary>
  );

  return (
    <div className={`nc-SectionHero2 flex flex-col-reverse lg:flex-col relative ${className}`}>
      <div className="flex flex-col lg:flex-row lg:items-center items-center">
        <div className="lg:w-full items-start space-y-8 sm:space-y-10 pb-14 lg:pb-36 xl:pb-60 xl:pr-7 lg:mr-10 xl:mr-0">
          <h2 className="font-semibold text-4xl md:text-5xl xl:text-6xl !leading-[114%] items-center">
            <b>NEXUS Store</b>
          </h2>
          <span className="text-base md:text-lg text-neutral-500 dark:text-neutral-400 !mt-10 items-center">
            Get your 1st collector’s edition Buddies egg while eggs last.
          </span>
          <div className="flex font-semibold md:text-3xl text-neutral-500 dark:text-neutral-200 lg:items-center items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32.541"
              height="28.928"
              viewBox="0 0 32.541 28.928">
              <g id="FYN-icon" transform="translate(-809 -242.387)">
                <path
                  id="Path_4527"
                  data-name="Path 4527"
                  d="M706.453,5097.035l-13.518-20.705-16.047,28.928h32.541l-7.675-3.789H683.083l9.852-16.793,5.68,9.053-8.184,3.886Z"
                  transform="translate(132.112 -4833.943)"
                  fill="#ff4032"
                />
              </g>
            </svg>
            2,995 FYN
          </div>
          <div className="items-center button-wrapper">
            {auth === 'yes' ? loggedInComponents : notLoggedInComponents}
          </div>
        </div>
      </div>

      <div className="z-10 mb-12 lg:mb-0 lg:-mt-20 xl:-mt-48 w-full">
        <div className="flex lg:items-center"></div>
      </div>
    </div>
  );
};

export default SectionHero2;
