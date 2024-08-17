import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./components/Home/Home";
import NotFound from "./components/NotFound";
import Login from "./components/pages/Login/Login";
import Register from "./components/pages/Register/Register";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import Contact from "./components/pages/Contact/Contact";
import About from "./components/pages/About/About";

const routes = createBrowserRouter([
    {
        path: "/",
        element: <Layout></Layout>,
        errorElement: <NotFound></NotFound>,
        children: [
            {
                path: "/",
                element: <PrivateRoute><Home></Home></PrivateRoute>,
                loader: () => fetch('http://localhost:5000/products')
            },
            {
                path: "/login",
                element: <Login></Login>
            },
            {
                path: "/register",
                element: <Register></Register>
            },
            {
                path: "/contact",
                element: <Contact></Contact>
            },
            {
                path: "/about",
                element: <About></About>
            },
        ]
    },
]);

export default routes;