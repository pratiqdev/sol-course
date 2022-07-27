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
import { Button } from '@mantine/core'
import { useRouter } from 'next/router'

const CoursePage = () => {

    return(
        <Shell 
            categoryIndex={9999}    
        >
            <div style={{width:'100%', margin: '0 20vw', display:'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>

                <h2 style={{fontSize: '4rem', fontFamily: 'monospace', letterSpacing: '.5rem'}}>404</h2>
                <h4>The page you are looking for does not exist</h4>
                <Link href='/' passHref><Button>Go Home</Button></Link>

            </div>

        </Shell>
    )
}

export default CoursePage