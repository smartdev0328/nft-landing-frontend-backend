import React, { FC } from 'react';

export interface PricesProps {
  className?: string;
  info?: string;
  contentClass?: string;
  labelTextClassName?: string;
  labelText?: string;
  removeBorder?: string;
}

const Prices: FC<PricesProps> = ({
  className = 'pt-3',
  info = '',
  contentClass = 'py-1.5 md:py-3 px-2.5 md:px-3.5 text-xs sm:text-base font-light',
  removeBorder = '',
  labelTextClassName = '',
  labelText = ''
}) => {
  return (
    <div className={`${className}`}>
      <div
        className={`flex items-baseline border border-gray-700  rounded-lg relative ${contentClass} ${removeBorder}`}>
        <span
          className={`block absolute font-normal bottom-full translate-y-1 p-1 -mx-1 text-xs text-neutral-800 dark:text-neutral-400 ${labelTextClassName}`}>
          {labelText}
        </span>
        <span className="!leading-none info-text">{info}</span>
      </div>
    </div>
  );
};

export default Prices;
