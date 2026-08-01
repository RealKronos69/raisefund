import { useState, useRef, useEffect } from 'react'
import gitimg from '../assets/github.png'
import fundimg from '../assets/fund.png'
import userimg from '../assets/user.png'
import trustimg from '../assets/trust.png'
import secureimg from '../assets/secure.png'
import supportimg from '../assets/heart.png'
import Navbar from './navbar'
import Footer from './footer'
import { useLocation, useNavigate } from 'react-router-dom'

const Home = () => {
    const [leaderboard, setleaderboard] = useState([])
    const [trending, settrending] = useState([])
    const location = useLocation()
    const navigate = useNavigate()
    const [webstats, setwebstats] = useState([])
    const cardobj = [
        {
            title: "Trusted Campaigns",
            msg: "Every fundraiser is reviewed to help create a safe and trustworthy platform for donors and those seeking support.",
            image:trustimg
        },
        {
            title: "Secure Donations",
            msg: "Donate with confidence through secure payment processing, ensuring every contribution is handled safely and transparently.",
            image:secureimg
        },
        {
            title: "Make a Real Impact",
            msg: "Your support, no matter the amount, helps individuals and communities move closer to achieving their goals.",
            image:supportimg
        }
    ]

    const [islogged, setislogged] = useState(false)

    useEffect(() => {
        const fetchinfo = async () => {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/api`, {
                credentials: "include"
            })
            const data = await res.json()
            console.log(data)
            if (res.ok) {
                setislogged(true)
            } else {
                setislogged(false)
            }
        }
        const fetchleaderboard = async () => {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/explore/leaderboard`)
            const data = await res.json()
            console.log(data)
            if (res.ok) {
                setleaderboard(data)
            }
        }
        const fetchtrending = async () => {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/explore/trending`)
            const data = await res.json()
            if (res.ok) {
                settrending(data)
            }
        }
        const fetchstats = async () => {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/explore/stats`)
            const data = await res.json()
            if (res.ok) {
                setwebstats(data)
            }
        }
        fetchinfo()
        fetchleaderboard()
        fetchtrending()
        fetchstats()
    }, [])

    useEffect(() => {
        if (location.hash) {
            setTimeout(() => {
                document.querySelector(location.hash)?.scrollIntoView({ behavior: "smooth" })
            }, 100)
            window.history.replaceState(null, "", window.location.pathname)
        }
    }, [location])

    const [card, setcard] = useState(cardobj)
    return (
        <section id='HOME' className="pt-12 bg-gray-50">
            <div className='p-2 bg-gray-100 flex gap-5'>
                {islogged === false && <a href='/user/login' className='bg-gray-900 text-white p-3 rounded-3xl text-sm font-semibold hover:scale-101 cursor-pointer pl-10 pr-10 hover:bg-gray-800'>Login</a>}
                <a target='_blank' rel="noopener noreferrer" href='https://github.com/realkronos69' className='bg-white text-gray-800 p-3 rounded-3xl text-xs font-bold hover:scale-101 cursor-pointer pl-5 pr-5 hover:bg-gray-200 flex justify-center items-center gap-2 shadow-2xl'><img className='w-5 h-5' src={gitimg} alt="" />GitHub</a>
                <a href='/user/dashboard' className='bg-red-500 p-3 rounded-3xl text-xs font-bold hover:scale-101 cursor-pointer hover:bg-red-300 flex justify-center items-center gap-2 shadow-2xl'><img className='w-5 h-5 invert' src={userimg} alt="" /></a>

            </div>
            <section className='w-full bg-gray-700'>
                <div className='rounded-2xl flex p-3 gap-3 flex-wrap'>
                    {webstats.map((e) => {
                        return (
                            <div className={`${e.background} rounded-2xl text-center p-5 inset-shadow-black inset-shadow-2xs shadow-md`}>
                                <div className='text-xs text-gray-600'>{e.title}</div>
                                <div className='text-lg text-gray-800 font-semibold'>{e.count}</div>
                            </div>
                        )
                    })}
                   
                </div>
            </section>
            <section className='p-5 h-100 flex justify-center flex-col items-center gap-5 w-full'>
                <h1 className=' font-bold text-3xl max-w-90 text-center'><span className='text-yellow-400'>RaiseFund</span>, A Crowd Funding Website!</h1>
                <p className=' max-w-90 text-center'>At RaiseFund, we believe that a small act of kindness can create a life-changing impact. Our platform connects people in need with individuals who are willing to help, making fundraising simple, transparent, and accessible.</p>
            </section>
            <section className='p-5'>
                <div className='w-full h-fit flex gap-10 flex-wrap justify-center p-2'>
                    {card.map((e) => {
                        return (
                            <div key={e.title} className='border w-70 h-40 bg-white rounded-2xl text-center flex flex-col gap-5 justify-center p-5'>
                                <div className='place-items-center'>
                                    <img className='w-10 h-10' src={e.image} />
                                </div>
                                <p className='text-gray-700 text-xs'>{e.msg}</p>
                            </div>
                        )
                    })}
                </div>
            </section>
            <section id='LEADERBOARD' className=' p-5 flex gap-10 flex-wrap bg-white justify-center'>
                {/* <div className='bg-white rounded-2xl h-fit p-5 flex-col flex gap-5 shadow-black shadow-md'>
                    <h1 className='text-2xl font-bold'>📢 Join Our Community</h1>
                    <p className='font-semibold text-gray-700'>Together, We Can Make a Difference, Whether you're starting a fundraiser or supporting someone else's journey, you're becoming part of a community that believes in helping others. Join RaiseFund today and be a part of something bigger than yourself.</p>
                    <button className='bg-blue-500 text-white p-3 rounded-3xl text-xs font-bold hover:scale-101 cursor-pointer w-30 hover:bg-blue-400 flex justify-center items-center gap-2 shadow-2xl'>Join Group</button>
                </div> */}
                <div className='w-90 h-fit p-6 rounded-md'>
                    <h1 className='font-bold text-center w-full p-4'>
                        TOP DONATORS
                    </h1>
                    <div className='w-full h-fit flex flex-col gap-2 overflow-hidden'>
                        {leaderboard.map((e, i) => {
                            return (
                                <div key={e._id} className={`w-full ${i === 0 ? "bg-yellow-400" : "bg-gray-900"} rounded-2xl h-10 text-white text-xs flex items-center p-5 justify-between font-bold`}>
                                    <div>{i + 1}</div>
                                    <div>{e.name}</div>
                                    <div>{e.totaldonated} ₹</div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </section>
            <div id='TRENDING'></div>
            <section className='bg-gray-100 p-5 mt-10 mb-10'>
                <h1 className='font-bold text-center w-full p-4'>TRENDING CAMPAIGNS</h1>
                <div className='flex flex-wrap gap-5 justify-center'>
                    {trending.map((e) => {
                        return (
                            <div key={e._id} className="shadow-md w-70 h-fit rounded-2xl p-3 flex flex-col gap-4 justify-between bg-black">
                                <div className="flex flex-col gap-2">
                                    <div className="p-3 bg-gray-200 rounded-3xl text-sm font-bold text-gray-700">{e.name}</div>
                                    {/* <div className="p-3 bg-blue-400 rounded-3xl text-sm font-bold text-white">ID: {e.campaignId}</div> */}
                                </div>
                                <div className="flex gap-1 flex-col justify-center items-center">
                                    <h1 className="text-xs text-gray-400">Raised Amount</h1>
                                    <div className="font-bold text-md text-white">{e.raised} ₹ / {e.amount} ₹</div>
                                </div>
                                <div className="relative group w-fit">
                                    <button className="p-2 bg-gray-700 text-white w-20 text-xs rounded-md hover:bg-gray-700">
                                        Cause?
                                    </button>
                                    <div className="absolute -translate-x-5 left-1/2 mb-2 invisible group-hover:visible bg-white text-xs p-4 rounded shadow-lg w-50 z-10 max-h-30 overflow-y-auto wrap-break-word scrollbar-thin scrollbar-thumb-gray-200">
                                        {e.cause}
                                    </div>
                                </div>
                                <button onClick={() => { navigate(`/api/payment?donateid=${e.userid}&campaignid=${e.campaignId}`) }} className="bg-gray-700 text-white cursor-pointer hover:scale-101 rounded-3xl w-full p-3 font-semibold">Donate</button>
                            </div>
                        )
                    })}
                </div>
            </section>
            <Footer />
        </section>
    )
}

export default Home