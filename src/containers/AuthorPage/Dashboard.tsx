import React, { FC, Fragment, useState } from 'react';
import { Helmet } from 'react-helmet';
/* import BackgroundSection from 'components/BackgroundSection/BackgroundSection'; */
import NcImage from 'shared/NcImage/NcImage'; /* 
import CardNFT from 'components/CardNFT'; */
import NessieCard from 'components/BuddyCard/NessieCard';
import PigasusCard from 'components/BuddyCard/PigasusCard';
import AccInfo from 'components/DashboardAccount';
import Metamask from 'images/metamask.svg';
import Googlebadge from 'images/Google.svg';
import fbbadge from 'images/Facebook.svg';
import VerifyIcon from 'components/VerifyIcon';
/* import Pagination from 'shared/Pagination/Pagination'; */
/* import ButtonPrimary from 'shared/Button/ButtonPrimary'; */
import authorBanner from 'images/nfts/0dash-Banner.png';
/* import SectionBecomeAnAuthor from 'components/SectionBecomeAnAuthor/SectionBecomeAnAuthor'; */
/* import SocialsList from 'shared/SocialsList/SocialsList'; */
/* import { Tab } from '@headlessui/react'; */
/* import CardAuthorBox3 from 'components/CardAuthorBox3/CardAuthorBox3';
import ArchiveFilterListBox from 'components/ArchiveFilterListBox';
import SectionGridAuthorBox from 'components/SectionGridAuthorBox/SectionGridAuthorBox'; */
import { sessionStorageItems, userDataInfo } from 'contains/enum';
import Web3 from 'web3';
import { AbiItem } from 'web3-utils';
import { contractAddresses, nftCategory } from 'contains/addresses';
import nftabi from 'contains/NFT_ABI';
import NFTCard from 'components/BuddyCard/NFTCard';
import Cookies from 'universal-cookie';
import { Alert } from '@mui/material';

export interface AuthorPageProps {
  className?: string;
}

const AuthorPage: FC<AuthorPageProps> = ({ className = '' }) => {
  // let [categories] = useState(['Inventory', 'History']);
  const cookies = new Cookies();
  const [balanceOfWallet, setBalanceOfWallet] = useState<string | null>();
  const [account, setAccount] = useState(''); //Just for test!!!!!!
  const [inventoryItems, setInventoryItems] = useState<any>([]);
  let web3;
  const userInfo = cookies.get(sessionStorageItems.USER);
  const email = userInfo && userInfo[userDataInfo.EMAIL];
  const isVerified = userInfo && userInfo[userDataInfo.VERIFIED];
  const wallet = userInfo && userInfo[userDataInfo.WALLET];

  React.useEffect(() => {
    const getBalanceOfWallet = async (web3Instance: Web3) => {
      const nftContractInst = new web3Instance.eth.Contract(
        nftabi as AbiItem[],
        contractAddresses.nft
      );
      const owner = await web3Instance.eth.getAccounts();
      const balance = await nftContractInst.methods.accountPurchases(owner[0]).call();
      setAccount(owner[0]);
      setBalanceOfWallet(balance);
    };
    if (Web3.givenProvider) {
      web3 = new Web3(Web3.givenProvider);
      getBalanceOfWallet(web3);
    }
  }, []);

  React.useEffect(() => {
    if (balanceOfWallet && Number(balanceOfWallet) > 0) {
      const temp = new Array(Number(balanceOfWallet)).fill('0');
      setInventoryItems(temp);
    }
  }, [balanceOfWallet]);

  return (
    <div className={`nc-AuthorPage  ${className}`} data-nc-id="AuthorPage">
      <Helmet>
        <title>Account Dashboard</title>
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
            <div className="dashboard-information-container">
              {/**
               * TODO: redirect to enter/resend OTP page, and decide if user is considered logged in when acc is unverified
               */}
              {!isVerified ? (
                <Alert severity="error">
                  <p>
                    Account has not been verified. Please check your email and click on the link
                    sent and enter your OTP to verify your account.
                  </p>
                  <p>Please note that purchases are not allowed for unverified accounts.</p>
                </Alert>
              ) : (
                ''
              )}
              <div className=" md:pt-1 md:mx-6 xl:mx-6 flex-grow">
                <div className="grid xl:grid-cols-3 gap-x-20 gap-y-5">
                  <div className="text-sm font-medium cursor-pointer ">
                    <AccInfo
                      labelTextClassName="bg-white dark:bg-neutral-900 "
                      labelText="Email"
                      info={email && email}
                    />
                  </div>
                  <div className="text-sm font-medium cursor-pointer items-baseline">
                    <div className="flex w-full border border-gray-700 rounded-lg mt-2.5 align-vertical-center">
                      <div className="input-items-wrapper p-1 flex">
                        <NcImage
                          containerClassName=" w-5 h-5 sm:w-11 sm:h-11 p-0.5 sm:p-1.5 ml-2  overflow-hidden align-vertical-center"
                          src={Metamask}
                        />
                        <div className="ml-4 text-slate-500 align-vertical-center">{wallet}</div>
                        {wallet && (
                          <VerifyIcon
                            className="ml-2 align-vertical-center"
                            iconClass="w-5 h-5 sm:w-6 sm:h-6 xl:w-7 xl:h-7"
                          />
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="text-sm font-medium cursor-pointer">
                    <AccInfo
                      labelTextClassName="bg-white dark:bg-neutral-900 "
                      labelText="Binded Account"
                      removeBorder="border-none py-0 md:py-0 px-0 md:px-0"
                    />
                    <div className="mt-2 flex w-full">
                      <NcImage
                        containerClassName=" w-5 h-5 sm:w-8 sm:h-8 p-0.5 sm:p-1.5 ml-2  overflow-hidden border rounded dark:border-slate-600"
                        src={Googlebadge}
                      />
                      <NcImage
                        containerClassName=" w-5 h-5 sm:w-8 sm:h-8 p-0.5 sm:p-1.5 ml-2  overflow-hidden border rounded ml-4 dark:border-slate-600"
                        src={fbbadge}
                      />
                    </div>
                  </div>
                </div>
                {/* <div className="flex items-center text-sm font-medium mt-2.5 cursor-pointer">
=======
						<div className=" md:pt-1 md:mx-6 xl:mx-6 flex-grow">
							<div className="grid xl:grid-cols-3 gap-x-20 gap-y-5">
								<div className="text-sm font-medium cursor-pointer ">
									<AccInfo
										labelTextClassName="bg-white dark:bg-neutral-900 "
										labelText="Email"
										info={email && email}
									/>
								</div>
                <div className="text-sm font-medium cursor-pointer items-baseline">
									<div className="flex w-full border border-gray-700 rounded-lg mt-2.5">
										<NcImage
											containerClassName="mt-2 w-6 h-6 sm:p-0.5 sm:w-8 sm:h-8 sm:p-1.5 ml-2  overflow-hidden"
											src={Metamask}
										/>
										<div className="text-neutral-800 dark:text-neutral-300 ml-4 text-slate-500 py-2 md:py-3 mt-0.5 text-base sm:py-2 text-sm ">
                      (0xa67…04fdba)
                    </div>
										<VerifyIcon
											className="ml-2 mt-2"
											iconClass="w-5 h-5 sm:w-6 sm:h-6 xl:w-7 xl:h-7"
										/>
									</div>
								</div>
								<div className="text-sm font-medium cursor-pointer">
									<AccInfo
										labelTextClassName="bg-white dark:bg-neutral-900 "
										labelText="Binded Account"
										removeBorder="border-none py- md:py-0 px-0 md:px-0"
									/>
									<div className="mt-1 flex w-full">
										<NcImage
											containerClassName=" w-5 h-5 sm:w-8 sm:h-8 p-1 sm:p-1.5 ml-2  overflow-hidden border rounded border-gray-700"
											src={Googlebadge}
										/>
										<NcImage
											containerClassName=" w-5 h-5 sm:w-8 sm:h-8 p-1 sm:p-1.5 ml-2  overflow-hidden border rounded ml-4 border-gray-700"
											src={fbbadge}
										/>
									</div>
								</div>
								
							</div>
							{/* <div className="flex items-center text-sm font-medium mt-2.5 cursor-pointer">
                  <Label>Password</Label>
                  <Input className="mt-1" defaultValue="Aff******@gmail.com" disabled />
                </div> */}
                {/* <div className="flex items-center text-sm font-medium space-x-2.5 mt-2.5 text-green-600 cursor-pointer">
                  <span className="text-neutral-700 dark:text-neutral-300">
                    4.0xc4c16ac453sa645a...b21a{' '}
                  </span>
                  <svg width="20" height="21" viewBox="0 0 20 21" fill="none">
                    <path
                      d="M18.05 9.19992L17.2333 12.6833C16.5333 15.6916 15.15 16.9083 12.55 16.6583C12.1333 16.6249 11.6833 16.5499 11.2 16.4333L9.79999 16.0999C6.32499 15.2749 5.24999 13.5583 6.06665 10.0749L6.88332 6.58326C7.04999 5.87492 7.24999 5.25826 7.49999 4.74992C8.47499 2.73326 10.1333 2.19159 12.9167 2.84993L14.3083 3.17493C17.8 3.99159 18.8667 5.71659 18.05 9.19992Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M12.5498 16.6583C12.0331 17.0083 11.3831 17.3 10.5915 17.5583L9.2748 17.9917C5.96646 19.0583 4.2248 18.1667 3.1498 14.8583L2.08313 11.5667C1.01646 8.25833 1.8998 6.50833 5.20813 5.44167L6.5248 5.00833C6.86646 4.9 7.19146 4.80833 7.4998 4.75C7.2498 5.25833 7.0498 5.875 6.88313 6.58333L6.06646 10.075C5.2498 13.5583 6.3248 15.275 9.7998 16.1L11.1998 16.4333C11.6831 16.55 12.1331 16.625 12.5498 16.6583Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div> */}
                {/* </div> */}
                {/* <div className="mt-4 ">
                <SocialsList itemClass="block w-7 h-7" />
              </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* ====================== END HEADER ====================== */}

      <div className="container py-5 lg:pb-28 lg:pt-20 space-y-16 lg:space-y-28">
        <main>
          <h1 className="text-2xl font-semibold">Inventory</h1>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-10 mt-8 lg:mt-10">
            {/* {Array.from('1111').map((_, index) =>
              Math.random() > 0.5 ? <NessieCard key={index} /> : <PigasusCard key={index} />
            )} */}
            {account && inventoryItems.length > 0 ? (
              inventoryItems.map((item: any, index: number) => {
                return <NessieCard key={index} timerToken="" isLiked></NessieCard>;
              })
            ) : (
              <div
                style={{
                  fontSize: '12px',
                  fontWeight: '700',
                  textAlign: 'center',
                  marginTop: '40px'
                }}>
                No Items in Inventory
              </div>
            )}
          </div>
        </main>

        {/* === SECTION 5 === */}
        {/* <div className="relative py-16 lg:py-28">
          <BackgroundSection />
          <SectionGridAuthorBox data={Array.from('11111111')} boxCard="box4" />
        </div>
 */}
        {/* SUBCRIBES */}
        {/* <SectionBecomeAnAuthor /> */}
      </div>
    </div>
  );
};

export default AuthorPage;
