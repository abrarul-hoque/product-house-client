import React from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { Helmet } from 'react-helmet';
import contactImg from '../../../assets/contact-image.gif';
const Contact = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm()


    const onSubmit = async (messageData) => {
        console.log(messageData);
        reset();

        Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Thanks for your message. We'll contact you soon",
            showConfirmButton: false,
            timer: 1500
        });


    }


    return (
        <div className='max-w-6xl mx-auto'>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Product House | Contact</title>
            </Helmet>
            <h1 className='text-2xl lg:text-4xl font-bold my-8 text-center'>Get in Touch</h1>

            <div className='flex flex-col lg:flex-row items-center gap-4'>
                <div className='flex-1'>
                    <form onSubmit={handleSubmit(onSubmit)}>

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

                        <label className="form-control w-full lg:w-4/5 mb-2">
                            <div className="label">
                                <span className="label-text">Message</span>
                            </div>
                            <textarea
                                // type="text"
                                {...register('message', { required: true })}
                                placeholder="Enter your email"
                                className="input input-bordered w-full h-36"
                            ></textarea>

                            {errors.message && <span className='text-red-400 mb-2'>Message is required</span>}
                        </label>

                        <input className='btn btn-primary my-5 w-4/5' type="submit" value="Send" />
                    </form>
                </div>
                <div className='flex-1'>
                    <img className='rounded-xl my-4' src={contactImg} alt="" />
                </div>

            </div>
        </div>
    );
};

export default Contact;