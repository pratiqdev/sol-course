import React, { useState } from 'react';
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
  Box
} from '@mantine/core';
import courseList from '@data/courseList';
import { heights } from '@mantine/core/lib/components/Button/Button.styles';
import connectionManager from '@utils/connection';
import { useUserContext } from '@utils/context';


/*
Create a fullscreen modal like a game start screen 
Only show on first start 
Check a localStorage var
if started = false => showStart => setStarted false

*/


export default function AppShellDemo() {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  const [shrinkNav, setShrinkNav] = useState(false)
  const { ctx, setCtx } = useUserContext()
  const { connect } = connectionManager(ctx, setCtx)
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

            <div style={{display: 'flex', alignItems: 'center', width: '100%'}}>
              <div style={{width: '100%'}}>
                <Text>Solidity Courses</Text>
              </div>

              <MediaQuery smallerThan="md" styles={{ display: 'none !important', }}>
                <div style={{display: 'flex', alignItems: 'center'}}>
                  <Link href='/courses' passHref><Button variant='light' component='a' sx={{marginRight: 10}}>Courses</Button></Link>
                  <Link href='/docs' passHref><Button variant='light' component='a' sx={{marginRight: 10}}>Docs</Button></Link>
                  <Button variant='light' onClick={connect}>Connect</Button>
                </div>
              </MediaQuery>
            </div>
          </div>
        </Header>
      }
    >
        <div style={{minHeight: 'calc(100vh - 70px)', marginTop: '70px', border: '1px solid green'}}>
            <Text>MENU: {opened.toString()}</Text>
            <Text>Basic intro, what is this, quick how to, get started callout</Text>
        </div>
    </AppShell>
  );
}