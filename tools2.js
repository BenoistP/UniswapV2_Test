// HIDDEN
// .env
require("dotenv").config()

const { Pair,
  } =  require('@uniswap/v2-sdk'); 
const { // ChainId: UniswapChainId, Token: UniswapToken
  ChainId, Token: UniswapToken
  } = require('@uniswap/sdk-core'); 

  // Chain name to put .env: e.g. CHAIN_NAME=ETHEREUM_TESTNET_SEPOLIA
const CHAIN_ETHEREUM_MAINNET = "ETHEREUM_MAINNET"
const CHAIN_ETHEREUM_TESTNET_SEPOLIA = "ETHEREUM_TESTNET_SEPOLIA"
const CHAIN_ETHEREUM_TESTNET_GOERLI = "ETHEREUM_TESTNET_GOERLI"
const CHAIN_POLYGON_TESTNET_POLYGON_MUMBAI =  "POLYGON_TESTNET_MUMBAI"

const CHAINID_ETH_MAINNET = ChainId.MAINNET; // 1(0x1)
const CHAINID_ETH_TEST_GOERLI = ChainId.GÖRLI; // 5(0x5)
const CHAINID_ETH_TEST_SEPOLIA = ChainId.SEPOLIA; // 11155111(0xaa36a7)
const CHAINID_POLYGON_TEST_MUMBAI = ChainId.POLYGON_MUMBAI; // 80001(0x13881)

// Dai token addresses
const daitokenAddress_MAINNET = '0x6B175474E89094C44Da98b954EedeAC495271d0F'; // DAI address mainnet
const daitokenAddress_ETH_TEST_SEPOLIA = '0x3e622317f8C93f7328350cF0B56d9eD4C620C5d6'; // DAI address sepolia
const daitokenAddress_ETH_TEST_GOERLI = '0x11fE4B6AE13d2a6055C8D9cF65c55bac32B5d844'; // DAI address goerli
const daitokenAddress_POLYGON_TEST_MUMBAI = '0x001B3B4d0F3714Ca98ba10F6042DaEbF0B1B7b6F'; // DAI address mumbai


// Weth token addresses
// https://github.com/Uniswap/default-token-list/tree/main/src/tokens
// const wethtokenAddress_MAINNET = WETH[CHAINID_ETH_MAINNET]
const wethtokenAddress_ETH_TEST_SEPOLIA = "0x7b79995e5f793A07Bc00c21412e50Ecae098E7f9"
// const wethtokenAddress_ETH_TEST_GOERLI = WETH[CHAINID_ETH_TEST_GOERLI];
const wethtokenAddress_POLYGON_TEST_MUMBAI = "0xA6FA4fB5f76172d178d61B04b0ecd319C5d1C0aa"


// constructor(chainId: ChainId, address: string, decimals: number, symbol?: string, name?: string);
/*
const wethtoken_ETH_TEST_SEPOLIA = new UniswapToken(
{
  "name": "Wrapped Ether",
  "address": "0xfFf9976782d46CC05630D1f6eBAb18b2324d6B14",
  "symbol": "WETH",
  "decimals": 18,
  "chainId": 11155111,
  "logoURI": "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2/logo.png"
  }
);


const wethtoken_ETH_TEST_GOERLI = new UniswapToken(
  {
  "name": "Wrapped Ether",
  "address": "0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6",
  "symbol": "WETH",
  "decimals": 18,
  "chainId": 5,
  "logoURI": "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6/logo.png"
  }
);

const wethtoken_ETH_MAINNET = new UniswapToken(
  {
    "name": "Wrapped Ether",
    "address": "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
    "symbol": "WETH",
    "decimals": 18,
    "chainId": 1,
    "logoURI": "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2/logo.png",
    "extensions": {
      "bridgeInfo": {
        "10": {
          "tokenAddress": "0x4200000000000000000000000000000000000006"
        },
        "137": {
          "tokenAddress": "0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619"
        },
        "42161": {
          "tokenAddress": "0x82aF49447D8a07e3bd95BD0d56f35241523fBab1"
        },
        "42220": {
          "tokenAddress": "0x2DEf4285787d58a2f811AF24755A8150622f4361"
        }
      }
    }
  }
);

*/
const wethtoken_ETH_MAINNET = new UniswapToken(
  ChainId.MAINNET, "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2", 18, "WETH", "Wrapped Ether"
);

const daitoken_ETH_MAINNET = new UniswapToken(
  ChainId.MAINNET, daitokenAddress_MAINNET, 18, "DAI", "dai"
);

const getWethToken = (chainName) => {
  switch (chainName) {
    case CHAIN_ETHEREUM_MAINNET:
      return wethtoken_ETH_MAINNET;
    // case CHAIN_ETHEREUM_TESTNET_SEPOLIA:
    //   return wethtoken_ETH_TEST_SEPOLIA
    // case CHAIN_ETHEREUM_TESTNET_GOERLI:
    //   return UniswapWETH[CHAINID_ETH_TEST_GOERLI];
    // case CHAIN_POLYGON_TESTNET_POLYGON_MUMBAI:
    //   return wethtoken_POLYGON_TEST_MUMBAI
    default:
      return null
  }
}

const getDaiToken = (chainName) => {
  switch (chainName) {
    case CHAIN_ETHEREUM_MAINNET:
      return daitoken_ETH_MAINNET;
    // case CHAIN_ETHEREUM_TESTNET_SEPOLIA:
    //   return wethtoken_ETH_TEST_SEPOLIA
    // case CHAIN_ETHEREUM_TESTNET_GOERLI:
    //   return UniswapWETH[CHAINID_ETH_TEST_GOERLI];
    // case CHAIN_POLYGON_TESTNET_POLYGON_MUMBAI:
    //   return wethtoken_POLYGON_TEST_MUMBAI
    default:
      return null
  }
}

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


exports.getChainName = getChainName
exports.getChainId = getChainId
exports.getDaiTokenAddress = getDaiTokenAddress
exports.getWethToken = getWethToken
exports.getDaiToken = getDaiToken
exports.getPair = getPair

// exports.wethtoken_ETH_TEST_SEPOLIA = wethtoken_ETH_TEST_SEPOLIA
// exports.wethtoken_ETH_TEST_GOERLI = wethtoken_ETH_TEST_GOERLI
// exports.wethtoken_ETH_MAINNET = wethtoken_ETH_MAINNET