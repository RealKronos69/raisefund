import { useRef, useState, useEffect } from "react"
import msgimg from '../assets/message.png'
import walletimg from '../assets/wallet.png'
import donateimg from '../assets/donate.png'
import Menu from './menu'
import { useNavigate } from "react-router-dom"
const Dashboard = () => {
    const [donationcards, setdonationcards] = useState([])
    const [usercards, setusercards] = useState([])
    const [visible, setvisible] = useState(4)
    const [search, setSearch] = useState("")
    const navigate = useNavigate()
    useEffect(() => {
        async function fetchcards() {
            try {
                const response = await fetch('http://localhost:3000/user/donation')
                const data = await response.json()
                console.log(data)
                if (response.ok) {
                    setdonationcards(data)
                }

            } catch (error) {
                console.log(error)
            }
        }
        async function usercards() {
            try {
                const response = await fetch('http://localhost:3000/user/donation/userfunds', {
                    credentials: 'include'
                })
                const data = await response.json()
                console.log(data)
                if (response.ok) {
                    setusercards(data)
                }

            } catch (error) {
                console.log(error)
            }
        }
        fetchcards()
    }, [])

    

    const filteredCards = donationcards.filter((card) =>
        card.name.toLowerCase().includes(search.toLowerCase()) ||
        card.cause.toLowerCase().includes(search.toLowerCase())
    )


    return (
        <section className="h-screen bg-white">
            <div className="bg-gray-900 h-12 flex items-center justify-end p-3 gap-5 w-full z-20">
                <input value={search} onChange={(e) => { setSearch(e.target.value) }} placeholder="search" className="bg-white shadow-md p-2 focus:outline-0 h-8 text-xs w-40 rounded-3xl fixed right-5 top-15" type="search" />
                <a className="bg-white p-2 rounded-3xl text-xs font-semibold text-gray-600" href="/user/donationform">Donation Form</a>
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
                                    <h1 className="font-bold text-gray-600">10000$</h1>
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
                                    <h1 className="font-bold text-gray-600">0</h1>
                                </span>
                            </div>
                        </div>
                        <button className="w-full h-8 rounded-sm bg-gray-200"></button>
                    </div>

                </div>
                <h1 className="h-2 font-bold bg-gray-200"></h1>
                <div className=" p-5 flex gap-5 items-center flex-wrap bg-gray-100">
                    <div className="bg-white rounded-3xl w-50 h-30 shadow-md p-3">

                        <div className="flex justify-center items-center w-full h-full flex-col">
                            <h1 className="text-xs text-gray-400">Your Active Campaigns</h1>
                            <h1 className="font-bold text-gray-700 text-lg">0</h1>
                        </div>
                    </div>
                    {/* box */}
                    <div className="shadow-md w-70 h-60 rounded-2xl p-3 flex flex-col gap-5 justify-between bg-white">
                        <div className="flex flex-col gap-5">
                            <div className="p-3 bg-gray-200 rounded-3xl text-sm font-bold">ID:102039</div>
                        </div>
                        <div className="flex gap-1">
                            <h1 className="font-semibold">raised amount:</h1>
                            <div>1000/10000</div>
                        </div>
                        <p className="w-full overflow-y-auto wrap-break-word p-2">####</p>
                        <button className="bg-gray-900 text-white cursor-pointer hover:scale-101 rounded-3xl w-full p-3">remove</button>
                    </div>

                </div>
                <h1 className="h-2 bg-gray-200"></h1>
                <div className="bg-white flex flex-wrap gap-5 items-center justify-center p-5">
                    {filteredCards.slice(0, visible).map((e) => {
                        return (
                            <div key={e._id} className="shadow-md w-70 h-80 rounded-2xl p-3 flex flex-col gap-5 justify-between bg-white">
                                <div className="flex flex-col gap-5">
                                    <div className="p-3 bg-gray-200 rounded-3xl text-sm font-bold text-gray-800">{e.name}</div>
                                    <div className="p-3 bg-blue-400 rounded-3xl text-sm font-bold text-white">ID:102039</div>
                                </div>
                                <div className="flex gap-1 items-center">
                                    <h1 className="font-semibold text-sm text-gray-500">raised amount:</h1>
                                    <div className="text-gray-800 font-bold">{e.raised}/{e.amount}</div>
                                </div>
                                <p className="p-2 w-full overflow-y-auto wrap-break-word">{e.cause}</p>
                                <button onClick={() => { navigate(`/api/payment/${e._id}`) }} className="bg-gray-900 text-white cursor-pointer hover:scale-101 rounded-3xl w-full p-3">donate</button>
                            </div>
                        )
                    })}
                </div>
                {visible < donationcards.length && (
                    <div className="flex justify-center">
                        <button onClick={() => { setvisible(prev => prev + 4) }} className="p-3 bg-blue-500 text-white font-semibold rounded-md cursor-pointer">load more</button>
                    </div>
                )}
            </section>
        </section>
    )
}

export default Dashboard