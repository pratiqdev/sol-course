import {useEffect, useRef} from 'react'
import { Button, Text, MediaQuery, ActionIcon } from '@mantine/core'
import { useRouter } from 'next/router'
import Blockquote from '@instructions/Blockquote'
import CodeBlock from '@instructions/CodeBlock'
import useConnectionManager from '@utils/hooks/useConnectionManager'
import { ChevronLeft, ChevronRight } from 'tabler-icons-react'

interface IInstructionFullProps {
    children?: any;
    categoryUri: string;
    courseUri: string;
}

const Instructions = (props: IInstructionFullProps) => {
    const { ctx, setCtx, useUriStore } = useConnectionManager()
    const [store, setStore] = useUriStore(props.categoryUri, props.courseUri)

    const router = useRouter()
    const splitRoute = router.pathname.replace('/courses/', '').split('/')
  
    // console.log('ROUTER PATH:', splitRoute)
    const categoryUri = splitRoute[0]
    const courseUri = splitRoute[1]

    
    // const routerSplit = router.asPath.split('/')
    // const currentCategory = routerSplit[2]
    // const currentPage = routerSplit[3]

    const isComplete = useRef(false)


    useEffect(()=>{
        if(ctx.connected && ctx.address && store && isComplete.current === false){
            isComplete.current = true
            console.log('Auto complete - ', {category: categoryUri, course: courseUri})
            setStore((s:any) => ({...s, complete: true, noBanner: true}))
        }
    }, [store])


    return(
        <div style={{
            background: '#222', 
            width: '100%',
            minHeight: 'calc(100vh)',
            overflow: 'auto'
        }}>
        <div style={{
            padding: '20px', 
            paddingTop: '0', 
            paddingRight: '15px',
            marginTop: '70px', 
            width: ctx.instructionsOpen ? 'calc(100vw - 60px)' : '60px', 
            background: '#222', 
            overflow: 'auto',
            maxWidth: '800px',
            marginLeft: 'auto',
            marginRight: 'auto'
        }}>
            <div style={{display: 'flex', width: '100%', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem'}}>
                <Text sx={{color: '#68f', fontSize: '.8rem'}}>{categoryUri} / {courseUri}</Text>
            </div>
            <span>{props.children}</span>
        </div>
        </div>
    )
}
export default Instructions