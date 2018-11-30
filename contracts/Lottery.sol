pragma solidity ^0.4.25;

contract Lottery {
    address public manager;
    address[] public players;
    
    constructor() public {
        manager = msg.sender;
    }
    
    modifier isManager() {
        require(msg.sender == manager);
        _;
    }
    
    modifier hasMinEther() {
        require(msg.value > .01 ether);
        _;
    }
    
    function random() private view returns (uint) {
        return uint(keccak256(abi.encodePacked(block.difficulty, now, players)));
    }

    function enter() public hasMinEther payable {
        players.push(msg.sender);
    }
    
    function pickWInner() public isManager {
        uint index = random() % players.length;
        players[index].transfer(address(this).balance);
        players = new address[](0);
    }
    
    function getPlayers() public view returns(address[]) {
        return players;
    }
}