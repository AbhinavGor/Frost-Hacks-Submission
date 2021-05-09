require('dotenv').config();
const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const { interface, bytecode } =  require('./compile');
const ganache = require('ganache-cli');

// console.log(process.env.MNEMONIC);

const provider = new HDWalletProvider(
	process.env.MNEMONIC,
	'https://rinkeby.infura.io/v3/45d609ebfd864330bbc4bdda7787a798'
);

const web3 = new Web3(provider);

async function deploy() {
	const accounts = await web3.eth.getAccounts();
	console.log(accounts);
	console.log(`Attempting to deploy using account: ${accounts[0]}`);

	// const dep = await new web3.eth.Contract(JSON.parse(interface), accounts[0], { data: bytecode, from: accounts[0], gas: '1000000', gasPrice: '300' });
	// const res = await new web3.eth.Contract(JSON.parse(interface)).deploy({ data: bytecode }).send({ gas: '1000000', from: accounts[0], gasPrice: '300'}).once('transactionHash', txhash => {
	// 		console.log(`Mining deployment transaction ...`)
	// 		console.log(`https://rinkeby.etherscan.io/tx/${txhash}`)
	// 	})
	// // The contract is now deployed on chain!
	// console.log(`Contract deployed at ${deployedContract.options.address}`)
	// console.log(dep.options.address);


	const res = await new web3.eth.Contract(JSON.parse(interface));
	res.deploy({
    data: `0x` + bytecode
}).send({
    from: accounts[0],
    gasPrice: Web3.utils.fromWei('5000000000000000000', 'ether'),
    gas: 500000,
		nonce: '1123'
}).then((instance) => {
    console.log("Contract mined at " + instance.options.address);
});

};
//
deploy();
