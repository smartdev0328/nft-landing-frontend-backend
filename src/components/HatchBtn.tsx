import React, { FC } from "react";

export interface PricesProps {
  className?: string;
  price?: string;
  contentClass?: string;
  labelTextClassName?: string;
  labelText?: string;
  // eslint-disable-next-line @typescript-eslint/ban-types
  onClick?: Function;
}

const Prices: FC<PricesProps> = ({
  className = "pt-3",
  price = "Hatch",
  contentClass = "py-1.5 md:py-2 px-20 md:px-20  text-sm sm:text-s font-semibold p-20",
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onClick = () => {},
}) => {
  return (
    <div className={`${className}`} onClick={() => onClick()}>
      <button
        className={`flex items-baseline border-2 border-green-500 rounded-lg relative ${contentClass} `}
      >
        <span className=" text-green-500 !leading-none">{price}</span>
      </button>
    </div>
  );
};

export default Prices;
