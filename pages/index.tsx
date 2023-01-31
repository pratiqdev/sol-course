import React, { useState, useEffect } from 'react';
import Link from 'next/link'
import {
  AppShell,
  Navbar,
  Header,
  Text,
  MediaQuery,
  Burger,
  useMantineTheme,
  Button,
  Grid,
} from '@mantine/core';
import useConnectionManager from '@utils/hooks/useConnectionManager';
import { ellipseAddress } from '@utils/utilities';
import { FileX } from 'tabler-icons-react';
import { useMediaQuery } from '@mantine/hooks';
import courseList from '@data/courseList';
import CourseCard from '@components/CourseCard'
import Blocky from '@components/Blocky';
import Shell from '@components/Shell'





const HomePage = () => {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  const { connect, ctx, setCtx} = useConnectionManager()
  const isMobile = useMediaQuery('(max-width: 992px)');

  return(
      <Shell categoryIndex={0} hideNavbar>
          <div style={{minHeight: 'calc(100vh - 70px)', marginTop: '70px', display: 'flex', flexDirection: 'column'}}>

           <div style={{background: '#446', display: 'flex', flexDirection:'column', justifyContent: 'center', alignItems: 'center', marginBottom: '1rem', padding: '2rem'}}>
               <Text variant='text' style={{fontSize: '3rem', fontWeight: 'normal', fontFamily: 'monospace', color: '#fff'}}><b style={{color: '#6af'}}>Ether</b><b style={{color:'white'}}>able</b></Text>
               <Text variant='text' style={{fontSize: '3rem', fontWeight: 'normal', fontFamily: 'monospace', color: '#fff'}}>Solidity Courses</Text>

               <p>Study up on your solidity / ethereum / blockchain basics with these interactive courses</p>
           </div>

          <Grid style={{padding: '.75rem', paddingRight: '1rem'}} gutter={20}>
               <Grid.Col lg={4} md={6} sm={12}>
                   <div style={{background: '#224', borderRadius: '.5rem', padding: '1rem', display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%'}}>
                       <h3>Courses</h3>
                       <p style={{flex: 1}}>Get started on the Solidity courses</p>
                       <Link href='/courses' passHref><Button variant='gradient' component='a' fullWidth>View Courses</Button></Link>
                   </div>
               </Grid.Col>
               <Grid.Col lg={4} md={6} sm={12}>
                   <div style={{background: '#224', borderRadius: '.5rem', padding: '1rem', display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%'}}>
                       <h3>Access Test</h3>
                       <p style={{flex: 1}}>Test access to restricted and non-restricted courses</p>
                       <Link href='/tests/access-test' passHref><Button variant='gradient' component='a' fullWidth>Access Test</Button></Link>
                   </div>
               </Grid.Col>
               <Grid.Col lg={4} md={6} sm={12}>
                   <div style={{background: '#224', borderRadius: '.5rem', padding: '1rem', display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%'}}>
                       <h3>Storage Test</h3>
                       <p style={{flex: 1}}>Test context storage modification</p>
                       <Link href='/tests/progress-test' passHref><Button variant='gradient' component='a' fullWidth>Storage Test</Button></Link>
                   </div>
               </Grid.Col>
               <Grid.Col lg={4} md={6} sm={12}>
                   <div style={{background: '#224', borderRadius: '.5rem', padding: '1rem', display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%'}}>
                       <h3>Placeholder</h3>
                       <p style={{flex: 1}}>A placeholder for another grid column item</p>
                      <Button variant='gradient' component='a' fullWidth>Placeholder</Button>
                   </div>
               </Grid.Col>
              
           </Grid>



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
  //             <Link href='/courses' passHref><Button variant='light' component='a' sx={{marginBottom: 10}}>Courses (home)</Button></Link>
  //             <Link href='/docs' passHref><Button variant='light' component='a' sx={{marginBottom: 10}}>Docs (home)</Button></Link>
  //             <Button variant='light' onClick={connect}>Connect (/pages/index.tsx)</Button>
  //         </Navbar>
  //       </MediaQuery>
  //     }

  //   header={
  //     <Header fixed height={70}  p="md">
  //       <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
  //         <MediaQuery largerThan="md" styles={{ display: 'none' }}>
  //           <Burger
  //             opened={opened}
  //             onClick={() => setOpened((o) => !o)}
  //             size="sm"
  //             color={theme.colors.gray[6]}
  //             mr="xl"
  //           />
  //         </MediaQuery>

  //         <div style={{display: 'flex', alignItems: 'center', width: '100%'}}>
  //           <div style={{width: '100%'}}>
  //             <Link href='/' passHref><Button variant='subtle' component='a' sx={{marginRight: 10}}><b style={{color: '#6af'}}>Ether</b><b style={{color:'white'}}>able</b></Button></Link>
  //           </div>
  //           <MediaQuery smallerThan="md" styles={{ display: 'none !important', }}>
  //           <div style={{display: 'flex', alignItems: 'center'}}>
  //             <Link href='/courses' passHref><Button variant='light' component='a' sx={{marginRight: 10}}>Courses</Button></Link>
  //             <Link href='/docs' passHref><Button variant='light' component='a' sx={{marginRight: 10}}>Docs</Button></Link>
  //             {(!ctx.connected)
  //               ? <Button variant='filled' onClick={connect} loading={ctx.connecting}>Connect</Button>
  //               : <Button variant='filled'>{ellipseAddress(ctx.address || '', 4)}</Button>
  //             }
  //           </div>
  //           </MediaQuery>
  //         </div>
  //       </div>
  //     </Header>
  //   }
  //   >
  //       <div style={{minHeight: 'calc(100vh - 70px)', marginTop: '70px', display: 'flex', flexDirection: 'column'}}>

  //           <div style={{background: '#446', display: 'flex', flexDirection:'column', justifyContent: 'center', alignItems: 'center', marginBottom: '1rem', padding: '2rem'}}>
  //               <Text variant='text' style={{fontSize: '3rem', fontWeight: 'normal', fontFamily: 'monospace', color: '#fff'}}><b style={{color: '#6af'}}>Ether</b><b style={{color:'white'}}>able</b></Text>
  //               <Text variant='text' style={{fontSize: '3rem', fontWeight: 'normal', fontFamily: 'monospace', color: '#fff'}}>Solidity Courses</Text>

  //               <p>Study up on your solidity / ethereum / blockchain basics with these interactive courses</p>
  //           </div>

  //           <Grid style={{padding: '.75rem', paddingRight: '1rem'}} gutter={0}>
  //               <Grid.Col lg={4} md={6} sm={12}>
  //                   <div style={{background: '#224', borderRadius: '.5rem', margin: '1rem', padding: '1rem', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
  //                       <h3>Courses</h3>
  //                       <p>Get started on the Solidity courses</p>
  //                       <Link href='/courses' passHref><Button variant='gradient' component='a' fullWidth>View Courses</Button></Link>
  //                   </div>
  //               </Grid.Col>
  //               <Grid.Col lg={4} md={6} sm={12}>
  //                   <div style={{background: '#224', borderRadius: '.5rem', margin: '1rem', padding: '1rem', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
  //                       <h3>Access Test</h3>
  //                       <p>Test access to restricted and non-restricted courses</p>
  //                       <Link href='/tests/access-test' passHref><Button variant='gradient' component='a' fullWidth>Access Test</Button></Link>
  //                   </div>
  //               </Grid.Col>
  //               <Grid.Col lg={4} md={6} sm={12}>
  //                   <div style={{background: '#224', borderRadius: '.5rem', margin: '1rem', padding: '1rem', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
  //                       <h3>Storage Test</h3>
  //                       <p>Test context storage modification</p>
  //                       <Link href='/tests/progress-test' passHref><Button variant='gradient' component='a' fullWidth>Storage Test</Button></Link>
  //                   </div>
  //               </Grid.Col>
  //               <Grid.Col lg={4} md={6} sm={12}>
  //                   <div style={{background: '#224', borderRadius: '.5rem', margin: '1rem', padding: '1rem', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
  //                       <h3>Placeholder</h3>
  //                       <p>A placeholder for another grid column item</p>
  //                      <Button variant='gradient' component='a' fullWidth>Placeholder</Button>
  //                   </div>
  //               </Grid.Col>
                
  //           </Grid>



  //       </div>
  //   </AppShell>
  // );
}

export default HomePage