export const code = `

// This is the code that would appear in the editor

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

contract Constants {
   // coding convention to uppercase constant variables
   address public constant MY_ADDRESS = 0x777788889999AaAAbBbbCcccddDdeeeEfFFfCcCc;
   uint public constant MY_UINT = 123;
}

`
export const tests = {
   fatal:[
      {
         test: /some regex to match with/g,
         msg: 'You must declare a public variable USERS of type integer.',
      },
   ],
   warning: [
      {
         test: /some regex to match with/g,
         msg: 'You should define the version used at the top of the file.',
      }
   ]

}