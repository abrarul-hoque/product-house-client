import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./components/Home/Home";

const routes = createBrowserRouter([
    {
        path: "/",
        element: <Layout></Layout>,
        children: [
            {
                path: "/",
                element: <Home></Home>
            }
        ]
    },
]);

export default routes;