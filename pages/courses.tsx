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
  Box,
  Grid
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import courseList from '@data/courseList';
import useConnectionManager from '@utils/hooks/useConnectionManager';
import CourseCard from '@components/CourseCard'
import { ellipseAddress } from '@utils/utilities'
import Blocky from '@components/Blocky';
import Shell from '@components/Shell'


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
  const { ctx, setCtx, connect, progress } = useConnectionManager()
  const isMobile = useMediaQuery('(max-width: 992px)');

  return(
      <Shell categoryIndex={0} hideSidebar>
          <div style={{display: 'flex', flexDirection: isMobile ? 'column-reverse' : 'row', width: '100%', margin: '0 auto', maxWidth: '1200px'}}>
              <div style={{minHeight: 'calc(100vh - 70px)', marginTop: '70px', padding: '1rem'}}>
                <Grid style={{alignItems: 'stretch', flexDirection: isMobile ? 'column' : 'row'}}>
                  {Object.entries(courseList).map(([categoryKey, categoryObject], index) => 
                    <Grid.Col key={categoryObject.title} span={isMobile ? 12 : 4}>
                      <CourseCard data={categoryObject} dataUri={categoryKey}/>
                    </Grid.Col>
                  )}
                </Grid>
              </div>
          </div>
      </Shell>
  )

  
  // return (
  //   <AppShell
  //     styles={{
  //       main: {
  //         background: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
  //         padding: '0',
  //       },
  //   }}
  //     navbarOffsetBreakpoint="md"
  //     // asideOffsetBreakpoint="sm"
  //     fixed={opened}
  //     navbar={
  //       <MediaQuery largerThan="md" styles={{ display: 'none', background: 'green' }}>
  //         <Navbar 
  //           p="md"
  //           // hiddenBreakpoint="md" 
  //           hidden={!opened} 
  //           >
  //             <Link href='/courses' passHref><Button variant='light' component='a' sx={{marginBottom: 10}}>Courses (courses)</Button></Link>
  //             <Link href='/docs' passHref><Button variant='light' component='a' sx={{marginBottom: 10}}>Docs  (courses)</Button></Link>
  //             {/* <Button variant='light' onClick={connect}>Connect</Button> */}
  //             <Blocky />
  //         </Navbar>
  //       </MediaQuery>
  //     }
  //   //   aside={
  //   //     <MediaQuery smallerThan="sm" styles={{ display: 'none' }}>
  //   //       <Aside p="md" hiddenBreakpoint="sm" width={{ sm: 200, lg: 300 }}>
  //   //         <Text>Application sidebar</Text>
  //   //       </Aside>
  //   //     </MediaQuery>
  //   //   }
  //   //   footer={
  //   //     <Footer height={60} p="md">
  //   //       Application footer
  //   //     </Footer>
  //   //   }
  //     header={
  //       <Header fixed height={70}  p="md">
  //         <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
  //           <MediaQuery largerThan="md" styles={{ display: 'none' }}>
  //             <Burger
  //               opened={opened}
  //               onClick={() => setOpened((o) => !o)}
  //               size="sm"
  //               color={theme.colors.gray[6]}
  //               mr="xl"
  //             />
  //           </MediaQuery>

  //           <div style={{display: 'flex', alignItems: 'center', width: '100%'}}>
  //             <div style={{width: '100%'}}>
  //               <Link href='/' passHref><Button variant='subtle' component='a' sx={{marginRight: 10}}><b style={{color: '#6af'}}>Ether</b><b style={{color:'white'}}>able</b></Button></Link>
  //             </div>

  //             <MediaQuery smallerThan="md" styles={{ display: 'none !important', }}>
  //               <div style={{display: 'flex', alignItems: 'center'}}>
  //                 <Link href='/courses' passHref><Button variant='light' component='a' sx={{marginRight: 10}}>Courses</Button></Link>
  //                 <Link href='/docs' passHref><Button variant='light' component='a' sx={{marginRight: 10}}>Docs</Button></Link>
  //                 {!ctx.connected 
  //                   ? <Button variant='filled' onClick={connect}>Connect</Button>
  //                   : <Button variant='filled'>{ellipseAddress(ctx.address, 4)}</Button>
  //                 }
  //               </div>
  //             </MediaQuery>
  //           </div>
  //         </div>
  //       </Header>
  //     }
  //   >
  //       <div style={{minHeight: 'calc(100vh - 70px)', marginTop: '70px', padding: '1rem'}}>
  //            <Grid style={{alignItems: 'stretch', flexDirection: isMobile ? 'column' : 'row'}}>
  //                {Object.entries(courseList).map(([categoryKey, categoryObject], index) => <Grid.Col key={categoryObject.title} span={isMobile ? 12 : 4}><CourseCard data={categoryObject} dataUri={categoryKey}/></Grid.Col>)}
  //            </Grid>
  //        </div>
  //   </AppShell>
  // );
}

export default Courses