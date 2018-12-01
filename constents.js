//this will be generated after 1st deploy.
const contractAddress = '0x607BF6014c14e970A8580aDEDbF2ec51abbe89F4';
const contractInterface = [
    {
        "constant": true,
        "inputs": [],
        "name": "manager",
        "outputs": [
            {
                "name": "",
                "type": "address"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [],
        "name": "pickWinner",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "getPlayers",
        "outputs": [
            {
                "name": "",
                "type": "address[]"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [],
        "name": "enter",
        "outputs": [],
        "payable": true,
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "players",
        "outputs": [
            {
                "name": "",
                "type": "address"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "constructor"
    }
];

const infura_product_key = 'c3b0f4694b7a4e6aaf7f474e9522fa9c';
const networks = {
    MainnetHttp: 'https://mainnet.infura.io/v3/' + infura_product_key,
    MainnetWebsocket: 'wss://mainnet.infura.io/ws/v3/' + infura_product_key,
    RopstenHttp: 'https://ropsten.infura.io/v3/' + infura_product_key,
    RopstenWebsocket: 'wss://ropsten.infura.io/ws/v3/' + infura_product_key,
    KovanHttp: 'https://kovan.infura.io/v3/' + infura_product_key,
    KovanWebsocket: 'wss://kovan.infura.io/ws/v3/' + infura_product_key,
    RinkebyHttp: 'https://rinkeby.infura.io/v3/' + infura_product_key,
    RinkebyWebsocket: 'wss://rinkeby.infura.io/ws/v3/' + infura_product_key,
    InfuraHttp: 'https://ipfs.infura.io/ipfs/',
    InfuraWebsocket: 'https://ipfs.infura.io:5001/api/',
};

module.exports = {
    MNEMONIC: 'tube yellow recipe endorse expose cloth glove will found govern blur holiday',
    NETWORK: networks.RinkebyHttp,
};