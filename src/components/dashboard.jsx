import { useRef, useState, useEffect } from "react"
import msgimg from '../assets/message.png'
import walletimg from '../assets/wallet.png'
import donateimg from '../assets/donate.png'
import donatedimg from '../assets/donated.png'
import searchimg from '../assets/search.png'
import heartimg from '../assets/heart.png'
import Menu from './menu'
import { useNavigate } from "react-router-dom"
const Dashboard = () => {
    const [donationcards, setdonationcards] = useState([])
    const [usercards, setusercards] = useState([])
    const [visible, setvisible] = useState(4)
    const [search, setSearch] = useState("")
    const [stats, setstats] = useState({
        raised: 0,
        donations: 0,
        donated: 0
    })
    const [ActiveMessage, SetActiveMessage] = useState(false)
    const navigate = useNavigate()
    useEffect(() => {
        async function fetchdonationcards() {
            try {
                const response = await fetch('http://localhost:3000/user/donation/otherfunds')
                const data = await response.json()
                if (response.ok) {
                    setdonationcards(data)
                }

            } catch (error) {
                console.log(error)
            }
        }
        async function fetchusercards() {
            try {
                const response = await fetch('http://localhost:3000/user/donation/userfunds', {
                    credentials: 'include'
                })
                const data = await response.json()
                if (response.ok) {
                    setusercards(data)
                }

            } catch (error) {
                console.log(error)
            }
        }
        async function userstats() {
            try {
                const response = await fetch('http://localhost:3000/user/donation/userstats', {
                    credentials: 'include'
                })
                const data = await response.json()
                if (response.ok) {
                    setstats(data)
                }
                if (response.status === 401) {
                    navigate('/user/login')
                }

            } catch (error) {
                console.log(error)
            }
        }
        userstats()
        fetchusercards()
        fetchdonationcards()
    }, [])

    const handleDelete = async (ID) => {
        try {
            const res = await fetch(`http://localhost:3000/user/donation/delete/${ID}`, {
                method: 'DELETE',
                credentials: 'include'
            })
            setusercards(prev =>
                prev.filter(card => card._id !== ID)
            );
        } catch (error) {
            console.log(error)
        }
    }

    const handleWithdraw = async (USERID, CAMPAIGNID, RAISEDAMOUNT, REQUESTAMOUNT) => {
        try {
            const res = await fetch('http://localhost:3000/withdraw', {
                method: "POST",
                credentials: 'include',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    userid: USERID,
                    campaignId: CAMPAIGNID,
                    raised: RAISEDAMOUNT,
                    amount: REQUESTAMOUNT
                })
            })
            const data = await res.json()
            console.log(data)
        } catch (error) {
            console.log(error)
        }
    }

    const filteredCards = donationcards.filter((card) =>
        card.name.toLowerCase().includes(search.toLowerCase()) ||
        card.cause.toLowerCase().includes(search.toLowerCase())
    )

    const ShowMessage = () => {
        SetActiveMessage(true)
    }


    return (
        <section className="h-screen bg-white">
            <div className="bg-gray-900 h-12 flex items-center justify-end p-3 gap-5 w-full z-20">
                <button className="cursor-pointer"><img className="w-8 h-8" src={msgimg} alt="" /></button>
            </div>
            <section>
                <div className="bg-gray-100 p-5 flex flex-wrap gap-5">
                    <div className="shadow-md w-45 h-30 overflow-hidden rounded-2xl p-2 bg-white flex justify-center items-center flex-col gap-3">
                        <div className="flex gap-3">
                            <div className="bg-blue-500 w-10 h-10 rounded-md p-3"><img className="w-full h-full invert" src={walletimg} alt="" /></div>
                            <div>
                                <span className="text-sm">
                                    <h1 className="text-gray-400 text-xs">Amount Raised</h1>
                                    <h1 className="font-bold text-gray-600">{stats.raised} ₹</h1>
                                </span>
                            </div>
                        </div>
                        <button className="w-full h-8 rounded-sm bg-gray-200"></button>
                    </div>
                    <div className="shadow-md w-45 h-30 overflow-hidden rounded-2xl p-2 bg-white flex justify-center items-center flex-col gap-3">
                        <div className="flex gap-3">
                            <div className="bg-blue-500 w-10 h-10 rounded-md p-2"><img className="w-full h-full invert" src={donateimg} alt="" /></div>
                            <div>
                                <span className="text-sm">
                                    <h1 className="text-gray-400 text-xs">Total Donations</h1>
                                    <h1 className="font-bold text-gray-600">{stats.donations}</h1>
                                </span>
                            </div>
                        </div>
                        <button className="w-full h-8 rounded-sm bg-gray-200"></button>
                    </div>
                    <div className="shadow-md w-45 h-30 overflow-hidden rounded-2xl p-2 bg-white flex justify-center items-center flex-col gap-3">
                        <div className="flex gap-3">
                            <div className="bg-blue-500 w-10 h-10 rounded-md p-2"><img className="w-full h-full invert" src={donatedimg} alt="" /></div>
                            <div>
                                <span className="text-sm">
                                    <h1 className="text-gray-400 text-xs">Amount Donated</h1>
                                    <h1 className="font-bold text-gray-600">{stats.donated} ₹</h1>
                                </span>
                            </div>
                        </div>
                        <button className="w-full h-8 rounded-sm bg-gray-200"></button>
                    </div>

                </div>
                <h1 className="h-1 font-bold bg-gray-200"></h1>
                <div className=" p-5 flex gap-5 items-center flex-wrap bg-gray-100">
                    <div className="flex flex-col gap-5">
                        <div className="bg-white rounded-3xl w-50 h-30 shadow-md p-3">

                            <div className="flex justify-center items-center w-full h-full flex-col">
                                <h1 className="text-xs text-gray-400">Your Active Campaigns</h1>
                                <h1 className="font-bold text-gray-700 text-lg">{usercards.filter((e) => e.status === "active").length}</h1>
                            </div>
                        </div>
                        <a className="text-gray-900 p-3 rounded-3xl text-sm bg-white flex items-center gap-3 justify-center font-semibold shadow-md hover:bg-gray-300" href="/user/donationform"><img className="w-4 h-4" src={heartimg} />Create Campaign</a>

                    </div>
                    {/* box */}
                    {usercards.filter((e) => e.status !== "pending" && e.status !== "withdrawn").map((e) => {
                        // if (e.status === "withdraw_pending" || e.status === "withdrawn" ) {
                        //     return
                        // }
                        return (
                            <div key={e._id} className="relative shadow-md w-70 h-fit rounded-2xl p-3 flex flex-col gap-4 justify-between bg-white">
                                <div className="flex flex-col gap-5">
                                    <div className="p-3 bg-gray-200 text-gray-700 rounded-3xl text-sm font-bold overflow-hidden">ID : {e.campaignId}</div>
                                </div>
                                <div className="flex gap-1 flex-col justify-center items-center">
                                    <h1 className="text-xs text-gray-400">Raised Amount</h1>
                                    <div className="font-bold text-md text-gray-900">{e.raised} ₹ / {e.amount} ₹</div>
                                </div>
                                {/* {ActiveMessage && <div className="absolute w-full h-full bg-amber-200 flex justify-center items-center">{e.cause}</div>}
                                <button onMouseLeave={()=>{SetActiveMessage(false)}} onMouseEnter={()=>{ShowMessage()}} className="p-2 bg-gray-900 text-white w-20 text-xs rounded-md hover:bg-gray-800 cursor-pointer">cause?</button> */}
                                <div className="relative group w-fit">
                                    <button className="p-2 bg-gray-900 text-white w-20 text-xs rounded-md hover:bg-gray-800">
                                        Cause?
                                    </button>

                                    <div className="absolute -translate-x-5 left-1/2 mb-2 invisible group-hover:visible bg-white text-xs p-4 rounded shadow-lg w-50 z-10 max-h-30 overflow-y-auto wrap-break-word scrollbar-thin scrollbar-thumb-gray-200">
                                        {e.cause}
                                    </div>
                                </div>
                                {/* <p className="w-full overflow-y-auto wrap-break-word p-2">{e.cause}</p> */}

                                <div className="flex justify-between">
                                    {e.raised > 0 && <button onClick={() => { handleWithdraw(e.userid, e.campaignId, e.raised, e.amount) }} className="text-blue-400 border-2 cursor-pointer hover:scale-101 rounded-md w-30 p-2 text-xs font-semibold">Withdraw</button>}
                                    <button onClick={() => { handleDelete(e._id) }} className="text-red-600 border-2 cursor-pointer hover:scale-101 rounded-md w-30 p-2 text-xs font-semibold">Remove</button>
                                </div>
                            </div>
                        )
                    })}

                </div>
                <h1 className="h-2 bg-gray-200"></h1>
                <div className="p-2 bg-gray-200 ">
                    <div className="flex justify-center items-center">
                        <div className="bg-white w-10 h-10 p-3 rounded-l-3xl"><img className="w-full h-full" src={searchimg} alt="" /></div>
                        <input value={search} onChange={(e) => { setSearch(e.target.value) }} className="bg-white p-2 focus:outline-0 h-10 text-xs w-50 rounded-r-3xl" type="search" />
                    </div>
                </div>
                <div className="bg-white flex flex-wrap gap-5 items-center justify-center p-5">

                    {filteredCards.slice(0, visible).map((e) => {
                        if ((e.raised >= e.amount) || (e.status==="pending")) {
                            return null
                        }
                        return (
                            <div key={e._id} className="shadow-md w-70 h-80 rounded-2xl p-3 flex flex-col gap-4 justify-between bg-white">
                                <div className="flex flex-col gap-2">
                                    <div className="p-3 bg-gray-200 rounded-3xl text-sm font-bold text-gray-700">{e.name}</div>
                                    <div className="p-3 bg-blue-400 rounded-3xl text-sm font-bold text-white">ID: {e.campaignId}</div>
                                </div>
                                <div className="flex gap-1 flex-col justify-center items-center">
                                    <h1 className="text-xs text-gray-400">Raised Amount</h1>
                                    <div className="font-bold text-md text-gray-900">{e.raised} ₹ / {e.amount} ₹</div>
                                </div>
                                <div className="relative group w-fit">
                                    <button className="p-2 bg-gray-900 text-white w-20 text-xs rounded-md hover:bg-gray-800">
                                        Cause?
                                    </button>

                                    <div className="absolute -translate-x-5 left-1/2 mb-2 invisible group-hover:visible bg-white text-xs p-4 rounded shadow-lg w-50 z-10 max-h-30 overflow-y-auto wrap-break-word scrollbar-thin scrollbar-thumb-gray-200">
                                        {e.cause}
                                    </div>
                                </div>
                                <button onClick={() => { navigate(`/api/payment/${e.userid}`) }} className="bg-gray-900 text-white cursor-pointer hover:scale-101 rounded-3xl w-full p-3 font-semibold">Donate</button>
                            </div>
                        )
                    })}
                </div>
                {visible < donationcards.length && (
                    <div className="flex justify-center p-4">
                        <button onClick={() => { setvisible(prev => prev + 4) }} className="p-3 text-sm text-blue-500 border-2 font-semibold rounded-md cursor-pointer">load more</button>
                    </div>
                )}
            </section>
        </section>
    )
}

export default Dashboard