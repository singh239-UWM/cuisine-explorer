import auth from '../firebase/auth';
import Router from 'next/router'
import { Header, Grid, Menu, Center, Group, Drawer, Burger, Modal, ActionIcon, Text, Image, Divider, } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { onAuthStateChanged } from 'firebase/auth'
import { useEffect, useState } from 'react';
import { AccountCircle } from '@mui/icons-material';
import SignUp from './SignUp';
import LogIn from './LogIn';


export default function IndexNav() {
    const matches = useMediaQuery('(min-width: 800px)');
    const [ssr, setSsr] = useState(false);
    //mobile drawer
    const [opened, setOpened] = useState(false);
    //login/signup modal
    const [openedSignUpModal, setOpenedSignUpModal] = useState(false);
    const [openedLogModal, setOpenedLogModal] = useState(false);
    //user logedin state
    const [userSignedIn, setUserSignedIn] = useState(undefined);

    const clickHandleSignOut = (e) => {
        auth.signOut()
        if (window.location.pathname === "/") {
            Router.reload()
        } else {
            Router.push("/")
        }
    }

    onAuthStateChanged(auth, (user) => {
        if (user) {
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/firebase.User
            setUserSignedIn(true)
            // ...
        } else {
            // User is signed out
            // ...
            setUserSignedIn(false)
        }
    });

    useEffect(() => {
        setSsr(true)
    }, []);

    return (
        <>
            {matches & ssr ? (
                <>
                    <Modal
                        opened={openedSignUpModal}
                        onClose={() => setOpenedSignUpModal(false)}
                    >
                        <Center>
                            <SignUp />
                        </Center>
                    </Modal>
                    <Modal
                        opened={openedLogModal}
                        onClose={() => setOpenedLogModal(false)}
                    >
                        <Center>
                            <LogIn />
                        </Center>
                    </Modal>
                    <Header height={50} padding="xs"
                        sx={{
                            backgroundColor: '#3B393A',
                            borderBottom: 0,
                            boxShadow: '0px 2px 2px 5px black',
                            overflow: "hidden"
                        }}>{/* Header content  style={{opacity: .6}} */
                            <Grid style={{ margin: '0px' }}>
                                <Grid.Col span={1}>
                                    {/* LOGO HERE */}
                                </Grid.Col>
                                <Grid.Col span={1} offset={10}>
                                    <Group position="right">
                                        <Menu control={
                                            <ActionIcon color={'yellow'} size={'lg'}>
                                                <AccountCircle fontSize='large'></AccountCircle>
                                            </ActionIcon>}>

                                            {userSignedIn ? (
                                                <>
                                                    <Menu.Item>Welcome</Menu.Item>
                                                    <Menu.Item onClick={clickHandleSignOut}>
                                                        Log Out
                                                    </Menu.Item>
                                                    <Divider />
                                                    <Menu.Item>Random</Menu.Item>
                                                    <Menu.Item>Top Recipes</Menu.Item>
                                                </>
                                            ) : (
                                                <>
                                                    <Menu.Item onClick={() => setOpenedSignUpModal(true)}>
                                                        Sign Up
                                                    </Menu.Item>
                                                    <Menu.Item onClick={() => setOpenedLogModal(true)}>
                                                        Log In
                                                    </Menu.Item>
                                                    <Divider />
                                                    <Menu.Item>Random</Menu.Item>
                                                    <Menu.Item>Top Recipes</Menu.Item>
                                                </>
                                            )}
                                        </Menu>
                                    </Group>
                                </Grid.Col>
                            </Grid>
                        }</Header>
                </>
            ) : (
                <Header height={60} padding="xs">{/* Header content */
                    <Grid>
                        <Grid.Col span={8}><Center>LOGO HERE</Center></Grid.Col>
                        <Grid.Col span={4}>
                            <Drawer
                                position="right"
                                opened={opened}
                                onClose={() => setOpened(false)}
                                title="Menu"
                                padding="xl"
                                size="md"
                            >
                            </Drawer>
                            <Group position='right'>
                                <Burger
                                    opened={opened}
                                    onClick={() => setOpened((o) => !o)}
                                />
                            </Group>
                        </Grid.Col>
                    </Grid>
                }</Header>
            )}
        </>
    );
}