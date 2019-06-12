import React from 'react';
import Link from 'next/link';

const Home = () => {
    return (
        <>
            <div>Hello, Next!</div>
            <Link href="/about"><a>About</a></Link>
        </>
    )
}

export default Home;