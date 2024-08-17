import React, { useContext, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useForm } from 'react-hook-form';
import { FaGoogle, FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import Swal from 'sweetalert2';
import { Bounce, ToastContainer, toast } from 'react-toastify';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../AuthProvider/AuthProvider';
import SocialLogin from '../SocialLogin/SocialLogin';

const Login = () => {
    const { signIn, setUser } = useContext(AuthContext);
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const from = location?.state?.from?.pathname || "/";

    const errorToast = (errorMessage) => toast.error(errorMessage, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
    });

    const handleLogin = data => {
        console.log(data)

        signIn(data.email, data.password)
            .then(res => {
                localStorage.clear();
                const user = res.user;
                setUser(user);
                Swal.fire({
                    title: "Success",
                    text: "Login successfuly!",
                    icon: "success"
                });
                navigate(from, { replace: true });
            })
            .catch(err => {
                console.log(err)
                errorToast(err.message);

            })

    }



    return (
        <div className='max-w-6xl mx-auto'>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Product House | Login</title>
            </Helmet>
            <ToastContainer />

            <div className='flex flex-col md:flex-row lg:flex-row items-center gap-8'>
                <div className='w-4/5 md:w-1/2 lg:w-1/2'>
                    <h1 className="text-5xl font-bold">Login now!</h1>
                    <p className="py-6">
                        Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
                        quasi. In deleniti eaque aut repudiandae et a id nisi.
                    </p>
                </div>
                <div className='w-4/5 md:w-1/2 lg:w-1/2 p-5 py-10'>
                    <h1 className='text-2xl font-bold text-center mb-6'>Please Login</h1>
                    <form onSubmit={handleSubmit(handleLogin)}>
                        <label className="form-control w-full  mb-2">
                            <div className="label">
                                <span className="label-text">Your Email</span>
                            </div>
                            <input
                                type="email"
                                {...register('email', { required: true })}
                                placeholder="Enter your email"
                                className="input input-bordered w-full" />
                            {errors.email && <span className='text-red-400 mb-2'>Email is required</span>}
                        </label>
                        <label className="form-control w-full relative">
                            <div className="label">
                                <span className="label-text">Your Password</span>
                            </div>
                            <input
                                type={showPassword ? "text" : "password"}
                                {...register("password", {
                                    required: true,
                                    minLength: 8,
                                    maxLength: 20,
                                })}
                                placeholder="Enter your password"
                                className="input input-bordered w-full" />
                            <span className="btn bg-transparent border-none absolute top-9 right-0" onClick={() => setShowPassword(!showPassword)}>{showPassword ? <FaRegEyeSlash className='text-2xl' /> : <FaRegEye className='text-2xl' />}</span>
                            {errors.password?.type === "required" && <span className='text-red-400'>Password is required</span>}
                            {errors.password?.type === "minLength" && <span className='text-red-400'>Password must be 8 characters</span>}
                            {errors.password?.type === "maxLength" && <span className='text-red-400'>Password must be less then 20 characters</span>}

                        </label>
                        <h3 className='text-base text-end mt-3'>New to Survey Master? <Link to="/register" className='underline font-bold'>Register</Link></h3>
                        <input className='btn btn-primary my-5 w-full ' type="submit" value="Login" />
                    </form>
                    <div className="divider">Or</div>
                    <div className='flex justify-center'>
                        <SocialLogin></SocialLogin>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Login;