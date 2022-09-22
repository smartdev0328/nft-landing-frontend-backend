import React, { FC, useState, useEffect } from "react";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import { Helmet } from "react-helmet";
import NcModal from "shared/NcModal/NcModal";
import ButtonSecondary from "shared/Button/ButtonSecondary";
import NcImage from "shared/NcImage/NcImage";
import QrCodeImg from "images/qr-code.png";
import metamaskImg from "images/metamask.svg";
import walletconnectImg from "images/walletconnect.webp";
import walletlinkImg from "images/walletlink.webp";
import fortmaticImg from "images/fortmatic.webp";
import ModalDisclaimer from "components/ModalDisclaimer";
import ModalConfirm from "components/ModalConfirm";
import { useHistory } from "react-router-dom";
// import ReCAPTCHA from 'react-google-recaptcha';
import NcCustom from "shared/Custom/NcCustom";
import { recaptchaVerification, updateWallet } from "api/loginApi";
import { editAddressString } from "shared/pipeline/pipeline";
import Cookies from "universal-cookie";
import { sessionStorageItems, userDataInfo } from "contains/enum";
import LoadSpinner from "shared/LoadSpinner/LoadSpinner";
import { Alert } from "@mui/material";

export interface PageConnectWalletProps {
	className?: string;
}

const PageConnectWallet: FC<PageConnectWalletProps> = ({ className = "" }) => {
	const [formValidationResult, setFormValidationResult] = React.useState("");
	const [hasClicked, setHasClicked] = React.useState(false);
	const [isMetamaskInstalled, setIsMetamaskInstalled] = useState<boolean>(true);
	// const [recaptchaResult, setRecaptchaResult] = useState<string | null | boolean>();
	const [ethereumAccount, setEthereumAccount] = useState<string | null>(null);
	const [nationalityVar, setNationality] = useState<string>("");
	const [showDisclaimer, setShowDisclaimer] = useState(true);
	const [errorAlert, setErrorAlert] = useState({ show: false, message: "" });
	const [showConfirm, setShowConfirm] = useState(false);
	const [confirmStatus, setConfirmStatus] = useState(false);
	const [isFormValid, setFormValid] = React.useState(true);
	const [isLoading, setLoading] = React.useState(false);
	const cookies = new Cookies();
	const userInfo = cookies.get(sessionStorageItems.USER);
	const email = userInfo && userInfo[userDataInfo.EMAIL];
	const isVerified = userInfo && userInfo[userDataInfo.VERIFIED];
	const history = useHistory();
	const redirectToInventory = () => {
		history.push("/inventory");
	};
	const redirectToStore = () => {
		history.push("/");
	};
	const redirectToConnectWallet = () => {
		history.push("/connect-wallet");
	};

	const openInNewTab = (url: string) => {
		window.open(url, "_blank", "noopener,noreferrer");
	};
	//const userInfo = cookies.get(sessionStorageItems.USER);
	// const recapKey = process.env.REACT_APP_RECAPTCHA_SITE_KEY;
	//console.log("Key was ", recapKey);

	const buttonHandler = async () => {
		setLoading(true);
		if (isVerified == false) {
			history.push("/resend-otp");
		}
		if (ethereumAccount === null) {
			setFormValid(false);
			setFormValidationResult("Please connect Metamask to your account.");
			setLoading(false);
		} else if (nationalityVar === "") {
			setFormValid(false);
			setFormValidationResult("Please select and declare your nationality.");
			setLoading(false);
		} else {
			// if (recaptchaResult) {
			setShowConfirm(true);
			//console.log('send info');
			//console.log(cookies.get('user').email);
			//console.log(nationalityVar);
			//console.log(response);
			//if response is 200 redirect to dashboard
			// } else {
			// setFormValid(false);
			// setFormValidationResult('Please complete reCAPTCHA.');
			// }
			// setLoading(false);
		}
		setLoading(false);
	};

	const confirmHandler = async () => {
		setLoading(true);
		if (ethereumAccount === null) {
			setFormValid(false);
			setFormValidationResult("Please connect Metamask to your account.");
			setLoading(false);
		} else if (nationalityVar === "") {
			setFormValid(false);
			setFormValidationResult("Please select and declare your nationality.");
			setLoading(false);
		} else {
			// if (recaptchaResult) {
			const response: any = await updateWallet(
				cookies.get("user").email,
				ethereumAccount,
				nationalityVar,
				cookies.get("jwt")
			);
			console.log(response);
			//if response is 200 redirect to dashboard
			if (response === undefined) {
				console.log("Error in getting response");
				setFormValidationResult("Something went wrong, please refresh and try again!");
				setLoading(false);
				return;
			}

			if (response.status === 200) {
				// eslint-disable-next-line prefer-const
				let userData = cookies.get("user");
				userData.wallet = ethereumAccount;
				cookies.set("user", userData, { path: "/", secure: true, sameSite: true });
				redirectToInventory();
			}
			if (response.status === 201) {
				setErrorAlert({
					show: true,
					message: "Selected wallet has already been registered by another account.",
				});
			}
			// } else {
			//   setFormValid(false);
			//   setFormValidationResult('Please complete reCAPTCHA.');
			// }
			// setLoading(false);
		}
		setLoading(false);
	};

	//Does the User have an Ethereum wallet/account?
	async function redirect(): Promise<void> {
		if (isMetamaskInstalled) {
			connectMetamaskWallet();
			return;
		}
		openInNewTab("https://metamask.io");
		window.location.reload();
	}

	//Does the User have an Ethereum wallet/account?
	async function connectMetamaskWallet(): Promise<void> {
		//to get around type checking
		setHasClicked(true);
		try {
			(window as any).ethereum
				.request({
					method: "eth_requestAccounts",
				})
				.then((accounts: string[]) => {
					setIsMetamaskInstalled(true);
					setEthereumAccount(accounts[0]);
				})
				.catch((error: any) => {
					setErrorAlert({
						show: true,
						message: "Connection failed. Please check your Metamask app and login to continue.",
					});
				});
		} catch (error) {
			setIsMetamaskInstalled(false);
			//console.log('no metamask');
		}
	}

	return (
		<div className={`nc-PageConnectWallet ${className}`} data-nc-id="PageConnectWallet">
			<Helmet>
				<title>Affyn.com - Bind Wallet</title>
			</Helmet>
			<ModalDisclaimer
				show={showDisclaimer}
				onCloseModalDisclaimer={() => {
					redirectToStore();
					setShowDisclaimer(false);
				}}
				onAgreeDisclaimer={() => {
					setShowDisclaimer(false);
				}}
			/>
			<ModalConfirm
				show={showConfirm}
				onCloseModalConfirm={() => {
					setShowConfirm(false);
					redirectToConnectWallet();
				}}
				onAgreeConfirm={() => {
					setConfirmStatus(true);
					confirmHandler();
					setShowConfirm(false);
				}}
			/>

			<div className="container">
				<div className="my-12 sm:lg:my-16 lg:my-24 max-w-3xl mx-auto space-y-8 sm:space-y-10">
					{errorAlert && errorAlert.show ? (
						<Alert severity="error">{errorAlert.message}</Alert>
					) : (
						""
					)}
					{/* HEADING */}
					{!isFormValid ? <Alert severity="error">{formValidationResult}</Alert> : ""}
					<div className="max-w-2xl">
						<h2 className="text-3xl sm:text-4xl font-semibold">Bind your wallet.</h2>
						<span className="block mt-3 text-neutral-500 dark:text-neutral-400">
							Bind your account with your Metamask wallet.
						</span>
					</div>
					<LoadSpinner open={isLoading}></LoadSpinner>
					<div className="w-full border-b-2 border-neutral-100 dark:border-neutral-700"></div>
					<div className="mt-10 md:mt-0 space-y-5 sm:space-y-6 md:sm:space-y-8">
						<div className="space-y-3">
							<div
								onClick={() => (hasClicked ? redirect() : connectMetamaskWallet())}
								typeof="button"
								tabIndex={0}
								className="relative rounded-xl hover:shadow-lg hover:bg-neutral-50 border 
                border-neutral-200 dark:border-neutral-700 px-3 sm:px-5 py-4 cursor-pointer flex 
                focus:outline-none focus:shadow-outline-blue focus:border-blue-500 dark:bg-neutral-800 
                dark:text-neutral-100 dark:hover:bg-neutral-900 dark:hover:text-neutral-200"
							>
								<div className="flex items-center w-fit sm:w-full">
									<div
										className="nc-NcImage flex-shrink-0 w-10 h-10 sm:w-14 sm:h-14 p-2 sm:p-3 bg-white rounded-full overflow-hidden shadow-lg"
										data-nc-id="NcImage"
									>
										<img src={metamaskImg} className={className} alt={"metamask-wallet"} />
									</div>
									<div className={`ml-4 sm:ml-8 font-semibold text-xl sm:text-2xl `}>
										{ethereumAccount !== null ? (
											<small className="block mt-0 text-neutral-500 dark:text-neutral-400">
												{editAddressString(ethereumAccount)}
											</small>
										) : isMetamaskInstalled ? (
											<p>Click here to connect to Metamask</p>
										) : (
											<p>Please Install Metamask</p>
										)}
									</div>
								</div>
							</div>
						</div>
						<div className="relative space-y-2">
							<NcCustom updateNationality={setNationality} />
						</div>

						{/* <ReCAPTCHA
              sitekey={recapKey}
              size="normal"
              onChange={async (result: any) => {
                //console.log('recaptcha result is: ', result);
                // setRecaptchaResult(result);
                const recaptchaResult = await recaptchaVerification(result);
                if (recaptchaResult === 200) {
                  setRecaptchaResult(true);
                }
              }}></ReCAPTCHA> */}

						{/* ---- */}
						<div className="pt-2 ">
							<ButtonPrimary className="flex-1 mx-auto" onClick={buttonHandler}>
								{/* <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M9.57 5.92993L3.5 11.9999L9.57 18.0699"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M20.5 12H3.67004"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg> */}
								Continue
								{/* <span className="ml-2"></span> */}
							</ButtonPrimary>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default PageConnectWallet;
