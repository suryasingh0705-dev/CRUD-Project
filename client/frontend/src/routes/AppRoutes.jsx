import {createBrowserRouter, RouterProvider} from "react-router";
import PublicRoute from "./PublicRoute";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import ProtectedRoute from "./ProtectedRoute";
import Home from "../Pages/Home";
import ProductDetails from "../Pages/ProductDetails";
import ProductForm from "../components/ProductForm";

const router = createBrowserRouter([
    {
        element: <PublicRoute/>,
        children: [
            {
            path: "/login",
            element: <Login/>
            },
            {
                path: "/register",
                element: <Register/>
            }
        ]
    },
    {
        element: <ProtectedRoute/>,
        children: [
            {
                path: "/",
                element: <Home/>
            },
            {
                path: "/create",
                element: <ProductForm/>
            },
            {
                path: "/product/:id",
                element: <ProductDetails/>
            }
        ]
    }
])

const Router = () => {
  return <RouterProvider router={router} />;
};

export default Router;