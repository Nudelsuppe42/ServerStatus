import Head from 'next/head'
import { Header } from '../components/page/Header'
import Image from 'next/image'
import type { NextPage } from 'next'
import { Page } from '../components/page/Page'
import { Typography } from '@mui/material'
import styles from '../styles/Home.module.css'
import { typography } from '@mui/system'

const Home: NextPage = () => {
  return (
    <Page title="home" ><Typography color="black">hello</Typography></Page>
  )
}

export default Home
