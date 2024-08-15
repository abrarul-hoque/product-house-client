import React, { useContext } from 'react';
import mainLogo from "../../assets/product-house-main.png";
import { Link, NavLink } from 'react-router-dom';
import { AuthContext } from '../AuthProvider/AuthProvider';
import { Tooltip } from 'react-tooltip';

const Header = () => {
    const { user, logOut } = useContext(AuthContext);
    const navLinks = <>
        <li><NavLink to="/"><a>Home</a></NavLink></li>
        <li><NavLink to="/about"><a>About</a></NavLink></li>
        <li><NavLink to="/contact"><a>Contact</a></NavLink></li>
    </>



    const handleSignOut = () => {
        logOut()
            .then(res => {
                Swal.fire({
                    title: "Success",
                    text: "Log Out Successful!",
                    icon: "success",
                    timer: 1500
                });
            })
            .catch(err => console.log(err))
    }
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
                    {
                        user ?
                            <div>
                                <a id="clickable">
                                    <div className='w-10 h-10'>
                                        <img className='rounded-full w-16 h-10 mr-2 bg-white p-1 border border-red-400' src={user.photoURL || "https://i.ibb.co/XX4DwkF/default-user.webps"} alt="" />
                                    </div>
                                </a>
                                <Tooltip className='z-9999 rounded-xl' anchorSelect="#clickable" clickable>
                                    <div className='flex flex-col text-center'>
                                        <p className=' text-[#ff9123] font-bold text-base p-3 rounded-xl'>{user.displayName}</p>
                                        <button onClick={handleSignOut} className='mb-3 btn btn-success text-[#000] p-3 rounded-xl'>Logout</button>

                                    </div>
                                </Tooltip>
                            </div>
                            :
                            <><Link to="/login"><a className="btn btn-primary mr-2">Login</a></Link>
                                <Link to="/register"><a className="btn btn-success">Register</a></Link>
                            </>
                    }


                </div>
            </div>
        </div>
    );
};

export default Header;