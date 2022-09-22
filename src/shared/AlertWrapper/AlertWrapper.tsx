import { Alert } from '@mui/material';
import { FC, useState } from 'react';
import { isMobile } from 'utils/common';

export interface AlertWrapperProps {
  show: boolean;
  errorType: 'success' | 'warning' | 'error';
  message?: any;
  id?: string;
}

const AlertWrapper: FC<AlertWrapperProps> = ({
  show,
  errorType,
  message = '',
  id = 'action-alert-wrapper'
}) => {
  const [showAlert, setShowAlert] = useState(false);
  function isInViewport(element: any) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }

  const getAlertComponent = () => {
    if (isMobile()) {
      if (showAlert !== show) {
        if (!showAlert && show) {
          const alertDiv = document.getElementById(id);
          if (alertDiv && !isInViewport(alertDiv)) {
            alertDiv.scrollIntoView(true);
          }
        }
        setShowAlert(show);
      }
    }
    return <Alert severity={errorType}>{message}</Alert>;
  };

  return (
    <div id={id} style={{ display: show ? 'block' : 'none' }}>
      {show ? getAlertComponent() : null}
    </div>
  );
};

export default AlertWrapper;
