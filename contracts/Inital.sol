// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
// import "./OwnedUpgradeabilityProxy.sol";

contract Initial is Initializable {
    uint private  num;
    function initialize(uint _num) public initializer {
        num = _num;
    }

    function get() public view returns(uint){
        return num;
    } 
    function increament() public {
        num = num+10;
    }
}