{/* 
<!-- # Contract Variables <!-- could be named "Contract - Step 1" or something like that? -->
 
Great! Now that we have initiated our contract we can get going and add some more to it. We can start by defining the price! 

We can now go ahead and define the price of our vending machine. To make this example as easy as possible, we will only have one set price for all of the items in our vending machine.
## Add to the Contract

We can start by **declaring a public integer** with 

`uint public price`

And set it equal to `1000000000000000`. This is **.001** Ether in Wei which is a denomination of ETH. We will touch more upon this later in the course. 
-----------------------

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
*/}


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
        <Shell categoryIndex={4}>

            
<Instructions>
<h2>Contract Variables</h2>

<p>
Great! Now that we have initiated our contract we can get going and add some more to it. 
We can start by defining the price! 
</p>

<p>
We can now go ahead and define the price of our vending machine. To make this example as easy as 
possible, we will only have one set price for all of the items in our vending machine.
</p>


<h3>Add to the Contract</h3>


<p>
We can start by <b>declaring a public integer</b> with 
<br /><code>uint public price</code><br/>
and set it equal to 
<br/><code>1000000000000000</code>.</p>

<p>
This is <b>.001</b> Ether in Wei which is a 
denomination of ETH. We will touch more upon this later in the course. 
</p>


<Blockquote title='Unsigned Integers'>  
An unsigned integer is a data type in solidity that 
means that the value must be a non-negative integer <code>&gt;= 0</code>.  
There are signed integers which can be initiated with int and these can be 
negative or positive.
</Blockquote>


<p>
Furthermore, uint is equal to uint256, a 256-bit integer. There are integer declarations with 
fewer bits like uint8 or uint32 but generally we can use uint to be safe.
</p>
{/* 
<p>
Now go ahead and add the price to our code terminal. -and compile-
</p> */}


<Blockquote variant='info' title='Instructions:'>
Add the price to the contract in the code editor, and compile.
</Blockquote>


</Instructions>




<Editor 
            language='sol'
            categoryUri='smart-contract-intro'
            courseUri='contract-variables'
            code={
`// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract VendingMachine { 

}`
        } 
            tests={[
                {
                    regex: 'uint public price = 1000000000000000;',
                    exist: true,
                    type: 'VARIABLE',
                    title: 'Missing: "uint public price = 1000000000000000;"',
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