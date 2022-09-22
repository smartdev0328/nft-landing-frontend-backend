import Web3 from 'web3';
import { AbiItem } from 'web3-utils';
// import NFTABI from 'contains/NFT_ABI';
import ATTABI from 'contains/ATTABI';

interface ApproveInstance {
  web3Instance: Web3;
  tokenAddress: string;
  amount: string | number;
  spender: string;
  sender: string;
}

interface GetBalanceInstance {
  web3Instance: Web3;
  tokenAddress: string;
  account: string;
}

const approveToken = async ({
  web3Instance,
  tokenAddress,
  amount,
  spender,
  sender
}: ApproveInstance) => {
  const contractInstance = new web3Instance.eth.Contract(ATTABI as AbiItem[], tokenAddress);
  const gasPriceValue = await web3Instance.eth.getGasPrice();
  console.log('Gas price value is ', gasPriceValue);
  const approveResult = await contractInstance.methods.approve(spender, amount).send({
    from: sender,
    gas: 3000000,
    gasPrice: gasPriceValue,
  });
  return approveResult;
};

const getAmount = async ({
  web3Instance,
  tokenAddress,
  account
}: GetBalanceInstance) => {
  const contractInstance = new web3Instance.eth.Contract(ATTABI as AbiItem[], tokenAddress);
  const balance = await contractInstance.methods.balanceOf(account).call();
  return balance;
}

export { 
  approveToken,
  getAmount
};
