import React, { useState, useEffect } from 'react';
import Link from 'next/link'
import {
  AppShell,
  Navbar,
  Header,
  Footer,
  Aside,
  Text,
  MediaQuery,
  Burger,
  useMantineTheme,
  Accordion,
  Button,
  Container,
  Box,
  ActionIcon
} from '@mantine/core';
import courseList from '@data/courseList';
import { heights } from '@mantine/core/lib/components/Button/Button.styles';
import useConnectionManager from '@utils/hooks/useConnectionManager';
import { useGlobalContext } from '@utils/context';
import { ellipseAddress } from '@utils/utilities';

import {
  Settings,
  Home2
} from 'tabler-icons-react'
import Blocky from '@components/Blocky';


/*
Create a fullscreen modal like a game start screen 
Only show on first start 
Check a localStorage var
if started = false => showStart => setStarted false

*/

const Debugger = (props) => {
  const { 
    ctx, 
    setCtx, 
    
    connect, 
    reset, 
    
    progress, 
} = useConnectionManager()

  const [open, setOpen] = useState(true)

  const [progressState, setProgressState] = useState('empty')
  const [contextState, setContextState] = useState('empty')

  useEffect(()=>{
    let context = {...ctx}
    delete context['w3m']
    setContextState(JSON.stringify(context, null, 2))
    setProgressState(JSON.stringify(progress, null, 2))

  },[ctx, progress])
  

  return(
    <div className={open ? 'debugger-open' : 'debugger-closed'} onClick={()=>setOpen(b=>!b)}>
        <h4>Context</h4>
        <pre>{contextState}</pre>
        <hr/>
        <h4>Progress</h4>
        <pre>{progressState}</pre>
    </div>
  )
}



export default function AppShellDemo() {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  const [shrinkNav, setShrinkNav] = useState(false)
  const { connect, ctx, setCtx} = useConnectionManager()
  return (
    <AppShell
      styles={{
        main: {
          background: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
          padding: '0',
        },
    }}
      navbarOffsetBreakpoint="md"
      // asideOffsetBreakpoint="sm"
      fixed={opened}
      navbar={
        <MediaQuery largerThan="md" styles={{ display: 'none', background: 'green' }}>
          <Navbar 
            p="md"
            // hiddenBreakpoint="md" 
            hidden={!opened} 
            >
              <Link href='/courses' passHref><Button variant='light' component='a' sx={{marginBottom: 10}}>Courses</Button></Link>
              <Link href='/docs' passHref><Button variant='light' component='a' sx={{marginBottom: 10}}>Docs</Button></Link>
              <Button variant='light' onClick={connect}>Connect</Button>
          </Navbar>
        </MediaQuery>
      }
    //   aside={
    //     <MediaQuery smallerThan="sm" styles={{ display: 'none' }}>
    //       <Aside p="md" hiddenBreakpoint="sm" width={{ sm: 200, lg: 300 }}>
    //         <Text>Application sidebar</Text>
    //       </Aside>
    //     </MediaQuery>
    //   }
    //   footer={
    //     <Footer height={60} p="md">
    //       Application footer
    //     </Footer>
    //   }
      header={
        <Header fixed height={70}  p="md">
          <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
            <MediaQuery largerThan="md" styles={{ display: 'none' }}>
              <Burger
                opened={opened}
                onClick={() => setOpened((o) => !o)}
                size="sm"
                color={theme.colors.gray[6]}
                mr="xl"
              />
            </MediaQuery>

            <div style={{display: 'flex', alignItems: 'center', width: '100%', flexWrap: 'nowrap'}}>

              <div style={{width: '100%', display: 'flex'}}>
                {/* <Link href='/' passHref><ActionIcon><Home2 size={18}/></ActionIcon></Link> */}
              <Link href='/' passHref><Button variant='subtle' component='a' sx={{marginRight: 10}}>Home</Button></Link>

                <MediaQuery smallerThan="md" styles={{ display: 'none !important', }}>
                  <div style={{display: 'flex', }}>
                    <Link href='/courses' passHref><Button variant='subtle' component='a' sx={{marginRight: 10}}>Courses</Button></Link>
                    <Link href='/docs' passHref><Button variant='subtle' component='a' sx={{marginRight: 10}}>Docs</Button></Link>
                  </div>
                </MediaQuery>
              </div>

              <MediaQuery smallerThan="md" styles={{ display: 'none !important', }}>
                <div style={{display: 'flex', alignItems: 'center'}}>
                  {!ctx.connected 
                    ? <Button variant='filled' onClick={connect} sx={{marginRight: '10px'}}>Connect</Button>
                    : <Button variant='filled'  sx={{marginRight: '10px'}}>{ellipseAddress(ctx.address, 4)}</Button>
                  }
                  <Blocky />
                </div>
              </MediaQuery>
            </div>
          </div>
        </Header>
      }
    >
        <div style={{minHeight: 'calc(100vh - 70px)', marginTop: '70px', }}>
            <Text>Basic intro, what is this, quick how to, get started callout</Text>

            <div className='quik-menu'>
              <Link href='/courses' passHref><Button variant='light' component='a'>Courses</Button></Link>
              <Link href='/tests/access-test' passHref><Button variant='light' component='a' >Access Test</Button></Link>
              <Link href='/tests/progress-test' passHref><Button variant='light' component='a' >Storage Test</Button></Link>

            </div>
        </div>
    </AppShell>
  );
}