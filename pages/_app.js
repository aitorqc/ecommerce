import React from 'react'
import toast, { Toaster } from 'react-hot-toast';

import Layout from '../components/Layout'
import StateContext from '../context/StateContext'

import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <StateContext>
      <Layout>
        <Toaster/>
        <Component {...pageProps} />
      </Layout>
    </StateContext>
  )
}

export default MyApp
