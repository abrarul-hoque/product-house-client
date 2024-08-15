import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className='max-w-6xl mx-auto'>
            <h1 className='text-4xl text-center my-10 font-extrabold text-purple-600'>Page Not Found</h1>
            <div className='flex justify-center'>
                <Link to="/"><button className='btn btn-primary'>Home</button></Link>
            </div>

        </div>
    );
};

export default NotFound;