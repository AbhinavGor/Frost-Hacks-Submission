const Web3 = require('web3')
const fs = require('fs')
const { interface, bytecode } = require('./compile')

let tGas;
async function main() {
  // Configuring the connection to an Ethereum node
  const network = 'rinkeby'
  const web3 = new Web3(
    new Web3.providers.HttpProvider(
      `https://${network}.infura.io/v3/${process.env.INFURA_PROJECT_ID}`
    )
  )
  // Creating a signing account from a private key
  const signer = await web3.eth.accounts.privateKeyToAccount('4698378b0cc61e504fb37ea739efcfc5164e132baaf83efde8d0cd8963ac95ca');
  console.log(await web3.eth.getBalance('0xA45620Df9B32F2Bd1500b8095a005dCB69eD91cD'));

  web3.eth.accounts.wallet.add(signer)

  ////Second method
  // const paymentContract = new web3.eth.Contract(JSON.parse(interface))
  // await deployTx.estimateGas(function(err, gas){
  //   tGas = gas;
  //   console.log(tGas);
  // });
  // var payment = paymentContract.deploy({
  //      data: '0x' + bytecode,
  //      arguments: [
  //      ]
  // }).send({
  //     from: signer.address,
  //      gas: '4700000',
  //      gasPrice: '100'
  //    }, function (e, contract){
  //     console.log(e, contract);
  //     if (typeof paymentContract.address !== 'undefined') {
  //          console.log('Contract mined! address: ' + contract.address + ' transactionHash: ' + contract.transactionHash);
  //     }
  //  })

  ////First method
  // Using the signing account to deploy the contract
  const contract = new web3.eth.Contract(JSON.parse(interface))
  contract.options.data = '0x' + bytecode
  const deployTx = contract.deploy()

  const test = await deployTx.estimateGas(function(err, gas){
    tGas = gas;
    console.log(tGas);
    return gas
  });
  //
  // console.log(test);

  const deployedContract = await deployTx
    .send({
      from: signer.address.toString(),
      // gas: await deployTx.estimateGas(function(err, gas){
      //   tGas = gas;
      //   console.log(tGas);
      //   return gas
      // })
      // gasPrice: web3.utils.toWei("0.0000000002", "ether")
      gasPrice: '99999999999',
      gas: 500000,
  		nonce: '1123'
    })
    .once('transactionHash', txhash => {
      console.log(`Mining deployment transaction ...`)
      console.log(`https://${network}.etherscan.io/tx/${txhash}`)
    })
  // The contract is now deployed on chain!
  console.log(`Contract deployed at ${deployedContract.options.address}`)
}

require('dotenv').config()
main()
