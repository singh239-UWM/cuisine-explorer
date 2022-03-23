import Router from 'next/router';
import { Grid, Text, TextInput, Group, Button, Select, Divider, Container, PasswordInput } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { useEffect, useRef, useState } from 'react';
import { useForm } from '@mantine/form';
import { firebaseLogIn } from '../firebase/auth';

export default function LogIn() {
    const matches = useMediaQuery('(min-width: 800px)');
    const [ssr, setSsr] = useState(false);
    const [loging, setLoggin] = useState(undefined)
    const [loginFail, setLoginFail] = useState(undefined)
    const form = useForm({
        initialValues: {
            email: '',
        },

        validate: {
            email: (value) => (/^([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22))*\x40([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d))*$/.test(value) ? null : 'Invalid email'),
        },
    });


    useEffect(() => {
        setSsr(true)
    }, []);

    const handleLogIn = (values) => {
        setLoggin(true)
        setLoginFail(false)
        firebaseLogIn(values).then((uid) => {
            console.log(typeof(uid))
            if (typeof(uid) === "object") {
                console.log("user failed to login" + uid)
                setLoginFail(true)
                setLoggin(false)
            } else {
                console.log("user  login " + uid)
                if(window.location.pathname === "/login") {
                    Router.push("/")
                } else {
                    window.location.reload()
                }
            }
        })

    }

    return (
        <>
            {matches & ssr ? (
                <>
                    <Container style={{
                        height: '420px',
                        width: '420px',
                        backgroundColor: 'white',
                        borderRadius: '5px'
                    }}>
                        <Group direction="column" spacing="xs" grow >
                            <Text style={{ fontSize: '35px', fontWeight: 'bolder' }}>
                                Log In
                            </Text>
                            <Text style={{ fontSize: '15px', marginTop: '-12px' }}>
                                
                            </Text>
                            <Divider></Divider>
                            <form onSubmit={form.onSubmit(handleLogIn)}>
                                <TextInput required label="Email" placeholder="Your Email" {...form.getInputProps('email')} />
                                <PasswordInput
                                    required label="Password"
                                    placeholder="Your Password"
                                    {...form.getInputProps('password')}/>
                                <Button fullWidth color="yellow" type="submit"
                                    style={{
                                        backgroundColor: "#f59f00",
                                        color: "#000000",
                                        marginTop: "25px"
                                    }}
                                    loading={loging ? true: false}>
                                    Log In
                                </Button>
                            </form>
                            <Text align="center" size='md' color={'red'}>{loginFail ? "Invalid Email/Password" : ""}</Text>    
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



// const clickHandleSignUp = (e) => {
//     Router.push('/signup')
// }