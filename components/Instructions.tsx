import {useEffect} from 'react'
import { Button, Text, MediaQuery, ActionIcon } from '@mantine/core'
import { useRouter } from 'next/router'
import Blockquote from '@instructions/Blockquote'
import CodeBlock from '@instructions/CodeBlock'
import useConnectionManager from '@utils/hooks/useConnectionManager'
import { ChevronLeft, ChevronRight } from 'tabler-icons-react'

interface IInstructionProps {
    children?: any;
}

const Instructions = (props: IInstructionProps) => {
    const { ctx, setCtx } = useConnectionManager()
    const router = useRouter()
    const routerSplit = router.asPath.split('/')
    const currentCategory = routerSplit[2]
    const currentPage = routerSplit[3]

    const components = {
        blockquote: (props:any) => <Blockquote {...props}/>,
        code: (props:any) => <CodeBlock {...props}/>,
    }


    const LeftChev = () => (
        <ChevronLeft
        size={48}
        strokeWidth={2}
        color={'#68f'}
        />
    )

    const RightChev = () => (
        <ChevronRight
            size={48}
            strokeWidth={2}
            color={'#68f'}
        />
    )
    
    const styles = {
        desktopInstructions: {
            padding: '10px', 
            paddingTop: '0', 
            paddingRight: '15px',
            marginTop: '70px', 
            width: ctx.instructionsOpen ? 'calc(45vw - 60px)' : '60px', 
            background: '#222', 
            maxHeight: 'calc(100vh - 70px)',
            minHeight: 'calc(100vh - 70px)',
            overflow: 'auto',
        },

        mobileInstructions: { 
            padding: '10px', 
            paddingTop: '0', 
            paddingBottom: '1rem',
            borderBottom: '2px solid white',
            marginTop: '70px', 
            width: '100%', 
            background: '#222', 
            height: '100%', 
            minHeight: 'calc(100vh - 70px)', 
            overflow:'hidden',
        }
    }



    return(
        <>
        <MediaQuery largerThan="md" styles={{ display: 'none !important', }}>
        
        <div style={styles.mobileInstructions}>
            <>
            <div style={{display: 'flex', width: '100%', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem'}}>
                <Text sx={{color: '#68f', fontSize: '.8rem'}}>{currentCategory} / {currentPage}</Text>
            </div>
                <span>{props.children}</span>
            </>
        </div>
        </MediaQuery>


        <MediaQuery smallerThan="md" styles={{ display: 'none !important', }}>
        <div style={styles.desktopInstructions}>
            {ctx.instructionsOpen 
            ?
                <>
                <div style={{display: 'flex', width: '100%', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem'}}>
                <Text sx={{color: '#68f', fontSize: '.8rem'}}>{currentCategory} / {currentPage}</Text>
                    <ActionIcon variant='hover' size='md' color='blue' onClick={() => setCtx({...ctx, instructionsOpen: !ctx.instructionsOpen})}><LeftChev /></ActionIcon>
                </div>
                <span>{props.children}</span>
                </>
            :
                <>
                <div style={{display: 'flex', marginTop: '1rem', marginLeft: '5px'}}>
                    <ActionIcon variant='hover' size='md' color='blue' onClick={() => setCtx({...ctx, instructionsOpen: !ctx.instructionsOpen})}><RightChev/></ActionIcon>
                </div>
                </>
            }
        </div>
        </MediaQuery>
        </>
    )
}
export default Instructions