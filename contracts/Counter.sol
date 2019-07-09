pragma solidity 0.5.0;

contract Counter1 {
  uint256 public value;

  function increaseByOne() public {
    value += 2; // error because we just wanna increase by 1
  }

  function getValue() public view returns (uint256) {
    return value;
  }
}

contract Counter2 is Counter1 {
  function increaseByOne() public {
    value++; // fixed error
  }
}