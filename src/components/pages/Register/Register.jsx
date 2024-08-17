import React, { useContext, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { FaGoogle, FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import { AuthContext } from '../../AuthProvider/AuthProvider';
import Swal from 'sweetalert2';
import SocialLogin from '../SocialLogin/SocialLogin';


const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;
const Register = () => {
    const [showPassword, setShowPassword] = useState(false);
    const { createUser, updateUser, user, setUser } = useContext(AuthContext)

    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm()


    const handleRegister = async (data) => {
        console.log(data)
        const imageFile = { image: data.image[0] };
        const imageRes = await axiosPublic.post(image_hosting_api, imageFile, {
            headers: {
                'content-Type': "multipart/form-data"
            }
        });
        console.log(imageRes);

        createUser(data.email, data.password)
            .then(result => {
                const loggedUser = result.user;
                updateUser(data.name, imageRes.data.data.display_url)
                    .then(() => {
                        const userInfo = {
                            name: data.name,
                            email: data.email,
                            image: imageRes.data.data.display_url,
                            role: 'user',
                            password: data.password
                        }
                        axiosPublic.post('/users', userInfo)
                            .then(res => {
                                if (res.data.insertedId) {
                                    console.log("user added to DB", res.data);
                                    reset();
                                    Swal.fire({
                                        title: "Success",
                                        text: "User Created successfuly!",
                                        icon: "success",
                                        timer: 1500
                                    });
                                    navigate("/")
                                    setUser({ ...user, displayName: userInfo.name, photoURL: userInfo.image });
                                    console.log("consoling after setUser: ", userInfo.image)
                                }
                            })
                    })
            })
    }
    return (
        <div>
            <div className='max-w-6xl mx-auto'>
                <Helmet>
                    <meta charSet="utf-8" />
                    <title>Product House | Register</title>
                </Helmet>

                <div className='flex flex-col md:flex-row lg:flex-row items-center'>
                    <div className='w-4/5 md:w-1/2 lg:w-1/2'>
                        {/* <img className='w-full' src={loginImg} alt="" /> */}
                        <h1 className='text-6xl'>Register Now</h1>
                    </div>
                    <div className='w-4/5 md:w-1/2 lg:w-1/2 p-5 py-10'>
                        <h1 className='text-2xl font-bold text-center mb-6'>Please Register</h1>
                        <form onSubmit={handleSubmit(handleRegister)}>
                            <label className="form-control w-full lg:w-4/5 mb-2">
                                <div className="label">
                                    <span className="label-text">Your Name</span>
                                </div>
                                <input
                                    type="text"
                                    {...register('name', { required: true })}
                                    placeholder="Enter your Name"
                                    className="input input-bordered w-full" />
                                {errors.name && <span className='text-red-400 mb-2'>Name is required</span>}
                            </label>

                            <label className="form-control w-full lg:w-4/5 mb-2">
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

                            <label className="form-control w-full lg:w-4/5 relative mb-2">
                                <div className="label">
                                    <span className="label-text">Your Password</span>
                                </div>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    {...register("password", {
                                        required: true,
                                        minLength: 8
                                    })}
                                    placeholder="Enter your password"
                                    className="input input-bordered w-full" />
                                <span className="btn bg-transparent border-none absolute top-9 right-0" onClick={() => setShowPassword(!showPassword)}>{showPassword ? <FaRegEyeSlash className='text-2xl' /> : <FaRegEye className='text-2xl' />}</span>
                                {errors.password?.type === "required" && <span className='text-red-400'>Password is required</span>}
                                {errors.password?.type === "minLength" && <span className='text-red-400'>Password must be 8 characters or long!</span>}
                            </label>

                            <label className="form-control w-full lg:w-4/5 mb-2">
                                <div className="label">
                                    <span className="label-text">Your Photo</span>
                                </div>

                                <input
                                    type="file"
                                    {...register('image', { required: true })}
                                    className="file-input file-input-bordered w-full" />
                                {errors.photo && <span className='text-red-400 mb-2'>Photo is required</span>}
                            </label>
                            <h3 className='text-base text-center mt-3'>Already have an Account? <Link to="/login" className='underline font-bold'>Login</Link></h3>
                            <input className='btn btn-primary my-5 w-4/5' type="submit" value="Register" />
                        </form>
                        <div className="divider w-full lg:w-4/5">Or</div>
                        <div className='flex justify-center w-full lg:w-4/5'>
                            <SocialLogin></SocialLogin>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
};

export default Register;