// HIDDEN
// .env
require("dotenv").config()

const { ChainId } = require('@uniswap/sdk');

// Chain names to use in .env: e.g. CHAIN_NAME=ETHEREUM_MAINNET
const CHAIN_ETHEREUM_MAINNET = "ETHEREUM_MAINNET"
const CHAIN_ETHEREUM_TESTNET_SEPOLIA = "ETHEREUM_TESTNET_SEPOLIA"
const CHAIN_ETHEREUM_TESTNET_GOERLI = "ETHEREUM_TESTNET_GOERLI"
const CHAIN_POLYGON_TESTNET_POLYGON_MUMBAI = "POLYGON_TESTNET_MUMBAI"

const CHAINID_ETH_MAINNET = ChainId.MAINNET;
const CHAINID_ETH_TEST_GOERLI = ChainId.GÖRLI;
const CHAINID_ETH_TEST_SEPOLIA = 11155111; // 11155111(0xaa36a7)
const CHAINID_POLYGON_TEST_MUMBAI = 80001; // 80001(0x13881)


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

const getChainName = () => {
  return process.env.CHAIN_NAME
}


const getChainId = (chainName) => {
  switch (chainName) {
    case CHAIN_ETHEREUM_MAINNET:
      return CHAINID_ETH_MAINNET
    case CHAIN_ETHEREUM_TESTNET_SEPOLIA:
      return CHAINID_ETH_TEST_SEPOLIA
    case CHAIN_ETHEREUM_TESTNET_GOERLI:
      return CHAINID_ETH_TEST_GOERLI
    case CHAIN_POLYGON_TESTNET_POLYGON_MUMBAI:
      return CHAINID_POLYGON_TEST_MUMBAI
    default:
      return -1
  }
}

const getRpcUrl = (chainId) => {
  switch (chainId) {
    case CHAINID_ETH_MAINNET:
      return process.env.RPC_ETHEREUM_MAINNET
    case CHAINID_ETH_TEST_SEPOLIA:
      return process.env.RPC_ETHEREUM_TESTNET_SEPOLIA
    case CHAINID_ETH_TEST_GOERLI:
      return process.env.RPC_ETHEREUM_TESTNET_GOERLI
    case CHAINID_POLYGON_TEST_MUMBAI:
      return process.env.RPC_POLYGON_TESTNET_POLYGON_MUMBAI
    default:
      return ""
  }
}

const getDaiTokenAddress = (chainId) => {
  switch (chainId) {
    case CHAINID_ETH_MAINNET:
      return daitokenAddress_MAINNET
    case CHAINID_ETH_TEST_SEPOLIA:
      return daitokenAddress_ETH_TEST_SEPOLIA
    case CHAINID_ETH_TEST_GOERLI:
      return daitokenAddress_ETH_TEST_GOERLI
    case CHAINID_POLYGON_TEST_MUMBAI:
      return daitokenAddress_POLYGON_TEST_MUMBAI
    default:
      return -1
  }
}

const getWethToken = (chainId) => {
  switch (chainId) {
    case CHAINID_ETH_MAINNET:
      return UniswapWETH[CHAINID_ETH_MAINNET];
    case CHAINID_ETH_TEST_SEPOLIA:
      return wethtoken_ETH_TEST_SEPOLIA
    case CHAINID_ETH_TEST_GOERLI:
      return UniswapWETH[CHAINID_ETH_TEST_GOERLI];
    case CHAINID_POLYGON_TEST_MUMBAI:
      return wethtoken_POLYGON_TEST_MUMBAI
    default:
      return null
  }
}


exports.getChainName = getChainName
exports.getChainId = getChainId
exports.getRpcUrl = getRpcUrl
exports.getDaiTokenAddress = getDaiTokenAddress
exports.getWethToken = getWethToken