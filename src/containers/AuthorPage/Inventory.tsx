import React, { FC, Fragment, useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import NcImage from "shared/NcImage/NcImage";
import AccInfo from "components/DashboardAccount";
import Metamask from "images/metamask.svg";
import authorBanner from "images/nfts/0dash-Banner.png";
import { editAddressString } from "shared/pipeline/pipeline";
import { sessionStorageItems, userDataInfo } from "contains/enum";
import Web3 from "web3";
import { AbiItem } from "web3-utils";
import { contractAddresses, nftCategory } from "contains/addresses";
import nftabi from "contains/NFT_ABI";
import NFTCard from "components/BuddyCard/NFTCard";
import Cookies from "universal-cookie";
import { useHistory } from "react-router-dom";
import { Alert, CircularProgress } from "@mui/material";

export interface AuthorPageProps {
	className?: string;
}

declare let window: any;

const AuthorPage: FC<AuthorPageProps> = ({ className = "" }) => {
	// let [categories] = useState(['Inventory', 'History']);
	const cookies = new Cookies();
	const [balanceOfWallet, setBalanceOfWallet] = useState<string | null>();
	const [account, setAccount] = useState(""); //Just for test!!!!!!
	const [inventoryItems, setInventoryItems] = useState<any>([]);
	const [errorAlert, setErrorAlert] = useState({ show: false, message: "" });
	const [isLoading, setLoading] = useState(true);
	const [isWalletConnected, setWalletConnection] = useState(true);

	let web3;
	const userInfo = cookies.get(sessionStorageItems.USER);
	const email = userInfo && userInfo[userDataInfo.EMAIL];
	const isVerified = userInfo && userInfo[userDataInfo.VERIFIED];
	const wallet = userInfo && userInfo[userDataInfo.WALLET];
	const history = useHistory();

	const ethEnabled = async () => {
		if (typeof window.ethereum !== 'undefined') {
		  // Instance web3 with the provided information from the MetaMask provider information
		  web3 = new Web3(Web3.givenProvider);
		  try {
			// Request account access
			await window.ethereum.enable();
			//await window.ethereum.request('eth_requestAccounts');
			window.location.reload();
			return true;
		  } catch (e) {
			// User denied access
			return false;
		  }
		} else {
			console.log('no metamask found');
		}
		return false;
	  };

	React.useEffect(() => {
		const getBalanceOfWallet = async () => {
			//Reading Contracts. No need metamask
			const web3temp = new Web3(new Web3.providers.HttpProvider(contractAddresses.infura));
			const nftContractInst = new web3temp.eth.Contract(nftabi as AbiItem[], contractAddresses.nft);

			//Get owner
			const web3Instance = new Web3(Web3.givenProvider);
			const owner = await web3Instance.eth.getAccounts();
			if (wallet === undefined) {
				setErrorAlert({
					show: true,
					message: "Error getting binded wallet information",
				});
				return;
			}
			if (isVerified == false) {
				history.push("/resend-otp");
				return;
			}
			if (wallet.length < 10) {
				setErrorAlert({
					show: true,
					message: "Please bind a wallet to your account",
				});
				history.push("/connect-wallet");
				return;
			}

			if (wallet == "none") {
				setErrorAlert({
					show: true,
					message: "Please bind a wallet to your account",
				});
				history.push("/connect-wallet");
				return;
			}

			if (owner[0] === undefined) {
				setWalletConnection(false);
				setErrorAlert({
					show: true,
					message: "Please login to your registered Metamask wallet to view your inventory",
				});
				return;
			}

			if (owner[0].toUpperCase() !== wallet.toUpperCase()) {
				setErrorAlert({
					show: true,
					message: "Please switch to the registered wallet address in your Metamask",
				});
				return;
			}

			const balance = await nftContractInst.methods.balanceOf(owner[0]).call();
			setAccount(owner[0]);
			setBalanceOfWallet(balance);
		};

		if (Web3.givenProvider) {
			getBalanceOfWallet();
		}
	}, []);

	React.useEffect(() => {
		if (balanceOfWallet && Number(balanceOfWallet) > 0) {
			const temp = new Array(Number(balanceOfWallet)).fill("0");
			setInventoryItems(temp);
		}
	}, [balanceOfWallet]);

	return (
		<div className={`nc-AuthorPage  ${className}`} data-nc-id="AuthorPage">
			<Helmet>
				<title>Account Inventory</title>
			</Helmet>
			{/* HEADER */}
			<div className="w-full">
				<div className="relative w-full h-40 md:h-60 2xl:h-72">
					<NcImage
						containerClassName="absolute inset-0"
						src={authorBanner}
						className="object-cover w-full h-full"
					/>
				</div>
				<div className="container -mt-10 lg:-mt-16">
					<div className="relative bg-white dark:bg-neutral-900 dark:border dark:border-neutral-700 p-5 lg:p-8 rounded-3xl md:rounded-[40px] shadow-xl flex flex-col md:flex-row">
						{/* <div className="w-32 lg:w-44 flex-shrink-0 mt-12 sm:mt-0">
              <NcImage
                src={nftsImgs[2]}
                containerClassName="aspect-w-1 aspect-h-1 rounded-3xl overflow-hidden"
              />
            </div> */}
						<div className="dashboard-information-container w-full">
							{/**
							 * TODO: redirect to enter/resend OTP page, and decide if user is considered logged in when acc is unverified
							 */}
							{errorAlert && errorAlert.show ? (
								<Alert severity="error" classes={{ root: "inventory-alert xl:mx-6" }}>
									{errorAlert.message}
								</Alert>
							) : (
								""
							)}
							{!isVerified ? (
								<Alert severity="error" classes={{ root: "inventory-alert xl:mx-6" }}>
									<p>
										Account has not been verified. Please check your email and click on the link
										sent and enter your OTP to verify your account.{" "}
										<span>
											[
											<a className="color:orange" href="/resend-otp">
												Click here to resend OTP
											</a>
										</span>
										]
									</p>
								</Alert>
							) : (
								""
							)}
							<div className="md:mx-6 xl:mx-6 flex-grow">
								<div className="grid grid-cols-1 xl:grid-cols-2 gap-x-20 gap-y-5">
									<div className="text-sm font-medium cursor-pointer ">
										<AccInfo
											contentClass="inventory-input-display ml-2"
											labelTextClassName="bg-white dark:bg-neutral-900 "
											labelText="Email"
											info={email && email}
										/>
									</div>
									<div className="text-sm font-medium cursor-pointer items-baseline" onClick={() => isWalletConnected ? null : ethEnabled()}>
										<div className="flex border border-gray-700 rounded-lg mt-2.5 align-vertical-center w-full inventory-input-display">
											<div className="pr-4 p-1 md:p-0 md:pr-4 flex overflow-x-hidden">
												<NcImage
													containerClassName=" w-5 h-5 sm:w-11 sm:h-11 xl:w-14 p-0.5 sm:p-1.5 ml-2 align-vertical-center"
													src={Metamask}
												/>
												<div className="ml-2 text-slate-500 align-vertical-center overflow-x-hidden">
													{isWalletConnected ? (
														<div>{editAddressString(wallet)}</div>
													) : (
														<div> <p>Click to connect wallet</p> </div>
													)}
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className="container py-5 lg:pb-28 lg:pt-20 space-y-16 lg:space-y-28">
				<main>
					<h1 className="text-2xl font-semibold">Inventory</h1>
					<div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-10 mt-8 lg:mt-10">
						{/* {Array.from('1111').map((_, index) =>
              Math.random() > 0.5 ? <NessieCard key={index} /> : <PigasusCard key={index} />
            )} */}
						{account && inventoryItems.length > 0 ? (
							inventoryItems.map((item: any, index: number) => {
								return <NFTCard account={account} tokenIndex={index} key={index}></NFTCard>;
							})
						) : (
							<div className="text-m text-center col-start-1 col-end-7 border p-10 rounded-3xl border-neutral-700">
								No Items in Inventory
							</div>
						)}
					</div>
				</main>
			</div>
		</div>
	);
};

export default AuthorPage;
