import React, { FC } from 'react';
import Avatar from 'shared/Avatar/Avatar';
import Badge from 'shared/Badge/Badge';
import ButtonPrimary from 'shared/Button/ButtonPrimary';
import ButtonSecondary from 'shared/Button/ButtonSecondary';
import NcImage from 'shared/NcImage/NcImage';
import LikeSaveBtns from './LikeSaveBtns';
import { nftsLargeImgs, personNames } from 'contains/fakeData';
import TimeCountDown from './TimeCountDown';
import collectionPng from 'images/assets/images/logo/Gen0Logo.png';
import AccordionInfo from './AccordionInfo';
import OpenseaIco from 'images/Opensea.svg';
import LoadSpinner from 'shared/LoadSpinner/LoadSpinner';
import SwitchIcon from 'shared/SwitchDarkMode/SwitchIcon';
import Cookies from 'universal-cookie';
import nftabi from 'contains/NFT_ABI';
import Web3 from 'web3';
import { useState } from 'react';
import { AbiItem } from 'web3-utils';
import { contractAddresses, nftCategory, ChainID } from 'contains/addresses';
import { approveToken, getAmount } from 'utils/approveToken';
import { useHistory } from 'react-router-dom';
import { Alert } from '@mui/material';
import attABI from 'contains/ATTABI';
import { isWhitelisted } from 'api/loginApi';
import ModalTermsAndCondition from 'components/ModalTermsAndCondition';
import AlertWrapper from 'shared/AlertWrapper/AlertWrapper';

export interface NftDetailPageProps {
  className?: string;
  isPreviewMode?: boolean;
  category: number;
  nftName: string;
}

declare let window: any;

const NftDetailPage: FC<NftDetailPageProps> = ({
  className = '',
  isPreviewMode,
  category,
  nftName
}) => {
  const history = useHistory();
  const [nft1, setNft1] = useState('0');
  const cookies = new Cookies();

  const [isSoldOut, setSoldOut] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [isSaleActive, setIsSaleActive] = useState(false);
  const [isPresaleActive, setIsPresaleActive] = useState(false);
  const [fynPrice, setFynPrice] = useState('3000000000000000000000');
  const [wallet, setWallet] = useState(false);
  const [errorAlert, setErrorAlert] = useState({
    show: false,
    message: ''
  });
  const [showContractModal, setShowContractModal] = useState(false);
  const [whitelistInfo, setWhitelistInfo] = useState(Object);

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
      setErrorAlert({
        show: true,
        message: 'Please install Metamask to purchase the eggs.'
      });
    }
    return false;
  };

  const GetEggsInfo = async () => {
    web3 = new Web3(new Web3.providers.HttpProvider(contractAddresses.infura));
    const contractInst = new web3.eth.Contract(nftabi as AbiItem[], contractAddresses.nft);
    const nftAmount = await contractInst.methods.getCategoryRemainingMints(category).call();
    setNft1(nftAmount);
    console.log('NFT Amount ', nftAmount);
    if (Number(nftAmount) <= 0) {
      console.log('Activate Soldout');
      setSoldOut(true);
    }
    setFynPrice(await contractInst.methods.PRICE().call());
    console.log('Fyn Price ', fynPrice);
  };

  const allowanceFunction = async (acc: string) => {
    console.log('Request Allowance ', acc);
    await ethEnabled();
    const results = await approveToken({
      web3Instance: web3,
      tokenAddress: contractAddresses.fynToken,
      spender: contractAddresses.nft,
      amount: fynPrice,
      sender: acc
    });
    console.log('Allowance Result ', results.status);
    return results;
  };

  const premintFunction = async (acc: string, merkleProof: any) => {
    await ethEnabled();
    const contractInst = new web3.eth.Contract(nftabi as AbiItem[], contractAddresses.nft);
    const gasPriceValue = await web3.eth.getGasPrice();
  console.log('Gas price value is ', gasPriceValue);
  try {
      console.log('prooof ', merkleProof.data);
      const mintResult = await contractInst.methods
        .mintPresale(1, category, merkleProof.data)
        .send({
          from: acc,
          gas: 3000000,
          gasPrice: gasPriceValue,
        });

      if (mintResult.status) {
        setLoading(false);
        history.push('/inventory');
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      setErrorAlert({
        show: true,
        message: 'Transaction Rejected'
      });
    }
  };

  const mintFunction = async (acc: string) => {
    await ethEnabled();
    const contractInst = new web3.eth.Contract(nftabi as AbiItem[], contractAddresses.nft);
    const gasPriceValue = await web3.eth.getGasPrice();
  console.log('Gas price value is ', gasPriceValue);
  try {
      const mintResult = await contractInst.methods.mintNFT(1, category).send({
        from: acc,
        gas: 3000000,
        gasPrice: gasPriceValue,
      });

      if (mintResult.status) {
        setLoading(false);
        history.push('/inventory');
      }
    } catch (error) {
      setLoading(false);
      setErrorAlert({
        show: true,
        message: 'Transaction Rejected'
      });
    }
  };

  const getButtonWording = () => {
    if (isSoldOut) return 'SOLD OUT';

    if (isSaleActive) {
      return 'Purchase';
    }

    if (isPresaleActive) {
      return 'Presale Purchase';
    }

    return 'Sale is not active now';
  };

  const getButtonDisabled = () => {
    if (isSoldOut) return true;

    if (isSaleActive) {
      return false;
    }

    if (isPresaleActive) {
      return false;
    }

    return true;
  };

  const presaleMint = async () => {
    const isEnabled = await ethEnabled();
    await window.ethereum.enable();
    const currentAccount = await web3.eth.getAccounts();
    console.log('Curr Acc ', currentAccount);
    console.log('isEnabled ', isEnabled);
    const sessionInfo = cookies.get('user');
    const registeredWallet = sessionInfo.wallet;
    setLoading(true);

    if (!isEnabled) {
      setLoading(false);
      setErrorAlert({
        show: true,
        message: 'Metamask is not enabled?'
      });
      return;
    }

    const currentChainId = await web3.eth.getChainId();
    console.log('currentchain Id is ', currentChainId);

    if (currentChainId !== ChainID.Rinkeby) {
      setLoading(false);
      setErrorAlert({
        show: true,
        message: 'Metamask is on the wrong network!'
      });
      return;
    }

    const balance: number = await getAmount({
      web3Instance: web3,
      tokenAddress: contractAddresses.fynToken,
      account: currentAccount[0]
    });
    const contractInst = new web3.eth.Contract(nftabi as AbiItem[], contractAddresses.nft);
    const amountOfMints = await contractInst.methods
      .getCurrentPurchaseLimit(registeredWallet)
      .call();

    const presaleLimit = Number(await contractInst.methods.PRESALE_CATEGORY_LIMIT().call());
    const categoryLimit = Number(await contractInst.methods.CATEGORY_LIMIT().call());
    const hasPresaleAmount = categoryLimit - Number(nft1) < presaleLimit;

    console.log('Presale Limit ', presaleLimit);
    console.log('Category Limit ', categoryLimit);
    console.log('Has Presale Amount ', hasPresaleAmount);
    console.log('Mints Left ', amountOfMints);
    console.log('Fyn Balance ', balance);
    console.log('Fyn Price ', fynPrice);
    console.log('Has Enough Balance ', Number(balance) >= Number(fynPrice));

    if (amountOfMints <= 0) {
      setLoading(false);
      setErrorAlert({
        show: true,
        message: 'Account has reached mint limit for current sale'
      });
      return;
    }

    if (Number(balance) < Number(fynPrice)) {
      setLoading(false);
      setErrorAlert({
        show: true,
        message: 'Wallet does not have enough FYN tokens!'
      });
      return;
    }

    console.log(
      'Does Registered wallet match current wallet ',
      String(registeredWallet).toLowerCase() === String(currentAccount[0]).toLowerCase()
    );

    if (String(registeredWallet).toLowerCase() !== String(currentAccount[0]).toLowerCase()) {
      setLoading(false);
      setErrorAlert({
        show: true,
        message:
          'Your current wallet does not match. Please change your current wallet to the registered wallet.'
      });
      return;
    }
    const fynContract = new web3.eth.Contract(attABI as AbiItem[], contractAddresses.fynToken);
    const allowanceValue = await fynContract.methods
      .allowance(currentAccount[0], contractAddresses.nft)
      .call();

    const haveAllowance = Number(allowanceValue) >= Number(fynPrice);
    console.log('Does user has enough allowance ', haveAllowance);

    if (!haveAllowance) {
      const approveResult = await allowanceFunction(currentAccount[0]);
      if (!approveResult.status) {
        setLoading(false);
        setErrorAlert({
          show: true,
          message: 'Unable to increase allowance for NFT contract'
        });
        return;
      }
    }
    premintFunction(currentAccount[0], whitelistInfo);
  };

  const mintNFT = async () => {
    const isEnabled = await ethEnabled();
    await window.ethereum.enable();
    const currentAccount = await web3.eth.getAccounts();
    console.log('Curr Acc ', currentAccount);
    console.log('isEnabled ', isEnabled);
    const sessionInfo = cookies.get('user');
    const registeredWallet = sessionInfo.wallet;
    setLoading(true);
    if (isEnabled) {
      const currentChainId = await web3.eth.getChainId();
      console.log('currentchain Id is ', currentChainId);
      if (currentChainId === ChainID.Rinkeby) {
        console.log('Correct Network');
        const balance: number = await getAmount({
          web3Instance: web3,
          tokenAddress: contractAddresses.fynToken,
          account: currentAccount[0]
        });
        const contractInst = new web3.eth.Contract(nftabi as AbiItem[], contractAddresses.nft);
        const amountOfMints = await contractInst.methods
          .getCurrentPurchaseLimit(registeredWallet)
          .call();

        console.log('Mints Left ', amountOfMints);
        console.log('Fyn Balance ', balance);
        console.log('Fyn Price ', fynPrice);
        console.log('Has Enough Balance ', Number(balance) >= Number(fynPrice));

        if (amountOfMints <= 0) {
          setLoading(false);
          setErrorAlert({
            show: true,
            message: 'Account has reached mint limit for current sale'
          });
        } else {
          if (Number(balance) >= Number(fynPrice)) {
            try {
              console.log(
                'Does Registered wallet match current wallet ',
                String(registeredWallet).toLowerCase() === String(currentAccount[0]).toLowerCase()
              );
              if (
                String(registeredWallet).toLowerCase() === String(currentAccount[0]).toLowerCase()
              ) {
                web3 = new Web3(new Web3.providers.HttpProvider(contractAddresses.infura));
                const contractInst = new web3.eth.Contract(
                  attABI as AbiItem[],
                  contractAddresses.fynToken
                );
                const allowanceValue = await contractInst.methods
                  .allowance(currentAccount[0], contractAddresses.nft)
                  .call();

                console.log(
                  'Does user has enough allowance ',
                  Number(allowanceValue) >= Number(fynPrice)
                );
                if (Number(allowanceValue) <= Number(fynPrice)) {
                  const approveResult = await allowanceFunction(currentAccount[0]);
                  if (approveResult.status) {
                    mintFunction(currentAccount[0]);
                  } else {
                    setLoading(false);
                    setErrorAlert({
                      show: true,
                      message: 'You do not have enough FYN tokens in your account.'
                    });
                  }
                } else if (Number(allowanceValue) > Number(fynPrice)) {
                  mintFunction(currentAccount[0]);
                }
              } else {
                setLoading(false);
                setErrorAlert({
                  show: true,
                  message:
                    'Your current wallet does not match. Please change your current wallet to the registered wallet.'
                });
              }
            } catch (err) {
              setLoading(false);
            }
          } else if (Number(balance) < Number(fynPrice)) {
            setLoading(false);
            setErrorAlert({
              show: true,
              message: 'You do not have enough FYN tokens in your wallet.'
            });
          }
        }
      } else {
        setLoading(false);
        setErrorAlert({
          show: true,
          message: 'Please use correct Metamask Network.'
        });
      }
    } else {
      setLoading(false);
    }
  };

  const enableLoading = () => {
    setLoading(true);
  };

  const handleAgreeContract = () => {
    setShowContractModal(false);
    return isPresaleActive ? (isSaleActive ? mintNFT() : presaleMint()) : mintNFT();
  };

  React.useEffect(() => {
    //Check if wallet address exist in cookie
    GetEggsInfo();

    const sessionInfo = cookies.get('user');
    const hasWallet = sessionInfo.wallet === 'none' ? false : true;
    let walletAdd = '';
    setWallet(hasWallet);
    if (hasWallet) {
      walletAdd = sessionInfo.wallet;
    }
    const getSaleStatus = async () => {
      web3 = new Web3(new Web3.providers.HttpProvider(contractAddresses.infura));
      const contractInstance = new web3.eth.Contract(nftabi as AbiItem[], contractAddresses.nft);

      if (walletAdd === '') {
        setLoading(false);
        setErrorAlert({
          show: true,
          message: 'Please bind your wallet first!'
        });
        return;
      }
      const isWhitelist = await isWhitelisted(walletAdd);
      console.log('whitelist response ', isWhitelist);
      if (isWhitelist !== undefined && isWhitelist.status === 200) {
        const preSale = await contractInstance.methods.presaleLive().call();
        setIsPresaleActive(preSale * 1000 <= Date.now());
        console.log(isWhitelist);
        setWhitelistInfo(isWhitelist);
        console.log('Presale Active');
      }
      const saleStatus = await contractInstance.methods.saleLive().call();
      setIsSaleActive(saleStatus * 1000 <= Date.now());
      console.log('Sale Active');
    };
    getSaleStatus();
  }, []);

  const renderSection1 = () => {
    return (
      <div className="divide-y divide-neutral-100 dark:divide-neutral-800">
        {/* ---------- 1 ----------  */}
        <div className="pb-4 space-y-5">
          <div className="flex justify-between items-center">
            <Badge name="NEXUS World" color="green" />
            <LikeSaveBtns />
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold">{nftName}</h2>

          {/* ---------- 4 ----------  */}
          <div className="flex space-x-5 sm:space-x-8 text-sm">
            <div className="flex items-center ">
              <Avatar sizeClass="h-9 w-9" radius="rounded-full" />
              <span className="ml-2.5 text-neutral-500 dark:text-neutral-400 flex flex-col">
                <span className="text-sm">From</span>
                <span className="text-neutral-900 dark:text-neutral-200 font-medium flex items-center">
                  <span>{personNames[1]}</span>
                </span>
              </span>
            </div>
            <div className="h-auto border-l border-neutral-200 dark:border-neutral-700"></div>
            <div className="flex items-center">
              <Avatar imgUrl={collectionPng} sizeClass="h-9 w-9" radius="rounded-full" />
              <span className="ml-2.5 text-neutral-500 dark:text-neutral-400 flex flex-col">
                <span className="text-sm">Collection</span>
                <span className="text-neutral-900 dark:text-neutral-200 font-medium flex items-center">
                  <span>{'Generation Zero'}</span>
                </span>
              </span>
            </div>
          </div>
        </div>

        {/* ---------- 6 ----------  */}
        <div className="py-4">
          <TimeCountDown />
        </div>

        {/* ---------- 7 ----------  */}
        {/* PRICE */}
        <div className="pb-9 pt-10">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between">
            <div className="flex-1 flex flex-col sm:flex-row items-baseline p-4 border-2 border-green-500 rounded-xl relative">
              <span className="absolute bottom-full translate-y-1 py-1 px-1.5 bg-white dark:bg-neutral-900 text-sm text-neutral-500 dark:text-neutral-400">
                Current Price
              </span>
              <span className="text-xl xl:text-xl font-semibold text-green-500">
                {parseInt(web3.utils.fromWei(fynPrice, 'ether')).toLocaleString()} FYN
              </span>
              <span className="absolute right-10 top-3 sm:top-5 text-sm text-neutral-500 dark:text-neutral-400 ml-5 mt-2 sm:mt-0 sm:ml-10">
                [{nft1} in stock]
              </span>
            </div>
          </div>
          <div className="container mt-11 nft-detail-alert-container">
            <AlertWrapper
              show={errorAlert && errorAlert.show}
              errorType="error"
              message={errorAlert.message}></AlertWrapper>
          </div>
          <div className="mt-8 flex flex-col sm:flex-row ">
            <ButtonPrimary
              href={wallet ? '' : '/connect-wallet'}
              className="flex-1"
              disabled={getButtonDisabled()}
              onClick={() => setShowContractModal(true)}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M18.04 13.55C17.62 13.96 17.38 14.55 17.44 15.18C17.53 16.26 18.52 17.05 19.6 17.05H21.5V18.24C21.5 20.31 19.81 22 17.74 22H6.26C4.19 22 2.5 20.31 2.5 18.24V11.51C2.5 9.44001 4.19 7.75 6.26 7.75H17.74C19.81 7.75 21.5 9.44001 21.5 11.51V12.95H19.48C18.92 12.95 18.41 13.17 18.04 13.55Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M2.5 12.4101V7.8401C2.5 6.6501 3.23 5.59006 4.34 5.17006L12.28 2.17006C13.52 1.70006 14.85 2.62009 14.85 3.95009V7.75008"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M22.5588 13.9702V16.0302C22.5588 16.5802 22.1188 17.0302 21.5588 17.0502H19.5988C18.5188 17.0502 17.5288 16.2602 17.4388 15.1802C17.3788 14.5502 17.6188 13.9602 18.0388 13.5502C18.4088 13.1702 18.9188 12.9502 19.4788 12.9502H21.5588C22.1188 12.9702 22.5588 13.4202 22.5588 13.9702Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M7 12H14"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              <span className="ml-2.5">{getButtonWording()}</span>
            </ButtonPrimary>
            <LoadSpinner open={isLoading}></LoadSpinner>
          </div>
          <a href="https://opensea.io/collection/nexus-world-gen-zero-buddies" target="_blank" rel="noreferrer">
            <ButtonSecondary className="flex-1 mt-5 !h-15 w-full">
              <SwitchIcon />
            </ButtonSecondary>
          </a>
        </div>
        <div className="mb-20">
          <AccordionInfo category={category} />
        </div>
      </div>
    );
  };

  return (
    <div className={`nc-NftDetailPage  ${className}`} data-nc-id="NftDetailPage">
      {/* MAIn */}
      <ModalTermsAndCondition
        show={showContractModal}
        onAgreeConfirm={() => handleAgreeContract()}
        onClose={() => setShowContractModal(false)}></ModalTermsAndCondition>

      <main className="container mt-11 flex ">
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-14">
          {/* CONTENT */}
          <div className="space-y-8 lg:space-y-10">
            {/* HEADING */}
            <div className="relative bg-gradient-to-r from-[#FFF9EB] to-[#FAE4AD] rounded-3xl h-fit">
              <NcImage
                src={nftsLargeImgs[category - 1]}
                containerClassName="mt-12 overflow-hidden w-full "
                className="flex-shrink-0 w-full"
              />
            </div>
          </div>

          {/* SIDEBAR */}
          <div className="pt-10 lg:pt-0 xl:pl-10 border-t-2 border-neutral-200 dark:border-neutral-700 lg:border-t-0">
            {renderSection1()}
          </div>
        </div>
      </main>
    </div>
  );
};

export default NftDetailPage;
