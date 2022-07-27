import React from 'react'
import Shell from '@components/Shell'
import { Button } from '@mantine/core'
import { useMediaQuery } from '@pratiq/hooks'

const DocSection = (props:any) => {
    return (
        <div id={props.title.replace(/ /g, '-').toLowerCase()} style={{border: '1px solid grey', width: '100%', padding:'0 1rem', borderRadius: '.5rem', marginBottom: '1rem'}}>
            <h2>{props.title}</h2>
           {props.children}
        </div>
    )
}

const DocLink = (props:any) => <a href={'#'+props.text.replace(/ /g, '-').toLowerCase()}><Button variant='subtle'>{props.text}</Button></a>

const DocsHome = () => {
    const isMobile = useMediaQuery('max-width: 900px')
    return(
        <Shell categoryIndex={0} hideNavbar>
            <div style={{display: 'flex', flexDirection: isMobile ? 'column-reverse' : 'row', width: '100%', margin: '0 auto', maxWidth: '1200px'}}>
                <div style={{padding: '1rem',  display: 'flex', flexDirection: 'column', width: '100%', marginTop: isMobile ? '0' : '70px'}}>

                    <DocSection title='Some Docs'>
                        <p>This is a place to explain the usage and functions of components, editors, how to compile, how to view compiled output, how to reset progress for the connected used, etc.</p>
                    </DocSection>


                    <DocSection title='Taking a Course'>
                        <p>Courses can be taken in any order but, should be finished in order for best results. </p>
                    </DocSection>


                    <DocSection title='Using the Editor'>
                        <p>This is a place to explain the usage and functions of components, editors, how to compile, how to </p>
                    </DocSection>





                </div>
                <div style={{background: '#113', height: isMobile ? 'auto' : 'calc(100vh - 70px)', marginTop: '70px', width: 'auto', minWidth: '14rem', padding: '1rem', display: 'flex', flexDirection: 'column'}}>
                    <DocLink text='Taking a Course' />
                    <DocLink text='Using the Editor' />
                    <DocLink text='Taking a Course' />
                    <DocLink text='Taking a Course' />
                </div>
            </div>
        </Shell>
    )

}

export default DocsHome