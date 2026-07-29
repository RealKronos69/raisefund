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
import Payments from "./components/payments"
import Donated from "./components/paydonated"
import Recieved from "./components/payrecieved"

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
            {
                path: '/user/payments',
                element: <><Menu /><Payments /></>,
                children:[
                    {
                        path:'recieved',
                        element:<><Menu /><Recieved /></>,
                    },
                    {
                        path:'Donated',
                        element:<><Menu /><Donated /></>,
                    },

                ]
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