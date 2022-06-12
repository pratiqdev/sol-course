import Editor from '@components/Editor'
import Shell from '@components/Shell'
import Instructions from '@components/Instructions'
import Questionnaire from '@components/Questionnaire'
import Link from 'next/link'
import CodeBlock from '@instructions/CodeBlock'
import Blockquote from '@instructions/Blockquote'
import Image from '@instructions/Image'
import constants from '@data/constants'

const CoursePage = () => {

    return(
        <Shell categoryIndex={0}>
            <Instructions>

<h2>Questionnaire</h2>

<p>Follow the instructions and answer the questions</p>

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




            </Instructions>

            <Questionnaire 
                categoryUri='intro'
                courseUri='standard-qa'
                qas={[
                    {
                        question: 'A question!!!',
                        answer: 'blaps',
                        feedback: {
                            title: 'CheckOut',
                            response:'The answer is "blaps". Check that thing for more answers',
                            suggestion: 'Check out that thing for more answers about "A question!!!"',
                            links: {
                                'google': 'https://google.com',
                                'etherscan':'https://etherscan.io'
                            }
                        }

                    },
                    {
                        question: 'Another q & a',
                        answer: 'flap',
                        feedback: {
                            title: 'CheckOut2',
                            response:'The answer is "flap". Check that thing for more answers',
                            suggestion: 'Check out that thing for more answers about "A question!!!"',
                            links: {
                                'google': 'https://google.com',
                                'etherscan':'https://etherscan.io'
                            }
                        }
                    },
                    {
                        question: 'A number question... same as text really',
                        answer: '42',
                        feedback: {
                            title: 'CheckOut3',
                            response:'The answer is "42". Check that thing for more answers',
                            suggestion: 'Check out that thing for more answers about "A question!!!"',
                            links: {
                                'google': 'https://google.com',
                                'etherscan':'https://etherscan.io'
                            }
                        }
                    },
                    {
                        type: 'options',
                        question: 'A multiple choice dropdown',
                        options: ['option one!', 'option two...', 'option thr33'],
                        answer: 'option one!',
                        feedback: {
                            title: 'CheckOut4',
                            response:'The answer is "option one!". Check that thing for more answers',
                            suggestion: 'Check out that thing for more answers about "A question!!!"',
                            links: {
                                'google': 'https://google.com',
                                'etherscan':'https://etherscan.io'
                            }
                        }
                    },
                    {
                        type: 'boolean',
                        question: 'A basic boolean!?',
                        answer: 'false',
                        feedback: {
                            title: 'CheckSomeBooleans',
                            response:'The answer is "false". Check that thing for more answers',
                            suggestion: 'Check out that thing for more answers about "A question!!!"',
                            links: {
                                'google': 'https://google.com',
                                'etherscan':'https://etherscan.io'
                            }
                        }
                    },
                ]}
            />
         
        </Shell>
    )

}

export default CoursePage