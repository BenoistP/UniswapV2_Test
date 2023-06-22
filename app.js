// HIDDEN
// .env
require("dotenv").config()

const { /* ChainId, */ Fetcher, WETH, Route, Trade, TokenAmount, TradeType, Percent } = require('@uniswap/sdk');
const ethers = require('ethers');

const { getChainName, getChainId, getRpcUrl, getDaiTokenAddress, getWethToken } = require('./tools.js');



const init = async () => {


  const CHAIN_NAME = getChainName()
  console.debug(`CHAIN_NAME = "${CHAIN_NAME}"`)
  
  const CHAIN_ID = getChainId(CHAIN_NAME)
  console.debug(`CHAIN_ID = "${CHAIN_ID}"`)

  const daitokenAddress = getDaiTokenAddress(CHAIN_ID);
  console.debug(`daitokenAddress = "${daitokenAddress}"`)

  const RPC_URL = getRpcUrl(CHAIN_ID)
  console.debug(`RPC_URL = "${RPC_URL}"`)

  const PRIVATE_KEY = process.env.PRIVATE_KEY
  if (PRIVATE_KEY) {
    const msg=`PRIVATE_KEY is ${PRIVATE_KEY===undefined?"UNDEFINED ❌":" DEFINED ✔️" }`
    console.log(msg)
  } else {
    console.error(msg)
  }

 const RPC_PROVIDER = new ethers.providers.JsonRpcProvider(RPC_URL); // v5
// https://docs.ethers.org/v6/migrating/#migrate-providers
// const RPC_PROVIDER = new ethers.JsonRpcProvider(RPC_URL); // v6

//  const provider = ethers. getDefaultProvider( CHAIN_ID, {
// 	infura: RPC_URL
// }); // utilisation du provider infura pour effectuer une transaction  


 // GET WETH
 const weth = getWethToken(CHAIN_ID);
console.debug(`weth =`)
console.dir(weth)

// static fetchTokenData(chainId: ChainId, address: string, provider?: import("@ethersproject/providers").BaseProvider, symbol?: string, name?: string): Promise<Token>;
const dai = await Fetcher.fetchTokenData( CHAIN_ID, daitokenAddress, RPC_PROVIDER);
console.debug(`dai =`)
console.dir(dai)


process.exit(0)

// ----------------

 const pair = await Fetcher.fetchPairData(dai, weth);
 const route = new Route([pair], weth);
 const trade = new Trade(route, new TokenAmount(weth, '100000000000000000'), TradeType.EXACT_INPUT);
 console.log(route.midPrice.toSignificant(6));
 console.log(route.midPrice.invert().toSignificant(6));
 console.log(trade.executionPrice.toSignificant(6));
 console.log(trade.nextMidPrice.toSignificant(6));
 

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
