import React from 'react';
import Products from './Products';
import { Helmet } from 'react-helmet';

const Home = () => {
    return (
        <div className='max-w-6xl mx-auto'>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Product House | Home</title>
            </Helmet>
            <Products></Products>
        </div>
    );
};

export default Home;