import { useNavigate } from "react-router-dom"
import { useState,useEffect } from "react"

const WithdrawInfo = () => {
    const [withdraw, setwithdraw] = useState([])
    const navigate = useNavigate()
    useEffect(() => {
        const fetchinfo = async () => {
            try {
                const res = await fetch(`${import.meta.env.VITE_API_URL}/user/donation/withdrawinfo`, {
                    credentials: 'include'
                })
                const data = await res.json()
                if (res.ok) {
                    setwithdraw(data)
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
        <section className="bg-gray-100 h-full flex justify-around">
            <div className="w-90 bg-white h-full flex flex-col gap-5 p-5 overflow-y-auto scrollbar-none">
                {withdraw.map((e) => {
                    return (
                        <div key={e._id} className="w-full h-fit bg-white shrink-0 p-2 shadow-md rounded-md flex flex-col gap-2">
                            <h1 className="text-sm bg-gray-900 p-2 rounded-2xl text-white">On : {new Date(e.createdAt).toLocaleString().split(',')}</h1>
                            <div className="flex items-center gap-2">
                                <span className="text-xs  text-gray-500">Campaign Amount : </span><span className="font-semibold"> {e.amount}₹</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-xs  text-gray-500">Withdraw Amount : </span><span className="font-semibold"> {e.raised}₹</span>
                            </div>
                            <div className={`text-xs ${e.status==="pending" ? "bg-red-400" : "bg-green-400"} text-white w-fit p-2 rounded-2xl`}>
                                {e.status}
                            </div>
                        </div>
                    )
                })}
            </div>
        </section>
    )
}

export default WithdrawInfo