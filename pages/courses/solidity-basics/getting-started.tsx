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
<h2>A Simple Smart Contract</h2>

{/* <CodeBlock code={`// SPDX-License-Identifier: MIT
pragma solidity >=0.4.16 <0.9.0;

contract SimpleStorage {
    uint storedData;

    function set(uint x) public {
        storedData = x;
    }

    function get() public view returns (uint) {
        return storedData;
    }
}`} /> */}

{/* <p>
    This is the basic structure of a solidity contract.
</p> */}
{/* <p>The most common features are the license identifier, version pragma, and the contract definition</p> */}

{/* <CodeBlock code={`// SPDX-License-Identifier: MIT
pragma solidity >=0.4.16 <0.9.0;`} /> */}

{/* <p>...license</p> */}

<p>All Solidity files should start with a <b>version pragma</b>. This specific file is made for Solidity version <b>.04.16</b> to version <b>.0.9.0.</b> This is to ensure that your code is not compilable with other versions of Solidity that may break your code.</p>

<p>The compiler is consistently being updated and changed, it is very important that we use the correct compiler version when writing our code.</p>

<p>The pragma only affects the compiler - telling it the minimum required version to use when compiling, or what compiler versions are compatible with this contract</p>

{/* <Image 
    src='test-image.jpg'
    alt='a test image'
    width={1513}
    height={851}
/>

<Blockquote>
    a blockquote
</Blockquote>


<CodeBlock code={`// solidity
contract MyContract{
    uint blap = 123;
}`} /> */}



{/* 

Type error: Type '{ 
    suggestion: string; 
    links: { 
        'https://google.com/images/cats': string; 
    }; 
}' 
    
    is missing the following properties from type '
    { 
        coreType: SuggestionCoreTypes; 
        title: string; 
        suggestion?: string | undefined; 
        links?: { 
            [key: string]: string; 
        } | undefined; 
    }': 
    coreType, 
    title
*/}



</Instructions>

        <Editor 
            language='sol'
            code={
`// SPDX-License-Identifier: MIT
pragma solidity >=0.4.16 <0.9.0;

contract SimpleStorage {
    uint storedData;

    function set(uint x) public {
        storedData = x;
    }

    function get() public view returns (uint) {
        return storedData;
    }
}`
        } 
            tests={[
                {
                    regex: 'string public greet = "Hello, World!"',
                    exist: true,
                    type: 'KEYWORD',
                    title: 'Missing: string public greet = "Hello, World!"',
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
                    regex: `'`,
                    exist: false,
                    type: 'SYNTAX',
                    title: 'Single quotes not allowed',
                    message: 'Use double quotes instead of single quotes',
                    feedback:{
                        coreType: SuggestionCoreTypes.CODE,
                        title: 'Dogs',
                        suggestion: 'Learn about *this* before taking the test',
                        links:{
                            'https://google.com/images/dogs': 'Dog Pictures to Study'
                        }
                    }
                }
            ]}
            />
        </Shell>
    )

}

export default CoursePage