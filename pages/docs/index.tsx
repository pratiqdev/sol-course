import React from 'react'
import Shell from '@components/Shell'
import { Button } from '@mantine/core'
import { useMediaQuery } from '@pratiq/hooks'

type DocType = {
    title: string;
    subtitle: string;
    description: string;
    content: React.JSXElementConstructor<any>;
}

const data:DocType[] = [
    {
        title: 'Self Referential',
        subtitle: 'meta meta meta',
        description: 'Get real weird with meta content',
        content: () => <p>Ayo</p>
    },
    {
        title: 'Self Referential 2',
        subtitle: 'meta meta meta',
        description: 'Get real weird with meta content',
        content: () => <p>Ayo</p>
    },
    {
        title: 'Self Referential 3',
        subtitle: 'meta meta meta',
        description: 'Get real weird with meta content',
        content: () => <p>Ayo</p>
    },
    {
        title: 'Self Referential 4',
        subtitle: 'meta meta meta',
        description: 'Get real weird with meta content',
        content: () => <p>Ayo</p>
    },
    {
        title: 'Self Referential 5',
        subtitle: 'meta meta meta',
        description: 'Get real weird with meta content',
        content: () => <p>Ayo</p>
    },
    {
        title: 'Self Referential 6',
        subtitle: 'meta meta meta',
        description: 'Get real weird with meta content',
        content: () => <p>Ayo</p>
    },
    {
        title: 'Self Referential 7',
        subtitle: 'meta meta meta',
        description: 'Get real weird with meta content',
        content: () => <p>Ayo</p>
    },
    {
        title: 'Self Referential 8',
        subtitle: 'meta meta meta',
        description: 'Get real weird with meta content',
        content: () => <p>Ayo</p>
    },
    {
        title: 'Self Referential 9',
        subtitle: 'meta meta meta',
        description: 'Get real weird with meta content',
        content: () => <p>Ayo</p>
    },


    {
        title: 'Self Referential 10',
        subtitle: 'meta meta meta',
        description: 'Get real weird with meta content',
        content: () => <p>Ayo</p>
    },
    {
        title: 'Self Referential 11',
        subtitle: 'meta meta meta',
        description: 'Get real weird with meta content',
        content: () => <p>Ayo</p>
    },
    {
        title: 'Self Referential 12',
        subtitle: 'meta meta meta',
        description: 'Get real weird with meta content',
        content: () => <p>Ayo</p>
    },
    {
        title: 'Self Referential 13',
        subtitle: 'meta meta meta',
        description: 'Get real weird with meta content',
        content: () => <p>Ayo</p>
    },
    {
        title: 'Self Referential 14',
        subtitle: 'meta meta meta',
        description: 'Get real weird with meta content',
        content: () => <p>Ayo</p>
    },
    {
        title: 'Self Referential 15',
        subtitle: 'meta meta meta',
        description: 'Get real weird with meta content',
        content: () => <p>Ayo</p>
    },
    {
        title: 'Self Referential 16',
        subtitle: 'meta meta meta',
        description: 'Get real weird with meta content',
        content: () => <p>Ayo</p>
    },
    {
        title: 'Self Referential 17',
        subtitle: 'meta meta meta',
        description: 'Get real weird with meta content',
        content: () => <p>Ayo</p>
    },
    {
        title: 'Self Referential 18',
        subtitle: 'meta meta meta',
        description: 'Get real weird with meta content',
        content: () => <p>Ayo</p>
    },
    {
        title: 'Self Referential 19',
        subtitle: 'meta meta meta',
        description: 'Get real weird with meta content',
        content: () => <p>Ayo</p>
    },
    {
        title: 'Self Referential 20',
        subtitle: 'meta meta meta',
        description: 'Get real weird with meta content',
        content: () => <p>Ayo</p>
    },
    {
        title: 'Self Referential 21',
        subtitle: 'meta meta meta',
        description: 'Get real weird with meta content',
        content: () => <p>Ayo</p>
    },
    {
        title: 'Self Referential 22',
        subtitle: 'meta meta meta',
        description: 'Get real weird with meta content',
        content: () => <p>Ayo</p>
    },
    {
        title: 'Self Referential 23',
        subtitle: 'meta meta meta',
        description: 'Get real weird with meta content',
        content: () => <p>Ayo</p>
    },
    {
        title: 'Self Referential 24',
        subtitle: 'meta meta meta',
        description: 'Get real weird with meta content',
        content: () => <p>Ayo</p>
    },
]

const DocSection = (props:any) => {
    return (
        <div id={props.title.replace(/ /g, '-').toLowerCase()} style={{border: '1px solid grey', width: '100%', padding:'0 1rem', borderRadius: '.5rem', marginBottom: '1rem'}}>
            <h2 style={{marginBottom: '0'}}>{props.title}</h2>
           {props.children}
        </div>
    )
}

const DocLink = (props:any) => <a href={'#'+props.text.replace(/ /g, '-').toLowerCase()}><Button variant='subtle'>{props.text}</Button></a>

const DocsHome = () => {
    const isMobile = useMediaQuery('max-width: 900px')
    return(
        <Shell categoryIndex={0} hideSidebar >
            <div style={{display: 'flex', flexDirection: isMobile ? 'column-reverse' : 'row', width: '100%', margin: '0 auto', }}>
                <div style={{padding: '1rem',  display: 'flex', flexDirection: 'column', width: '100%', marginTop: isMobile ? '0' : '70px', overflowX: 'auto', maxHeight: 'calc(100vh - 70px)'}}>

                    <DocSection title='Some Docs'>
                        <p>This is a place to explain the usage and functions of components, editors, how to compile, how to view compiled output, how to reset progress for the connected used, etc.</p>
                    </DocSection>


                    <DocSection title='Taking a Course'>
                        <p>Courses can be taken in any order but, should be finished in order for best results. </p>
                    </DocSection>


                    <DocSection title='Using the Editor'>
                        <p>This is a place to explain the usage and functions of components, editors, how to compile, how to </p>
                    </DocSection>

                    {data.map((x, i) => 
                        <DocSection key={i} title={x.title} >
                            <small>{x.subtitle}</small>
                            <p>{x.description} </p>
                            {x.content}
                        </DocSection>
                    )}





                </div>
                <div style={{ background: '#113', height: isMobile ? '0px' : 'calc(100vh - 70px)', marginTop: '70px', width: 'auto', minWidth: '14rem', padding: isMobile ? '0' : '1rem', display: 'flex', top: 0, flexDirection: 'column', overflowX: 'auto', maxHeight: isMobile ? '0rem' : 'calc(100vh - 70px)' }}>
                    <DocLink text='Taking a Course' />
                    <DocLink text='Using the Editor' />
                    <DocLink text='Taking a Course' />
                    <DocLink text='Taking a Course' />

                    {data.map((x, i) =>
                        <DocLink key={i} text={x.title} >
                            <p>{x.description} </p>
                        </DocLink>
                    )}
                </div>
            </div>
        </Shell>
    )

}

export default DocsHome