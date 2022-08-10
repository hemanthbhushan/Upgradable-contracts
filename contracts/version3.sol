 // SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
// import "./OwnedUpgradeabilityProxy.sol";

contract version3 is Initializable {
    uint private  num;
    string private name;
    function initialize(uint _num) public initializer {
        num = _num;
    }

    function get() public view returns(uint){
        return num;
    } 
    function increament() public {
        num = num+10;
    }
     function enterName(string memory _name) public {
        name = _name;
    }
     function getName() public view returns(string memory){
       return name;
    }
   


}