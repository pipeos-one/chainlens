export const getWeb3 = async () => {
    let web3Instance;
    if (window.ethereum) {
        // eslint-disable-next-line
        web3Instance = new Web3(ethereum);
        try {
            // eslint-disable-next-line
            await ethereum.enable();
        } catch (error) {
            console.log('User rejected dApp connection');
        }
    }

    if (!web3Instance && window.web3) {
        // eslint-disable-next-line
        web3Instance = new Web3(web3.currentProvider);
    }

    if (!web3Instance) {
        console.log('Non-Ethereum browser detected. Consider trying MetaMask!');
        return null;
    }
    return web3Instance;
};

export const CHAIN_NAMES = {
  1: 'mainnet',
  3: 'ropsten',
  4: 'rinkeby',
  5: 'goerli',
  42: 'kovan',
}

export const getEtherscanApi = (chainid) => {
  let chainname = CHAIN_NAMES[chainid];
  if (chainid === 1) chainname = '';
  else chainname += '.';
  return `https://${chainname}etherscan.io`;
}

export const getEtherscanApiContract = (chainid, address) => {
  return `${getEtherscanApi(chainid)}/address/${address}#code`;
}

export const getEtherscanTx = (chainid, txhash) => {
  return `${getEtherscanApi(chainid)}/tx/${txhash}`;
}

