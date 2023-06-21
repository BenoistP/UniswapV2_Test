// HIDDEN
// .env
require("dotenv").config()

const { /* ChainId, */ Fetcher, WETH, Route, Trade, TokenAmount, TradeType, Percent } = require('@uniswap/sdk');
const ethers = require('ethers');

const { getChainName,getChainId,getRpcUrl,getDaiTokenAddress } = require('./tools.js');



/*
const CHAINID_ETH_MAINNET = ChainId.MAINNET;
const CHAINID_ETH_TEST_GOERLI = ChainId.GÖRLI;
const CHAINID_ETH_TEST_SEPOLIA = 11155111; // 11155111(0xaa36a7)
const CHAINID_POLYGON_TEST_MUMBAI = 80001; // 80001(0x13881)


const daitokenAddress_MAINNET = '0x6B175474E89094C44Da98b954EedeAC495271d0F'; // DAI address mainnet
const daitokenAddress_ETH_TEST_SEPOLIA = '0x3e622317f8C93f7328350cF0B56d9eD4C620C5d6'; // DAI address sepolia
const daitokenAddress_ETH_TEST_GOERLI = '0x11fE4B6AE13d2a6055C8D9cF65c55bac32B5d844'; // DAI address goerli
const daitokenAddress_POLYGON_TEST_MUMBAI = '0x001B3B4d0F3714Ca98ba10F6042DaEbF0B1B7b6F'; // DAI address mumbai

const CHAIN_ETHEREUM_MAINNET = "ETHEREUM_MAINNET"
const CHAIN_ETHEREUM_TESTNET_SEPOLIA = "ETHEREUM_TESTNET_SEPOLIA"
const CHAIN_ETHEREUM_TESTNET_GOERLI = "ETHEREUM_TESTNET_GOERLI"
const CHAIN_POLYGON_TESTNET_POLYGON_MUMBAI = "POLYGON_TESTNET_MUMBAI"
*/
/* 
const CHAIN_NAME = process.env.CHAIN_NAME
console.debug(`CHAIN_NAME = "${CHAIN_NAME}"`)

const CHAIN_ETHEREUM_MAINNET_RPC = process.env.RPC_ETHEREUM_MAINNET
console.debug(`CHAIN_ETHEREUM_MAINNET_RPC = "${CHAIN_ETHEREUM_MAINNET_RPC}"`)
const CHAIN_ETHEREUM_TESTNET_SEPOLIA_RPC = process.env.RPC_ETHEREUM_TESTNET_SEPOLIA
console.debug(`CHAIN_ETHEREUM_TESTNET_SEPOLIA_RPC = "${CHAIN_ETHEREUM_TESTNET_SEPOLIA_RPC}"`)
const CHAIN_ETHEREUM_TESTNET_GOERLI_RPC = process.env.RPC_ETHEREUM_TESTNET_GOERLI
console.debug(`CHAIN_ETHEREUM_TESTNET_GOERLI_RPC = "${CHAIN_ETHEREUM_TESTNET_GOERLI_RPC}"`)
const CHAIN_POLYGON_TESTNET_POLYGON_MUMBAI_RPC = process.env.RPC_POLYGON_TESTNET_POLYGON_MUMBAI
console.debug(`CHAIN_POLYGON_TESTNET_POLYGON_MUMBAI_RPC = "${CHAIN_POLYGON_TESTNET_POLYGON_MUMBAI_RPC}"`)

const CHAIN_ID = getChainId(CHAIN_NAME)
console.debug(`CHAIN_ID = "${CHAIN_ID}"`)
 */
/*
const getChainId = (chainName) => {
  switch (chainName) {
    case CHAIN_ETHEREUM_MAINNET:
      return CHAINID_ETH_MAINNET
    case CHAIN_ETHEREUM_TESTNET_SEPOLIA:
      return CHAINID_SEPOLIA
    case CHAIN_ETHEREUM_TESTNET_GOERLI:
      return CHAINID_ETH_TEST_GOERLI
    case CHAIN_POLYGON_TESTNET_POLYGON_MUMBAI:
      return CHAINID_POLYGON_TEST_MUMBAI
    default:
      return -1
  }
}

const getRpcUrl = (chainName) => {
  switch (chainName) {
    case CHAIN_ETHEREUM_MAINNET:
      return CHAIN_ETHEREUM_MAINNET_RPC
    case CHAIN_ETHEREUM_TESTNET_SEPOLIA:
      return CHAIN_ETHEREUM_TESTNET_SEPOLIA_RPC
    case CHAIN_ETHEREUM_TESTNET_GOERLI:
      return CHAIN_ETHEREUM_TESTNET_GOERLI_RPC
    case CHAIN_POLYGON_TESTNET_POLYGON_MUMBAI:
      return CHAIN_POLYGON_TESTNET_POLYGON_MUMBAI_RPC
    default:
      return ""
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
      return -1
  }
}
*/



const init = async () => {


  const CHAIN_NAME = getChainName()
  console.debug(`CHAIN_NAME = "${CHAIN_NAME}"`)
  
  const CHAIN_ID = getChainId(CHAIN_NAME)
  console.debug(`CHAIN_ID = "${CHAIN_ID}"`)

  const chainId = getChainId(CHAIN_NAME);
  console.debug(`chainId = "${chainId}"`)

  const daitokenAddress = getDaiTokenAddress(CHAIN_NAME);
  console.debug(`daitokenAddress = "${daitokenAddress}"`)

  const RPC_URL = getRpcUrl(CHAIN_NAME)
  console.debug(`RPC_URL = "${RPC_URL}"`)

  const PRIVATE_KEY = process.env.PRIVATE_KEY
  if (PRIVATE_KEY) {
    const msg=`PRIVATE_KEY is ${PRIVATE_KEY===undefined?"UNDEFINED ❌":" DEFINED ✔️" }`
    console.log(msg)
  } else {
    console.error(msg)
  }

 const dai = await Fetcher.fetchTokenData(chainId, daitokenAddress);
 
 // GET WETH ADDRESS
 const weth = WETH[chainId];

 
 const pair = await Fetcher.fetchPairData(dai, weth);
 const route = new Route([pair], weth);
 const trade = new Trade(route, new TokenAmount(weth, '100000000000000000'), TradeType.EXACT_INPUT);
 console.log(route.midPrice.toSignificant(6));
 console.log(route.midPrice.invert().toSignificant(6));
 console.log(trade.executionPrice.toSignificant(6));
 console.log(trade.nextMidPrice.toSignificant(6));
 

process.exit(0)

// ----------------

const slippageTolerance = new Percent('50', '10000'); // tolérance prix 50 bips = 0.050%
 
const _tokenIn = dai;
const _tokenOut = weth;
const _fee = 500; // 0.05%
const _recipient = "";
const _deadline = Math.floor(Date.now() / 1000) + 60 * 20; // le délai après lequel le trade n’est plus valable 
const _amountIn = trade.minimumAmountOut(slippageTolerance).raw; // minimum des tokens à récupérer avec une tolérance de 0.050%
const _amountOutMin = 0; //Mettre à 0 de manière naive (ce sera forcément plus). En vrai, utiliser un oracle pour déterminer cette valeur précisément.
const _sqrtPriceLimitX96 = 0; // Assurer le swap au montant exact

const value = trade.inputAmount.raw; // la valeur des ethers à envoyer 
 
 const provider = ethers.getDefaultProvider( CHAIN_ID, {
   infura: RPC_URL
 }); // utilisation du provider infura pour effectuer une transaction  
 
 const signer = new ethers.Wallet(PRIVATE_KEY); // récupérer son wallet grâce au private key
 const account = signer.connect(provider); // récupérer l’account qui va effectuer la transaction 
 
 const uniswapABI = [
	{
		"inputs": [
			{
				"components": [
					{
						"internalType": "address",
						"name": "tokenIn",
						"type": "address"
					},
					{
						"internalType": "address",
						"name": "tokenOut",
						"type": "address"
					},
					{
						"internalType": "uint24",
						"name": "fee",
						"type": "uint24"
					},
					{
						"internalType": "address",
						"name": "recipient",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "deadline",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "amountIn",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "amountOutMinimum",
						"type": "uint256"
					},
					{
						"internalType": "uint160",
						"name": "sqrtPriceLimitX96",
						"type": "uint160"
					}
				],
				"internalType": "struct ISwapRouter.ExactInputSingleParams",
				"name": "params",
				"type": "tuple"
			}
		],
		"name": "exactInputSingle",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "amountOut",
				"type": "uint256"
			}
		],
		"stateMutability": "payable",
		"type": "function"
	}
]

 const uniswap = new ethers.Contract(
   '0xE592427A0AEce92De3Edee1F18E0157C05861564',
   uniswapABI,
   account
 ); // récupérer le smart contract d’Uniswap avec l’adress du smart contract et l’ABI. Grâce à ethers on peut passer la fonction et la structure à utiliser en solidity 
 
 const tx = await uniswap.exactInputSingle(
   {
	   tokenIn: _tokenIn,
	   tokenOut: _tokenOut,
	   fee: _fee,
	   recipient: _recipient,
	   deadline: _deadline,
	   amountIn: _amountIn,
	   amountOutMinimum: _amountOutMinimum,
	   sqrtPriceLimitX96: _sqrtPriceLimitX96,
   },
   { value, gasPrice: 20e9 }
 ); // envoyer la transaction avec les bons paramètres 
 console.log(`Transaction hash: ${tx.hash}`); // afficher le hash de la transaction 
 
 const receipt = await tx.wait(); // récupérer la transaction receipt 
 console.log(`Transaction was mined in block ${receipt.blockNumber}`);
}
 
init();
