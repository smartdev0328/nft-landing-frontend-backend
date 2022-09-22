import Cookies from 'universal-cookie';

const isAuthorized = () => {
  const cookies = new Cookies();
  const sessionInfo = cookies.get('user');
  if (sessionInfo) {
    return true;
  } else {
    return false;
  }
};

export { isAuthorized };
