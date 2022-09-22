import React, { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import Avatar2 from 'shared/Avatar/Avatar2';

import NcImage from 'shared/NcImage/NcImage';
/* import { nftsImgs } from 'contains/fakeData'; */
import ItemTypeImageIcon from '../ItemTypeImageIcon';
import Egg from 'images/nfts/0PigasusEgg.png';
/* import LikeButton from './LikeButton'; */
import HatchBtn from '../HatchBtn';
import HatchTime from '../HatchTime';
import NcModal from 'components/BuddyCard/NcModal';
/* import { ClockIcon } from '@heroicons/react/outline'; */
/* import ItemTypeVideoIcon from './ItemTypeVideoIcon'; */

export interface CardNFTProps {
  className?: string;
  isLiked?: boolean;
}

const CardNFT: FC<CardNFTProps> = ({ className = '', isLiked }) => {
  const [showModal, setShowModal] = useState(false);
  const renderContent = () => {
    const timerToken = window.setTimeout(() => setShowModal(false), 33000);

    return (
      <div className="w-full ">
        <video muted autoPlay>
          <source type="video/mp4" src="./pigasus.mp4"></source>
        </video>
      </div>
    );
  };

  const renderAvatars = () => {
    return (
      <div className="flex -space-x-1 ">
        <Avatar2 containerClassName="ring-2 ring-white dark:ring-neutral-900" />
      </div>
    );
  };

  return (
    <div
      className={`nc-CardNFT bg-gray-100 dark:bg-transparent relative flex flex-col group border-gray-200 dark:border-gray-700 [ nc-box-has-hover nc-dark-box-bg-has-hover ] ${className}`}
      data-nc-id="CardNFT">
      <div className="relative flex-shrink-0 ">
        <div className="bg-gradient-to-r from-[#ECBFC7] to-[#F8AFBC] rounded-t-3xl">
          <Link to={'/nft-detail4'}>
            <NcImage
              containerClassName="flex w-fit mx-auto rounded-3xl overflow-hidden z-0"
              src={Egg}
              className="w-full h-full group-hover:scale-[1.03] transition-transform duration-300 ease-in-out will-change-transform "
            />
          </Link>
        </div>
        <ItemTypeImageIcon className="absolute top-3 left-3 !w-9 !h-9" />
      </div>

      <div className="p-4 py-5 space-y-3">
        <div className="flex justify-between">
          {renderAvatars()}
          <span className="text-neutral-700 dark:text-neutral-400 text-xs">
            {Math.floor(Math.random() * 20) + 1} out of 100
          </span>
        </div>
        <h2 className={`text-xl font-medium`}>Pigasus</h2>

        <div className="w-2d4 w-full border-b border-gray-300 dark:border-neutral-700"></div>

        <div className="mx-auto">
          {/* <Prices labelTextClassName="bg-white dark:bg-neutral-900 dark:group-hover:bg-neutral-800 group-hover:bg-neutral-50" /> */}
          <div className="flex items-center text-sm text-neutral-500 dark:text-neutral-400">
            {/* <ClockIcon className="w-4 h-4" /> */}
            <HatchBtn onClick={() => setShowModal(true)} />
            {/* {Math.random() > 0.5 ? (
              <Link to={'/nft-detail4'}>
                <HatchBtn />
              </Link>
            ) : (
              <HatchTime />
            )} */}
          </div>
        </div>
      </div>
      <NcModal
        renderTrigger={() => null}
        isOpenProp={showModal}
        renderContent={renderContent}
        contentExtraClass="max-w-md"
        onCloseModal={() => setShowModal(false)}
      />
    </div>
  );
};

export default CardNFT;
