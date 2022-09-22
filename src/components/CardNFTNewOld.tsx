import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import NcImage from 'shared/NcImage/NcImage';
import { nftsImgs } from 'contains/fakeData';
import ItemTypeImageIcon from './ItemTypeImageIcon';
import Prices from './Prices';
import RemainingTimeNftCard from './RemainingTimeNftCard';

export interface CardNFTNewProps {
  className?: string;
  isLiked?: boolean;
  value?: string;
  cardName: string;
  cardRedirect: string;
  cardImageIndex: number;
  login: boolean;
  imgUrl: string;
}

const CardNFTNew: FC<CardNFTNewProps> = ({
  className = '',
  isLiked,
  value,
  cardName,
  cardRedirect,
  cardImageIndex,
  login,
  imgUrl
}) => {
  const [currentSrc, setCurrentSrc] = React.useState('/assets/images/placeholder.png');
  const imageToLoad = new Image();
  imageToLoad.src = nftsImgs[cardImageIndex - 1];
  imageToLoad.onload = () => {
    setCurrentSrc(nftsImgs[cardImageIndex - 1]);
  };
  return (
    <div
      className={`nc-CardNFTNew relative bg-white dark:bg-neutral-900 rounded-3xl flex flex-col group p-2.5 pb-6`}
      data-nc-id="CardNFTNew">
      <div className="relative flex-shrink-0 ">
        <div className={`rounded-3xl flex h-[22rem] ${className}`}>
          <NcImage
            containerClassName="w-fit mx-auto rounded-3xl"
            src={login ? imgUrl : '/assets/images/placeholder.png'}
            className="mt-12 w-full group-hover:scale-[1.1] transition-transform duration-300 ease-in-out will-change-transform "
          />
        </div>

        {/* Gen0 Icon */}
        <ItemTypeImageIcon className="absolute top-3 left-3 !w-9 !h-9" login={login} imgUrl={imgUrl}/>

        {/* ----TIME--- */}
        <RemainingTimeNftCard contentClassName="right-5 top-1/2 -translate-y-1/2 pb-1" />

        <div className="absolute left-[-1px] bottom-[-0.4px] ">
          <svg
            className="text-white dark:text-neutral-900 w-64 md:w-[281px]"
            width="281"
            viewBox="0 0 281 99"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M0 0V99H258.059C248.54 99 239.92 93.3743 236.089 84.6606L205.167 14.3394C201.335 5.62568 192.716 0 183.197 0H0Z"
              fill="currentColor"
            />
          </svg>

          <div className="absolute left-4 bottom-0 w-48 ">
            <h2 className={`text-lg font-semibold `}>{cardName}</h2>

            <div className="w-full mt-1.5 flex justify-between items-end ">
              {/* <Prices2 /> */}
              <Prices labelTextClassName="bg-white dark:bg-neutral-900 " />
              <span className="block text-neutral-500 dark:text-neutral-400 text-xs">
                {value === undefined ? 'Please login' : value + ' in stock'}
              </span>
            </div>
          </div>
        </div>
      </div>

      <Link to={cardRedirect} className="absolute inset-0"></Link>
    </div>
  );
};

export default CardNFTNew;
