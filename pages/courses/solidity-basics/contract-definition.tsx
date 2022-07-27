import Link from 'next/link'
import Editor from '@components/Editor'
import Shell from '@components/Shell'
import Instructions from '@components/Instructions'
import CodeBlock from '@instructions/CodeBlock'
import Blockquote from '@instructions/Blockquote'
import Image from '@instructions/Image'
import constants from '@data/constants'
import { SuggestionCoreTypes } from '@utils/interfaces'

const CoursePage = () => {

    return(
        <Shell categoryIndex={2}>

            
<Instructions>
<h2>Contract Definition</h2>

{/* 
- version ranges
- version structures
 */}

<p>
    Solidity has collections of code called <code>contracts</code>. 
    Contracts are where the functions and data live. 
    Each contract resides at their own specific address on Ethereum. 
</p>
<p>
    Contracts are the building blocks of Ethereum projects and this is the 
    how we start to build functionality for our projects via Ethereum.
</p>




<CodeBlock code={`pragma solidity ^0.8.14;`} /> 






</Instructions>

        <Editor 
            language='sol'
            code={
`// SPDX-License-Identifier: MIT
pragma solidity ^0.8.14;

// ADD TO CONTRACT: 
// string public greet = 'Hello, World!'
// tests have to ignore comments ^^^

contract HelloWorld {
    // -here-
}`
        } 
            tests={[
                // {
                //     regex: 'pragma solidity ^0.8.14;',
                //     exist: true,
                //     type: 'KEYWORD',
                //     title: 'Missing: pragma version',
                //     message: 'Contracts require the version to be specified',
                //     feedback:{
                //         coreType: SuggestionCoreTypes.CODE,
                //         title: 'pragme',
                //         suggestion: 'Learn about *pragma versions* before taking the test',
                //         links:{
                //             'https://google.com/images/cats': 'Cat Pictures to Study'
                //         }
                //     }
                // },
                // {
                //     regex: `'`,
                //     exist: false,
                //     type: 'SYNTAX',
                //     title: 'Single quotes not allowed',
                //     message: 'Use double quotes instead of single quotes',
                //     feedback:{
                //         coreType: SuggestionCoreTypes.CODE,
                //         title: 'Dogs',
                //         suggestion: 'Learn about *this* before taking the test',
                //         links:{
                //             'https://google.com/images/dogs': 'Dog Pictures to Study'
                //         }
                //     }
                // }
            ]}
            />
        </Shell>
    )

}

export default CoursePage