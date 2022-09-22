import React from 'react';
import NcImage from 'shared/NcImage/NcImage';
import Genzero from 'images/Gen0Logo.png';

export interface ItemTypeImageIconProps {
  className?: string;
  login?: boolean;
  imgUrl?: string;
}

const ItemTypeImageIcon: React.FC<ItemTypeImageIconProps> = ({
  className = 'w-8 h-8 md:w-10 md:h-10',  
}) => {
  return (
    <div
      className={`bg-black/50 flex items-center justify-center rounded-full text-white ${className}`}>
      <NcImage
        containerClassName="flex aspect-w-11 aspect-h-12 w-full h-0 rounded-3xl overflow-hidden z-0"
        src={Genzero}
      />
    </div>
  );
};

export default ItemTypeImageIcon;
