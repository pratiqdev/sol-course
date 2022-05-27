import Link from 'next/link'
import courseList from '@data/courseList'
import React, { useState } from 'react';
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
  Grid
} from '@mantine/core';
import connectionManager from '@utils/connection';
import { useUserContext } from '@utils/context';
import CourseCard from '@components/CourseCard'


/*
Create a fullscreen modal like a game start screen 
Only show on first start 
Check a localStorage var
if started = false => showStart => setStarted false

*/


const Courses = () => {
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
              <div style={{display: 'flex', alignItems: 'center'}}>
                <Link href='courses' passHref><Button variant='outline' component='a' sx={{marginRight: 10}}>Courses</Button></Link>
                <Link href='docs' passHref><Button variant='light' component='a' sx={{marginRight: 10}}>Docs</Button></Link>
                <Button variant='light' onClick={connect}>Connect</Button>
              </div>
            </div>
          </div>
        </Header>
      }
    >
        <div style={{minHeight: 'calc(100vh - 70px)', marginTop: '70px', border: '1px solid green', padding: '1rem'}}>
            <Grid style={{alignItems: 'stretch'}}>
                {courseList.map(x => <Grid.Col key={x.title} span={4}><CourseCard data={x} /></Grid.Col>)}
            </Grid>
        </div>
    </AppShell>
  );
}

export default Courses