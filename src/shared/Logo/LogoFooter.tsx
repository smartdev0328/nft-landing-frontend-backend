import React from 'react';
import { Link } from 'react-router-dom';
import logoImg from 'images/Affyn-logo-light.png';
import logoLightImg from 'images/Affyn-logo-dark.png';

export interface LogoProps {
  img?: string;
  imgLight?: string;
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ img = logoImg, imgLight = logoLightImg, className = '' }) => {
  return (
    <a href="https://affyn.com" target="_blank" className={`${className}`}>
      {/* THIS USE FOR MY CLIENT */}
      {/* PLEASE UN COMMENT BELLOW CODE AND USE IT */}
      {img ? (
        <img className={`block max-h-12 ${imgLight ? 'dark:hidden' : ''}`} src={img} alt="Logo" />
      ) : (
        'Logo Here'
      )}
      {imgLight && <img className="hidden max-h-12 dark:block" src={imgLight} alt="Logo-Light" />}
    </a>
  );
};

export default Logo;
