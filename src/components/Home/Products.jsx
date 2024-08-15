import React from 'react';
import { useLoaderData } from 'react-router-dom';
import './Product.css';
import { FaRegClock, FaStar } from 'react-icons/fa';

const Products = () => {
    const products = useLoaderData();

    function convertToLocalTime(utcDateTime) {
        // Create a new Date object from the UTC time string
        const date = new Date(utcDateTime);

        // Get the local time as a string
        const localTime = date.toLocaleString();

        return localTime;
    }

    console.log(products)
    return (
        <div >
            Products:{products.length}
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                {
                    products.map((product) => <div className="card card-compact bg-base-100 shadow-xl">
                        <figure className='product-image '>
                            <img
                                src={product.image}
                                className=' h-[200px] p-4 mt-3'
                                alt="Shoes" />
                        </figure>
                        <span className='product-price'>
                            <h3 className='flex gap-1 text-base items-center'><FaStar className='text-yellow-300' /> {product.rating}/5</h3>
                        </span>
                        <div className='flex justify-between items-center'>
                            <h3 className='bg-purple-300 p-3 rounded-r-md font-bold'>{product.category}</h3>
                            <h3 className='text-xl mr-4 font-semibold'>${product.price}</h3>
                        </div>
                        <div className="card-body">
                            <h2 className="card-title">{product.name}</h2>
                            <p className='text-base mb-2'>{product.description}</p>
                            <small className='text-end text-sm flex items-center gap-1 justify-end'> <FaRegClock />  {convertToLocalTime(product.createdOn)}</small>
                            {/* <div className="card-actions justify-end">
                                <button className="btn btn-primary">Buy Now</button>
                            </div> */}
                        </div>
                    </div>)
                }

            </div>

        </div>
    );
};

export default Products;