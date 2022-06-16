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
        <Shell categoryIndex={0}>

            
<Instructions>
<h2>First Steps</h2>

{/* 
- version ranges
- version structures
 */}

<p>Lets get our contract started by adding the pragma version.</p>

<p>Add the following code to editor and compile.</p>


<CodeBlock code={`pragma solidity ^0.8.14;`} /> 


<p>You may also see an error about the license identifier:</p>
<p>The license identifier displays the intended usage and restrictions of this contract</p>
{/* 
List most common license types and why to choose each type of license
*/}
<p>Add the following code to editor, at the first line, and compile again.</p>


<CodeBlock code={`// SPDX-License-Identifier: MIT`} /> 



<Blockquote>
    <i>
    "Trust in smart contract 
    can be better established if their source code is available. Since making 
    source code available always touches on legal problems with regards to 
    copyright, the Solidity compiler encouranges the use of machine-readable 
    SPDX license identifiers. Every source file should start with a comment 
    indicating its license. "
    </i>
    <br />
    <br />
    <b>- soliditylang.org</b>
</Blockquote>






</Instructions>

        <Editor 
            language='sol'
            categoryUri='intro'
            courseUri='getting-started'
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