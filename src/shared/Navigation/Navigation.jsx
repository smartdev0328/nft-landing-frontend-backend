import React from 'react';
import NavigationItem from './NavigationItem';
import { NAVIGATION_ITEMS } from 'data/navigation';
import { useLocation } from 'react-router-dom';
import { FynContext } from 'context/FynContext';

function Navigation() {
  const { notFound } = React.useContext(FynContext);
  const [loggedin, setLoggedin] = React.useState('no');
  const location = useLocation();
  React.useEffect(() => {
    if (
      !location.pathname.includes('/login') &&
      !location.pathname.includes('/signup') &&
      !location.pathname.includes('/verify') &&
      !notFound
    ) {
      setLoggedin('yes');
    } else {
      setLoggedin('no');
    }
    // if (
    //   location.pathname.includes('/login') ||
    //   location.pathname.includes('/signup') ||
    //   location.pathname.includes('/verify') ||
    //   notFound
    // ) {
    //   setLoggedin('no');
    // } else {
    //   setLoggedin('yes');
    // }
  }, [location, notFound, loggedin]);
  return (
    <ul className="nc-Navigation hidden lg:flex lg:flex-wrap lg:items-center lg:space-x-1 relative">
      {NAVIGATION_ITEMS.map((item) => (
        <NavigationItem key={item.id} menuItem={item} loggedin={loggedin === 'yes'} />
      ))}
    </ul>
  );
}

export default Navigation;
