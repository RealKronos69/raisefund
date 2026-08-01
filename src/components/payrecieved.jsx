import { useNavigate } from "react-router-dom"
import { useState,useEffect } from "react"

const PayRecieved = () => {
    const [recieved, setrecieved] = useState([])
    const navigate = useNavigate()
    useEffect(() => {
        const fetchinfo = async () => {
            try {
                const res = await fetch(`${import.meta.env.VITE_API_URL}/user/donation/recievedinfo`, {
                    credentials: 'include'
                })
                const data = await res.json()
                if (res.ok) {
                    setrecieved(data)
                }
                if (res.status===401) {
                    navigate('/user/login')
                }
            } catch (error) {
                console.log(error)
            }
        }
        fetchinfo()
    }, [])
    return (
        <section className="bg-gray-100 h-full flex justify-center">
            <div className="bg-white w-90 flex gap-5 p-3 overflow-y-auto scrollbar-none flex-col items-center">
                {recieved.map((e) => {
                    return (
                        <div key={e._id} className="w-full shadow-md h-fit bg-white shrink-0 p-3 flex flex-col gap-2  rounded-md">
                            <div className="flex gap-2">
                                <span className="text-xs rounded-md p-1 bg-gray-900 text-gray-100">From : {e.donator.name}</span>
                                <span className="text-xs rounded-md p-1 border-2">{new Date(e.createdAt).toLocaleTimeString()}</span>
                            </div>
                            <div className="text-sm text-gray-900 text-center p-1">
                                <div className="text-sm text-semibold text-gray-600">Amount</div>
                               <div className="font-bold text-green-400 text-lg">+{e.amount}₹</div>
                            </div>
                            <div>
                                <p className="wrap-break-word bg-green-200 p-2 rounded-md text-xs">{e.message}</p>
                            </div>
                        </div>
                    )
                })}
            </div>
        </section>
    )
}

export default PayRecieved