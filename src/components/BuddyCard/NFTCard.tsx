import React, { FC, useState } from "react";
import { Link } from "react-router-dom";
import Avatar2 from "shared/Avatar/Avatar2";

import NcImage from "shared/NcImage/NcImage";
/* import { nftsImgs } from 'contains/fakeData'; */
import ItemTypeImageIcon from "../ItemTypeImageIcon";
import Egg from "images/nfts/0NessieEgg.png";
/* import LikeButton from './LikeButton'; */
import HatchBtn from "../HatchBtn";
import HatchTime from "../HatchTime";
import Web3 from "web3";
import { AbiItem } from "web3-utils";
import { contractAddresses, nftCategory } from "contains/addresses";
import nftabi from "contains/NFT_ABI";
import axios from "axios";
import LoadSpinner from "shared/LoadSpinner/LoadSpinner";
import { ethers } from "ethers";
import VideoLoadSpinner from "shared/LoadSpinner/VideoLoadSpinner";
import NcModal from "./NcModal";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import { CircularProgress } from "@mui/material";

/* import { ClockIcon } from '@heroicons/react/outline'; */
/* import ItemTypeVideoIcon from './ItemTypeVideoIcon'; */

export interface CardNFTProps {
	className?: string;
	isLiked?: boolean;
	tokenIndex: number;
	account: string;
}

declare let window: any;

interface TokenInfo {
	image: string;
	name: string;
	description: string;
	//attributes: Array<Object>;
}

interface ImageCompProp {
	imgUrl: string | undefined;
}

interface VideoCompProp {
	videoLink : string | undefined;
}

const NFTCard: FC<CardNFTProps> = ({ className = "", isLiked, tokenIndex, account }) => {
	const imageList = {
		1: "0PigasusEgg.png",
		2: "0NessieEgg.png",
		3: "0Floomph.png",
		4: "0Gagamaru.png",
	};

	const [hasHatched, setHasHatched] = React.useState(true);
	const [canHatch, setCanHatched] = React.useState(false);
	const [tokenInfo, setTokenInfo] = React.useState<TokenInfo | null>();
	const [tokenId, setTokenId] = React.useState<string>();
	const [loading, setLoading] = React.useState<boolean>(false);
	const [videoLoading, setVideoLoading] = React.useState<boolean>(false);
	const [category, setCategory] = React.useState<number | null>();
	//const [videoUrl, setVideoUrl] = React.useState();
	const [imageshowtime, setImageshowtime] = React.useState(false);
	const [imageUrl, setImageUrl] = React.useState<string | null>();
	const [isLoading, setisLoading] = React.useState(true);

	let web3: Web3 = new Web3();
	const ethEnabled = async () => {
    if (typeof window.ethereum !== 'undefined') {
      // Instance web3 with the provided information from the MetaMask provider information
      web3 = new Web3(Web3.givenProvider);
      try {
        // Request account access
        await window.ethereum.enable();
        //await window.ethereum.request('eth_requestAccounts');
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
	const getTokenInfo = async (
		web3Instance: Web3,
		contractABI: AbiItem[],
		contractAddress: string,
		index: number,
		owner: string
	) => {
		console.log("index is ", index);
		const contractInstance = new web3Instance.eth.Contract(contractABI, contractAddress);
		if (index !== undefined) {
			const tokenIdFromIndex = await contractInstance.methods
				.tokenOfOwnerByIndex(owner, index)
				.call();
			const tokenCategory = await contractInstance.methods
				.getCategoryValue(tokenIdFromIndex)
				.call();
			const tokenUri = await contractInstance.methods.tokenURI(tokenIdFromIndex).call();
			const hasHatched = await contractInstance.methods.hasHatched(tokenIdFromIndex).call();
			const canHatch = await contractInstance.methods.isHatchEnabled(tokenIdFromIndex).call();

			console.log("tokenIdFromIndex is ", tokenIdFromIndex, index);
			console.log("toeknUri is ", tokenUri);

			const response = await axios.get(tokenUri, {
				headers: {
					"Access-Control-Allow-Origin": "*",
					"Content-type": "application/json",
				},
			});
			console.log("response is ", response);

			setTokenId(String(tokenIdFromIndex));
			setCategory(Number(tokenCategory));
			setHasHatched(hasHatched);
			setCanHatched(canHatch);
			setTokenInfo(response.data);
		}
	};

	React.useEffect(() => {
		const web3 = new Web3(Web3.givenProvider);
		getTokenInfo(web3, nftabi as AbiItem[], contractAddresses.nft, tokenIndex, account);
	}, []);

	React.useEffect(() => {
		if (tokenInfo) {
			setImageUrl(tokenInfo.image);
		}
		setTimeout(() => {
			setisLoading(false);
		}, 6000);
	}, [tokenInfo]);

	const reloadPage = () => {
		window.location.reload();
	};

	const hatch = async () => {
		setLoading(true);
		setVideoLoading(false);
		setImageshowtime(false);

    	await ethEnabled();
		const contractInst = new web3.eth.Contract(nftabi as AbiItem[], contractAddresses.nft);
        const gasPriceValue = await web3.eth.getGasPrice();
		console.log('Gas price value is ', gasPriceValue);
		try {
			const hatchResult = await contractInst.methods
			  .hatch(tokenId)
			  .send({
				from: account,
				gas: 3000000,
				gasPrice: gasPriceValue,
			  });
	  
			if (hatchResult.status) {
				setLoading(false);
				setVideoLoading(true);
			}
			else {
				setLoading(false);
			}
		  } catch (error) {
			console.log(error);
			setLoading(false);
		  }
	};

	const renderAvatars = () => {
		return (
			<div className="flex -space-x-1 ">
				<Avatar2 containerClassName="ring-2 ring-white dark:ring-neutral-900" />
			</div>
		);
	};

  const [isVideoEnded, setIsVideoEnded] = useState(false);
//   const renderContent = () => {
//     /* const timerToken = window.setTimeout(() => setShowModal(false), 33000); */

// 		console.log('Trying to play video @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@')

//     if (isVideoEnded) {
//       return (
//         <div className="w-full items-center flex text-center flex-col bg-white p-8">
// 			<img src={tokenInfo?.image} className="w-fit"></img>
//           <div className="text-xs mb-6 text-black">Please note that you will be able to view the hatched Buddy in your inventory only after the hatch transaction completes in Metamask. 
//           </div>
// 		  <ButtonPrimary className="mb-2 text-white rounded-full text-xs bg-primary-6000 border-0 p-10 py-2" onClick={reloadPage}>
// 						Continue
// 					</ButtonPrimary>
//         </div>
//       );
//     }

	//const videoId = `images/nfts/${category}.mp4`;
	
    // return (
    //   <div className="w-full">
    //     <video autoPlay onEnded={() => setIsVideoEnded(true)}>
    //       <source type="video/mp4" src={videoId}></source>
    //     </video>
    //   </div>
    // );
  //};

	//  const closeVideoAndShowImage = () => {
	// 	setImageshowtime(true);
	// 	setVideoLoading(false);
	// };

	const VideoComp = ({videoLink}: VideoCompProp) => {
		console.log("Trying to play category ", category);
		console.log('Video link is ', videoLink);

		return (
			<div className="w-full ">
				<video autoPlay onEnded={() =>  setIsVideoEnded(true)}>
					<source type="video/mp4" src={videoLink}/>
					Video tag unsupported on browser?
				</video>
			</div>
		);
	};

	const ImageComp = ({ imgUrl }: ImageCompProp) => {
		console.log('SHOW IMAGE@@@@@@@@');
		return (
			<div className="w-full items-center flex text-center flex-col bg-white p-8">
			<img src={imgUrl} className="w-fit"></img>
          <div className="text-xs mb-6 text-black">Please note that you will be able to view the hatched Buddy in your inventory only after the hatch transaction completes in Metamask. 
          </div>
		  <ButtonPrimary className="mb-2 text-white rounded-full text-xs bg-primary-6000 border-0 p-10 py-2" onClick={reloadPage}>
						Continue
					</ButtonPrimary>
        </div>
		);
	};

	function determineVideoPlayback () {

		let videoUrl = "";

		if (category) {
			if (category === 1)
				videoUrl = ("https://www.youtube.com/embed/rUWxSEwctFU?controls=0");
			else if (category === 2)
			videoUrl = ("https://www.youtube.com/embed/UT5F9AXjwhg?controls=0");
			else if (category === 3)
			videoUrl = ("https://www.youtube.com/embed/ZLls1Wn6070?controls=0");
			else if (category === 4)
			videoUrl = ("https://www.youtube.com/embed/zwZkhCP9QRY?controls=0");
		console.log('Video assigned to cat ', category);
	}
	console.log('Video Link ', videoUrl);
		return <VideoComp videoLink = {videoUrl}/>
	}

	return ( isLoading ? (
			<div className="text-m text-center border p-10 rounded-3xl">
      <CircularProgress color="inherit" />
      <p>Loading...</p>
	  </div>
  ) : (
		<div
			className={`nc-CardNFT bg-gray-100 dark:bg-transparent relative flex flex-col group border-1 border-gray-200 dark:border-gray-700[ nc-box-has-hover nc-dark-box-bg-has-hover ] ${className}`}
			data-nc-id="CardNFT"
		>
			<LoadSpinner open={loading}></LoadSpinner>
			<NcModal
				renderTrigger={() => ""}
				renderContent={() => determineVideoPlayback()}
				contentExtraClass="max-w-md"
				isOpenProp={videoLoading}
			></NcModal>
			<NcModal
				renderTrigger={() => ""}
				contentExtraClass="max-w-md"
				renderContent={() => <ImageComp imgUrl={tokenInfo?.image}></ImageComp>}
				isOpenProp={isVideoEnded}
			></NcModal>
			<div className="relative flex-shrink-0 ">
				<div className="bg-gradient-to-r from-[#CBECEC] to-[#B2B2F8] rounded-3xl">
					{hasHatched ? (
						<NcImage
							containerClassName="flex w-full h-full mx-auto rounded-3xl overflow-hidden z-0"
							src={imageUrl ? imageUrl : "/assets/images/placeholder.png"}
							className="w-full h-full group-hover:scale-[1.03] transition-transform duration-300 ease-in-out will-change-transform"
						/>
					) : (
						<NcImage
							containerClassName="flex w-full h-full mx-auto rounded-3xl overflow-hidden z-0"
							src={
								category
									? imageUrl ? imageUrl : "/assets/images/placeholder.png"
									: "/assets/images/placeholder.png"
							}
							className="w-full h-full group-hover:scale-[1.03] transition-transform duration-300 ease-in-out will-change-transform"
						/>
					)}
				</div>

				{/* <ItemTypeImageIcon className="absolute top-3 left-3 !w-9 !h-9" /> */}
			</div>

			<div className="p-4 py-5 space-y-3">
				<div className="flex justify-between">
					{renderAvatars()}
					{/* <span className="text-neutral-700 dark:text-neutral-400 text-xs">
            {Math.floor(Math.random() * 20) + 1} out of 100
          </span> */}
				</div>
				{/* <h2 className={`text-xl font-medium`}>Nessie</h2> */}
				<h2 className={`text-xl font-medium`}>{tokenInfo?.name}</h2>

				<div className="w-2d4 w-full border-b border-gray-300 dark:border-neutral-700"></div>
				<div className="mx-auto">
					{/* <Prices labelTextClassName="bg-white dark:bg-neutral-900 dark:group-hover:bg-neutral-800 group-hover:bg-neutral-50" /> */}
					<div className="flex items-center text-sm text-neutral-500 dark:text-neutral-400">
						{/* <ClockIcon className="w-4 h-4" /> */}
						{/* {Math.random() > 0.5 ? (
              <Link to={'/nft-detailt'}>
                <HatchBtn />
              </Link>
            ) : (
              <HatchTime />
            )} */}
						{!hasHatched ? (
							canHatch ? (
								<HatchBtn onClick={hatch}></HatchBtn>
							) : (
								"Egg not ready!"
							)
						) : (
							"Already hatched!"
						)}
					</div>
				</div>
			</div>
		</div>
	));
};

export default NFTCard;
