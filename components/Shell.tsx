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
  Box
} from '@mantine/core';
import courseList from '@data/courseList';
import { useUserContext } from '@utils/context';
import connectionManager from '@utils/connection';
import { useRouter } from 'next/router';
import { useAccordionState } from '@mantine/core';

const Shell = (props: any) => {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  const [shrinkNav, setShrinkNav] = useState(false)
  const { ctx, setCtx } = useUserContext()
  const { connect } = connectionManager(ctx, setCtx)
  const router = useRouter()
  const routerSplit = router.asPath.split('/')
  const currentCategory = routerSplit[2]
  const currentPage = routerSplit[3]
  //@ts-ignore
  const currentAccIndex = courseList.indexOf(courseList.find((x, i) => x.title.toLowerCase() === currentCategory.toLowerCase().replace('-',' '))) || 0
  console.log('currentCategory:', currentCategory)
  console.log('currentPage:', currentPage)
  console.log('currentIndex:', currentAccIndex)
  const [accordionState, handlers] = useAccordionState({ total: courseList.length, initialItem: currentAccIndex });


  return (
    <AppShell
      styles={{
        main: {
          background: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
          padding: 0,
        },
      }}
      navbarOffsetBreakpoint="md"
    //   asideOffsetBreakpoint="sm"
      fixed
      navbar={
        <Navbar p="md" hiddenBreakpoint="md" hidden={!opened} width={{sm: 60, lg: ctx.navOpen ? '20vw' : 60 }}>
            {/* <Button style={{padding: '5px', width: '2rem'}} onClick={()=> setShrinkNav(o => !o)}>{shrinkNav ? `>` : `<`}</Button> */}
            <div style={{display: 'flex', width: '100%', justifyContent: 'space-between', alignItems: 'center'}}>
                    {ctx.navOpen && <Text>Courses</Text>}
                    <Button style={{minWidth: '2rem', padding: '0'}} onClick={() => setCtx({...ctx, navOpen: !ctx.navOpen})}>{!ctx.navOpen ? `>` : `<`}</Button>
                </div>
            {ctx.navOpen &&
            <Accordion state={accordionState} onChange={handlers.setState} offsetIcon={false} >
              {courseList.map((x,i) => 
                <Accordion.Item key={x.title} label={x.title} style={{background: i === currentAccIndex ? '#335' : '#222', fontSize: '.8rem'}}>
                    {x.courses.map(z => <Box key={z.file} sx={{padding: '.25rem .5rem',marginTop: '.5rem', minWidth: '100%','&:hover': { background: '#222'}}}><Link href={`/courses/${z.file}`}>{z.title}</Link></Box>)}
                </Accordion.Item>
              )}
          </Accordion>
            }
        </Navbar>
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
              <div style={{display: 'flex', alignItems: 'center'}}>
                <Link href='/courses' passHref><Button variant='light' component='a' sx={{marginRight: 10}}>Courses</Button></Link>
                <Link href='/docs' passHref><Button variant='light' component='a' sx={{marginRight: 10}}>Docs</Button></Link>
                <Button variant='light' onClick={connect}>Connect</Button>
              </div>
            </div>
          </div>
        </Header>
      }
    >
    <div style={{display: 'flex', justifyContent: 'stretch', overflow: 'hidden', 
        // marginLeft: shrinkNav ? '60px' : '400px', 
        marginLeft: ctx.navOpen ? '20vw' : 60 ,
        }}>
        {props.children}
    </div>

    </AppShell>
  );
}

export default Shell
