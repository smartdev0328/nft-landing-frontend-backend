const contractAddresses = {
  fynToken: '0xea8698070B9Fd8C3Ed2644b8B241A3Ff58D43557',
  nft: '0xA4FD84A90F1a795A3560bdd3b8A9Aa1eA28B3fc2',
  infura: 'https://polygon-mainnet.g.alchemy.com/v2/yApBxkq8ZpCQWwf0bk4jbsuQe7PBRNj2'
};

const nftCategory = {
  Pigasus: 1,
  Nessie: 2,
  Floomph: 3,
  Gagamaru: 4
};

enum ChainID {
  Mainnet = 1,
  Rinkeby = 137,
  Polygon = 4,
  Mumbai = 80001
}

export { contractAddresses, nftCategory, ChainID };
