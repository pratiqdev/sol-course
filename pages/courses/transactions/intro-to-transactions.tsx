import Link from 'next/link'
import Editor from '@components/Editor'
import Shell from '@components/Shell'
import InstructionsFull from '@components/InstructionsFull'
import CodeBlock from '@instructions/CodeBlock'
import Blockquote from '@instructions/Blockquote'
import Image from '@instructions/Image'
import constants from '@data/constants'
import { SuggestionCoreTypes } from '@utils/interfaces'

const CoursePage = () => {

    return(
        <Shell categoryIndex={3}>

            
<InstructionsFull
    categoryUri='transactions'
    courseUri='intro-to-transactions'
>

<h2>Intro to Transactions <code>Tx</code></h2>

<p>Every interaction is considered a transaction, between users or a user to a smart contract.</p>

<p>Each transaction has a collection of values that have details about the transaction, for example:</p>

<ul>
    <li>
        <code>nonce</code> - transaction sequence number fr the sending account
    </li>

    <li>
        <code>gasprice</code> - price you are offering to pay
    </li>

    <li>
        <code>startgas</code> - maximum amount of gas allowed for the transaction
    </li>

    <li>
        <code>to</code> - destination address (account or contract address)
    </li>

    <li>
        <code>value</code> - eth to transfer to the destination, if any
    </li>

    <li>
        <code>data</code> - all of the interesting stuff goes here
    </li>

    <li>
        <code>v</code> - along with <code>r</code> and <code>s</code> makes up the ECDSA signature
    </li>

    <li>
        <code>-OR-</code>
    </li>

    <li>
        <code>v, r, s</code> - ECDSA signature
    </li>
</ul>

{/* 
- version ranges
- version structures
 */}

<p>

</p>










</InstructionsFull>

    
        </Shell>
    )

}

export default CoursePage