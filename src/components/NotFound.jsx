import React from 'react';
import { Link, useRouteError } from 'react-router-dom';

const NotFound = () => {
    const error = useRouteError();

    console.log(error)
    return (
        <div className='max-w-6xl mx-auto text-center'>
            <h1 className='text-4xl text-center my-10 font-extrabold text-purple-600'>Page Not Found</h1>
            <h1 className='text-4xl my-4 text-[#2847FF] font-bold'>{error.statusText}</h1>
            <p>{error.data}</p>
            <p>{error.message}</p>
            <div className='flex justify-center'>
                <Link to="/"><button className='btn btn-primary'>Home</button></Link>
            </div>
        </div>
    );
};

export default NotFound;