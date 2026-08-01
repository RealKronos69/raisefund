import { createBrowserRouter } from "react-router-dom";
import App from './App'
import Login from "./components/login"
import Signup from "./components/signup"
import Pay from "./components/pay";
import Dashboard from "./components/dashboard"
import Home from "./components/home"
import Menu from "./components/menu"
import Form from "./components/donationform"
import Payments from "./components/payments"
import Donated from "./components/paydonated"
import Navbar from "./components/navbar"
import Recieved from "./components/payrecieved"
import WithdrawInfo from "./components/withdraw";

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                index: true,
                element: <><Navbar /><Home /></>
            },
            {
                path: '/user/dashboard',
                element: <><Menu /><Dashboard /></>
            },
            {
                path: '/user/donationform',
                element: <><Menu /><Form /></>
            },
            {
                path: '/user/payments',
                element: <><Menu /><Payments /></>,
                children: [
                    {
                        index: true,
                        element: <><Recieved /></>,
                    },
                    {
                        path: 'recieved',
                        element: <><Recieved /></>,
                    },
                    {
                        path: 'Donated',
                        element: <><Donated /></>,
                    },
                    {
                        path: 'withdraw',
                        element: <><WithdrawInfo /></>,
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
        path: '/api/payment',
        element: <Pay />
    }
])

export default router