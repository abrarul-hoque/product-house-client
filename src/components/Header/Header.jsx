import React from 'react';
import mainLogo from "../../assets/product-house-main.png";
import { Link, NavLink } from 'react-router-dom';

const Header = () => {
    const navLinks = <>
        <li><NavLink to="/"><a>Home</a></NavLink></li>
        <li><NavLink to="/about"><a>About</a></NavLink></li>
        <li><NavLink to="/contact"><a>Contact</a></NavLink></li>
    </>
    return (
        <div className='bg-base-200'>
            <div className="navbar max-w-6xl mx-auto">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                            {navLinks}
                        </ul>
                    </div>
                    <a className="w-[200px] text-xl"><img src={mainLogo} alt="" /></a>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {navLinks}
                    </ul>
                </div>
                <div className="navbar-end">
                    <Link to="/login"><a className="btn btn-primary mr-2">Login</a></Link>
                    <Link to="/register"><a className="btn btn-success">Register</a></Link>

                </div>
            </div>
        </div>
    );
};

export default Header;