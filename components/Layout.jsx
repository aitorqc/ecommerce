import React from 'react'

import Head from 'next/head';
import Navbar from './Navbar';
import Footer from './Footer';

export default function Layout({children}) {
    return (
        <div className='layout'>
            <Head>
                <link rel="shortcut icon" href="../public/favicon.png" />
                <title>JSM Headphones</title>
            </Head>
            <header>
                <Navbar />
            </header>
            <main className='main-container'>
                {children}
            </main>
            <footer>
                <Footer />
            </footer>
        </div>
    )
}
