import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./components/Home/Home";
import NotFound from "./components/NotFound";

const routes = createBrowserRouter([
    {
        path: "/",
        element: <Layout></Layout>,
        errorElement: <NotFound></NotFound>,
        children: [
            {
                path: "/",
                element: <Home></Home>
            }
        ]
    },
]);

export default routes;