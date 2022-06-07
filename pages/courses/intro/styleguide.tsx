import Link from 'next/link'
import Editor from '@components/Editor'
import Shell from '@components/Shell'
import Instructions from '@components/Instructions'
import CodeBlock from '@instructions/CodeBlock'
import Blockquote from '@instructions/Blockquote'
import Image from '@instructions/Image'

const CoursePage = () => {

    return(
        <Shell categoryIndex={0}>

            
<Instructions>
<h2>Style Guide</h2>

<p>These are the instructions</p>

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





</Instructions>

            <Editor 
            storage='intro/standard'
            code={`// custom code defined in 'standard' - non-mdx file (tsx)`} 
            tests={[
                {test1: 'a test'}
            ]}
            />
        </Shell>
    )

}

export default CoursePage