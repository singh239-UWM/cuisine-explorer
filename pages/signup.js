// import styles from '../styles/Signup.module.css'
import IndexNav from '../components/IndexNav';
import SignUp from '../components/SignUp';
import { Center } from '@mantine/core';

export default function signup() {

  return (
    <>
      <IndexNav></IndexNav>
      <Center style={{paddingTop: '50px'}}>
        <SignUp></SignUp>
      </Center>
    </>
  )
}