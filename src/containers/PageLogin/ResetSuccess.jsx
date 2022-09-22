import { Helmet } from 'react-helmet';
import { useHistory, useParams } from 'react-router-dom';
import _ from 'lodash';
import ButtonPrimary from 'shared/Button/ButtonPrimary';

const ResetSuccess = ({ className = '' }) => {
  const history = useHistory();
  const redirectToLogin = () => {
    history.push('/login');
  };

  return (
    <div className={`${className}`}>
      <Helmet>
        <title>Reset Password | Marketplace App</title>
      </Helmet>
      <div className="container mb-24 lg:mb-32">
        <h2 className="my-20 flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center">
          Reset Password
        </h2>
        <div className="max-w-md mx-auto space-y-6">
          <div className="grid grid-cols-1 gap-6">
            <label className="block">
              <p className="text-center">Password updated.</p>
            </label>
            <br></br>
            <ButtonPrimary
              onClick={() => {
                redirectToLogin();
              }}>
              Back To Login
            </ButtonPrimary>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetSuccess;
