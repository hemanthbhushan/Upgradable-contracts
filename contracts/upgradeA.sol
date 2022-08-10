// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";


contract upgradeA is Initializable {
    uint private  num;
    
    function initialize(uint _num) public initializer  {
        num = 3*_num;
    }
    function get() public view returns(uint){
        return num;
    } 

    function increament() public {
        num++;
    }

}