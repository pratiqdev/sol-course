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
  Box,
  ActionIcon
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import courseList from '@data/courseList';
import { useRouter } from 'next/router';
import { useAccordionState } from '@mantine/core';
import { ellipseAddress } from '@utils/utilities';
import AccessContainer from '@components/AccessContainer'
import useConnectionManager from '@utils/hooks/useConnectionManager'
import StatusBadge from '@components/StatusBadge'
import { ChevronLeft, ChevronRight } from 'tabler-icons-react';
import Blocky from './Blocky';

interface ShellProps{
  restricted?: any;
  children?: any;
  categoryIndex: number;
}


const CompletionBanner = () => {
  const {ctx, setCtx} = useConnectionManager()
  const [showBanner, setShowBanner] = useState(false)

  useEffect(()=>{
    if(ctx.showCompleteBanner){
      setShowBanner(true)
      console.log('COMPLETE CTX CHANGE:', ctx.showCompleteBanner)
      setCtx({...ctx, showCompleteBanner: false})
    }else{
      console.log('COMPLETE CTX CHANGE:', ctx.showCompleteBanner)
    }
  },[ctx])

  const handleClose = () => {
    setShowBanner(false)
    setCtx({...ctx, showCompleteBanner: false})
  }


  if(showBanner){
    return(
      <div style={{position: 'fixed', height: '100vh', width: '100vw', top: '0', left: '0', zIndex: '1000', background: '#0f03', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          <p>Complete banner!</p>
          <Button onClick={handleClose}>Close Banner</Button>
      </div>
    )
  }else{
    return null
  }
}


const Shell = (props: ShellProps) => {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  const [shrinkNav, setShrinkNav] = useState(false)
  const { ctx, setCtx, connect, checkCompletion } = useConnectionManager()
  const router = useRouter()
  const routerSplit = router.asPath.split('/')
  const currentCategory = routerSplit[2]
  const currentPage = routerSplit[3]
  //@ts-ignore
  // const currentAccIndex = courseList.indexOf(courseList.find((x, i) => x.title.toLowerCase() === currentCategory.toLowerCase().replace('-',' '))) || 0
  // console.log('currentCategory:', currentCategory)
  // console.log('currentPage:', currentPage)
  // console.log('currentIndex:', props.categoryIndex)
  const [accordionState, handlers] = useAccordionState({ total: Object.entries(courseList).length, initialItem: props.categoryIndex || 0 });
  const isMobile = useMediaQuery('(max-width: 992px)');

  let fixedNav = true
  if(opened && isMobile){
    // console.log('AAA')
    fixedNav = true
  }else if(!opened && isMobile){
    // console.log('BBB')
    fixedNav = false
  }else if(opened && !isMobile){
    // console.log('CCC')
  }else{
    // console.log('DDD')
    fixedNav = true
  }


  const handleConnect = () => {
    setOpened(false)
    connect()
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


  return (
    <AppShell
      styles={{
        main: {
          background: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
          padding: '0',
          overflow: 'hidden',
        },
      }}
      navbarOffsetBreakpoint="md"
      fixed={fixedNav}



      navbar={
        <>
        <MediaQuery smallerThan="md" styles={{ display: 'none !important'}}>
          <Navbar p="md" hiddenBreakpoint="md" hidden={!opened} width={{md: ctx.navOpen ? '20vw' : 60 }}>
              {/* <Button style={{padding: '5px', width: '2rem'}} onClick={()=> setShrinkNav(o => !o)}>{shrinkNav ? `>` : `<`}</Button> */}
              <div style={{display: 'flex', width: '100%', justifyContent: 'space-between', alignItems: 'center'}}>
                      {ctx.navOpen && <Text>Courses</Text>}
                      <ActionIcon variant='hover' size='md' color='blue' onClick={() => setCtx({...ctx, navOpen: !ctx.navOpen})}>{!ctx.navOpen ? <RightChev /> : <LeftChev />}</ActionIcon>
                  </div>
              {ctx.navOpen &&
              <Accordion state={accordionState} onChange={handlers.setState} offsetIcon={false} >
                {Object.entries(courseList).map(([categoryUri, categoryObject],i) => 
                  <Accordion.Item key={categoryObject.title} label={categoryObject.title} style={{background: i === props.categoryIndex ? '#223' : '#222', fontSize: '.8rem'}}>
                      {Object.entries(categoryObject.courses).map(([courseUri, courseObject]) => {

                        return(
                          <Box key={courseObject.file} sx={{padding: '.25rem .5rem',marginTop: '.5rem', marginLeft: '-10px', marginRight: '-10px',cursor: 'pointer', minWidth: '100%', borderBottom: '1px solid transparent', '&:hover': { borderBottom: '1px solid #555'}}}>
                            <StatusBadge path={courseObject.file}/> <Link href={`/courses/${courseObject.file}`}>{courseObject.title}</Link>
                          </Box>
                        )}


                      )}
                  </Accordion.Item>
                )}
            </Accordion>
              }
          </Navbar>
        </MediaQuery>
        <MediaQuery largerThan="md" styles={{ display: 'none !important',}}>
          <Navbar p="md" hiddenBreakpoint="md" hidden={!opened} width={{md: ctx.navOpen ? '20vw' : 60 }}>
            <Link href='/courses' passHref><Button variant='light' component='a' sx={{marginBottom: 10}}>Courses</Button></Link>
            <Link href='/docs' passHref><Button variant='light' component='a' sx={{marginBottom: 10}}>Docs</Button></Link>
            <Button variant='light' sx={{marginBottom: 10}} onClick={handleConnect}>Connect</Button>
         
            <Accordion state={accordionState} onChange={handlers.setState} offsetIcon={false} >
                {Object.entries(courseList).map(([categoryUri, categoryObject],i) => 
                  <Accordion.Item key={categoryObject.title} label={categoryObject.title} style={{background: i === props.categoryIndex ? '#223' : '#222', fontSize: '.8rem'}}>
                      {Object.entries(categoryObject.courses).map(([courseUri, courseObject]) => {

                        return(
                          <Box key={courseObject.file} sx={{padding: '.25rem .5rem',marginTop: '.5rem', marginLeft: '-10px', marginRight: '-10px',cursor: 'pointer', minWidth: '100%', borderBottom: '1px solid transparent', '&:hover': { borderBottom: '1px solid #555'}}}>
                            <StatusBadge path={courseObject.file}/> <Link href={`/courses/${courseObject.file}`}>{courseObject.title}</Link>
                          </Box>
                        )}


                      )}
                  </Accordion.Item>
                )}
            </Accordion>
          </Navbar>
        </MediaQuery>
        </>
      }




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
                <Link href='/' passHref><Button variant='subtle' component='a' sx={{marginRight: 10}}>ChiptosX Sol</Button></Link>
              </div>
              <MediaQuery smallerThan="md" styles={{ display: 'none !important', }}>
              <div style={{display: 'flex', alignItems: 'center'}}>
                <Link href='/courses' passHref><Button variant='light' component='a' sx={{marginRight: 10}}>Courses</Button></Link>
                <Link href='/docs' passHref><Button variant='light' component='a' sx={{marginRight: 10}}>Docs</Button></Link>
                <Blocky />
                {/* {(!ctx.connected)
                  ? <Button variant='filled' onClick={handleConnect} loading={ctx.connecting}>Connect</Button>
                  : <Button variant='filled'>{ellipseAddress(ctx.address || '', 4)}</Button>
                } */}
              </div>
              </MediaQuery>
            </div>
          </div>
        </Header>
      }
    >
    <div style={{
        display: 'flex', 
        justifyContent: 'stretch', 
        marginLeft: isMobile ? '0' : ctx.navOpen ? '20vw' : 60 ,
        flexDirection: isMobile ? 'column' : 'row',
        overflow: isMobile ? 'auto' : 'hidden'
        }}>
          <AccessContainer restricted={props.restricted}>
            <CompletionBanner />
            {props.children}
          </AccessContainer>
    </div>

    </AppShell>
  );
}

export default Shell
