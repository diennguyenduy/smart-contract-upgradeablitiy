pragma solidity 0.5.0;

contract Proxy {
  address public implementation;

  function upgradeTo(address _implementation) public {
    implementation = _implementation;
  }

  /**
    * @dev Fallback function allowing to perform a delegatecall to the given implementation.
    * This function will return whatever the implementation call returns
    */
  function () payable external {
    address _impl = implementation;
    require(_impl != address(0));

    assembly {
      let ptr := mload(0x40)

      // (1) copy incoming call data
      calldatacopy(ptr, 0, calldatasize)

      // (2) forward call to logic contract
      let result := delegatecall(gas, _impl, ptr, calldatasize, 0, 0)
      let size := returndatasize

      // (3) retrieve return data
      returndatacopy(ptr, 0, size)

      // (4) forward return data back to caller
      switch result
      case 0 {
        revert(ptr, size)
        }
      default {
        return(ptr, size)
        }
    }
  }
}