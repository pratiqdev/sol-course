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
  nextCourse?:string;
  hideNavbar?: boolean;
}


const CompletionBanner = (props:any) => {
  const {nextCourse} = props

  const {ctx, setCtx} = useConnectionManager()
  const [showBanner, setShowBanner] = useState(false)
  const router = useRouter()

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

  const handleNext = () => {
    setShowBanner(false)
    setCtx({...ctx, showCompleteBanner: false, nextCourse: null})
    ctx.nextCourse && router.push(ctx.nextCourse)
  }


  if(showBanner){
    return(
      <div style={{position: 'fixed', height: '100vh', width: '100vw', top: '0', left: '0', zIndex: '1000', background: '#0f03', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>\
        <div style={{background: '#121', padding: '1rem 2rem', borderRadius: '1rem', border: '4px solid white'}}>
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
            <h2 style={{margin: '0', padding:'0'}}>Course Complete!</h2>
            <Button variant='subtle' onClick={handleClose}>X</Button>
          </div>
          <p>This course is complete! Your progress has been saved and you can move on to the next course!</p>

          {ctx.nextCourse 
          ? (
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
              <Button onClick={handleClose}>Stay Here</Button>
              <Button onClick={handleNext}>Next Course</Button>
            </div>
          ) : (
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
              <Button onClick={handleNext}>Close</Button>
            </div>
          )
        
        }

        </div>
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
  const splitRoute = router.pathname.replace('/courses/', '').split('/')

  // console.log('ROUTER PATH:', splitRoute)
  const categoryUri = splitRoute[0]
  const courseUri = splitRoute[1]
  //@ts-ignore
  // const currentAccIndex = courseList.indexOf(courseList.find((x, i) => x.title.toLowerCase() === currentCategory.toLowerCase().replace('-',' '))) || 0
  // console.log('currentCategory:', currentCategory)
  // console.log('currentPage:', currentPage)
  // console.log('currentIndex:', props.categoryIndex)
  const [accordionState, handlers] = useAccordionState({ total: Object.entries(courseList).length, initialItem: props.categoryIndex || 0 });
  const isMobile = useMediaQuery('(max-width: 992px)');

  useEffect(()=>{
    console.log('IS MOBILE:', isMobile)
  },[isMobile])

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

  useEffect(()=>{
    if(props.nextCourse){
      setCtx({...ctx, nextCourse: props.nextCourse})
    }
  },[])


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



      navbar={props.hideNavbar ? <></> :
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
                          <Link key={courseObject.file} href={`/courses/${courseObject.file}`} passHref>
                          <Box sx={{padding: '.25rem .5rem',marginTop: '.5rem', marginLeft: '-10px', marginRight: '-10px',cursor: 'pointer', minWidth: '100%', borderBottom: '1px solid transparent', '&:hover': { borderBottom: '1px solid #555'}}}>
                            <StatusBadge path={courseObject.file}/> {courseObject.title}
                          </Box>
                          </Link>
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
                <Link href='/' passHref><Button variant='subtle' component='a' sx={{marginRight: 10}}>ChiptosX</Button></Link>
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
        marginLeft: props.hideNavbar ? '0' : isMobile ? '0' : ctx.navOpen ? '20vw' : 60 ,
        flexDirection: isMobile ? 'column' : 'row',
        // overflow: isMobile ? 'auto' : 'hidden',
        height: '100%'
        }}>
          <AccessContainer restricted={props.restricted}>
            <CompletionBanner/>
            {props.children}
          </AccessContainer>
    </div>

    </AppShell>
  );
}

export default Shell
