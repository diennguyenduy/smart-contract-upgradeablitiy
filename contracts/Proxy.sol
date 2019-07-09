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
      let ptr := mload(0x40) // trỏ ptr tới địa chỉ bắt đầu là  0x40 , ox40 là địa chỉ đặc biệt của solidity , nó trỏ tới cùng nhớ mới sau vùng nhớ đã lưu

      // calldatasize: size of the cal data
      // copy 'calldatasize' bytes from position 0 to memory at ptr
      calldatacopy(ptr, 0, calldatasize)
        let result := delegatecall(gas, _impl, ptr, calldatasize, 0, 0)
        // call contract at address _impl with input mem(ptr..(ptr+calldatasize)) providing 'gas' gas and output area mem[0..0]
        // out and outsize are 0 because we don't know the size yet.
        // return 0 (error) or 1 (success)
        let size := returndatasize
        returndatacopy(ptr, 0, size) // copy 'size' bytes from returndata at position '0' to mem at position 'ptr'

        switch result
          case 0 {
            revert(ptr, size) // end execution, revert state changes, return data mem[p..(p+s)) (data from 'ptr' to 'size')
          }
          default {
            return(ptr, size) // end execution, return data mem[p..(p+s))
          }
      }
    }
}