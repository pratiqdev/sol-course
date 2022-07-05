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

            
<InstructionsFull
    categoryUri='smart-contract-intro'
    courseUri='getting-started'
>
<h2>Getting Started</h2>

<Blockquote variant='' title='Goals'>
<b>1.</b> Write a simple smart contract<br />
<b>2.</b> Deploy contract to the Testnet
</Blockquote>


<p>
Solidity is the programming language used for creating Ethereum smart contracts. 
Smart contract is just a fancy word for a program. Just like a computer program, 
but for Ethereum. Smart contracts are the backbone of Ethereum applications and 
functionality, and all of your Ethereum projects will start with one.
</p>


<p>
Let&apos;s create our first smart contract! (*Remember this moment as the one that 
started it all.*)
</p>

<p>
One of the best metaphors I&apos;ve heard for a smart contract was that of a vending 
machine: With the right inputs, certain outputs are guaranteed and there is no 
need for employees.
</p>

<p>
Let&apos;s start by adding an SPDX License Identifier, defining our Solidity version 
with Pragma Solidity and initiate our contract with contract {}
</p>

<CodeBlock code={
`// SPDX-License-Identifier: MIT //A

pragma solidity ^0.8.0; //B

contract VendingMachine { 
    ... //C
}`
}/>

<table>
    <thead>
            <td>Key</td>
            <td>Description</td>
    </thead>
    <tbody>
        <tr>
            <td>A</td>
            <td>Trust in smart contracts can be better established if their source code is available. Since making source code available always touches on legal problems with regards to copyright, the Solidity compiler encourages the use of machine-readable SPDX license identifiers. Every source file should start with a comment indicating its license:</td>
        </tr>
        <tr>
            <td>B</td>
            <td>Source files can (and should) be annotated with a version pragma to reject compilation with future compiler versions that might introduce incompatible changes. </td>
        </tr>
        <tr>
            <td>C</td>
            <td>This is the keyword we use to instantiate a new contract named VendingMachine</td>
        </tr>
    </tbody>
</table>


</InstructionsFull>
</Shell>
    )
}

export default CoursePage