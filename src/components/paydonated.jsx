import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

const PayDonated = () => {
    const [Donated, setDonated] = useState([])
    const navigate = useNavigate()
    useEffect(() => {
        const fetchinfo = async () => {
            try {
                const res = await fetch(`${import.meta.env.VITE_API_URL}/user/donation/donatedinfo`, {
                    credentials: 'include'
                })
                const data = await res.json()
                if (res.ok) {
                    setDonated(data)
                }
                if (res.status === 401) {
                    navigate('/user/login')
                }
            } catch (error) {
                console.log(error)
            }
        }
        fetchinfo()
    }, [])
    return (
        <section className="bg-gray-100 h-full flex justify-around">
            <div className="w-90 bg-white h-full flex flex-col gap-5 p-5 overflow-y-auto scrollbar-none">
                {Donated.map((e) => {
                    return (
                        <div key={e._id} className="w-full shadow-md h-fit bg-white shrink-0 p-3 flex flex-col gap-2  rounded-md">
                            <div className="flex gap-2">
                                <span className="text-xs rounded-md p-1 bg-gray-900 text-gray-100">To : {e.receiver.name}</span>
                                <span className="text-xs rounded-md p-1 border-2">{new Date(e.createdAt).toLocaleTimeString()}</span>
                            </div>
                            <div className="text-sm text-gray-900 text-center p-1">
                                <div className="text-sm text-semibold text-gray-600">Amount</div>
                                <div className="font-bold text-red-400 text-lg">-{e.amount}₹</div>
                            </div>
                            <div>
                                <p className="wrap-break-word bg-red-200 p-2 rounded-md text-xs">{e.message}</p>
                            </div>
                        </div>
                    )
                })}
            </div>
        </section>
    )
}

export default PayDonated