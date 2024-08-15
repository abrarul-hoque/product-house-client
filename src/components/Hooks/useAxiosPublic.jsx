import axios from 'axios';

const axiosPublic = axios.create({
    baseURL: 'https://survey-app-server-hazel.vercel.app'
})

const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;