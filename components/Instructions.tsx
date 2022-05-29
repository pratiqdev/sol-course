import { useState } from 'react'
import { useUserContext } from '@utils/context'
import { Button, Text, MediaQuery } from '@mantine/core'
import { useRouter } from 'next/router'
import { MDXProvider } from '@mdx-js/react'
import Blockquote from '@instructions/Blockquote'
import CodeBlock from '@instructions/CodeBlock'

const Instructions = (props: any) => {
    const { ctx, setCtx } = useUserContext()
    const router = useRouter()
    const routerSplit = router.asPath.split('/')
    const currentCategory = routerSplit[2]
    const currentPage = routerSplit[3]

    const components = {
        blockquote: (props:any) => <Blockquote {...props}/>,
        code: (props:any) => <CodeBlock {...props}/>,
    }

    return(
        <>
        <MediaQuery largerThan="md" styles={{ display: 'none !important', }}>
        
        <div style={{ padding: '10px', paddingTop: '0', marginTop: '70px', width: '100%', background: '#222',}}>
            <>
            <div style={{display: 'flex', width: '100%', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem'}}>
                <Text>{currentCategory} / {currentPage}</Text>
            </div>
                <span>{props.children}</span>

                {/* <MDXProvider components={components}> */}
                    {/* <main {...props} /> */}
                    {/* {props.children} */}
                {/* </MDXProvider> */}
            </>
        </div>
        </MediaQuery>


        <MediaQuery smallerThan="md" styles={{ display: 'none !important', }}>
        <div style={{ padding: '10px', paddingTop: '0', marginTop: '70px', width: ctx.instructionsOpen ? 'calc(45vw - 60px)' : '60px', background: '#222', minHeight: 'calc(100vh - 70px)'}}>
            {ctx.instructionsOpen 
            ?
                <>
                <div style={{display: 'flex', width: '100%', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem'}}>
                    <Text>{currentCategory} / {currentPage}</Text>
                    <Button style={{minWidth: '2rem', padding: '0'}} onClick={() => setCtx({...ctx, instructionsOpen: !ctx.instructionsOpen})}>{`<`}</Button>
                </div>
                <span>{props.children}</span>
                {/* <MDXProvider components={components}> */}
                    {/* <main {...props} /> */}
                    {/* {props.children} */}
                {/* </MDXProvider> */}
                </>
            :
                <>
                <div style={{display: 'flex', marginTop: '1rem'}}>
                    <Button style={{minWidth: '2rem', padding: '0'}} onClick={() => setCtx({...ctx, instructionsOpen: !ctx.instructionsOpen})}>{`>`}</Button>
                </div>
                </>
            }
        </div>
        </MediaQuery>
        </>
    )
}
export default Instructions