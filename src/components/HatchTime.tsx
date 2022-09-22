import React, { FC } from 'react';

import TimeCountDown from './nexusStore/TimeCountDown';

interface Props {
  className?: string;
  contentClassName?: string;
}

const RemainingTimeNftCard: FC<Props> = ({ className = 'items-center pt-3' }) => {
  return (
    <div className={className}>
      {/* block text-xs text-neutral-500 dark:text-neutral-400 tracking-wide item-center */}
      <div>
        <div className="text-base md:text-neutral-500 dark:text-neutral-400 text-xs items-center">
          Remaining time
        </div>
        <div className="block text-base md:text-base font-semibold  text-neutral-800 dark:text-neutral-100 item-center">
          <TimeCountDown />
        </div>
      </div>
    </div>
  );
};

export default RemainingTimeNftCard;
