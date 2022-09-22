import React from 'react';
import logoImg from 'images/Opensea_light.svg';
import logoLightImg from 'images/Opensea.svg';

export interface LogoProps {
  img?: string;
  imgLight?: string;
  className?: string;
}

const OpenseaIcon: React.FC<LogoProps> = ({ img = logoImg, imgLight = logoLightImg, className = '' }) => {
  return (
    <div className={`inline-block text-primary-6000 ${className}`}>
      {img ? (
        <img className={`block h-6 ${imgLight ? 'dark:hidden' : ''}`} src={img}  />
      ) : (
        'Logo Here'
      )}
      {imgLight && <img className="hidden h-6 dark:block" src={imgLight} />}
    </div>
  );
};

export default OpenseaIcon;
