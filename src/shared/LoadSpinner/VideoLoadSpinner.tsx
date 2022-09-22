import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { FC } from 'react';

export interface VideoLoadSpinnerProps {
  open?: boolean;
}

const VideoLoadSpinner: FC<VideoLoadSpinnerProps> = ({ open = false }) => {
  return (
    <div>
      <Backdrop sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }} open={open}>
        <div className="load-spinner-progresss-container items-center">
          <CircularProgress color="inherit" />
          <p style={{fontSize: '20px', color: 'red'}}>Video is loading...</p>
        </div>
      </Backdrop>
    </div>
  );
};

export default VideoLoadSpinner;
