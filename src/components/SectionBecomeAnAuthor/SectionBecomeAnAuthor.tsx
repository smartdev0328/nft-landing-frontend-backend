import React, { FC } from 'react';
import NcImage from 'shared/NcImage/NcImage';
import rightImgDemo from 'images/rightLargeImg.png';
import rightLargeImgDark from 'images/rightLargeImgDark.png';
import ButtonPrimary from 'shared/Button/ButtonPrimary';
import Logo from 'shared/Logo/Logo';
import ButtonSecondary from 'shared/Button/ButtonSecondary';
import { Link } from 'react-router-dom';

export interface SectionBecomeAnAuthorProps {
  className?: string;
}

const SectionBecomeAnAuthor: FC<SectionBecomeAnAuthorProps> = ({ className = '' }) => {
  return (
    <div
      className={`nc-SectionBecomeAnAuthor relative flex flex-col lg:flex-row items-center  ${className}`}
      data-nc-id="SectionBecomeAnAuthor">
      <div className="flex-shrink-0 mb-16 lg:mb-0 lg:mr-10 lg:w-full">
        <Logo className="w-28" />
        <h2 className="font-semibold text-3xl sm:text-4xl xl:text-6xl mt-6 sm:mt-10 !leading-[1.112] tracking-tight">
          Reimagine a Play-to-Earn <br /> Metaverse
        </h2>
        <span className="block mt-6 text-neutral-500 dark:text-neutral-400 ">
          where the virtual and real world converge
        </span>
        <div className="flex space-x-2 sm:space-x-5 mt-6 sm:mt-12">
          <a href="https://www.affyn.com">
            <ButtonSecondary className="">Discover more</ButtonSecondary>
          </a>
        </div>
      </div>
    </div>
  );
};

export default SectionBecomeAnAuthor;
