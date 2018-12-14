pragma solidity >= 0.5.1 <0.6.0;

contract Lottery {
    address public manager;
    address public lastWinner;
    address payable[] public players;
    
    constructor() public {
        manager = msg.sender;
    }
    
    modifier isManager() {
        assert(msg.sender == manager);
        _;
    }
    
    modifier hasMinEther() {
        assert(msg.value > .01 ether);
        _;
    }
    
    function random() private view returns (uint) {
        return uint(keccak256(abi.encodePacked(block.difficulty, now, players)));
    }

    function enter() public hasMinEther payable {
        players.push(msg.sender);
    }
    
    function pickWinner() public isManager {
        uint index = random() % players.length;
        address(players[index]).transfer(address(this).balance);
        lastWinner = players[index];
        players = new address payable[](0);
    }
    
    function getPlayers() public view returns(address payable[] memory) {
        return players;
    }
}
