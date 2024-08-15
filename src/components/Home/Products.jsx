import React, { useEffect, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import './Product.css';
import { FaRegClock, FaStar } from 'react-icons/fa';

const Products = () => {
    // const products = useLoaderData();

    const [products, setProducts] = useState([]);
    const [productsPerPage, setProductsPerPage] = useState(6);
    const [currentPage, setCurrentPage] = useState(0);

    const [count, setCount] = useState(0);
    const numberOfPages = Math.ceil(count / productsPerPage);

    const [searchQuery, setSearchQuery] = useState('');

    const pages = [...Array(numberOfPages).keys()];

    console.log(pages);
    console.log(count);

    useEffect(() => {
        fetch('http://localhost:5000/productCount')
            .then(res => res.json())
            .then(data => setCount(data.count))
    }, [])

    useEffect(() => {
        const url = `http://localhost:5000/products?page=${currentPage}&size=${productsPerPage}`

        if (searchQuery) {
            fetch(`${url}&search=${searchQuery}`)
                .then(res => res.json())
                .then(data => setProducts)
        }
        else {
            fetch(url)
                .then(res => res.json())
                .then(data => setProducts(data))
        }
    }, [currentPage, productsPerPage, searchQuery]);




    const hangleProductsPerPage = e => {
        const value = parseInt(e.target.value);
        setProductsPerPage(value);
        setCurrentPage(0);
    }


    const handlePreviousPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1)
        }
    }

    const handleNextPage = () => {
        if (currentPage < pages.length - 1) {
            setCurrentPage(currentPage + 1)
        }
    }

    // console.log(Products)

    const handleSearch = e => {
        setSearchQuery(e.target.value);
        setCurrentPage(0);
    }




    function convertToLocalTime(utcDateTime) {
        const date = new Date(utcDateTime);
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

            <div className='pagination my-8 text-base'>
                <div className="flex flex-col lg:flex-row justify-center lg:justify-between">
                    <div className='flex items-center'>
                        <p className='mr-2'>Product Per Page: </p>
                        <div className='border-2 border-[#2848ff40] rounded'>
                            <select className='bg-[#2848ff20]' onChange={hangleProductsPerPage} value={productsPerPage} name="" id="">
                                <option value="5">5</option>
                                <option value="10">10</option>
                                <option value="20">20</option>
                                <option value="50">50</option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <button onClick={handlePreviousPage}>Previous</button>
                        {
                            pages.map(page => <button
                                onClick={() => setCurrentPage(page)}
                                className={currentPage === page ? "selected" : "notSelected"}
                                key={page} >{page + 1} </button>)
                        }
                        <button onClick={handleNextPage}>Next</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Products;