// # Contract Payments

// Now the next couple of things to do is to be able to make our vending machine 
// accept payment, store it and put the item in the buyers inventory.

// Let’s start with the payment. To do this we can introduce a mapping. A Mapping 
// in Solidity acts like a hash table or dictionary in any other language. These 
// are used to store the data in the form of key-value pairs. Most commonly it is 
// used to assign unique addresses with certain value types. It is like a phone 
// book, we look up the name and it has a phone number assigned to it. 

// We can define a mapping using the mapping keyword, as such

// mapping (string => address) nameToAddress; // if we want to assign different 
// strings an address (0xaddress)

// mapping (uint => string) phoneNumberToName; // if we want to assign names to 
// different numbers

// In our instance we want to be able to load up the vending machine with money 
// and associate the amount loaded into the machine with the user who paid. Since 
// we are using Ethereum we know that the user will have a unique address so we 
// can store the balances according to their address.

// This would be an example of a mapping that maps addresses to integers.


// Go ahead and add a public mapping called balances.

// <!--
// Code Editor Test: 
// mapping (address => uint) public balances;
// -->

// Now we can add a function to add money to the vending machine

// ```
// function addMoney (uint _amount) public payable {


// }
// ```

// Now note this function is payable. Any function in Solidity with the modifier 
// Payable ensures that the function can send and receive Ether. It can process 
// transactions with non-zero Ether values and rejects any transactions with a 
// zero Ether value. 



import Link from 'next/link'
import Editor from '@components/Editor'
import Shell from '@components/Shell'
import Instructions from '@components/Instructions'
import CodeBlock from '@instructions/CodeBlock'
import InstructionsFull from '@components/InstructionsFull'
import Blockquote from '@instructions/Blockquote'
import Image from '@instructions/Image'
import constants from '@data/constants'
import { SuggestionCoreTypes } from '@utils/interfaces'

const CoursePage = () => {

    return(
        <Shell 
        categoryIndex={4}
        nextCourse='/courses/next-course-tbd'
    >

            
<Instructions>
<h2>Contract Payments</h2>

<p>
    Now the next couple of things we need to do is add the ability accept 
    payments to our vending machine, store it and put the item in the buyers 
    inventory.
</p>

<p>
    Let&apos;s start with the payment. To do this we can introduce a mapping. A Mapping 
    in Solidity acts like a hash table or dictionary in any other language. These 
    are used to store the data in the form of key-value pairs. Most commonly it is 
    used to assign unique addresses with certain value types. It is like a phone 
    book, we look up the name and it has a phone number assigned to it.
</p>

<p>
    We can define a mapping using the mapping keyword, as such
</p>

<CodeBlock code={`
// if we want to assign different strings an address (0xaddress)
mapping (string => address) nameToAddress; 

// if we want to assign names to different numbers
mapping (uint => string) phoneNumberToName; 
`}/>

<p>
    In our instance we want to be able to load up the vending machine with 
    money and associate the amount loaded into the machine with the user who 
    paid. Since we are using Ethereum we know that the user will have a unique 
    address so we can store the balances according to their address.
</p>

<p>
    This would be an example of a mapping that maps addresses to integers.
</p>

<Blockquote variant='instructions' title='Instructions'>
    Add a public mapping called balances to the contract.
    Then add the following function to the contract.
</Blockquote>


<CodeBlock code={`
function addMoney (uint _amount) public payable {


}
`}/>

<p>
    Now note this function is payable. Any function in Solidity with the 
    modifier <code>payable</code> ensures that the function can send and receive
    Ether. It can process transactions with non-zero Ether values and rejects 
    any transactions with a zero Ether value.
</p>



</Instructions>

<Editor 
            language='sol'
            code={
`// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract VendingMachine { 
    uint public price = 1000000000000000;

    struct Item{
        uint quantity;
        string itemName;
    }

}`
        } 
            tests={[
                {
                    regex: /\s*mapping\s*\(\s*address\s*=>\s*uint\s*\)\s*public\s*balances;\s*/,
                    exist: true,
                    type: 'VARIABLE',
                    title: 'Missing: "mapping (address => uint) public balances;"',
                    message: 'Add this code to the contract',
                    feedback:{
                        coreType: SuggestionCoreTypes.CODE,
                        title: 'Cats',
                        suggestion: 'Learn about *this* before taking the test',
                        links:{
                            'https://google.com/images/cats': 'Cat Pictures to Study'
                        }
                    }
                },
                {
                    regex: /\s*function\s*addMoney\s*\(\s*uint\s*_amount\s*\)\s*public\s*payable\s*{\s*};\s*/, 
                    exist: true,
                    type: 'VARIABLE',
                    title: 'Missing: "function addMoney (uint _amount) public payable { };"',
                    message: 'Add this code to the contract',
                    feedback:{
                        coreType: SuggestionCoreTypes.CODE,
                        title: 'Cats',
                        suggestion: 'Learn about *this* before taking the test',
                        links:{
                            'https://google.com/images/cats': 'Cat Pictures to Study'
                        }
                    }
                },
            ]}
            />


</Shell>
    )
}

export default CoursePage