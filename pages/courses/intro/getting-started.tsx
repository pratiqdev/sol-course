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
<h2>Markdown Style Guide</h2>

<p>Welcome to {constants.SITE_NAME}</p>

<p>Custom components are <b>easier</b> to use in <i>plain</i> TSX instead of MDX</p>

Here is a <Link href='https://google.com'>Link to Google</Link>

<hr />
<div style={{display: 'flex', alignItems: 'center'}}>
    <Image icon 
        src='test-icon.jpg' 
        alt='icon' 
        width={20}
        style={{marginRight: '5px', marginTop: '-5px'}}
    />
    <h3>Images </h3>
</div>

<Image 
    src='test-image.jpg'
    alt='a test image'
    width={1513}
    height={851}
/>

                 

<hr />
<h3>Blockquotes</h3>
<Blockquote>
    a blockquote
</Blockquote>

<Blockquote variant='info'>
    info blockquote
</Blockquote>

<Blockquote variant='info' title='Some Info'>
    info blockquote
</Blockquote>

<Blockquote variant='alert'>
    alert blockquote
</Blockquote>

<Blockquote variant='error'>
    error blockquote
</Blockquote>

<hr />
<h3>Code</h3>

Here is some <code>inline code</code>

<CodeBlock code={`// solidity
contract MyContract{
    uint blap = 123;
}`} />

<CodeBlock lang='jsx' code={`// jsx
const myFunction = (arg) => {
    let intVar = 123
    let stringVar = 'hello'
}`} />



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