import { avatarColors } from 'contains/contants';
import React, { FC } from 'react';
import Badge from 'images/0badge.png';
/* import { avatarImgs } from 'contains/fakeData'; */
import VerifyIcon from 'components/VerifyIcon';

export interface AvatarProps {
  containerClassName?: string;
  sizeClass?: string;
  radius?: string;
  imgUrl?: string;
  userName?: string;
  hasChecked?: boolean;
  hasCheckedClass?: string;
}

const Avatar: FC<AvatarProps> = ({
  sizeClass = 'h-6 w-20',
  imgUrl = Badge,
  userName,
  hasChecked,
  hasCheckedClass = 'w-4 h-4 bottom-1 -right-0.5'
}) => {
  const url = imgUrl || '';
  const name = userName || '';
  const _setBgColor = (name: string) => {
    const backgroundIndex = Math.floor(name.charCodeAt(0) % avatarColors.length);
    return avatarColors[backgroundIndex];
  };

  return (
    <div
      className={`wil-avatar relative flex-shrink-0 inline-flex items-center justify-center text-neutral-100 uppercase font-semibold shadow-inner 
       ${sizeClass}`}
      style={{ backgroundColor: url ? undefined : _setBgColor(name) }}>
      {url && (
        <img className={`absolute inset-0 w-full h-full object-cover `} src={url} alt={name} />
      )}
      <span className="wil-avatar__name">{name[0]}</span>

      {hasChecked && (
        <span className={`  text-white  absolute  ${hasCheckedClass}`}>
          <VerifyIcon className="" />
        </span>
      )}
    </div>
  );
};

export default Avatar;
