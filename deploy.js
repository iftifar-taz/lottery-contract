const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const { interface, bytecode } = require('./compile');
const { MNEMONIC, NETWORK } = require('./constents');

const provider = new HDWalletProvider(MNEMONIC, NETWORK);

const web3 = new Web3(provider);

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();
    console.log('Attempting to deploy from account: ' + accounts[0]);

    const result = await new web3.eth.Contract(interface).deploy({
        data: '0x' + bytecode
    }).send({
        from: accounts[0]
    });

    console.log(interface);
    console.log('Contract deployed to: ' + result.options.address);
};

deploy();
