import { createBrowserRouter } from "react-router-dom";
import App from './App'
import Login from "./components/login"
import Signup from "./components/signup"
import Pay from "./components/pay";

const router = createBrowserRouter([
    {
        path:'/',
        element:<App/>
    },
    {
        path:'/user/login',
        element:<Login/>
    },
    {
        path:'/user/signup',
        element:<Signup/>
    },
    {
        path:'/api/payment',
        element:<Pay/>
    }
])

export default router