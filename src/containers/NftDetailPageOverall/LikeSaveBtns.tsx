import ButtonDropDownShare from 'components/ButtonDropDownShare';
import NftMoreDropdown from 'components/NftMoreDropdown';
import React from 'react';
import { Link } from 'react-router-dom';

const LikeSaveBtns = () => {
  return (
    <div className="flow-root">
      <div className="flex text-neutral-700 dark:text-neutral-300 text-sm -mx-3 -my-1.5">
        {/* ------------------ 2 --------------------- */}
        <Link
          to={'/'}
          className="nft-close-button flex items-center p-2 -m-3 transition duration-150 ease-in-out rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50">
          <div className="">
            <p className="text-sm font-medium ">{'Close'}</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default LikeSaveBtns;
