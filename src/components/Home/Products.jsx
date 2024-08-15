import React, { useEffect, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import './Product.css';
import { FaRegClock, FaStar } from 'react-icons/fa';
import { useForm } from 'react-hook-form';

const Products = () => {
    // const products = useLoaderData();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

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
    // http://localhost:5000/products&search=
    useEffect(() => {
        const url = `http://localhost:5000/products?page=${currentPage}&size=${productsPerPage}`
        if (searchQuery) {
            fetch(`http://localhost:5000/products&search=${searchQuery}`)
                .then(res => res.json())
                .then(data => {
                    setProducts(data);
                    console.log(data);
                })
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
        setSearchQuery(e.searchText);
        setCurrentPage(0);
        console.log(e.searchText)
    }


    function convertToLocalTime(utcDateTime) {
        const date = new Date(utcDateTime);
        const localTime = date.toLocaleString();
        return localTime;
    }

    // console.log(products)
    return (
        <div >
            <div className=''>
                <form onSubmit={handleSubmit(handleSearch)}>
                    <div className="flex justify-center items-center mt-8">
                        <label className="form-control w-full lg:w-1/3 ">

                            <input
                                type="text"
                                {...register('searchText', { required: true })}
                                placeholder="Enter your email"
                                className="input input-bordered w-full" />
                        </label>
                        <input className='btn btn-primary' type="submit" value="Search" />

                    </div>
                    <div className="flex justify-center">
                        {errors.searchText && <span className='text-red-400 mt-2'>Please write a Product Name</span>}
                    </div>

                </form>

            </div>
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
                                <option value="6">6</option>
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