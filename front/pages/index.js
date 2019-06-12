import React from 'react';
import Link from 'next/link';
import Head from 'next/head';
import AppLayout from '../components/AppLayout';

const Home = () => {
    return (
        <>
            <Head>
                <title>zeroSNS</title>
                <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/antd/3.19.0/antd.css" />
                <script src='https://cdnjs.cloudflare.com/ajax/libs/antd/3.19.0/antd.js'/>
            </Head>
            <AppLayout>
                <div>Hello, Next!</div>
                <Link href="/about"><a>About</a></Link>
            </AppLayout>
        </>
    )
}

export default Home;