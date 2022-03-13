import Router from 'next/router'
import { Header, Grid, Menu, Center, Group, Drawer, Burger, Autocomplete, ActionIcon, Text, Image, Divider, } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { useEffect, useState } from 'react';
import { AccountCircle } from '@mui/icons-material';


export default function IndexNav() {
    const matches = useMediaQuery('(min-width: 800px)');
    const [ssr, setSsr] = useState(false);
    const [opened, setOpened] = useState(false);

    useEffect(() => {
        setSsr(true)
    }, []);

    return (
        <>
            {matches & ssr ? (
                <>
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
                                            <Menu.Item onClick={clickHandleSignUp}>Sign Up</Menu.Item>
                                            <Menu.Item onClick={clickHandleLogIn}>Log In</Menu.Item>
                                            <Divider />
                                            <Menu.Item>Random</Menu.Item>
                                            <Menu.Item>Top Recipes</Menu.Item>
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

const clickHandleLogIn = (e) => {
    Router.push('/login')
}

const clickHandleSignUp = (e) => {
    Router.push('/signup')
}