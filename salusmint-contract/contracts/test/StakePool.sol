// SPDX-License-Identifier: MIT
pragma solidity 0.8.13;

contract StakePool {
    IERC20 public immutable erc20Token;
   

    address public owner;
    uint256 stakedAmount;

    // Total staked
    uint public totalSupply;
    // User address => staked amount
    mapping(address => uint) public balanceOf;


    event Stake(uint256 amount, address staker);
    event WithDraw(uint256 amount, address user);
    event ClaimReward(uint256 reward, address user);


    constructor(address _erc20Token) {

        owner = msg.sender;
        erc20Token = IERC20(_erc20Token);
        stakedAmount = 0;
        
    }


    function stake(uint _amount) external {
        require(_amount > 0, "amount = 0");
        stakedAmount += _amount;
        erc20Token.transferFrom(msg.sender, address(this), _amount);
        emit Stake(_amount, msg.sender);

    }

    function claimReward() external {
        require(stakedAmount > 0, "zero stake amount");
         
        uint256 reward = stakedAmount * 5 / 100;

        stakedAmount -= reward;

        erc20Token.transfer(msg.sender, reward);

        emit ClaimReward(reward, msg.sender);
        
    }

    function withdraw(uint _amount) external {
        require(_amount > 0, "amount = 0");
        stakedAmount -= _amount;
        erc20Token.transfer(msg.sender, _amount);

        emit WithDraw(_amount, msg.sender);

    }

}

interface IERC20 {
    function totalSupply() external view returns (uint);

    function balanceOf(address account) external view returns (uint);

    function transfer(address recipient, uint amount) external returns (bool);

    function allowance(address owner, address spender) external view returns (uint);

    function approve(address spender, uint amount) external returns (bool);

    function transferFrom(
        address sender,
        address recipient,
        uint amount
    ) external returns (bool);

    event Transfer(address indexed from, address indexed to, uint value);
    event Approval(address indexed owner, address indexed spender, uint value);
}
