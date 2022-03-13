import Router from 'next/router';
import { Grid, Text, TextInput, Group, Button, Burger, ActionIcon, Divider, Container } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { useEffect, useState } from 'react';


export default function SignUp() {
    const matches = useMediaQuery('(min-width: 800px)');
    const [ssr, setSsr] = useState(false);

    useEffect(() => {
        setSsr(true)
    }, []);

    return (
        <>
            {matches & ssr ? (
                <>
                    <Container style={{
                        height: '450px',
                        width: '420px',
                        backgroundColor: 'white',
                        borderRadius: '5px'
                    }}>
                        <Group direction="column" spacing="xs" grow >
                            <Text style={{ fontSize: '35px', fontWeight: 'bolder' }}>
                                Sign Up
                            </Text>
                            <Text style={{ fontSize: '15px', marginTop: '-12px' }}>
                                Start Your Food Journey!
                            </Text>
                            <Divider></Divider>
                            <Grid>
                                <Grid.Col span={6}>
                                    <TextInput label="First Name" placeholder="First Name"/>
                                </Grid.Col>
                                <Grid.Col span={6}>
                                    <TextInput label="Last Name" placeholder="Last Name"/>
                                </Grid.Col>
                            </Grid>
                            <TextInput label="Email" placeholder="Email"/>
                            <Grid>
                                <Grid.Col span={6}>
                                    <TextInput label="First Name" placeholder="First Name"/>
                                </Grid.Col>
                                <Grid.Col span={6}>
                                    <TextInput label="Last Name" placeholder="Last Name"/>
                                </Grid.Col>
                            </Grid>
                            <DatePicker
                                placeholder="Event date"
                                label="Pick date"
                                
                                />
                        </Group>
                    </Container>
                </>
            ) : (
                <>
                    <Container style={{
                        height: '450px',
                        width: '425px',
                        backgroundColor: 'white'
                    }}>

                    </Container>
                </>
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