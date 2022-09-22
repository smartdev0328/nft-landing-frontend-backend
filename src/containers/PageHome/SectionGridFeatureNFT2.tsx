/* eslint-disable @typescript-eslint/no-empty-interface */
import React, { FC } from 'react';
import CardNFTNew from 'components/CardNFTNew';

import nftabi from 'contains/NFT_ABI';
import Web3 from 'web3';
import { useState } from 'react';
import { AbiItem } from 'web3-utils';
import { contractAddresses, nftCategory } from 'contains/addresses';
import Cookies from 'universal-cookie';
import { sessionStorageItems, userDataInfo } from 'contains/enum';
//
export interface SectionGridFeatureNFT2Props {}

declare let window: any;

const SectionGridFeatureNFT2: FC<SectionGridFeatureNFT2Props> = () => {
  const cookies = new Cookies();

  const [nft1, setNft1] = useState();
  const [nft2, setNft2] = useState();
  const [nft3, setNft3] = useState();
  const [nft4, setNft4] = useState();

  const [login, setLogin] = useState(false);

  const web3: Web3 = new Web3(new Web3.providers.HttpProvider(contractAddresses.infura));

  const GetEggsInfo = async () => {
    const contractInst = new web3.eth.Contract(nftabi as AbiItem[], contractAddresses.nft);
    setNft1(await contractInst.methods.getCategoryRemainingMints(nftCategory.Floomph).call());
    setNft2(await contractInst.methods.getCategoryRemainingMints(nftCategory.Nessie).call());
    setNft3(await contractInst.methods.getCategoryRemainingMints(nftCategory.Gagamaru).call());
    setNft4(await contractInst.methods.getCategoryRemainingMints(nftCategory.Pigasus).call());
  };

  React.useEffect(() => {
    const userInfo = cookies.get(sessionStorageItems.USER);
    if (userInfo) {
      GetEggsInfo();
      setLogin(true);
    } else {
      setLogin(false);
    }
  }, []);

  return (
    <div className="nc-SectionGridFeatureNFT2 relative">
      <div className="text-lg sm:text-6xl text-center my-10 mb-20 font-semibold">Guess which egg will hatch first?</div>
      <div className={`grid gap-6 lg:gap-8 sm:grid-cols-2 xl:grid-cols-4`}>
        <CardNFTNew
          value={login ? nft1 : undefined}
          cardName={'Floomph'}
          cardRedirect={'/Floomph'}
          cardImageIndex={nftCategory.Floomph}
          className={'bg-gradient-to-r from-[#FFF9EB] to-[#FAE4AD]'}
          login={login}
          imgUrl={'/assets/images/0Floomph.png'}
        />
        <CardNFTNew
          value={login ? nft2 : undefined}
          cardName={'Nessie'}
          cardRedirect={'/Nessie'}
          cardImageIndex={nftCategory.Nessie}
          className={'bg-gradient-to-r from-[#CBECEC] to-[#B2B2F8]'}
          login={login}
          imgUrl={'/assets/images/0NessieEgg.png'}
        />
        <CardNFTNew
          value={login ? nft3 : undefined}
          cardName={'Gagamaru'}
          cardRedirect={'/Gagamaru'}
          cardImageIndex={nftCategory.Floomph}
          className={'bg-gradient-to-r from-[#E9FFBF] to-[#B8D675]'}
          login={login}
          imgUrl={'/assets/images/0Gagamaru.png'}
        />
        <CardNFTNew
          value={login ? nft4 : undefined}
          cardName={'Pigasus'}
          cardRedirect={'/Pigasus'}
          cardImageIndex={nftCategory.Nessie}
          className={'bg-gradient-to-r from-[#ECBFC7] to-[#F8AFBC]'}
          login={login}
          imgUrl={'/assets/images/0PigasusEgg.png'}
        />
      </div>
    </div>
  );
};

export default SectionGridFeatureNFT2;
