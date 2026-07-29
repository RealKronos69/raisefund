import { createBrowserRouter } from "react-router-dom";
import App from './App'
import Login from "./components/login"
import Signup from "./components/signup"
import Pay from "./components/pay";
import Dashboard from "./components/dashboard"
import Home from "./components/home"
import Profile from "./components/profile"
import Menu from "./components/menu"
import Form from "./components/donationform"

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                index: true,
                element: <Home />
            },
            {
                path: '/user/dashboard',
                element: <><Menu /><Dashboard /></>
            },
            {
                path: '/user/profile',
                element: <><Menu /><Profile /></>
            },
            {
                path: '/user/donationform',
                element: <><Menu /><Form /></>
            },
        ]
    },
    {
        path: '/user/login',
        element: <Login />
    },
    {
        path: '/user/signup',
        element: <Signup />
    },
    {
        path: '/api/payment/:id',
        element: <Pay />
    }
])

export default router