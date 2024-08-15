import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./components/Home/Home";
import NotFound from "./components/NotFound";
import Login from "./components/pages/Login/Login";
import Register from "./components/pages/Register/Register";

const routes = createBrowserRouter([
    {
        path: "/",
        element: <Layout></Layout>,
        errorElement: <NotFound></NotFound>,
        children: [
            {
                path: "/",
                element: <Home></Home>
            },
            {
                path: "/login",
                element: <Login></Login>
            },
            {
                path: "/register",
                element: <Register></Register>
            },
        ]
    },
]);

export default routes;