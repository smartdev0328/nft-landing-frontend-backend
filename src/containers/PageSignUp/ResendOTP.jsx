import React from 'react';
import { Helmet } from 'react-helmet';

import ButtonPrimary from 'shared/Button/ButtonPrimary';

import { FynContext } from 'context/FynContext';
import { sessionStorageItems, userDataInfo } from 'contains/enum';
import { resendVerifyEmail } from 'api/loginApi';
import _ from 'lodash';
import { useHistory } from 'react-router-dom';
import LoadSpinner from 'shared/LoadSpinner/LoadSpinner';
import Cookies from 'universal-cookie';
import { Alert } from '@mui/material';

// eslint-disable-next-line react/prop-types
const ResendOTP = ({ className = '' }) => {
	const cookies = new Cookies();
	const [isLoading, setLoading] = React.useState(false);

	const [isFormValid, setFormValid] = React.useState(true);
	// TODO: show display error for fb/google signups

	const [formValidationResult, setFormValidationResult] = React.useState('');

	const [isResendDisabled, setDisableResend] = React.useState(false);
	const history = useHistory();
	const userInfo = cookies.get(sessionStorageItems.USER);
	const email = userInfo && userInfo[userDataInfo.EMAIL];

	const redirectToInventory = () => {
		history.push('/inventory');
	};

	const resendOtp = async () => {
		setDisableResend(true);
		setLoading(true);
		const session = {
			emailAddress: email,
		};
		//TODO: fix resend otp codes and add expiry to current otp
		const response = await resendVerifyEmail(session);
		if (response.status === 200) {
			setFormValidationResult(`OTP Code has been re-sent to ${email}.`);
		} else {
			setFormValid(false);
			setFormValidationResult(
				'Error resending OTP. You may have verified your account previously.'
			);
			redirectToInventory();
		}
		setLoading(false);
	};

	const showOtpForm = () => {
		return (
			<div className="grid grid-cols-1 gap-6">
				{!_.isEmpty(formValidationResult) ? (
					<Alert severity={isFormValid ? 'success' : 'error'}>{formValidationResult}</Alert>
				) : (
					''
				)}
				<label className="block">
					<span className="text-neutral-800 dark:text-neutral-200">
						Your email has not been verified. Please check your email for an OTP.{' '}
					</span>
					<span className="text-neutral-800 dark:text-neutral-200">{`Click here to resend OTP Code to: ${email}`}</span>
				</label>
				<ButtonPrimary
					onClick={() => {
						if (!isResendDisabled) resendOtp();
					}}
					disabled={isResendDisabled}
				>
					Resend OTP
				</ButtonPrimary>
			</div>
		);
	};
	return (
		<div className={`${className}`}>
			<Helmet>
				<title>Resend OTP</title>
			</Helmet>
			<div className="container mb-24 lg:mb-32">
				<h2 className="my-20 flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center">
					Resend OTP
				</h2>
				<div className="max-w-md mx-auto space-y-6 ">
					{/* FORM */}
					<LoadSpinner open={isLoading}></LoadSpinner>

					{showOtpForm()}
					{/* ==== */}
				</div>
			</div>
		</div>
	);
};

export default ResendOTP;
