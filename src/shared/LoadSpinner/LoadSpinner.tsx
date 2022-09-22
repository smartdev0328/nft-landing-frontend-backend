import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { FC } from "react";

export interface LoadSpinnerProps {
  open?: boolean;
}

const LoadSpinner: FC<LoadSpinnerProps> = ({ open = false }) => {
  return (
    <div>
      <Backdrop sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }} open={open}>
        <div className="load-spinner-progresss-container items-center">
          <CircularProgress color="inherit" />
          <p>Please wait...</p>
        </div>
      </Backdrop>
    </div>
  );
};

export default LoadSpinner;
