import React, { FC } from 'react';

export interface BackgroundSectionProps {
  className?: string;
  id?: string;
  tabIndex?: number;
}

const BackgroundSection: FC<BackgroundSectionProps> = ({
  className = 'bg-neutral-100/80 dark:bg-black/20 ',
  id = 'background-section',
  tabIndex = 0
}) => {
  return (
    <div
      id={id}
      tabIndex={tabIndex}
      className={`nc-BackgroundSection absolute inset-y-0 w-screen xl:max-w-[1340px] 2xl:max-w-screen-2xl left-1/2 transform -translate-x-1/2 xl:rounded-[40px] z-0 ${className}`}
      data-nc-id="BackgroundSection"></div>
  );
};

export default BackgroundSection;
