// HIDDEN
// .env
require("dotenv").config()

// const { ChainId: UniswapChainId, Token: UniswapToken, WETH: UniswapWETH } = require('@uniswap/sdk');

/*
const { Pair,
  // WETH: UniswapWETH
  } =  require('@uniswap/v2-sdk'); 
*/
const { ChainId: UniswapChainId, Token: UniswapToken
  //, WETH: UniswapWETH
  } = require('@uniswap/sdk-core'); 

const CHAINID_ETH_MAINNET = UniswapChainId.MAINNET; // 1(0x1)
const CHAINID_ETH_TEST_GOERLI = UniswapChainId.GÖRLI; // 5(0x5)
const CHAINID_ETH_TEST_SEPOLIA = UniswapChainId.SEPOLIA; // 11155111(0xaa36a7)
const CHAINID_POLYGON_TEST_MUMBAI = UniswapChainId.POLYGON_MUMBAI; // 80001(0x13881)

// Dai token addresses
const daitokenAddress_MAINNET = '0x6B175474E89094C44Da98b954EedeAC495271d0F'; // DAI address mainnet
const daitokenAddress_ETH_TEST_SEPOLIA = '0x3e622317f8C93f7328350cF0B56d9eD4C620C5d6'; // DAI address sepolia
const daitokenAddress_ETH_TEST_GOERLI = '0x11fE4B6AE13d2a6055C8D9cF65c55bac32B5d844'; // DAI address goerli
const daitokenAddress_POLYGON_TEST_MUMBAI = '0x001B3B4d0F3714Ca98ba10F6042DaEbF0B1B7b6F'; // DAI address mumbai

// Weth token addresses
// const wethtokenAddress_MAINNET = WETH[CHAINID_ETH_MAINNET]
const wethtokenAddress_ETH_TEST_SEPOLIA = "0x7b79995e5f793A07Bc00c21412e50Ecae098E7f9"
// const wethtokenAddress_ETH_TEST_GOERLI = WETH[CHAINID_ETH_TEST_GOERLI];
const wethtokenAddress_POLYGON_TEST_MUMBAI = "0xA6FA4fB5f76172d178d61B04b0ecd319C5d1C0aa"

// constructor(chainId: ChainId, address: string, decimals: number, symbol?: string, name?: string);
const wethtoken_ETH_TEST_SEPOLIA = new UniswapToken(
  UniswapChainId.RINKEBY,
  wethtokenAddress_ETH_TEST_SEPOLIA,
  18
);

const wethtoken_POLYGON_TEST_MUMBAI = new UniswapToken(
  CHAINID_POLYGON_TEST_MUMBAI,
  wethtokenAddress_POLYGON_TEST_MUMBAI,
  18
);


// Chain names defined in .env
const CHAIN_ETHEREUM_MAINNET = "ETHEREUM_MAINNET"
const CHAIN_ETHEREUM_TESTNET_SEPOLIA = "ETHEREUM_TESTNET_SEPOLIA"
const CHAIN_ETHEREUM_TESTNET_GOERLI = "ETHEREUM_TESTNET_GOERLI"
const CHAIN_POLYGON_TESTNET_POLYGON_MUMBAI =  "POLYGON_TESTNET_MUMBAI"


const getChainName = () => {
  return process.env.CHAIN_NAME
}


const getChainId = (chainName) => {
  switch (chainName) {
    case CHAIN_ETHEREUM_MAINNET:
      return CHAINID_ETH_MAINNET;
    case CHAIN_ETHEREUM_TESTNET_SEPOLIA:
      return CHAINID_ETH_TEST_SEPOLIA;
    case CHAIN_ETHEREUM_TESTNET_GOERLI:
      return CHAINID_ETH_TEST_GOERLI;
    case CHAIN_POLYGON_TESTNET_POLYGON_MUMBAI:
      return CHAINID_POLYGON_TEST_MUMBAI
    default:
      return -1
  }
}

const getRpcUrl = (chainName) => {
  switch (chainName) {
    case CHAIN_ETHEREUM_MAINNET:
      return process.env.RPC_ETHEREUM_MAINNET
    case CHAIN_ETHEREUM_TESTNET_SEPOLIA:
      return process.env.RPC_ETHEREUM_TESTNET_SEPOLIA
    case CHAIN_ETHEREUM_TESTNET_GOERLI:
      return process.env.RPC_ETHEREUM_TESTNET_GOERLI
    case CHAIN_POLYGON_TESTNET_POLYGON_MUMBAI:
      return process.env.RPC_POLYGON_TESTNET_POLYGON_MUMBAI
    default:
      return null
  }
}

const getDaiTokenAddress = (chainName) => {
  switch (chainName) {
    case CHAIN_ETHEREUM_MAINNET:
      return daitokenAddress_MAINNET
    case CHAIN_ETHEREUM_TESTNET_SEPOLIA:
      return daitokenAddress_ETH_TEST_SEPOLIA
    case CHAIN_ETHEREUM_TESTNET_GOERLI:
      return daitokenAddress_ETH_TEST_GOERLI
    case CHAIN_POLYGON_TESTNET_POLYGON_MUMBAI:
      return daitokenAddress_POLYGON_TEST_MUMBAI
    default:
      return null
  }
}

// const getWethTokenAddress = (chainName) => {
//   switch (chainName) {
//     case CHAIN_ETHEREUM_MAINNET:
//       return wethtokenAddress_MAINNET;
//     case CHAIN_ETHEREUM_TESTNET_SEPOLIA:
//       return wethtokenAddress_ETH_TEST_SEPOLIA
//     case CHAIN_ETHEREUM_TESTNET_GOERLI:
//       return wethtokenAddress_ETH_TEST_GOERLI;
//     case CHAIN_POLYGON_TESTNET_POLYGON_MUMBAI:
//       return wethtokenAddress_POLYGON_TEST_MUMBAI
//     default:
//       return null
//   }
// }

const getWethToken = (chainName) => {
  switch (chainName) {
    case CHAIN_ETHEREUM_MAINNET:
      return UniswapWETH[CHAINID_ETH_MAINNET];
    case CHAIN_ETHEREUM_TESTNET_SEPOLIA:
      return wethtoken_ETH_TEST_SEPOLIA
    case CHAIN_ETHEREUM_TESTNET_GOERLI:
      return UniswapWETH[CHAINID_ETH_TEST_GOERLI];
    case CHAIN_POLYGON_TESTNET_POLYGON_MUMBAI:
      return wethtoken_POLYGON_TEST_MUMBAI
    default:
      return null
  }
}

const getChainProvider = () => {
  return (new ethers.providers.JsonRpcProvider(process.env.RPC));
}

/*
// const getPair = async (tokenA: Token, tokenB: Token) => {
const getPair = async (tokenA, tokenB) => {
    const pairAddress = Pair.getAddress(tokenA, tokenB)
  const contract = new ethers.Contract(pairAddress, [
      'function getReserves() external view returns (uint112 reserve0, uint112 reserve1, uint32 blockTimestampLast)',
      'function token0() external view returns (address)',
      'function token1() external view returns (address)'
  ], getChainProvider());
  const reserves = await contract.getReserves()
  const token0Address = await contract.token0()
  const token1Address = await contract.token1()
  const token0 = [tokenA, tokenB].find(token => token.address === token0Address)
  const token1 = [tokenA, tokenB].find(token => token.address === token1Address)
  const pair = new Pair(
      CurrencyAmount.fromRawAmount(token0, reserves.reserve0.toString()),
      CurrencyAmount.fromRawAmount(token1, reserves.reserve1.toString())
  )
  return pair;
}
*/

exports.getChainName = getChainName
exports.getChainId = getChainId
exports.getRpcUrl = getRpcUrl
exports.getDaiTokenAddress = getDaiTokenAddress
// exports.getWethTokenAddress = getWethTokenAddress
exports.getWethToken = getWethToken
exports.getChainProvider = getChainProvider
