# Contract Variables <!-- could be named "Contract - Step 1" or something like that? -->
 
Great! Now that we have initiated our contract we can get going and add some more to it. We can start by defining the price! 

We can now go ahead and define the price of our vending machine. To make this example as easy as possible, we will only have one set price for all of the items in our vending machine.

## Add to the Contract

We can start by **declaring a public integer** with 

`uint public price`

And set it equal to `1000000000000000`. This is **.001** Ether in Wei which is a denomination of ETH. We will touch more upon this later in the course. 

> **Unsigned Integers**  
> An unsigned integer is a data type in solidity that 
> means that the value must be a non-negative integer (>= 0).  
> There are signed integers which can be initiated with int and these can be 
> negative or positive.

Furthermore, uint is equal to uint256, a 256-bit integer. There are integer declarations with fewer bits like uint8 or uint32 but generally we can use uint to be safe.

Now go ahead and add the price to our code terminal. -and compile-

<!--
Code Editor Test: 

uint public price = 1000000000000000;
-->