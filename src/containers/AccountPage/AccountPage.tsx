import Label from 'components/Label/Label';
import { FC } from 'react';
import ButtonPrimary from 'shared/Button/ButtonPrimary';
import Input from 'shared/Input/Input';
import { Helmet } from 'react-helmet';
import { sessionStorageItems, userDataInfo } from 'contains/enum';
import erc20abi from 'contains/ERC20_ABI';
import Web3 from 'web3';
import { useState } from 'react';
import { AbiItem } from 'web3-utils';
import Metamask from 'images/metamask.svg';
import Googlebadge from 'images/Google.svg';
import fbbadge from 'images/Facebook.svg';
import AccInfo from 'components/DashboardAccount';
import VerifyIcon from 'components/VerifyIcon';
import NcImage from 'shared/NcImage/NcImage';
import { ChainID, contractAddresses } from 'contains/addresses';
import Cookies from 'universal-cookie';

declare let window: any;

export interface AccountPageProps {
  className?: string;
}

export type TokenType = {
  token: string;
  balance: string;
};

export type AccountType = {
  address: string;
  balance: string;
  tokens: TokenType[];
};

const AccountPage: FC<AccountPageProps> = ({ className = '' }) => {
  const cookies = new Cookies();
  const userInfo = cookies.get(sessionStorageItems.USER);
  //const email = userInfo && JSON.parse(userInfo)[userDataInfo.EMAIL];
  const email = userInfo && userInfo[userDataInfo.EMAIL];
  const wallet = userInfo && userInfo[userDataInfo.WALLET];
  //const fyn = userInfo && JSON.parse(userInfo)[userDataInfo.TEMP_FYN];
  //const [wallet, setWallet] = useState('None');
  const [fyn, setFyn] = useState('0');
  //const [web3Enabled, setWeb3Enabled] = useState(false);

  //let web3: Web3 = new Web3();

  // const ethEnabled = async () => {
  //   if (typeof window.ethereum !== 'undefined') {
  //     // Instance web3 with the provided information from the MetaMask provider information
  //     web3 = new Web3(window.ethereum);
  //     try {
  //       // Request account access
  //       await window.ethereum.enable();
  //       //await window.ethereum.request('eth_requestAccounts');

  //       return true;
  //     } catch (e) {
  //       // User denied access
  //       return false;
  //     }
  //   }

  //   return false;
  // };

  const onClickConnect = async () => {
    if (wallet && wallet.toLowerCase() !== 'none') {
      const web3 = new Web3(new Web3.providers.HttpProvider(contractAddresses.infura));
      const tokenInst = new web3.eth.Contract(erc20abi as AbiItem[], contractAddresses.fynToken);
      const balance = await tokenInst.methods.balanceOf(wallet).call();
      setFyn(parseInt(web3.utils.fromWei(balance, 'ether')).toLocaleString());
    }
  };

  // const getWalletInfo = async () => {
  //   let web3: Web3 = new Web3();
  //   if (typeof window.ethereum !== 'undefined') {
  //     web3 = new Web3(window.ethereum);
  //     if (window.ethereum.networkVersion !== ChainID.Rinkeby) {
  //       try {
  //         await window.ethereum.request({
  //           method: 'wallet_switchEthereumChain',
  //           params: [{ chainId: web3.utils.toHex(ChainID.Rinkeby) }]
  //         });
  //       } catch (err) {
  //         if (err instanceof Error)
  //           if (err.code === 4902) {
  //             await window.ethereum.request({
  //               method: 'wallet_addEthereumChain',
  //               params: [
  //                 {
  //                   chainName: 'Polygon Mainnet',
  //                   chainId: web3.utils.toHex(ChainID.Polygon),
  //                   nativeCurrency: { name: 'MATIC', decimals: 18, symbol: 'MATIC' },
  //                   rpcUrls: ['https://polygon-rpc.com/']
  //                 }
  //               ]
  //             });
  //           }
  //       }
  //     }
  //   } else {
  //     alert('Please install Metamask!');
  //   }
  // };

  onClickConnect();

  return (
    <div className={`nc-AccountPage ${className}`} data-nc-id="AccountPage">
      <Helmet>
        <title>Affyn.com | Accounts</title>
      </Helmet>

      <div className="container">
        <div className="my-12 sm:lg:my-16 lg:my-24 max-w-4xl mx-auto space-y-8 sm:space-y-10">
          {/* HEADING */}

          <div className="max-w-2xl">
            <h2 className="text-3xl sm:text-4xl font-semibold">Account settings</h2>
            <span className="block mt-3 text-neutral-500 dark:text-neutral-400">
              You can find your account details here.
            </span>
          </div>
          <div className="w-full border-b-2 border-neutral-100 dark:border-neutral-700"></div>
          <div className="flex flex-col md:flex-row">
            <div className="flex-grow mt-10 md:mt-0 md:pl-16 space-y-5 sm:space-y-6 md:sm:space-y-7">
              {/* ---- */}

              {/* ---- */}
              <div>
                <Label>Email</Label>
                <div className="mt-1.5 flex">
                  <span className="inline-flex items-center px-2.5 rounded-l-2xl border border-r-0 border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 text-sm">
                    <i className="text-2xl las la-envelope"></i>
                  </span>
                  <Input
                    className="!rounded-l-none"
                    defaultValue={email && email}
                    placeholder="Enter your email here"
                  />
                </div>
              </div>
              {/* <div>
                <Label>Binded Account</Label>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-2.5">
                <div className="text-sm font-medium cursor-pointer">
                  <AccInfo
                    labelTextClassName="bg-white dark:bg-neutral-900 "
                    labelText="Provider"
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
              </div> */}

              {/* ---- */}
              <div>
                <Label>Wallet Address</Label>
                <div className="mt-1.5 relative text-neutral-700 dark:text-neutral-300">
                  <Input className="!pr-10 " disabled value={wallet && wallet} />
                  <span className="absolute right-2.5 cursor-pointer top-2 -translate-y-1/2 ">
                  {wallet === "none" ? <div></div> : <VerifyIcon/>}  
                  </span>
                </div>
              </div>
              {/* ---- */}
              <div>
                <Label>FYN Tokens</Label>
                <div className="mt-1.5 flex">
                  <span className="inline-flex items-center px-2.5 rounded-l-2xl border border-r-0 border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 text-sm">
                    <i className="text-2xl las">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="32.541"
                        height="28.928"
                        viewBox="0 0 32.541 28.928">
                        <g id="FYN-icon" transform="translate(-809 -242.387)">
                          <path
                            id="Path_4527"
                            data-name="Path 4527"
                            d="M706.453,5097.035l-13.518-20.705-16.047,28.928h32.541l-7.675-3.789H683.083l9.852-16.793,5.68,9.053-8.184,3.886Z"
                            transform="translate(132.112 -4833.943)"
                            fill="#ff4032"
                          />
                        </g>
                      </svg>
                    </i>
                  </span>
                  <Input
                    className="!rounded-l-none"
                    disabled
                    value={fyn && fyn}
                    placeholder="Your number of tokens"
                  />
                </div>
              </div>
              {/* ---- */}
              <div className="pt-2">
                {wallet && wallet.toLowerCase() !== 'none' ? null : (
                  <ButtonPrimary className="w-full" href="/connect-wallet">
                    Bind Wallet
                  </ButtonPrimary>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;
