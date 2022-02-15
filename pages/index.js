import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Router from 'next/router'

export default function Home() {
  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Welcome To NoTa</h1>
      <p>Lets Take Notes</p>
      <button className={styles.button} onClick={clickHandle} >Log In</button>
    </div>
  )
}

const clickHandle = (e) => {
  Router.push('/login')
}
