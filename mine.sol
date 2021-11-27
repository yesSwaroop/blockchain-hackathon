pragma solidity ^0.8.4;

contract coin{
    address public minter;
    mapping (address => uint) public balances;
    event sent(address from, address to, uint amount);
    //to set minter to sender
    constructor(){
        minter = msg.sender;
    }
    function mint(address receiver, uint amount) public{
        require(msg.sender == minter); //to prevent multiple miners at the same time
        balances[receiver]+=amount;
    }
    error insufficientbalances(uint requested,uint available);
    function send(address receiver,uint amount) public{
        if(amount>balances[msg.sender])
        revert insufficientbalances({requested:amount,
        available : balances[msg.sender]});
        balances[msg.sender] -= amount;
        balances[receiver] += amount;
        emit sent(msg.sender,receiver,amount);
    }
}