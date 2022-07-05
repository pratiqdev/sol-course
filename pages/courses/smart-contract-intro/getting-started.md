# Getting Started

> Goals 
> 1. Write a simple smart contract
> 1. Deploy contract to the Testnet  



Solidity is the programming language used for creating Ethereum smart contracts. 
Smart contract is just a fancy word for a program. Just like a computer program, 
but for Ethereum. Smart contracts are the backbone of Ethereum applications and 
functionality, and all of your Ethereum projects will start with one.




Let's create our first smart contract! (*Remember this moment as the one that 
started it all.*)

One of the best metaphors I’ve heard for a smart contract was that of a vending 
machine: With the right inputs, certain outputs are guaranteed and there is no 
need for employees.

Let's start by adding an SPDX License Identifier, defining our Solidity version 
with Pragma Solidity and initiate our contract with contract {}

```sol
// SPDX-License-Identifier: MIT //A

pragma solidity ^0.8.0; //B

contract VendingMachine { 
    ... //C
}
```



## * Reference
| Key | Description |
|---|---|
A | Trust in smart contracts can be better established if their source code is available. Since making source code available always touches on legal problems with regards to copyright, the Solidity compiler encourages the use of machine-readable SPDX license identifiers. Every source file should start with a comment indicating its license:
B | Source files can (and should) be annotated with a version pragma to reject compilation with future compiler versions that might introduce incompatible changes. 
C | This is the keyword we use to instantiate a new contract named VendingMachine