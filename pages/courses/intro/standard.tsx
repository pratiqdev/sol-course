import Editor from '@components/Editor'
import Shell from '@components/Shell'
import Instructions from '@components/Instructions'
import Blockquote from '@instructions/Blockquote'
import Link from 'next/link'
import CodeBlock from '@instructions/CodeBlock'

const CoursePage = () => {

    return(
        <Shell>

            
<Instructions>
<h2>Intro - standard.tsx</h2>

<p>These are the instructions</p>

<p>Custom components are <b>easier</b> to use in <i>plain</i> TSX instead of MDX</p>

Here is a <Link href='https://google.com'>Link to Google</Link>
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

<CodeBlock lang='jsx' code={`
    const thang = () => <pre>What?</pre>
`} />
                 


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