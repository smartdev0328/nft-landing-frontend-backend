import { SocialType } from 'shared/SocialsShare/SocialsShare';
import React, { FC } from 'react';
import discord from 'images/socials/discord.svg';
import vimeo from 'images/socials/vimeo.svg';
import twitter from 'images/socials/twitter.svg';
import telegram from 'images/socials/telegram.svg';
import youtube from 'images/socials/youtube.svg';
import opensea from 'images/socials/opensea.svg';


export interface SocialsList1Props {
  className?: string;
}

const socials: SocialType[] = [
  { name: 'Discord', icon: discord, href: 'https://discord.io/affynofficial' },
  { name: 'Youtube', icon: youtube, href: 'https://www.youtube.com/c/AffynOfficial' },
  { name: 'Telegram', icon: telegram, href: 'https://t.me/affynofficial' },
  { name: 'Twitter', icon: twitter, href: 'https://twitter.com/AffynOfficial' },
  { name: 'OpenSea', icon: opensea, href: 'https://opensea.io/collection/nexus-world-gen-zero-buddies' }
];

const SocialsList1: FC<SocialsList1Props> = ({ className = 'space-y-3' }) => {
  const renderItem = (item: SocialType, index: number) => {
    return (
      <a
        href={item.href}
        className="items-center side-padding text-neutral-700 hover:text-black dark:text-neutral-300 dark:hover:text-white"
        key={index}
        target="_blank"
        rel="noreferrer">
        <div className="flex-shrink-0 w-10 side-padding">
          <img src={item.icon} alt="" />
        </div>
        <span className="hidden lg:block text-sm">{item.name}</span>
      </a>
    );
  };

  return (
    <div className={`nc-SocialsList1 ${className}`} data-nc-id="SocialsList1">
      {socials.map(renderItem)}
    </div>
  );
};

export default SocialsList1;
