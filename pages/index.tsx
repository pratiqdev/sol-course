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

export default function AppShellDemo() {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  const [shrinkNav, setShrinkNav] = useState(false)
  return (
    <AppShell
      styles={{
        main: {
          background: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
          padding: '0',
        },
    }}
    //   navbarOffsetBreakpoint="md"
    // //   asideOffsetBreakpoint="sm"
    //   fixed
    //   navbar={
    //     <Navbar p="md" hiddenBreakpoint="md" hidden={!opened} width={{sm: 60, lg: shrinkNav ? 60 : 300 }}>
    //         <Button style={{padding: '5px'}} onClick={()=> setShrinkNav(o => !o)}>{shrinkNav ? `>` : `<`}</Button>
    //         {!shrinkNav &&
    //         <Accordion>
    //           {courseList.map(x => 
    //             <Accordion.Item key={x.title} label={x.title}>
    //                 {x.courses.map(z => <Link key={z.file} href={`courses/${z.file}`}>{z.title}</Link>)}
    //             </Accordion.Item>
    //           )}
    //       </Accordion>
    //         }
    //     </Navbar>
    //   }
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

            <Text>Application header</Text>
          </div>
        </Header>
      }
    >
        <div style={{minHeight: 'calc(100vh - 70px)', marginTop: '70px', border: '1px solid green'}}>
            <Text>Resize app to see responsive navbar in action</Text>
        </div>
    </AppShell>
  );
}