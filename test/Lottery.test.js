const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');

const provider = ganache.provider();
const web3 = new Web3(provider);

const { interface, bytecode } = require('../compile');

let lottery;
let accounts;

// const INITIAL_MESSAGE = 'Hi there!';
// const MESSAGES = ['Message 1', 'Message 2', 'Message 3'];

beforeEach(async () => {
    //Get a liist of all accounts
    accounts = await web3.eth.getAccounts();

    //Use one of the accounts to deploy contract
    lottery = await new web3.eth.Contract(interface).deploy({
        data: '0x' + bytecode
    }).send({
        from: accounts[0],
        gas: '1000000'
    });

    lottery.setProvider(provider);
});

describe('Lotery Contract', () => {
    it('deployes a contract', () => {
        assert.ok(lottery.options.address);
    });

    it('has a manager', async () => {
        const manager = await lottery.methods.manager().call();
        assert.equal(accounts[0], manager);
    });

    it('allows one account to enter', async () => {
        await lottery.methods.enter().send({
            from: accounts[0],
            value: web3.utils.toWei('.0101', 'ether')
        });

        const players = await lottery.methods.getPlayers().call({
            from: accounts[0]
        });
        assert.equal(1, players.length);
        assert.equal(accounts[0], players[0]);
    });

    it('allows multiple accounts to enter', async () => {
        const numberOfAccounts = 8;
        for (let i = 0; i < numberOfAccounts; i++) {
            await lottery.methods.enter().send({
                from: accounts[i],
                value: web3.utils.toWei('.0101', 'ether')
            });
        }

        const players = await lottery.methods.getPlayers().call({
            from: accounts[0]
        });
        assert.equal(numberOfAccounts, players.length);
        for (let i = 1; i < numberOfAccounts; i++) {
            assert.equal(accounts[i], players[i]);
        }
    });

    it('requires a minimum amount of ether to enter', async () => {
        let errorOccurred = false;
        try {
            await lottery.methods.enter().send({
                from: accounts[0],
                value: web3.utils.toWei('.001', 'ether')
            });
        } catch (err) {
            errorOccurred = true;
        }
        assert.equal(true, errorOccurred);
    });

    it('only manager can pick winner', async () => {
        const numberOfAccounts = 3;
        for (let i = 0; i < numberOfAccounts; i++) {
            await lottery.methods.enter().send({
                from: accounts[i],
                value: web3.utils.toWei('.0101', 'ether')
            });
        }

        let errorOccurred = false;
        try {
            await lottery.methods.pickWinner().send({
                from: accounts[1],
            });
        } catch (err) {
            errorOccurred = true;
        }
        assert(errorOccurred);

        errorOccurred = false;
        try {
            await lottery.methods.pickWinner().send({
                from: accounts[0]
            });
        } catch (err) {
            errorOccurred = true;
        }
        assert(!errorOccurred);
    });

    it('sends money to winner and resets contract', async () => {
        await lottery.methods.enter().send({
            from: accounts[0],
            value: web3.utils.toWei('2', 'ether')
        });

        const initialBalance = await web3.eth.getBalance(accounts[0]);

        await lottery.methods.pickWinner().send({
            from: accounts[0]
        });

        const finalBalance = await web3.eth.getBalance(accounts[0]);
        assert(finalBalance - initialBalance > web3.utils.toWei('1.99', 'ether'));

        const players = await lottery.methods.getPlayers().call();
        assert.equal(0, players.length);

        const lotteryBalance = await web3.eth.getBalance(lottery.options.address);
        assert.equal(0, lotteryBalance);
    });

    it('has last winner', async () => {
        await lottery.methods.enter().send({
            from: accounts[1],
            value: web3.utils.toWei('2', 'ether')
        });
        await lottery.methods.pickWinner().send({
            from: accounts[0]
        });
        const lastWinner = await lottery.methods.lastWinner().call();
        assert.equal(accounts[1], lastWinner);
    });
});
