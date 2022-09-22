export const isMobile = () => {
  const mobileScreen = ( window.innerWidth <= 800 ) && ( window.innerHeight <= 600 );
  return (mobileScreen || navigator.maxTouchPoints || 'ontouchstart' in document.documentElement);
};

export default {};