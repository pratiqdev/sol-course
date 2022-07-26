// # Contract Functions <!-- Step 4 -->

// Sure all these type declarations are cool, but how do we do anything with them? 
// I am glad you asked, this is where functions come into play!

// > A function is a group of reusable code which can be called anywhere in your 
// program. 

// Let’s start to craft our vending function which will in essence be the way we 
// use to purchase goods from the vending machine!

// We first start by declaring a function with the function keyword which is…that’s 
// right you guessed it function. Then as with all types we need to give it a name, 
// like buyItem. We also need to tell it which item we want to buy!

// This is where our array indexing comes in handy!

// We know that we stored all of our items in a struct array, so now all we have to 
// do is call that item where it is stored sequentially in our array and this will 
// be sure as our make-shift vending machine code system. In real life we would 
// press A1 or C3 to pick our item, here it would be element 0, 1, 2, etc. 

// So we now know we need a function that takes a single parameter, which is a 
// numbered index of our struct array. We can call this parameter itemCode and 
// declare it an integer. 

// ```sol
// function buyItem (uint itemCode) public {

// }
// ```

// We know vending machines only dispense one item at a time so we can easily now 
// subtract 1 from the quantity from the item we chose. 

// We can subtract it directly from it in our array.

// ```
// allItems[itemCode].quantity -= 1;
// ```

// We reference our array and reference the element with our parameter (itemCode) 
// followed by .quantity to reference the quantity portion of our struct and then 
// subtract one with -= 1.

// So right now our function is to purchase items from our vending machine and 
// take it out of the inventory.


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
            nextCourse='/courses/smart-contract-intro/contract-payments'
        >

            
<InstructionsFull
    categoryUri='smart-contract-intro'
    courseUri='contract-functions'
>
<h2>Contract Functions</h2>

<p>
    Sure all these type declarations are cool, but how do we do anything with them? 
    I am glad you asked, this is where functions come into play!
</p>


<Blockquote>
    A function is a group of reusable code which can be called anywhere in your 
    program. 
</Blockquote> 

<p>
    Let&apos;s start to craft our vending function which will in essence be the way we 
    use to purchase goods from the vending machine!
</p>

<p>
    We first start by declaring a function with the function keyword which is…that’s 
    right you guessed it function. Then as with all types we need to give it a name, 
    like buyItem. We also need to tell it which item we want to buy!
</p>

<p>
    This is where our array indexing comes in handy!
</p>

<p>
    We know that we stored all of our items in a struct array, so now all we have to 
    do is call that item where it is stored sequentially in our array and this will 
    be sure as our make-shift vending machine code system. In real life we would 
    press A1 or C3 to pick our item, here it would be element 0, 1, 2, etc. 
</p>

<p>
    So we now know we need a function that takes a single parameter, which is a 
    numbered index of our struct array. We can call this parameter itemCode and 
    declare it an integer. 
</p>

<CodeBlock code={`
function buyItem (uint itemCode) public {

}
`}/>

<p>
    We know vending machines only dispense one item at a time so we can easily now 
    subtract 1 from the quantity from the item we chose. 
</p>

<p>
    We can subtract it directly from it in our array.
</p>

<CodeBlock code={`
allItems[itemCode].quantity -= 1;
`}/>

<p>
    We reference our array and reference the element with our parameter (itemCode) 
    followed by .quantity to reference the quantity portion of our struct and then 
    subtract one with -= 1.
</p>

<p>
    So right now our function is to purchase items from our vending machine and 
    take it out of the inventory.
</p>


</InstructionsFull>
</Shell>
    )
}

export default CoursePage