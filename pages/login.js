import IndexNav from '../components/IndexNav';
import LogIn from '../components/LogIn'
import { Center } from '@mantine/core';

export default function login() {

  return (
    <>
      <IndexNav></IndexNav>
      <Center style={{paddingTop: '50px'}}>
        <LogIn></LogIn>
      </Center>
    </>
  )
}