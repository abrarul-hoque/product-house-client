import React, { useEffect, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import './Product.css';
import { FaRegClock, FaStar } from 'react-icons/fa';
import { useForm } from 'react-hook-form';

const Products = () => {
    const allProducts = useLoaderData();
    const { register, handleSubmit, formState: { errors }, } = useForm();

    const [products, setProducts] = useState([]);
    const [productsPerPage, setProductsPerPage] = useState(6);
    const [currentPage, setCurrentPage] = useState(0);

    const [count, setCount] = useState(0);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortOrder, setSortOrder] = useState('');
    const [brands, setBrands] = useState([]);
    const [categories, setCategories] = useState([]);
    const [priceRange, setPriceRange] = useState([0, 100]);

    const [selectedBrand, setSelectedBrand] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');

    const numberOfPages = Math.ceil(count / productsPerPage);
    const pages = [...Array(numberOfPages).keys()];

    //Getting  Categories
    useEffect(() => {
        fetch('http://localhost:5000/products/categories')
            .then(res => res.json())
            .then(data => setCategories(data));
    }, [])
    //Getting brandName 
    useEffect(() => {
        fetch('http://localhost:5000/products/brands')
            .then(res => res.json())
            .then(data => setBrands(data));
    }, [])

    useEffect(() => {
        fetch('http://localhost:5000/productCount')
            .then(res => res.json())
            .then(data => setCount(data.count))
    }, [])


    // useEffect(() => {
    //     let url = `http://localhost:5000/products?page=${currentPage}&size=${productsPerPage}`
    //     if (sortOrder) {
    //         fetch(url + `&sortOrder=${sortOrder}`)
    //             .then(res => res.json())
    //             .then(data => {
    //                 setProducts(data);
    //                 console.log(data);
    //             })
    //     }
    //     else {
    //         fetch(url)
    //             .then(res => res.json())
    //             .then(data => setProducts(data))
    //     }
    // }, [currentPage, productsPerPage, searchQuery, sortOrder]);


    useEffect(() => {
        let url = `http://localhost:5000/products?page=${currentPage}&size=${productsPerPage}`
        if (selectedBrand) {
            url = url + `&brand=${selectedBrand}`;
        }
        if (selectedCategory) {
            url = url + `&category=${selectedCategory}`;
        }

        if (sortOrder) {
            fetch(url + `&sortOrder=${sortOrder}`)
                .then(res => res.json())
                .then(data => {
                    setProducts(data);
                    console.log(data);
                })
        }
        if (priceRange) {
            url = url + `&minPrice=${priceRange[0]}&maxPrice=${priceRange[1]}`;
            console.log(url)
        }

        else {
            fetch(url)
                .then(res => res.json())
                .then(data => setProducts(data))
        }

    }, [currentPage, productsPerPage, searchQuery, sortOrder, selectedBrand, selectedCategory, priceRange]);






    const handleSearch = (e) => {
        e.preventDefault();
        // setSearchQuery(e.target.searchText.value);
        const searchQry = e.target.searchText.value;
        fetch(`http://localhost:5000/products&search=${searchQry}`)
            .then(res => res.json())
            .then(data => {
                setProducts(data);
                setCurrentPage(0);
                console.log(data);
            })

        console.log(e.target.searchText.value)
    }

    const handleSortOrderChange = (e) => {
        setSortOrder(e.target.value);
        setCurrentPage(0);
    }


    const handleViewAll = () => {
        fetch(`http://localhost:5000/products?page=${currentPage}&size=${productsPerPage}`)
            .then(res => res.json())
            .then(data => {
                setProducts(data);
            })
    }



    const handleBrandChange = (e) => {
        setSelectedBrand(e.target.value);
        setCurrentPage(0);

    }

    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value);
        setCurrentPage(0);
        console.log(selectedCategory)
    }

    const handlePriceRangeChange = (e) => {
        const range = e.target.value;
        setPriceRange(range);
        setCurrentPage(0)
        console.log(range)
    }


    function convertToLocalTime(utcDateTime) {
        const date = new Date(utcDateTime);
        const localTime = date.toLocaleString();
        return localTime;
    }

    // Pagination related function
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

    // console.log(brands)

    // console.log(products)
    return (
        <div >
            <div className=''>
                {/* <form onSubmit={handleSubmit(handleSearch)}>
                    <div className="flex justify-center items-center mt-8 mx-10 gap-2">
                        <label className="form-control w-full lg:w-1/3 ">
                            <input
                                type="text"
                                {...register('searchText', { required: true })}
                                placeholder="Write a Product Name"
                                className="input input-bordered w-full" />
                        </label>
                        <input className='btn btn-success' type="submit" value="Search" />

                    </div>
                    <div className="flex justify-center">
                        {errors.searchText && <span className='text-red-400 mt-2'>Please write a Product Name</span>}
                    </div>
                </form> */}
                <form onSubmit={handleSearch}>
                    <div className="flex justify-center items-center mt-8 mx-10 gap-2">
                        <div>
                            <button className='btn btn-primary' onClick={handleViewAll}>View All</button>
                        </div>
                        <label className="form-control w-full lg:w-1/3 ">
                            <input
                                type="text"
                                name="searchText"
                                // {...register('searchText', { required: true })}
                                placeholder="Write a Product Name"
                                className="input input-bordered w-full" />
                        </label>
                        <button className='btn btn-success'>Search</button>
                    </div>

                </form>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 mx-4 my-4'>

                <div className='flex items-center'>
                    <h3 className='text-base font-semibold w-1/3'>Sort By:</h3>
                    <select className="select select-primary w-full" onChange={handleSortOrderChange}>
                        <option defaultValue="">Select an option:</option>
                        <option value="priceAsc">Price Low to High</option>
                        <option value="priceDesc">Price High to Low</option>
                        <option value="dateDesc">Newest First</option>
                        <option value="dateAsc">Newest Last</option>
                    </select>
                </div>

                {/* Filtering */}
                <div className='flex items-center gap-2'>
                    <h3 className='text-base font-semibold w-1/3 ml-4 mr-2'>Filter:</h3>
                    {/* Filter by Brand Name */}
                    <select className="select select-primary w-full" onChange={handleBrandChange}>
                        <option disabled selected>By Brand</option>
                        {brands.map((brand, idx) => <option key={idx} value={brand}>{brand}</option>)}
                    </select>
                </div>
                <div>
                    {/* Filter by Category */}
                    <select className="select select-primary w-full max-w-xs" onChange={handleCategoryChange}>
                        <option disabled selected>By Category</option>
                        {categories.map((category, idx) => <option key={idx} value={category}>{category}</option>)}
                    </select>
                </div>
                <div className='flex items-center'>
                    {/* Filter by PriceRange */}
                    <label className='text-base'>PriceRange:</label>
                    {/* <input type="range" min="5" max="100000" step="5" onChange={handlePriceRangeChange} /> */}
                    <select className="select select-primary w-full" onChange={handlePriceRangeChange}>
                        {/* <option >Select an option:</option> */}
                        <option defaultValue="" >All Prices</option>
                        <option value="0-50">0 - 50</option>
                        <option value="50-100">50 - 100</option>
                        <option value="100-200">100 - 200</option>
                        <option value="200-2000">200 - 2000</option>
                        <option value="2000-10000">200 - 10000</option>
                    </select>


                </div>

                <div>

                </div>
            </div>


            {/* Product Cards */}
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-5 '>
                {products.length <= 0 ? <div className='' ><span className='text-red-400 text-3xl text-center mt-2'>No Product Found</span></div> :
                    products.map((product) => <div className="card card-compact bg-base-100 shadow-xl mx-4" key={product._id}>
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

            {/* Pagination */}
            <div className='pagination my-8 mx-4 text-base'>
                <div className="flex flex-col lg:flex-row justify-center place-content-center lg:justify-between">
                    <div className='flex justify-center items-center mb-4'>
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
                    <div className='flex justify-center'>
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