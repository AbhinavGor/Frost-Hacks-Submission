pragma solidity ^0.4.17;

contract Payment{
	address public mod;


	function Payment() public {
		mod = msg.sender;
	}

	function custToCont(uint fee) payable public {
		require(msg.value > fee);
	}

	function contToDoc(address docAddr, uint fee) public {
		docAddr.transfer(fee);
	}
	function getBal() public view returns (uint){
	    return this.balance;
	}

}
