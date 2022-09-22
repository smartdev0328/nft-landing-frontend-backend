import { Dialog } from '@material-ui/core';
import React, { FC } from 'react';
import ButtonPrimary from 'shared/Button/ButtonPrimary';
import ButtonSecondary from 'shared/Button/ButtonSecondary';
import NcModal from 'shared/NcModal/NcModal';

export interface ModalDisclaimerProps {
  show: boolean;
  onCloseModalDisclaimer: () => void;
  onAgreeDisclaimer: () => void;
}

const ModalDisclaimer: FC<ModalDisclaimerProps> = ({
  show,
  onCloseModalDisclaimer,
  onAgreeDisclaimer
}) => {
  return (
    <Dialog open={show} onClose={onCloseModalDisclaimer}>
      <div className="dialog-content-container items-center flex-column">
        <h3 className="text-lg font-semibold text-neutral-800 dark:text-neutral-800">
          Important Notice
        </h3>
        <br />
        <span className="text-sm">
          <span>
            <p>
              Please note that the wallet address registered here will be tied to your Affyn
              account.
            </p>
            <br />
            <p>
              <b>
                One Affyn account can only be tied to one wallet address and one wallet address can
                only be tied to one Affyn account.
              </b>
            </p>
            <br />
            <p>
              Please ensure that you are connecting to the correct wallet address before you
              proceed.
            </p>
          </span>
          <br />
        </span>
        <div className="mt-4 space-x-3">
          <ButtonPrimary onClick={onAgreeDisclaimer} type="submit">
            I Agree
          </ButtonPrimary>
          <ButtonSecondary type="button" onClick={onCloseModalDisclaimer}>
            Cancel
          </ButtonSecondary>
        </div>
      </div>
    </Dialog>
  );
};

export default ModalDisclaimer;
